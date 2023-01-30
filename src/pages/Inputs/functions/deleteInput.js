import { Api } from '../../../service/api'

export  async function deleteInput(setLoading, setError, refresh, itemId) {
    setLoading(true);

    const session = JSON.parse(localStorage.getItem('session-finance-App'))

    try {
        await Api.delete(`input/${itemId}`,{
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
        })
        setLoading(false)
        refresh()
    }catch(e) {
        setLoading(false)
        setError(true)
    }
}