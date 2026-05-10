import React, {useEffect, useState} from 'react';
import {Button, Icon, Modal} from "@contentmunch/muncher-ui";
import "./assets/HomePageSpecialModal.scss";
import {HomePageSpecialCard} from "./HomePageSpecialCard";
import {HomePageSpecial} from "./data/HomePageSpecial";
import {useCookies} from 'react-cookie';

export const HomePageSpecialModal: React.FC<HomePageSpecialModalProps> = (
    {
        homePageSpecial, propertyId, parent
    }) => {
    const cookieName = parent
        ? parent + "-" + propertyId + "-specialModalClosed"
        : propertyId + "-specialModalClosed";
    const [cookies, setCookie] = useCookies([cookieName]);
    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Show only when a special exists AND the cookie hasn't been set
        if (homePageSpecial && !cookies[cookieName]) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [cookies, cookieName, homePageSpecial]);

    const modalCloseHandler = () => {
        setShowModal(false);
        const oneDay = 60 * 60 * 24;
        setCookie(cookieName, true, {path: '/', maxAge: oneDay});
    };
    if (!showModal) return null;

    return (
        <div className="home-page-special-modal">
            {homePageSpecial && (
                <Modal show={showModal && isVisible} setShow={modalCloseHandler}>
                    <div className="close">
                        <Button variant="transparent" onClick={modalCloseHandler}>
                            <Icon name="close" size="medium" weight={2}/>
                        </Button>
                    </div>
                    <HomePageSpecialCard homePageSpecial={homePageSpecial} propertyId={propertyId}/>
                </Modal>
            )}
        </div>
    );
};

export interface HomePageSpecialModalProps {
    homePageSpecial: HomePageSpecial;
    propertyId: string;
    parent?: "renaissance-rentals";
}
