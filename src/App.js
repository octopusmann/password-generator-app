import { useState } from "react";
import { generateCustomPassword } from "./components/GeneratePassword";
import greenCopyIcon from "../src/images/greenCopyIcon.svg";
import grayCopyIcon from "../src/images/grayCopyIcon.svg";
import IconArrow from "../src/images/icon-arrow-right.svg";

function App() {
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowercase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [length, setLength] = useState(4);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [countCheckbox, setCountCheckbox] = useState(0);

  const handleGeneratePassword = () => {
    const newPassword = generateCustomPassword(
      includeUpperCase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
      length
    );

    setPassword(newPassword);
    setCopySuccess("");
  };

  const handleCheckboxChange = (setterFunction, currentState) => {
    const newCount = currentState ? countCheckbox - 1 : countCheckbox + 1;

    if (newCount >= 0 && newCount <= 4) {
      setterFunction(!currentState);
      setCountCheckbox(newCount);
    }
  };

  const getStrengthLabel = () => {
    const labels = ["TOO WEAK", "WEAK", "MEDIUM", "STRONG"];
    if (countCheckbox === 0) return "";
    return labels[countCheckbox - 1] || " ";
  };

  const getStrengthColor = (index) => {
    const colors = [
      "bg-custom-red",
      "bg-custom-orange",
      "bg-custom-yellow",
      "bg-neon-green",
    ];
    if (index < countCheckbox) {
      return colors[countCheckbox - 1];
    }
    return "bg-dark-black";
  };

  const copyClipBoard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        setCopySuccess("Copied!");
      })
      .catch((err) => {
        console.error("Could not copy text ", err);
      });
  };

  return (
    <div className="   flex flex-col   items-center justify-center   bg-dark-black  min-h-screen font-mono ">
      <h1 className=" text-center pb-6 pt-10   text-gray-400 text-lg  ">
        Password Generator
      </h1>
      <div className=" flex items-center justify-around  bg-dark-grey w-11/12 mb-10 lg:w-[540px] ">
        <input
          className="bg-dark-grey text-white px-6 py-6 "
          type="read"
          readOnly
          value={password}
        />

        {copySuccess && <p className="text-neon-green">{copySuccess}</p>}
        <button onClick={copyClipBoard} className="relative group">
          <img src={greenCopyIcon} className=" mr-4 group-hover:hidden" />
          <img src={grayCopyIcon} className=" hidden mr-4  group-hover:block" />
        </button>
      </div>

      <div className="    flex flex-col items-start pl-6 bg-dark-grey w-11/12 lg:w-[540px] lg:mb-40 ">
        <div className="flex items-center justify-between lg:gap-x-72  gap-x-40 pt-10 lg:pt-8 pb-10 text-white ">
          <h2 className="">Character Length</h2>
          <label className="text-neon-green text-2xl ">{length}</label>
        </div>
        <input
          type="range"
          className="  accent-neon-green  w-11/12 border-solid  "
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />

        <div className=" accent-neon-green pt-6 text-white ">
          <div className="flex gap-x-6 pb-2 ">
            <input
              type="checkbox"
              onChange={() => {
                handleCheckboxChange(setIncludeUpperCase, includeUpperCase);
              }}
              className="w-4"
            />
            <p>Include Uppercase Letters</p>
          </div>
          <div className="flex gap-x-6 pb-2 ">
            <input
              type="checkbox"
              onChange={() => {
                handleCheckboxChange(setIncludeLowerCase, includeLowercase);
              }}
              className="w-4"
            />
            <p>Include Lowercase Letters</p>
          </div>
          <div
            className="flex gap-x-6 pb-2  "
            onChange={() => {
              handleCheckboxChange(setIncludeNumbers, includeNumbers);
            }}
          >
            <input type="checkbox" className="w-4" />
            <p>Include Numbers</p>
          </div>
          <div
            className="flex gap-x-6 "
            onChange={() => {
              handleCheckboxChange(setIncludeSymbols, includeSymbols);
            }}
          >
            <input type="checkbox" className="w-4" />
            <p>Include Symbols</p>
          </div>
        </div>

        <div className="   flex  justify-between mt-6 bg-dark-black    items-center px-3 py-4  w-11/12 ">
          <h1 className="text-gray-500 text-xl">Strength</h1>
          <div className="flex items-center  ">
            <h1 className="text-white pr-4  whitespace-nowrap ">
              {getStrengthLabel()}
            </h1>
            <div className="flex items-end gap-1">
              {[...Array(4)].map((item, index) => (
                <div
                  key={index}
                  className={`w-4 h-8 border-2 ${getStrengthColor(index)}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-start pt-10 w-full">
          <button
            className=" bg-neon-green  py-4 text-center border-2 hover:bg-dark-black  hover:border-neon-green w-11/12 hover:text-neon-green lg:mb-10  "
            onClick={handleGeneratePassword}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
