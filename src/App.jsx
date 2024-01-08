import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [pwd, setPwd] = useState("");
  const passwordRef=useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXVZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str = str + "0123456789";
    }
    if (char) {
      str = str + "!@#$%^&*()_~<>:{}|?,./;'[]`";
    }
    for (let i = 0; i <= length; i++) {
      var randomIndex = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(randomIndex);
    }
    setPwd(pass);
  }, [length, number, char, setPwd]);
  useEffect(()=>{
    passwordGenerator();
  },[length,number,char,passwordGenerator])
  const copyPwd=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pwd)
  },[pwd])
  return (
    <div>
      <h1 className="text-4xl text-center font-normal hover:font-semibold my-10">
        Password Generator
      </h1>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-3 my-8 text-pink-300 bg-gray-900 font-semibold">
        <div className="shadow rounded-lg overflow-hidden mb-1">
          <p className="ml-2 my-3 text-center font-normal hover:font-bold">
            generate password
          </p>
          <div className="flex">
            <input
              type="text"
              value={pwd}
              className="text-2xl text-red-800 font-normal hover:font-bold outline-none w-full py-1 px-1"
              placeholder="password generate"
              readOnly
              ref={passwordRef}
            />
            <button className="outline-none bg-blue-500 text-white px-2 py-1 shrink-0 font-normal hover:font-semibold hover:bg-blue-800" onClick={copyPwd}>
              Copy
            </button>
          </div>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1  mt-4">
            <input
              type="range"
              min={6}
              max={25}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="ml-0.6">length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1 mt-4 ml-1 py-2">
            <input 
              type="checkbox" 
              id="numb" 
              defaultChecked={number}
              onChange={()=>{
                setNumber((prev)=>!prev)
              }}
            />
            <label htmlFor="numb" className="ml-0.5">Numbers</label>
            <input 
              type="checkbox" 
              id="char" 
              defaultChecked={char}
              onChange={()=>{
                setChar((prev)=>!prev)
              }}
            />
            <label htmlFor="char" className="ml-0.5">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
