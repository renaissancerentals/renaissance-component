import React, {useEffect, useState} from "react";
import {ItemSlider, Star} from "@contentmunch/muncher-ui";
import {Testimonial} from "../floorplan/data/Floorplan";
import {PropertyDetails} from "../property/data/Property";
import {getTestimonials} from "../floorplan/service/FloorplanService";
import {getAssetUrl} from "../asset/service/AssetService";
import {DEFAULT_IMAGE_URL} from "../service/AssetApi";
import "./assets/ReviewSection.scss";

interface Review {
    left: Testimonial,
    right: Testimonial
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({property, starColor}) => {

    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const promises: Promise<Testimonial[]>[] = [];
        property.floorplans.map(floorplan => {
            promises.push(getTestimonials(floorplan.id));
        });
        Promise.all(promises).then(data => {
            const currentTestimonials: Testimonial[] = [];
            const currentReview: Review[] = [];
            data.forEach(testimonialsData => {
                currentTestimonials.push(...testimonialsData);
            });
            let index = 0;
            while (index < currentTestimonials.length - 1)
                currentReview.push({left: currentTestimonials[index++], right: currentTestimonials[index++]});
            setReviews(currentReview);

        }).finally(() => setIsLoading(false));
    }, [property.floorplans]);

    return (
        <div className="container">
            <section className="section-review">
                {isLoading ? "" : <>
                    <div className="review-content"
                         style={{backgroundImage: `url(${property.coverImage ? getAssetUrl(property.coverImage, property.id) : DEFAULT_IMAGE_URL})`}}>
                        <div className="wrapper">
                            <ItemSlider navButtonSize="medium"
                                        navIcon="arrow" variant="transparent" navButtonWeight={2}
                                        sliderItems={reviews.map(review =>
                                            <div className="review">
                                                <div>
                                                    <p className="testimonials">{review.left.testimonial}
                                                    </p>
                                                    <p className="tenant">-{review.left.tenant} | resident</p>
                                                </div>
                                                <div>
                                                    <p className="testimonials">{review.right.testimonial}
                                                    </p>
                                                    <p className="tenant">-{review.right.tenant} | resident</p>
                                                </div>
                                            </div>
                                        )}/>
                        </div>
                    </div>
                    {property.rating ? <div className="review-footer">
                        <Star rating={property.rating} size="medium" color={starColor ? starColor : "blue"}/>
                        <h3>&nbsp;{property.ratingLink ?
                            <a href={property.ratingLink} target="_blank">{property.rating} Stars on
                                Google</a> : <>{property.rating} Stars on Google</>}</h3>
                    </div> : ""}
                </>
                }
            </section>
        </div>
    );
};

export interface ReviewSectionProps {
    property: PropertyDetails;
    starColor?: 'green' | 'yellow' | 'orange' | 'red' | 'blue';
}