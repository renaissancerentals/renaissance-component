import React, {Fragment, useEffect, useState} from "react";
import './assets/Banner.css';

export const Banner: React.FC<BannerProps> = ({delay = 3000, children}) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);

    }, [delay]);
    return (
        <Fragment>
            {
                isVisible ?
                    <div className="section-announcement">
                        {children}
                    </div> : ""
            }
        </Fragment>
    );
};

export interface BannerProps {
    delay?: number
    children?:any;
}