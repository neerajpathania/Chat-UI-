import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OTPInput = () => {

    const navigate = useNavigate()

    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (element: any, index: any) => {
        if (isNaN(element.value)) return;

        // Update OTP state
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus on the next input field
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate("/profile")
    };

    return (
        <Form onSubmit={handleSubmit} className='d-flex justify-content-center mt-5 align-items-center flex-column'>
            <Row className="w-100 d-flex justify-content-center mt-5 align-items-center mb-3">
                {otp.map((data, index) => (
                    <Col xs={2} md={1} key={index}>
                        <Form.Control
                            type="text"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()} // Select the content when the input gets focus
                            className="text-center"
                            style={{ fontSize: '1.5rem' }} // Increase font size for better readability
                        />
                    </Col>
                ))}
            </Row>
            <Button type="submit" variant="success" className="otpButton">Submit OTP</Button>
        </Form>
    );
};

export default OTPInput;
