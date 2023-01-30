import { Animation, Body, Content } from './styles'

export function Alert({ message, styleVarient}){
    return (
        <Body>
            <Content className={`alert ${styleVarient}`} rules="alert">
                {message}
            
                <Animation/>

            </Content>

            
        </Body>
    )
}