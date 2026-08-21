import React from "react";
import checkIcon from "../../assets/icons/green_tick.svg";
import { Col, Row } from "reactstrap";
export default function CustomStepper({
  steps,
  activeStep,
  onStepClick,
  isStepCompleted,
}) {
  return (
    <>
      <Row className="flex justify-center my-8 relative">
        {steps?.map((step, index) => {
          const isActive = activeStep === index;
          const isAccessible = index === 0 || isStepCompleted(index - 1);
          const isCompleted = isStepCompleted(index);
          const isLast = index === steps.length - 1;
          return (
            <Col
              key={index}
              className={`relative flex flex-col items-center cursor-pointer ${
                !isAccessible ? "!cursor-not-allowed" : ""
              }`}
              onClick={() => isAccessible && onStepClick(index)}
            >
              <div
                className={`w-[60px] h-[60px] rounded-full flex items-center justify-center transition-colors duration-300 relative z-[11] -mt-[10px] ${
                  isActive ? "bg-[#efb7c2]" : "bg-white"
                }`}
              >
                <img src={step?.icon} alt="" className="w-6 h-6 z-[100]" />
                {isCompleted && (
                  <div className="absolute z-40 right-0 bottom-0">
                    <img src={checkIcon} alt="" width={25} />
                  </div>
                )}
              </div>
              <div className="mt-2 text-center text-sm">{step?.label}</div>
              {!isLast && (
                <div className="absolute top-5 -right-1/2 w-full h-[2px] bg-[repeating-linear-gradient(to_right,#9f3247,#9f3247_5px,transparent_5px,transparent_10px)]"></div>
              )}
            </Col>
          );
        })}
      </Row>
    </>
  );
}
