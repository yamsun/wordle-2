import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, turn, showResult, resultMsg } =
    useWordle(solution);

  const colorCode = [
    { color: "gray", rule: "Letter is not in the word in any spot." },
    {
      color: "goldenrod",
      rule: "Letter is in the word but in the wrong spot. ",
    },
    {
      color: "lightgreen",
      rule: "Letter is in the word and in the correct spot.",
    },
  ];

  useEffect(() => {
    if (turn < 6) {
      window.addEventListener("keyup", handleKeyup);
    }
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, turn]);

  return (
    <div>
      {/* <div>Wordle - {currentGuess}</div> */}
      <div>
        <b>** Start Typing your guess and press Enter to Check**</b>
      </div>
      <p>Hint: It's a 5 letter word! 😄</p>
      {colorCode.map((i, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
              // marginLeft: "25vw",
              // border: "2px solid red",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginRight: 5,
                // display: "inline",
                backgroundColor: i.color,
                width: 25,
                height: 25,
                fontSize: 30,
              }}
            ></div>{" "}
            <span>: {i.rule}</span>
          </div>
        );
      })}
      <p>
        Turn left : <b>{6 - turn}</b>
      </p>
      {/* <div>solution - {solution}</div> */}

      {showResult && <div style={{ fontSize: 40 }}>{resultMsg}</div>}

      {guesses.map((guess, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
              // border: "2px solid red",
            }}
          >
            {guess.map((k, ind2) => {
              return (
                <div
                  key={ind2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 5,
                    backgroundColor: k.color,
                    width: 50,
                    height: 50,
                    fontSize: 30,
                  }}
                >
                  {k.key}
                </div>
              );
            })}
          </div>
        );
      })}
      <div
        // key={index}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          // border: "2px solid green",
        }}
      >
        {currentGuess
          ?.toUpperCase()
          ?.split("")
          .map((i, ind) => {
            return (
              <div
                key={ind}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                  backgroundColor: "pink",
                  border: "1px solid black",
                  width: 50,
                  height: 50,
                  fontSize: 30,
                }}
              >
                {i}
              </div>
            );
          })}
      </div>
    </div>
  );
}
