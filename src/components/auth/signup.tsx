import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()


    const onSubmit = () => {
        navigate("/otp")
    }
    return (
        <Container>
            <Row className="w-100 d-flex justify-content-center mt-5 align-items-center">
                <Col md={6}>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100 mt-4">
                            Next
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
}

export default Signup;