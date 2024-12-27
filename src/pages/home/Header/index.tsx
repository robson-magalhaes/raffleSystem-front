import { Link } from 'react-router-dom'
import * as C from './styled'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import BtnDefault from '../../../components/BtnDefault';

type Props = {
    activated: string;
}

export default ({ activated }: Props) => {

    const Ctx = useContext(AuthContext);

    return (
        <C.Header>
            <C.NavBar>
                <ul>
                    {Ctx?.isAuthenticated &&
                        <li>
                            <Link
                                to="/panel"
                                className={`${activated === '/panel' ? 'active' : ''}`}
                            >
                                PAINEL
                            </Link>
                        </li>
                    }
                    <div className='d-flex justify-content-center align-items-center gap-4'>
                        <a href="#contato" className={`nav-link ${activated === '/contato' ? 'active' : ''}`}>CONTATO</a>
                        <BtnDefault bgColor="#B5FE00" textColor="#fff" fs='1rem'>
                            <Link to="/login" className='mx-2'>ENTRAR</Link>
                            <span className='px-2 text-black fs-4'> | </span>
                            <Link to="/register" className='mx-2'>CADASTRAR-SE</Link>
                        </BtnDefault>
                    </div>

                </ul>
            </C.NavBar>
        </C.Header>
    )
}