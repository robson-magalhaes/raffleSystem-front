import { useContext, useEffect, useState } from 'react'
import * as C from './styled'
import Header from '../../components/Header'
import { listPurchase } from '../../utils/api';
import BtnDefault from '../../components/BtnDefault';
import { AuthContext } from '../../context/AuthContext';

export default () => {
    const [purchase, setPurchase] = useState<PurchaseType[]>([]);
    const [purchaseByQuota, setPurchaseByQuota] = useState<PurchaseType[]>([]);
    const [pagination, setPagination] = useState<Boolean>(true);
    const [filterByQuota, setFilterByQuota] = useState<PurchaseType[]>([]);
    const [filterByOnly, setFilterByOnly] = useState<PurchaseType[]>([]);
    const [filter, setFilter] = useState('');
    const Ctx = useContext(AuthContext);

   
    useEffect(() => {
        if (Ctx?.userId) {
            console.log('veio aqui')
            listPurchase(Number(Ctx.userId)).then((x) => {
                setPurchase(x.data.purchase)
                setFilterByOnly(x.data.purchase)
                setPurchaseByQuota(x.data.purchaseByQuota)
                setFilterByQuota(x.data.purchaseByQuota)
            })
        }
    }, [Ctx?.userId])

    useEffect(() => {
        if (filter !== '') {
            const filterByQuota = purchaseByQuota.filter(x => x.paymentStatus == filter)
            const filterByOnly = purchase.filter(x => x.paymentStatus == filter)
            setFilterByQuota(filterByQuota);
            setFilterByOnly(filterByOnly)
        } else {
            setFilterByQuota(purchaseByQuota)
            setFilterByOnly(purchase)
        }
    }, [filter]);

    return (
        <>
            <Header activated={'/purchase_list'} />
            <C.Container>
                <C.BodyPanel>
                    <C.TitlePage>Lista de Compradores</C.TitlePage>

                    {purchaseByQuota && pagination ?
                        <>
                            <BtnDefault bgColor={'white'} onClick={() => setPagination(!pagination)}>Mudar lista</BtnDefault>
                            <C.TablePanel className="table table-hover mt-3">
                                <thead className='text-center'>
                                    <tr>
                                        <th className='fw-bold fs-6' colSpan={5}>Lista de compradores por campanha
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome do comprador</th>
                                        <th>Telefone</th>
                                        <th>Quantidade de cotas</th>
                                        <th>
                                            Status de pagamento
                                            <select
                                                id="filterSelect"
                                                name="filter"
                                                value=''
                                                onChange={(e) => setFilter(e.target.value)}
                                            >
                                                <option value=""></option>
                                                <option value="">Limpar filtro</option>
                                                <option value="ATIVA">Pendente</option>
                                                <option value="CONCLUIDA">Aprovado</option>
                                                <option value="EXPIRED" >Cancelado</option>
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {filterByQuota && filterByQuota.map((x, key) => (
                                        <tr key={key}>
                                            <td>{x.id}</td>
                                            <td>{x.buyer}</td>
                                            <td>{x.telephone}</td>
                                            <td>{x.ticketNumber}</td>
                                            <td>
                                                {x.paymentStatus == 'CONCLUIDA' && 'Aprovado'}
                                                {x.paymentStatus == 'ATIVA' && 'Pendente'}
                                                {x.paymentStatus == 'EXPIRED' && 'Cancelado'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </C.TablePanel>
                            <hr />
                        </>
                        :
                        <>
                            <BtnDefault bgColor={'white'} onClick={() => setPagination(!pagination)}>Mudar lista</BtnDefault>
                            <C.TablePanel className="table table-hover mt-3">
                                <thead className='text-center'>
                                    <tr>
                                        <th className='fw-bold fs-6' colSpan={6}>Lista de compradores por prêmio</th>
                                    </tr>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome do comprador</th>
                                        <th>Telefone</th>
                                        <th>Prêmio selecionado</th>
                                        <th>Quantidade de cotas</th>
                                        <th>
                                            Status de pagamento
                                            <select
                                                id="filterSelect"
                                                name="filter"
                                                value=''
                                                onChange={(e) => setFilter(e.target.value)}
                                            >
                                                <option value=""></option>
                                                <option value="">Limpar filtro</option>
                                                <option value="ATIVA">Pendente</option>
                                                <option value="CONCLUIDA">Aprovado</option>
                                                <option value="EXPIRED" >Cancelado</option>
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {filterByOnly && filterByOnly.map((x, key) => (
                                        <tr key={key}>
                                            <td>{x.id}</td>
                                            <td>{x.buyer}</td>
                                            <td>{x.telephone}</td>
                                            <td>{x.raffleName}</td>
                                            <td>{x.ticketNumber}</td>
                                            <td>
                                                {x.paymentStatus == 'CONCLUIDA' && 'Aprovado'}
                                                {x.paymentStatus == 'ATIVA' && 'Pendente'}
                                                {x.paymentStatus == 'EXPIRED' && 'Cancelado'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </C.TablePanel>
                        </>

                    }
                </C.BodyPanel>
            </C.Container>
        </>
    )
}