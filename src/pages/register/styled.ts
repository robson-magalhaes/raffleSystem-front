import styled from "styled-components";

export const Container = styled.div`
    padding:0;
    margin:0;
    height: auto;
    width: 100vw;
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
    margin-bottom: 30px;
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
    
    & span{
        width: 100%;
        position: absolute;
        right: 0;
        margin-bottom: -60px;
    }
    
    @media (max-width:650px) {
        width: 100%;
        height: 100%;
        & label{
            margin-top:25px;
        }
    }
`
export const BodyFormSign = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export const BodyFormColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px 0;
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
    position: relative;
    
    & img{
        width: 25px;
    }
`
export const IconPass = styled.img`
    position: relative;
    float: right;
    margin: -35px 15px 0 0;
    cursor: pointer;
    
`

export const InputGroupBtn = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    & .login{
        display: flex;
        position: relative;
        border-radius: 5px;
        height: 100%;
        width: auto;
        border: solid 1px white;
        
        &::before{
            content:"";
            position: absolute;
            width: 15px;
            height: 15px;
            left: 0;
            top: 0;
            border-left: 15px solid red;
            border-bottom: 15px solid transparent;
            border-right: 15px solid transparent;
        }
    }
    & input[type="submit"] {
        height: 50px;
        width: 60%;
        padding: 10px 50px;
        box-shadow: 2px 2px 5px black;
        border: none;
        border-radius: 5px;
        background-color: #16393B;
        background-image: linear-gradient(57deg, #B5FE00, #16393B 50%, green);
        transition: all 0.6s ease-in-out;
        background-size: 200%;
        background-position: left;
        
        &:hover {
            background-position: right;
            background-color: #16393B;
        }
        &#jump{
            background: none;
            border-radius: 0;
            box-shadow: none;
        }
    }
    
    &:last-child div{
        border: none;
        border-radius: 100px;
        border-bottom: solid 2px white;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        padding: 0 30px;
        &:hover{
            letter-spacing: 1px;
            scale:1.05
        }
    }
`;
