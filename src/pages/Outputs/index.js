import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { convertValue } from "../../utils/convertValue";
import { ModalRemove } from "./components/modalRemove";
import { getAll } from "./functions/getAll";
import { SessionActions } from './styles'

export function Outputs() {

    const navigate = useNavigate()

    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ modalOpenDelete, setModalOpenDelete ] = useState(false)
    const [ Id, SetId ] = useState()

    useEffect(() => {
        getAll(setLoading, setError, setData)
    }, [])


    function handleModalDelete(id) {
        SetId(id)
        setModalOpenDelete(true)
    }

    async function refresh() {
        await getAll(setLoading, setError, setData)
        setModalOpenDelete(false)
    }

    if (error) {
        return <Alert message="Ops não conseguimos cadastrar" styleVarient="alert-danger"/>
    }
    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <Button classStyle="btn-primary" onClick={() => navigate('form')}>Nova saida</Button>

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
                    {
                        data.map(output => (
                            <tr key={output.id}>
                                <th scope="row">{output.id}</th>
                                <td>{output.name}</td>
                                <td>{convertValue(output.value)}</td>
                                <td>{output.date}</td>
                                <td>
                                    <SessionActions>
                                        <Button classStyle="btn-primary" onClick={() => navigate('form', { state: output })}>Editar</Button>
                                        

                                        <Button classStyle="btn-danger" onClick={() => handleModalDelete(output.id)}>Excluir</Button>
                                        <ModalRemove
                                            open={modalOpenDelete}
                                            close={() => setModalOpenDelete(false)}
                                            setError={setError}
                                            id={Id}
                                            refresh={refresh}
                                        />
                                    </SessionActions>
                                </td>
                            </tr>
                        ) )
                        
                    }
                </tbody>
            </table>
        </>
    )
}