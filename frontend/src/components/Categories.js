import { useEffect, useState } from "react";
import { Form, Button, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./InputField";

import { fetchCategories, addCategory, editCategory, deleteCategory } from "../redux/actions/categoryActions";

const Categories = () => {
    const dispatch = useDispatch();

    const { loading, categories, errors } = useSelector((state) => state.categoryReducer);

    const [categoryName, setCategoryName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({});
    const [mode, setMode] = useState("ADD");

    function handleChange(e) {
        if (e.target.value.length < 1) {
            setMode("ADD");
        }
        setCategoryName(e.target.value);
    }

    const handleSumbit = (e) => {
        e.preventDefault();

        if (mode === "ADD") {
            dispatch(
                addCategory({
                    formValues: {
                        name: categoryName,
                    },
                    type: mode,
                })
            ).then((response) => {
                if (response?.status === 201) {
                    setCategoryName("");
                }
            });
        } else if (mode === "EDIT") {
            dispatch(
                editCategory({
                    formValues: {
                        ...selectedCategory,
                        name: categoryName,
                    },
                    type: mode,
                })
            ).then((response) => {
                if (response?.status === 201 || response?.status === 200) {
                    setCategoryName("");
                    setSelectedCategory({});
                    setMode("ADD");
                }
            });
        }
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <>
            <div className="mb-2">Categories</div>
            <div>
                <Form onSubmit={handleSumbit}>
                    <div className="mb-4">
                        <InputField
                            name="name"
                            type="text"
                            placehoder="Enter Category Name"
                            errorText={errors["name"]}
                            value={categoryName}
                            onChange={handleChange}
                        />
                    </div>
                    <Button className="w-100" variant="primary" type="submit">
                        {loading.type === "ADD" || loading.type === "EDIT" ? <Spinner size="sm" /> : ""}
                        {mode === "EDIT" ? "Save Category" : "Add Category"}
                    </Button>
                </Form>
            </div>
            <ListGroup variant="flush">
                {categories.length > 0 &&
                    categories.map((category) => (
                        <ListGroup.Item key={category.id}>
                            <div className="d-flex align-items-center justify-content-between">
                                <span>{category.name}</span>

                                <div>
                                    <span
                                        className="me-3 text-warning action-text-btn"
                                        onClick={() => {
                                            setMode("EDIT");
                                            setSelectedCategory(category);
                                            setCategoryName(category.name);
                                        }}>
                                        Edit
                                    </span>
                                    <span
                                        className="text-danger action-text-btn"
                                        onClick={() => {
                                            setMode("DELETE");
                                            dispatch(
                                                deleteCategory({
                                                    category,
                                                    mode,
                                                })
                                            ).then(() => setMode("ADD"));
                                        }}>
                                        Delete
                                    </span>
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
            </ListGroup>{" "}
        </>
    );
};

export default Categories;
