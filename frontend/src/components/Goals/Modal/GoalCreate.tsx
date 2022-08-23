import React from "react";
import { Modal } from "react-bootstrap";
import GoalForm from "../GoalForm";
interface Props {
  modalShow: boolean;
  setModalShow: (value: boolean) => void;
}
const GoalCreate = ({ modalShow, setModalShow }: Props) => {
  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        key={11222}
        className={`bg-light bg-opacity-50`}
      >
        <Modal.Header closeButton className="bg-dark ">
          <Modal.Title className={`text-light`}>Create Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <GoalForm setModalShow={setModalShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GoalCreate;
