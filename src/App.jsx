import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Result from './components/Result'
import Dashboard from './components/Dashboard'
import { useRef } from 'react'


function App() {
  const actualSentence = "The solar system $% is made up *& of the sun eight planets 0989 and various othe98r celestial objects )( )like moons asteroids =+ and comets. The s43run is at the center of the solar system providing heat %^083 and light to all the planets. The eight plan35ets in our%^ solar system are Me4rcury Venus[] Earth Mars Jupiter Saturn Uranus&^% and Neptune"
  const [sentence, setSentence] = useState("The solar system $% is made up *& of the sun eight planets 0989 and various othe98r celestial objects )( )like moons asteroids =+ and comets. The s43run is at the center of the solar system providing heat %^083 and light to all the planets. The eight plan35ets in our%^ solar system are Me4rcury Venus[] Earth Mars Jupiter Saturn Uranus&^% and Neptune")
  const [writtenS, setWrittenS] = useState([])
  const [myinput, setInput] = useState([])
  const [myinput2, setInput2] = useState("")
  const [hasStarted, setHasStarted] = useState(0)
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(15)
  const intervalRef = useRef(null);


  const removePunctuation = () => {
    let withoutPunc = actualSentence.replace(/[^\w\s]|_/g, "")
    setSentence(withoutPunc)
    let arrays = [...sentence]
    setWrittenS(arrays)
  }

  const actualSent = () => {
    setSentence(actualSentence)
    let arrays = [...sentence]
    setWrittenS(arrays)
  }

  const removeNumber = () => {
    let withoutNumber = actualSentence.replace(/\d+/g, "")
    setSentence(withoutNumber)
    let arrays = [...sentence]
    setWrittenS(arrays)
  }

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
        setInput((prev) => prev.slice(0, -1));
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
        setTime((mytime) => mytime + 10);
      }, 10);

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

    if (time / 1000 > timer && intervalRef.current) {
      handleReset();
    }

  }, [time]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard
            input={myinput}
            time={time}
            writtenS={writtenS}
            timer={timer}
            setTimer={setTimer}
            removePunctuation={removePunctuation}
            actualSent={actualSent}
            removeNumber={removeNumber}
          />}
          />
          <Route path="/result" element={<Result myinput={myinput} writtenS={writtenS} time={time} myinput2={myinput2} sentence={sentence} />} />
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
