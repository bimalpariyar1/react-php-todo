import React, { useState, useRef } from "react";
import { Button, Form, Offcanvas, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { clearErrors } from "../redux/actions/todoActions";

import InputField from "./InputField";

const measurements = ["excitment", "difficulty"];

const levels = [
    {
        label: "High",
        value: "H",
    },
    {
        label: "Medium",
        value: "M",
    },
    {
        label: "Low",
        value: "L",
    },
];

const AddTodoForm = ({ show, onHide, mode, handleAddTodo, categories, toEditTodo }) => {
    const dispatch = useDispatch();
    const imageUpload = useRef(null);

    const { loading, errors } = useSelector((state) => state.todoReducer);

    const [imagePath, setImagePath] = useState("");
    const [formValues, setFormValues] = useState({
        title: "",
        category_id: "",
        excitment: "",
        difficulty: "",
        description: "",
        thumbnail: "",
    });

    const onInputChange = (e) => {
        setFormValues((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.name !== "thumbnail" ? e.target.value : e.target.files[0],
            };
        });

        if (e.target.name === "thumbnail") {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setImagePath(reader.result);
            };
        }
    };

    const onUploadClicked = () => {
        imageUpload.current.click();
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        handleAddTodo({
            id: toEditTodo.id,
            formValues,
        });
    };

    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            placement="end"
            onExit={() => {
                setFormValues({
                    title: "",
                    category_id: "",
                    excitment: "",
                    difficulty: "",
                    description: "",
                    thumbnail: "",
                });

                setImagePath("");
                dispatch(clearErrors());
            }}
            onEntered={() => {
                if (mode === "EDIT") {
                    setFormValues({
                        title: toEditTodo.title,
                        category_id: toEditTodo.category_id,
                        excitment: toEditTodo.excitment,
                        difficulty: toEditTodo.difficulty,
                        description: toEditTodo.description,
                    });

                    setImagePath(process.env.REACT_APP_API_URL + "/" + toEditTodo.thumbnail);
                }
            }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title> Todo </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div>
                    <div className="mb-4">
                        {imagePath ? <img className="img-fluid" src={imagePath} alt="" /> : null}
                        {errors["thumbnail"] && formValues.thumbnail === "" ? (
                            <div className="text-danger">{errors["thumbnail"]}</div>
                        ) : null}
                        <div className="mt-2">
                            <input
                                style={{ display: "none" }}
                                type="file"
                                name="thumbnail"
                                onChange={onInputChange}
                                ref={imageUpload}
                            />

                            <Button className="w-100" onClick={onUploadClicked}>
                                {mode === "ADD" ? "Upload" : "Change"} Image
                            </Button>
                        </div>
                    </div>
                    <Form onSubmit={onFormSubmit}>
                        <div className="mb-4">
                            <InputField
                                label="Todo Title"
                                name="title"
                                type="text"
                                placehoder="Enter Todo Title"
                                errorText={errors["title"]}
                                onChange={onInputChange}
                                value={formValues.title}
                            />
                        </div>

                        <Form.Group className={`mb-3 ${errors["category_id"] ? "has-validation" : ""}`}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category_id"
                                value={formValues.category_id}
                                onChange={onInputChange}
                                className={`${
                                    errors["category_id"] && formValues.category_id === "" ? "is-invalid" : ""
                                }`}>
                                <option>Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors["category_id"]}</Form.Control.Feedback>
                        </Form.Group>

                        {measurements.map((measurement, idx) => (
                            <div
                                key={idx}
                                className={`mb-4 ${
                                    errors[measurement] && formValues[measurement] === "" ? "has-validation" : ""
                                }`}>
                                <Form.Label className="text-capitalize">{measurement}</Form.Label>
                                <div
                                    className={`btn-group w-100 ${
                                        errors[measurement] && formValues[measurement] === "" ? "is-invalid" : ""
                                    }`}
                                    role="group">
                                    {levels.map((level, index) => (
                                        <React.Fragment key={index}>
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name={measurement}
                                                id={`${measurement}-${index + 1}`}
                                                autoComplete="off"
                                                value={level.value}
                                                onChange={onInputChange}
                                                checked={formValues[measurement] === level.value}
                                            />
                                            <label
                                                className="btn btn-outline-primary"
                                                htmlFor={`${measurement}-${index + 1}`}>
                                                {level.label}
                                            </label>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="invalid-feedback">{errors[measurement]}</div>
                            </div>
                        ))}

                        <div className="mb-4">
                            <InputField
                                label="Description"
                                name="description"
                                as="textarea"
                                placehoder="Description"
                                errorText={errors["description"]}
                                onChange={onInputChange}
                                value={formValues.description}
                            />
                        </div>

                        <Button className="w-100" variant="primary" type="submit">
                            {loading && <Spinner size="sm" />}
                            {mode === "EDIT" ? "Save Todo" : "Add Todo"}
                        </Button>
                    </Form>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default AddTodoForm;
