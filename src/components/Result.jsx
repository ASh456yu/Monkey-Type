import React, { useEffect, useState } from 'react'

function Result({
  myinput,
  writtenS,
  time,
  sentence,
  myinput2
}) {


  const [accurate, setAccurate] = useState(0)
  const [speedCal, setSpeedCal] = useState(0)

  const res = () => {
    let x = 0;
    myinput.forEach((element, index) => {
      if (element !== writtenS[index]) {
        x++
      }
    });

    if (myinput.length > 0) {
      let accuracy = (((myinput.length - x) * 100) / myinput.length)
      let inputWords = myinput2.split(" ")
      setSpeedCal(parseInt(inputWords.length * 60000 / time))
      setAccurate(accuracy.toFixed(2))
    } else {
      setAccurate(0)
    }

  }


  useEffect(() => {
    res()
  }, [myinput, writtenS])
  return (
    <div>
      <h2>Accuracy</h2>
      <h3>{accurate}%</h3>
      <h2>Speed</h2>
      <h3>{speedCal}Wpm</h3>
      <h2>Time</h2>
      <h3>{parseInt(time/1000)}</h3>
    </div>
  )
}

export default Result
