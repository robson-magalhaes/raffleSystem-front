import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as C from './styled';
import { phoneMask } from '../../helpers/phoneMask';
import imgShow from '../../assets/image/icons/olhoShow.png'
import imgHidden from '../../assets/image/icons/olhoHidden.png';
import { regiterUser } from '../../utils/user';


export default () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [chavePix, setChavePix] = useState<string>('');
    const [pagination, setPagination] = useState<number>(0);
    const [alertPass, setAlertPass] = useState<boolean>(false);

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        setAlertPass(false);
    }, [confirmPass, password, email]);

    const handlePagination = (e: any = '', n: number) => {
        e?.preventDefault();
        if (pagination === 1 && password !== confirmPass) {
            return setAlertPass(true);
        }
        setPagination(n);
    };
    const togglePasswordVisibility = (event: React.MouseEvent<HTMLSpanElement>) => {
        const input = (event.currentTarget.parentNode as HTMLElement).querySelector('input');
        const img = (event.currentTarget.parentNode as HTMLElement).querySelector('img');

        if (input && img) {
            input.type = input.type === 'password' ? 'text' : 'password';
            if (input.type == 'text') {
                img.setAttribute('src', imgHidden);
            } else {
                img.setAttribute('src', imgShow);

            }
        }
    }

    const handleSubmitData = async (e: any) => {
        e.preventDefault();
        const data: UserType = {
            userName,
            lastName,
            telephone,
            email,
            password,
            chavePix
        };
        const res = await regiterUser(data);
        if (res.success === false) {
            setPagination(1);
            setAlertPass(true);
        } else {
            navigate('/login')
        }
    }
    return (
        <C.Container>
            {pagination === 0 && (
                <C.BodyContainer>
                    <C.Title>DADOS PESSOAIS</C.Title>
                    <C.FormSign onSubmit={(e) => handlePagination(e, 1)}>
                        <div className='row'>
                            <C.InputGroup className='col-md-5'>
                                <label>Nome</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                    placeholder="Digite seu nome..."
                                />
                            </C.InputGroup>
                            <C.InputGroup className='col-md-7'>
                                <label>Sobrenome</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    placeholder="Digite seu sobrenome..."
                                />
                            </C.InputGroup>
                            <C.InputGroup className='col mt-5'>
                                <label>Telefone</label>
                                <input type="tel"
                                    value={telephone}
                                    onChange={(e) => setTelephone(phoneMask(e.target.value))}
                                    minLength={14}
                                    maxLength={15}
                                    pattern="\(\d{2}\)\s\d{5}-\d{4}"
                                    title="O número de telefone não esta completo"
                                    required
                                    placeholder="Digite seu número de telefone..."
                                />

                            </C.InputGroup>
                        </div>
                            <C.InputGroupBtn>
                                <button className="login" onClick={() => navigate('/login')}>Fazer Login</button>
                                <input type="submit" value="Avançar" />
                            </C.InputGroupBtn>
                    </C.FormSign>
                </C.BodyContainer>
            )}
            {pagination === 1 && (
                <C.BodyContainer>
                    <C.Title>DADOS PESSOAIS</C.Title>
                    <C.FormSign onSubmit={(e) => handlePagination(e, 2)}>
                        <C.BodyFormColumn>
                            <C.InputGroup>
                                <label>E-mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Digite o seu e-mail..."
                                />
                            </C.InputGroup>
                            <C.InputGroup>
                                <label className='mt-4'>Senha
                                    <input
                                        ref={passwordInputRef}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Digite a sua senha..."
                                        minLength={8}
                                    />
                                    <C.IconPass id="pass" src={imgShow} alt='♦' onClick={togglePasswordVisibility} />
                                </label>
                                <label className='mt-3'>Confirmar senha
                                    <input
                                        ref={confirmPasswordInputRef}
                                        type="password"
                                        value={confirmPass}
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                        required
                                        placeholder="Confirme a senha..."
                                        minLength={8}
                                    />
                                    <C.IconPass id="pass" src={imgShow} alt='♦' onClick={togglePasswordVisibility} />
                                </label>
                            </C.InputGroup>
                        </C.BodyFormColumn>
                        <C.InputGroup>
                            {alertPass && password !== confirmPass && (
                                <span className="alert alert-danger text-center fw-bold" role="alert" style={{ letterSpacing: 3 }}>
                                    As senhas não coincidem.
                                </span>
                            )}
                            {alertPass && password === confirmPass && (
                                <span className="alert alert-danger text-center fw-bold" role="alert" style={{ letterSpacing: 3 }}>
                                    E-mail ou Pix informado ja existe ou é inválido.
                                </span>
                            )}
                        </C.InputGroup>
                        <C.InputGroupBtn>
                            <button className="bg-transparent border-2 border-light col-3 p-2 rounded fw-bold shadow" onClick={() => setPagination(0)}>Voltar</button>
                            <input type="submit" value="Avançar" className="rounded fw-bold" />
                        </C.InputGroupBtn>
                    </C.FormSign>
                </C.BodyContainer>
            )}
            {pagination === 2 && (
                <C.BodyContainer>
                    <C.Title>Credenciais de Conta</C.Title>
                    <C.FormSign onSubmit={handleSubmitData}>
                        <div className="row gap-5">
                            <C.InputGroup>
                                <label><strong>Sua chave PIX</strong></label>
                                <input
                                    type="text"
                                    value={chavePix}
                                    onChange={(e) => setChavePix(e.target.value)}
                                    placeholder="Digite sua chave pix..."
                                />
                            </C.InputGroup>
                        </div>
                        <C.InputGroupBtn>
                            <button className="bg-transparent border-2 border-light col-3 p-2 rounded fw-bold shadow" onClick={() => setPagination(1)}>Voltar</button>
                            {chavePix ? (
                                <input type="submit" value="Avançar" className="rounded fw-bold" />
                            ) : (
                                <input type='submit' className="bg-transparent border-0 fw-bold" value="Pular" id="jump" />
                            )}
                        </C.InputGroupBtn>
                    </C.FormSign>
                </C.BodyContainer>
            )}
        </C.Container>
    );
};
