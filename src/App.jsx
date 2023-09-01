
import { useState, useCallback, useEffect, useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  //refHook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$^&*+=`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(()=>{
    passwordGenerator()

  },[length, numberAllowed, charAllowed, passwordGenerator]);

  const copyTOClipboard  = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,32)
    window.navigator.clipboard.writeText(password)
  },[password])



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '>
        <h1 className='text-white text-center pt-3 text-lg'>Random Password Generator</h1>
        <div className='flex shadow-lg rounded-lg overflow-hidden py-5 mb-4 px-2'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 rounded-lg'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyTOClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 -mx-2 rounded-r-lg shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2 py-2'>
          <div className='flex items-center gap-x-1 py-3 pt-0'>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 py-3 pt-0'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            /> 
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 py-3 pt-0'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
