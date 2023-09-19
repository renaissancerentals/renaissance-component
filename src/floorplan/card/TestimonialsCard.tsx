import React from "react";
import {ItemSlider} from "@contentmunch/muncher-ui";
import "./assets/TestimonialsCard.scss"
import {Card} from "../../card/Card";
import {Testimonial} from "../data/Floorplan";

export const TestimonialsCard: React.FC<TestimonialsCardProps> = ({testimonials}) => {

    return (
        <div className="testimonials-card">
            <Card featured={true}>
                <ItemSlider sliderItems={testimonials.map(testimonial =>
                    <>
                        <blockquote>
                            {testimonial.testimonial}
                        </blockquote>
                        <i>- {testimonial.tenant}, former resident</i>
                    </>)}/>

            </Card>
        </div>
    );
};

export interface TestimonialsCardProps {
    testimonials: Testimonial[];
}