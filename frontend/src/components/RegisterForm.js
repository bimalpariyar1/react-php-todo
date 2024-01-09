import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Col, Row, Button, Form, Spinner } from "react-bootstrap";
import InputField from "./InputField";
import { clearErrorMessage } from "../redux/actions/authActions";

const RegisterForm = ({ handleRegistration, loading, errors }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        profile_image: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
    });

    const [formErrors, setFormErros] = useState({});

    const onChange = (e) => {
        setFormValues((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.name !== "profile_image" ? e.target.value : e.target.files[0],
            };
        });

        setFormErros((prev) => {
            return {
                ...prev,
                [e.target.name]: "",
                message: "",
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        handleRegistration(formValues);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/", { replace: true });
        }

        dispatch(clearErrorMessage());
    }, [navigate, dispatch]);

    return (
        <>
            {formErrors["message"] ? <p className="text-center  text-danger">{formErrors["message"]}</p> : null}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={6} className="mb-4">
                        <InputField
                            label="First Name"
                            name="first_name"
                            type="text"
                            placehoder="Enter First Name"
                            errorText={errors["first_name"]}
                            value={formValues.first_name}
                            onChange={onChange}
                        />
                    </Col>
                    <Col lg={6} className="mb-4">
                        <InputField
                            label="Last Name"
                            name="last_name"
                            type="text"
                            placehoder="Enter Last Name"
                            errorText={errors["last_name"]}
                            value={formValues.last_name}
                            onChange={onChange}
                        />
                    </Col>
                </Row>

                <div className="mb-4">
                    <InputField
                        label="Profile Picture"
                        name="profile_image"
                        type="file"
                        errorText={errors["profile_image"]}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-4">
                    <InputField
                        label="Email address"
                        name="email"
                        type="email"
                        placehoder="Enter email"
                        errorText={errors["email"]}
                        value={formValues.email}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-4">
                    <InputField
                        label="Phone Number"
                        name="phone_number"
                        type="text"
                        placehoder="Enter Phone Number"
                        errorText={errors["phone_number"]}
                        value={formValues.phone_number}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-4">
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placehoder="Enter Password"
                        errorText={errors["password"]}
                        value={formValues.password}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-4">
                    <InputField
                        label="Confirm Password"
                        name="password_confirmation"
                        type="password"
                        placehoder="Enter Password"
                        value={formValues.password_confirmation}
                        onChange={onChange}
                    />
                </div>

                <Button className="w-100" variant="primary" type="submit">
                    {loading ? <Spinner size="sm" /> : "Register"}
                </Button>
            </Form>
        </>
    );
};

export default RegisterForm;
