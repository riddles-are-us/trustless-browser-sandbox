import React from 'react';
import {
    HeaderWrapper,
    HeaderLink,
    Button,
} from '../../styles'
import RiddleLogo from '../../assets/img/riddle-logo.png'

export function Header() {
    return (
      <>
    <HeaderWrapper>
        <img src={RiddleLogo} height={24} style={{ margin: '-3px auto auto auto' }} />
        <HeaderLink href='#' target='_self'>
            Top Games
        </HeaderLink>
        <HeaderLink href='#' target='_self'>
            Leaderboard
        </HeaderLink>
        <Button style={{ marginLeft: '600px' }}>Connect Wallet</Button>
    </HeaderWrapper>
      </>
    );
  }

export default Header