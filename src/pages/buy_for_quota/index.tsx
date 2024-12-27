import { useEffect, useState } from 'react';
import * as C from './styled';
import { RafflesType } from '../../types/RafflesType';
import { converterToReal } from '../../helpers/converter_money';
import { phoneMask } from '../../helpers/phoneMask';
import { listCampaign, listRaffles } from '../../utils/api';
import { CampaignType } from '../../types/CampaignType';
import { Modal } from 'react-bootstrap';
import './modal.css'
import iconWin from '../../assets/image/icons/premio.png';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingView from '../../components/LoadingView';
import { create_payment } from '../../utils/payment';

export default () => {
    const [userName, setUserName] = useState<string>('');
    const [userLastname, setUserLastName] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [raffles, setRaffles] = useState<RafflesType[]>([]);
    const [campaign, setCampaign] = useState<CampaignType[]>([]);
    const [pagination, setPagination] = useState<number>(0);
    const [minValue, setMinValue] = useState<number>(0);
    const [qntQuota, setqntQuota] = useState<number>(0);
    const [quota, setQuota] = useState<number>(0);
    const [disable, setDisable] = useState<boolean>(false);
    const [premiumShow, setPremiumShow] = useState(false);
    const [quotaShow, setQuotaShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userId } = useParams();

    const fetchData = async () => {
        try {
            const [rafflesResponse, campaignResponse] = await Promise.all([listRaffles(userId), listCampaign(userId)])
            setLoading(false);
            setRaffles(rafflesResponse.data);
            setCampaign(campaignResponse.data);
            setQuota(campaignResponse.data[0].quota);
            setMinValue(campaignResponse.data[0].minValue);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        localStorage.removeItem('paymentLocal')
        setLoading(true);
        setTimeout(() => {
            fetchData();
        }, 1000);
        let user = localStorage.getItem('userPurchase');
        if (user) {
            let data = JSON.parse(user);
            setUserName(data.userName);
            setUserLastName(data.userLastname);
            setTelephone(data.telephone);
            setPagination(1);
        }
    }, [])

    useEffect(() => {
        if (raffles.length > 0) {
            let result = raffles.filter(x => x.productQnt > 0);
            if (result.length === 0 || quota == 0) {
                setDisable(true);
            }
        }
        setqntQuota(parseFloat(minValue.toString()));
    }, [raffles]);

    const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (qntQuota && userName && telephone) {
            await create_payment({
                userId,
                first_name: userName,
                last_name: userLastname,
                telephone,
                unit_price: quota,
                quantity: qntQuota,
                transaction_amount: quota * qntQuota
            }).then(x => {
                const base = x.data.paymentData;
                const state = {
                    txid: base.txid,
                    expire: base.calendario.expiracao,
                    qr_code: base.pix_data.qrcode,
                    qr_code_base64: base.pix_data.imagemQrcode,
                    buyer: `${userName} ${userLastname}`,
                    telephone,
                    quantity: qntQuota,
                    transaction_amount: quota * qntQuota
                }
                navigate(`/${userId}/payment`, { state });
            }).catch(error => {
                console.error("Erro ao comprar ticket:", error);
                alert('Erro ao processar compra. Tente novamente mais tarde.');
            })
        }
    }

    const handleQntQuota = (n: number) => {
        setqntQuota(prev => Math.max(prev - n, minValue))
    }
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
                <C.TitlePage>Sorteio por cotas</C.TitlePage>
                {loading == true
                    ?
                    <LoadingView />
                    :
                    <C.BodyCardBuyQuota>

                        <>
                            {pagination == 0 &&
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
                                        <div className='col-lg-6'>
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
                            }

                            {pagination == 1 &&
                                <>

                                    {campaign.map((x, key) => (
                                        <C.CampaignDescription key={key}>
                                            {x.description &&
                                                <>
                                                    <h4>Descrição</h4>
                                                    <hr />
                                                    <div dangerouslySetInnerHTML={{ __html: x.description }} />
                                                </>
                                            }
                                        </C.CampaignDescription>
                                    ))}
                                    <hr />
                                    <C.BoxInfo>
                                        {
                                            campaign.length > 0 ?
                                                <>
                                                    <div className='row col-12 d-flex justify-content-center align-items-center gap-2'>
                                                        <button onClick={() => setPremiumShow(true)}>
                                                            <div className=''>Prêmios</div>
                                                        </button>

                                                        <button onClick={() => setQuotaShow(true)}>
                                                            <div className=''>Cotas prêmiadas</div>
                                                        </button>
                                                    </div>
                                                    <div>
                                                    </div>
                                                    {
                                                        raffles.filter(x => (x.winner !== null)).length === raffles.length
                                                            ?
                                                            <>
                                                                <br />
                                                                <h3 className="alert alert-success w-100 text-center fw-bold" role="alert" style={{ letterSpacing: 3 }}><span>Todos os prêmios já têm ganhadores.</span></h3>
                                                            </>
                                                            :
                                                            <div className='w-100 p-4 mt-4 info'>
                                                                <strong>Valor atual para cada cota:</strong>
                                                                <span className='money fs-4'> R${parseFloat(quota.toString()).toFixed(2)}</span>
                                                                <br />
                                                                <div className='mt-2'>Quantidade mínima de cotas:
                                                                    <span className='money fs-5'> {minValue}</span>
                                                                </div>
                                                            </div>
                                                    }
                                                </>
                                                :
                                                <>
                                                    <h3 className="alert alert-warning w-100 text-center fw-bold" role="alert" style={{ letterSpacing: 3 }}><span>Não há registros de prêmios disponíveis para sorteio.</span></h3>
                                                </>
                                        }
                                        <Modal
                                            centered
                                            show={premiumShow}
                                            onHide={() => setPremiumShow(false)}
                                            size='lg'>
                                            <Modal.Header closeButton className='border-0 mx-3'>
                                                <Modal.Title>Prêmios e Ganhadores</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body >
                                                <C.Premium>
                                                    {raffles.map((x, key) => (
                                                        <C.CardPremium key={key}>
                                                            <div className='first_box'>
                                                                {x.winner &&
                                                                    <div className='d-flex'>
                                                                        <img width={30} height={30} src={`${iconWin}`} alt="sem imagem" />
                                                                        <h5>{x.winner !== '' ? x.winner : ' aaaa'}</h5>
                                                                    </div>
                                                                }
                                                                <h6>{x.productName}</h6>
                                                            </div>
                                                            <div className="secund_box">
                                                                <C.Quota className={` ${x.winner ? 'bgSuccess' : 'bg-light'}`}>
                                                                    {x.awardedQuota}
                                                                </C.Quota>
                                                            </div>
                                                        </C.CardPremium>
                                                    ))}

                                                </C.Premium>
                                            </Modal.Body>
                                        </Modal>
                                        <Modal
                                            centered
                                            show={quotaShow}
                                            onHide={() => setQuotaShow(false)}
                                        >
                                            <Modal.Header closeButton className='border-0 mx-3'>
                                                <Modal.Title>Lista de cotas prêmiadas</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body >
                                                <div className="d-flex flex-wrap justify-content-center gap-3">
                                                    {raffles.map((x, key) => (
                                                        <C.Quota key={key} className={`${x.winner ? 'bgSuccess' : 'bg-light'}`}>
                                                            {x.awardedQuota}
                                                        </C.Quota>

                                                    ))}
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </C.BoxInfo>

                                    {
                                        campaign.length > 0 && !disable &&
                                        <C.FormBuyQuota
                                            onSubmit={handlePay}
                                        >

                                            <C.BodyForm>
                                                <C.BoxInput>
                                                    <svg
                                                        onClick={() => setqntQuota(qntQuota > minValue ? qntQuota - 1 : parseInt(qntQuota.toString()))}
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
                                                        onChange={(e) => setqntQuota(Math.max(parseFloat(e.target.value), 0))}
                                                        maxLength={5}
                                                        disabled
                                                        required
                                                        placeholder="Digite o valor da cota..."
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


                                                </C.BoxInput>

                                                <C.ContainerTicket>
                                                    <C.BodyTicket $bg="add" onClick={() => setqntQuota(qntQuota + 5)}>
                                                        <span> + 5 </span>
                                                    </C.BodyTicket>
                                                    <C.BodyTicket $bg="add" onClick={() => setqntQuota(qntQuota + 10)}>
                                                        <span> + 10 </span>
                                                    </C.BodyTicket>
                                                    <C.BodyTicket $bg="add" onClick={() => setqntQuota(qntQuota + 50)}>
                                                        <span> + 50 </span>
                                                    </C.BodyTicket>
                                                    <C.BodyTicket $bg="add" onClick={() => setqntQuota(qntQuota + 100)}>
                                                        <span> + 100 </span>
                                                    </C.BodyTicket>
                                                    <C.BodyTicket $bg="remove" onClick={() => handleQntQuota(5)}>
                                                        <span> - 5 </span>
                                                    </C.BodyTicket>
                                                    <C.BodyTicket $bg="remove" onClick={() => handleQntQuota(10)}>
                                                        <span> - 10 </span>
                                                    </C.BodyTicket>
                                                    <C.BodyTicket $bg="remove" onClick={() => handleQntQuota(50)}>
                                                        <span> - 50 </span>
                                                    </C.BodyTicket>
                                                    <C.BodyTicket $bg="remove" onClick={() => handleQntQuota(100)}>
                                                        <span> - 100 </span>
                                                    </C.BodyTicket>
                                                </C.ContainerTicket>
                                            </C.BodyForm>
                                            <hr />
                                            <C.TableBuyQuota>
                                                <thead>
                                                    <tr>
                                                        <th><strong>Quantidade</strong></th>
                                                        <th><strong>Valor total a ser pago</strong></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{qntQuota}</td>
                                                        <td> {converterToReal(qntQuota * quota)}</td>
                                                    </tr>
                                                </tbody>
                                            </C.TableBuyQuota>
                                            <C.Box_btn_buy>
                                                <button className="btn btn-light px-4 mt-4" onClick={() => setPagination(0)}>
                                                    <strong>Voltar</strong>
                                                </button>
                                                {!disable && <button type='submit' className="btnBuy mt-4">
                                                    <strong>Comprar</strong>
                                                </button>
                                                }
                                            </C.Box_btn_buy>
                                        </C.FormBuyQuota>
                                    }
                                </>

                            }

                        </>
                    </C.BodyCardBuyQuota>
                }
            </C.Container >
        </>
    );
};
