import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';

const WaitingRoom = ({ joinChatRoom }) => {
    const [userName, setUserName] = useState('');
    const [chatroom, setChatroom] = useState('');
    return (
        <div>
            <Form onSubmit={s => {
                s.preventDefault();

                joinChatRoom(userName, chatroom)
            }}>
                <Row className='px-5 py-5'>
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Control placeholder='userName' onChange={s => setUserName(s.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control placeholder='chatroom' onChange={s => setChatroom(s.target.value)} />
                        </Form.Group>
                    </Col>

                    <Col sm={12}>
                        <Button variant='success' type='submit'>Join Now</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default WaitingRoom
