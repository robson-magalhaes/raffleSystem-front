import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import BtnDefault from '../BtnDefault';

export default ({ textEditor, value, id }: any) => {

    const handleSaveDescription = async () => {
        await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/edit_description`, { id: id, description: value })
            .then(() => {
                location.href = "/"
            })
    }
    return (
        <>
            {
                !id ?

                    <>
                        <Editor
                            apiKey='8pqsp5f5ksvcylz2a52zbi5q9ivaafifrbnmf0pz94p0gnp2'
                            value={value}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'textcolor colorpicker fontfamily fontsize'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic underline | fontsize fontfamily forecolor backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | removeformat | image | help',
                                content_style: 'body { font-family:Arial,Helvetica,sans-serif; font-size:14px }'
                                ,
                                language: 'pt_BR',
                                statusbar: false,
                                ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant, " + request)),
                            }}
                            onEditorChange={textEditor}
                        />
                    </>
                    :
                    <div className='d-flex flex-column align-items-center mt-4 p-5'>
                        <h5 className='mt-4'>No momento ja existe uma campanha criada, finalize para prosseguir ou só é permitido editar.</h5>
                        <hr />
                        <h6>Editar descrição da campanha</h6>
                        <Editor
                            apiKey='8pqsp5f5ksvcylz2a52zbi5q9ivaafifrbnmf0pz94p0gnp2'
                            value={value}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'textcolor colorpicker fontfamily fontsize'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic underline | fontsize fontfamily forecolor backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | removeformat | image | help',
                                content_style: 'body { font-family:Arial,Helvetica,sans-serif; font-size:14px }'
                                ,
                                language: 'pt_BR',
                                statusbar: false,
                                ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant, " + request)),
                            }}
                            onEditorChange={textEditor}
                        />
                        <div className="col-12 my-4 d-flex justify-content-between">
                            <BtnDefault type="submit" onClick={() => { location.href = '/panel' }} bgColor='red'>Voltar</BtnDefault>
                            <BtnDefault type="submit" onClick={handleSaveDescription}>Salvar</BtnDefault>
                        </div>
                    </div>
            }
        </>
    );
}