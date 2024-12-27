import { ReactNode } from 'react'
import * as C from './styled'

type Props = {
    type?: 'button' | 'submit' | 'reset',
    bgColor?: string,
    fs?: string,
    textColor?: string,
    children: ReactNode,
    onClick?: (e: any) => void
}

export default ({ type, onClick, children, bgColor, textColor, fs }: Props) => {
    return (
        <C.BtnDefault type={type} bgcolor={bgColor} fs={fs} textcolor={textColor} onClick={onClick}>
            {children}
        </C.BtnDefault>
    )
}