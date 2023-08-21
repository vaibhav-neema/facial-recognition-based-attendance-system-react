import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import linkedInLogo from "../../assets/icons/linked-in.png";
import instgramLogo from "../../assets/icons/instagram.png";
import gitLogo from "../../assets/icons/git.png";

import "./index.scss";

const InfoCard = ({ imageSrc, name, experience, linkedIn, instagram, github, isWeb }) => {
  return (
    <div className="member-info">
      <div className="image-src">
        <img src={imageSrc} alt={name} />
      </div>

      <div className="details">
        <div className="content">
          <div style={{ fontSize: "14px" }}>{name}</div>
          <div>Branch : ETC</div>
          <div>Section : B</div>
          <div>Batch : 2019</div>
          <div>Interned @ {experience}</div>
          <div
            className={cx("links", {
              "links-web": isWeb,
            })}
          >
            <a href={linkedIn} target="_blank" rel="noreferrer">
              <img src={linkedInLogo} alt="LinkedIn" />
            </a>
            <a href={instagram} target="_blank" rel="noreferrer">
              <img src={instgramLogo} alt="Instagram" />
            </a>
            <a href={github} target="_blank" rel="noreferrer">
              <img src={gitLogo} alt="GitHub" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

InfoCard.defaultProps = {
  imageSrc: "",
  name: "",
  intern: "",
  linkedIn: "",
  instagram: "",
  github: "",
  isWeb: false,
};

InfoCard.propTypes = {
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  intern: PropTypes.string,
  linkedIn: PropTypes.string,
  instagram: PropTypes.string,
  github: PropTypes.string,
  isWeb: PropTypes.bool,
};

export default InfoCard;
