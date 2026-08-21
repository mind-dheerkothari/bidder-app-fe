import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import warningIcon from "../../assets/icons/warning.svg";

export default function ConfirmModal({
  isOpen,
  toggle,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  isWarningIconShow = false,
  confirmText = "Yes, Confirm",
  cancelText = "Cancel",
  onConfirm,
}) {
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody className="text-center">
          <div>
            {isWarningIconShow && (
              <img src={warningIcon} alt="warning" className="w-25" />
            )}
          </div>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} style={{ backgroundColor: "#7b2334", border:"none" }}>
            {confirmText}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
