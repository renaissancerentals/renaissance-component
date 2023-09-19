import React from "react";

export const VirtualTour: React.FC<VirtualTourProps> = ({virtualTourUrl}) => {
    return (
        <div className="virtual-tour-view">
            <iframe title="virtual tour"  frameBorder="0"
                    style={{border: 0}}
                    src={virtualTourUrl}
                    allowFullScreen/>
        </div>
    );
};

export interface VirtualTourProps {
    virtualTourUrl?: string;
}