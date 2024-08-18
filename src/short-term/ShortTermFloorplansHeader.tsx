import React, {useState} from "react";
import "./assets/ShortTermFloorplansHeader.scss";
import "../floorplan/filter/assets/FloorplanDropDown.scss";
import {Icon, Pill} from "@contentmunch/muncher-ui";
import {DefaultShortTermFilters} from "./ShortTermFloorplansSection";
import {CurrentShortTermFilters, ShortTermFilters, ShortTermSortBy} from "./data/ShortTermFilters";
import {FloorplanShortTerm, ShortTermStyle} from "./data/ShortTerm";
import {sortAndFilter} from "./service/ShortTermService";
import {BedroomFilter, sortBedrooms} from "../floorplan/section/filter/Bedroom";
import {ShortTermStyleFilter} from "./ShortTermStyleFilter";
import {capitalizeFirstLetter, enumToString} from "../utils/Utils";
import {ShortTermSort} from "./ShortTermSort";


export const ShortTermFloorplansHeader: React.FC<ShortTermFloorplansHeaderProps> = (
    {
        title,
        filters,
        floorplans,
        setCurrentFloorplans,
        isCondensed,
        currentFloorplansCount,
        defaultFloorplanStyle, defaultBedRooms, defaultMaxRent, defaultMinRent, defaultFloorplanIds
    }) => {

    const [bedroomFilters, setBedroomFilters] = useState<number[]>(defaultBedRooms ? [defaultBedRooms] : []);
    const [styleFilters, setStyleFilters] = useState<ShortTermStyle[]>(defaultFloorplanStyle ? [defaultFloorplanStyle] : []);

    const [sortBy, setSortBy] = useState<ShortTermSortBy>("priceAsc");
    const [floorplanIds, setFloorplanIds] = useState<string[]>(defaultFloorplanIds ? defaultFloorplanIds : []);

    const currentFilters: CurrentShortTermFilters = {
        bedroomFilters, styleFilters, sortBy, floorplanIds
    };

    const handleSortAndFilter = (withCurrentFilters: CurrentShortTermFilters) => {
        setCurrentFloorplans(sortAndFilter(floorplans, withCurrentFilters));
    };
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

    const handleFloorplanIdChange = (floorplanId: string) => {
        const index = floorplanIds.indexOf(floorplanId);
        const currentFloorplanIds = [...floorplanIds];
        if (index > -1) {
            currentFloorplanIds.splice(index, 1);
        }
        setFloorplanIds(currentFloorplanIds);
        handleSortAndFilter({...currentFilters, floorplanIds: currentFloorplanIds});
    };
    const handleStyleFilterChange = (filter: ShortTermStyle) => {
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
    const handleSortChange = (sortBy: ShortTermSortBy) => {
        setSortBy(sortBy);
        handleSortAndFilter({...currentFilters, sortBy: sortBy});
    }
    return (
        <header className="short-term-floorplans-header">
            <div className={isCondensed ? "" : "container"}>
                <h2>{title}</h2>
                <div className="units-filters">
                    <div className="filter-group">
                        <label className="filter-label">Filter By:</label>
                        <div className="filters">
                            <BedroomFilter filters={filters.bedroom} handleFilterChange={handleBedroomFilterChange}
                                           currentFilters={bedroomFilters}/>

                            <ShortTermStyleFilter filters={filters.style} handleFilterChange={handleStyleFilterChange}
                                                  currentFilters={styleFilters}
                            />
                        </div>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label">Sort By:</label>
                        <div className="filters">
                            <ShortTermSort sortBy={sortBy} handleSortChange={handleSortChange}/>
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
                        <Icon name="filter"/>&nbsp;Total: {currentFloorplansCount} Results
                    </div>
                </div>
            </div>
        </header>
    );
}

export interface ShortTermFloorplansHeaderProps extends DefaultShortTermFilters {
    title?: string;
    filters: ShortTermFilters;
    floorplans: FloorplanShortTerm[];
    setCurrentFloorplans: (floorplans: FloorplanShortTerm[]) => void;
    isCondensed?: boolean;
    currentFloorplansCount: number;
}
