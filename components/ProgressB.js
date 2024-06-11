import React from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import styles from "../app/page.module.css"

export const ProgressB = ({ currentStep }) => {
  const step1Content = <div className="row px-5 py-5 d-flex justify-content-center"><div className="col-xl-8">
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-chart-area me-1"></i>
        Topic Finalization
      </div>
      <div className="card-body">Make sure your project is thoroughly finalized, meeting all the requirements set by your department and university guidelines.
        Verify that your project has been reviewed and approved by your assigned project guide and the department head.</div>
    </div>
  </div>
  </div>;
  const step2Content = <div className="row px-5 py-5 d-flex justify-content-center"><div className="col-xl-8">
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-chart-area me-1"></i>
        Review 1 - Synopsis
      </div>
      <div className="card-body">The precise problem statement/title based on literature survey and feasibility study.
        Motivation, objectives, and scope of the project.
        System overview- proposed system and expected outcomes.
        Architecture and initial phase of design DFD. </div>
    </div>
  </div>
  </div>;
  const step3Content = <div className="row px-5 py-5 d-flex justify-content-center"><div className="col-xl-8">
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-chart-area me-1"></i>
        Review 2 - Requirement and Design Specification
      </div>
      <div className="card-body">User and System Requirements.
        Functional and Non-functional Requirements.
        SRS Document, Writing structures SRS as per Problem Statement.
        Requirement Analysis / Models.
        UML/ER Diagrams.
        Detail architecture / System design/ Algorithms with analysis / Methods / Techniques.
        At least 30-40% coding documentation with at least 3 to 4 working modules.</div>
    </div>
  </div>
  </div>;
  const step4Content = <div className="row px-5 py-5 d-flex justify-content-center"><div className="col-xl-8">
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-chart-area me-1"></i>
        Review 3 - Implementation
      </div>
      <div className="card-body">Detailed study of Algorithm(s) / Model / Hardware specification (As applicable).
        Confirmation of Data set used (As applicable)
        Detailed ER Diagram / DFD diagrams.
        Detailed UML Diagrams.
        Sample results (module based)</div>
    </div>
  </div>
  </div>;
  const step5Content = <div className="row px-5 py-5 d-flex justify-content-center"><div className="col-xl-8">
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-chart-area me-1"></i>
        Review 4 - Testing and Result Analysis
      </div>
      <div className="card-body">Appropriate test cases and results of test cases.
        Representation of results with analysis.
        Conclusion over performance parameters (as applicable)
        Conclusion and future work suggested.
        Knowledge of references utilized.</div>
    </div>
  </div>
  </div>;
  const step6Content = <div className="row px-5 py-5 d-flex justify-content-center"><div className="col-xl-8">
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-chart-area me-1"></i>
        Project Submitted
      </div>
      <div className="card-body">Project Report: A comprehensive document outlining the project title, introduction, objectives, methodology, results, and conclusion.
        Source Code: Include all relevant source code files organized in a clear and understandable structure.
        Datasets and Resources: If applicable, include any datasets or additional resources used in your project.
        Presentation Slides: Prepare a concise set of presentation slides for the final project defense.</div>
    </div>
  </div>
  </div>;


  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

  return (
    <StepProgressBar
      startingStep={currentStep}
      primaryBtnClass={styles.buttonStyle}
      secondaryBtnClass={styles.buttonStyle}
      progressClass={styles.animated}
      stepClass={styles.animated}
      onSubmit={onFormSubmit}
      steps={[
        {
          label: "Topic Finalization",
          name: "step 1",
          content: step1Content
        },
        {
          label: "Review 1",
          name: "step 2",
          content: step2Content,

        },
        {
          label: "Review 2",
          name: "step 3",
          content: step3Content,

        },
        {
          label: "Review 3",
          name: "Step 4",
          content: step4Content,

        },
        {
          label: "Review 4",
          name: "Step 5",
          content: step5Content,

        },
        {
          label: "Project Submitted",
          name: "Step 6",
          content: step6Content,

        },
      ]}
    />
  );
};
