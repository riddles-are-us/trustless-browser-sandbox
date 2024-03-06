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
  CardsWrapper,
  GameCard,
  GameCardFace1,
  GameCardFace2,
  GameCardFace3,
  GameCardInner,
  GameCardTitle,
  GameCardText,
  ReverseButton,
  GameCardDetailLink,
  RankingBoardWrapper,
  RankingBoardTitle,
  RankingLeaderboardWrapper,
  RankingBadge,
  RankingBadgeInner,
  NormalText,
  RankingBadgeWrapper,
  RankingTitleText,
  RankingImgInner,
} from '../../styles'
import Header from '../../components/header';
import RankingImg1 from '../../assets/img/RankingImg1.png'
import RankingImg2 from '../../assets/img/RankingImg2.png'
import RankingImg3 from '../../assets/img/RankingImg3.png'


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
          good way to familiarize yourself with the important components.
        </BannerText>
        <Input placeholder='Writting a letter of request' style={{ marginLeft: ' -10px' }} />
        <Button>Claim your rewards</Button>
       </BannerContentWrapper>
       <CardsWrapper>
              {/* Card 1 */}
              <GameCard>
                <GameCardFace1 />
                <GameCardInner>
                  <GameCardTitle>Street Pets Pioneer</GameCardTitle>
                  <GameCardText>
                    Launch your game on every platform without loosing
                    sleep. Let LootLocker handle all.
                    <br />
                    <br />
                    <GameCardDetailLink href='#' target="_self">Details</GameCardDetailLink>
                  </GameCardText>
                  <ReverseButton>Play</ReverseButton>
                  <Button>Stake</Button>
                </GameCardInner>
              </GameCard>
              {/* Card 2 */}
              <GameCard>
                <GameCardFace2 />
                <GameCardInner>
                  <GameCardTitle>Unitrek</GameCardTitle>
                  <GameCardText>
                    Launch your game on every platform without loosing
                    sleep. Let LootLocker handle all.
                    <br />
                    <br />
                    <GameCardDetailLink href='#' target="_self">Details</GameCardDetailLink>
                  </GameCardText>
                  <ReverseButton>Play</ReverseButton>
                  <Button>Stake</Button>
                </GameCardInner>
              </GameCard>
              {/* Card 3 */}
              <GameCard>
                <GameCardFace3 />
                <GameCardInner>
                  <GameCardTitle>0xpioneer</GameCardTitle>
                  <GameCardText>
                    Launch your game on every platform without loosing
                    sleep. Let LootLocker handle all.
                    <br />
                    <br />
                    <GameCardDetailLink href='#' target="_self">Details</GameCardDetailLink>
                  </GameCardText>
                  <ReverseButton>Play</ReverseButton>
                  <Button>Stake</Button>
                </GameCardInner>
              </GameCard>
            </CardsWrapper>
            <RankingBoardWrapper>
              <RankingBoardTitle>Ranking Board</RankingBoardTitle>
              <RankingLeaderboardWrapper>
                
                <RankingBadgeWrapper>
                <RankingBadge style={{ marginTop: '200px' }}>
                  <RankingBadgeInner>
                    <RankingImgInner src={RankingImg3} style={{ marginTop: '100px' }} />
                  </RankingBadgeInner>
                </RankingBadge>
                <RankingTitleText>Mr. Titan</RankingTitleText>
                </RankingBadgeWrapper>
                
                <RankingBadgeWrapper>
                <RankingBadge>
                  <RankingBadgeInner>
                    <RankingImgInner src={RankingImg1} style={{ marginTop: '100px' }} />
                  </RankingBadgeInner>
                </RankingBadge>
                <RankingTitleText>Sakurako</RankingTitleText>
                </RankingBadgeWrapper>

                <RankingBadgeWrapper>
                <RankingBadge style={{ marginTop: '200px' }}>
                  <RankingBadgeInner>
                    <RankingImgInner src={RankingImg2} style={{ marginTop: '100px' }} />
                  </RankingBadgeInner>
                </RankingBadge>
                <RankingTitleText>wkfgn45698</RankingTitleText>
                </RankingBadgeWrapper>

              </RankingLeaderboardWrapper>
            </RankingBoardWrapper>
      </ContentWrapper>
    </BannerWrapper>
  </PageWrapper>
    </>
  );
}

export default Home;
