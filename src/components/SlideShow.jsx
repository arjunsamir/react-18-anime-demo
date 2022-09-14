import React, { useState, useMemo, useLayoutEffect, useRef } from "react"

// Form Slides Array so we can standardize everyhing into an array
const formSlides = (slides) => {

  return slides.map(slide => {
    if (!slide) return null
    return Array.isArray(slide) ? slide : [slide]
  }).filter(slide => !!slide)

}

// A hook that makes the slideshow functional
const useAnimatedSlideShow = (slides) => {

  // Container ref for targeting animation slides
  const container = useRef()

  // Local Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0)

  // A handy function to check if we have the current slide
  const isCurrentSlide = (slide) => slide === currentSlide

  // A handy function to automatically get the correct active class
  const getActiveClass = (slide, activeClass = "active") => {
    return isCurrentSlide(slide) ? activeClass : ""
  }

  // Animate Slide Transition
  useLayoutEffect(() => {

  }, [currentSlide])

  return {
    container,
    currentSlide,
    setCurrentSlide,
    isCurrentSlide,
    getActiveClass
  } 

}

// Main Slide Show component
const SlideShow = (props) => {

  // Form Slides Array
  const slides = useMemo(() => formSlides(props.slides), [props.slides])

  const {
    container,
    setCurrentSlide,
    getActiveClass
  } = useAnimatedSlideShow()

  return (
    <div className="slide-show">
      <div
        className="slide-show__slides"
        ref={container}
      >
        {slides && slides.length && slides.map((layers, index) => (
          <div
            key={index}
            className={`slide-show__slide slide-show__slide--${index} ${getActiveClass(index)}`.trim()}
          >
          {layers.map((layer, i) => (
            <div
              key={i}
              className="slide-show__slide-layer"
              style={{ zIndex: i }}
            >
              {layer}
            </div>
          ))} 
          </div>
        ))}
      </div>
      <div className="slide-show__controls">
        {slides && slides.length && slides.map((_, index) => (
          <div
            key={index}
            className={`slide-show__target ${getActiveClass(index)}`.trim()}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )

}

// Slide Layout Wrapper
export const SlideLayer = ({ children }) => {

  return (
    <div className="slide-show__layer">
      {children}
    </div>
  )

}

// Slide Content Wrapper
export const SlideContent = () => {}

// Slide Background Wrapper
export const SlideBackground = ({ src, color, gradient, cover, children, parallax = false }) => {

  return (
    <div className={`slide-show__slide-background ${parallax ? "slide-show__slide-background--parallax" : ""}`.trim()}>
      {children}
    </div>
  )

}

export default SlideShow

const example = (
  <SlideShow>
    <Slide>
      <SlideBackground color="blue" />
      <SlideContent>
        <img />
        <h2>This is a slide title</h2>
        <p>This is some content that goes on the slide. I don't know how much we want to say but it shouldn't be too long.</p>
      </SlideContent>
    </Slide>
  </SlideShow>
)