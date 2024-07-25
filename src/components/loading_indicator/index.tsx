import React from "react";

// Locally Import
import { LoadingIndicatorProps } from "./type";

import "./style.css";

/**
 * Component renders a loading indicator.
 * @param props
 * @returns
 */
export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const strokeWidth = props.strokeWidth ? props.strokeWidth : 15;
  const isTextPlaceBeforeIndicator = props.isTextPlaceBeforeIndicator
    ? props.isTextPlaceBeforeIndicator
    : false;
  const containerSize = 100;
  const cx = containerSize / 2;
  const cy = cx;
  const r = (containerSize - (5 + strokeWidth)) / 2;

  return (
    <div className="loading">
      {isTextPlaceBeforeIndicator && (
        <div className="me-2">{props.text ? props.text : "Loading..."}</div>
      )}
      <svg
        className="indicator"
        viewBox={`0 0 ${containerSize} ${containerSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={cx} cy={cy} r={r} strokeWidth={strokeWidth} fill="none" />
      </svg>
      {!isTextPlaceBeforeIndicator && (
        <div className="ms-2">{props.text ? props.text : "Loading..."}</div>
      )}
    </div>
  );
}
