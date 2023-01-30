import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { Alert } from "../../components/Alert";
import { createUser } from "./functions/createUser";
import { update } from "./functions/update";

export function CreateForm() {

    const navigate = useNavigate()
    const location = useLocation()

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ sucess, setSucess] = useState(false)

    const schema = yup.object({
        name: yup.string().required('Preencha o campo nome'),
        email: yup.string().required('Preencha o campo valor'),
        password: yup.string().required('Preencha o campo data'),
    })

    const { 
        register, 
        handleSubmit, 
        setValue,
        formState: { errors } 
    } = useForm({
        resolver: yupResolver(schema)
    })

    function setInfoInInput() {
        setValue('name', location.state.name)
        setValue('email', location.state.email)
        setValue('password', location.state.password)
    }

    useEffect(() => {
        if(location?.state?.id){
            setInfoInInput()
        }
    },[])

    async function save(data) {
        console.log(data)

        data.status = true

        if(!location?.state?.id){
            await createUser(setLoading, setError, setSucess, data)
        } else {
            await update(setLoading, setError, setSucess, data, location.state.id)
        }

        setTimeout(() => {
            navigate('/users')

        }, 1000)
    }

    if (sucess && !error) {
        return <Alert message="Saída salva com sucesso" styleVarient="alert-success"/>
    }
    if (error && !sucess) {
        return <Alert message="Ops não conseguimos cadastrar" styleVarient="alert-danger"/>
    }
    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <h3>Nova Usuário</h3>
            <form onSubmit={handleSubmit(save)}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Input 
                                label={'Name:'} 
                                placeholder="Digite seu nome"
                                {...register('name')}
                            />  
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </div>
                        <div className="col">
                            <Input 
                                label={'Email:'} 
                                type="email"
                                placeholder="jhonny@example.com"
                                {...register('email')}
                            />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <Input 
                                label={ location?.state?.id ? 'Coloque sua senha:' :  'Senha:'} 
                                type='password'
                                {...register('password')}
                                placeholder="******"
                            />
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '16px' }}>
                        <div className="col-lg-1">
                            <Button classStyle={'btn-primary'}>Enviar</Button>
                        </div>
                        <div className="col-lg-1">
                            <Button classStyle={'btn-secondary'} onClick={() => navigate('/users')} >Cancelar</Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}