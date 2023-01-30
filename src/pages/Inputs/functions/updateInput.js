import { Api } from '../../../service/api'

export async function updateInput(setLoading, setError, setSucess, id, data) {
    
    setLoading(true);
    setSucess(false)
    const session = JSON.parse(localStorage.getItem('session-finance-App'))

    const {name, month, value, date} = data
   
    try {
        await Api.put(`input/${id}`, data,{
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
    }catch(e) {
        setLoading(false)
        setError(true)
    }
}
