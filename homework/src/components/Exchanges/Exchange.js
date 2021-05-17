import React from 'react';

import currency from "../../rates.json"

const inputRef = React.createRef();
const outputRef = React.createRef();

const outputValRef = React.createRef();

let changed = 1;

const inputValRef = React.createRef();

const exchangeValue = () => {
    currency.forEach((item)=>{
        let inputVal;
        let outputVal;
        if(inputRef.current.value === item.code) {
            inputVal = item.value + " " + item.code
            changed = item.value * inputValRef.current.value;
            Math.floor(outputValRef.current.value = changed);
        }
        if(outputRef.current.value === item.code) {
            outputVal = item.value + " " + item.code
            console.log("output", outputVal);
        }
    })
}

export default function Exchange() {
    return (
        <div>
            <div className='p-5 bg-white' style={{
                width: '400px',
                height: '700px'
            }}>
                <img src={process.env.PUBLIC_URL + '/imgs/navbarIcon.png'} />
                <div className='exchange d-flex justify-content-center align-items-center'>
                    <label className='mb-4'>
                        <span className='d-block'>From</span>
                        <input ref={inputValRef} defaultValue={1}/>
                        <select ref={inputRef} defaultValue='USD'>
                            {
                                currency.map((item, key)=> (
                                    <option key={key}>
                                        {item.code}
                                    </option>
                                ))
                            }
                        </select>
                    </label>
                    <img src={process.env.PUBLIC_URL + '/imgs/switch.png'} className='mb-3'/>
                    <label>
                        <span>To</span> <br />
                        <input className='output' ref={outputValRef} defaultValue={changed} disabled/>
                        <select onChange={(e)=> {
                            console.log("e", e.target.value);
                        }} defaultValue='AZN' ref={outputRef}>
                            {
                                currency.map((item, key)=> (
                                    <option key={key}>
                                        {item.code}
                                    </option>
                                ))
                            }
                        </select>
                    </label>
                    <button onClick={exchangeValue}>
                        Exchange
                    </button>
                </div>
            </div>
        </div>
    )
}
