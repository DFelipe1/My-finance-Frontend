import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input } from "../../components/Input";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Button } from "../../components/Button";
import { useLocation, useNavigate } from 'react-router-dom'
import { createeInput } from "./functions/createInput";
import { Alert } from "../../components/Alert";
import { useState, useEffect } from "react";
import { Loading } from '../../components/Loading'
import { updateInput } from "./functions/updateInput";

export function CreateInput() {

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ sucess, setSucess] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    

    
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
        data.value = Number(data.value)

        const newDate = new Date(data.date)
        const mounth = newDate.getMonth() + 1
        const year = newDate.getFullYear()
        const mounthAndYear = `${mounth}-${year}`

        data.month = mounthAndYear

        if(!location?.state?.id){
            await createeInput(setLoading, setError,setSucess, data)
        } else {
            await updateInput(setLoading, setError,setSucess, location.state.id, data)
        }
        
        setTimeout(() => {
            navigate('/inputs')

        }, 1000)
    }

    if (sucess && !error) {
        return <Alert message="Entrada salva com sucesso" styleVarient="alert-success"/>
    }
    if (error && !sucess) {
        return <Alert message="Ops não conseguimos cadastrar" styleVarient="alert-danger"/>
    }
    if (loading) {
        return <Loading/>
    }


    return (
        <>
            <h3>Nova entrada</h3>
            <form onSubmit={handleSubmit(save)}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Input 
                                label={'Name:'} 
                                placeholder="Digite o nome da entrada, ex: Salário"
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
                            <Button classStyle={'btn-secondary'} onClick={() => navigate('/inputs')} >Cancelar</Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}