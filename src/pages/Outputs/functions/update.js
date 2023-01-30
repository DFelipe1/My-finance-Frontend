import { Api } from "../../../service/api"

export async function update(setLoading, setError, setSucess, id, data) {
    try {
        setLoading(true)
        setError(false)
        setSucess(false)

        const { name, value, date, month } = data
        console.log(data)
        const session = JSON.parse(localStorage.getItem('session-finance-App'))

        await Api.put(`output/${id}`, data,{
            headers: {
                Authorization: `Bearer ${session.token}`
            },
            data: {
                name: name,
                value: value,
                date: date,
                month: month,
            }
        })
        setLoading(false)
        setSucess(true)
    } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
    }
}