import React, {Fragment, useEffect, useState} from "react";
import './assets/Banner.scss';

export const Banner: React.FC<BannerProps> = ({delay, children}) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);

    }, []);
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

Banner.defaultProps = {
    delay: 3000
}
