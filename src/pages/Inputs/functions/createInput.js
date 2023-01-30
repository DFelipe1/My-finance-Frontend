import { Api } from '../../../service/api'

export async function createeInput(setLoading, setError, setSucess, data) {

    setLoading(true);
    setSucess(false);
    const session = JSON.parse(localStorage.getItem('session-finance-App'))

    const {name, month, value, date} = data
   
    try {
        const response = await Api.post(`input/`, data,{
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
        setLoading(false);
        setSucess(true);
        return response
    }catch(e) {
        setLoading(false)
        setError(true)
    }
}