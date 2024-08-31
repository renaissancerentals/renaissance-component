"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[8792],{"./src/short-term/ShortTermFloorplanSection.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ShortTermFloorplanSection_stories});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),ShortTermService=__webpack_require__("./src/short-term/service/ShortTermService.ts"),GalleryHeroSkeleton=__webpack_require__("./src/gallery/GalleryHeroSkeleton.tsx"),Utils=__webpack_require__("./src/utils/Utils.ts"),AssetService=__webpack_require__("./src/asset/service/AssetService.ts"),RenaissanceData=__webpack_require__("./src/data/RenaissanceData.ts"),GalleryModal=__webpack_require__("./src/gallery/GalleryModal.tsx"),GalleryHeroMain=__webpack_require__("./src/gallery/GalleryHeroMain.tsx"),GalleryHeroMobile=__webpack_require__("./src/gallery/GalleryHeroMobile.tsx"),VideoTours=__webpack_require__("./src/gallery/VideoTours.tsx"),VirtualTour=__webpack_require__("./src/gallery/VirtualTour.tsx"),HeroBadgeStats=__webpack_require__("./src/floorplan/section/HeroBadgeStats.tsx"),AssetModal=__webpack_require__("./src/asset/AssetModal.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ShortTermFloorplanHero_ShortTermFloorplanHero=_ref=>{let{floorplan,contactClickHandler,applyClickHandler,handleRefToMap,webSpecials}=_ref;const[assets,setAssets]=(0,react.useState)([]),[isAssetsLoading,setIsAssetsLoading]=(0,react.useState)(!0),[videoTours,setVideoTours]=(0,react.useState)([]),[virtualTour,setVirtualTour]=(0,react.useState)(void 0),[showFloorplanModal,setShowFloorplanModal]=(0,react.useState)(!1),[totalPages,setTotalPages]=(0,react.useState)(1),[toursCount,setToursCount]=(0,react.useState)(0),[currentView,setCurrentView]=(0,react.useState)("photo"),[assetInFocus,setAssetInFocus]=(0,react.useState)({}),[assetIndex,setAssetIndex]=(0,react.useState)(0),[showModal,setShowModal]=(0,react.useState)(!1),imageClickedHandler=image=>{setShowModal(!0),setAssetInFocus(image),setAssetIndex(assets.findIndex((value=>value.id===image.id)))};(0,react.useEffect)((()=>{floorplan.virtualTourLink&&setVirtualTour(floorplan.virtualTourLink);const tourLinks=[];floorplan.videoTourLink&&tourLinks.push(floorplan.videoTourLink),floorplan.threeSixtyVideoTourLink&&tourLinks.push(floorplan.threeSixtyVideoTourLink),setVideoTours(tourLinks);let otherAssetCounts=(tourLinks.length>0?1:0)+(floorplan.virtualTourLink?1:0);setToursCount(otherAssetCounts);const images=[];images.push({id:(0,Utils.K3)(floorplan.coverImage),name:"cover image"}),floorplan.photosFolderId?(0,AssetService.T9)(floorplan.photosFolderId).then((galleryAssets=>{images.push(...galleryAssets);let totalAssets=images.length+otherAssetCounts;if(totalAssets>5){let pages=Math.trunc((totalAssets-5)/8+1);setTotalPages((totalAssets-5)%8==0?pages:pages+1)}})).finally((()=>{setAssets(images),setIsAssetsLoading(!1)})):(setAssets(images),console.log(images),setIsAssetsLoading(!1))}),[floorplan]);const imageCountForFirstPage=()=>5-toursCount,getImagesForFirstSliderPage=assets.slice(0,assets.length>=imageCountForFirstPage()?imageCountForFirstPage():assets.length),assetsToShow=slideIndex=>{if((slideIndex=>0===slideIndex)(slideIndex))return getImagesForFirstSliderPage;const startIndex=imageCountForFirstPage()+8*(slideIndex-1),endIndex=startIndex+8;return assets.slice(startIndex,endIndex)};return(0,jsx_runtime.jsxs)("section",{className:"section-short-term-floorplan--hero",children:[isAssetsLoading?(0,jsx_runtime.jsx)(GalleryHeroSkeleton.R,{}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)("div",{className:"gallery-hero",children:[(0,jsx_runtime.jsx)(GalleryModal.Y,{assets,assetInFocus,setAssetInFocus,showModal,assetIndex,setAssetIndex,modalCloseHandler:()=>{setShowModal(!1),setAssetInFocus({})},propertyId:floorplan.property.id}),"photo"===currentView?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("div",{className:"photo-view main",children:(0,jsx_runtime.jsx)(lib.ItemSlider,{sliderItems:[...Array(totalPages)].map(((x,i)=>(0,jsx_runtime.jsx)(GalleryHeroMain.J,{isAvailableNow:!1,virtualTour,isFirst:0===i,toursCount,webSpecials,setCurrentView,imageClickedHandler,assetsToShow:assetsToShow(i),propertyId:floorplan.property.id})))})}),(0,jsx_runtime.jsx)("div",{className:"photo-view mobile",children:(0,jsx_runtime.jsx)(GalleryHeroMobile.L,{assets,toursCount,virtualTour,setCurrentView,imageClickedHandler,webSpecials,isAvailableNow:!1,propertyId:floorplan.property.id})})]}):"","video tour"===currentView?(0,jsx_runtime.jsx)(VideoTours.r,{videoTourUrls:videoTours}):"","virtual tour"===currentView?(0,jsx_runtime.jsx)(VirtualTour.R,{virtualTourUrl:virtualTour}):"",(0,jsx_runtime.jsx)(HeroBadgeStats.E,{currentView,setCurrentView,totalAssets:null==assets?void 0:assets.length,videoTours,virtualTour})]})}),(0,jsx_runtime.jsx)(AssetModal.a,{assetUrl:floorplan.photo,assetTitle:"Floorplan image",showModal:showFloorplanModal,setShowModal:setShowFloorplanModal,propertyId:floorplan.property.id}),(0,jsx_runtime.jsx)("div",{className:"container",children:(0,jsx_runtime.jsxs)("div",{className:"floorplan--two-columns",children:[(0,jsx_runtime.jsxs)("div",{className:"floorplan-column-left",children:[(0,jsx_runtime.jsx)("h3",{children:floorplan.name}),(0,jsx_runtime.jsxs)("h4",{children:["$",floorplan.shortTerm.priceFor4andMoreMonths," - $",floorplan.shortTerm.priceFor5To13Days,"/mo"]}),(0,jsx_runtime.jsx)("p",{className:"floorplan--description",children:floorplan.address+", "+RenaissanceData.w.city+", "+RenaissanceData.w.state+" "+floorplan.zipcode}),(0,jsx_runtime.jsxs)("div",{className:"floorplan--featured",children:[(0,jsx_runtime.jsx)(lib.Button,{size:"small",onClick:()=>setShowFloorplanModal(!0),children:(0,jsx_runtime.jsx)(lib.Icon,{name:"max",orientation:"right",children:"ViewFloorplan"})}),"|  ",(0,jsx_runtime.jsx)(lib.Button,{size:"small",onClick:()=>handleRefToMap(),children:(0,jsx_runtime.jsx)(lib.Icon,{orientation:"right",name:"map",children:"View on Map"})}),floorplan.property.busRoutes.length>0?(0,jsx_runtime.jsxs)("p",{children:["Bus Routes: ",floorplan.property.busRoutes.map(((busRoute,index)=>(0,jsx_runtime.jsxs)("span",{children:[(0,jsx_runtime.jsx)("a",{href:busRoute.busRouteLink,target:"_blank",rel:"noreferrer",children:busRoute.busRoute}),index<floorplan.property.busRoutes.length-1?", ":""]},"bus-route-"+index)))]}):""]})]}),(0,jsx_runtime.jsx)("div",{className:"main",children:(0,jsx_runtime.jsxs)("div",{className:" floorplan-column-right",children:[(0,jsx_runtime.jsx)(lib.Button,{variant:"primary",size:"medium",onClick:contactClickHandler,children:"contact us"}),(0,jsx_runtime.jsx)(lib.Button,{variant:"tertiary",size:"medium",onClick:applyClickHandler,children:"apply"}),(0,jsx_runtime.jsx)(lib.ShareButton,{title:"Check out this apartment",size:"large"})]})})]})})]})};try{ShortTermFloorplanHero_ShortTermFloorplanHero.displayName="ShortTermFloorplanHero",ShortTermFloorplanHero_ShortTermFloorplanHero.__docgenInfo={description:"",displayName:"ShortTermFloorplanHero",props:{floorplan:{defaultValue:null,description:"",name:"floorplan",required:!0,type:{name:"FloorplanShortTerm"}},webSpecials:{defaultValue:null,description:"",name:"webSpecials",required:!0,type:{name:"WebSpecial[]"}},contactClickHandler:{defaultValue:null,description:"",name:"contactClickHandler",required:!0,type:{name:"() => void"}},applyClickHandler:{defaultValue:null,description:"",name:"applyClickHandler",required:!0,type:{name:"() => void"}},handleRefToMap:{defaultValue:null,description:"",name:"handleRefToMap",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/short-term/ShortTermFloorplanHero.tsx#ShortTermFloorplanHero"]={docgenInfo:ShortTermFloorplanHero_ShortTermFloorplanHero.__docgenInfo,name:"ShortTermFloorplanHero",path:"src/short-term/ShortTermFloorplanHero.tsx#ShortTermFloorplanHero"})}catch(__react_docgen_typescript_loader_error){}var Card=__webpack_require__("./src/card/Card.tsx"),MapSection=__webpack_require__("./src/map/MapSection.tsx");const ShortTermFloorplanSection_ShortTermFloorplanSection=_ref=>{var _floorplan$property;let{contactClickHandler,applyClickHandler,floorplanId,locationRef,handleRefToLocation}=_ref;const[floorplan,setFloorplan]=(0,react.useState)({}),[isLoading,setIsLoading]=(0,react.useState)(!0),[errorLoading,setErrorLoading]=(0,react.useState)(!1),mapRef=(0,react.useRef)(null);(0,react.useEffect)((()=>{(0,ShortTermService.DO)(floorplanId).then((data=>{setFloorplan(data)})).catch((()=>{setErrorLoading(!0)})).finally((()=>{setIsLoading(!1)}))}),[floorplanId]);const generatePricing=price=>price?"".concat((0,Utils.tF)(price),"/day/ ").concat((0,Utils.tF)(30*price),"/mo"):"-";return(0,jsx_runtime.jsx)("section",{className:"section-short-term-floorplan",children:isLoading?(0,jsx_runtime.jsx)("section",{className:"section-floorplan--hero",children:(0,jsx_runtime.jsx)(GalleryHeroSkeleton.R,{})}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:errorLoading?(0,jsx_runtime.jsx)("section",{className:"div-full--center",children:(0,jsx_runtime.jsx)("h2",{children:"Uh-oh, this is a 404"})}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ShortTermFloorplanHero_ShortTermFloorplanHero,{floorplan,contactClickHandler,webSpecials:[],applyClickHandler,handleRefToMap:()=>{var _mapRef$current;handleRefToLocation?handleRefToLocation():null===(_mapRef$current=mapRef.current)||void 0===_mapRef$current||_mapRef$current.scrollIntoView({behavior:"smooth",block:"start"})}}),(0,jsx_runtime.jsx)("div",{className:"container",children:(0,jsx_runtime.jsxs)("div",{className:"floorplan--cards",children:[(0,jsx_runtime.jsxs)(Card.Z,{title:"Details",children:[(0,jsx_runtime.jsxs)("p",{className:"floorplan-card--featured",children:[floorplan.bedroom," Bedroom | ",floorplan.bathroom," Bathroom ",(0,Utils.gq)(floorplan.style)]}),(0,jsx_runtime.jsxs)("p",{className:"floorplan-card--featured",children:[floorplan.shortTerm.squareFoot," Square Feet"]}),(0,jsx_runtime.jsxs)("div",{className:"row-content",children:[(0,jsx_runtime.jsx)("h4",{className:"row-title",children:"Pricing:"}),(0,jsx_runtime.jsxs)("p",{className:"floorplan-card--featured",children:[(0,jsx_runtime.jsx)("span",{className:"key",children:"5-13 days:"}),(0,jsx_runtime.jsx)("span",{className:"value",children:generatePricing(floorplan.shortTerm.priceFor5To13Days)})]}),(0,jsx_runtime.jsxs)("p",{className:"floorplan-card--featured",children:[(0,jsx_runtime.jsx)("span",{className:"key",children:"14-29 days:"}),(0,jsx_runtime.jsx)("span",{className:"value",children:generatePricing(floorplan.shortTerm.priceFor14To29Days)})]}),(0,jsx_runtime.jsxs)("p",{className:"floorplan-card--featured",children:[(0,jsx_runtime.jsx)("span",{className:"key",children:"1-4 months:"}),(0,jsx_runtime.jsx)("span",{className:"value",children:generatePricing(floorplan.shortTerm.priceFor1To4Months)})]}),(0,jsx_runtime.jsxs)("p",{className:"floorplan-card--featured",children:[(0,jsx_runtime.jsx)("span",{className:"key",children:"4+ months:"}),(0,jsx_runtime.jsx)("span",{className:"value",children:generatePricing(floorplan.shortTerm.priceFor4andMoreMonths)})]})]}),(0,jsx_runtime.jsx)("p",{children:floorplan.description})]}),floorplan.amenities.length>0?(0,jsx_runtime.jsx)(Card.Z,{title:"Amenities",children:(0,jsx_runtime.jsxs)(lib.Ul,{children:[floorplan.amenities.filter((amenity=>amenity.featured)).map((amenity=>(0,jsx_runtime.jsx)(lib.Li,{bulletIcon:"star",isFeatured:!0,children:amenity.name},"floorplan-amenity-"+amenity.id))),floorplan.amenities.filter((amenity=>!amenity.featured)).map((amenity=>(0,jsx_runtime.jsx)(lib.Li,{bulletIcon:"dot",children:amenity.name},"floorplan-amenity-"+amenity.id)))]})}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{}),isLoading?"":(0,jsx_runtime.jsxs)(Card.Z,{children:[(0,jsx_runtime.jsx)("div",{ref:locationRef||mapRef,id:"location",className:"reference"}),(0,jsx_runtime.jsx)(MapSection.s,{src:(0,Utils.fH)({city:RenaissanceData.w.city,state:RenaissanceData.w.state,address:floorplan.address,zipcode:floorplan.zipcode})})]}),(0,jsx_runtime.jsx)("div",{className:"contact-card",children:(0,jsx_runtime.jsxs)(Card.Z,{featured:!0,children:[(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)("i",{children:"Questions?"})}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)("i",{children:"Call or text us anytime:"})}),null!==(_floorplan$property=floorplan.property)&&void 0!==_floorplan$property&&_floorplan$property.phone?(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)("a",{href:"tel:"+floorplan.property.phone,children:(0,Utils.un)(floorplan.property.phone)})}):"",(0,jsx_runtime.jsx)(lib.Button,{variant:"tertiary",onClick:contactClickHandler,size:"large",children:"Contact Us »"})]})})]})})]})})})};try{ShortTermFloorplanSection_ShortTermFloorplanSection.displayName="ShortTermFloorplanSection",ShortTermFloorplanSection_ShortTermFloorplanSection.__docgenInfo={description:"",displayName:"ShortTermFloorplanSection",props:{contactClickHandler:{defaultValue:null,description:"",name:"contactClickHandler",required:!0,type:{name:"() => void"}},applyClickHandler:{defaultValue:null,description:"",name:"applyClickHandler",required:!0,type:{name:"() => void"}},floorplanId:{defaultValue:null,description:"",name:"floorplanId",required:!0,type:{name:"string"}},locationRef:{defaultValue:null,description:"",name:"locationRef",required:!1,type:{name:"Ref<HTMLDivElement>"}},handleRefToLocation:{defaultValue:null,description:"",name:"handleRefToLocation",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/short-term/ShortTermFloorplanSection.tsx#ShortTermFloorplanSection"]={docgenInfo:ShortTermFloorplanSection_ShortTermFloorplanSection.__docgenInfo,name:"ShortTermFloorplanSection",path:"src/short-term/ShortTermFloorplanSection.tsx#ShortTermFloorplanSection"})}catch(__react_docgen_typescript_loader_error){}const ShortTermFloorplanSection_stories={component:ShortTermFloorplanSection_ShortTermFloorplanSection,title:"Short Term/Short Term Floorplan",render:args=>(0,jsx_runtime.jsx)(ShortTermFloorplanSection_ShortTermFloorplanSection,{...args})},Default={args:{floorplanId:"1-bedroom"}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    floorplanId: "1-bedroom"\n  }\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/short-term/data/ShortTermFilters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P:()=>ShortTermSortFields});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const ShortTermSortFields={priceAsc:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"sort-asc"})," Price"]}),sortField:"shortTerm.priceFor5To13Days",order:"asc"},priceDesc:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"sort-desc"})," Price"]}),sortField:"shortTerm.priceFor5To13Days",order:"desc"},bedroomsAsc:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"sort-asc"})," Bedrooms"]}),sortField:"bedroom",order:"asc"},bedroomsDesc:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"sort-desc"})," Bedrooms"]}),sortField:"bedroom",order:"desc"}}},"./src/short-term/service/ShortTermService.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{DO:()=>getShortTermFloorplan,UW:()=>sortAndFilter,sM:()=>shortTermFiltersFrom});var _service_RoundRobin__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/service/RoundRobin.ts"),_data_ShortTermFilters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/short-term/data/ShortTermFilters.tsx"),lodash__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/lodash/lodash.js"),lodash__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);const getShortTermFloorplan=async id=>{let response=await(0,_service_RoundRobin__WEBPACK_IMPORTED_MODULE_0__.U)("floorplans/"+id+"?projection=short-term");return await response.data},shortTermFiltersFrom=floorplans=>{const bedroomFilters=new Set,styleFilters=new Set;return floorplans.forEach((floorplan=>{bedroomFilters.add(floorplan.bedroom),styleFilters.add(floorplan.style)})),{bedroom:bedroomFilters,style:styleFilters}},sortAndFilter=(floorplans,currentFilters)=>((floorplans,sortBy)=>lodash__WEBPACK_IMPORTED_MODULE_2___default().orderBy(floorplans,_data_ShortTermFilters__WEBPACK_IMPORTED_MODULE_1__.P[sortBy].sortField,_data_ShortTermFilters__WEBPACK_IMPORTED_MODULE_1__.P[sortBy].order))(floorplans.filter((floorplan=>((floorplan,currentFilters)=>((floorplan,styleFilters)=>0===styleFilters.length||styleFilters.indexOf(floorplan.style)>-1)(floorplan,currentFilters.styleFilters)&&((floorplan,bedroomFilters)=>0===bedroomFilters.length||bedroomFilters.indexOf(floorplan.bedroom)>-1)(floorplan,currentFilters.bedroomFilters)&&((floorplan,floorplanIds)=>0===floorplanIds.length||floorplanIds.indexOf(floorplan.id)>-1)(floorplan,currentFilters.floorplanIds))(floorplan,currentFilters))),currentFilters.sortBy)}}]);