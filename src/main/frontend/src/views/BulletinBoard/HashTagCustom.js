import React from "react";
import { CBadge } from "@coreui/react";
import "./HashtagCustom.css"; // CSS 파일 가져오기

const tagColors = [
  "primary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

const HashtagCostom = ({ hashtagNames }) => {
  if (!hashtagNames) return null;

  return hashtagNames.split(",").map((tag, index) => {
    const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
    return (
      <span key={index} className="hashtag">
        <CBadge color={randomColor}>#{tag}</CBadge>
      </span>
    );
  });
};

export default HashtagCostom;
