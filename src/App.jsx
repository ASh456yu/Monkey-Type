import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Result from './components/Result'
import Dashboard from './components/Dashboard'
import { useRef } from 'react'


function App() {

  const sentence = "suscipit assumenda perspiciatis dolorem adipisci voluptates qui ducimus impedit magnam velit commodi explicabo distinctio aspernatur dolore? Dolorem laudantium porro, ipsum ad esse hic libero earum eveniet quidem. Reiciendis facilis quasi necessitatibus porro, inventore cupiditate? Nihil aspernatur eos consectetur fuga esse adipisci illo"
  const [writtenS, setWrittenS] = useState([])
  const [myinput, setInput] = useState([])
  const [myinput2, setInput2] = useState("")
  const [hasStarted, setHasStarted] = useState(0)
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const intervalRef = useRef(null);
  const [pressedChar, serPressedChar] = useState("")
  



  const handleReset = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };


  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (hasStarted === 0) {
        setHasStarted(1)
        handleStart()
      }

      const pressed = e.key;
      if (/^[a-zA-Z]$/.test(pressed) || e.code === 'Space') {
        setInput((prev) => [...prev, pressed]);
      } else if (pressed === 'Backspace') {
        setInput((prev) => prev.slice(0,-1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };


  }, [myinput])


  useEffect(() => {
    let arrays = [...sentence]
    setWrittenS(arrays)


    if (isActive && isPaused === false) {
      intervalRef.current = setInterval(() => {
        setTime((mytime) => mytime + 1);
      }, 1);

    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

  }, [isActive, isPaused])

  useEffect(() => {

    if (time / 1000 > 30 && intervalRef.current) {
      handleReset();
    }

  }, [time]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard serPressedChar={serPressedChar} pressedChar={pressedChar} input={myinput} myinput2={myinput2} time={time} sentence={sentence} intervalRef={intervalRef} writtenS={writtenS} />} />
          <Route path="/result" element={<Result myinput={myinput} writtenS={writtenS} time={time} myinput2={myinput2} sentence={sentence} />} />
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
