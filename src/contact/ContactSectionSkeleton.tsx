import React from "react";
import './assets/ContactSkeleton.scss';
import Skeleton from "react-loading-skeleton";

export const ContactSectionSkeleton: React.FC = () => {
    return (
        <section className="section-contact">
            <div className="container">
                <h2 className="heading"><Skeleton/></h2>

                <p className="information"><Skeleton/></p>
                <form>
                    <div className="form-element">
                        <Skeleton/>
                    </div>
                    <div className="form-element">
                        <Skeleton/>
                    </div>
                    <div className="form-element">
                        <Skeleton/>
                    </div>
                    <div className="checkboxes form-element">
                        <Skeleton/>
                    </div>


                    <div className="form-element text-area">
                        <Skeleton/>
                    </div>

                </form>
            </div>
        </section>
    );
};
