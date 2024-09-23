import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

// Sample chat data
const users = [
    { id: 1, name: 'John Doe', messages: ['Hello!', 'How are you?'] },
    { id: 2, name: 'Jane Smith', messages: ['Hi!', 'Can we meet tomorrow?'] },
    { id: 3, name: 'Bob Johnson', messages: ['Good morning!', 'Are you available?'] },
];

const ChatScreen = () => {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState(users);

    // Handle selecting a user from the sidebar
    const handleUserSelect = (user: any) => {
        setSelectedUser(user);
    };

    // Handle sending a message
    const handleSendMessage = () => {
        if (message.trim() && selectedUser) {
            // Update chat data with the new message
            const updatedChats = chats.map(user =>
                user.id === selectedUser.id
                    ? { ...user, messages: [...user.messages, message] }
                    : user
            );
            setChats(updatedChats);
            setMessage(""); // Clear input field
        }
    };

    return (
        <Container fluid className="main-container p-0">
            <Row className="no-gutters h-100">
                {/* Sidebar - Users List */}
                <Col Col md={4} lg={3} className="p-3 bg-light border-end">
                    <h5>Chats</h5>
                    <ListGroup>
                        {chats.map(user => (
                            <ListGroup.Item
                                key={user.id}
                                action
                                onClick={() => handleUserSelect(user)}
                                active={selectedUser?.id === user.id}
                            >
                                {user.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                {/* Chat Area */}
                <Col md={8} lg={9} className="d-flex flex-column p-3 border-end">
                    {selectedUser ? (
                        <>
                            <h5>{selectedUser.profilePic}{selectedUser.name}</h5>
                            <div className="chat-box p-3 border rounded" style={{ height: '400px', overflowY: 'scroll' }}>
                                {selectedUser.messages.map((msg: any, index: any) => (
                                    <div key={index} className="mb-2">
                                        <strong>{selectedUser.name}:</strong> {msg}
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <Form className="mt-3" onSubmit={(e) => e.preventDefault()}>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Type your message..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button variant="primary" onClick={handleSendMessage}>
                                            Send
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    ) : (
                        <div className="text-center mt-5">
                            <h6>Select a user to start chatting</h6>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ChatScreen;
