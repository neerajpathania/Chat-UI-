import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/slices/auth/register';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const ProfileSetup = () => {
    const navigate = useNavigate()
    const dispatch: any = useDispatch()

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { handleSubmit } = useForm()

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file)); // Preview the image
        }
    };

    const onSubmit = () => {
        const payload = {
            firstname: firstName,
            lastname: lastName,
            profilePic
        }
        try {
            setLoading(true);

            dispatch(registerUser(payload))
                .unwrap()
                .then((res: any) => {
                    if (res.success) {
                        setLoading(false); // Set loading false after fetching
                        toast.success("Account Created Sucessfully")
                        navigate("/home")
                    }
                })
        } catch (error) {
            console.error("Submission Error:", error);
        }

    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h3 className="text-center mb-4 profileHead">Set Up Your Profile</h3>

                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="success" />
                            <p>Setting up your profile...</p>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit(onSubmit)}>
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
                                    id="customFileInput"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                {/* Preview uploaded profile picture */}
                                {preview && (
                                    <div className="mt-3 text-center positionProfilePic">
                                        <img
                                            src={preview}
                                            alt="Profile Preview"
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                )}

                            </Form.Group>

                            {/* Save Button */}
                            <Button variant="primary" type="submit" className="mt-4 w-100">
                                Save Profile
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileSetup;
