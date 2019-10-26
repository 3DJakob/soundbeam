import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function InputWithButton({callback, onClick, placeholder, inputRef, password, showButton = true, show = true}) {
  const [input, setInput] = useState('')
  const passwordAttribute = password ? 'password' : ''

  const divStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: showButton ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)',
    transition: '500ms',

    opacity: show ? 1 : 0
  }

  const inputStyle = {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    transition: '500ms',
    color: showButton ? '#000' : '#fff'
  }

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 33,
    transform: showButton ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'right',
    transition: '500ms',
    backgroundColor: 'white',
    boxShadow: "0 0 50px rgba(0, 0, 0, 0.2)",
  }

  const inputChange = (event) => {
    setInput(event.target.value)
  }

  const buttonClicked = () => {
    returnInput()
  }

  const keyPress = (event) => {
    if (event.key === 'Enter') {
      returnInput()
    }
  }

  const returnInput = () => {
    if (Object.keys(input).length !== 0) {
      callback(input)
    }
  }

  return (
    <div className="InputWithButton" style={divStyle} onClick={onClick}>
      <input type={passwordAttribute} ref={inputRef} onChange={inputChange} onKeyDown={keyPress} placeholder={placeholder} style={inputStyle}></input>
      <button onClick={buttonClicked} style={buttonStyle}><FontAwesomeIcon style={{color: '#ff7700'}} icon={faAngleRight} /></button>
    </div>
  )
}

export default InputWithButton