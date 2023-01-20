import "./App.css";
import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import CryptoJS from "crypto-js";

function App() {
  const [solution, setSolution] = useState("");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const allWordsList = [
    "Alert",
    "Arise",
    "Actor",
    "Adult",
    "Boost",
    "Brain",
    "Brown",
    "Built",
    "Carry",
    "Child",
    "Close",
    "Count",
    "Dance",
    "Dream",
    "Drive",
    "Drink",
    "Early",
    "Enjoy",
    "Empty",
    "Enter",
    "Fault",
    "Field",
    "Flash",
    "Fluid",
    "Globe",
    "Grand",
    "Great",
    "Gross",
    "Happy",
    "House",
    "Human",
    "Heavy",
    "Issue",
    "Input",
    "Index",
    "Image",
    "Juice",
    "Joint",
    "Jelly",
    "Jeans",
    "Known",
    "Knock",
    "Knife",
    "Kills",
    "Light",
    "Level",
    "Leave",
    "Learn",
    "Mixer",
    "Meals",
    "Marry",
    "Magic",
    "Novel",
    "Noise",
    "Newly",
    "Night",
    "Ought",
    "Other",
    "Order",
    "Offer",
    "Paint",
    "Paper",
    "Round",
    "Royal",
    "Share",
    "Sharp",
    "Shape",
    "Score",
    "Taken",
    "Teach",
    "Thank",
    "Thick",
    "Upset",
    "Usage",
    "Usual",
    "Upper",
    "Value",
    "Video",
    "Viral",
    "Voice",
    "Worst",
    "Whole",
    "World",
    "Wrong",
    "Xerox",
    "Youth",
    "Years",
    "Young",
    "Yards",
    "Zilla",
    "Zeros",
  ];

  useEffect(() => {
    if (urlParams.get("w")) {
      let ciphertext = urlParams.get("w");
      ciphertext = ciphertext?.split(" ")?.join("+");

      // // Encrypt

      // // Decrypt
      var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
      var originalText = bytes.toString(CryptoJS.enc.Utf8);

      console.log("originalText", originalText.length); // 'my message'
      // valid word
      if (originalText.length === 5) {
        setSolution(originalText.toUpperCase());
      } else {
        let randomWord =
          allWordsList[Math.floor(Math.random() * allWordsList.length)];
        setSolution(randomWord.toUpperCase());
      }
    } else {
      let randomWord =
        allWordsList[Math.floor(Math.random() * allWordsList.length)];
      setSolution(randomWord.toUpperCase());
    }
  }, []);

  return (
    <div className="App">
      <h2>Welcome to the Sundar Wordle</h2>

      {solution && (
        <>
          <Wordle solution={solution} />
          <h5>
            <a target="_blank" href="https://makewordle.netlify.app/">
              Do you want to create a Wordle of your choice of word and send it
              to a friend to solve?
            </a>
          </h5>
        </>
      )}
    </div>
  );
}

export default App;
