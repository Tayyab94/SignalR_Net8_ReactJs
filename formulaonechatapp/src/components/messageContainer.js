import React from 'react'
import { Table } from 'react-bootstrap'
const MessageContainer = ({ messages }) => {
    return (
        <div>
            {
                messages && messages.map((msg, index) => {
                    return <Table striped bordered>
                        <tr key={index}>
                            <td>
                                {msg.msg} - {msg.username}
                            </td>
                        </tr>
                    </Table>
                })
            }
        </div>
    )
}


export default MessageContainer
