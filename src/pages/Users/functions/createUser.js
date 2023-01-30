import { Api } from "../../../service/api";

export async function createUser(setLoading, setError, setSucess, data) {
    try {
        setLoading(true);
        setSucess(false);
        setError(false);

        const session = JSON.parse(localStorage.getItem('session-finance-App'))
        console.log(data)

        const response = await Api.post(`user`, data,{
            headers: {
                Authorization: `Bearer ${session.token}`
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.email,
                status: data.status
            }
        })
        setLoading(false);
        setSucess(true);
        return response
    } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
    }
}