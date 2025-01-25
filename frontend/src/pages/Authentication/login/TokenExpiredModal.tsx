import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const TokenExpiredModal: React.FC<IProps> = ({ isVisible, onClose }) => {
  return (
    <Modal isOpen={isVisible} toggle={onClose} centered>
      <ModalHeader toggle={onClose}>Token Expired</ModalHeader>
      <ModalBody>
        Your session has expired. Please log in again to continue your
        activities.
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TokenExpiredModal;
