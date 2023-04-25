import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import classNames from "classnames";

// nodejs library that concatenates classes
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  UncontrolledTooltip,
} from "reactstrap";

// core components

// css 참고 사이트
// https://runebook.dev/ko/docs/react_bootstrap/components/buttons/index

function Icons() {
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-right" sm="6">
                    <h5 className="card-category"> 안녕하세요 샘플입니다.</h5>
                    <h1>안녕하세요 아이콘 페이지 입니다. </h1>
                    <CardTitle tag="h2">이건 카드 타이틀</CardTitle>
                    <Col sm="6">
                      <Button color="primary" id="0" size="m">
                        버튼
                      </Button>
                    </Col>
                    <Col sm="6">
                      <Button color="info" id="0" size="m">
                        버튼
                      </Button>
                      <Button color="secondary" id="0" size="m">
                        버튼
                      </Button>
                      <Button color="success" id="0" size="m">
                        버튼
                      </Button>
                      <Button color="danger" id="0" size="m">
                        버튼
                      </Button>
                      <Button color="warning" id="0" size="m">
                        버튼
                      </Button>
                      <Button color="light" id="0" size="m">
                        버튼
                      </Button>
                      <Button color="dark" id="0" size="m">
                        버튼
                      </Button>
                      <Button variant="outline-primary">Primary</Button>{" "}
                      <Button variant="outline-secondary">Secondary</Button>{" "}
                      <Button variant="outline-success">Success</Button>{" "}
                      <Button variant="outline-warning">Warning</Button>{" "}
                      <Button variant="outline-danger">Danger</Button>{" "}
                      <Button variant="outline-info">Info</Button>{" "}
                      <Button variant="outline-light">Light</Button>{" "}
                      <Button variant="outline-dark">Dark</Button>
                    </Col>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                <div className="chart-area">이건 이건 샘플 입니다~!</div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Icons;
