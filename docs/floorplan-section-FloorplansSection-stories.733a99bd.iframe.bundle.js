"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[6798],{"./src/floorplan/section/FloorplansSection.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AvailableNowFilter:()=>AvailableNowFilter,Default:()=>Default,WithFilters:()=>WithFilters,WithFloorplanIds:()=>WithFloorplanIds,__namedExportsOrder:()=>__namedExportsOrder,default:()=>FloorplansSection_stories});var react=__webpack_require__("./node_modules/react/index.js"),FloorplanService=__webpack_require__("./src/floorplan/service/FloorplanService.ts"),dist=(__webpack_require__("./src/floorplan/filter/assets/FloorplanDropDown.scss"),__webpack_require__("./node_modules/react-loading-skeleton/dist/index.js")),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FloorplansHeaderSkeleton=_ref=>{let{isCondensed}=_ref;return(0,jsx_runtime.jsx)("header",{className:"units-header",children:(0,jsx_runtime.jsxs)("div",{className:isCondensed?"":"container",children:[(0,jsx_runtime.jsx)("h2",{children:(0,jsx_runtime.jsx)(dist.Z,{})}),(0,jsx_runtime.jsxs)("div",{className:"units-filters",children:[(0,jsx_runtime.jsx)("div",{className:"filter-group",children:(0,jsx_runtime.jsxs)("div",{className:"filters",children:[(0,jsx_runtime.jsx)(dist.Z,{}),(0,jsx_runtime.jsx)(dist.Z,{}),(0,jsx_runtime.jsx)(dist.Z,{}),(0,jsx_runtime.jsx)(dist.Z,{})]})}),(0,jsx_runtime.jsx)("div",{className:"filter-group",children:(0,jsx_runtime.jsx)(dist.Z,{})})]})]})})};try{FloorplansHeaderSkeleton.displayName="FloorplansHeaderSkeleton",FloorplansHeaderSkeleton.__docgenInfo={description:"",displayName:"FloorplansHeaderSkeleton",props:{isCondensed:{defaultValue:null,description:"",name:"isCondensed",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/section/FloorplansHeaderSekeleton.tsx#FloorplansHeaderSkeleton"]={docgenInfo:FloorplansHeaderSkeleton.__docgenInfo,name:"FloorplansHeaderSkeleton",path:"src/floorplan/section/FloorplansHeaderSekeleton.tsx#FloorplansHeaderSkeleton"})}catch(__react_docgen_typescript_loader_error){}var FloorplanCardSkeleton=__webpack_require__("./src/floorplan/card/FloorplanCardSkeleton.tsx");const FloorplanSectionSkeleton=_ref=>{let{isCondensed,skeletonCount}=_ref;return(0,jsx_runtime.jsx)("section",{className:"section-floorplans",children:(0,jsx_runtime.jsxs)("div",{className:isCondensed?"container":"",children:[(0,jsx_runtime.jsx)(FloorplansHeaderSkeleton,{isCondensed}),(0,jsx_runtime.jsx)("div",{className:isCondensed?"":"container",children:(0,jsx_runtime.jsx)("div",{className:"floorplans-body",children:[...Array(skeletonCount)].map(((_,i)=>(0,jsx_runtime.jsx)(FloorplanCardSkeleton.V,{},i)))})})]})})};FloorplanSectionSkeleton.defaultProps={isCondensed:!0,skeletonCount:8};try{FloorplanSectionSkeleton.displayName="FloorplanSectionSkeleton",FloorplanSectionSkeleton.__docgenInfo={description:"",displayName:"FloorplanSectionSkeleton",props:{isCondensed:{defaultValue:{value:"true"},description:"",name:"isCondensed",required:!1,type:{name:"boolean"}},skeletonCount:{defaultValue:{value:"8"},description:"",name:"skeletonCount",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/section/FloorplanSectionSkeleton.tsx#FloorplanSectionSkeleton"]={docgenInfo:FloorplanSectionSkeleton.__docgenInfo,name:"FloorplanSectionSkeleton",path:"src/floorplan/section/FloorplanSectionSkeleton.tsx#FloorplanSectionSkeleton"})}catch(__react_docgen_typescript_loader_error){}var Floorplan=__webpack_require__("./src/floorplan/data/Floorplan.ts"),lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),Bedroom=__webpack_require__("./src/floorplan/section/filter/Bedroom.tsx"),filter_FloorplanDropDown=__webpack_require__("./src/floorplan/filter/FloorplanDropDown.tsx"),moment=__webpack_require__("./node_modules/moment/moment.js"),moment_default=__webpack_require__.n(moment);const sortAvailability=(a,b)=>moment_default()(a,"MMM YYYY").diff(moment_default()(b,"MMM YYYY")),AvailabilityFilter=_ref=>{let{filters,handleFilterChange,currentFilters}=_ref;return(0,jsx_runtime.jsx)(filter_FloorplanDropDown.r,{label:"Availability",children:Array.from(filters.keys()).sort(sortAvailability).map((filter=>(0,jsx_runtime.jsx)(lib.Checkbox,{label:filter.toString(),name:filter.toString(),onChange:()=>{handleFilterChange(filter)},checked:()=>currentFilters.indexOf(filter)>-1},filter.toString())))})};try{AvailabilityFilter.displayName="AvailabilityFilter",AvailabilityFilter.__docgenInfo={description:"",displayName:"AvailabilityFilter",props:{filters:{defaultValue:null,description:"",name:"filters",required:!0,type:{name:"Set<string>"}},handleFilterChange:{defaultValue:null,description:"",name:"handleFilterChange",required:!0,type:{name:"(filter: string) => void"}},currentFilters:{defaultValue:null,description:"",name:"currentFilters",required:!0,type:{name:"string[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/section/filter/Availability.tsx#AvailabilityFilter"]={docgenInfo:AvailabilityFilter.__docgenInfo,name:"AvailabilityFilter",path:"src/floorplan/section/filter/Availability.tsx#AvailabilityFilter"})}catch(__react_docgen_typescript_loader_error){}const PriceFilter=_ref=>{let{minValue,maxValue,setMinValue,setMaxValue}=_ref;return(0,jsx_runtime.jsx)("div",{className:"price-dropdown",children:(0,jsx_runtime.jsx)(filter_FloorplanDropDown.r,{label:"Price",drop:"middle",children:(0,jsx_runtime.jsx)("div",{className:"price-dropdown-content",children:(0,jsx_runtime.jsx)(lib.RangeSlider,{min:Floorplan.xt,max:Floorplan.Dp,setMaxValue,setMinValue,minValue,maxValue})})})})};try{PriceFilter.displayName="PriceFilter",PriceFilter.__docgenInfo={description:"",displayName:"PriceFilter",props:{minValue:{defaultValue:null,description:"",name:"minValue",required:!0,type:{name:"number"}},maxValue:{defaultValue:null,description:"",name:"maxValue",required:!0,type:{name:"number"}},setMinValue:{defaultValue:null,description:"",name:"setMinValue",required:!0,type:{name:"(num: number) => void"}},setMaxValue:{defaultValue:null,description:"",name:"setMaxValue",required:!0,type:{name:"(num: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/section/filter/Price.tsx#PriceFilter"]={docgenInfo:PriceFilter.__docgenInfo,name:"PriceFilter",path:"src/floorplan/section/filter/Price.tsx#PriceFilter"})}catch(__react_docgen_typescript_loader_error){}var Utils=__webpack_require__("./src/utils/Utils.ts");const StyleFilter=_ref=>{let{filters,handleFilterChange,currentFilters}=_ref;return(0,jsx_runtime.jsx)(filter_FloorplanDropDown.r,{label:"Home Type",children:Array.from(filters.keys()).map((filter=>(0,jsx_runtime.jsx)(lib.Checkbox,{label:(0,Utils.fm)((0,Utils.gq)(filter)),name:filter,onChange:()=>{handleFilterChange(filter)},checked:()=>currentFilters.indexOf(filter)>-1},filter)))})};try{StyleFilter.displayName="StyleFilter",StyleFilter.__docgenInfo={description:"",displayName:"StyleFilter",props:{filters:{defaultValue:null,description:"",name:"filters",required:!0,type:{name:"Set<FloorplanStyle>"}},handleFilterChange:{defaultValue:null,description:"",name:"handleFilterChange",required:!0,type:{name:"(filter: FloorplanStyle) => void"}},currentFilters:{defaultValue:null,description:"",name:"currentFilters",required:!0,type:{name:"string[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/section/filter/Style.tsx#StyleFilter"]={docgenInfo:StyleFilter.__docgenInfo,name:"StyleFilter",path:"src/floorplan/section/filter/Style.tsx#StyleFilter"})}catch(__react_docgen_typescript_loader_error){}var FloorplanFilters=__webpack_require__("./src/floorplan/data/FloorplanFilters.tsx");const Sort=_ref=>{let{sortBy,handleSortChange}=_ref;const[showSortDropDown,setShowSortDropDown]=(0,react.useState)(!1);return(0,jsx_runtime.jsx)("div",{className:"unit-dropdown",children:(0,jsx_runtime.jsx)(lib.DropdownButton,{element:(0,jsx_runtime.jsxs)("h5",{children:[FloorplanFilters.Z[sortBy].element,"  ",(0,jsx_runtime.jsx)("span",{className:"small",children:"▼"})]}),showContent:showSortDropDown,setShowContent:setShowSortDropDown,size:"medium",variant:"primary",drop:"left",children:(0,jsx_runtime.jsx)("div",{className:"sort-filters",children:Object.keys(FloorplanFilters.Z).map((sortField=>(0,jsx_runtime.jsx)(lib.Button,{active:sortBy===sortField,onClick:()=>{handleSortChange(sortField),setShowSortDropDown(!1)},children:FloorplanFilters.Z[sortField].element},sortField)))})})})};try{Sort.displayName="Sort",Sort.__docgenInfo={description:"",displayName:"Sort",props:{sortBy:{defaultValue:null,description:"",name:"sortBy",required:!0,type:{name:"string | number"}},handleSortChange:{defaultValue:null,description:"",name:"handleSortChange",required:!0,type:{name:"(sortBy: string | number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/section/filter/Sort.tsx#Sort"]={docgenInfo:Sort.__docgenInfo,name:"Sort",path:"src/floorplan/section/filter/Sort.tsx#Sort"})}catch(__react_docgen_typescript_loader_error){}const FloorplansHeader_FloorplansHeader=_ref=>{let{title,filters,floorplans,setCurrentFloorplans,isCondensed,currentFloorplansCount,defaultFloorplanStyle,defaultBedRooms,defaultAvailability,defaultMaxRent,defaultMinRent,defaultFloorplanIds}=_ref;const[bedroomFilters,setBedroomFilters]=(0,react.useState)(defaultBedRooms?[defaultBedRooms]:[]),[availabilityFilters,setAvailabilityFilters]=(0,react.useState)(defaultAvailability?[(0,FloorplanService.qZ)(defaultAvailability)]:[]),[styleFilters,setStyleFilters]=(0,react.useState)(defaultFloorplanStyle?[defaultFloorplanStyle]:[]),[minRent,setMinRent]=(0,react.useState)(defaultMinRent||Floorplan.xt),[maxRent,setMaxRent]=(0,react.useState)(defaultMaxRent||Floorplan.Dp),[sortBy,setSortBy]=(0,react.useState)("featured"),[floorplanIds,setFloorplanIds]=(0,react.useState)(defaultFloorplanIds||[]),currentFilters={bedroomFilters,availabilityFilters,styleFilters,minRent,maxRent,sortBy,floorplanIds},handleSortAndFilter=withCurrentFilters=>{setCurrentFloorplans((0,FloorplanService.UW)(floorplans,withCurrentFilters))},handleBedroomFilterChange=filter=>{const index=bedroomFilters.indexOf(filter),currentBedroomFilters=[...bedroomFilters];index>-1?currentBedroomFilters.splice(index,1):currentBedroomFilters.push(filter),setBedroomFilters(currentBedroomFilters),handleSortAndFilter({...currentFilters,bedroomFilters:currentBedroomFilters})},handleAvailabilityFilterChange=filter=>{const index=availabilityFilters.indexOf(filter),currentAvailabilityFilters=[...availabilityFilters];index>-1?currentAvailabilityFilters.splice(index,1):currentAvailabilityFilters.push(filter),setAvailabilityFilters(currentAvailabilityFilters),handleSortAndFilter({...currentFilters,availabilityFilters:currentAvailabilityFilters})},handleStyleFilterChange=filter=>{const index=styleFilters.indexOf(filter),currentSyleFilters=[...styleFilters];index>-1?currentSyleFilters.splice(index,1):currentSyleFilters.push(filter),setStyleFilters(currentSyleFilters),handleSortAndFilter({...currentFilters,styleFilters:currentSyleFilters})};return(0,jsx_runtime.jsx)("header",{className:"units-header",children:(0,jsx_runtime.jsxs)("div",{className:isCondensed?"":"container",children:[(0,jsx_runtime.jsx)("h2",{children:title}),(0,jsx_runtime.jsxs)("div",{className:"units-filters",children:[(0,jsx_runtime.jsxs)("div",{className:"filter-group",children:[(0,jsx_runtime.jsx)("label",{className:"filter-label",children:"Filter By:"}),(0,jsx_runtime.jsxs)("div",{className:"filters",children:[(0,jsx_runtime.jsx)(Bedroom.h,{filters:filters.bedroom,handleFilterChange:handleBedroomFilterChange,currentFilters:bedroomFilters}),(0,jsx_runtime.jsx)(AvailabilityFilter,{filters:filters.availability,handleFilterChange:handleAvailabilityFilterChange,currentFilters:availabilityFilters}),(0,jsx_runtime.jsx)(PriceFilter,{minValue:minRent,maxValue:maxRent,setMinValue:rent=>{setMinRent(rent),handleSortAndFilter({...currentFilters,minRent:rent})},setMaxValue:rent=>{setMaxRent(rent),handleSortAndFilter({...currentFilters,maxRent:rent})}}),(0,jsx_runtime.jsx)(StyleFilter,{filters:filters.style,handleFilterChange:handleStyleFilterChange,currentFilters:styleFilters})]})]}),(0,jsx_runtime.jsxs)("div",{className:"filter-group",children:[(0,jsx_runtime.jsx)("label",{className:"filter-label",children:"Sort By:"}),(0,jsx_runtime.jsx)("div",{className:"filters",children:(0,jsx_runtime.jsx)(Sort,{sortBy,handleSortChange:sortBy=>{setSortBy(sortBy),handleSortAndFilter({...currentFilters,sortBy})}})})]})]}),(0,jsx_runtime.jsxs)("div",{className:"pills",children:[bedroomFilters.sort(Bedroom.y).map((bedroom=>(0,jsx_runtime.jsx)(lib.Pill,{pillCloseHandler:()=>{handleBedroomFilterChange(bedroom)},children:bedroom+" bedroom"},bedroom))),availabilityFilters.sort(sortAvailability).map((availability=>(0,jsx_runtime.jsx)(lib.Pill,{pillCloseHandler:()=>{handleAvailabilityFilterChange(availability)},children:availability.toString()+" availability"},availability.toString()))),minRent===Floorplan.xt&&maxRent===Floorplan.Dp?"":(0,jsx_runtime.jsx)(lib.Pill,{pillCloseHandler:()=>{var range;range={min:Floorplan.xt,max:Floorplan.Dp},setMinRent(range.min),setMaxRent(range.max),handleSortAndFilter({...currentFilters,minRent:range.min,maxRent:range.max})},children:"$"+minRent+" - $"+maxRent},"rent"),styleFilters.map((style=>(0,jsx_runtime.jsx)(lib.Pill,{pillCloseHandler:()=>{handleStyleFilterChange(style)},children:(0,Utils.fm)((0,Utils.gq)(style))},style))),floorplanIds.sort().map((floorplanId=>(0,jsx_runtime.jsx)(lib.Pill,{pillCloseHandler:()=>{(floorplanId=>{const index=floorplanIds.indexOf(floorplanId),currentFloorplanIds=[...floorplanIds];index>-1&&currentFloorplanIds.splice(index,1),setFloorplanIds(currentFloorplanIds),handleSortAndFilter({...currentFilters,floorplanIds:currentFloorplanIds})})(floorplanId)},children:floorplanId},floorplanId))),(0,jsx_runtime.jsxs)("div",{className:"filter-result",children:[(0,jsx_runtime.jsx)(lib.Icon,{name:"filter"})," Total: ",currentFloorplansCount," Results"]})]})]})})};try{FloorplansHeader_FloorplansHeader.displayName="FloorplansHeader",FloorplansHeader_FloorplansHeader.__docgenInfo={description:"",displayName:"FloorplansHeader",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},filters:{defaultValue:null,description:"",name:"filters",required:!0,type:{name:"FloorplanFilters"}},floorplans:{defaultValue:null,description:"",name:"floorplans",required:!0,type:{name:"FloorplanCardData[]"}},setCurrentFloorplans:{defaultValue:null,description:"",name:"setCurrentFloorplans",required:!0,type:{name:"(floorplans: FloorplanCardData[]) => void"}},isCondensed:{defaultValue:null,description:"",name:"isCondensed",required:!1,type:{name:"boolean"}},currentFloorplansCount:{defaultValue:null,description:"",name:"currentFloorplansCount",required:!0,type:{name:"number"}},defaultBedRooms:{defaultValue:null,description:"",name:"defaultBedRooms",required:!1,type:{name:"number"}},defaultAvailability:{defaultValue:null,description:"",name:"defaultAvailability",required:!1,type:{name:"string"}},defaultFloorplanStyle:{defaultValue:null,description:"",name:"defaultFloorplanStyle",required:!1,type:{name:"enum",value:[{value:'"STUDIO"'},{value:'"APARTMENT"'},{value:'"DELUXE_APARTMENT"'},{value:'"TOWN_HOME"'},{value:'"SINGLE_FAMILY"'},{value:'"GARAGE"'}]}},defaultMinRent:{defaultValue:null,description:"",name:"defaultMinRent",required:!1,type:{name:"number"}},defaultMaxRent:{defaultValue:null,description:"",name:"defaultMaxRent",required:!1,type:{name:"number"}},defaultFloorplanIds:{defaultValue:null,description:"",name:"defaultFloorplanIds",required:!1,type:{name:"string[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/section/FloorplansHeader.tsx#FloorplansHeader"]={docgenInfo:FloorplansHeader_FloorplansHeader.__docgenInfo,name:"FloorplansHeader",path:"src/floorplan/section/FloorplansHeader.tsx#FloorplansHeader"})}catch(__react_docgen_typescript_loader_error){}var FloorplanCard=__webpack_require__("./src/floorplan/card/FloorplanCard.tsx"),VideoModal=__webpack_require__("./src/asset/VideoModal.tsx");const FloorplansSection_FloorplansSection=_ref=>{let{floorplans,title,isCondensed,propertyId,defaultFloorplanStyle,defaultBedRooms,defaultAvailability,defaultMaxRent,defaultMinRent,defaultFloorplanIds}=_ref;const[filteredFloorplans,setFilteredFloorplans]=(0,react.useState)((0,FloorplanService.UW)(floorplans,{bedroomFilters:defaultBedRooms?[defaultBedRooms]:[],availabilityFilters:defaultAvailability?[(0,FloorplanService.qZ)(defaultAvailability)]:[],styleFilters:defaultFloorplanStyle?[defaultFloorplanStyle]:[],minRent:defaultMinRent||Floorplan.xt,maxRent:defaultMaxRent||Floorplan.Dp,sortBy:"featured",floorplanIds:defaultFloorplanIds||[]})),[showVideoModal,setShowVideoModal]=(0,react.useState)(!1),[video,setVideo]=(0,react.useState)({}),handleVideoClicked=data=>{setVideo(data),setShowVideoModal(!0)};return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)("section",{className:"section-floorplans",children:[(0,jsx_runtime.jsx)(VideoModal.K,{video,showModal:showVideoModal,setShowModal:setShowVideoModal}),(0,jsx_runtime.jsxs)("div",{className:isCondensed?"container":"",children:[(0,jsx_runtime.jsx)(FloorplansHeader_FloorplansHeader,{title,filters:(0,FloorplanService.IW)(floorplans),floorplans,setCurrentFloorplans:currentFloorplans=>{setFilteredFloorplans(currentFloorplans)},isCondensed,currentFloorplansCount:filteredFloorplans.length,defaultFloorplanStyle,defaultBedRooms,defaultAvailability,defaultMaxRent,defaultMinRent,defaultFloorplanIds}),(0,jsx_runtime.jsx)("div",{className:isCondensed?"":"container",children:(0,jsx_runtime.jsx)("div",{className:"floorplans-body",children:0===filteredFloorplans.length?(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)("p",{className:"floorplan-banner",children:"No matches found..."})}):filteredFloorplans.map(((floorplan,i)=>(0,jsx_runtime.jsx)(FloorplanCard.J,{floorplan,propertyId,videoClickHandler:handleVideoClicked},i)))})})]})]})})};FloorplansSection_FloorplansSection.defaultProps={title:"Floor plans",isCondensed:!0};try{FloorplansSection_FloorplansSection.displayName="FloorplansSection",FloorplansSection_FloorplansSection.__docgenInfo={description:"",displayName:"FloorplansSection",props:{floorplans:{defaultValue:null,description:"",name:"floorplans",required:!0,type:{name:"FloorplanCardData[]"}},title:{defaultValue:{value:"Floor plans"},description:"",name:"title",required:!1,type:{name:"string"}},isCondensed:{defaultValue:{value:"true"},description:"",name:"isCondensed",required:!1,type:{name:"boolean"}},propertyId:{defaultValue:null,description:"",name:"propertyId",required:!0,type:{name:"string"}},defaultBedRooms:{defaultValue:null,description:"",name:"defaultBedRooms",required:!1,type:{name:"number"}},defaultAvailability:{defaultValue:null,description:"",name:"defaultAvailability",required:!1,type:{name:"string"}},defaultFloorplanStyle:{defaultValue:null,description:"",name:"defaultFloorplanStyle",required:!1,type:{name:"enum",value:[{value:'"STUDIO"'},{value:'"APARTMENT"'},{value:'"DELUXE_APARTMENT"'},{value:'"TOWN_HOME"'},{value:'"SINGLE_FAMILY"'},{value:'"GARAGE"'}]}},defaultMinRent:{defaultValue:null,description:"",name:"defaultMinRent",required:!1,type:{name:"number"}},defaultMaxRent:{defaultValue:null,description:"",name:"defaultMaxRent",required:!1,type:{name:"number"}},defaultFloorplanIds:{defaultValue:null,description:"",name:"defaultFloorplanIds",required:!1,type:{name:"string[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/section/FloorplansSection.tsx#FloorplansSection"]={docgenInfo:FloorplansSection_FloorplansSection.__docgenInfo,name:"FloorplansSection",path:"src/floorplan/section/FloorplansSection.tsx#FloorplansSection"})}catch(__react_docgen_typescript_loader_error){}const FloorplansSection_stories={title:"Section/FloorplansSection",component:FloorplansSection_FloorplansSection},Template=args=>{const[floorplans,setFloorplans]=(0,react.useState)([]),[isLoading,setIsLoading]=(0,react.useState)(!0);return(0,react.useEffect)((()=>{(0,FloorplanService.Lz)().then((properties=>{const floorplans=[];properties.forEach((property=>{property.floorplans.forEach((floorplan=>{floorplans.push(floorplan)}))})),setFloorplans((0,FloorplanService.qq)(floorplans,"featured"))})).finally((()=>{setIsLoading(!1)}))}),[]),isLoading?(0,jsx_runtime.jsx)(FloorplanSectionSkeleton,{}):(0,jsx_runtime.jsx)(FloorplansSection_FloorplansSection,{...args,floorplans,propertyId:"verona-park"})},Default=Template.bind({}),WithFilters=Template.bind({});WithFilters.args={defaultAvailability:moment_default()().add(1,"month").format("MM-YYYY"),propertyId:"verona-park"};const AvailableNowFilter=Template.bind({});AvailableNowFilter.args={defaultAvailability:FloorplanService.Gk};const WithFloorplanIds=Template.bind({});WithFloorplanIds.args={defaultFloorplanIds:["blair-flat","crestone","capri","3335ec"],propertyId:"verona-park"},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => {\n  const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);\n  const [isLoading, setIsLoading] = useState<boolean>(true);\n  useEffect(() => {\n    getAllPropertyFilterData().then(properties => {\n      const floorplans: FloorplanCardData[] = [];\n      properties.forEach(property => {\n        property.floorplans.forEach(floorplan => {\n          floorplans.push(floorplan);\n        });\n      });\n      setFloorplans(sortFloorplans(floorplans, "featured"));\n    })\n    // getFloorplansFilterData("verona-park").then(floorplans => {\n    //\n    //     const sortedFloorplans = sortFloorplans(floorplans, "featured");\n    //     setFloorplans(sortedFloorplans);\n    //\n    // })\n    .finally(() => {\n      setIsLoading(false);\n    });\n  }, []);\n  return isLoading ? <FloorplanSectionSkeleton /> : <FloorplansSection {...args} floorplans={floorplans} propertyId="verona-park" />;\n}',...Default.parameters?.docs?.source}}},WithFilters.parameters={...WithFilters.parameters,docs:{...WithFilters.parameters?.docs,source:{originalSource:'args => {\n  const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);\n  const [isLoading, setIsLoading] = useState<boolean>(true);\n  useEffect(() => {\n    getAllPropertyFilterData().then(properties => {\n      const floorplans: FloorplanCardData[] = [];\n      properties.forEach(property => {\n        property.floorplans.forEach(floorplan => {\n          floorplans.push(floorplan);\n        });\n      });\n      setFloorplans(sortFloorplans(floorplans, "featured"));\n    })\n    // getFloorplansFilterData("verona-park").then(floorplans => {\n    //\n    //     const sortedFloorplans = sortFloorplans(floorplans, "featured");\n    //     setFloorplans(sortedFloorplans);\n    //\n    // })\n    .finally(() => {\n      setIsLoading(false);\n    });\n  }, []);\n  return isLoading ? <FloorplanSectionSkeleton /> : <FloorplansSection {...args} floorplans={floorplans} propertyId="verona-park" />;\n}',...WithFilters.parameters?.docs?.source}}},AvailableNowFilter.parameters={...AvailableNowFilter.parameters,docs:{...AvailableNowFilter.parameters?.docs,source:{originalSource:'args => {\n  const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);\n  const [isLoading, setIsLoading] = useState<boolean>(true);\n  useEffect(() => {\n    getAllPropertyFilterData().then(properties => {\n      const floorplans: FloorplanCardData[] = [];\n      properties.forEach(property => {\n        property.floorplans.forEach(floorplan => {\n          floorplans.push(floorplan);\n        });\n      });\n      setFloorplans(sortFloorplans(floorplans, "featured"));\n    })\n    // getFloorplansFilterData("verona-park").then(floorplans => {\n    //\n    //     const sortedFloorplans = sortFloorplans(floorplans, "featured");\n    //     setFloorplans(sortedFloorplans);\n    //\n    // })\n    .finally(() => {\n      setIsLoading(false);\n    });\n  }, []);\n  return isLoading ? <FloorplanSectionSkeleton /> : <FloorplansSection {...args} floorplans={floorplans} propertyId="verona-park" />;\n}',...AvailableNowFilter.parameters?.docs?.source}}},WithFloorplanIds.parameters={...WithFloorplanIds.parameters,docs:{...WithFloorplanIds.parameters?.docs,source:{originalSource:'args => {\n  const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);\n  const [isLoading, setIsLoading] = useState<boolean>(true);\n  useEffect(() => {\n    getAllPropertyFilterData().then(properties => {\n      const floorplans: FloorplanCardData[] = [];\n      properties.forEach(property => {\n        property.floorplans.forEach(floorplan => {\n          floorplans.push(floorplan);\n        });\n      });\n      setFloorplans(sortFloorplans(floorplans, "featured"));\n    })\n    // getFloorplansFilterData("verona-park").then(floorplans => {\n    //\n    //     const sortedFloorplans = sortFloorplans(floorplans, "featured");\n    //     setFloorplans(sortedFloorplans);\n    //\n    // })\n    .finally(() => {\n      setIsLoading(false);\n    });\n  }, []);\n  return isLoading ? <FloorplanSectionSkeleton /> : <FloorplansSection {...args} floorplans={floorplans} propertyId="verona-park" />;\n}',...WithFloorplanIds.parameters?.docs?.source}}};const __namedExportsOrder=["Default","WithFilters","AvailableNowFilter","WithFloorplanIds"]},"./src/floorplan/filter/assets/FloorplanDropDown.scss":()=>{},"./node_modules/react-loading-skeleton/dist/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const SkeletonThemeContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({}),defaultEnableAnimation=!0;function styleOptionsToCssProperties({baseColor,highlightColor,width,height,borderRadius,circle,direction,duration,enableAnimation=defaultEnableAnimation}){const style={};return"rtl"===direction&&(style["--animation-direction"]="reverse"),"number"==typeof duration&&(style["--animation-duration"]=`${duration}s`),enableAnimation||(style["--pseudo-element-display"]="none"),"string"!=typeof width&&"number"!=typeof width||(style.width=width),"string"!=typeof height&&"number"!=typeof height||(style.height=height),"string"!=typeof borderRadius&&"number"!=typeof borderRadius||(style.borderRadius=borderRadius),circle&&(style.borderRadius="50%"),void 0!==baseColor&&(style["--base-color"]=baseColor),void 0!==highlightColor&&(style["--highlight-color"]=highlightColor),style}function Skeleton({count=1,wrapper:Wrapper,className:customClassName,containerClassName,containerTestId,circle=!1,style:styleProp,...originalPropsStyleOptions}){var _a,_b,_c;const contextStyleOptions=react__WEBPACK_IMPORTED_MODULE_0__.useContext(SkeletonThemeContext),propsStyleOptions={...originalPropsStyleOptions};for(const[key,value]of Object.entries(originalPropsStyleOptions))void 0===value&&delete propsStyleOptions[key];const styleOptions={...contextStyleOptions,...propsStyleOptions,circle},style={...styleProp,...styleOptionsToCssProperties(styleOptions)};let className="react-loading-skeleton";customClassName&&(className+=` ${customClassName}`);const inline=null!==(_a=styleOptions.inline)&&void 0!==_a&&_a,elements=[],countCeil=Math.ceil(count);for(let i=0;i<countCeil;i++){let thisStyle=style;if(countCeil>count&&i===countCeil-1){const width=null!==(_b=thisStyle.width)&&void 0!==_b?_b:"100%",fractionalPart=count%1,fractionalWidth="number"==typeof width?width*fractionalPart:`calc(${width} * ${fractionalPart})`;thisStyle={...thisStyle,width:fractionalWidth}}const skeletonSpan=react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className,style:thisStyle,key:i},"‌");inline?elements.push(skeletonSpan):elements.push(react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{key:i},skeletonSpan,react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null)))}return react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:containerClassName,"data-testid":containerTestId,"aria-live":"polite","aria-busy":null!==(_c=styleOptions.enableAnimation)&&void 0!==_c?_c:defaultEnableAnimation},Wrapper?elements.map(((el,i)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(Wrapper,{key:i},el))):elements)}},"./src/asset/VideoModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>VideoModal_VideoModal});__webpack_require__("./node_modules/react/index.js");var lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),Utils=__webpack_require__("./src/utils/Utils.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const VideoModal_VideoModal=_ref=>{let{video,showModal,setShowModal}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)("div",{className:"video-modal",children:(0,jsx_runtime.jsx)(lib.Modal,{show:showModal,setShow:()=>setShowModal(!1),children:(0,jsx_runtime.jsxs)("div",{className:"video",children:[(0,jsx_runtime.jsx)("div",{className:"close",onClick:()=>setShowModal(!1),children:(0,jsx_runtime.jsx)(lib.Icon,{name:"close",size:"large"})}),showModal?"video"===video.type?(0,jsx_runtime.jsx)("iframe",{src:(0,Utils.hm)(video.url),title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}):(0,jsx_runtime.jsx)("iframe",{title:"virtual tour",frameBorder:"0",style:{border:0},src:video.url,allowFullScreen:!0}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{})]})})})})};try{VideoModal_VideoModal.displayName="VideoModal",VideoModal_VideoModal.__docgenInfo={description:"",displayName:"VideoModal",props:{video:{defaultValue:null,description:"",name:"video",required:!0,type:{name:"Video"}},showModal:{defaultValue:null,description:"",name:"showModal",required:!0,type:{name:"boolean"}},setShowModal:{defaultValue:null,description:"",name:"setShowModal",required:!0,type:{name:"(showModal: boolean) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/asset/VideoModal.tsx#VideoModal"]={docgenInfo:VideoModal_VideoModal.__docgenInfo,name:"VideoModal",path:"src/asset/VideoModal.tsx#VideoModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/floorplan/card/FloorplanCardSkeleton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>FloorplanCardSkeleton});__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/floorplan/card/assets/FloorplanCard.scss");var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react-loading-skeleton/dist/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const FloorplanCardSkeleton=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{className:"floorplan-card",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3__.Z,{height:250}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"floorplan-card-footer",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3__.Z,{height:50})})]});try{FloorplanCardSkeleton.displayName="FloorplanCardSkeleton",FloorplanCardSkeleton.__docgenInfo={description:"",displayName:"FloorplanCardSkeleton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/card/FloorplanCardSkeleton.tsx#FloorplanCardSkeleton"]={docgenInfo:FloorplanCardSkeleton.__docgenInfo,name:"FloorplanCardSkeleton",path:"src/floorplan/card/FloorplanCardSkeleton.tsx#FloorplanCardSkeleton"})}catch(__react_docgen_typescript_loader_error){}},"./src/floorplan/filter/FloorplanDropDown.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>DropDownFilter});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./src/floorplan/filter/assets/FloorplanDropDown.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const DropDownFilter=_ref=>{let{label,drop,children}=_ref;const[showContent,setShowContent]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:"unit-dropdown",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.DropdownButton,{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("h5",{children:[label,"  ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{className:"small",children:"▼"})]}),showContent,setShowContent,size:"medium",variant:"primary",drop,children})})};try{DropDownFilter.displayName="DropDownFilter",DropDownFilter.__docgenInfo={description:"",displayName:"DropDownFilter",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},drop:{defaultValue:null,description:"",name:"drop",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"middle"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/filter/FloorplanDropDown.tsx#DropDownFilter"]={docgenInfo:DropDownFilter.__docgenInfo,name:"DropDownFilter",path:"src/floorplan/filter/FloorplanDropDown.tsx#DropDownFilter"})}catch(__react_docgen_typescript_loader_error){}},"./src/floorplan/section/filter/Bedroom.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>BedroomFilter,y:()=>sortBedrooms});__webpack_require__("./node_modules/react/index.js");var _contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),_filter_FloorplanDropDown__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/floorplan/filter/FloorplanDropDown.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const sortBedrooms=(a,b)=>a-b,BedroomFilter=_ref=>{let{filters,handleFilterChange,currentFilters}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_filter_FloorplanDropDown__WEBPACK_IMPORTED_MODULE_2__.r,{label:"Bedroom",children:Array.from(filters.keys()).sort(sortBedrooms).map((filter=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Checkbox,{label:filter.toString(),name:"bedroom-"+filter,onChange:()=>{handleFilterChange(filter)},checked:()=>currentFilters.indexOf(filter)>-1},"bedroom-"+filter)))})};try{BedroomFilter.displayName="BedroomFilter",BedroomFilter.__docgenInfo={description:"",displayName:"BedroomFilter",props:{filters:{defaultValue:null,description:"",name:"filters",required:!0,type:{name:"Set<number>"}},handleFilterChange:{defaultValue:null,description:"",name:"handleFilterChange",required:!0,type:{name:"(filter: number) => void"}},currentFilters:{defaultValue:null,description:"",name:"currentFilters",required:!0,type:{name:"number[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/section/filter/Bedroom.tsx#BedroomFilter"]={docgenInfo:BedroomFilter.__docgenInfo,name:"BedroomFilter",path:"src/floorplan/section/filter/Bedroom.tsx#BedroomFilter"})}catch(__react_docgen_typescript_loader_error){}}}]);