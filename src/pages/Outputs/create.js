import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Input } from "../../components/Input";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { Alert } from "../../components/Alert";
import { createOutput } from "./functions/createOutput";
import { update } from "./functions/update";

export function Create() {
    
    const navigate = useNavigate()
    const location = useLocation()

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ sucess, setSucess] = useState(false)

    const schema = yup.object({
        name: yup.string().required('Preencha o campo nome'),
        value: yup.string().required('Preencha o campo valor'),
        date: yup.string().required('Preencha o campo data'),
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
        setValue('value', location.state.value)
        setValue('date', location.state.date)
    }

    useEffect(() => {
        if(location?.state?.id){
            setInfoInInput()
        }
    },[])

    async function save(data) {
        console.log(data)
        data.value = Number(data.value)

        const newDate = new Date(data.date)
        const mounth = newDate.getMonth() + 1
        const year = newDate.getFullYear()
        const mounthAndYear = `${mounth}-${year}`

        data.month = mounthAndYear

        if(!location?.state?.id){
            await createOutput(setLoading, setError,setSucess, data)
        } else {
            await update(setLoading, setError,setSucess, location.state.id, data)
        }

        setTimeout(() => {
            navigate('/outputs')

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
            <h3>Nova Saída</h3>
            <form onSubmit={handleSubmit(save)}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Input 
                                label={'Name:'} 
                                placeholder="Digite o nome da Saída, ex: Conta de luz"
                                {...register('name')}
                            />  
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </div>
                        <div className="col">
                            <Input 
                                label={'Valor:'} 
                                type="number" 
                                placeholder="Digite o valor, ex: 2000.00"
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
                            <Button classStyle={'btn-secondary'} onClick={() => navigate('/outputs')} >Cancelar</Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}