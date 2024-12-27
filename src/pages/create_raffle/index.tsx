import { useState } from 'react';
import * as C from './styled';
import Header from '../../components/Header';
import BtnDefault from '../../components/BtnDefault';
import { createRaffle } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

export default () => {
    const [prodName, setProdName] = useState<string>();
    const [prodValue, setProdValue] = useState<string>('');
    const [prodTicket, setTicketValue] = useState<string>();
    const [qntProduct, setQntProduct] = useState<number>(1);
    const navigate = useNavigate();

    const handleCreateRaffle = () => {
        try {
            if (prodName && prodValue && qntProduct && prodTicket) {
                const data = {
                    productName: prodName,
                    productValue: parseFloat(prodValue?.replace('.', '').replace(',', '.')).toFixed(2),
                    productQnt: qntProduct,
                    ticketValue: parseFloat(prodTicket?.replace('.', '').replace(',', '.')).toFixed(2)
                }
                createRaffle(data);
            }else{
                console.log('Faltando preencher campos..')
            }
        } catch {
            console.log("Nao foi possivel cadastrar o sorteio!!");
        }

    };
    return (
        <>
            <Header activated={'/create_raffle'} />
            <C.Container>
                <h1>CRIAR PRÊMIO DO SORTEIO</h1>
                <C.FormCreateRaffle action='/panel'>
                    <div className="form-group">
                        <label><strong>Nome</strong></label>
                        <input type="text"
                            className="form-control"
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
                            required
                            placeholder="Digite o nome do produto..." />
                    </div>
                    <div className="row form-group">
                        <div className="col">
                            <label htmlFor="amount">Valor do produto</label>
                            <NumericFormat
                                className="form-control"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                value={prodValue}
                                fixedDecimalScale
                                allowNegative={false}
                                allowedDecimalSeparators={['.', ',']}
                                onChange={(e) => setProdValue(e.target.value)}
                                placeholder='Digite o valor...'
                                required
                            />
                        </div>
                        <div className="col-4 text-center">
                            <label><strong>Quantidade</strong></label>
                            <input
                                type="number"
                                className="form-control text-center"
                                value={qntProduct}
                                onChange={(e) => setQntProduct(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label><strong>Valor de cada Cota</strong></label>
                        <NumericFormat
                                className="form-control"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                value={prodTicket}
                                fixedDecimalScale
                                allowNegative={false}
                                allowedDecimalSeparators={['.', ',']}
                                onChange={(e) => setTicketValue(e.target.value)}
                                required
                                placeholder='Digite o valor...'
                            />
                    </div>
                    <div className="col d-flex justify-content-between">
                        <BtnDefault type="submit" onClick={() => { navigate('/panel') }} bgColor='red'>Voltar</BtnDefault>
                        <BtnDefault type="submit" onClick={handleCreateRaffle}>Salvar</BtnDefault>
                    </div>
                </C.FormCreateRaffle>
            </C.Container>
        </>
    )
}