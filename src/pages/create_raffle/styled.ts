import styled from "styled-components";

export const Container = styled.div`
    padding:130px 5px 50px 5px;
    margin:0;
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: white;
    justify-content:center;
    align-items: center;
    
    font-style: normal;

    @media (max-width:1208px) {
        h1{
            font-size: 2rem;
        }
    }
    @media (max-width:798px) {
        h1{
            font-size: 1.4rem;
        }
    }
` 

export const FormCreateRaffle = styled.form`
    background-color: #14292D50;
    margin-top: 30px;
    padding: 30px;
    border-radius: 5px; 
    width: 40%;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media (max-width:1208px) {
        padding: 0;
        width: 60%;
    }
    @media (max-width:798px) {
        padding: 0;
        width: 90%;
    }
`