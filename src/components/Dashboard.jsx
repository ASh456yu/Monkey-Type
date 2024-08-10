import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard({
    input,
    time,
    writtenS,
    timer,
    setTimer
}) {


    const handleTimer = (times) => {
        setTimer(times)
    }
    const navigate = useNavigate()
    useEffect(() => {

        if (time / 1000 > timer) {

            navigate("/result")
        }
    }, [time]);


    return (
        <>
            <div className="sample-sentence">

                <div >{timer - parseInt(time / 1000)}</div>
                <div className='timer-control'>
                    <button className='timer' onClick={() => handleTimer(15)}>15s</button>
                    <button className='timer' onClick={() => handleTimer(20)}>20s</button>
                    <button className='timer' onClick={() => handleTimer(25)}>25s</button>
                    <button className='timer' onClick={() => handleTimer(30)}>30s</button>
                </div>
                <div className="all-inputs">
                    <div className='inputs' id='abovediv'>
                        {writtenS.length > 0 ? writtenS.map((character, index) => {
                            if (input.length > index && input[index] === character) {
                                return (
                                    <p key={index} className='letters correct'>{character}</p>
                                )
                            } else if (input.length > index && input[index] !== character) {
                                return (
                                    <p key={index} className='letters incorrect'>{character}</p>
                                )
                            } else {
                                return (
                                    <p key={index} className='letters' style={index == input.length ? { borderLeft: "1px solid black", animation: "blinking 1s infinite", animationFillMode: 'both', animationTimingFunction: "ease-in-out" } : {}}>{character}</p>
                                )
                            }

                        }) : ""}
                    </div>
                    <br />
                </div>
            </div>
        </>
    )
}

export default Dashboard
