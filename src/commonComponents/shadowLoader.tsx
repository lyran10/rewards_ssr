import React from 'react'

export const ShadowLoader = () => {
  return (
    <div className="w-full h-full bg-gray-100 rounded-md relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-loader"></div>
  </div>
  )
}
