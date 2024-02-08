import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [symbolAllowed, setsymbolAllowed] = useState(false)
  const [password, setpassword] = useState('');

  let genPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789"
    if (symbolAllowed) str += "!@#$%^&*()_+"
    for (let i = 0; i < length; i++) {
      const ranPass = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ranPass);
    }
    setpassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  useEffect(() => {
    genPassword();
  }, [length, numberAllowed, symbolAllowed])

  let [isCopied, setisCopied] = useState(false);

  let copy = () => {
    window.navigator.clipboard.writeText(password);
    setisCopied((copied) => (!copied));
  }


  return (
    <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-48 bg-gray-800'>
      <h1 className='text-white py-1 my-2 text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          value={password}
        />
        <button
          onClick={copy}
          className='bg-blue-700 px-3 '
        >Copy</button>
      </div>
      {
        isCopied ? <div className='border-1 shadow-md mb-4 nt-4 text-center text-white py-2 rounded-lg bg-opacity-50 bg-blue-300 outline-none'>Copied to Clipboard</div> : null
      }

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-3 ml-5'>
          <input type="range"
            name="range" id="range"
            max={32} min={8}
            value={length}
            className='cursor-pointer'
            onChange={(e) => (setlength(e.target.value))}
          />
          <label htmlFor="length" className='text-white'>Length - {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
            name="check1" id="check1"
            defaultChecked={numberAllowed}
            className='cursor-pointer ml-12'
            onChange={() => {
              setnumberAllowed((number) => (!number))
            }} />
          <label htmlFor="number" className='text-white'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
            name="check2" id="check2"
            defaultChecked={symbolAllowed}
            className='cursor-pointer ml-12'
            onChange={() => {
              setsymbolAllowed((symbol) => (!symbol))
            }} />
          <label htmlFor="symbol" className='text-white'>Symbol</label>
        </div>

      </div>

    </div>
  )
}

export default App
