import React from "react";
import currency from "../../rates.json";
export default function Exchange() {

  const inputRef = React.createRef();
  const outputRef = React.createRef();
  const outputValRef = React.createRef();
  let changed = 1;
  const inputValRef = React.createRef();
  const exchangeValue = () => {
    currency.forEach((item) => {
      if (outputRef.current.value === item.code) {
        outputValRef.current.value = item.value;
      }
      if (inputRef.current.value === item.code) {
        changed =
          (item.value * inputValRef.current.value) / outputValRef.current.value;
        outputValRef.current.value = changed.toFixed(2);
      }
    });
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
