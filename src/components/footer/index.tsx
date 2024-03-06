import React from 'react';
import {
  Button,
  ContentWrapper,
    CopyrightText,
    FooterSectionInner,
    FooterSectionWrapper,
    FooterTitle,
    FooterWrapper,
    HeaderLink,
} from '../../styles'
import RiddleLogoOnly from '../../assets/img/riddle-logo-only.png'

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
            <Button>Submit your game</Button>
          </FooterSectionInner>
          <FooterSectionInner />
          <FooterSectionInner style={{ textAlign: 'right' }}>
          <FooterTitle>Community</FooterTitle>
          [Twitter] [Discord] [Telegram]
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