import React from "react"
import Button from "../components/Button"

const Wizard = ({ children, back, actions = [], background }) => {

  return (
    <div className="wizard">
      <div className="wizard__background">
        {background}
      </div>
      <div className="wizard__window">
        {back && (
          <div className="wizard__nav">
            <button>back</button>
          </div>
        )}
        <div className="wizard__content">{children}</div>
        <div className="wizard__actions">
          {actions.map(action => (
            <Button key={JSON.stringify(action)} {...action} />
          ))}
        </div>
      </div>
    </div>
  )

}

export default Wizard