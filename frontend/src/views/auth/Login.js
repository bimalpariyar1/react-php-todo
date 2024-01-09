import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import LoginForm from "components/LoginForm";
import { userLogin } from "../../redux/actions/authActions";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, errors } = useSelector((state) => state.authReducer);

    const handleLogin = (formData) => {
        dispatch(userLogin(formData)).then((response) => {
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
                        <div className="display-5 fw-bold mb-2">Login</div>
                        <h4>Welcome back, Login to your account!!.</h4>
                    </div>
                    <LoginForm loading={loading} errors={errors} handleLogin={handleLogin} />
                </Card.Body>
            </Card>
            <div className="text-center mt-3">
                <p>
                    Don't have an account? <Link to="/auth/register">Register now</Link>
                </p>
            </div>
        </>
    );
};

export default Login;
