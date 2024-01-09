import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/actions/authActions";

const UserProfile = ({ userDetails, handleCanvasShow }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.authReducer);

    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex">
                <div className="profile-img me-4">
                    <img src={process.env.REACT_APP_API_URL + "/" + userDetails.profile_image_path} alt="" />
                </div>
                <div>
                    <h4>
                        {userDetails.first_name} {userDetails.last_name}
                    </h4>
                    <p>
                        <span>{userDetails.email}</span>
                        <span className="ms-4">{userDetails.phone_number}</span>
                    </p>
                    <span className="action-text-btn text-warning" onClick={handleCanvasShow}>
                        Edit
                    </span>
                </div>
            </div>
            <div>
                <Button
                    onClick={() => {
                        dispatch(logout()).then((response) => {
                            if (response.status === 200) {
                                navigate("/auth/login");
                            }
                        });
                    }}>
                    {loading ? (
                        <>
                            <Spinner size="sm" /> Logout
                        </>
                    ) : (
                        "Logout"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default UserProfile;
