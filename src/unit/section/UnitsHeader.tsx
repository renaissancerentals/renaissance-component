import React, {useState} from "react";
import "./assets/UnitsHeader.scss";
import {Icon, Pill, Range} from "@contentmunch/muncher-ui";
import {capitalizeFirstLetter, enumToString} from "../../utils/Utils";
import {SortBy} from "../../data/SortField";
import {DefaultFloorplanFilters} from "../../floorplan/section/FloorplansSection";
import {UnitCardData} from "../data/Unit";
import {defaultAvailabilityToMonthYear} from "../../floorplan/service/FloorplanService";
import {FloorplanStyle, MAX_RENT, MIN_RENT} from "../../floorplan/data/Floorplan";
import {CurrentFloorplanFilters, FloorplanFilters} from "../../floorplan/data/FloorplanFilters";
import {sortAndFilterUnits} from "../service/UnitService";
import {BedroomFilter, sortBedrooms} from "../../floorplan/section/filter/Bedroom";
import {AvailabilityFilter, sortAvailability} from "../../floorplan/section/filter/Availability";
import {PriceFilter} from "../../floorplan/section/filter/Price";
import {StyleFilter} from "../../floorplan/section/filter/Style";
import {Sort} from "../../floorplan/section/filter/Sort";

export const UnitsHeader: React.FC<UnitsHeaderProps> = (
    {
        title,
        filters,
        units,
        setCurrentUnits,
        isCondensed,
        currentUnitCounts,
        defaultFloorplanStyle, defaultBedRooms, defaultAvailability, defaultMaxRent, defaultMinRent, defaultFloorplanIds
    }) => {

    const [bedroomFilters, setBedroomFilters] = useState<number[]>(defaultBedRooms ? [defaultBedRooms] : []);
    const [availabilityFilters, setAvailabilityFilters] = useState<string[]>(defaultAvailability ? [defaultAvailabilityToMonthYear(defaultAvailability)] : []);
    const [styleFilters, setStyleFilters] = useState<FloorplanStyle[]>(defaultFloorplanStyle ? [defaultFloorplanStyle] : []);
    const [minRent, setMinRent] = useState<number>(defaultMinRent ? defaultMinRent : MIN_RENT);
    const [maxRent, setMaxRent] = useState<number>(defaultMaxRent ? defaultMaxRent : MAX_RENT);
    const [sortBy, setSortBy] = useState<SortBy>("featured");
    const [floorplanIds, setFloorplanIds] = useState<string[]>(defaultFloorplanIds ? defaultFloorplanIds : []);

    const currentFilters: CurrentFloorplanFilters = {
        bedroomFilters, availabilityFilters, styleFilters, minRent, maxRent, sortBy, floorplanIds
    };

    const handleSortAndFilter = (withCurrentFilters: CurrentFloorplanFilters) => {
        setCurrentUnits(sortAndFilterUnits(units, withCurrentFilters));
    };
    const handleMinRentChange = (rent: number) => {
        setMinRent(rent);
        handleSortAndFilter({...currentFilters, minRent: rent});
    }
    const handleMaxRentChange = (rent: number) => {
        setMaxRent(rent);
        handleSortAndFilter({...currentFilters, maxRent: rent});
    }
    const handleBedroomFilterChange = (filter: number) => {
        const index = bedroomFilters.indexOf(filter);
        const currentBedroomFilters = [...bedroomFilters];
        if (index > -1) {
            currentBedroomFilters.splice(index, 1);
        } else {
            currentBedroomFilters.push(filter);
        }
        setBedroomFilters(currentBedroomFilters);
        handleSortAndFilter({...currentFilters, bedroomFilters: currentBedroomFilters});
    };
    const handleAvailabilityFilterChange = (filter: string) => {
        const index = availabilityFilters.indexOf(filter);
        const currentAvailabilityFilters = [...availabilityFilters];
        if (index > -1) {
            currentAvailabilityFilters.splice(index, 1);
        } else {
            currentAvailabilityFilters.push(filter);
        }
        setAvailabilityFilters(currentAvailabilityFilters);
        handleSortAndFilter({...currentFilters, availabilityFilters: currentAvailabilityFilters});
    };
    const handleFloorplanIdChange = (floorplanId: string) => {
        const index = floorplanIds.indexOf(floorplanId);
        const currentFloorplanIds = [...floorplanIds];
        if (index > -1) {
            currentFloorplanIds.splice(index, 1);
        }
        setFloorplanIds(currentFloorplanIds);
        handleSortAndFilter({...currentFilters, floorplanIds: currentFloorplanIds});
    };
    const handlePriceChange = (range: Range) => {
        setMinRent(range.min);
        setMaxRent(range.max);
        handleSortAndFilter({...currentFilters, minRent: range.min, maxRent: range.max});
    }
    const handleStyleFilterChange = (filter: FloorplanStyle) => {
        const index = styleFilters.indexOf(filter);
        const currentSyleFilters = [...styleFilters];
        if (index > -1) {
            currentSyleFilters.splice(index, 1);
        } else {
            currentSyleFilters.push(filter);
        }
        setStyleFilters(currentSyleFilters);
        handleSortAndFilter({...currentFilters, styleFilters: currentSyleFilters});
    };
    const handleSortChange = (sortBy: SortBy) => {
        setSortBy(sortBy);
        handleSortAndFilter({...currentFilters, sortBy: sortBy});
    }
    return (
        <header className="units-header">
            <div className={isCondensed ? "" : "container"}>
                <h2>{title}</h2>
                <div className="units-filters">
                    <div className="filter-group">
                        <label className="filter-label">Filter By:</label>
                        <div className="filters">
                            <BedroomFilter filters={filters.bedroom} handleFilterChange={handleBedroomFilterChange}
                                           currentFilters={bedroomFilters}/>
                            <AvailabilityFilter filters={filters.availability}
                                                handleFilterChange={handleAvailabilityFilterChange}
                                                currentFilters={availabilityFilters}/>

                            <PriceFilter minValue={minRent} maxValue={maxRent} setMinValue={handleMinRentChange}
                                         setMaxValue={handleMaxRentChange}/>
                            <StyleFilter filters={filters.style} handleFilterChange={handleStyleFilterChange}
                                         currentFilters={styleFilters}
                            />
                        </div>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label">Sort By:</label>
                        <div className="filters">
                            <Sort sortBy={sortBy} handleSortChange={handleSortChange}/>
                        </div>
                    </div>
                </div>
                <div className="pills">
                    {bedroomFilters.sort(sortBedrooms).map(bedroom => (
                        <Pill key={bedroom} pillCloseHandler={() => {
                            handleBedroomFilterChange(bedroom)
                        }}>
                            {bedroom + " bedroom"}
                        </Pill>
                    ))}
                    {availabilityFilters.sort(sortAvailability).map((availability: string) => (
                        <Pill key={availability.toString()} pillCloseHandler={() => {
                            handleAvailabilityFilterChange(availability)
                        }}>
                            {availability.toString() + " availability"}
                        </Pill>
                    ))}
                    {
                        minRent === MIN_RENT && maxRent === MAX_RENT ? "" :
                            <Pill key="rent" pillCloseHandler={() => {
                                handlePriceChange({
                                    min: MIN_RENT,
                                    max: MAX_RENT
                                })
                            }}>
                                {"$" + minRent + " - $" + maxRent}
                            </Pill>
                    }
                    {styleFilters.map(style => (
                        <Pill key={style} pillCloseHandler={() => {
                            handleStyleFilterChange(style)
                        }}>
                            {capitalizeFirstLetter(enumToString(style))}
                        </Pill>
                    ))}
                    {floorplanIds.sort().map(floorplanId => (
                        <Pill key={floorplanId} pillCloseHandler={() => {
                            handleFloorplanIdChange(floorplanId)
                        }}>
                            {floorplanId}
                        </Pill>
                    ))}
                    <div className="filter-result">
                        <Icon name="filter"/>&nbsp;Total: {currentUnitCounts} Results
                    </div>
                </div>
            </div>
        </header>
    );
}

export interface UnitsHeaderProps extends DefaultFloorplanFilters {
    title?: string;
    filters: FloorplanFilters;
    units: UnitCardData[];
    setCurrentUnits: (units: UnitCardData[]) => void;
    isCondensed?: boolean;
    currentUnitCounts: number;
}
