import * as C from './styled';
import { useEffect, useState } from 'react';
import { converterToReal } from '../../helpers/converter_money';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../helpers/formatDate';

export default () => {
    const [onlyLoad, setOnlyLoad] = useState(true);
    const [resultQuota, setResultQuota] = useState<any[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location || {};
    const { data, telephone, ticketNumber, generatedQuotas, payment, raffleId } = state;
    const { userId } = useParams();

    useEffect(() => {
        if (onlyLoad) {
            setResultQuota(generatedQuotas);
            localStorage.setItem('paymentLocal', raffleId ? `/${userId}/buy_raffle_only` : `/${userId}/buy_quota`);
            return setOnlyLoad(false);
        }
    }, [onlyLoad]);

    return (
        <C.Container>
            <C.InfoContainer>
                <button onClick={() => navigate(raffleId ? `/${userId}/buy_raffle_only` : `/${userId}/buy_quota`)}>Voltar</button>
                {data.winner ? (
                    <>
                        <C.InfoBody>
                            <div className="alert alert-success" role="alert">
                                <p className='text-center fs-4'>Você ganhou, Parabéns!!. </p><br />
                                A cota contemplada foi a <span className='fw-bold'>{data.awardedQuota}</span><br />
                                Prêmio: <span className='fw-bold'>{data.productName}</span>
                                <p>Comprador: {data.buyer} <br />
                                    Telefone: {telephone}<br />

                                </p>
                                <hr />
                                <p className='fw-bold'>Informações sobre o pagamento</p>
                                <p>
                                    Status de pagamento: {payment.status == 'CONCLUIDA' ? 'Aprovado' : 'Aguardando pagamento'} <br />
                                    Data e hora: {formatDate(payment.calendario.criacao)} <br />
                                    Metodo de pagamento: Pix <br />
                                    ID: {data.purchaseId}{payment.txid}{data.purchaseId * 7}
                                    <br />Valor total pago: {converterToReal(data.soldTicketValue)}
                                    <br />Quantidade de cotas: {ticketNumber}
                                </p>
                            </div>
                            <div className='p-2'>
                                <span>Suas cotas:</span>
                                <div className="d-flex gap-2 flex-wrap">
                                    {resultQuota.map((x, index) => (
                                        <C.Quota key={index} className={` ${data.awardedQuota == x ? 'bgSuccess' : 'bg-light'}`}>
                                            {x}
                                        </C.Quota>
                                    ))}
                                </div>
                            </div>
                        </C.InfoBody>
                    </>
                ) : (
                    <>
                        <C.InfoBody>
                            <div className="alert alert-warning" role="alert">
                                <p className='text-center fs-4  mb-5'>Infelizmente não foi dessa vez, talvez na próxima.</p>
                                <p>Comprador: {data.buyer} <br />
                                    Telefone: {telephone}<br />

                                </p>
                                <hr />
                                <p className='fw-bold'>Informações sobre o pagamento</p>
                                <p>
                                    Status de pagamento: {payment.status == 'CONCLUIDA' ? 'Aprovado' : 'Aguardando pagamento'} <br />
                                    Data e hora: {formatDate(payment.calendario.criacao)} <br />
                                    Metodo de pagamento: Pix <br />
                                    ID: {data.purchaseId}{payment.txid}{data.purchaseId * 7}
                                    <br />Valor total pago: {converterToReal(data.soldTicketValue)}
                                    <br />Quantidade de cotas: {ticketNumber}
                                </p>
                            </div>
                            <div className='p-2 d-flex flex-column align-items-center gap-2'>
                                <span>Suas cotas:</span>
                                <div className="d-flex gap-2 flex-wrap justify-content-center">
                                    {resultQuota.map((x, index) => (
                                        <C.Quota key={index} className={`bg-light`}>
                                            {x}
                                        </C.Quota>
                                    ))}
                                </div>
                            </div>
                        </C.InfoBody>
                    </>
                )}
            </C.InfoContainer>
        </C.Container>
    );
};
