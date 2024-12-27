import styled from 'styled-components'
import bgMain from './assets/image/bgC.png'
import bgMainMobile from './assets/image/bgC-mobile.png'

export const BodyMain = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    z-index: 0;

    &::after{
        content: '';
        position: fixed;
        z-index: -2;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-image: url(${bgMain});
        background-position: right;
        background-size: cover;
        background-repeat: no-repeat;
        @media (max-width:798px) {
            background-image: url(${bgMainMobile}) ;
            background-position: right;
            background-size: 100% 100%;
        }
    }
`