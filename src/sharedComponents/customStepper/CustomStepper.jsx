import React from "react";
import "./customStepper.scss";
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
      <Row className="stepper">
        {steps?.map((step, index) => {
          const isActive = activeStep === index;
          const isAccessible = index === 0 || isStepCompleted(index - 1);
          const isCompleted = isStepCompleted(index);
          return (
            <Col
              key={index}
              className={`step ${isActive ? "active" : ""} ${
                !isAccessible ? "disabled-step" : ""
              }`}
              onClick={() => isAccessible && onStepClick(index)}
            >
              <div className="icon-wrapper">
                <img src={step?.icon} alt="" className="step-image" />
                {isCompleted && (
                  <div className="tick-icon">
                    <img src={checkIcon} alt="" width={25} />
                  </div>
                )}
              </div>
              <div className="label">{step?.label}</div>
              <div className="dash-line"></div>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
