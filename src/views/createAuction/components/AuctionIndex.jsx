import React, { useEffect, useState } from "react";
import cameraIcon from "./../../../assets/icons/camera.svg";
import editIcon from "./../../../assets/icons/edit.svg";
import eyeIcon from "./../../../assets/icons/eye.svg";
import mouseIcon from "./../../../assets/icons/mouse.svg";
import CustomStepper from "./../../../sharedComponents/customStepper/CustomStepper";
import AuctionDetails from "./AuctionDetails";
import { useDispatch } from "react-redux";
import {
  createAuction,
  getAuctionCategoryLIst,
  updateAuction,
} from "../../../redux/slices/auctionSlice";
import { useSelector } from "react-redux";
import Loader from "../../../sharedComponents/loader/Loader";
import { htmlToText, mapToSelectOptions } from "../../../utils/commonFunction";
import AuctionDescription from "./AuctionDescription";
import AuctionPhotos from "./AuctionPhotos";
import AuctionPreview from "./AuctionPreview";

export default function AuctionIndex({ auctionData }) {
  const [activeStep, setActiveStep] = useState(0);
  const [createAuctionState, setCreateAuctionState] = useState({
    productName: "",
    basePrice: "",
    startDate: "",
    endDate: "",
    category: "",
    photos: [],
    description: "",
  });
  const createAuctionStep = [
    {
      label: "Detail",
      icon: mouseIcon,
    },
    {
      label: "Description",
      icon: editIcon,
    },
    {
      label: "Photos",
      icon: cameraIcon,
    },
    {
      label: "Preview",
      icon: eyeIcon,
    },
  ];

  const { auctionCategoryList, isLoading } = useSelector(
    (state) => state.auction
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuctionCategoryLIst());
  }, []);

  useEffect(() => {
    setCreateAuctionState({
      productName: auctionData?.item_name || "",
      basePrice: auctionData?.base_price || "",
      startDate: auctionData?.start_date || "",
      endDate: auctionData?.end_date || "",
      category: auctionData?.category
        ? {
            value: auctionData?.category?.id,
            label: auctionData?.category?.name,
          }
        : "",
      photos: auctionData?.images || [],
      description: auctionData?.description || "",
    });
  }, [auctionData]);

  //   Validation for each step
  const isStepValid = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          createAuctionState?.productName &&
          createAuctionState?.basePrice &&
          createAuctionState?.category &&
          createAuctionState?.startDate &&
          createAuctionState?.endDate
        );
      case 1:
        return (
          isStepValid(0) &&
          htmlToText(createAuctionState?.description || "").trim().length > 0
        );
      case 2:
        return isStepValid(1) && createAuctionState?.photos?.length >= 3;

      case 3:
        return isStepValid(2);
      default:
        return false;
    }
  };

  const isStepCompleted = (index) => {
    return index < activeStep || isStepValid(index);
  };

  const handleStepClick = (index) => {
    if (index === 0 || isStepValid(index - 1)) {
      setActiveStep(index);
    }
  };

  const handleNext = () => {
    if (isStepValid(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateAuctionState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        item_name: createAuctionState?.productName,
        base_price: createAuctionState?.basePrice,
        description: createAuctionState?.description,
        start_date: createAuctionState?.startDate,
        end_date: createAuctionState?.endDate,
        category_id: createAuctionState?.category?.value,
        images: createAuctionState?.photos,
      };
      if (auctionData) {
        return dispatch(updateAuction(payload));
      }
      await dispatch(createAuction(payload)).unwrap();
      setCreateAuctionState({
        productName: "",
        basePrice: "",
        startDate: "",
        endDate: "",
        category: "",
        photos: [],
        description: "",
      });
      setActiveStep(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <CustomStepper
        steps={createAuctionStep}
        activeStep={activeStep}
        onStepClick={handleStepClick}
        isStepCompleted={isStepCompleted}
      />
      {/* Component goes here on the basis of active index */}
      <div className="auction-form-card container-fluid">
        {activeStep === 0 && (
          <AuctionDetails
            createAuctionState={createAuctionState}
            setCreateAuctionState={setCreateAuctionState}
            handleChange={handleChange}
            auctionCategoryList={mapToSelectOptions(
              auctionCategoryList,
              "name",
              "id"
            )}
          />
        )}

        {activeStep === 1 && (
          <AuctionDescription
            createAuctionState={createAuctionState}
            setCreateAuctionState={setCreateAuctionState}
          />
        )}

        {activeStep === 2 && (
          <AuctionPhotos
            createAuctionState={createAuctionState}
            setCreateAuctionState={setCreateAuctionState}
          />
        )}

        {activeStep === 3 && (
          <AuctionPreview
            createAuctionState={createAuctionState}
            handelEditClick={handleStepClick}
          />
        )}

        {/* Button for next and prev */}
        <div className="d-flex justify-content-center align-items-cents gap-4 mt-4 auction-stepper-btn">
          <button onClick={handlePrev} disabled={activeStep === 0}>
            Previous
          </button>
          <button
            onClick={() => {
              if (activeStep === createAuctionStep?.length - 1) {
                handleSubmit();
              } else {
                handleNext();
              }
            }}
            disabled={!isStepValid(activeStep)}
            className="next-btn"
          >
            {activeStep === createAuctionStep?.length - 1
              ? auctionData
                ? "Update"
                : "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
