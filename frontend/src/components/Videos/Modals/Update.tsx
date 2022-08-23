import React from "react";
import { Modal } from "react-bootstrap";
import VideoForm from "../VideoForm";

interface Props {
  updateModal: boolean;
  setUpdateModal: (value: boolean) => void;
  _id?: string;
  
}
const VideoUpdate = ({  updateModal, setUpdateModal, _id }: Props) => {
  return (
    <>
      <Modal
        show={updateModal}
        onHide={() => {
          setUpdateModal(false);
        }}
        backdrop="static"
        keyboard={false}
        key={11222}
        className={`bg-primary bg-opacity-50`}
      >
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title className={`text-light `}>Update Video</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary">
          <VideoForm setUpdateModal={setUpdateModal} _id={_id} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoUpdate;
