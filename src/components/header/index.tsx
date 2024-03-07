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
        <img src={RiddleLogo} height={24} style={{ margin: '-10px auto auto auto' }} />
        <HeaderLink href='#' target='_self' style={{ paddingLeft: '50px' }} >
            Top Games
        </HeaderLink>
        <HeaderLink href='#' target='_self'>
            Top Leaderboard
        </HeaderLink>
        <Button style={{ marginLeft: '500px' }}>Connect Wallet</Button>
    </HeaderWrapper>
      </>
    );
  }

export default Header