import React, {useCallback, useEffect, useState} from "react";
import "./assets/SubletSection.scss";
import {Button, Checkbox, Icon, ImageInput, Input, Modal, Spinner, Textarea} from "@contentmunch/muncher-ui";
import {defaultSublet, Sublet} from "./data/Sublet";
import {deleteSublet, getSublet, postAsset, postSublet} from "./services/SubletService";
import {SubletNotFound} from "./SubletNotFound";
import {dateToMoment, isZipcodeValid} from "../utils/Utils";

export const SubletSection: React.FC<SubletSectionParam> = ({uniqueId}) => {
    const [sublet, setSublet] = useState<Sublet>(defaultSublet);
    const [isFound, setIsFound] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [filesError, setFilesError] = useState("");
    const [zipcodeError, setZipcodeError] = useState("");
    const [availableToError, setAvailableToError] = useState("");
    const [showDeactivationModal, setShowDeactivationModal] = useState(false);
    const bedroomOptions = ["0", "1", "2", "3", "4"];
    const isNewSublet = useCallback(() => uniqueId === NEW_SUBLET, [uniqueId]);
    const localCity = "Bloomington IN";
    const maxFileSize = 4999999;
    useEffect(() => {
        if (!isNewSublet()) {
            getSublet(uniqueId).then(data => {
                setSublet(data);
            }).catch(() => {
                setIsFound(false);
            });
        }
    }, [uniqueId, isNewSublet]);
    const isFileInvalid = (file: File) => file.size > maxFileSize;

    const hasFileValidationError = (): boolean => {
        let fileInvalid = false;
        files.forEach((file, index) => {
            if (isFileInvalid(file)) {
                setFilesError(file.name + " is too big, provide a file smaller than 5mb!");
                setSubmissionErrorMessage("Fix field error(s)");
                fileInvalid = true;
                return;
            }
        });
        return fileInvalid;
    };
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {

        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        resetMessages();

        if (files.length === 0) {
            setFilesError("Provide at least an image!");
            setSubmissionErrorMessage("Fix field error(s)");
            return;
        }
        if (form.checkValidity()) {

            if (!isZipcodeValid(sublet.zipcode)) {
                setZipcodeError("Provide valid zip code (ex: 47401)");
                setSubmissionErrorMessage("Fix field error(s)");
                return;
            }

            if (dateToMoment(sublet.availableFrom).isAfter(dateToMoment(sublet.availableTo))) {
                setAvailableToError("Should be later than Available From date");
                setSubmissionErrorMessage("Fix field error(s)");
                return;
            }

            if (hasFileValidationError()) {
                return;
            }
            setIsSubmitting(true);
            postSublet({...sublet, address: sublet.address + ", " + localCity})
                .then((value) => {
                    setSublet(value);
                    if (files.length > 1) {
                        files.push(files[0]);
                    }
                    files.forEach((file, index) => {
                        setIsSubmitting(true);
                        postAsset(value.assetKey, file, index + "", index === 0)
                            .finally(() => {
                                setIsSubmitting(false);
                            });
                    });
                    setSubmissionMessage("Sublet Created, It will be posted when approved!");
                    setSubmitted(true);
                })
                .catch((e: any) => {
                    setSubmissionErrorMessage("Error posting sublet!");
                    console.log(e);
                }).finally(() => {
                setIsSubmitting(false);
            });


        }
    }
    const resetMessages = () => {
        setAvailableToError("");
        setZipcodeError("");
        setFilesError("");
        setSubmissionErrorMessage("");
    };

    const cleanAddress = (address: string) => address.replace(", " + localCity, "");

    const handleDeleteConfirmation = () => {
        deleteSublet(uniqueId).then(() => {
            setSubmissionMessage("Sublet Deleted!");
            setSubmitted(true);
        }).catch((e: any) => {
            setSubmissionErrorMessage("Error deleting sublet!");
            console.log(e);
        }).finally(() => {
            setIsSubmitting(false);
        });
    }
    return (
        <section className="section-sublet">
            {isFound ?
                <>
                    <div className="div-confirmation-modal">
                        <Modal show={showDeactivationModal} setShow={setShowDeactivationModal}>
                            <div className="div-alert">
                                <Icon name="alert" size="medium">Delete Sublet?</Icon>
                            </div>

                            <div className="buttons">
                                <Button variant="danger" size="small"
                                        onClick={() => {
                                            handleDeleteConfirmation();
                                            setShowDeactivationModal(false);
                                        }}>

                                    <Icon name="trash">Delete</Icon>
                                </Button>
                                <Button variant="secondary" size="small"
                                        onClick={() => setShowDeactivationModal(false)}>
                                    <Icon name="close">Cancel</Icon>
                                </Button>
                            </div>
                        </Modal>
                    </div>
                    <div className="container">
                        <h2 className="heading">
                            {isNewSublet() ?
                                <span className="emphasized">Post your sublet for free. Listing remains active for 30 days</span>
                                :
                                <span
                                    className="emphasized">Your Listing</span>
                            }
                        </h2>

                        <form onSubmit={submitHandler}>
                            <div className="form-element">
                                <Input label="First Name" name="firstName" icon="user" type="text"
                                       placeholder="Type your first name"
                                       readOnly={!isNewSublet()}
                                       value={sublet.firstName}
                                       onChange={e => {
                                           setSublet({...sublet, firstName: e.currentTarget.value})
                                       }}
                                       required/>
                            </div>
                            <div className="form-element">
                                <Input label="Last Name" name="lastName" icon="user" type="text"
                                       placeholder="Type your last name"
                                       value={sublet.lastName}
                                       readOnly={!isNewSublet()}
                                       onChange={e => {
                                           setSublet({...sublet, lastName: e.currentTarget.value})
                                       }}
                                       required/>
                            </div>

                            <div className="hp-form-item">
                                <label htmlFor="preferredName">Preferred Name</label>
                                <input
                                    type="text"
                                    id="preferredName"
                                    name="preferredName"
                                    autoComplete="off"
                                    tabIndex={-1}
                                />
                            </div>
                            <div className="form-element">
                                <Input label="Email" name="email" icon="mail" type="email"
                                       placeholder="Type your email"
                                       value={sublet.email}
                                       readOnly={!isNewSublet()}
                                       onChange={e => {
                                           setSublet({...sublet, email: e.currentTarget.value})
                                       }}
                                       required/>
                            </div>
                            <div className="form-element">
                                <p>Your personal information is for verification purposes only and will not be
                                    displayed.</p>
                            </div>
                            <div className="form-element one-line">
                                <select name="availableBedrooms"
                                        value={sublet.availableBedrooms}

                                        onChange={e => {
                                            setSublet({...sublet, availableBedrooms: e.currentTarget.value})
                                        }}
                                        required={true}
                                        disabled={!isNewSublet()}
                                >
                                    {
                                        bedroomOptions.map((option, i) =>
                                            <option key={"select-option-" + i} value={option}>{option}</option>)
                                    }
                                </select>

                                &nbsp; bedroom(s) available out of <select name="bedroom"
                                                                           required={true}
                                                                           value={sublet.bedroom}
                                                                           onChange={e => {
                                                                               setSublet({
                                                                                   ...sublet,
                                                                                   bedroom: e.currentTarget.value
                                                                               })
                                                                           }}
                                                                           disabled={!isNewSublet()}
                            >
                                {
                                    bedroomOptions.map((option, i) =>
                                        <option key={"select-option-" + i} value={option}>{option}</option>)
                                }
                            </select>
                                &nbsp;bedrooms.
                            </div>
                            <div className="form-element">
                                <Input label="Address" name="address" icon="map" type="text"
                                       value={cleanAddress(sublet.address)}
                                       onChange={e => {
                                           setSublet({...sublet, address: cleanAddress(e.currentTarget.value)})
                                       }}
                                       readOnly={!isNewSublet()}
                                       required/>
                            </div>
                            <div className="form-element">
                                <Input name="address" icon="map" type="text" readOnly={true}
                                       value={localCity}/>
                            </div>
                            <div className="form-element">
                                <Input label="Zip Code" name="zipcode" icon="map"
                                       value={sublet.zipcode}
                                       onChange={(e) => setSublet({
                                           ...sublet,
                                           zipcode: e.currentTarget.value
                                       })}
                                       readOnly={!isNewSublet()}
                                       error={zipcodeError}
                                       placeholder="Provide Zip Code (ex: 47404)"
                                       required
                                />

                            </div>

                            <div className="form-element">
                                <Input label="Available From" name="availableFrom"
                                       type="date" icon="calendar"
                                       value={sublet.availableFrom}
                                       onChange={(e) => {
                                           setSublet({...sublet, availableFrom: e.currentTarget.value});
                                       }}
                                       readOnly={!isNewSublet()}
                                       required
                                />
                            </div>
                            <div className="form-element">
                                <Input label="Available To" name="availableTo"
                                       type="date" icon="calendar"
                                       value={sublet.availableTo}
                                       onChange={(e) => {
                                           setSublet({...sublet, availableTo: e.currentTarget.value});
                                       }}
                                       readOnly={!isNewSublet()}
                                       required
                                       error={availableToError}
                                />
                            </div>

                            <div className="form-element">
                                <Input label="Rent" name="rent" type="number"
                                       value={sublet.rent}
                                       onChange={(e) => {
                                           setSublet({...sublet, rent: e.currentTarget.value});
                                       }}
                                       readOnly={!isNewSublet()}
                                       required/>
                            </div>
                            <div className="checkboxes form-element">
                                <Checkbox label="Including Utilities" name="utilitiesIncluded"
                                          checked={sublet.utilitiesIncluded}
                                          onChange={() => {
                                              setSublet({
                                                  ...sublet,
                                                  utilitiesIncluded: !sublet.utilitiesIncluded
                                              });
                                          }}

                                />
                                <Checkbox label="Pets OK" name="petsAllowed"
                                          checked={sublet.petsAllowed}
                                          onChange={() => {
                                              setSublet({
                                                  ...sublet,
                                                  petsAllowed: !sublet.petsAllowed
                                              });
                                          }}
                                />
                            </div>

                            <div className="form-element">
                                <Input label="Title" name="title" type="text"
                                       value={sublet.title}
                                       onChange={e => {
                                           setSublet({...sublet, title: e.currentTarget.value})
                                       }}
                                       maxLength={50}
                                       placeholder="Listing title"
                                       readOnly={!isNewSublet()}
                                       required/>
                            </div>

                            <div className="form-element">
                                <Textarea
                                    name="description"
                                    label="Description"
                                    required={true}
                                    onChange={(e) => {
                                        setSublet({...sublet, description: e.currentTarget.value});
                                    }}
                                    placeholder="Enter a description of the rental you are subleasing"
                                    maxLength={500}
                                    value={sublet.description}
                                    readOnly={!isNewSublet()}

                                />
                            </div>
                            <br/>
                            {isNewSublet() ?
                                <>
                                    <div className="form-element">

                                        <ImageInput
                                            label="Upload Images"
                                            multiple
                                            name="imageFiles"
                                            required
                                            maxFiles={5}
                                            setFiles={data => {
                                                setFiles(data);
                                            }}
                                            error={filesError}

                                        />
                                        <div className="info"><Icon name="info">Upto 5 images. First image will be cover
                                            image.</Icon></div>
                                    </div>
                                </>
                                : ""

                            }


                            <div className="form-element">
                                {submissionMessage !== "" ?
                                    <p className="text-success message">{submissionMessage}</p> : ""}
                                {submissionErrorMessage !== "" ?
                                    <p className="text-danger message">{submissionErrorMessage}</p> : ""}
                            </div>

                            <div className="form-element form-submit">
                                {isNewSublet() ?
                                    <Button variant="primary" size="large" type="submit" disabled={submitted}>
                                        <Icon name="send" orientation="right">Submit</Icon>

                                    </Button>
                                    :
                                    <Button variant="danger" size="large" type="button" disabled={submitted}
                                            onClick={() => {
                                                setShowDeactivationModal(true)
                                            }}
                                    >
                                        <Icon name="trash" orientation="right">Delete</Icon>
                                    </Button>
                                }
                                {isSubmitting ? <Spinner size="small"/> : ""}
                            </div>

                        </form>
                    </div>

                </>
                :
                <SubletNotFound/>
            }
        </section>
    );
}

export const NEW_SUBLET = "new";

export interface SubletSectionParam {
    uniqueId: string
}
