import React, {useEffect, useState} from 'react';
import {Button, Icon, Modal} from "@contentmunch/muncher-ui";
import "./assets/HomePageSpecialModal.scss";
import {HomePageSpecialCard} from "./HomePageSpecialCard";
import {HomePageSpecial} from "./data/HomePageSpecial";
import {useCookies} from 'react-cookie';
import {AllPropertyId} from "../property/data/Property";

export const HomePageSpecialModal: React.FC<HomePageSpecialModalProps> = (
    {
        homePageSpecials, propertyId, parent
    }) => {
    const [translate, setTranslate] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const cookieName = parent ? parent + "-" + propertyId + "-" + "specialModalClosed" : propertyId + "-" + "specialModalClosed";
    const [cookies, setCookie] = useCookies([cookieName]);
    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);

    }, []);
    const increaseIndex = () => {

        if (currentIndex === homePageSpecials.length - 1) {
            setCurrentIndex(0);
            setTranslate(0);

        } else {
            setTranslate(translate - 100);
            setCurrentIndex(currentIndex + 1);
        }

    };
    const decreaseIndex = () => {
        if (currentIndex === 0) {
            setTranslate(-(homePageSpecials.length - 1) * 100)
            setCurrentIndex(homePageSpecials.length - 1);
        } else {

            setTranslate(translate + 100);
            setCurrentIndex(currentIndex - 1);
        }
    };


    const modalCloseHandler = () => {
        setShowModal(false);
        const oneDay = 60 * 60 * 24;
        setCookie(cookieName, true, {path: '/', maxAge: oneDay});
    }

    useEffect(() => {
        if (homePageSpecials && homePageSpecials.length < 1 || cookies[cookieName]) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }


    }, [cookies[cookieName]]);


    return (
        <div className="home-page-special-modal">
            {homePageSpecials.length > 0 ?
                <>
                    <Modal show={showModal && isVisible} setShow={modalCloseHandler}>
                        <div className="close" onClick={modalCloseHandler}>
                            <Button variant="transparent" onClick={modalCloseHandler}>
                                <Icon name="close" size="medium" weight={2}/>
                            </Button>
                        </div>
                        {homePageSpecials.length > 1 ?
                            <div className="left">
                                <Button variant="transparent" onClick={decreaseIndex} disabled={currentIndex === 0}>
                                    <Icon name="arrow-left" size="medium" weight={2}/>
                                </Button>
                            </div> : ""}

                        <div className="slider">
                            <div className="slider-container" style={{width: `${100 * homePageSpecials.length}%`}}>
                                {homePageSpecials.map((homePageSpecial, index) =>
                                    <div className="slider-item"
                                         style={{transform: `translateX(${translate}%)`}}
                                         key={"slider-item" + index}>
                                        <HomePageSpecialCard homePageSpecial={homePageSpecial} propertyId={propertyId}/>
                                    </div>
                                )}
                            </div>
                        </div>
                        {homePageSpecials.length > 1 ?
                            <div className="right">
                                <Button variant="transparent" onClick={increaseIndex}
                                        disabled={currentIndex === homePageSpecials.length - 1}>
                                    <Icon name="arrow-right" size="medium" weight={2}/>
                                </Button>
                            </div> : ""}
                    </Modal>
                </> :
                <></>}

        </div>
    )
};

export interface HomePageSpecialModalProps {
    homePageSpecials: HomePageSpecial[],
    propertyId: AllPropertyId;
    parent?: "renaissance-rentals"
}
