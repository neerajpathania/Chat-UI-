import React, { useState } from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../../services/slices/auth/register';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const OTPInput = () => {

    const navigate = useNavigate()
    const dispatch: any = useDispatch()


    const [otp, setOtp] = useState((""));
    const [loading, setLoading] = useState(false);

    const { handleSubmit } = useForm()

    const onSubmit = () => {
        try {
            setLoading(true);
            dispatch(verifyOtp({ otp }))
                .unwrap()
                .then((res: any) => {
                    setLoading(false)
                    if (res.success) {
                        toast.success("Otp verified Successfully")
                        navigate("/profile")
                    }
                })
        } catch (error) {
            setLoading(false)
            console.error("Submission Error:", error);
        }

    };

    return (
        <div>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="success" />
                    <p>Verifying OTP!</p>
                </div>
            ) : (
                <Form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-center mt-5 align-items-center flex-column'>
                    <Row className="w-100 d-flex justify-content-center mt-5 align-items-center mb-3">
                        <Col md={5}>
                            <Form.Control
                                type="text"
                                value={otp}
                                onChange={(e: any) => setOtp(e.target.value)}
                                className="text-center"
                                style={{ fontSize: '1.5rem' }} // Increase font size for better readability
                            />
                        </Col>
                    </Row>
                    <Button type="submit" variant="success" className="otpButton">Submit OTP</Button>
                </Form>
            )}
        </div>

    )
};

export default OTPInput;
