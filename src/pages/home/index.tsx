import * as C from './styled'
import Header from './Header'
import BtnDefault from '../../components/BtnDefault'
import { useEffect, useState } from 'react'

export default () => {
    const maxCharacters = 1500;
    const [subject, setSubject] = useState("");
    const [maxChar, setMaxChar] = useState<number>(maxCharacters);
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const countChar = description.length;
        setMaxChar(maxCharacters - countChar)
    }, [description]);

    return (
        <>
            <Header activated='/' />
            <C.Container>
                <C.MySession>
                    <C.BoxInfo>
                        <h1>Sorteio de prêmios</h1>
                        <p>Prêmiação em <span color='#B5FE00'>tempo real</span><br /></p>
                        <p className='text-light fs-4'>O comprador ao efeturar o pagamento, recebe o resultado do sorteio na hora!</p>
                    </C.BoxInfo>
                </C.MySession>
                <C.MySession>
                    <C.BoxInfo  id="contato">
                        <h1>Entre em contato</h1>
                        <p>Envie uma sujestão ou tire suas duvida</p>
                    </C.BoxInfo>
                    <div className='col-10 col-md-6 text-light'>
                        <form action='mailto:dev.robsonom@hotmail.com' method="post" encType="text/plain">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">NOME</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setSubject(e.target.value)}
                                    name={'Nome '}
                                    value={subject}
                                    placeholder='Digite seu nome...'
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">DESCRIÇÃO</label>
                                <textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={maxCharacters}
                                    style={{ height: "250px" }}
                                    className="form-control"
                                    name={'Conteudo'}
                                    value={description}
                                    placeholder='Escreva aqui...'
                                    required
                                />
                                <span>Máximo de caracteres: {maxChar} </span>
                            </div>
                            <div className='col-12 d-flex justify-content-end'>
                                <button type="submit" className="btn btn-success">ENVIAR</button>
                            </div>
                        </form>
                    </div>
                </C.MySession>
                <C.MySession>
                    <C.BoxInfo className='align-self-center'>
                        <h1>COMECE AGORA MESMO</h1>
                        <p>Cadastre-se ou entre em contato</p>
                        <BtnDefault bgColor="#B5FE00" textColor="#000" fs='1.4rem'>
                            <a href="/register">CADASTRAR</a>
                        </BtnDefault>
                    </C.BoxInfo>
                </C.MySession>
            </C.Container>
        </>
    )
}