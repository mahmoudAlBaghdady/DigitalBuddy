import React from "react";
import { Modal } from "react-bootstrap";
import VideoForm from "../VideoForm";

interface Props {
  show: boolean;
  setModalShow: (value: boolean) => void;
}
const VideoCreate = ({ show, setModalShow }: Props) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        key={55555}
        className={`bg-primary bg-opacity-50`}
        closeVariant="white"
      >
        <Modal.Header closeButton  className='bg-primary' >
          <Modal.Title className={`text-light`}>Create Video</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary">
           <VideoForm setModalShow={setModalShow} /> 
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoCreate;
