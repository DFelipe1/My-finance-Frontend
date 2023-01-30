import { Api } from '../../../service/api'

export  async function getInputs(setLoading, setData, setError) {
    setLoading(true);

    const session = JSON.parse(localStorage.getItem('session-finance-App'))

    try {
        const response = await Api.get(`input/list`,{
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
        })
        setData(response?.data)
        setLoading(false)
    }catch(e) {
        setLoading(false)
        setError(true)
    }
}