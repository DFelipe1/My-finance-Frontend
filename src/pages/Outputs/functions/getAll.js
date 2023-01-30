import { Api } from '../../../service/api'

export async function getAll(setLoading, setError, setData){
    try {
        setLoading(true);
        setError(false);

        const session = JSON.parse(localStorage.getItem('session-finance-App'))

        const response = await Api.get('output/list', {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        })
        setData(response.data)
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
    }
}