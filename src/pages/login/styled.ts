import styled from "styled-components";
export const Container = styled.div`
    padding:0;
    margin:0;
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    
    
    @media (max-width:798px) {
        padding: 10px;
        height: 100vh;
        & h1{
            font-size: 2rem !important;
        }
        
    }
`
export const Title = styled.div`
    font-size: 2rem;
`
export const BodyContainer = styled.div`
    text-align: center;
    font-weight: normal;
    color: white;
    width: 570px;
    height: 652px;
    padding: 20px;
    background-color: #16393B50;
    background-image: linear-gradient(27deg, #000000, #00000050 50%, #000000 );
    box-shadow: 2px 2px 10px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    
    & img{
        cursor: pointer;
        filter: drop-shadow(-2px -2px 1px #0D5A8B);
    }
    @media (max-width: 650px) {
        margin: 0;
        width: 100%;
        height: 100%;
        padding: 70px 20px;
    }
`
export const FormSign = styled.form`
    width: 500px;
    height: 100%;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width:650px) {
        gap: 50px;
        justify-content: center;
        width: 100%;
        padding: 60px 0;
        & input[type="submit"]{
            width: auto;
            padding: 8px 30px !important;
        }
    }
`
export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    & Input {
        padding: 10px 20px;
        height: 50px;
        background-color: transparent;
        border: none;
        border-radius: 5px;
        border:solid 1px #B5FE00;
        border-right: solid 1px white;
        border-top: solid 1px white;
        margin-top: 10px;
        color: white;
        outline: none;
        width: 100%;
    }
`
export const InputGroupBtn = styled.div`
    margin-top: 30px;
    & input[type="submit"] {
        height: 50px;
        width: 100%;
        padding: 10px 50px;
        box-shadow: 2px 2px 5px black;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        background-color: #16393B;
        background-image: linear-gradient(57deg, #B5FE00, #16393B 50%, #000000);
        transition: all 0.6s ease-in-out;
        background-size: 200%;
        background-position: left;
        
        &:hover {
            background-position: right;
            background-color: #16393B;
        }
    }
    
    &:last-child div{
        border: none;
        border-radius: 100px;
        border-bottom: solid 1px white;
        border-right: solid 2px white;
        border-left: solid 1px white;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        padding: 5px 30px;
        &:hover{
            letter-spacing: 1px;
            scale:1.05
        }
    }
`;
