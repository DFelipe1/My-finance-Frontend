import { Api } from "../../../service/api";

export async function createOutput(setLoading, setError, setSucess, data) {
   try {
    setLoading(true);
    setError(false);
    setSucess(false);

    const session = JSON.parse(localStorage.getItem('session-finance-App'))

    const {name, month, value, date} = data

    const response = await Api.post('output', data,{
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
    return response;
   } catch (error) {
    console.log(error);
    setLoading(false);
    setError(true);
   }
} 