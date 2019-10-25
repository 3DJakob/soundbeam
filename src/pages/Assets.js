import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function InputWithButton({callback, placeholder}) {
    const [input = '', setInput] = useState({})

    const divStyle = {
      flex: 0,
    }
  
    const inputStyle = {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    }
  
    let buttonStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      width: 33,
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
        // buttonStyle.width = 0
        callback(input)
      }
    }

    return (
      <div className="InputWithButton" style={divStyle}>
        <input onChange={inputChange} onKeyDown={keyPress} placeholder={placeholder} style={inputStyle}></input>
        <button onClick={buttonClicked} style={buttonStyle}><FontAwesomeIcon style={{color: '#ff7700'}} icon={faAngleRight} /></button>
      </div>
    )
  }

  export default InputWithButton