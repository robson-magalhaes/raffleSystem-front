import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100vw;
    padding: 50px 10px;
`
export const BodyLoading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 85vh;
    color: white;
    & img{
        margin-top: 40px;
        width: 70px;
        height: 70px;
    }
    @media (max-width:786px) {
        text-align: center;
        padding: 20px;
        & h1{font-size: 2.5rem;}
    }

`

export const InfoContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & button{
        position: fixed;
        font-weight: bold;
        align-self: end;
        margin:7px;
        top: 10px;
        right:10px;
        z-index: 99;
        border: solid 0.1px white;
        box-shadow: -3px 3px 10px #000000 inset, -1px 1px 1px white;
    }
`

export const InfoBody = styled.div`
    margin:10px;
    padding: 10px;
    border-radius: 7px;
    height: auto;
    width: 100%;
    max-width: 600px;
    min-height: 80vh;
    background-color: #16393B50;
    background-image: linear-gradient(27deg, #000000, #16393B50 50%, #000000 );
    color: white;
    box-shadow: 1px 1px 5px black;
    display: flex;
    flex-direction: column;
`

export const Quota = styled.div`
    color: black;
    font-size: 12px;
    font-weight: bold;
    border-radius: 7px;
    padding: 2px 7px;
    margin: auto 0 !important;
    width: auto !important;
    height: auto !important;
    vertical-align: middle;
    text-align: center;
    box-shadow: 2px 2px 5px black;
`