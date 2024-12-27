import { useContext, useEffect, useState } from 'react';
import * as C from './styled.ts';
import { editUser, getUserData } from '../../utils/user.ts';
import { AuthContext } from '../../context/AuthContext.tsx';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { converterToReal } from '../../helpers/converter_money.ts';
import { destroyGlobal } from '../../utils/api.ts';
import { checkBalance, GainPayment } from '../../utils/wallet_balance.ts';

export default () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [userName, setUserName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [chavePix, setChavePix] = useState<string>('');
    const [checkBox, setCheckBox] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [balanceWallet, setBalanceWallet] = useState<number>(0);
    const [alertPass, setAlertPass] = useState("");

    const navigate = useNavigate();

    const taxa_pix = import.meta.env.VITE_APP_TAXA || 0.15;
    const Ctx = useContext(AuthContext);

    useEffect(() => {
        if (Ctx?.userId) {
            checkBalance(Number(Ctx?.userId)).then(x => {
                setBalanceWallet(x.response.balance_pix)
            });
            getUserData(Number(Ctx?.userId)).then(response => {
                const userData = response.data;
                setUser(userData);
                setUserName(userData.userName);
                setLastName(userData.lastName);
                setTelephone(userData.telephone);
                setEmail(userData.email);
                setChavePix(userData.chave_pix);
            });
        }
    }, [Ctx?.userId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPass) {
            setErrorMessage("As senhas novas não coincidem.");
        } else {
            try {
                const updateData: any = {
                    id: user?.id,
                    userName,
                    lastName,
                    telephone,
                    email,
                    chavePix: chavePix,
                };
                if (newPassword) {
                    updateData.password = newPassword;
                }
                editUser(updateData).then((x: any) => {
                    if (x.data.success) {
                        alert('Alterações salvas com sucesso!!')
                        navigate('/panel')
                    }
                })
            } catch (err) {
                console.log('Error = ', err);
            }
        }
    };
    const handleGain = async () => {
        await GainPayment(
            Number(Ctx?.userId),
            balanceWallet - (balanceWallet * taxa_pix)
        ).then((x) => {
            if (!x.response.error) {
                alert("Solicitação, feita com sucesso!!")
                return location.href = '/settings'
            } else {
                setAlertPass(x.resposta.error);
            }
        }).catch(error => {
            alert("Erro ao solicitar pagamento!!")
            setAlertPass(error);
        })

    }
    return (
        <>
            <Header activated='/settings' />
            <C.Container>
                <C.BodyContainer>
                    <div className="col-12">
                        <h3 className="text-center mb-4">Minha Carteira</h3>
                        <table border={1} className='table table-dark text-center'>
                            <thead>
                                <tr>
                                    <th>Total de Vendas</th>
                                    <th>% Taxa</th>
                                    <th>Valor a receber</th>
                                </tr>
                            </thead>
                            <tbody>
                                <th className='money'>{converterToReal(balanceWallet)}</th>
                                <th className='text-danger'>{taxa_pix}</th>
                                <th className='money fw-bold'>{converterToReal(balanceWallet - (balanceWallet * taxa_pix))}</th>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-12 text-center'>
                        <button className='col-12 btnBuy fw-bold'
                            onClick={() => handleGain()}>RECEBER</button>
                    </div>
                    <br />
                </C.BodyContainer>
                {alertPass !== "" && (
                    <div className="col-6 alert alert-danger text-center fw-bold" role="alert" style={{ letterSpacing: 3 }}>
                        {
                            "Não foi possivel realizar a transferencia, por favor entre em contato com o suporte, ou abra um chamado na pagina de ajuda."
                        }
                    </div>
                )}
                <C.BodyContainer>
                    <div className="col-12">
                        <h3 className="text-center mb-4">Configurações de Conta</h3>
                    </div>
                    <div>
                        <p>Essa opção permite limpar todos os registros de prêmios e campanhas cadastradas.</p>
                        <button onClick={() => destroyGlobal(Number(Ctx?.userId))} className='bg-danger'>Limpar Registros</button>
                    </div>
                </C.BodyContainer>
                <C.BodyContainer>
                    <div className="col-12">
                        <h3 className="text-center mb-4">Dados da Conta</h3>
                    </div>

                    <C.FormSettings onSubmit={handleSubmit}>
                        <h5>Dados Pessoais</h5>
                        <C.BodyFormSign className='row'>
                            <C.InputGroup className="col-5">
                                <label htmlFor="userName">Nome:</label>
                                <input
                                    type="text"
                                    id="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </C.InputGroup>

                            <C.InputGroup className="col-7">
                                <label htmlFor="lastName">Sobrenome:</label>
                                <input

                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </C.InputGroup>

                            <C.InputGroup className="col-6">
                                <label htmlFor="telephone">Telefone:</label>
                                <input
                                    type="tel"
                                    id="telephone"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                />
                            </C.InputGroup>

                            <C.InputGroup className="col-6 mb-5">
                                <label htmlFor="email">E-mail:</label>
                                <input
                                    disabled
                                    type="email"
                                    id="email"
                                    value={email}
                                />
                            </C.InputGroup>
                        </C.BodyFormSign>
                        <C.BoxSpan className='row d-flex'>
                            <h5>Alterar Senha</h5>
                            {errorMessage && (
                                <span className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </span>
                            )}
                        </C.BoxSpan>
                        <C.BodyFormSign className='row mb-5'>
                            <C.InputGroup className="col-6">
                                <label htmlFor="password">Senha:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder='Digite sua nova senha...'
                                    minLength={8}
                                />
                            </C.InputGroup>

                            <C.InputGroup className="col-6">
                                <label htmlFor="confirmPass">Confirmar Senha:</label>
                                <input
                                    type="password"
                                    id="confirmPass"
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    placeholder='Confirme sua senha...'
                                    minLength={8}
                                />
                            </C.InputGroup>
                        </C.BodyFormSign>
                        <C.BodyFormSign className='row'>
                            <C.InputGroup>
                                <label htmlFor="chavePix">Chave PIX:</label>
                                <input
                                    type="text"
                                    id="chavePix"
                                    value={chavePix}
                                    onChange={(e) => setChavePix(e.target.value)}
                                    placeholder='Digite sua credencial de produção'
                                />
                            </C.InputGroup>
                            <div className='col-12 text-center my-2'>
                                <h6 className='text-warning fw-bold'>ATENÇÃO</h6>
                                <p className='text-warning'>( CONFIGURAÇÃO NECESSÁRIA )</p>
                                É necessário configurar uma chave pix para que seja permitido realizar o saque na sua carteira. <br />


                                <span className='w-100 text-center'>
                                    <p>Preencha com cuidado as informações da sua conta, pois é através delas que o sistema envia e reconhece os pagamentos feitos.</p>
                                </span>

                                <div className='d-flex gap-2 my-2'>
                                    <input className="" id='checkbox_remember' checked={checkBox} type="checkbox" name="" value="" onChange={() => setCheckBox(!checkBox)} />
                                    <label htmlFor="checkbox_remember">
                                        Para continuar marque a caixa se já tiver concluído todas as configurações, incluindo a chave PIX.
                                    </label>
                                </div>
                            </div>
                        </C.BodyFormSign>

                        {checkBox &&
                            <div className="col-12 mt-4">
                                <input type='submit' value={"Salvar Alterações"} />
                            </div>
                        }

                    </C.FormSettings>
                </C.BodyContainer>
            </C.Container>
        </>
    );
};
