import React from "react";
import { Modal } from "react-bootstrap";
import ETForm from "./ETForm";

interface Props {
  show: boolean;
  _id: string;
  setModalShow: (value: boolean) => void;
  name: string;
  color: string;
}

const ETFormModal = ({ show, setModalShow, _id, color, name }: Props) => {

  return (
    <>
      <Modal
        show={show}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        key={_id}
        className={`bg-${color} bg-opacity-50`}
      >
        <Modal.Header closeButton>
          <Modal.Title className={`text-${color}`}>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ETForm _id={_id} setModalShow={setModalShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ETFormModal;
