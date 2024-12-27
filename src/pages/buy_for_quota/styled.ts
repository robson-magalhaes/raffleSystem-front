import styled from 'styled-components'
import imgTicketAdd from '../../assets/image/ticketAdd.png'
import imgTicketRemove from '../../assets/image/ticketRemove.png'

type Props = {
    $bg: string
}
export const TitlePage = styled.div`
    font-size: 2rem;
    font-family: "Cinzel Decorative", serif;
    font-weight: 400;
    font-style: normal;
`

export const Container = styled.div`
    color:white;
    height: auto;
    min-height: 100vh;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;

    @media (max-width: 768px) {
        background-position: -40rem;
        & h1{
            font-size: 2rem;
        }
    }
    @media (max-width: 550px) {
        background-position: -50rem;
    }
`
export const CampaignDescription = styled.div`
    padding: 10px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    word-wrap: break-word;
    color: white;
    width: 100%;
    background-color: transparent;
`
export const Premium = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 7px;
`
export const CardPremium = styled.div`
    padding: 10px;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    background-color: #14292D10;
    border:solid 1px #14292D;
    backdrop-filter: blur(10px);
    border-radius: 7px;

    & .first_box{
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 10px;

        & div:first-child{
            justify-content: center;
            align-items: center;
        }
        & img{
            margin-right: 7px;
        }
        &  h5, h6{
            vertical-align: middle;
            margin: 0;
        }
    }

    & .secund_box{
        width: auto;
        max-width: 115px;
        height: 100%;
        align-self: center;
        vertical-align: middle;
    }
    @media (max-width: 768px) {
        .first_box{
            & h5, h6{
                font-size: 90%;
            }
        }
    }
    
`
export const Quota = styled.div`
    color: black;
    font-weight: bold;
    border-radius: 7px;
    padding: 5px 22px;
    margin: auto 0;
    width: 100px;
    height: auto !important;
    vertical-align: middle;
    text-align: center;
    box-shadow: 2px 2px 5px black;
    @media (max-width: 768px) {
        font-weight: 600 !important;
        padding: 3px 6px;
        font-size: 12px;
        width: 70px;
    }
`

export const BodyCardBuyQuota = styled.div`
    width: 50%;
    height: auto;
    margin: 30px;
    
    & form:first-child{
        gap: 0 !important;
    }
    @media (max-width: 950px) and (min-height:1080px) {
        width: 90%;
    }
    @media (max-width: 1050px) {
        width: 90%;
    }
`
export const BoxInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;

    & button{
        color: white;
        letter-spacing: 3px;
        background-color: transparent;
        background-image: linear-gradient(27deg, #000000, #16393B90 50%, #000000 );
    }
    @media (max-width: 768px) {
        & .info{
            font-size: 15px;
        }
    }
`

export const FormBuyQuota = styled.form`
    color: white;
    background-color: transparent;
    background-image: linear-gradient(27deg, #000000, #16393B90 50%, #000000 );
    padding: 85px 30px 40px 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 30px 0;
    
    & .row div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    & label{
        height: auto;
    }
    & input{
        height: auto;
    }
    @media (max-width:550px) {
        align-items: center;
        
        & .row{
            flex-direction: column;
            gap:20px;
        }
        & span{
            padding-right: 20px !important;
            text-align: start;
        }
    }
`
export const BodyForm = styled.div`
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    & h4{
        text-align: center;
    }
`
export const BoxInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    margin-bottom: 25px;
    & svg{
        cursor: pointer;
        height: 30px;
        margin: 0 10px;
    }
    & input{
        margin: 5px 10px;
        width: 50%;
        font-size: 1.3rem;
    }
    & input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; margin: 0; 
        font-size: 2rem;
        }
`
export const Box_btn_buy = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ContainerTicket = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-self: center;
    margin: 30px 0;
    grid-gap: 30px 20px;
    width: 100%;
    height: auto;
   overflow: hidden;


    grid-gap: 10px 10px;

    @media (max-width:768px) {
        grid-gap:0 10px;
        margin: 0;
    }
    @media (max-width:450px) {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 7px 0px !important;
        margin: 0;
        grid-template-columns: repeat(2, 1fr);
        align-self: center;
        & div{
            height: 80px;
            width: 40%;
        }
    }
`
export const BodyTicket = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    cursor: pointer;background-image: url(${(props) => (props.$bg === 'add' ? imgTicketAdd : imgTicketRemove)});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    filter: drop-shadow(4px 4px 2px black);
    
    & span{
        font-weight: 800 !important;
        padding-right: 40px;

    }
    @media (max-width:768px) {
        height: 80px;
    }
`
export const TableBuyQuota = styled.table`
    border-collapse: initial;
    width: 100%;
    text-align: center;
    backdrop-filter: blur(10px);
    font-size: 1.1rem;

    & thead tr th{
        border-radius: 10px 0;
        border: solid 1px #FFFFFF;
        padding: 2px 10px;
        font-size: 1.1rem;
        background-color: #14292D;
    }
    & tbody tr:last-child td{
        padding: 2px 10px; 
        border: solid 1px #FFFFFF;
        border-radius: 0 10px;
    }
    & tbody tr:last-child td:last-child{
        color: #20FF87;
        font-size: 1.5rem;
        text-shadow: 1px 1px 5px #000000;
    }
`