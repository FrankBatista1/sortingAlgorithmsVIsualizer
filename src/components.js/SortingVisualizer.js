import React, { useEffect, useState } from "react";
import "../stylesheets/SortingVisualizer.css";
import { mergeSortAnimations } from "../Algorithms/sortingAlgorithms";

const ANIMATION_SPEED_MS = 3;

const NUMBER_OF_ARRAY_BARS = 310;

const PRIMARY_COLOR = 'green';

const SECONDARY_COLOR = 'red';

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
document.body.style = "background: rgb(14, 14, 14);";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray([]);
  }, []);

  const resetArray = () => {
    const arrayInReset = [];
    for (let i = 0; i < 100; i++) {
      arrayInReset.push(randomIntFromInterval(10, 600));
    }
    setArray(arrayInReset);
  };
  function mergeSort() {
    const animations = mergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  return (
    <>
      <div className="array-container">
        {array.map((line, i) => (
          <div
            className="array-bar"
            key={i}
            style={{ height: `${line}px` }}
          ></div>
        ))}
      </div>
      <button
        onClick={() => {
          resetArray();
        }}
        className=""
        style={{ color: "green" }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          mergeSort()
        }}
        className=""
        style={{ color: "green" }}
      >
        mergeSort
      </button>
    </>
  );
};

export default SortingVisualizer;
