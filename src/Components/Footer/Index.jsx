import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "./style.module.css";

class Index extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className={`${style.content} text-center `}>
                <h1 className="fw-bold">Eat, Cook, Repeat</h1>
                <p>Share Your Best Recipe By Uploading Here!</p>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
