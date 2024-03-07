import React from 'react';
import {
  Button,
  ContentWrapper,
  CopyrightText,
  FooterIconWrapper,
  FooterSectionInner,
  FooterSectionWrapper,
  FooterTitle,
  FooterWrapper,
} from '../../styles'
import RiddleLogoOnly from '../../assets/img/riddle-logo-only.png'
import DiscordIcon from '../../assets/img/discord.png'
import TwitterIcon from '../../assets/img/twitter.png'
import TelegramIcon from '../../assets/img/telegram.png'

export function Footer() {
    return (
      <>
    <FooterWrapper>
      <ContentWrapper>
        <FooterSectionWrapper>
          <FooterSectionInner>
            <img src={RiddleLogoOnly} height={64}/>
          </FooterSectionInner>
          <FooterSectionInner>
            <Button style={{ marginLeft: '-230px' }} >Submit your game</Button>
          </FooterSectionInner>
          <FooterSectionInner />
          <FooterSectionInner style={{ textAlign: 'right' }}>
            <FooterTitle>Community</FooterTitle>
            <FooterIconWrapper><img src={TwitterIcon} width={24} /></FooterIconWrapper>
            <FooterIconWrapper><img src={DiscordIcon} width={24} /></FooterIconWrapper>
            <FooterIconWrapper><img src={TelegramIcon} width={24} /></FooterIconWrapper>
            <br />
            <br />
            <CopyrightText>Copyright © 2024 The Riddle of the Scroll. All rights reserved.</CopyrightText>
          </FooterSectionInner>
        </FooterSectionWrapper>
        
        </ContentWrapper>
    </FooterWrapper>
      </>
    );
  }

export default Footer