import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    max-width: 100vw;
`
export const MySession = styled.section`
    padding: 50px 150px;
    height: auto;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 768px) {
        &:first-child{
            padding-top: 100px;
        }
        margin: 5px;
        padding: 5px;
    }
`

export const BoxInfo = styled.div`
    text-align: center;
    color: white;
    padding: 120px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center; 
    font-family: "Baskervville", serif;
    & h1{
        font-size: 5rem;
        font-family: "New Amsterdam", sans-serif;
        font-weight: 400;
        font-style: normal;
        color: white;
        //filter: drop-shadow(-2px -2px #FFFFFF) drop-shadow(1px 1px 2px #000000);
        background-image: linear-gradient(27deg, #FB1467, #B5FE00);
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    & p, span{
        color: white;
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
        text-shadow: 3px 2px 1px #000000;
        font-family: "New Amsterdam", sans-serif;
        font-weight: 400;
        font-style: normal;
        color: white;
        & span{
            color: #B5FE00;
        }
    }
`