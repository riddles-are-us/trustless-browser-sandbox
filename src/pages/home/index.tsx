import React from 'react';
import {
  PageWrapper,
  BannerWrapper,
  BannerContentWrapper,
  ContentWrapper,
  MainTitle,
  SubTitle,
  BannerText,
  Button,
  Input,
} from '../../styles'
import Header from '../../components/header';


export function Home() {
  return (
    <>
  <PageWrapper>
    <BannerWrapper>
      <ContentWrapper>
      <Header />
      <BannerContentWrapper>
        <MainTitle>The riddle of the scroll</MainTitle>
        <SubTitle>TRUSTLESS GAME ROLLUP</SubTitle>
        <BannerText>
          Writting a letter of request is a common occurrence in many
          professional roles. If you ever wondered how to compose one
          professionaly, exploring a sample request letter can be a
          good way to familiarize yourself with the important components..
        </BannerText>
        <Input placeholder='Writting a letter of request' style={{ marginLeft: ' -10px' }} />
        <Button>Claim your rewards</Button>
       </BannerContentWrapper>
      </ContentWrapper>
    </BannerWrapper>
  </PageWrapper>
    </>
  );
}

export default Home;
