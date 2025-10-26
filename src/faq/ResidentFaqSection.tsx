import React, {useEffect, useState} from "react";
import {Faq} from "./data/Faq";
import {getMaintenanceFaqs, getResidentFaqs} from "../resident/service/ResidentService";
import {FaqsCard} from "./FaqsCard";
import "./assets/ResidentFaqSection.scss"

export const ResidentFaqSection: React.FC = () => {
    const [residentFaqs, setResidentFaqs] = useState<Faq[]>([]);
    const [maintenanceFaqs, setMaintenanceFaqs] = useState<Faq[]>([]);

    useEffect(() => {
        Promise.all([getResidentFaqs(), getMaintenanceFaqs()])
            .then(data => {
                setResidentFaqs(data[0].sort((a, b) => a.sortOrder - b.sortOrder));
                setMaintenanceFaqs(data[1].sort((a, b) => a.sortOrder - b.sortOrder));
            });
    }, []);
    return (
        <section className="resident-faq-section">

            <div className="container">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-cards">
                    <FaqsCard title="General Questions" faqs={residentFaqs}/>
                    <FaqsCard title="Maintenance Questions" faqs={maintenanceFaqs}/>
                </div>

            </div>

        </section>
    );
}
