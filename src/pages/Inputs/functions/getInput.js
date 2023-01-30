import { Api } from "../../../service/api";
import { validateToken } from "./validateToken";

export  async function getInput(setLoading, setData, setError, inputId) {
    setLoading(true);

    const session = JSON.parse(localStorage.getItem('session-finance-App'))

    const {id} = await validateToken(session.token)

    try {
        const response = await Api.get(`input/${id}/${inputId}`,{
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
        })
        setLoading(false)
        return response?.data
    }catch(e) {
        setLoading(false)
        setError(true)
    }
}