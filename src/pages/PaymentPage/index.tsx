import { useLocation, useNavigate, useParams } from "react-router-dom";
import { buy_for_quota, buy_raffle_only } from "../../utils/api";
import { useEffect, useRef, useState } from "react";
import * as C from './styled';
import { converterToReal } from "../../helpers/converter_money";
import { generatorQuota } from "../../helpers/generatorQuota";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import gifLoading from '../../assets/gif/loading.gif';
import { getPayment } from "../../utils/payment";
import logoPix from '../../assets/image/icons/logo-pix-256.png';

export default () => {
    const location = useLocation();
    const [loadingPayment, setLoadingPayment] = useState<Boolean>(false);
    const { state } = location || {};
    const { txid, expire, qr_code, qr_code_base64, buyer, telephone, raffleId, quantity, transaction_amount } = state;
    const navigate = useNavigate();
    const hasRunRef = useRef(false);
    let [expirePix, setExpirePix] = useState(expire);
    const { userId } = useParams();

    useEffect(() => {
        const hrefPay = localStorage.getItem('paymentLocal');
        if (hrefPay) {
            localStorage.removeItem('paymentLocal');
            window.location.href = hrefPay;
        }
        const interval = setInterval(() => {
            handleCheckPayment(interval)
        }, 3000)

        getPayment(txid).then(x => {
            const time = expire - x.expireCurrent;
            if (x.expired == true || x.expireCurrent < 0) {
                return setExpirePix(0)
            }
            setExpirePix(time);
        })
    }, [])

    useEffect(() => {
        const interExpirePix = setInterval(() => {
            if (expirePix > 0) {
                setExpirePix(expirePix - 1);
            } else {
                () => clearInterval(interExpirePix);
            }
        }, 1000);

        return () => clearInterval(interExpirePix);

    }, [expirePix]);


    const handleCheckPayment = async (interval: any) => {
        if (hasRunRef.current) return;
        hasRunRef.current = true;
        getPayment(txid).then((x: any) => {
            if (quantity && buyer && telephone && transaction_amount && quantity) {
                if (x.expired == true) {
                    clearInterval(interval);
                }
                let data: any = {
                    buyer,
                    telephone,
                    ticketNumber: quantity,
                    soldTicketValue: transaction_amount,
                    txid
                }
                if (!raffleId) {
                    buy_for_quota(data).then((response: any) => {
                        if (response.data.success) {
                            const base = response.data;
                            const generatedQuotas = generatorQuota({ winner: base.winner, quantity, awardedQuota: base.awardedQuota })
                            setLoadingPayment(true);
                            const state = {
                                data: response.data,
                                telephone,
                                ticketNumber: quantity,
                                generatedQuotas,
                                payment: x.paymentData,
                                raffleId: false
                            }
                            setTimeout(() => {
                                navigate(`/${userId}/result`, { state })
                            }, 7000)
                        } else {
                            console.log('Pagamento ainda nao aprovado!!');
                            hasRunRef.current = false;
                        }

                    }).catch((x: any) => {
                        console.error(x);
                        alert('Erro ao processar compra. Tente novamente mais tarde.');
                    })
                } else {
                    data['raffleId'] = raffleId;
                    buy_raffle_only(data).then((response: any) => {
                        if (response.data.success) {
                            const base = response.data;
                            const generatedQuotas = generatorQuota({ winner: base.winner, quantity, awardedQuota: base.awardedQuota });
                            setLoadingPayment(true);
                            const state = {
                                data: response.data,
                                telephone,
                                ticketNumber: quantity,
                                generatedQuotas,
                                payment: x.paymentData,
                                raffleId: true
                            }
                            setTimeout(() => {
                                navigate(`/${userId}/result`, { state })
                            }, 7000)
                        } else {
                            console.log('Pagamento ainda nao aprovado!!');
                            hasRunRef.current = false;
                        }
                    }).catch((x: any) => {
                        console.error(x);
                        alert('Erro ao processar compra. Tente novamente mais tarde.');
                    })
                }
            } else {
                console.log('Pix expirou ou parametros invalidos!');
            }
        });
    }

    const handleCopy = () => {
        if (qr_code)
            navigator.clipboard.writeText(qr_code).then(() => {
            }).catch(err => {
                console.error('Erro ao copiar: ', err);
            });
    };
    return (
        <>
            <C.Container>

                {loadingPayment ?
                    <C.BodyLoading>
                        <h1>Compra realizada com sucesso!!</h1>
                        <h5>Aguarde, estamos carregando suas cotas...</h5>
                        <img src={gifLoading} alt="" />
                    </C.BodyLoading>
                    :
                    <C.BodyPayment>
                        <p className="text-light fs-4">Faça o pagamento para continuar <br />
                            {
                                expirePix == 0 ?
                                    <span className='text-black rounded bg-danger p-2'> Seu pix expirou</span>
                                    :
                                    <span className='text-light'> Seu pix expira em <span className="fs-5">{expirePix}</span> segundos</span>

                            }
                        </p>
                        <p className="text-light">Total a pagar: <span className="money fs-4">{converterToReal(Number(transaction_amount))}</span></p>
                        <div><img src={logoPix} alt="" /></div>
                        <img width={500} height={500} src={`${qr_code_base64}`} />

                        <br />

                        <span className="text-light align-self-start px-md-5 mx-1">Copia e Cola</span>
                        <div className="box_copy">
                            <button onClick={handleCopy} id="liveToastBtn">
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                            <input type="text" id="copiar" value={qr_code} readOnly />
                        </div>
                        <span className="text-warning">Atenção!!</span><p className="text-light">Após o pagamento for aprovado, voce será redirecionado para a tela do resultado.</p>
                    </C.BodyPayment>
                }
            </C.Container>
        </>
    )
}