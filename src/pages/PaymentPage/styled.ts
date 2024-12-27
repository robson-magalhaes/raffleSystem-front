import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: auto;
    width: 100%;
    max-width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const BodyPayment = styled.div`
    padding: 50px 10px;
    color: white;
    background-color: #16393B50;
    background-image: linear-gradient(27deg, #000000, #16393B50 50%, #000000 );
    box-shadow: 3px 3px 5px #000000;
    width: 50%;
    margin: 40px auto;
    height: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    & p span{
        font-weight: bold;
        font-size: 17px;
    }
    & img {
        width: 50%;
        height: auto;
    }
    
    & .box_copy{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
        padding-bottom:50px;
        gap: 10px;
        & div{
            position: absolute;
            color: white;
            margin-top: -50px;
            background-color: white;
            border-radius: 7px;
            color: black;
            padding: 5px;
        }
        & button{
            display: inline;
            box-shadow: -3px 3px 10px #000000 inset, -1px 1px 1px white;
        }
        & input{
            padding-left: 10px;
            padding: 10px;
            border-radius: 7px;
            border: none;
            outline: none;
            display: inline;
            height: 100%;
            width: 80%;
            box-shadow: 5px 0px 5px #222 inset;
        }
    }

    @media (max-width:860px) {
        width: 95%;
        & img {
            width: 80%;
            height: auto;
        }
    }
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