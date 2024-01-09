import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const InputField = ({ label, value, type, placehoder, errorText, onChange, ...rest }) => {
    const [isInvalid, setIsInvalid] = useState(false);

    const changeHandler = (e) => {
        onChange(e);
        setIsInvalid(false);
    };

    useEffect(() => {
        setIsInvalid(errorText ? true : false);
    }, [errorText]);

    return (
        <Form.Group className={`${isInvalid ? "has-validation" : ""}`}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                type={type}
                className={`${isInvalid ? "is-invalid" : ""}`}
                placeholder={placehoder}
                onChange={changeHandler}
                value={value}
                {...rest}
            />
            <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
        </Form.Group>
    );
};

export default InputField;
