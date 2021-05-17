import React from "react";
import currency from "../../rates.json";

export default function Exchange() {
  const inputRef = React.createRef();
  const outputRef = React.createRef();
  const outputValRef = React.createRef();
  let changed = 1;
  const inputValRef = React.createRef();
  const getInputValues = (fromInp, toOutp) => {
    const fromInput = currency.find((curr) => curr.code === fromInp).value;
    const toOutput = currency.find((curr) => curr.code === toOutp).value;

    const input = inputValRef.current.value;

    return (fromInp / toOutput) * input;
  };

  const exchangeValue = () => {
    const input = currency.find(
      (curr) => curr.code == inputRef.current.value
    ).value;
    const output = currency.find(
      (curr) => curr.code == outputRef.current.value
    ).value;
    outputValRef.current.value = (
      (input * inputValRef.current.value) /
      output
    ).toFixed(4);
  };
  return (
    <div>
      <div
        className="p-5 bg-white"
        style={{
          width: "400px",
          height: "700px",
        }}
      >
        <img src={process.env.PUBLIC_URL + "/imgs/navbarIcon.png"} />
        <div className="exchange d-flex justify-content-center align-items-center">
          <label className="mb-4">
            <span className="d-block">From</span>
            <input ref={inputValRef} defaultValue={1} />
            <select ref={inputRef} defaultValue="USD">
              {currency.map((item, key) => (
                <option key={key}>{item.code}</option>
              ))}
            </select>
          </label>
          <img
            src={process.env.PUBLIC_URL + "/imgs/switch.png"}
            className="mb-3"
          />
          <label>
            <span>To</span> <br />
            <input
              className="output"
              ref={outputValRef}
              defaultValue={changed}
              disabled
            />
            <select
              onChange={(e) => {
                console.log("e", e.target.value);
              }}
              defaultValue="AZN"
              ref={outputRef}
            >
              {currency.map((item, key) => (
                <option key={key}>{item.code}</option>
              ))}
            </select>
          </label>
          <button onClick={exchangeValue}>Exchange</button>
        </div>
      </div>
    </div>
  );
}
