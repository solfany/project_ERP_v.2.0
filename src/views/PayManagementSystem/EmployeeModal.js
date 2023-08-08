import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EmployeeModal = ({ isOpen, toggle, user }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [toDo, setTodo] = useState("");

  if (!user.toDos) {
    user.toDos = [];
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === "") {
      return;
    }
    user.toDos.push(toDo);
    setTodo("");
  };

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>memo</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>{user.name} 사원님 정보</label>
          <h6>이메일 : {user.email} </h6>
          <h6>전화번호 : {user.phone} </h6>
          <h6>입사일 : {user.date} </h6>
          <h6>전월 실 급여 : {}원 </h6>
        </div>
        <div className="form-group">
          <label>특이사항</label>
          <form onSubmit={onSubmit}>
            <input
              placeholder="입력하세요"
              className="form-control"
              name="memo"
              onChange={onChange}
              value={toDo}
            />
          </form>
          <ul>
            {user.toDos.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        {errorMsg && <p className="text-danger">{errorMsg}</p>}
        <p>{user.memo}</p>
      </ModalBody>

      <ModalFooter>
        <Button size="sm" color="primary" onClick={onSubmit}>
          Save
        </Button>
        <Button size="sm" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EmployeeModal;
