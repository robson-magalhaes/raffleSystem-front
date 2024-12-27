import styled from 'styled-components'

export const TitlePage = styled.h1`
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
        background-position: 52rem;
        & h1{
            font-size: 2rem;
        }
    }
`

export const BodyCardBuyQuota = styled.div`
    width: 50%;
    height: auto;
    margin: 30px;
    @media (max-width: 950px) {
        width: 90%;
        
    }
`

export const FormBuyQuota = styled.form`
    background-color: #14292D50;
    margin-top: 30px;
    padding: 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: auto;
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
        text-align: center;
        align-items: center;
        padding: 20px 10px;
        margin: 0;
        & .row{
            flex-direction: column !important;
            gap:20px;
        }
    }
`
export const BoxInput = styled.div`
    display: flex;
    width: 100%;
    & .form-select{
        width: 100%;
    }
`

export const InputForm = styled.div`
    text-align: center;
    width: 100%;
    font-size: 1rem;
    text-align: center;
    & svg{
        cursor: pointer;
        height: 30px;
        margin: 0 10px;
    }
    & input{
        font-size: 1.5rem;
    }
    & input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
        font-size: 3rem;
    }
    & input[type=number]{
        width: 80px;
    }
`

export const Box_btn_buy = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const TableBuyQuota = styled.table`
    border-collapse: initial;
    padding: 10px;
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
        border-radius: 10px 0;
    }
    & tbody tr:last-child td:last-child{
        color: #20FF87;
        font-size: 1.5rem;
        text-shadow: 1px 1px 5px #000000;
    }
`