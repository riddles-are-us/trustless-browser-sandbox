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
    margin: auto 10px;
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
    margin: auto 10px;
    min-width: 450px;
`
