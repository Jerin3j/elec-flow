import React from 'react'
import Text from '../Media/Logo/Text'
import LogoSvg from '../Media/Logo/LogoSvg'

const Logo = () => {
  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        }}>
      <LogoSvg/>
      <Text/>
    </div>
  )
}

export default Logo
