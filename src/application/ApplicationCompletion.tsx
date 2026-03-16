import React from "react";
import "./assets/ApplicationCompletion.scss";
import {StepContainer} from "@contentmunch/muncher-ui/lib/step/StepContainer";
import {Step} from "@contentmunch/muncher-ui/lib/step/Step";
import {StepLine} from "@contentmunch/muncher-ui/lib/step/StepLine";
import {LargeRoundedBadge} from "@contentmunch/muncher-ui/lib/badge/LargeRoundedBadge";

export const ApplicationCompletion: React.FC = () =>
    <section className="section-application-completion">
        <div className="completion-banner">
            <div className="completion-step-banner">
                <LargeRoundedBadge completed={true}>Complete</LargeRoundedBadge>
            </div>
            <p className="emphasized-info">Complete</p>
            <p>Thank you for submitting your application request.</p>

        </div>
        <div className="container">
            <StepContainer>
                <Step completed={true}>1</Step>
                <StepLine/>
                <Step active={true} label="You are here">2</Step>
                <StepLine/>
                <Step>3</Step>
            </StepContainer>
            <div className="completion-step-banner">
                <LargeRoundedBadge variant="secondary">
                    <div className="badge-content"><p>Step</p><p className="emphasized">2</p></div>
                </LargeRoundedBadge>
            </div>
            <p className="emphasized-info">Receive a link</p>
            <p>You'll receive a secure link within the next business day to complete your application.</p>
            <p>We'll contact you if additional information is needed.</p>

            <div className="completion-step-banner">
                <LargeRoundedBadge variant="primary">
                    <div className="badge-content"><p>Step</p><p className="emphasized">3</p></div>
                </LargeRoundedBadge>
            </div>
            <p className="emphasized-info">Submit</p>
            <p>Submit your official application for our team to review.</p>
        </div>
    </section>
