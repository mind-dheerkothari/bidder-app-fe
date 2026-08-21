import React, { useRef, useState } from "react";
import { Label } from "reactstrap";
import uploadIcon from "../../../assets/icons/upload.svg";
import deleteIcon from "../../../assets/icons/white_delete.svg";
import dummyImage from "../../../assets/icons/warning.svg";
import { CONSTANT_NAME } from "../../../utils/propertyResolver";
import { showToast } from "../../../sharedComponents/toast/showTaost";
import { uploadFileViaPresignedUrl } from "../../../utils/commonFunction";
import Loader from "../../../sharedComponents/loader/Loader";
import ConfirmModal from "../../../sharedComponents/confirmModal/ConfirmModal";
export default function AuctionPhotos({
  createAuctionState,
  setCreateAuctionState,
}) {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [deletedId, setDeleteId] = useState("");

  const toggleModal = () =>
    setIsConfirmationModalShow(!isConfirmationModalShow);

  const handleDelete = () => {
    setCreateAuctionState((prev) => ({
      ...prev,
      photos: prev?.photos?.filter((item) => item?.url !== deletedId),
    }));
    toggleModal();
  };
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setIsLoading(true);
    try {
      for (const file of files) {
        const isValidType = CONSTANT_NAME.AUCTION_PHOTO_VALIDATION.includes(
          file.type
        );
        const isValidSize = file.size < CONSTANT_NAME.AUCTION_PHOTO_MAX_SIZE;

        if (!isValidType) {
          const errorMessage = `${file.name} is not a valid file type.`;
          showToast(errorMessage, "warning");
          continue;
        }

        if (!isValidSize) {
          const errorMessage = `${file.name} is too large.`;
          showToast(errorMessage, "warning");
          continue;
        }

        try {
          // File is valid, try uploading
          const fileUploadInfo = await uploadFileViaPresignedUrl(file);
          const fileInfo = {
            url: fileUploadInfo?.finalURL,
            fileName: file.name,
            size: file.size,
          };
          setCreateAuctionState((prev) => ({
            ...prev,
            photos: [...prev.photos, fileInfo],
          }));
          setIsLoading(false);
        } catch (uploadErr) {
          // Handle upload-specific error via toast
          showToast(uploadErr.message || "File upload failed", "error");
          setIsLoading(false);
        }
      }
    } catch (err) {
      // Catch anything unexpected
      showToast(err.message || "Unexpected error", "error");
      setIsLoading(false);
    }

    // Reset input so same file can be re-uploaded
    e.target.value = "";
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="auction-photos-wrapper">
        <Label className="form-label">
          Add product photos (min 3)
          <span className="text-danger ms-1">*</span>
        </Label>
        <div className="image-wrapper d-flex gap-4 flex-wrap">
          <div className="upload-file">
            <div className="upload-box" onClick={handleFileClick}>
              <img src={uploadIcon} alt="" />
              <p>Upload a photo</p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                hidden
                ref={fileInputRef}
                accept=".jpg,.jpeg,.png"
              />
            </div>
            <div className="photo-validation mt-2">
              <p className="max-size m-0 mb-1">Max Size: 25MB</p>
              <p className="allow-info m-0">JPG, PNG only</p>
            </div>
          </div>
          {createAuctionState?.photos?.map((item, index) => (
            <div className="single-photo" key={index}>
              <div className="image-container">
                <img src={item?.url} alt="" className="main-image" />
                <div className="delete-icon">
                  <img
                    src={deleteIcon}
                    alt=""
                    onClick={() => {
                      setIsConfirmationModalShow(true);
                      setDeleteId(item?.url);
                    }}
                  />
                </div>
              </div>
              <p className="single-photo-name m-0 mb-1 ">{item?.fileName}</p>
              <p className="single-photo-size m-0">
                {(item?.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          ))}
        </div>
      </div>
      {isConfirmationModalShow && (
        <ConfirmModal
          isOpen={isConfirmationModalShow}
          toggle={toggleModal}
          title="Confirm Delete"
          message="Are you sure you want to delete?"
          isWarningIconShow={true}
          confirmText="Yes, Confirm"
          cancelText="Cancel"
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
