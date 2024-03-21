import React from 'react'
import '../css/module.scss'

export const Module = ({isOpen, children, ...attr}) => {
  const clickHandler = (e) => {
    e.stopPropagation();
  }
    
  return (
    <div className={"module " + (isOpen ? 'show' : 'hide')} {...attr}>
        <div className="module-container" onClick={(e) => clickHandler(e)}>
            {children}
        </div>
    </div>
  )
}
