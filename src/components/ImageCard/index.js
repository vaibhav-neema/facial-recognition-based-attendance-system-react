import React, { useState, memo, useEffect, useRef } from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { bufferToImage } from "face-api.js";
import { executeRecognition } from "../../utils/executeRecognition";
import { downloadAttendance } from "../../utils/downloadAttendance";
import { getStudentDespData, filterData } from "../../utils/fetchData";

// import dummyImage from "../../assets/images/Team/ShubhLaad.jpg";

import Button from "../Button";
import TextBox from "../TextBox";
import BackDrop from "../BackDrop";

import "./index.scss";

const ImageCard = ({ labelKey, isWeb }) => {
  const imageFiles = [];
  let filteredData = useRef([]);
  const studentData = useRef([]);
  const refContainer = useRef();
  const [dimensions, setDimensions] = useState({ width: 0 });

  let finalList = [];

  const [showImageIcon, setShowImageIcon] = useState(true);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [disableDBButtonState, setDisableDBButtonState] = useState(false);
  const [disableUploadButtonState, setDisableUploadButtonState] = useState(false);
  const [sectionB, setSectionB] = useState(true);

  const [newBatch, setNewBatch] = useState("");
  const [newBranch, setNewBranch] = useState("");
  const [newSection, setNewSection] = useState("");

  // const generateBlob = async () => {
  //   var dummy = document.querySelector("#dummy-image");

  //   fetch(dummyImage)
  //     .then(function (response) {
  //       return response.blob();
  //     })
  //     .then(function (myBlob) {
  //       var objectURL = URL.createObjectURL(myBlob);
  //       dummy.src = objectURL;
  //     });

  //   await detectAllFaces(dummy, new SsdMobilenetv1Options({ minConfidence: 0.35 }))
  //   .withFaceLandmarks()
  //   .withFaceDescriptors();
  // };

  useEffect(() => {
    setDisableUploadButtonState(true);
    setShowBackDrop(true);
    getStudentDespData().then(async (value) => {
      studentData.current = await value;
      setShowBackDrop(false);
    });
  }, []);

  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.offsetWidth,
      });
    }
  }, []);

  const [selectedData, setSelectedBatch] = useState({
    batch: "",
    branch: "",
    section: "",
  });

  useEffect(() => {
    if (newBatch === "" || newBranch === "" || newSection === "") {
      setDisableDBButtonState(true);
      setDisableUploadButtonState(true);
    } else if (
      selectedData.batch !== newBatch &&
      selectedData.branch !== newBranch &&
      selectedData.section !== newSection
    ) {
      setDisableDBButtonState(false);
      setDisableUploadButtonState(false);
    } else {
      setDisableDBButtonState(false);
    }
  }, [newBatch, newBranch, newSection]);

  const addImageForFrame = async (imageFile, index) => {
    const holder = document.createElement("div");
    holder.setAttribute("id", `holder${index}`);
    holder.setAttribute("class", "image-holder");
    document.querySelector(".images-container").appendChild(holder);

    const childImage = await bufferToImage(imageFile);
    const childImageLabel = document.createElement("p");
    const computationLabel = document.createElement("p");

    childImage.setAttribute("class", "frame-image");
    document.querySelector(`#holder${index}`).appendChild(childImage);

    childImageLabel.setAttribute("class", "text-label");
    childImageLabel.textContent = imageFile.name;
    document.querySelector(`#holder${index}`).appendChild(childImageLabel);

    computationLabel.setAttribute("class", "text-label");
    computationLabel.setAttribute("id", "is-computing-label");
    computationLabel.textContent = "computing...";
    document.querySelector(`#holder${index}`).appendChild(computationLabel);
  };

  const handleUploadChange = async (event) => {
    const start = Date.now();
    if (event.target.files.length === 0) return;

    setShowImageIcon(false);

    let studentDataHashMap = new Map();
    const imageFileLength = event.target.files.length;
    let detected = 0;

    for (let i = 0; i < filteredData.current.length; i++) {
      studentDataHashMap.set(filteredData.current[i]._label, 0);
    }

    studentDataHashMap.set("unknown", 0);

    for (let i = 0; i < imageFileLength; i++) {
      imageFiles.push(event.target.files[i]);
    }

    for (let i = 0; i < imageFiles.length; i++) {
      addImageForFrame(imageFiles[i], i);
    }

    for (let i = 0; i < imageFiles.length; i++) {
      const bufferImage = await bufferToImage(imageFiles[i]);
      await executeRecognition(bufferImage, i, filteredData.current, studentDataHashMap, dimensions, isWeb);
      document.querySelector(`#holder${i}`).removeChild(document.querySelector("#is-computing-label"));
    }

    studentDataHashMap.forEach((value, key) => {
      detected += value;
      if (key !== "unknown" && value >= 1) {
        finalList.push(key);
      }
    });

    const textBox = document.querySelector(".text-box-input");
    textBox.value = "";
    textBox.style.color = "rgba(46, 108, 54, 1)";
    textBox.style.textAlign = "left";
    textBox.removeAttribute("readonly");
    textBox.setAttribute("rows", finalList.length + 3);

    finalList.forEach((element, i) => {
      textBox.value += `${i + 1}) ${element}\n`;
    });

    textBox.value += `\nTotal Students : ${detected}`;
    textBox.value += `\nUnknown Students : ${studentDataHashMap.get("unknown")}\n`;

    setShowDownloadButton(true);

    window.scrollTo(0, document.body.scrollHeight);
    const duration = Date.now() - start;
    console.log(duration);
    textBox.value += duration;
  };

  const uploadButtonClickHandler = () => {
    document.querySelector(".images-container").innerHTML = "";

    document.querySelector(".text-box-input").style.textAlign = "center";
    document.querySelector(".text-box-input").value = "";
    document.querySelector(".text-box-input").readOnly = true;
    document.querySelector(".text-box-input").setAttribute("rows", 1);

    setShowDownloadButton(false);
    setShowImageIcon(true);
  };

  const getBatchValue = (event) => {
    const value = event.target.value;

    setNewBatch(value);
    setSelectedBatch({
      ...selectedData,
      batch: value,
    });
  };

  const getBranchValue = (event) => {
    const value = event.target.value;

    setNewBranch(value);
    setSelectedBatch({
      ...selectedData,
      branch: value,
    });

    if (value === "EI" || value === "MECH" || value === "CIVIL") {
      setSectionB(false);
      document.getElementById("student-section").setAttribute("value", "");
      setNewSection("");
    }

    if (value === "ETC" || value === "CS" || value === "IT") {
      setSectionB(true);
    }
  };

  const getSectionValue = (event) => {
    const value = event.target.value;

    setNewSection(event.target.value);
    setSelectedBatch({
      ...selectedData,
      section: value,
    });
  };

  const getFilteredData = async (event) => {
    event.preventDefault();
    const fetchedStudentData = await studentData.current;
    filteredData.current = filterData(newBatch, newBranch, newSection, fetchedStudentData);

    if (filteredData.current.length === 0) {
      const textBox = document.querySelector(".text-box-input");
      textBox.value = "Currently No Data For Filters Applied !";
      textBox.removeAttribute("readonly");
      textBox.style.color = "red";
    } else {
      setDisableDBButtonState(true);
      setDisableUploadButtonState(false);
      uploadButtonClickHandler();
    }
  };

  return (
    <>
      {showBackDrop && <BackDrop />}

      <div className="image-card-component">
        <div
          className={cx("image-container", {
            "image-container-web": isWeb,
          })}
        >
          <div className={!isWeb ? "image-card" : "image-card-web"} ref={refContainer}>
            <div
              className={cx("images-container", {
                "images-container-web": isWeb,
              })}
            ></div>

            {showImageIcon && (
              <>
                <i
                  className="material-icons"
                  id="image-icon-1"
                  style={{
                    position: "absolute",
                    top: isWeb ? "45%" : "28vh",
                    left: isWeb ? "24%" : "47.5%",
                    fontSize: isWeb ? "5vh" : null,
                  }}
                >
                  collections
                </i>

                <input
                  multiple
                  id={labelKey}
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/heic"
                  onChange={handleUploadChange}
                  disabled={disableUploadButtonState}
                />
              </>
            )}
          </div>

          {isWeb ? (
            <div className="web-content">
              <TextBox
                isWeb
                showDownloadButton={showDownloadButton}
                onDownloadButtonClick={() =>
                  downloadAttendance(
                    newBatch,
                    newBranch,
                    newSection,
                    "ietdavv-sas-2023",
                    document.querySelector(".text-box-input").value
                  )
                }
              />

              <div
                className={cx("db-selector", {
                  "db-selector-web": isWeb,
                })}
              >
                <div className="capsules">
                  <form onSubmit={getFilteredData}>
                    <input type="submit" />
                    <select name="Batch" onChange={getBatchValue} defaultValue={""} style={{ cursor: "pointer" }}>
                      <option value="">Batch</option>
                      <option value="b23">2023</option>
                      <option value="b24">2024</option>
                      <option value="b25">2025</option>
                    </select>
                    <select name="Branch" onChange={getBranchValue} defaultValue={""} style={{ cursor: "pointer" }}>
                      <option value="">Branch</option>
                      <option value="CS">CS</option>
                      <option value="IT">IT</option>
                      <option value="ETC">ETC</option>
                      <option value="EI">EI</option>
                      <option value="MECH">Mech</option>
                      <option value="CIVIL">Civil</option>
                    </select>
                    <select
                      id="student-section"
                      name="Section"
                      onChange={getSectionValue}
                      defaultValue={""}
                      style={{ cursor: "pointer" }}
                    >
                      <option value="">Section</option>
                      <option value="A">A</option>
                      {sectionB && <option value="B">B</option>}
                    </select>
                    <input type="submit" id="dbInput" disabled={disableDBButtonState} />
                  </form>
                </div>
              </div>

              <div className="buttons-web">
                <Button
                  title="Load Data"
                  iconType="database"
                  labelKey="dbInput"
                  isDatabase={true}
                  isDisabled={disableDBButtonState}
                  onClickHandler={getFilteredData}
                  isWeb
                />
                <Button
                  title="Upload Photo(s)"
                  iconType="cloud_upload"
                  labelKey="upload"
                  onClickHandler={uploadButtonClickHandler}
                  isDisabled={disableUploadButtonState}
                  isWeb
                />
              </div>
            </div>
          ) : (
            <>
              <TextBox
                showDownloadButton={showDownloadButton}
                onDownloadButtonClick={() =>
                  downloadAttendance(
                    newBatch,
                    newBranch,
                    newSection,
                    "ietdavv-sas-2023",
                    document.querySelector(".text-box-input").value
                  )
                }
              />

              <div
                className={cx("db-selector", {
                  "db-selector-web": isWeb,
                })}
              >
                <div className="capsules">
                  <form onSubmit={getFilteredData}>
                    <input type="submit" />
                    <select name="Batch" onChange={getBatchValue} defaultValue={""}>
                      <option value="">Batch</option>
                      <option value="b23">2023</option>
                      <option value="b24">2024</option>
                      <option value="b25">2025</option>
                    </select>
                    <select name="Branch" onChange={getBranchValue} defaultValue={""}>
                      <option value="">Branch</option>
                      <option value="CS">CS</option>
                      <option value="IT">IT</option>
                      <option value="ETC">ETC</option>
                      <option value="EI">EI</option>
                      <option value="MECH">Mech</option>
                      <option value="CIVIL">Civil</option>
                    </select>
                    <select id="student-section" name="Section" onChange={getSectionValue} defaultValue={""}>
                      <option value="">Section</option>
                      <option value="A">A</option>
                      {sectionB && <option value="B">B</option>}
                    </select>
                    <input type="submit" id="dbInput" disabled={disableDBButtonState} />
                  </form>
                </div>
              </div>

              <div className="buttons">
                <Button
                  title="Load Data"
                  iconType="database"
                  labelKey="dbInput"
                  isDatabase={true}
                  isDisabled={disableDBButtonState}
                />
                <Button
                  title="Upload Photo(s)"
                  iconType="cloud_upload"
                  labelKey="upload"
                  onClickHandler={uploadButtonClickHandler}
                  isDisabled={disableUploadButtonState}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

ImageCard.defaultProps = {
  labelKey: "",
};

ImageCard.propTypes = {
  labelKey: PropTypes.string,
  isWeb: PropTypes.bool,
};

export default memo(ImageCard);
