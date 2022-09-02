import React from "react"

const IconButton = ({ icon, text, children, onClick }) => {

  return (
    <button
      className="icon-button"
      onClick={onClick}
    >
      <span className="icon-button__icon"></span>
      <span className="icon-button__text">{text ?? children}</span>
    </button>
  )

}

export default IconButton