import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Card, Button, Form, Badge, Modal } from "react-bootstrap";
import AddTodoForm from "components/AddTodoForm";

import { fetchCategories } from "../../redux/actions/categoryActions";
import { fetchTodos, addTodo, markAsDone, editTodo, deleteTodo } from "../../redux/actions/todoActions";

const CONSTANTS = {
    ADD: "ADD",
    EDIT: "EDIT",
    OPEN: "OPEN",
};

const MEASUREMENT = {
    H: {
        label: "High",
        bg: "success",
    },
    M: {
        label: "Medium",
        bg: "warning",
    },
    L: {
        label: "Low",
        bg: "danger",
    },
};

const Todo = ({ todo, handleEdit, handleDelete }) => {
    const dispatch = useDispatch();

    const [done, setDone] = useState(todo.done > 0);

    const onCheckChange = (e) => {
        setDone(!done);

        dispatch(
            markAsDone({
                id: todo.id,
                formValues: {
                    ...todo,
                    done: e.target.checked,
                },
            })
        );
    };

    return (
        <div className="border rounded d-flex p-2 mb-4 todo-item">
            <div className="todo-thumb">
                <img src={process.env.REACT_APP_API_URL + "/" + todo.thumbnail} alt="" />
            </div>

            <div className="ms-4 flex-grow-1">
                <div className="d-flex justify-content-between">
                    <div>
                        <span className="text-primary">{todo.category}</span>
                    </div>
                </div>
                <h5>
                    <strong className={done ? "text-decoration-line-through" : ""}>{todo.title}</strong>
                </h5>
                <p className={done ? "text-decoration-line-through" : ""}>{todo.description}</p>
                <div className="mt-2">
                    <span>
                        Excitment:
                        <Badge className="ms-3" bg={MEASUREMENT[todo.excitment].bg}>
                            {MEASUREMENT[todo.excitment].label}
                        </Badge>
                    </span>

                    <span className="ms-4">
                        Difficulty:
                        <Badge className="ms-3" bg={MEASUREMENT[todo.difficulty].bg}>
                            {MEASUREMENT[todo.difficulty].label}
                        </Badge>
                    </span>
                </div>
                <div className="mt-3 todo-action border-top pt-2 d-flex justify-content-between">
                    <div>
                        <span onClick={handleEdit}>Edit</span>
                        <span className="text-danger ms-4" onClick={handleDelete}>
                            Delete
                        </span>
                    </div>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            type="switch"
                            label={`${todo.completed ? "Pending" : "Done"}`}
                            checked={done}
                            onChange={onCheckChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Todos = () => {
    const { ADD, EDIT, OPEN } = CONSTANTS;
    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categoryReducer);
    const { todos } = useSelector((state) => state.todoReducer);

    const [showCanvas, setShowCanvas] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState("ADD");

    const [toEditTodo, setToEditTodo] = useState({});

    const handleCanvasShow = (mode) => {
        setShowCanvas(mode === ADD || mode === EDIT);
        setMode(mode);
        setToEditTodo({});
    };

    const handleModal = (type) => {
        setShowModal(type === OPEN);
    };

    const handleAddTodo = (options) => {
        if (mode === "ADD") {
            dispatch(addTodo(options)).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setShowCanvas(false);
                }
            });
        } else if (mode === "EDIT") {
            dispatch(
                editTodo({
                    id: options.id,
                    formValues: options.formValues,
                })
            ).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setShowCanvas(false);
                }
            });
        }
    };

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <>
            <div className="mt-4 d-flex align-items-center justify-content-between">
                <Link className="btn btn-secondary" to="/">
                    Back
                </Link>{" "}
            </div>
            <Card className="my-4">
                <Card.Body>
                    <Button className="w-100" onClick={() => handleCanvasShow(ADD)}>
                        Add Todo
                    </Button>
                </Card.Body>
            </Card>

            <div className="text-center">
                <h3>List of Todos</h3>
            </div>

            {todos.length > 0 ? (
                todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        handleEdit={() => {
                            handleCanvasShow(EDIT);
                            setToEditTodo(todo);
                        }}
                        handleDelete={() => {
                            handleModal(OPEN);
                            setToEditTodo(todo);
                        }}
                    />
                ))
            ) : (
                <div className="text-center">No Todos Found</div>
            )}

            <AddTodoForm
                show={showCanvas}
                onHide={handleCanvasShow}
                mode={mode}
                handleAddTodo={handleAddTodo}
                categories={categories}
                toEditTodo={toEditTodo}
            />

            <Modal show={showModal} onHide={handleModal}>
                <Modal.Body>Are you want to sure delete the Todo.</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            dispatch(deleteTodo(toEditTodo.id)).then((response) => {
                                if (response.status === 200) {
                                    handleModal();
                                }
                            });
                        }}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handleModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Todos;
