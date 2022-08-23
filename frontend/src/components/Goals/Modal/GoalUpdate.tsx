import React from "react";
import { Modal } from "react-bootstrap";
import GoalForm from "../GoalForm";
interface Props {
  updateModal: boolean;
  setUpdateModal: (value: boolean) => void;
  _id?: string;
}
const GoalUpdate = ({ updateModal, setUpdateModal, _id }:Props) => {
  return (
    <>
      <Modal
        show={updateModal}
        onHide={() => setUpdateModal(false)}
        backdrop="static"
        keyboard={false}
        key={65656}
        className={`bg-light bg-opacity-50`}
      >
        <Modal.Header closeButton className="bg-dark ">
          <Modal.Title className={`text-light`}>Update Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <GoalForm
            setUpdateModal={setUpdateModal}
            _id={_id}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GoalUpdate;
