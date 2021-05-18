import React from "react";
import currency from "../../rates.json";

export default function Exchange() {
  const inputRef = React.createRef();
  const outputRef = React.createRef();
  const outputValRef = React.createRef();
  const errorRef = React.createRef();
  const alertMessageRef = React.createRef();
  const counterRef = React.createRef();
  const isError = false;
  let counter = 1;
  let changed = 1;
  const inputValRef = React.createRef();
  const animateRef = React.createRef();
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

    if (outputValRef.current.value === "NaN") {
      errorRef.current.classList.remove("hidden");
      errorRef.current.classList.add("show");
    } else {
      errorRef.current.classList.add("hidden");
      errorRef.current.classList.remove("show");
    }
  };
  const changeConverterInputToOutput = () => {

        alertMessageRef.current.classList.remove("hidden");
        alertMessageRef.current.classList.add("show");
    setTimeout(()=> {
        alertMessageRef.current.classList.add("hidden");
        alertMessageRef.current.classList.remove("show");
    }, 2200)

    let input = inputRef.current.value;
    let output = outputRef.current.value;
    let inputToOutput = input;
    input = output;
    output = inputToOutput;
    inputRef.current.value = input;
    outputRef.current.value = output;
    exchangeValue();
  };

  const onDragHandler = (e) => {
      console.log(e);

    counterRef.current.classList.add("dragger");
    if (e.pageX > 700) {
      let inputValNum = Number(inputValRef.current.value)
    //   alert(counter)
    console.log(counter);
      counter += 1.5;
      inputValNum = counter;
      inputValRef.current.value = inputValNum
    } else if (inputValRef.current.value !== "1" && e.pageX < 700) {
      counter -= 1.5;
      inputValRef.current.value = counter;

      if (counter < "0") {
        counter = 0;
        inputValRef.current.value = counter;
      }
    }
  };

  const disCounter = () => {
    if (counter !== 0) {
      counter -= 1;
      inputValRef.current.value = counter;
      exchangeValue();
    }
  };

  const upCounter = () => {
    counter += 1;
    inputValRef.current.value = counter;
    exchangeValue();
  };

  return (
    <div ref={animateRef} class="opacity">
      <div
        className="p-5 bg-white"
        style={{
          width: "400px",
          height: "700px",
        }}
      >
        <img src={process.env.PUBLIC_URL + "/imgs/navbarIcon.png"} />
        <div className="exchange d-flex justify-content-center align-items-center">
        <span ref={alertMessageRef} className="text-success my-5 hidden">
            Change Valuta
          </span>
          <label className="mb-4">
            <span className="d-block">From</span>
            <input
              ref={inputValRef}
              onFocus={(e)=>{
                //   Number(inputValRef.cur)
                Number(inputValRef.current.value)
                console.log('inp',inputValRef.current.value);
                console.log('ee',e.target.value);
              }}
              defaultValue={1}
              onChange={(e) => {
                Number(inputValRef.current.value)
              }}
              //   type='number' // Əgər silsəz şərt yoxlanılır
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  exchangeValue();
                }
              }}
            />
            <select ref={inputRef} defaultValue="USD">
              {currency.map((item, key) => (
                <option key={key}>{item.code}</option>
              ))}
            </select>
          </label>
          <div
            classList="img-side"
            style={{ position: "relative", marginTop: "20px" }}
          >
            <span
              onClick={disCounter}
              style={{
                position: "absolute",
                top: "-15px",
                fontSize: "25px",
                cursor: "pointer",
              }}
            >
              -
            </span>
            <img src={process.env.PUBLIC_URL + "./line.png"} className="mb-3" />
            <img
              src={process.env.PUBLIC_URL + "./imgs/buttonCounter.png"}
              style={{cursor: 'pointer'}}
              className="counter"
              onClick={changeConverterInputToOutput}
              ref={counterRef}
              onDrag={(e) => onDragHandler(e)}
              onDragEnd={() => {
                counterRef.current.classList.remove("dragger");
                exchangeValue();
              }}
            />

            <span
            onClick={upCounter}
              style={{ position: "absolute", top: "-15px", fontSize: "25px", cursor: 'pointer' }}
            >
              +
            </span>
          </div>
          <label>
            <span>To</span> <br />
            <input
              className="output"
              ref={outputValRef}
              defaultValue={changed}
              disabled
              min={0}
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
          <span ref={errorRef} className="text-danger mt-5 hidden">
            Please write only numbers
          </span>
        </div>
      </div>
    </div>
  );
}
