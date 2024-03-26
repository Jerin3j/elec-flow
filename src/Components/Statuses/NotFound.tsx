import React from 'react'

const NotFound = () => {
  return (
    <div className='404 flex justify-center bg-white dark:bg-black h-screen'>
      <img src={require('../../Media/404.png')} alt="Not Found :)" />
    </div>
  )
}

export default NotFound