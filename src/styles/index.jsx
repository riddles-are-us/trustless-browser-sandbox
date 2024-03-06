import bannerBackground from '../assets/img/landing-background.png'
import styled from 'styled-components';
import GameCard1Img from '../assets/img/street-pets-pioneer.png'
import GameCard2Img from '../assets/img/unitrek.png'
import GameCard3Img from '../assets/img/0xpioneer.png'
import RankingBadgeBackground from '../assets/img/ranking-badge-background.png'
import PartnersBackground from '../assets/img/a-footer-fire-full.png'

/* wrappers */

export const PageWrapper = styled.div`
    max-width: 100vw;
    min-height: 100vh;
    background: rgb(18,1,34);
    background: linear-gradient(180deg, rgba(18,1,34,1) 0%, rgba(0,0,0,1) 100%);
`

export const TopPageWrapper = styled.div`
    max-width: 100vw;
    min-height: 100vh;
    background-image: url(${bannerBackground});
    background-size: cover;
    padding: 20px;
`

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
`

export const BannerWrapper = styled.div`
    min-height: 100vh;
`

export const BannerContentWrapper = styled.div`
    margin: 150px auto 150px auto;
`

export const HeaderWrapper = styled.div`
    width: 100%;
    max-width: 1320px;
    color: #FFF;
    padding: 10px;
`

export const FooterWrapper = styled.div`
    width: 100vw;
    max-width: 1320px;
    background: #1F0F2E;
    color: #FFF;
    padding: 10px;
`

export const CardsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1320px;
    margin: -200px auto 0 auto;
    padding: 20px 0;
`

export const RankingBoardWrapper = styled.div`
    width: 100%;
    margin: 150px auto;
    color: #FFF;
`

export const RankingLeaderboardWrapper = styled.div`
    min-width: 60%;
    max-width: 1000px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
`

export const RankingBadgeWrapper = styled.div`
    margin-top: -30px;
`

export const RankingImgInner = styled.img`
    border-radius: 50%;
    max-width: 50%;
`

export const PartnersWrapper = styled.div`
    width: 100%;
    min-height: 400px;
    color: #FFF;
    background-image: url(${PartnersBackground});
    background-size: cover;
    padding-top: 150px;
`

export const PartnersInnerWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1320px;
    margin: -200px auto 0 auto;
    padding: 20px 0;
`

export const PartnersBannerWrapper = styled.div`
    margin: 20px;
    padding: 40px;
    border-radius: 20px;
    background: #FFF;
`

/* text & links */

export const HeaderLink = styled.a`
    color: #FFF;
    text-decoration: none;
    margin: auto 50px auto 50px;
    &:hover {
        color: #11F0F8;
    }
`
export const MainTitle = styled.h1`
    font-size: 100px;
    font-weight: 600;
    color: #FFF;
    margin: 10px auto;
    line-height: 1.3em;
`

export const SubTitle = styled.h2`
    font-size: 54px;
    font-weight: 400;
    color: #FFF;
    margin: 10px auto;
    line-height: 1.3em;
`

export const BannerText = styled.p`
    font-size: 18pt;
    color: #FFF;
    margin: 10px auto;
    line-height: 1.3em;
`

export const RankingBoardTitle = styled.h3`
    font-size: 32pt;
    color: #FFF;
    font-weight: 600;
    text-align: center;
`

export const NormalText = styled.p`
    font-size: 12pt;
    font-weight: 500;
    color: #FFF;
    text-align: center;
`

export const RankingTitleText = styled.p`
    font-size: 16pt;
    font-weight: 500;
    color: #FFF;
    text-align: center;
    margin-top: -15px;
`

/* cards */

export const GameCard = styled.div`
    background: #120122;
    border-radius: 20px;
    flex: 1;
    margin: 0 10px;
    border: 1px solid transparent;
    &:hover {
        border: 1px solid rgba(17, 240, 248, 1);
    }
`

export const GameCardFace1 = styled.div`
    background: #FFF;
    border-radius: 20px 20px 0 0;
    margin: 0;
    min-height: 256px;
    background-image: url(${GameCard1Img});
    background-size: cover;
`

export const GameCardFace2 = styled.div`
    background: #FFF;
    border-radius: 20px 20px 0 0;
    margin: 0;
    min-height: 256px;
    background-image: url(${GameCard2Img});
    background-size: cover;
`

export const GameCardFace3 = styled.div`
    background: #FFF;
    border-radius: 20px 20px 0 0;
    margin: 0;
    min-height: 256px;
    background-image: url(${GameCard3Img});
    background-size: cover;
`

export const GameCardInner = styled.div`
    padding: 1rem;
    color: #FFF;
`

export const GameCardTitle = styled.h2`
    font-size: 24pt;
    font-weight: 600;
    color: #FFF;
`

export const GameCardText = styled.p`
    font-size: 12pt;
    color: #FFF;
`

export const GameCardDetailLink = styled.a`
    font-size: 10pt;
    color: #CCC;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`

/* ranking */

export const RankingBadge = styled.div`
    width: 374px;
    min-width: 374px;
    max-width: 374px;
    height: 361px;
    min-height: 361px;
    max-height: 361px;
    border-radius: 50%;
    background-size: cover;
    justify-content: center;
    text-align: center;
    margin: auto 75px;
    background-image: url(${RankingBadgeBackground});
`

export const RankingBadgeInner = styled.div`
    min-width: 100%;
    background-size: cover;
`

/* buttons & other elements */

export const Button = styled.div`
    display: inline-block;
    background: rgba(17, 240, 248, 1);
    background: linear-gradient(90deg, rgba(17,240,248,1) 0%, rgba(244,207,129,1) 100%);
    padding: 15px 20px;
    color: #160227;
    font-size: 14pt;
    font-weight: 600;
    border-radius: 20px;
    margin: 10px;
    width: auto;
    cursor: pointer;
`

export const ReverseButton = styled.div`
    display: inline-block;
    background: transparent;
    padding: 15px 20px;
    color: #FFF;
    font-size: 14pt;
    font-weight: 600;
    border: 2px solid rgba(17, 240, 248, 1);
    border-radius: 20px;
    margin: 10px;
    width: auto;
    cursor: pointer;
`

export const Input = styled.input`
    border: 1px solid rgba(17, 240, 248, 1);
    background: rgba(22, 22, 22, 0.95);
    border-radius: 20px;
    padding: 15px 20px;
    color: #7A7A7A;
    font-size: 12pt;
    font-weight: 600;
    margin: 10px;
    min-width: 450px;
`
