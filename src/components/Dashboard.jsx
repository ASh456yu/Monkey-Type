import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard({
    input,
    time,
    writtenS,
}) {

    const navigate = useNavigate()

    useEffect(() => {

        if (time / 1000 > 30) {
            navigate("/result")
        }
    }, [time]);


    return (
        <>
            <div className="sample-sentence">

                <div >{parseInt(time / 1000)}</div>
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
                                    <p key={index} className='letters' style={index==input.length? {borderLeft: "1px solid black", animation: "blinking 1s infinite", animationFillMode: 'both', animationTimingFunction: "ease-in-out"}: {}}>{character}</p>
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
