import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <Container>
            <Row>
                <Col className="mx-auto" lg={6}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default AppLayout;
