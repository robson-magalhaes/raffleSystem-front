import styled from 'styled-components'

export const Container = styled.div`
    padding: 100px 10px;
    max-width: 100vw;
    min-height: 100vh;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const BodyContainer = styled.div`
    background-color: transparent;
    border-radius: 7px;
    height: auto;
    width: auto;
    max-width: 800px;
    padding: 20px;
    margin: 30px 0;
    color: white;
    @media (max-width: 650px) {
        margin: 30px 5px;
        padding: 30px 0;
    }
`
export const Session = styled.section`
    background-color: blue;
`
export const FormSettings = styled.form`
    width: auto;
    height: auto;
    @media (max-width: 650px) {
        margin: 30px 0;
        padding: 30px 0;
    }
    & input[type="submit"] {
        height: auto;
        width: 100%;
        padding: 10px 50px;
        box-shadow: 2px 2px 5px black;
        border: none;
        border-radius: 100px;
        background-color: #16393B;
        background-image: linear-gradient(57deg, #0081ED, #16393B 50%, green);
        transition: all 0.6s ease-in-out;
        background-size: 200%;
        background-position: left;
        letter-spacing: 3px;
        font-weight: bold;
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
`
export const BodyFormSign = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px 0;
`
export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;

    & input{
        padding: 10px 30px;
        border: none;
        border-radius: 100px;
    }
    @media (max-width: 485px) {
        & input{
            font-size: 12px;
            padding: 10px 15px;
        }
    }
`
export const BoxSpan = styled.div`
    position: relative;
    
    & span{
        position: absolute;
        right: 0;
        margin-top: -20px;
        width: 70%;
    }
`