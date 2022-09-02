import React, { useState, useMemo, useRef, useLayoutEffect } from "react"
import anime from "animejs"

const TextField = ({

  // Basic field props
  name,
  label,
  placeholder,

  // Basic React controlled components
  value,
  onChange,

  // Validation and formatting component
  validate,
  format,
  parser,

  // These props can be used to create custom actions
  type = "text",
  trailing,
  trailingOnClick,
  children

}) => {

  // Create some local state
  const [error, setError] = useState()
  const [touched, setTouched] = useState(false)
  const [blurred, setBlurred] = useState(false)

  // Create some refs for handling messages
  const messageContainer = useRef()
  const previousError = useRef()

  // Create Change handler
  const handleChange = useMemo(() => {

    // Define Our Validator function
    const validator = (val) => {

      const parsedVal = parser ? parser(val) : val

      if (!validate) return

      // Handle Multiple Validaitons
      else if (Array.isArray(validate)) {
        let err

        for (const validation of validate) {
          err = validation(parsedVal)
          if (err) break
        }

        return err
      }

      // Just do some basic bitch validation
      else return validate(val)

    }

    // Define our formatter function
    const formatter = (val) => {

      if (!format) return val

      else return format(val)

    }

    // Return click handler
    return ({ target }) => {

      // First Run Validation
      const validationError = validator(target.value)
      if (validationError !== error) setError(validationError)

      // Next Run a formatter Mask
      const formattedValue = formatter(target.value)

      // Finally Update State
      onChange(formattedValue)

    }

  }, [onChange, validate, format, parser, error])

  // Animate Error State
  useLayoutEffect(() => {

    // If there is no error and no previous error then nothing changes
    if (!error && !previousError.current) return

  }, [error])

  // Render tha damn thing
  return (
    <div className="text-field">
      {label && (
        <label
          className="text-field__label"
          htmlFor={`tf-${name}`}
        >
          {label}
        </label>
      )}
      <div className="text-field__field">
        <input
          className="text-field__input"
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onBlur={(e) => {
            if (!touched) setTouched(true)
            handleChange(e)
          }}
        />
        {children}
        {trailing && (
          <button
            className="text-field__input-trailing"
            onClick={trailingOnClick}
          >
            <span>{trailing}</span>
          </button>
        )}
      </div>
      <div className="text-field__messages" ref={messageContainer} style={{
        maxHeight: "10rem"
      }}>
        <div className="text-field__error">
          <span style={{ display: "none" }}>Icon Goes here</span>
          <p>{error}</p>
        </div>
      </div>
    </div>
  )

}

export const PasswordField = ({ value, ...props }) => {

  const [mask, setMask] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const overlay = useRef()

  useLayoutEffect(() => {

    const animateMask = async () => {

      // Get child elements
      const [unmasked, masked] = overlay.current.children

      // Set up animation properties
      const stagger = 65
      const offset = stagger * unmasked.children.length * 0.75

      // Only run the animation if there is text in the input
      if (unmasked.children.length) {

        // Next Animate the overlay
        const timeline = anime.timeline({
          easing: "easeOutQuart",
          duration: 180
        })

        if (mask) {
          timeline.add({
            targets: masked.children,
            translateY: [0, -12],
            opacity: [1, 0],
            delay: anime.stagger(stagger),
            easing: "easeInQuart"
          })

          timeline.add({
            targets: unmasked.children,
            translateY: [12, 0],
            opacity: [0, 1],
            delay: anime.stagger(stagger)
          }, `-=${offset}`)
        }

        else {
          timeline.add({
            targets: unmasked.children,
            translateY: [0, 12],
            opacity: [1, 0],
            delay: anime.stagger(stagger),
            easing: "easeInQuart"
          })

          timeline.add({
            targets: masked.children,
            translateY: [-12, 0],
            opacity: [0, 1],
            delay: anime.stagger(stagger)
          }, `-=${offset}`)
        }

        await timeline.finished

      }

      // Remove old animation code!
      setMask(!mask)
      setIsAnimating(false)

    }

    if (isAnimating) animateMask()

  }, [isAnimating, mask])

  return (
    <TextField
      type={mask ? "password" : "text"}
      trailing="Eye"
      trailingOnClick={() => !isAnimating && setIsAnimating(true)}
      value={value}
      validate={[
        (val) => (!val || !val.length) && "Password is required"
      ]}
      {...props}
    >
      {isAnimating && (
        <div className="text-field__overlay" ref={overlay}>
          <p>
            {[...value].map((char, i) => (
              <span key={`${char}-${i}`}>
                {char === " " ? <>&nbsp;</> : char}
              </span>
            ))}
          </p>
          <p>
            {[...value].map((char, i) => (
              <span key={`${char}-${i}`}>&bull;</span>
            ))}
          </p>
        </div>
      )}
    </TextField>
  )
}

export const EmailField = (props) => {

  return (
    <TextField
      validate={[
        // Make sure field is required
        (val) => !val && "Email address is required",

        // Make sure the email address includes the @ symbol
        (val) => !val.includes("@") && "Email must include @"
      ]}
      {...props}
    />
  )

}

export default TextField