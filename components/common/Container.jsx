import React from 'react'

export default function Container({ children, className }) {
  return (
    <div className={`max-w-6xl lg:px-8 mx-auto px-4  ${className}`}>
      {children}
    </div>
  )
}
