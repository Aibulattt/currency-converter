import React, { useState } from 'react'
import { Button } from './components/Button/Button'
import { Modal } from './components/Modal/Modal'

export const App = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }

    const modalClass = isModalVisible ? 'active' : ''
    const overlay = isModalVisible ? 'overlay' : ''

    return (
        <div className='container'>
            <div className={overlay}></div>
            <Button showModal={showModal}/>
            
            <Modal activeClass={modalClass} hideModal={hideModal} />
        </div>
    )
}