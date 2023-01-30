import { Api } from "../../../service/api"

export async function update(setLoading, setError, setSucess, data, id) {
    try {
        setLoading(true);
        setError(false);
        setSucess(false);

        const session = JSON.parse(localStorage.getItem('session-finance-App'))

        const response = await Api.put(`user/${id}`, data, {
            headers: {
                Authorization: `Bearer ${session.token}`
            },
        })
        setLoading(false);
        setSucess(true);
        return response
    } catch (error) {
        console.log(error)
        setLoading(true);
        setError(false);
    }
}