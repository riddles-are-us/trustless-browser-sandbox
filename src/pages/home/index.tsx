import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  RankingBadgeWrapper,
  RankingTitleText,
  RankingImgInner,
  PartnersWrapper,
  TopPageWrapper,
  PartnersInnerWrapper,
  PartnersBannerWrapper,
  TableWrapper,
  TitleRow,
  TableCell,
  TableTitle,
  Spacer50,
  Spacer100,
  TableRow,
  BulletBlue,
  BulletGrey,
  StakeButton,
  CardDetailWrapper,
  CardButtons,
} from '../../styles'
import Header from '../../components/header';
import Footer from '../../components/footer';
import RankingImg1 from '../../assets/img/RankingImg1.png'
import RankingImg2 from '../../assets/img/RankingImg2.png'
import RankingImg3 from '../../assets/img/RankingImg3.png'
import POkxVentures from '../../assets/img/p-okx-ventures.png'
import PScroll from '../../assets/img/p-scroll.png'
import PAnimoca from '../../assets/img/p-animoca.png'
import Badge1 from '../../assets/img/Badge1.png'
import Badge2 from '../../assets/img/Badge2.png'
import Badge3 from '../../assets/img/Badge3.png'
import ArrowRight from '../../assets/img/arrow-right.png'
import ArrowLeft from '../../assets/img/arrow-left.png'

export function Home() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/debugger');
  };

  return (
    <>
  <PageWrapper>
    {/* start banner and header of the main page */}
    <TopPageWrapper>
    <BannerWrapper>
      <ContentWrapper>
      <Header />
      <BannerContentWrapper style={{ padding: '0 100px' }} >
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
       </ContentWrapper>
       </BannerWrapper>
       </TopPageWrapper>

       {/* start contents section */}
       <ContentWrapper>

      {/* cards */}
       <CardsWrapper>
        <img src={ArrowLeft} width={80} height={80} style={{ margin: 'auto', alignItems: 'center' }} />

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
              </GameCardText>
              <CardDetailWrapper>
              <GameCardDetailLink href='#' target="_self" style={{ margin: 'auto', textAlign: 'right'}}>Details {'>'}</GameCardDetailLink>
              </CardDetailWrapper>
              <CardButtons>
                <ReverseButton onClick={handlePlayClick}>Play</ReverseButton>
                <StakeButton>Stake</StakeButton>
            </CardButtons>
            
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
              </GameCardText>
              <CardDetailWrapper>
              <GameCardDetailLink href='#' target="_self" style={{ margin: 'auto', textAlign: 'right'}}>Details {'>'}</GameCardDetailLink>
              </CardDetailWrapper>
              <CardButtons>
                <ReverseButton onClick={handlePlayClick}>Play</ReverseButton>
                <StakeButton>Stake</StakeButton>
            </CardButtons>
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
              </GameCardText>
              <CardDetailWrapper>
              <GameCardDetailLink href='#' target="_self" style={{ margin: 'auto', textAlign: 'right'}}>Details {'>'}</GameCardDetailLink>
              </CardDetailWrapper>
              <CardButtons>
                <ReverseButton onClick={handlePlayClick}>Play</ReverseButton>
                <StakeButton>Stake</StakeButton>
            </CardButtons>
          </GameCardInner>
        </GameCard>

        <img src={ArrowRight} width={80} height={80} style={{ margin: 'auto', alignItems: 'center' }} />
      </CardsWrapper>
      <CardsWrapper style={{ marginTop: 'auto', justifyContent: 'space-between', width: '200px' }}>
        <BulletBlue />
        <BulletGrey />
        <BulletGrey />
        <BulletGrey />
        <BulletGrey />
      </CardsWrapper>

      {/* start ranking board */}
      <RankingBoardWrapper>
        <RankingBoardTitle>Ranking Board</RankingBoardTitle>
        <RankingLeaderboardWrapper>
             
          <RankingBadgeWrapper>
            <RankingBadge style={{ marginTop: '130px', marginRight: '-150px' }}>
              <RankingBadgeInner>
                <RankingImgInner src={RankingImg2} style={{ marginTop: '100px' }} />
                <img src={Badge2} width={80} style={{ position: 'absolute', margin: '60px auto 0 -140px' }} />
              </RankingBadgeInner>
            </RankingBadge>
            <RankingTitleText style={{ marginRight: '-230px' }}>Mr. Titan</RankingTitleText>
          </RankingBadgeWrapper>
                
          <RankingBadgeWrapper>
            <RankingBadge style={{ width: '411px', maxWidth: '411px', height: '397px', maxHeight: '397px' }} >
              <RankingBadgeInner>
                <RankingImgInner src={RankingImg1} style={{ marginTop: '115px' }} />
                <img src={Badge1} width={100} style={{ position: 'absolute', margin: '65px auto 0 -145px' }} />
              </RankingBadgeInner>
            </RankingBadge>
            <RankingTitleText>Sakurako</RankingTitleText>
          </RankingBadgeWrapper>

          <RankingBadgeWrapper>
            <RankingBadge style={{ marginTop: '130px', marginLeft: '-150px' }}>
              <RankingBadgeInner>
                <RankingImgInner src={RankingImg3} style={{ marginTop: '100px' }} />
                <img src={Badge3} width={80} style={{ position: 'absolute', margin: '60px auto 0 -130px' }} />
              </RankingBadgeInner>
            </RankingBadge>
            <RankingTitleText style={{ marginLeft: '-220px' }}>wkfgn45698</RankingTitleText>
          </RankingBadgeWrapper>

        </RankingLeaderboardWrapper>

        <Spacer100 />

        {/* raking board table. hardcoded for now, will need to be altered */}
        <TableWrapper>

            {/* title row */}
            <TitleRow>
              <TableCell fixedWidth={true}>
                <TableTitle>
                  
                </TableTitle>
              </TableCell>
              <TableCell fixedWidth={true}>
                <TableTitle>
                  
                </TableTitle>
              </TableCell>
              <TableCell>
                <TableTitle>
                  Game
                </TableTitle>
              </TableCell>
              <TableCell>
                <TableTitle style={{ marginLeft: '80px' }}>
                  Played Times
                </TableTitle>
              </TableCell>
              <TableCell>
                <TableTitle>
                  Proved Times
                </TableTitle>
              </TableCell>
              <TableCell>
                <TableTitle>
                  Staked Token
                </TableTitle>
              </TableCell>
            </TitleRow>
          </TableWrapper>

          {/* table contents. will need to map, but for demoing will just hardcode the lines */}
          <TableRow>
            <TableCell fixedWidth={true}><img src={Badge1} width={24} /></TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell fixedWidth={true}><img src={Badge2} width={24} /></TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell fixedWidth={true}><img src={Badge3} width={24} /></TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell fixedWidth={true}>4</TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell fixedWidth={true}>5</TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell fixedWidth={true}>6</TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell fixedWidth={true}>7</TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell fixedWidth={true}>8</TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell fixedWidth={true}>9</TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell fixedWidth={true}>10</TableCell>
            <TableCell fixedWidth={true}><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

      </RankingBoardWrapper>

      </ContentWrapper>
    
      {/* start partners */}
      
      <PartnersWrapper>
      <RankingBoardTitle>
        Partners
      </RankingBoardTitle>
        <PartnersInnerWrapper>

          {/* partner 1 */}
          <PartnersBannerWrapper>
            <img src={POkxVentures} style={{ maxWidth: '226px' }} />
          </PartnersBannerWrapper>

          {/* partner 2 */}
          <PartnersBannerWrapper>
            <img src={PScroll} style={{ maxWidth: '226px' }} />
          </PartnersBannerWrapper>

          {/* partner 3 */}
          <PartnersBannerWrapper>
            <img src={PAnimoca} style={{ maxWidth: '226px', marginTop: '10px' }} />
          </PartnersBannerWrapper>

        </PartnersInnerWrapper>
      </PartnersWrapper>
      
  </PageWrapper>
  <Footer />
    </>
  );
}

export default Home;
