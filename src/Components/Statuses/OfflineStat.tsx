import React from 'react'

const OfflineStat:React.FC = () => {
  return (
    <div className='Youre-Offline'>
      <div className="offline_stat flex flex-col h-screen justify-start items-center pt-16 bg-transparent">
        <img className='w-44 h-44 md:h-auto md:w-auto' src={require('../../Media/offlineRobo.png')} alt='Turn on Internet :)'/>
       <h1 className="text-2xl md:text-6xl font-poppins font-bold">You're Offline !</h1>
        <button onClick={()=>window.location.reload()} className="btn btn-accent md:btn-md md:w-28 mt-2">Retry</button>
      </div>
    </div>
  )
}

export default OfflineStat