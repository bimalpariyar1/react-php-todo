import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import RegisterForm from "components/RegisterForm";

import { userRegistration } from "../../redux/actions/authActions";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, errors } = useSelector((state) => state.authReducer);

    const handleRegistration = (formData) => {
        dispatch(userRegistration(formData)).then((response) => {
            if (response?.user) {
                navigate("/");
            }
        });
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <div className="text-center mb-3">
                        <div className="display-5 fw-bold mb-2">Register</div>
                        <h4>Create an account, to continue!!.</h4>
                    </div>
                    <RegisterForm loading={loading} errors={errors} handleRegistration={handleRegistration} />
                </Card.Body>
            </Card>
            <div className="text-center mt-3">
                <p>
                    Already have an account? <Link to="/auth/login">Login now</Link>
                </p>
            </div>
        </>
    );
};

export default Register;
