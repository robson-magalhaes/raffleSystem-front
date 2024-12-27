import styled from "styled-components";

export const Container = styled.nav`
    position: fixed;
    width: 100%;
    min-height: 70px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & ul{
        width: auto;
        backdrop-filter: blur(10px);
        padding: 10px 20px 0 20px;
        border-radius: 10px;
        & .nav-link{
            margin: 0 2px;
        }
    }

    & a {
        background-color: none;
        color: white;
        text-decoration: none;
        font-family: "Baskervville SC", serif;
        font-weight: bold;
        font-style: normal;
        font-size: 16px;
    }
    & a:hover{
        color: white;
        text-decoration: none;
    }
    & .dropdown-menu{
        padding:0;
        border-radius: 0px 10px 10px 10px;
        box-shadow: 1px 1px 5px #FFF;
        font-weight: bold;

        & .dropdown-item{
            height: 100%;
            width: auto;
            text-align: center;
            &:hover{
            transition: all ease 0.2s;
            background-color: #14292D50;
            color: white;}
        }
        & a{
            color: #000000;
        }
    }
`