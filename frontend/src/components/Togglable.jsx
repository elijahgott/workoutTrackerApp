import { useState } from 'react'

const Togglable = (props) => {
  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div>
  )
}

export default Togglable