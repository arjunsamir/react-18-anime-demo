import React, { useState } from "react"
import Wizard from "../layouts/Wizard"
import { EmailField, PasswordField } from "../components/TextField"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Wizard
      background={(
        <div
          style={{
            background: "linear-gradient(270deg, #c4effd 0%, #16a6b7 100%)",
            height: "100%",
            width: "100%"
          }}
        />
      )}
    >
      <h2>Welcome Back</h2>
      <p>ya mad boi. this is some hot markup right off the press. idk what the point of this is but here it is...</p>
      <EmailField
        name="email"
        label="Email Address"
        placeholder="me@arjunsamir.com"
        value={email}
        onChange={setEmail}
      />
      <PasswordField
        name="password"
        label="Password"
        value={password}
        onChange={setPassword}
        setPassword={setPassword}
        placeholder="whagwan"
      />
    </Wizard>
  )

}

export default Login