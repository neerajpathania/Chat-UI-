import { Button, Col, Container, Row, Spinner, Toast } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { sendOtp } from '../../services/slices/auth/register';
import toast from "react-hot-toast";

const Signup = () => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);

    const { handleSubmit } = useForm()

    const onSubmit = async () => {
        try {
            setLoading(true);
            dispatch(sendOtp({ email }))
                .unwrap()
                .then((res: any) => {
                    setLoading(false)
                    if (res.success) {
                        toast.success("OTP sent to registered email address")
                        navigate("/otp")
                    }
                })
        } catch (error) {
            setLoading(false)
            console.error("Submission Error:", error);
        }

    }
    return (
        <Container>
            <Row className="w-100 d-flex justify-content-center mt-5 align-items-center">
                <Col md={6}>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="success" />
                            <p>Sending OTP! </p>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Button variant="success" type="submit" className="w-100 mt-4">
                                Next
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>

    );
}

export default Signup;