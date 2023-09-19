import React from 'react';
import './assets/FeatureSection.scss';

export const FeatureSection: React.FC<FeatureSectionProps> = (
    {
        children
    }) => {
    return (
        <section className="section-feature">
            {children}
        </section>
    );
}

export interface FeatureSectionProps {
    children: React.ReactNode;
}
