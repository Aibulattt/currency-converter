import React from 'react'
import './Button.scss'

export const Button = ({showModal}) => { 

    const handleClick = () => {

    }

    return (
        <button 
            className='btn-open'
            onClick={showModal}
        >
            Start
        </button>
    )
}