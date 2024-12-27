import styled from 'styled-components'

type Props = {
  bgcolor?: string,
  textcolor?: string,
  fs?: string
}

export const BtnDefault = styled.button<Props>`
  border:none;
  padding: 5px 25px;
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : '#20FF87')};
  color: ${(props) => (props.textcolor ? props.textcolor : 'black')};
  box-shadow: 1px 3px 5px #000000;
  transition: all ease 0.2s;
  font-weight: bold;
  font-size: ${(props) => (props.fs ? props.fs : 'inherit')};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    scale: 1.05;
    opacity: 0.5;
  }
  
  & a{
    background-color: ${(props) => (props.bgcolor ? props.bgcolor : '#20FF87')};
    font-size: ${(props) => (props.fs ? props.fs : 'inherit')};
    color: ${(props) => (props.textcolor ? props.textcolor : 'black ')};
  }
`