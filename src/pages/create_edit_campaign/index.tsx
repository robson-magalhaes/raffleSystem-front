import { FormEvent, useContext, useEffect, useState } from 'react';
import * as C from './styled';
import Header from '../../components/Header';
import BtnDefault from '../../components/BtnDefault';
import { CampaignType } from '../../types/CampaignType';
import { createCampaign, editCampaign, listCampaign } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import TextEditor from '../../components/TextEditor'
import { converterToReal } from '../../helpers/converter_money';
import { NumericFormat } from 'react-number-format';
import { AuthContext } from '../../context/AuthContext';

export default () => {
    const [name, setName] = useState<string>('');
    const [quota, setQuota] = useState<string>('0,00');
    const [minValue, setMinValue] = useState<number>(0);
    const [campaign, setCampaign] = useState<CampaignType[]>([]);
    const [description, setDescription] = useState<string>('');
    const [minResult, setMinResult] = useState<number>(0);
    const [id, setId] = useState<number | undefined>(undefined);
    const navigate = useNavigate();
    const Ctx = useContext(AuthContext);

    useEffect(() => {
        let n1 = parseFloat(quota.replace('.', '').replace(',', '.'));
        let n2 = minValue;
        let result = n1 * n2;
        setMinResult(result);
    }, [quota, minValue]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await listCampaign(Ctx?.userId);
            setCampaign(response.data);
            if (response.data.length > 0) {
                setId(response.data[0].id);
                setName(response.data[0].name);
                setQuota(response.data[0].quota);
                setMinValue(response.data[0].minValue);
                setDescription(response.data[0].description);
            }
        };
        fetchData();
    }, []);

    const handleCreateOrEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formattedQuota = parseFloat(quota.replace('.', '').replace(',', '.')).toFixed(2);
            if (campaign.length > 0) {
                editCampaign({
                    id,
                    name,
                    quota: formattedQuota,
                    minValue,
                    description
                }).then(() => {
                    navigate('/panel');
                });
            } else {
                createCampaign({ name, quota: formattedQuota, minValue, description }).then(() => {
                    navigate('/panel');
                });
            }
        } catch {
            alert("Não foi possível cadastrar a campanha!");
        }
    };

    const handleTextEditor = (newContent: string) => {
        setDescription(newContent);
    };

    return (
        <>
            <Header activated={'/create_campaign'} />
            <C.Container>
                <h1>{campaign.length > 0 ? 'EDITAR CAMPANHA' : 'CRIAR CAMPANHA'}</h1>
                <C.FormCreateRaffle>
                    <div className="form-group">
                        <label><strong>Nome</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Digite o nome da campanha..."
                        />
                    </div>
                    <div className="row form-group">
                        <div className="col">
                            <label><strong>Valor de cada cota</strong></label>
                            <NumericFormat
                                className="form-control"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                value={quota}
                                fixedDecimalScale
                                allowNegative={false}
                                onValueChange={(values) => setQuota(values.formattedValue)}
                                required
                                placeholder="Digite o valor da cota..."
                            />
                        </div>
                        <div className="col">
                            <label><strong>Quantidade mínima de cotas</strong></label>
                            <input
                                type="number"
                                className="form-control fs-5"
                                value={minValue}
                                onChange={(e) => setMinValue(parseFloat(e.target.value))}
                                required
                                placeholder="Digite o valor mínimo..."
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Resultado do valor mínimo em dinheiro: <span className='money'>{converterToReal(minResult)}</span>
                        </div>
                    </div>
                    <label><strong>Descrição</strong></label>
                    <TextEditor textEditor={handleTextEditor} value={description} id={id && ''} />
                    <div className="col d-flex justify-content-between">
                        <BtnDefault type="button" onClick={() => { navigate('/panel') }} bgColor='red'>Voltar</BtnDefault>
                        <BtnDefault type="submit" onClick={handleCreateOrEdit}>Salvar</BtnDefault>
                    </div>
                </C.FormCreateRaffle>
            </C.Container>
        </>
    );
};
