import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { Button, Form, Spinner } from "react-bootstrap";
import InputField from "./InputField";

import { clearErrorMessage } from "../redux/actions/authActions";

const LoginForm = ({ handleLogin, loading, errors }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setFormValues((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });

        dispatch(clearErrorMessage());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(formValues);
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
            {errors["message"] ? <p className="text-center  text-danger">{errors["message"]}</p> : null}
            <Form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placehoder="Enter Email"
                        errorText={errors["email"]}
                        value={formValues.email}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-4">
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placehoder="Password"
                        errorText={errors["password"]}
                        value={formValues.password}
                        onChange={onChange}
                    />
                </div>
                <Button className="w-100" variant="primary" type="submit">
                    {loading ? <Spinner size="sm" /> : "Login"}
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;
