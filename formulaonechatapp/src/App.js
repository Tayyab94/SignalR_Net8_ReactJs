
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import WaitingRoom from './components/waitingroom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import CharRoom from './components/chatRoom';

function App() {

  const [conn, setConnection] = useState();
  const [message, setMessage] = useState([]);

  const joinChatRoom = async (username, chatroom) => {

    try {
      const conn = new HubConnectionBuilder()
        .withUrl('https://localhost:7079/Chat')
        .configureLogging(LogLevel.Information).build();

      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("Message ", msg);
      })


      conn.on("ReceivedSpecificMessage", (username, msg) => {
        console.log("User Name :" + username + " Message is " + msg);
        setMessage(message => [...message, { username, msg }])
      })

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });

      setConnection(conn);
    } catch (error) {

    }
  }


  const sendMessage = async (msg) => {
    try {
      await conn.invoke("SendMessage", msg);


      conn.on("ReceivedSpecificMessage", (username, msg) => {

        console.log("msg :" + msg + " User Name " + username)
        setMessage(message => [...message, { username, msg }]);

      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm="12">
              welcome to F1 section
            </Col>
          </Row>
          {
            !conn ? <WaitingRoom joinChatRoom={joinChatRoom} /> : <CharRoom messages={message} sendMessage={sendMessage} />
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
