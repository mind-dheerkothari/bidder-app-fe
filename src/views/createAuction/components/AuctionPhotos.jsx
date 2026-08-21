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
      <div>
        <Label className="form-label !text-black !font-bold !m-0 !mb-[5px]">
          Add product photos (min 3)
          <span className="text-danger ms-1">*</span>
        </Label>
        <div className="border-2 border-dashed border-[#f2f0f1] p-5 min-h-[40vh] d-flex gap-4 flex-wrap">
          <div>
            <div
              className="border-2 border-[#2d5bff] rounded-[10px] p-7 text-center cursor-pointer transition-colors duration-300 max-h-[120px] max-w-[120px] hover:border-[#5c6bc0]"
              onClick={handleFileClick}
            >
              <img src={uploadIcon} alt="" />
              <p className="m-0 font-medium text-sm leading-[18px] text-[#212427]">
                Upload a photo
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                hidden
                ref={fileInputRef}
                accept=".jpg,.jpeg,.png"
              />
            </div>
            <div className="mt-2 [&_p]:text-xs [&_p]:font-normal [&_p]:leading-4">
              <p className="text-[#212427] m-0 mb-1">Max Size: 25MB</p>
              <p className="text-[#5c5c5c] m-0">JPG, PNG only</p>
            </div>
          </div>
          {createAuctionState?.photos?.map((item, index) => (
            <div className="relative" key={index}>
              <div className="group relative inline-block">
                <img
                  src={item?.url}
                  alt=""
                  className="max-h-[120px] max-w-[120px] object-contain rounded-lg border-2 border-primary cursor-pointer block"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-[2px] text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
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
              <p className="text-xs font-normal leading-4 text-[#212427] m-0 mb-1">
                {item?.fileName}
              </p>
              <p className="text-xs font-normal leading-4 text-[#5c5c5c] m-0">
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
