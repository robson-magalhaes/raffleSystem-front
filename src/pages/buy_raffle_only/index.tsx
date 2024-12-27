import { useEffect, useState } from 'react';
import { RafflesType } from '../../types/RafflesType';
import * as C from './styled';
import { converterToReal } from '../../helpers/converter_money';
import { phoneMask } from '../../helpers/phoneMask';
import { listRaffles } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { create_payment } from '../../utils/payment';

export default () => {
    const [userName, setUserName] = useState<string>('');
    const [userLastname, setUserLastName] = useState<string>('');
    const [qntQuota, setqntQuota] = useState<number>(0);
    const [telephone, setTelephone] = useState<string>('');
    const [raffles, setRaffles] = useState<RafflesType[]>([]);
    const [selectedProd, setSelectedProd] = useState<number>();
    const [selecProdQuotaValue, setSelectedProdQuotaValue] = useState<number>(0);
    const [totalBuyQuota, setTotalBuyQuota] = useState<number>(0);
    const [pagination, setPagination] = useState<number>(0);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        localStorage.removeItem('paymentLocal')
        listRaffles(userId).then((x: any) => {
            setRaffles(x.data)
        })
    }, []);

    useEffect(() => {
        let res = raffles.filter(x => (x.id == selectedProd));
        res.map(x => {
            setSelectedProdQuotaValue(x.ticketValue)
            setTotalBuyQuota(selecProdQuotaValue * qntQuota)
        }
        );
    }, [selectedProd, qntQuota, pagination]);


    const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (qntQuota && userName && telephone) {
            await create_payment({
                userId,
                first_name: userName,
                last_name: userLastname,
                telephone,
                unit_price: selecProdQuotaValue,
                quantity: qntQuota,
                transaction_amount: totalBuyQuota.toFixed(2),
                raffleId: selectedProd
            }).then(x => {
                const base = x.data.paymentData;
                const state = {
                    txid: base.txid,
                    expire: base.calendario.expiracao,
                    qr_code: base.pix_data.qrcode,
                    qr_code_base64: base.pix_data.imagemQrcode,
                    raffleId: selectedProd,
                    buyer: `${userName} ${userLastname}`,
                    telephone,
                    quantity: qntQuota,
                    transaction_amount: totalBuyQuota.toFixed(2)
                }
                navigate(`/${userId}/payment`, { state });
            }).catch(error => {
                console.error("Erro ao comprar ticket:", error);
                alert('Erro ao processar compra. Tente novamente mais tarde.');
            })
        }
    }

    useEffect(() => {
        let user = localStorage.getItem('userPurchase');
        if (user) {
            let data = JSON.parse(user);
            setUserName(data.userName);
            setUserLastName(data.userLastname);
            setTelephone(data.telephone);
            setPagination(1);
        }
    }, [])

    const handleSubmitChange = () => {
        const userData = {
            userName,
            userLastname,
            telephone
        };
        localStorage.setItem('userPurchase', JSON.stringify(userData));
        setPagination(1);
    }
    return (
        <>
            <C.Container>
                <C.TitlePage>Sorteio unico</C.TitlePage>
                <C.BodyCardBuyQuota>
                    {pagination == 0 &&
                        <>
                            <C.FormBuyQuota onSubmit={handleSubmitChange}>
                                <div className="row">
                                    <div className="col form-group">
                                        <label><strong>Nome</strong></label>
                                        <input type="text"
                                            className="form-control"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            required
                                            placeholder="Digite o seu nome..." />
                                    </div>
                                    <div className="col form-group">
                                        <label><strong>Sobrenome</strong></label>
                                        <input type="text"
                                            className="form-control"
                                            value={userLastname}
                                            onChange={(e) => setUserLastName(e.target.value)}
                                            required
                                            placeholder="Digite o seu sobrenome..." />
                                    </div>

                                </div>
                                <div className="row form-group mt-4">
                                    <div className='col-md-6'>
                                        <label><strong>Telefone</strong></label>
                                        <input type="tel"
                                            className="form-control"
                                            value={telephone}
                                            onChange={(e) => setTelephone(phoneMask(e.target.value))}
                                            minLength={14}
                                            maxLength={15}
                                            pattern="\(\d{2}\)\s\d{5}-\d{4}"
                                            title="O número de telefone não esta completo"
                                            required
                                            placeholder="Digite seu número de telefone..." />
                                    </div>
                                </div>
                                <div className="col d-flex justify-content-end">
                                    <button type="submit" className="btnBuy mt-4">
                                        <strong>Proximo</strong>
                                    </button>
                                </div>
                            </C.FormBuyQuota>
                        </>
                    }
                    {pagination == 1 && <>
                        <C.FormBuyQuota onSubmit={handlePay}>
                            <C.BoxInput>
                                <C.InputForm className='text-start'>

                                    <label><strong>Prêmio</strong></label>
                                    <select
                                        className="form-select"
                                        value={selectedProd}
                                        onChange={(e) => setSelectedProd(Number(e.target.value))}
                                        required
                                    >
                                        <option value={0}>Selecione o nome do prêmio</option>
                                        {raffles && raffles.map(x => (
                                            x.productQnt != 0 ? <option key={x.id} value={x.id}>{x.productName}</option> : ''
                                        ))}
                                    </select>
                                </C.InputForm>
                                {
                                    selectedProd &&
                                    <>
                                        <C.InputForm className=''>
                                            <label><strong>Quantidade de cotas</strong></label>
                                            <div className="col d-flex flex-row img-fluid align-items-center justify-content-center">
                                                <svg
                                                    onClick={() => setqntQuota(qntQuota > 0 ? qntQuota - 1 : 0)}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    role="img"
                                                    className="MuiBox-root css-11elljy iconify iconify--lucide"
                                                    width="2em"
                                                    height="2em"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                    >
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <path d="M8 12h8"></path>
                                                    </g>
                                                </svg>

                                                <input type="number"
                                                    className="form-control text-center"
                                                    value={qntQuota}
                                                    onChange={(e) => setqntQuota(parseInt(e.target.value))}
                                                    required
                                                    placeholder="Digite o valor do ticket..."
                                                />

                                                <svg
                                                    onClick={() => setqntQuota(parseInt(qntQuota.toString()) + 1)}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    role="img"
                                                    className="MuiBox-root css-11elljy iconify iconify--lucide"
                                                    width="2em"
                                                    height="2em"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                    >
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <path d="M8 12h8m-4-4v8"></path>
                                                    </g>
                                                </svg>
                                            </div>

                                        </C.InputForm>
                                    </>
                                }
                            </C.BoxInput>
                            {
                                selectedProd &&
                                <>
                                    <hr />
                                    <C.TableBuyQuota>
                                        <thead>
                                            <tr>
                                                <th><strong>Valor da cota deste sorteio</strong></th>
                                                <th><strong>Quantidade de cotas</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{converterToReal(selecProdQuotaValue)}</td>
                                                <td> {qntQuota}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Total a pagar</strong></td>
                                                <td>{converterToReal(totalBuyQuota)}</td>
                                            </tr>
                                        </tbody>
                                    </C.TableBuyQuota>
                                    <hr />

                                </>

                            }
                            <C.Box_btn_buy>
                                <button className="btn btn-light px-4 mt-4" onClick={() => setPagination(0)}>
                                    <strong>Voltar</strong>
                                </button>
                                {
                                    selectedProd &&
                                    <>
                                        <button type='submit' className={`${qntQuota > 0 ? 'btnBuy opacity-1' : 'opacity-0'} mt-4`} disabled={qntQuota > 0 ? false : true}>
                                            <strong>Comprar</strong>
                                        </button>
                                    </>
                                }
                            </C.Box_btn_buy>
                        </C.FormBuyQuota>
                    </>
                    }
                </C.BodyCardBuyQuota>
            </C.Container >

        </>
    );
};
