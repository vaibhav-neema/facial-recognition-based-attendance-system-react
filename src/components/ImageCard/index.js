import React, { useState, memo, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { bufferToImage } from "face-api.js";
import { executeRecognition } from "../../utils/executeRecognition";
import { getStudentData } from "../../utils/studentData";
import { downloadAttendance } from "../../utils/downloadAttendance";

import BackDrop from "../BackDrop";
import Button from "../Button";
import TextBox from "../TextBox";

import "./index.scss";

const ImageCard = ({ labelKey }) => {
  const imageFiles = [];
  const studentData = useRef([]);
  const refContainer = useRef();
  const [dimensions, setDimensions] = useState({ width: 0 });

  let finalList = [];

  const [showImageIcon, setShowImageIcon] = useState(true);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(true);

  useEffect(() => {
    getStudentData().then(async (value) => {
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

  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.offsetWidth,
      });
    }
  }, []);

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
    if (event.target.files.length === 0) return;

    setShowImageIcon(false);

    const studentDataFetch = await studentData.current;
    let studentDataHashMap = new Map();
    const imageFileLength = event.target.files.length;
    let detected = 0;

    for (let i = 0; i < studentDataFetch.length; i++) {
      studentDataHashMap.set(studentDataFetch[i]._label, 0);
    }

    studentDataHashMap.set("unknown", 0);

    for (let i = 0; i < imageFileLength; i++) {
      imageFiles.push(event.target.files[i]);
    }

    for (let i = 0; i < imageFiles.length; i++) {
      addImageForFrame(imageFiles[i], i);
    }

    localStorage.setItem("unknown", "0");

    for (let i = 0; i < imageFiles.length; i++) {
      await executeRecognition(
        imageFiles[i],
        i,
        studentData.current,
        studentDataHashMap,
        dimensions
      );
      document
        .querySelector(`#holder${i}`)
        .removeChild(document.querySelector("#is-computing-label"));
    }

    studentDataHashMap.forEach((value, key) => {
      detected += value;
      if (value >= 1) {
        finalList.push(key);
      }
    });

    const textBox = document.querySelector(".text-box-input");
    textBox.value = "";
    textBox.style.textAlign = "left";
    textBox.removeAttribute("readonly");
    textBox.setAttribute("rows", finalList.length + 3);

    finalList.forEach((element, i) => {
      textBox.value += `${i + 1}) ${element}\n`;
    });

    textBox.value += `\nUnknown Students : ${localStorage.getItem("unknown")}`;
    textBox.value += `\nTotal Students : ${
      imageFileLength === 1
        ? parseInt(localStorage.getItem("unknown")) + detected
        : parseInt(localStorage.getItem("unknown")) + finalList.length
    }`;

    setShowDownloadButton(true);

    window.scrollTo(0, document.body.scrollHeight);
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

  return (
    <>
      {showBackDrop && <BackDrop />}

      <div className="image-container">
        <div className="image-card" ref={refContainer}>
          <div className="images-container"></div>

          {showImageIcon && (
            <>
              <label id="input-preview-label" htmlFor="preview">
                <i className="material-icons" id="image-icon-1">
                  image
                </i>
              </label>
              <input
                multiple
                id={labelKey}
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/heic"
                onChange={handleUploadChange}
              />
            </>
          )}
        </div>

        <TextBox
          showDownloadButton={showDownloadButton}
          onDownloadButtonClick={() =>
            downloadAttendance(
              "ietdavv-sas-2023",
              document.querySelector(".text-box-input").value
            )
          }
        />

        <Button
          iconType="cloud_upload"
          labelKey="upload"
          onClickHandler={uploadButtonClickHandler}
        />
      </div>
    </>
  );
};

ImageCard.defaultProps = {
  labelKey: "",
};

ImageCard.propTypes = {
  labelKey: PropTypes.string,
};

export default memo(ImageCard);
