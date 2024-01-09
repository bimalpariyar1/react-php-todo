import React, { useState } from "react";
import { Form, Button, Offcanvas, Spinner } from "react-bootstrap";
import InputField from "./InputField";

import { useSelector } from "react-redux";

const EditProfile = ({ show, onHide, userDetails, handleProfileEdit }) => {
    const hiddenInput = React.useRef(null);
    const [base64, setBase64] = useState(process.env.REACT_APP_API_URL + "/" + userDetails?.profile_image_path);

    const { loading, errors } = useSelector((state) => state.userReducer);

    const user = {
        first_name: userDetails?.first_name,
        last_name: userDetails?.last_name,
        email: userDetails?.email,
        profile_image: userDetails?.profile_image_path,
        phone_number: userDetails?.phone_number,
    };

    const [formValues, setFormValues] = useState({
        ...user,
    });

    const onChange = (e) => {
        if (e.target.name === "profile_image") {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setBase64(reader.result);
            };
        }

        setFormValues((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.name !== "profile_image" ? e.target.value : e.target.files[0],
            };
        });
    };

    const formSubmit = (e) => {
        e.preventDefault();

        handleProfileEdit(formValues);
    };

    const handleChangeImage = () => {
        hiddenInput.current.click();
    };

    const handleCanvasHide = () => {
        onHide();
        setFormValues(() => {
            return {
                ...user,
            };
        });
    };

    return (
        <Offcanvas show={show} onHide={handleCanvasHide} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Profile</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div>
                    <div className="mb-4">
                        <img className="mb-4 img-fluid" src={base64} alt="" />
                        <Button onClick={handleChangeImage} className="w-100">
                            Change Image
                        </Button>
                        <input
                            ref={hiddenInput}
                            className="d-none"
                            type="file"
                            name="profile_image"
                            onChange={onChange}
                        />
                    </div>

                    <Form onSubmit={formSubmit}>
                        <InputField
                            label="First Name"
                            name="first_name"
                            type="text"
                            placehoder="Enter First Name"
                            errorText={errors["first_name"]}
                            value={formValues.first_name}
                            onChange={onChange}
                        />
                        <InputField
                            label="Last Name"
                            name="last_name"
                            type="text"
                            placehoder="Enter Last Name"
                            errorText={errors["last_name"]}
                            value={formValues.last_name}
                            onChange={onChange}
                        />
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            placehoder="Enter Email"
                            errorText={errors["email"]}
                            value={formValues.email}
                            onChange={onChange}
                        />
                        <InputField
                            label="Phone Number"
                            name="phone_number"
                            type="text"
                            placehoder="Enter Phone Number"
                            errorText={errors["phone_number"]}
                            value={formValues.phone_number}
                            onChange={onChange}
                        />

                        <Button className="w-100" variant="primary" type="submit">
                            {loading ? <Spinner size="sm" /> : "Save"}
                        </Button>
                    </Form>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default EditProfile;
