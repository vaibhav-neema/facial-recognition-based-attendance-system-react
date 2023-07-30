import React, { useState } from "react";
import PropTypes from "prop-types";

import { bufferToImage } from "face-api.js";
import { executeRecognition } from "../../utils/executeRecognition";

import Button from "../Button";

import "./index.scss";

const ImageCard = ({ labelKey }) => {
  const imageFiles = [];
  let finalList = [];
  const [showImageIcon, setShowImageIcon] = useState(true);

  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

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

    for (let i = 0; i < event.target.files.length; i++) {
      imageFiles.push(event.target.files[i]);
    }

    for (let i = 0; i < imageFiles.length; i++) {
      addImageForFrame(imageFiles[i], i);
    }

    for (let i = 0; i < imageFiles.length; i++) {
      await executeRecognition(imageFiles[i], i);
      document.querySelector(`#holder${i}`).removeChild(document.querySelector("#is-computing-label"));
    }

    for (let i = 0; i < document.querySelector(".records").children.length; i++) {
      let string = document.querySelector(".records").children[i].innerText;
      string = string.substring(0, string.indexOf("("));
      finalList.push(string);
    }

    finalList.sort();
    document.querySelector(".records").innerHTML = "";
    finalList = removeDuplicates(finalList);

    for (let i = 0; i < finalList.length; i++) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(finalList[i]));
      document.querySelector(".records").appendChild(li);
    }

    window.scrollTo(0, document.body.scrollHeight);
  };

  const uploadButtonClickHandler = () => {
    document.querySelector(".images-container").innerHTML = "";
    document.querySelector(".records").innerHTML = "";

    setShowImageIcon(true);
  };

  return (
    <>
      <div className="image-card">
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

      <div className="button-container">
        <Button iconType="cloud_upload" labelKey="upload" onClickHandler={uploadButtonClickHandler} />
        {/* <Button iconType="groups" /> */}
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

export default ImageCard;
