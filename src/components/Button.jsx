import React from "react"

const Button = ({ text, children, onClick }) => {

  return (
    <button
      className="button"
      onClick={onClick}
    >
      {text ?? children}
    </button>
  )

}

export default Button