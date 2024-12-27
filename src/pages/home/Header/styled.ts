import styled from "styled-components";

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    width: 100vw;
    height: 100px;
    padding: 20px 0 0 0;
    position: fixed;
    z-index: 2;
    backdrop-filter: blur(20px);
    & ul:first-child{
        padding: 0 20px;
        display: flex;
        justify-content: end;
        align-items: center;
        width: 50vw;
        height: 100%;
    }
    &::after{
        content: "";
        height: 3px;
        width: 100%;
        background-image: linear-gradient(27deg, #FB1467, blue, #B5FE00);
        opacity: 0.5;
    }

    & .active{
        border-radius: 2px;
        padding: 2px 10px ;
        border:solid 2px #FFD28D;
    }
`
export const NavBar = styled.nav`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    
    & ul{
        display: flex;
        gap: 10px 20px;
        list-style: none !important;
    }
    & a {
        font-size: 16px;
        font-weight: bold;
        background-color: none;
        color: white;
        text-decoration: none;
        &:hover{
            color: #B5FE00;
            text-decoration: none;
        }
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