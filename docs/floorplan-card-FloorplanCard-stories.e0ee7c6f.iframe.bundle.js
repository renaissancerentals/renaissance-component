"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[7698],{"./src/floorplan/card/FloorplanCard.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Small:()=>Small,WithSpecialOffer:()=>WithSpecialOffer,WithSpecialRent:()=>WithSpecialRent,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,without360Icon:()=>without360Icon,withoutLeftIcons:()=>withoutLeftIcons});__webpack_require__("./node_modules/react/index.js");var _FloorplanCard__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/floorplan/card/FloorplanCard.tsx"),_data_Floorplan__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/floorplan/data/Floorplan.ts"),moment_moment__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/moment/moment.js"),moment_moment__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(moment_moment__WEBPACK_IMPORTED_MODULE_3__),_utils_Utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/utils/Utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const meta={component:_FloorplanCard__WEBPACK_IMPORTED_MODULE_1__.J,title:"Card/Floorplan Card",render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_FloorplanCard__WEBPACK_IMPORTED_MODULE_1__.J,{...args})},floorplan={name:"Barcelona",id:"barcelona",active:!0,virtualTourLink:"https://www.paneek.net/#/tour/view/3712",videoTourLink:"https://youtu.be/UioR0vCXkUo",photosFolderId:"18BL3coOPSHfMFJyJdZ4duB63SmPbgDDI",units:[{active:!1,squareFoot:1e3,rent:1e3,moveInDate:""},{active:!0,squareFoot:710,rent:1195,moveInDate:"2023-08-04"},{active:!0,squareFoot:710,rent:1165,moveInDate:"2023-08-09"}],style:_data_Floorplan__WEBPACK_IMPORTED_MODULE_2__.Nb.APARTMENT,bathroom:1,featured:!0,bedroom:1,coverImage:"https://drive.google.com/uc?id=1pXtrJgJhTrdLeuwtP6lKSjULfF7TPJtf&export=download",specialRent:0,specialRentStartDate:"",specialRentEndDate:"",webSpecials:[]},__WEBPACK_DEFAULT_EXPORT__=meta,Default={args:{floorplan,propertyId:"verona-park",videoClickHandler:video=>console.log("url: ",video.url," type ",video.type)}},without360Icon={args:{...Default.args,floorplan:{...floorplan,virtualTourLink:""}}},withoutLeftIcons={args:{...Default.args,floorplan:{...floorplan,virtualTourLink:"",videoTourLink:""}}},Small={args:{...Default.args,size:"small"}},WithSpecialOffer={args:{...Default.args,floorplan:{...floorplan,webSpecials:["$250 off your first month rent when you sign a 12-month lease","$250 off your second month rent when you sign a 12-month lease"]}}},WithSpecialRent={args:{...Default.args,floorplan:{...floorplan,specialRent:800,specialRentStartDate:(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_4__.G_)(moment_moment__WEBPACK_IMPORTED_MODULE_3___default()().subtract(2,"days")),specialRentEndDate:(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_4__.G_)(moment_moment__WEBPACK_IMPORTED_MODULE_3___default()().add(2,"days"))}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    floorplan: floorplan,\n    propertyId: "verona-park",\n    videoClickHandler: (video: Video) => console.log("url: ", video.url, " type ", video.type)\n  }\n}',...Default.parameters?.docs?.source}}},without360Icon.parameters={...without360Icon.parameters,docs:{...without360Icon.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Default.args,\n    floorplan: {\n      ...floorplan,\n      virtualTourLink: ""\n    }\n  }\n}',...without360Icon.parameters?.docs?.source}}},withoutLeftIcons.parameters={...withoutLeftIcons.parameters,docs:{...withoutLeftIcons.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Default.args,\n    floorplan: {\n      ...floorplan,\n      virtualTourLink: "",\n      videoTourLink: ""\n    }\n  }\n}',...withoutLeftIcons.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Default.args,\n    size: 'small'\n  }\n}",...Small.parameters?.docs?.source}}},WithSpecialOffer.parameters={...WithSpecialOffer.parameters,docs:{...WithSpecialOffer.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Default.args,\n    floorplan: {\n      ...floorplan,\n      webSpecials: ["$250 off your first month rent when you sign a 12-month lease", "$250 off your second month rent when you sign a 12-month lease"]\n    }\n  }\n}',...WithSpecialOffer.parameters?.docs?.source}}},WithSpecialRent.parameters={...WithSpecialRent.parameters,docs:{...WithSpecialRent.parameters?.docs,source:{originalSource:'{\n  args: {\n    ...Default.args,\n    floorplan: {\n      ...floorplan,\n      specialRent: 800,\n      specialRentStartDate: momentToDate(moment().subtract(2, "days")),\n      specialRentEndDate: momentToDate(moment().add(2, "days"))\n    }\n  }\n}',...WithSpecialRent.parameters?.docs?.source}}};const __namedExportsOrder=["Default","without360Icon","withoutLeftIcons","Small","WithSpecialOffer","WithSpecialRent"]},"./src/floorplan/card/assets/FloorplanCard.scss":()=>{},"./src/floorplan/card/FloorplanCard.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>FloorplanCard});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_assets_360_icon_png__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./src/floorplan/card/assets/FloorplanCard.scss"),__webpack_require__("./src/floorplan/card/assets/360-icon.png")),_assets_video_icon_png__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/floorplan/card/assets/video-icon.png"),_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),_asset_service_AssetService__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/asset/service/AssetService.ts"),_service_AssetApi__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/service/AssetApi.ts"),_utils_Utils__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/utils/Utils.ts"),_service_FloorplanService__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/floorplan/service/FloorplanService.ts"),_FloorplanPrice__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/floorplan/card/FloorplanPrice.tsx"),_specialOffer_SpecialOfferButton__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./src/specialOffer/SpecialOfferButton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/react/jsx-runtime.js");const FloorplanCard=_ref=>{let{floorplan,size,videoClickHandler,propertyId}=_ref;const[assets,setAssets]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),[isAssetLoading,setIsAssetLoading]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[isAssetLoaded,setIsAssetLoaded]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[showSpecialOffer,setShowSpecialOffer]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"small"===size?"floorplan-card floorplan-card--small":"floorplan-card",children:[isAssetLoaded&&assets.length>0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_4__.ItemSlider,{navButtonSize:"medium",sliderItems:assets.map((asset=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("img",{className:"card--image",alt:"card",src:(0,_asset_service_AssetService__WEBPACK_IMPORTED_MODULE_5__.pz)(asset.id,propertyId)})))}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("img",{className:"card--image",alt:"cover",src:floorplan.coverImage?(0,_asset_service_AssetService__WEBPACK_IMPORTED_MODULE_5__.Vh)(floorplan.coverImage,propertyId):_service_AssetApi__WEBPACK_IMPORTED_MODULE_6__.TL}),isAssetLoaded?"":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_4__.NavigateButton,{direction:"right",onClick:()=>{floorplan.photosFolderId?(0,_asset_service_AssetService__WEBPACK_IMPORTED_MODULE_5__.T9)(floorplan.photosFolderId).then((data=>{setAssets(data)})).catch((()=>{console.log("invalid folderId")})).finally((()=>{setIsAssetLoaded(!0),setIsAssetLoading(!1)})):(setIsAssetLoaded(!0),setIsAssetLoading(!1))},size:"medium"}),isAssetLoading?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_4__.Spinner,{size:"medium"}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"badges--right",children:[floorplan.featured?(0,_service_FloorplanService__WEBPACK_IMPORTED_MODULE_8__.Hf)(floorplan)?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_4__.Badge,{children:"Featured & Available Now"}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_4__.Badge,{children:"Featured"}):(0,_service_FloorplanService__WEBPACK_IMPORTED_MODULE_8__.Hf)(floorplan)?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_4__.Badge,{children:"Available Now"}):"",floorplan.webSpecials.length>0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_specialOffer_SpecialOfferButton__WEBPACK_IMPORTED_MODULE_10__.G,{onMouseEnter:()=>setShowSpecialOffer(!0),onMouseLeave:()=>setShowSpecialOffer(!1)}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"badges--left",children:[floorplan.virtualTourLink?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"icon-tour",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_4__.Button,{variant:"transparent",size:"small",onClick:()=>videoClickHandler({url:floorplan.virtualTourLink,type:"virtual"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("img",{src:_assets_360_icon_png__WEBPACK_IMPORTED_MODULE_2__,alt:"tour icon",height:30})})}):"",floorplan.videoTourLink?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"icon-video",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_4__.Button,{variant:"transparent",size:"small",onClick:()=>videoClickHandler({url:floorplan.videoTourLink,type:"video"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("img",{src:_assets_video_icon_png__WEBPACK_IMPORTED_MODULE_3__,alt:"video icon",height:20})})}):""]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a",{href:"/floorplans/"+floorplan.id,title:floorplan.name,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"floorplan-card-content",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"floorplan-card-content--special",children:showSpecialOffer&&floorplan.webSpecials.length>0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"content--special",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p",{children:floorplan.webSpecials[0]})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"floorplan-card-footer",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"left",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h3",{className:"truncate",children:floorplan.name}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FloorplanPrice__WEBPACK_IMPORTED_MODULE_9__.K,{unitRents:floorplan.units,specialRent:floorplan.specialRent,specialRentEndDate:floorplan.specialRentEndDate,specialRentStartDate:floorplan.specialRentStartDate})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"right",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("p",{children:[floorplan.bedroom," bed, ",floorplan.bathroom," bath"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p",{children:floorplan.units.length>0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{children:[(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_7__.Rt)(floorplan.units,"squareFoot")," sq. ft."]}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{children:" "})})]})]})]})})]})};try{FloorplanCard.displayName="FloorplanCard",FloorplanCard.__docgenInfo={description:"",displayName:"FloorplanCard",props:{floorplan:{defaultValue:null,description:"",name:"floorplan",required:!0,type:{name:"FloorplanCardData"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"large"'}]}},videoClickHandler:{defaultValue:null,description:"",name:"videoClickHandler",required:!0,type:{name:"(video: Video) => void"}},propertyId:{defaultValue:null,description:"",name:"propertyId",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/floorplan/card/FloorplanCard.tsx#FloorplanCard"]={docgenInfo:FloorplanCard.__docgenInfo,name:"FloorplanCard",path:"src/floorplan/card/FloorplanCard.tsx#FloorplanCard"})}catch(__react_docgen_typescript_loader_error){}}}]);