import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';

const SendMessage = ({ sendMessage }) => {
    const [msg, setMsg] = useState('');


    return (
        <>
            <Form onSubmit={s => {
                s.preventDefault();
                sendMessage(msg);
                setMsg('');
            }}>
                <InputGroup className='mb-3'>
                    <InputGroup.Text>Chat</InputGroup.Text>
                    <Form.Control onChange={s => setMsg(s.target.value)} value={msg} placeholder='Type Message' ></Form.Control>
                    <Button variant='primary' type='submit' disabled={!msg}>Send</Button>
                </InputGroup>
            </Form>
        </>
    )
}

export default SendMessage
