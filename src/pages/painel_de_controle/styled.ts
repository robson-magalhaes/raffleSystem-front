import styled from "styled-components";
import imgBg from '../../assets/image/fundo_fosco.png';

type Props = {
    successWinner: boolean
}
export const Container = styled.div`
    height: auto;
    min-height: 100vh;
    width: 100%;
    max-width: 100vw;
    padding: 100px 20px;
    text-align: center;
    
    font-style: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    &::after{
        content: "";
        position:fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: -1;
        background-image: url(${imgBg});
    }
    & span{
        font-style: normal;
        font-weight: 100;
    }
    @media (max-width:798px) {
        padding-top: 120px !important;
    }
`

export const BodyPanel = styled.div`
    width: 80%;
    height: auto;
    margin: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 798px) {
        min-width: 100vw;
    }
`
export const AwardedQuota = styled.div`
    width: 80%;
    color: white;
    @media (max-width: 798px) {
        font-size: 12px;
    }
`

export const TitlePage = styled.div`
    font-size: 2rem;
    color: white;
    margin-bottom: 20px;
    font-family: "Cinzel Decorative", serif;
    font-weight: 400;
    font-style: normal;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`
export const InfoList = styled.div`
    color: #777;
    font-size: 2rem;
`

export const TablePanel = styled.table`
    border: solid 1px #FFF;
    width: 100%;
    box-shadow: 2px 2px 5px black;
    line-height: 16px;

    & th{
        vertical-align: middle;
        border: solid 1px #FFF;
        background-color: #16393B;
        color: white;
    }

    & td{
        padding: 2px;
        vertical-align: middle;
        line-height: 15px;
        background-color: #14292D50 !important;
        color: white;
        border: solid 1px #FFF;
        font-weight: normal !important;
        & .winner{
            font-size: 12px;
        }
        & button{
            margin:5px;
            padding: 5px 8px;
            text-align: center;
            vertical-align: middle;
        }
    }
    
    @media (max-width:798px) {
        width: 95vw;
        line-height: 10px;
        
        & button{
            border-radius: 0 !important;
            width: 100%;
            height: auto;
            padding: 2px 5px !important;
            margin: 0 !important;
        }
        & tr, th, td{
            line-height: 10px;
            padding: 2px;
            font-size: 12px;
        }
    }
    @media (max-width:600px) {
        & tr, th, td{
            font-size: 10px;
        }
    }
    @media (max-width:450px) {
        & button{
            padding: 1px 3px !important;
            margin-top: 1px;
        }
        & tr, th, td{
            padding: 2px 1.5px !important;
            margin: 0;
            font-size: 8px;
        }
    }
`
export const TableTR = styled.tr.withConfig({
    shouldForwardProp: (prop) => prop !== 'successWinner',
}) <Props>`
    background-color: ${(props) => (props.successWinner ? '#00000060' : '')};
`


export const CampaignDescription = styled.div`
    text-align: initial;
    display: initial;
    padding: 10px;
    flex-wrap: wrap;
    word-wrap: break-word;
    color: white;
    width: 100%;
    background-color: transparent;
    border:solid 1px white !important;
`

export const MessageSpan = styled.div`
    padding: 10px 40px;
    margin-top: 5px;
    font-weight: bold;
    letter-spacing: 3px;
    right: 0;
    float: right;
    text-align: center;
    width: auto;
    z-index: -1;
`