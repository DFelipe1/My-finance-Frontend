import { Api } from "../../../service/api";

export async function Remove(setLoading, setError, refresh, id){
    try {
        setLoading(true);
        setError(false);

        const session = JSON.parse(localStorage.getItem('session-finance-App'))

        await Api.delete(`user/${id}`, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        })

        setLoading(false)
        setTimeout(refresh(), 500)
    } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
        setTimeout(refresh(), 500)
    }
}