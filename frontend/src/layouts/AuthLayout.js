import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const AuthLayout = (props) => {
    return (
        <div className="auth-wrap">
            <Container>
                <Row>
                    <Col className="mx-auto" lg={5}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AuthLayout;
