import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { Alert } from "../../components/Alert";
import { getInputs } from "./functions/getInputs";
import { SessionActions } from "./styles";
import { ModalRemove } from "./components/modalRemove";
import { useNavigate } from "react-router-dom";
import { convertValue } from "../../utils/convertValue";


export function Inputs() {

    const navigate = useNavigate()


    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState([])
    const [ error, setError ] = useState(false)
    const [ Id, setId ] = useState(null)

    const [ modalOpenDelete, setIsOpenDelete ] = useState(false);
  
    
    useEffect(() => {
        getInputs(setLoading, setData, setError)
    }, [])


    function handleModalDelete(id) {
        setId(id)
        setIsOpenDelete(true);
    }
    
    
    function refresh() {
        getInputs(setLoading, setData, setError)
        setIsOpenDelete(false);
    }

    if(error) {
        return <Alert message="Ops ocorreu um erro" styleVarient="alert-danger"/>
    }
    
    return (
        <>
            <Button classStyle="btn-primary" onClick={() => navigate('/inputs/form')}>Nova entrada</Button>

            {loading && <Loading/>}
            {!loading && 
                <table className="table" style={{ marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(input => {
                        
                            return (
                                <tr key={input.id}>
                                    <th scope="row">{input.id}</th>
                                    <td>{input.name}</td>
                                    <td>{convertValue(input.value)}</td>
                                    <td>{input.date}</td>
                                    <td>
                                        <SessionActions>
                                            <Button classStyle="btn-primary" onClick={() => navigate('/inputs/form', {state: input})}>Editar</Button>
                                            

                                            <Button classStyle="btn-danger" onClick={() => handleModalDelete(input.id)}>Excluir</Button>
                                            <ModalRemove
                                                open={modalOpenDelete}
                                                close={() => setIsOpenDelete(false)}
                                                setError={setError}
                                                id={Id}
                                                refresh={refresh}
                                            />
                                        </SessionActions>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                
            }   
            
        </>
    )
}