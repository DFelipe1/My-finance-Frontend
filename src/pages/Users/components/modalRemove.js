import Modal from 'react-modal';
import { useState } from "react";
import { Button } from '../../../components/Button';
import { Loading } from '../../../components/Loading';
import { BodyBtn, Row, Text, Title } from './styles';
import { Remove } from '../functions/remove';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export function ModalRemove({open, close, setError, refresh, id}) {
    
    const [ loading, setLoading ] = useState(false)
    
    return (
        <Modal
            isOpen={open}
            onRequestClose={close}
            style={customStyles}
            contentLabel="Remove Modal"
        >
        {loading && <Loading/>}
        {!loading &&
            <>
            <Title>Remover Entrada</Title>
            <Text>Tem certeza que deseja remover essa entrada</Text>
            <BodyBtn>
                <Row>
                    <Button classStyle="btn-danger" onClick={() => Remove(setLoading, setError, refresh, id)}>Excluir</Button>
                    <Button classStyle="btn-secondary" onClick={close}>Fechar</Button>
                </Row>
            </BodyBtn>
            </>
        }
        </Modal>
    )
}