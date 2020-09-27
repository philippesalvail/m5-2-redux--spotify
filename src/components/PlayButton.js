import React from "react";
import styled from "styled-components";

const PlayButton = () => {
  return (
    <Btn>
      <svg
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.16669 1.5L12.8334 9L1.16669 16.5V1.5Z"
          fill="white"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Btn>
  );
};

const Btn = styled.button`
  background-color: black;
  border-radius: 50%;
  border: 1px solid white;
  svg {
    transform: translate(10%, 10%);
  }
`;

export default PlayButton;
