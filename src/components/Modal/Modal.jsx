import React, { useEffect, useState } from 'react'
import './Modal.scss'

export const Modal = ({activeClass, hideModal}) => {

    useEffect(async () => {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js') 
        const res = await response.json()
        console.log(res);
  
        const {USD, EUR} = res.Valute
        setValute({rub: 1, usd: USD.Value, eur: EUR.Value})
        setValueInputTo(USD.Value)

        setCurrentFrom({rub: {title: 'rub', isActive: false, value: 1}, usd: {title: 'usd', isActive: true, value: USD.Value}, eur: {title: 'eur', isActive: false, value: EUR.Value }})
        setCurrentValuteTo({rub: {title: 'rub', isActive: true, value: 1}, usd: {title: 'usd', isActive: false, value: USD.Value}, eur: {title: 'eur', isActive: false, value: EUR.Value }})

    }, [valute, currentValuteFrom, currentValuteTo])

    const [valueInputFrom, setValueInputFrom] = useState(1)
    const [valueInputTo, setValueInputTo] = useState(valute?.usd)

   

    const handleChangeFrom = ev => {
        setValueInputFrom(ev)
    }

    const handleChangeTo = ev => {
        setValueInputTo(ev)
    }

    const [valute, setValute] = useState({
        rub: 1,
        usd: 0,
        eur: 0
    })

    const [currentValuteFrom, setCurrentFrom] = useState({
       rub: {title: 'rub', isActive: false, value: 1},
       usd: {title: 'usd', isActive: true, value: 0},
       eur: {title: 'eur', isActive: false, value: 0}
    })
    const [currentValuteTo, setCurrentValuteTo] = useState({
        rub: {title: 'rub', isActive: true, value: 1},
        usd: {title: 'usd', isActive: false, value: 0},
        eur: {title: 'eur', isActive: false, value: 0}
    })

    const changeCurrentValuteFrom = (id) => {
        if (id === currentValuteTo.rub.title) setCurrentFrom({rub: {title: 'rub', isActive: true, value: valute.rub}, usd: {title: 'usd', isActive: false, value: valute.usd}, eur: {title: 'eur', isActive: false, value: valute.eur }})
        if (id === currentValuteTo.usd.title) setCurrentFrom({rub: {title: 'rub', isActive: false, value: valute.rub}, usd: {title: 'usd', isActive: true, value: valute.usd}, eur: {title: 'eur', isActive: false, value: valute.eur }})
        if (id === currentValuteTo.eur.title) setCurrentFrom({rub: {title: 'rub', isActive: false, value: valute.rub}, usd: {title: 'usd', isActive: false, value: valute.usd}, eur: {title: 'eur', isActive: true, value: valute.eur }})
    }
   
    const changeCurrentValuteTo = (id) => {
        if (id === currentValuteTo.rub.title) setCurrentValuteTo({rub: {title: 'rub', isActive: true, value: valute.rub}, usd: {title: 'usd', isActive: false, value: valute.usd}, eur: {title: 'eur', isActive: false, value: valute.eur }})
        if (id === currentValuteTo.usd.title) setCurrentValuteTo({rub: {title: 'rub', isActive: false, value: valute.rub}, usd: {title: 'usd', isActive: true, value: valute.usd}, eur: {title: 'eur', isActive: false, value: valute.eur }})
        if (id === currentValuteTo.eur.title) setCurrentValuteTo({rub: {title: 'rub', isActive: false, value: valute.rub}, usd: {title: 'usd', isActive: false, value: valute.usd}, eur: {title: 'eur', isActive: true, value: valute.eur }})
    }

    const calculateValute = () => {
        for (const key in currentValuteFrom) {
            if (Object.hasOwnProperty.call(currentValuteFrom, key)) {
                const element = currentValuteFrom[key]
                if (element.isActive === true) {
                    setValueInputTo((valueInputFrom * element.value).toFixed(2))
                }

            }
        }
    }

    // useEffect(() => {
    //     for (const key in currentValuteTo) {
    //         if (Object.hasOwnProperty.call(currentValuteTo, key)) {
    //             const element = currentValuteTo[key];
    //             if (element.isActive === true) {
    //                 setValueInputTo((valueInputFrom * element.value))
    //             }
    //         }
    //     }
    // }, [currentValuteTo])

    useEffect(() => {
        if (valueInputFrom !== null) {
            calculateValute()
        }
    }, [valueInputFrom, currentValuteFrom])

    return (
        <div className={`modal ${activeClass}`}>
            <h2>Конвертер валют</h2>
            <div className='modal__close'>
                <button onClick={hideModal} className='modal__btn-close'>
                    <span className='btn-close'></span>
                    <span className='btn-close'></span>
                </button>
            </div>
            <div className="modal__converter">
                <div className="modal__converter-top">
                    <p className='modal__converter-title'>У меня есть:</p>
                    <div className="modal__converter-btns">
                        <button 
                            className={`modal__converter-btn ${currentValuteFrom.rub.isActive ? 'active' : ''} `} 
                            id='rub'
                            onClick={(ev) => changeCurrentValuteFrom(ev.currentTarget.id)}
                        >
                            RUB 
                            <span>{valute.rub}</span>
                        </button>
                        <button 
                            className={`modal__converter-btn ${currentValuteFrom.usd.isActive ? 'active' : ''} `} 
                            id='usd'
                            onClick={(ev) => changeCurrentValuteFrom(ev.currentTarget.id)}
                        >
                            USD 
                            <span>{valute.usd}</span>
                        </button>
                        <button 
                            className={`modal__converter-btn ${currentValuteFrom.eur.isActive ? 'active' : ''} `} 
                            id='eur'
                            onClick={(ev) => changeCurrentValuteFrom(ev.currentTarget.id)}
                        >
                            EUR 
                          <span>  {valute.eur}</span>
                        </button>
                    </div>
                </div>
                <input
                    className='modal__converter-input' 
                    type="number" 
                    value={valueInputFrom}
                    onChange={(ev) => handleChangeFrom(ev.target.value)}
                />
            </div>
            <div className="modal__converter">
                <div className="modal__converter-top">
                    <p className='modal__converter-title'>Хочу приобрести:</p>
                    <div className="modal__converter-btns">
                        <button 
                            className={`modal__converter-btn ${currentValuteTo.rub.isActive ? 'active' : ''} `} 
                            id='rub'
                            onClick={(ev) => changeCurrentValuteTo(ev.currentTarget.id)}
                        >
                            RUB 
                            <span>{valute.rub}</span>
                        </button>
                        <button 
                            className={`modal__converter-btn ${currentValuteTo.usd.isActive ? 'active' : ''} `} 
                            id='usd'
                            onClick={(ev) => changeCurrentValuteTo(ev.currentTarget.id)}
                        >
                            USD 
                            <span>{valute.usd}</span>
                        </button>
                        <button 
                            className={`modal__converter-btn ${currentValuteTo.eur.isActive ? 'active' : ''} `} 
                            id='eur' 
                            onClick={(ev) => changeCurrentValuteTo(ev.currentTarget.id)}
                        >
                            EUR 
                          <span>  {valute.eur}</span>
                        </button>
                    </div>
                </div>
                <input 
                    className='modal__converter-input' 
                    type="number" 
                    value={valueInputTo}
                    onChange={(ev) => handleChangeTo(ev.target.value)}
                />
            </div>
        </div>
    )
}