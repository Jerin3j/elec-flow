import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons'
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import Logo from '../Pages/Logo'
import './Style.css'

const Header = () => {
  return (
    <div className='header'>
    <Logo/>
    <div className="navbar">
            <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem icon={<StarIcon />} command='⌘T'>
                Profile
              </MenuItem>
              <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                Log In
              </MenuItem>
              <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                About
              </MenuItem>
              <MenuItem icon={<EditIcon />} command='⌘C'>
                Contact Us
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
    </div>
  )
}

export default Header
