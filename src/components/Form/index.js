import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input } from "../../components/Input";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Button } from "../../components/Button";
import { useNavigate } from 'react-router-dom'
import { createeInput } from "./funtions/createInput";
import { Alert } from "../../components/Alert";
import { useState } from "react";
import { Loading } from '../../components/Loading'

export function CreateInput(props) {

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ sucess, setSucess] = useState(false)

    const navigate = useNavigate()

    const schema = yup.object({
        name: yup.string().required('Preencha o campo nome'),
        value: yup.string().required('Preencha o campo valor'),
        date: yup.string().required('Preencha o campo data'),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    async function save(data) {
        data.value = Number(data.value)

        const newDate = new Date(data.date)
        const mounth = newDate.getMonth() + 1
        const year = newDate.getFullYear()
        const mounthAndYear = `${mounth}-${year}`

        data.month = mounthAndYear

        await props.action(setLoading, setError,setSucess, data)
        setTimeout(() => {
            navigate(`/${props.goback}`)

        }, 1000)
    }

    if (sucess && !error) {
        return <Alert message="sucesso!!" styleVarient="alert-success"/>
    }
    if (error && !sucess) {
        return <Alert message="Ops Ocorreu um erro " styleVarient="alert-danger"/>
    }
    if (loading) {
        return <Loading/>
    }


    return (
        <>
            <h3>{props.title}</h3>
            <form onSubmit={handleSubmit(save)}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Input 
                                label={'Name:'} 
                                placeholder={props.placeholderName}
                                {...register('name')}
                            />  
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </div>
                        <div className="col">
                            <Input 
                                label={'Valor:'} 
                                type="number" 
                                placeholder={props.placeholderValor}
                                {...register('value')}
                            />
                            {errors.value && <ErrorMessage>{errors.value.message}</ErrorMessage>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <Input 
                                label={'Data:'} 
                                type='date'
                                {...register('date')}
                            />
                            {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '16px' }}>
                        <div className="col-lg-1">
                            <Button classStyle={'btn-primary'}>Enviar</Button>
                        </div>
                        <div className="col-lg-1">
                            <Button classStyle={'btn-secondary'} onClick={() => navigate(`/${props.goback}`)} >Cancelar</Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}