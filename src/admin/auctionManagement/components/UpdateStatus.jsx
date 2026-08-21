import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import CustomDropDown from "../../../sharedComponents/customDropDown/CustomDropDown";
import { CONSTANT_NAME } from "../../../utils/propertyResolver";
import CustomInput from "../../../sharedComponents/customInput/CustomInput";
import { capitalizeFirstChar } from "../../../utils/commonFunction";

export default function UpdateStatus({
  isOpen,
  toggle,
  handleUpdate,
  auctionDetail,
}) {
  const [status, setStatus] = useState({
    value: auctionDetail?.status,
    label: capitalizeFirstChar(auctionDetail?.status),
  });
  const [reason, setReason] = useState(auctionDetail?.rejected_reason || "");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setStatus({
      value: auctionDetail?.status,
      label: capitalizeFirstChar(auctionDetail?.status),
    });
    setReason(auctionDetail?.rejected_reason);
  }, [auctionDetail]);

  useEffect(() => {
    if (!status) {
      setIsSubmitDisabled(true);
    } else if (status?.value === "rejected" && reason?.trim() === "") {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [status, reason]);

  const handleSubmit = () => {
    const payload = {
      auctionId: auctionDetail?.id,
      status: status?.value,
      rejectReason: reason,
    };
    handleUpdate(payload);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Update Status {auctionDetail?.item_name}
      </ModalHeader>
      <ModalBody>
        <CustomDropDown
          label="Select Status"
          name="status"
          value={status}
          onChange={(item) => {
            setStatus(item);
            setReason("");
          }}
          placeholder="Choose a status"
          options={CONSTANT_NAME.AUCTION_STATUS_LIST}
          required={true}
        />

        {status?.value === "rejected" && (
          <CustomInput
            label="Reject Reason"
            type="textarea"
            name="reasonTextarea"
            value={reason}
            placeholder="Please provide a reason for rejection"
            required={true}
            onChange={(e) => setReason(e.target.value)}
          />
        )}
      </ModalBody>

      <ModalFooter>
        <Button
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
