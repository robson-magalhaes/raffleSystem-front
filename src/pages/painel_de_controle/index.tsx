import { useContext, useEffect, useState } from 'react'
import * as C from './styled'
import { useNavigate } from 'react-router-dom';
import { RafflesType } from '../../types/RafflesType';
import { CampaignType } from '../../types/CampaignType';
import Header from '../../components/Header';
import LoadingView from '../../components/LoadingView';
import BtnDefault from '../../components/BtnDefault';
import { converterToReal } from '../../helpers/converter_money';
import { delCampaign, delRaffle, listCampaign, listRaffles } from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';
import { accountCompleted } from '../../utils/user';

export default () => {
    const [registerCompleted, setRegisterCompleted] = useState<boolean>(false);
    const [raffles, setRaffles] = useState<RafflesType[]>();
    const [campaign, setCampaign] = useState<CampaignType[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const Ctx = useContext(AuthContext);

    useEffect(() => {
        if (Ctx?.userId) {
            accountCompleted(Number(Ctx?.userId)).then((x: any) => {
                setRegisterCompleted(x);
            })
        }
    }, [Ctx?.userId]);

    const fetchData = async () => {
        if (!Ctx?.userId) {
            console.log("Usuário não autenticado ou userId não disponível");
            return;
        }

        try {
            const [rafflesResponse, campaignResponse] = await Promise.all([
                listRaffles(Ctx.userId),
                listCampaign(Ctx.userId)
            ]);

            const raffles = rafflesResponse.data;
            const campaign = campaignResponse.data;

            setCampaign(campaign);
            setRaffles(raffles);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        setTimeout(() => {
            if (Ctx?.userId) {
                fetchData();
            }
        }, 1000);
    }, [Ctx?.userId]);

    const handleDelRaffle = (id: number) => {
        delRaffle(id).then(() => {
            fetchData();
        }).catch(error => {
            console.error("There was an error deleting the raffle!", error);
        });
    }

    const handleDelcampaign = async (id: number) => {
        let result = confirm('Tem certeza que deseja excluir a campanha?');
        if (result) {
            delCampaign(id).then(() => {
                fetchData();
            }).catch(error => {
                console.error("There was an error deleting the raffle!", error);
            });
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <Header activated={'/panel'} />
            <C.Container>
                {loading == true
                    ?
                    <LoadingView />
                    :
                    <C.BodyPanel>
                        
                {!registerCompleted &&
                    <>
                        <h1 className='text-warning mt-5'>ATENÇÂO</h1>
                        <C.MessageSpan className="alert alert-warning" role="alert">Complete o cadastro da sua conta!!</C.MessageSpan>
                    </>
                }
                        {raffles && raffles.length > 0 ?
                            <>
                                <C.TitlePage>Painel de Transações</C.TitlePage>
                                <C.TablePanel className="table table-hover">
                                    <thead className='text-center'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome do prêmio</th>
                                            <th>Valor do prêmio</th>
                                            <th>Valor da cota</th>
                                            <th>% Cotas Vendidas</th>
                                            <th>Vendas</th>
                                            <th>Qnt. Cotas</th>
                                            <th>Valor total de vendas</th>
                                            <th>Lucro excedente</th>
                                            <th>Cota premiada</th>
                                            <th>Ganhadores</th>
                                            <th> - </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {raffles && raffles.map((x, key) => (
                                            <C.TableTR key={key} successWinner={x.winner ? true : false}>
                                                <td>{x.id}</td>
                                                <td>{x.productName}</td>
                                                <td className="money">{converterToReal(x.productValue)}</td>
                                                <td className="money">{converterToReal(x.ticketValue)}</td>
                                                <td >{((x.totalTicketValue / x.productValue) * 100).toFixed(2)}%</td>
                                                <td className='text-center'>{x.soldTickets}</td>
                                                <td className='text-center'>{Math.floor(x.totalTicketValue / x.ticketValue)}</td>
                                                <td className="money">{converterToReal(x.totalTicketValue)}</td>
                                                <td className={`${x.totalTicketValue - x.productValue <= 0 ? 'text-danger' : 'money'}`}>
                                                    {x.totalTicketValue - x.productValue < 0 ? 0 : converterToReal(x.totalTicketValue - x.productValue)}
                                                </td>
                                                <td>{x.awardedQuota}</td>
                                                <td className='money'>
                                                    {x.winner}
                                                </td>
                                                <td onClick={() => handleDelRaffle(x.id)}>
                                                    <BtnDefault bgColor='red'> X </BtnDefault>
                                                </td>
                                            </C.TableTR>
                                        ))}
                                    </tbody>
                                </C.TablePanel>

                                <C.AwardedQuota>
                                    <h4> Cotas prêmiadas </h4>
                                    <div className='d-flex flex-wrap justify-content-center'>
                                        {raffles.map((x, key) => (
                                            <div key={key} className={`card text-center p-1 m-2 ${x.winner && 'bg-success text-light'}`}>
                                                {x.awardedQuota}
                                            </div>
                                        ))}
                                    </div>
                                    <span className='text-light fs-6 mt-2'>Obs: As opções que estiverem marcadas de verde, corresponde a uma cota ja contemplada</span>
                                </C.AwardedQuota>

                            </>
                            :
                            <C.InfoList>
                                Não foi encontrado registros de sorteio.
                            </C.InfoList>

                        }
                        <br />
                        {campaign.length != 0 ?
                            <>
                                <C.TitlePage className='mt-4'>Campanha - Sorteios por Cota</C.TitlePage>
                                <C.TablePanel className="table table-hover">
                                    <thead className='text-center'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome da Campanha</th>
                                            <th>Valor da cota</th>
                                            <th>Valor mínimo</th>
                                            <th>Valor total de sorteios</th>
                                            <th>Cotas vendidas</th>
                                            <th>Total vendido</th>
                                            <th> - </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {campaign && campaign.map((x, key) => (
                                            <tr key={key}>
                                                <td>{x.id}</td>
                                                <td>{x.name}</td>
                                                <td className='money'>{converterToReal(x.quota)}</td>
                                                <td className='money'>{converterToReal(x.minValue * x.quota)}</td>
                                                <td className='money'>{converterToReal(x.totalProductValue)}</td>
                                                <td>{x.soldTicket}</td>
                                                <td className='money'>{converterToReal(x.totalSoldTicketValue)}</td>
                                                <td className='d-md-flex'>
                                                    <BtnDefault bgColor='yellow' onClick={() => navigate('/create_edit_campaign')}> Edit </BtnDefault>
                                                    <BtnDefault bgColor='red' onClick={() => handleDelcampaign(x.id)}> X </BtnDefault>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </C.TablePanel>
                                <h4 className='text-light'>Descrição</h4>
                                {!campaign[0].description ? <p className="text-light">Nenhuma descrição informada</p> :
                                    <C.CampaignDescription className='text-light'>
                                        <div dangerouslySetInnerHTML={{ __html: campaign.map(x => x.description).join('') }} />
                                    </C.CampaignDescription>
                                }
                            </>
                            :
                            <>
                                <C.InfoList>Não há campanha criada.</C.InfoList>
                            </>
                        }
                    </C.BodyPanel>
                }
            </C.Container>
        </>
    )
}