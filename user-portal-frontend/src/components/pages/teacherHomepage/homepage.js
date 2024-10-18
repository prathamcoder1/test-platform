import React from 'react'
import image from "./image.webp"

const homepage = () => {
  return (
    <div>
        <p style={{fontSize:"30px"}}>Welcome to the Homepage!</p>
        <img src={image} />
    </div>
  )
}

export default homepage