import { Link } from 'react-router-dom';
import * as C from './styled';
import { Dropdown, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { accountCompleted } from '../../utils/user';

interface Props {
    activated: string;
}

const NavBar: React.FC<Props> = ({ activated }:Props) => {
    const [registerCompleted, setRegisterCompleted] = useState<boolean>(false);
    const logout = useContext(AuthContext)?.logout;
    const Ctx = useContext(AuthContext);

    useEffect(() => {
        if (Ctx?.userId) {
            accountCompleted(Number(Ctx?.userId)).then((x:any) => {
                setRegisterCompleted(x);
            })
        }
    }, [Ctx?.userId]);

    return (
        <C.Container>
            <ul className="nav nav-tabs">
                {/* <li className="nav-item">
                    <Link to="/" className={`nav-link ${activated === '/' ? 'active' : ''}`}>Início</Link>
                </li> */}
                <li className="nav-item">
                    <Link to="/panel" className={`nav-link ${activated === '/panel' ? 'active' : ''}`}>Painel</Link>
                </li>
                <li className="nav-item">
                    <Link to="/purchase_list" className={`nav-link ${activated === '/purchase_list' ? 'active' : ''}`}>Compradores</Link>
                </li>

                <NavDropdown
                    id="dropdown-basic-button"
                    title="Criar Sorteio"
                    align="start"
                >
                    <Dropdown.Item>
                        <Link
                            to="/create_raffle"
                            className={`${activated === '/create_raffle' ? 'active' : ''}`}
                            aria-current="page"
                            style={{ pointerEvents: registerCompleted ? 'auto' : 'none', opacity: registerCompleted ? 1 : 0.5 }}
                        >
                            Prêmio
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link
                            to="/create_edit_campaign"
                            className={`${activated === '/create_edit_campaign' ? 'active' : ''}`}
                            aria-current="page"
                            style={{ pointerEvents: registerCompleted ? 'auto' : 'none', opacity: registerCompleted ? 1 : 0.5 }}
                        >
                            Campanha
                        </Link>
                    </Dropdown.Item>
                </NavDropdown>

                <NavDropdown
                    id="dropdown-basic-button"
                    title="Compartilhe"
                    align="start"
                >
                    <Dropdown.Item as="a" href={`/${Ctx?.userId}/buy_raffle_only`} target="_blank" rel="noopener noreferrer">
                        Modo prêmio selecionado
                    </Dropdown.Item>
                    <Dropdown.Item as="a" href={`/${Ctx?.userId}/buy_quota`} target="_blank" rel="noopener noreferrer">
                        Modo Campanha
                    </Dropdown.Item>
                </NavDropdown>

                <NavDropdown
                    id="dropdown-basic-button"
                    title={<FontAwesomeIcon icon={faGear} />}
                    align="start"
                >
                    <Dropdown.Item className='m-2 fw-bold'>
                        <Link to={`/settings`}>
                            Minha Carteira
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className='m-2 fw-bold'>
                        <Link to={`/settings`}>
                            Configurações
                        </Link>
                    </Dropdown.Item>
                    
                    <Dropdown.Item className='m-2 fw-bold'>
                        <Link to={`/settings`}>
                            Dados da Conta
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className='m-2'>
                        <Link to={`#`} onClick={()=>location.href = "mailto:dev.robsonom@hotmail.com"}>
                            Ajuda
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className='m-2'>
                        <li onClick={logout}>Sair</li>
                    </Dropdown.Item>
                </NavDropdown>
            </ul>
        </C.Container>
    );
};

export default NavBar;
