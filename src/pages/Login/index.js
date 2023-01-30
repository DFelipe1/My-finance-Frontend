import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Api } from '../../service/api'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Main, Body, Title, Space, Text, LinkStyle } from './styles'
import { Alert } from '../../components/Alert'
import { Loading } from '../../components/Loading'



export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    async function requestLogin(e){
        e.preventDefault();
        setLoading(true);
        try {
            const data = {email, password}
            const response = await Api.post("/login", data)
            if(response?.data?.token){
                Api.defaults.headers.Authorization = `Bearer ${response.data.token}`

                const object = {
                    logged: true,
                    token: response.data.token
                }

                localStorage.setItem("session-finance-App", JSON.stringify(object))
                navigate("/dashboard")
                return
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setAlert(true);
            setTimeout(() => setAlert(false), 3000)
        }
    }

    return (
        <Main>
            <Body>
                <Title>Login</Title>

                {!loading ? (
                    <form onSubmit={requestLogin}>
                        <Input label="Email" type="email" placeholder="jhondoe@exemplo.com" onChange={ e => setEmail(e.target.value) }/>
                        <Space />
                        <Input label="Senha" type="password" placeholder="******" onChange={ e => setPassword(e.target.value)}/>
                        <Space />

                        <div className="d-grid gap-2">
                            <Button type="submit" classStyle="btn-primary">Enviar</Button>
                            <LinkStyle>
                                <Text>ainda não possui sua conta?</Text>
                                <Button asChild type="button" classStyle="btn-link">
                                    <Link to="/register">crie uma conta</Link>
                                </Button>
                            </LinkStyle>
                        </div>

                    </form>
                ) : (
                    <Loading/>
                )}

                
            </Body>

            {alert && (
                <Alert message="Email e/ou senha incorretos" styleVarient="alert-danger"/>
            )}
        </Main>
    )
}