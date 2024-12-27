import * as C from './styled';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


export default () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkBox, setCheckBox] = useState(false);

    useEffect(() => {
        const check = localStorage.getItem("remeberSignIn");
        if (check) {
            setEmail(JSON.parse(check).email);
            setPassword(JSON.parse(check).password);
            setCheckBox(true)
        }
    }, [])

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkBox) {
            const data = {
                email, password
            }
            localStorage.setItem("remeberSignIn", JSON.stringify(data));
        } else {
            localStorage.removeItem("remeberSignIn");
        }

        try {
            authContext?.login(
                email,
                password,
                navigate
            )
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <C.Container>
            <C.BodyContainer>
                {/* <div className="col d-flex justify-content-start">
                    <Link to={'/'}><img src={imgBack} alt="Início" width={30} /> Início</Link>
                </div> */}
                <C.Title>TEM UMA CONTA?</C.Title>
                <C.FormSign onSubmit={handleLogin}>
                    <C.InputGroup >
                        <label htmlFor="">E-mail</label>
                        <input type="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Digite seu e-mail" />
                    </C.InputGroup>
                    <C.InputGroup>
                        <label htmlFor="">Senha</label>
                        <input type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Digite sua senha..." />
                    </C.InputGroup>

                    <C.InputGroupBtn>
                        <input type="submit" value={'Fazer Login'} />
                        <input type="checkbox" checked={checkBox} id='checkbox_remember' className="my-4" onChange={() => setCheckBox(!checkBox)} /> <label htmlFor="checkbox_remember">Lembrar-me</label>
                    </C.InputGroupBtn>
                </C.FormSign>
                <C.InputGroupBtn className='row text-center d-flex justify-content-center'>
                    <p>Ou inscreva-se usando</p>
                    <div className='w-auto fw-bold' onClick={() => navigate('/register')}>
                        Cadastrar
                    </div>
                </C.InputGroupBtn>
            </C.BodyContainer>
        </C.Container>
    );
};
