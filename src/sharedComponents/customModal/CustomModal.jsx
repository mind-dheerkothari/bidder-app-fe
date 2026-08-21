import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function CustomModal({
  isOpen,
  toggle,
  title,
  size = "md",
  children,
}) {
  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          size={size}
          centered
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </Modal>
      )}
    </>
  );
}
