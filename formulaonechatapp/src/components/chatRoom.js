import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SendMessage from './sendMessage.js'
import MessageContainer from './messageContainer.js'
// import MessageContainer from './components/messageContainer'

const CharRoom = ({ messages, sendMessage }) => {
    return (
        <>
            <Row className='px-5 py-5'>
                <Col sm={12}>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row className='px-5 py-5'>
                <Col sm={12}>
                    <MessageContainer messages={messages} />
                </Col>

                <Col sm={12}>
                    <SendMessage sendMessage={sendMessage} />
                </Col>
            </Row>
        </>
    )
}

export default CharRoom
