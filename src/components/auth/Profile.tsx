import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePic, setProfilePic] = useState(null);

    // Handle profile picture upload and preview
    const handleProfilePicChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            //   setProfilePic(URL.createObjectURL(file));
        }
    };

    // Handle form submit
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // You can send the data to the backend here
        alert(`First Name: ${firstName}, Last Name: ${lastName}`);
        navigate("/home")
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h3 className="text-center mb-4">Set Up Your Profile</h3>

                    <Form onSubmit={handleSubmit}>
                        {/* First Name */}
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Last Name */}
                        <Form.Group controlId="lastName" className="mt-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Profile Picture Upload */}
                        <Form.Group controlId="profilePic" className="mt-4">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                            />
                            {/* Preview uploaded profile picture */}
                            {profilePic && (
                                <div className="mt-3 text-center">
                                    <img
                                        src={profilePic}
                                        alt="Profile Preview"
                                        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        {/* Save Button */}
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Save Profile
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileSetup;
