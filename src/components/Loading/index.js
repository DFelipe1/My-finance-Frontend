import ReactLoading from 'react-loading';

import { Body } from './style'

export function Loading() {
    return (
        <Body>
            <ReactLoading type='spin' color="#0d6efd"/>
        </Body>
    )
}