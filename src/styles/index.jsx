import bannerBackground from '../assets/img/landing-background.png'
import styled from 'styled-components';

/* wrappers */

export const PageWrapper = styled.div`
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

export const CardsWrapper = styled.div`
display: flex; /* Use flexbox to layout children side by side */
justify-content: space-around; /* Space out cards evenly */
width: 100%;
max-width: 1320px;
margin: 0 auto; /* Center the wrapper */
padding: 20px 0; /* Add some padding on top and bottom */
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

/* cards */

export const GameCard = styled.div`
background: #120122;
border-radius: 20px;
flex: 1; /* Allow cards to grow and fill the available space */
margin: 0 10px; /* Add some space between the cards */
`

export const GameCardFace = styled.div`
    background: #FFF;
    border-radius: 20px 20px 0 0;
    margin: 0;
    min-height: 256px;
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
    border: 1px solid #222;
    background: rgba(22, 22, 22, 0.95);
    border-radius: 20px;
    padding: 15px 20px;
    color: #7A7A7A;
    font-size: 12pt;
    font-weight: 600;
    margin: 10px;
    min-width: 450px;
`
