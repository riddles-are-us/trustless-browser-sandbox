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
       </ContentWrapper>
       </BannerWrapper>
       </TopPageWrapper>

       {/* start contents section */}
       <ContentWrapper>

      {/* cards */}
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
              <GameCardDetailLink href='#' target="_self">Details →</GameCardDetailLink>
            </GameCardText>
            <ReverseButton onClick={handlePlayClick}>Play</ReverseButton>
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
              <GameCardDetailLink href='#' target="_self">Details →</GameCardDetailLink>
            </GameCardText>
            <ReverseButton onClick={handlePlayClick}>Play</ReverseButton>
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
              <GameCardDetailLink href='#' target="_self">Details →</GameCardDetailLink>
            </GameCardText>
            <ReverseButton onClick={handlePlayClick}>Play</ReverseButton>
            <Button>Stake</Button>
          </GameCardInner>
        </GameCard>
      </CardsWrapper>

      {/* start ranking board */}
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

        <Spacer100 />

        {/* raking board table. hardcoded for now, will need to be altered */}
        <TableWrapper>

            {/* title row */}
            <TitleRow>
              <TableCell>
                <TableTitle>
                  #
                </TableTitle>
              </TableCell>
              <TableCell>
                <TableTitle>
                  User
                </TableTitle>
              </TableCell>
              <TableCell>
                <TableTitle>
                  Game
                </TableTitle>
              </TableCell>
              <TableCell>
                <TableTitle>
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
            <TableCell><img src={Badge1} width={24} /></TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><img src={Badge2} width={24} /></TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><img src={Badge3} width={24} /></TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><img src={Badge1} width={24} /></TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>4</TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>5</TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>6</TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>7</TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>8</TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>9</TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>10</TableCell>
            <TableCell><img src={RankingImg1} width={24} /></TableCell>
            <TableCell>Dr. Mario</TableCell>
            <TableCell> 7654387</TableCell>
            <TableCell>934774575</TableCell>
            <TableCell>Unitrek</TableCell>
          </TableRow>

      </RankingBoardWrapper>

      </ContentWrapper>
    
      {/* start partners */}
      <RankingBoardTitle>
        Partners
      </RankingBoardTitle>
      <PartnersWrapper>
        <PartnersInnerWrapper>

          {/* partner 1 */}
          <PartnersBannerWrapper>
            <img src={POkxVentures} />
          </PartnersBannerWrapper>

          {/* partner 2 */}
          <PartnersBannerWrapper>
            <img src={PScroll} />
          </PartnersBannerWrapper>

          {/* partner 3 */}
          <PartnersBannerWrapper>
            <img src={PAnimoca} />
          </PartnersBannerWrapper>

        </PartnersInnerWrapper>
      </PartnersWrapper>
      
  </PageWrapper>
  <Footer />
    </>
  );
}

export default Home;
