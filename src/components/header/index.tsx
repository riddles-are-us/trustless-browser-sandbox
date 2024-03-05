import React from 'react';
import {
    HeaderWrapper,
    HeaderLink,
} from '../../styles'
import RiddleLogo from '../../assets/img/riddle-logo.png'

export function Header() {
    return (
      <>
    <HeaderWrapper>
        <img src={RiddleLogo} height={24}/>
        <HeaderLink href='#' target='_self'>
            Top Games
        </HeaderLink>
        <HeaderLink href='#' target='_self'>
            Leaderboard
        </HeaderLink>
    </HeaderWrapper>
      </>
    );
  }

export default Header