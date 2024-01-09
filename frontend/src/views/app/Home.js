import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { Card, Alert, Form } from "react-bootstrap";
import UserProfile from "components/UserProfile";
import EditProfile from "components/EditProfile";

import { editUser } from "../../redux/actions/userActions";
import Categories from "components/Categories";

const todoType = {
    completed: "success",
    pending: "info",
    trashed: "primary",
};

const Home = () => {
    const dispatch = useDispatch();

    const [showCanvas, setShowCanvas] = useState(false);
    const [darkMode, setDarkMode] = useState("on");

    const handleCanvasShow = (mode) => {
        setShowCanvas(!showCanvas);
    };

    const userDetails = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

    const handleDarkMode = (e) => {
        const mode = e.target.checked;
        localStorage.setItem("darkmode", mode ? "ON" : "OFF");
        document.body.setAttribute("data-bs-theme", mode ? "dark" : "");

        setDarkMode(mode ? "ON" : "OFF");
    };

    const handleProfileEdit = (formValues) => {
        dispatch(editUser(formValues)).then((response) => {
            if (response.status === 201) {
                handleCanvasShow();
            }
        });
    };

    useEffect(() => {
        const mode = localStorage.getItem("darkmode");

        if (!mode) {
            setDarkMode("ON");
        } else {
            setDarkMode(mode);
        }
    }, [darkMode]);

    return (
        <>
            <Card className="my-4">
                <Card.Body>
                    <UserProfile userDetails={userDetails} handleCanvasShow={handleCanvasShow} />
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>Dark Mode</div>
                        <div>
                            <Form.Check type="switch" checked={darkMode === "ON"} onChange={handleDarkMode} />
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                        Overview of your todos
                        <Link className="btn btn-primary ms-4" to="/todos">
                            View all Todos
                        </Link>
                    </div>
                </Card.Body>
            </Card>

            <Categories />

            <EditProfile
                show={showCanvas}
                onHide={handleCanvasShow}
                userDetails={userDetails}
                handleProfileEdit={handleProfileEdit}
            />
        </>
    );
};

export default Home;
