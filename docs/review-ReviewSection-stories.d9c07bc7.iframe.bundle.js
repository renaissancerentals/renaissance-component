"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[936],{"./src/review/ReviewSection.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ReviewSection_stories});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),FloorplanService=__webpack_require__("./src/floorplan/service/FloorplanService.ts"),AssetService=__webpack_require__("./src/asset/service/AssetService.ts"),AssetApi=__webpack_require__("./src/service/AssetApi.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ReviewSection_ReviewSection=_ref=>{let{property,starColor}=_ref;const[reviews,setReviews]=(0,react.useState)([]),[isLoading,setIsLoading]=(0,react.useState)(!0);return(0,react.useEffect)((()=>{const promises=[];property.floorplans.forEach((floorplan=>{promises.push((0,FloorplanService.BZ)(floorplan.id))})),Promise.all(promises).then((data=>{const currentTestimonials=[],currentReview=[];data.forEach((testimonialsData=>{currentTestimonials.push(...testimonialsData)}));let index=0;for(;index<currentTestimonials.length-1;)currentReview.push({left:currentTestimonials[index++],right:currentTestimonials[index++]});setReviews(currentReview)})).finally((()=>setIsLoading(!1)))}),[property.floorplans]),(0,jsx_runtime.jsx)("div",{className:"container",children:(0,jsx_runtime.jsx)("section",{className:"section-review",children:isLoading?"":(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("div",{className:"review-content",style:{backgroundImage:"url(".concat(property.coverImage?(0,AssetService.Vh)(property.coverImage,property.id):AssetApi.TL,")")},children:(0,jsx_runtime.jsx)("div",{className:"wrapper",children:(0,jsx_runtime.jsx)(lib.ItemSlider,{navButtonSize:"medium",navIcon:"arrow",variant:"transparent",navButtonWeight:2,sliderItems:reviews.map((review=>(0,jsx_runtime.jsxs)("div",{className:"review",children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("p",{className:"testimonials",children:review.left.testimonial}),(0,jsx_runtime.jsxs)("p",{className:"tenant",children:["-",review.left.tenant," | resident"]})]}),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("p",{className:"testimonials",children:review.right.testimonial}),(0,jsx_runtime.jsxs)("p",{className:"tenant",children:["-",review.right.tenant," | resident"]})]})]})))})})}),property.rating?(0,jsx_runtime.jsxs)("div",{className:"review-footer",children:[(0,jsx_runtime.jsx)(lib.Star,{rating:property.rating,size:"medium",color:starColor||"blue"}),(0,jsx_runtime.jsxs)("h3",{children:[" ",property.ratingLink?(0,jsx_runtime.jsxs)("a",{href:property.ratingLink,target:"_blank",rel:"noreferrer",children:[property.rating," Stars on Google"]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[property.rating," Stars on Google"]})]})]}):""]})})})};try{ReviewSection_ReviewSection.displayName="ReviewSection",ReviewSection_ReviewSection.__docgenInfo={description:"",displayName:"ReviewSection",props:{property:{defaultValue:null,description:"",name:"property",required:!0,type:{name:"PropertyDetails"}},starColor:{defaultValue:null,description:"",name:"starColor",required:!1,type:{name:"enum",value:[{value:'"green"'},{value:'"yellow"'},{value:'"orange"'},{value:'"red"'},{value:'"blue"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/review/ReviewSection.tsx#ReviewSection"]={docgenInfo:ReviewSection_ReviewSection.__docgenInfo,name:"ReviewSection",path:"src/review/ReviewSection.tsx#ReviewSection"})}catch(__react_docgen_typescript_loader_error){}var PropertyService=__webpack_require__("./src/property/service/PropertyService.ts");const ReviewSection_stories={title:"Section/Review Section",component:ReviewSection_ReviewSection},Default=(args=>{const[property,setProperty]=(0,react.useState)({}),[isLoading,setIsLoading]=(0,react.useState)(!0);return(0,react.useEffect)((()=>{(0,PropertyService.$)("verona-park").then((data=>{setProperty(data),setIsLoading(!1)}))}),[]),isLoading?(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{}):(0,jsx_runtime.jsx)(ReviewSection_ReviewSection,{...args,property})}).bind({});Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => {\n  const [property, setProperty] = useState<PropertyDetails>(({} as PropertyDetails));\n  const [isLoading, setIsLoading] = useState(true);\n  useEffect(() => {\n    getProperty("verona-park").then(data => {\n      setProperty(data);\n      setIsLoading(false);\n    });\n  }, []);\n  return isLoading ? <></> : <ReviewSection {...args} property={property} />;\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/asset/service/AssetService.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T9:()=>getAssetsFrom,Vh:()=>getAssetUrl,pz:()=>assetUrlFrom});var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/Utils.ts"),_service_AssetApi__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/service/AssetApi.ts");const getAssetUrl=(imageUrl,assetGatewayId)=>(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.tQ)(imageUrl)?propertyIdToDomain(assetGatewayId)+"api/asset/download/"+(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_0__.K3)(imageUrl):imageUrl,assetUrlFrom=(id,assetGatewayId)=>{return propertyIdToDomain((propertyId=assetGatewayId)?propertyId+"/":"")+"api/asset/download/"+id;var propertyId},getAssetsFrom=folderId=>_service_AssetApi__WEBPACK_IMPORTED_MODULE_1__.ZP.get("assets/"+folderId).then((response=>response.data._embedded?response.data._embedded.assets.sort(((a,b)=>parseInt(a.name)-parseInt(b.name))):[])).catch((reason=>{console.log(reason)})),propertyIdToDomain=propertyId=>{const assetDomains=["https://verona-park.herokuapp.com/","https://covenanter-hill.herokuapp.com/","https://high-grove.herokuapp.com/","https://scholars-quad.herokuapp.com/","https://summer-house.herokuapp.com/","https://verona-park.herokuapp.com/"],random=Math.ceil(6*Math.random())-1;return random<0||random>assetDomains.length-1?assetDomains[0]:assetDomains[random]}},"./src/data/RenaissanceData.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w:()=>renaissance});const renaissance={contact:{number:"8123332280",display:"(812) 333-2280"},propertyId:"renaissance-rentals",city:"Bloomington",state:"IN"}},"./src/floorplan/data/FloorplanFilters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SortFields});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@contentmunch/muncher-ui/lib/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const SortFields={featured:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"star"})," Featured"]}),sortField:"featured",order:"desc"},priceAsc:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"sort-asc"})," Price"]}),sortField:"minRate",order:"asc"},priceDesc:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"sort-desc"})," Price"]}),sortField:"minRate",order:"desc"},bedroomsAsc:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"sort-asc"})," Bedrooms"]}),sortField:"bedroom",order:"asc"},bedroomsDesc:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_contentmunch_muncher_ui__WEBPACK_IMPORTED_MODULE_1__.Icon,{name:"sort-desc"})," Bedrooms"]}),sortField:"bedroom",order:"desc"}}},"./src/floorplan/data/Unit.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{bS:()=>Pet});let Pet=function(Pet){return Pet.NO_PET="NO_PET",Pet.CAT="CAT",Pet.SMALL_DOG_CAT="SMALL_DOG_CAT",Pet.LARGE_DOG_SMALL_DOG_CAT="LARGE_DOG_SMALL_DOG_CAT",Pet}({})},"./src/floorplan/service/FloorplanService.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BZ:()=>getTestimonials,Ce:()=>getFloorplanVariations,DC:()=>floorplanAddress,Gk:()=>AVAILABLE_NOW,HG:()=>petPolicy,Hf:()=>isFloorplanAvailable,IW:()=>filtersFrom,Lz:()=>getAllPropertyFilterData,QJ:()=>getSimilarFloorplans,UW:()=>sortAndFilter,b7:()=>notPermittedPets,kJ:()=>getFloorplan,qZ:()=>defaultAvailabilityToMonthYear,qq:()=>sortFloorplans,sO:()=>permittedPets,zQ:()=>getWebSpecials});var lodash__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lodash/lodash.js"),lodash__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__),_data_FloorplanFilters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/floorplan/data/FloorplanFilters.tsx"),moment__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/moment/moment.js"),moment__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__),_utils_Utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/utils/Utils.ts"),_data_Unit__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/floorplan/data/Unit.ts"),_service_RoundRobin__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/service/RoundRobin.ts"),_data_RenaissanceData__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/data/RenaissanceData.ts");const AVAILABLE_NOW="Available Now",getAllPropertyFilterData=async()=>{const properties=(await(0,_service_RoundRobin__WEBPACK_IMPORTED_MODULE_5__.U)("properties?projection=filter")).data._embedded.properties.filter((property=>property.active));return properties.forEach((property=>{property.floorplans=property.floorplans.filter((floorplan=>floorplan.active)),property.floorplans.forEach((floorplan=>{floorplan.units=floorplan.units.filter((unit=>unit.active))}))})),properties},sortAndFilter=(floorplans,currentFilters)=>sortFloorplans(floorplans.filter((floorplan=>filterMatches(floorplan,currentFilters))),currentFilters.sortBy),dateToMonthYear=dateString=>moment__WEBPACK_IMPORTED_MODULE_2___default()(dateString,"YYYY-MM-DD").format("MMM YYYY"),defaultAvailabilityToMonthYear=dateString=>AVAILABLE_NOW===dateString?dateString:moment__WEBPACK_IMPORTED_MODULE_2___default()(dateString,"MM-YYYY").format("MMM YYYY"),isBeforeToday=date=>moment__WEBPACK_IMPORTED_MODULE_2___default()(date).isBefore(today),filterMatches=(floorplan,currentFilters)=>((floorplan,availabilityFilters)=>0===availabilityFilters.length||floorplan.units.some((unit=>{return!!(availabilityFilters.indexOf(AVAILABLE_NOW)>-1&&isBeforeToday(unit.moveInDate))||!!(availabilityFilters.indexOf((date=today,date.format("MMM YYYY")))>-1&&isBeforeToday(unit.moveInDate))||availabilityFilters.indexOf(dateToMonthYear(unit.moveInDate))>-1;var date})))(floorplan,currentFilters.availabilityFilters)&&((floorplan,minRent,maxRent)=>{const minMax=(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_3__.Hr)(floorplan.units,"rent");return minMax.min>=minRent&&minMax.max<=maxRent})(floorplan,currentFilters.minRent,currentFilters.maxRent)&&((floorplan,styleFilters)=>0===styleFilters.length||styleFilters.indexOf(floorplan.style)>-1)(floorplan,currentFilters.styleFilters)&&((floorplan,bedroomFilters)=>0===bedroomFilters.length||bedroomFilters.indexOf(floorplan.bedroom)>-1)(floorplan,currentFilters.bedroomFilters)&&((floorplan,floorplanIds)=>0===floorplanIds.length||floorplanIds.indexOf(floorplan.id)>-1)(floorplan,currentFilters.floorplanIds),sortFloorplans=(floorplans,sortBy)=>{if("minRate"===_data_FloorplanFilters__WEBPACK_IMPORTED_MODULE_1__.Z[sortBy].sortField&&"desc"===_data_FloorplanFilters__WEBPACK_IMPORTED_MODULE_1__.Z[sortBy].order)return floorplans.sort(((a,b)=>(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_3__.Hr)(b.units,"rent").min-(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_3__.Hr)(a.units,"rent").min));const minRateSorted=floorplans.sort(((a,b)=>(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_3__.Hr)(a.units,"rent").min-(0,_utils_Utils__WEBPACK_IMPORTED_MODULE_3__.Hr)(b.units,"rent").min));return"minRate"===_data_FloorplanFilters__WEBPACK_IMPORTED_MODULE_1__.Z[sortBy].sortField&&"asc"===_data_FloorplanFilters__WEBPACK_IMPORTED_MODULE_1__.Z[sortBy].order?minRateSorted:lodash__WEBPACK_IMPORTED_MODULE_0___default().orderBy(minRateSorted,_data_FloorplanFilters__WEBPACK_IMPORTED_MODULE_1__.Z[sortBy].sortField,_data_FloorplanFilters__WEBPACK_IMPORTED_MODULE_1__.Z[sortBy].order)},filtersFrom=floorplans=>{const bedroomFilters=new Set,availabilityFilters=new Set,styleFilters=new Set;return availabilityFilters.add(AVAILABLE_NOW),floorplans.forEach((floorplan=>{bedroomFilters.add(floorplan.bedroom),styleFilters.add(floorplan.style),floorplan.units.forEach((value=>{value.moveInDate&&(date=>{const today=moment__WEBPACK_IMPORTED_MODULE_2___default()(),diff=moment__WEBPACK_IMPORTED_MODULE_2___default()(date,"YYYY-MM-DD").diff(today,"months",!1);return diff>=0&&diff<=12})(value.moveInDate)&&(date=>{const today=moment__WEBPACK_IMPORTED_MODULE_2___default()();return moment__WEBPACK_IMPORTED_MODULE_2___default()(date,"YYYY-MM-DD").isAfter(today)})(value.moveInDate)&&availabilityFilters.add(dateToMonthYear(value.moveInDate))}))})),{bedroom:bedroomFilters,availability:availabilityFilters,style:styleFilters}},getFloorplan=floorplanId=>(0,_service_RoundRobin__WEBPACK_IMPORTED_MODULE_5__.U)("floorplans/"+floorplanId+"?projection=withId").then((response=>response.data)),getSimilarFloorplans=floorplanId=>(0,_service_RoundRobin__WEBPACK_IMPORTED_MODULE_5__.U)("similarFloorplans/search/byFloorplanId?projection=withId&floorplanId="+floorplanId).then((response=>response.data._embedded.similarFloorplans)),getFloorplanVariations=floorplanId=>(0,_service_RoundRobin__WEBPACK_IMPORTED_MODULE_5__.U)("floorplanVariations/search/byFloorplanId?projection=withId&floorplanId="+floorplanId).then((response=>response.data._embedded.floorplanVariations)),today=moment__WEBPACK_IMPORTED_MODULE_2___default()(),isFloorplanAvailable=floorplan=>floorplan.units.some((unit=>today.isAfter((0,_utils_Utils__WEBPACK_IMPORTED_MODULE_3__.iA)(unit.moveInDate)))),getTestimonials=floorplanId=>(0,_service_RoundRobin__WEBPACK_IMPORTED_MODULE_5__.U)("testimonials/search/byFloorplanId?projection=withId&floorplanId="+floorplanId).then((response=>response.data._embedded.testimonials)),getWebSpecials=floorplanId=>(0,_service_RoundRobin__WEBPACK_IMPORTED_MODULE_5__.U)("webSpecials/search/byFloorplanId?projection=withId&floorplanId="+floorplanId).then((response=>response.data._embedded.webSpecials)),permittedPets=floorplan=>{const unit=unitWithMostAllowedPet([...floorplan.units]);switch(null==unit?void 0:unit.allowedPet){case _data_Unit__WEBPACK_IMPORTED_MODULE_4__.bS.LARGE_DOG_SMALL_DOG_CAT:return["Large Dog","Small Dog","Cat"];case _data_Unit__WEBPACK_IMPORTED_MODULE_4__.bS.SMALL_DOG_CAT:return["Small Dog","Cat"];case _data_Unit__WEBPACK_IMPORTED_MODULE_4__.bS.CAT:return["Cat"];default:return["None"]}},notPermittedPets=floorplan=>{const unit=unitWithMostAllowedPet([...floorplan.units]);switch(null==unit?void 0:unit.allowedPet){case _data_Unit__WEBPACK_IMPORTED_MODULE_4__.bS.LARGE_DOG_SMALL_DOG_CAT:return[];case _data_Unit__WEBPACK_IMPORTED_MODULE_4__.bS.SMALL_DOG_CAT:return["Large Dog"];case _data_Unit__WEBPACK_IMPORTED_MODULE_4__.bS.CAT:return["Large Dog","Small Dog"];case _data_Unit__WEBPACK_IMPORTED_MODULE_4__.bS.NO_PET:return["Large Dog","Small Dog","Cat"];default:return[]}},petPolicy=floorplan=>{const unit=unitWithMostAllowedPet([...floorplan.units]);return null==unit?void 0:unit.petPolicy},unitWithMostAllowedPet=units=>{const petOrdinal=pet=>Object.keys(_data_Unit__WEBPACK_IMPORTED_MODULE_4__.bS).indexOf(pet);return units.sort(((a,b)=>petOrdinal(b.allowedPet)-petOrdinal(a.allowedPet))).pop()},floorplanAddress=currentFloorplan=>{const address={address:"",city:_data_RenaissanceData__WEBPACK_IMPORTED_MODULE_6__.w.city,state:_data_RenaissanceData__WEBPACK_IMPORTED_MODULE_6__.w.state,zipcode:""};return 1===currentFloorplan.units.length?{...address,address:currentFloorplan.units[0].address,zipcode:currentFloorplan.units[0].zipcode}:{...address,address:currentFloorplan.property.address,zipcode:currentFloorplan.property.zipcode}}},"./src/property/service/PropertyService.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>getProperty});var _service_RoundRobin__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/service/RoundRobin.ts");const getProperty=propertyId=>(0,_service_RoundRobin__WEBPACK_IMPORTED_MODULE_0__.U)("properties/"+propertyId+"?projection=details").then((response=>response.data))},"./src/service/Api.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,f:()=>RENAISSANCE_BASE_URL});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/axios/lib/axios.js");const RENAISSANCE_BASE_URL="http://localhost:8084/",__WEBPACK_DEFAULT_EXPORT__=axios__WEBPACK_IMPORTED_MODULE_0__.Z.create({baseURL:RENAISSANCE_BASE_URL+"api/"})},"./src/service/AssetApi.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{TL:()=>DEFAULT_IMAGE_URL,ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var axios__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/axios/lib/axios.js");const DEFAULT_IMAGE_URL=__webpack_require__("./src/service/Api.ts").f+"img/default.png",__WEBPACK_DEFAULT_EXPORT__=axios__WEBPACK_IMPORTED_MODULE_1__.Z.create({baseURL:"https://verona-park.herokuapp.com/api/"})},"./src/service/RoundRobin.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>get});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/axios/lib/axios.js");const REACT_APP_DATA_BASE_URLS="https://scholars-rooftop.herokuapp.com/,https://renaissancerentals.herokuapp.com/".split(",");let currentIndex=0;const get=url=>axios__WEBPACK_IMPORTED_MODULE_0__.Z.get((currentIndex=currentIndex>=REACT_APP_DATA_BASE_URLS.length-1?0:currentIndex+1,REACT_APP_DATA_BASE_URLS[currentIndex]+"api/data/"+url))},"./src/utils/Utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Hr:()=>minumMaximum,Jx:()=>decode,K3:()=>extractIdFrom,Nb:()=>addressToGoogleMapLink,Rt:()=>rangeFrom,ZG:()=>addressToGoogleMap,fH:()=>floorplanAddressToGoogleMap,fm:()=>capitalizeFirstLetter,gq:()=>enumToString,hm:()=>youtubeUrlToEmbedUrl,iA:()=>dateToMoment,p6:()=>formatDate,tF:()=>toUSD,tQ:()=>isGoogleDriveImage,tS:()=>isZipcodeValid,un:()=>formatPhoneNumber});var lodash__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lodash/lodash.js"),lodash__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__),moment__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/moment/moment.js"),moment__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__),html_entities__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/html-entities/lib/index.js");const formatPhoneNumber=phone=>{if(!phone)return"";const match=phone.toString().match(/^(\d{3})(\d{3})(\d{4})$/);return match?"("+match[1]+")-"+match[2]+"-"+match[3]:phone},cleanAddressForGoogle=address=>address?address.replace(/apt. /gi,""):"",addressToGoogleMapLink=(address,zipcode)=>"https://maps.google.com/?q="+cleanAddressForGoogle(address)+","+zipcode,addressToGoogleMap=(address,zipcode)=>"https://www.google.com/maps?output=embed&q="+cleanAddressForGoogle(address)+","+zipcode,floorplanAddressToGoogleMap=floorplanAddress=>"https://www.google.com/maps?output=embed&q="+cleanAddressForGoogle(floorplanAddress.address)+", "+floorplanAddress.city+", "+floorplanAddress.state+" "+floorplanAddress.zipcode,enumToString=value=>{return value&&((object=value)&&!lodash__WEBPACK_IMPORTED_MODULE_0___default().isEmpty(object))?value.replaceAll("_"," ").toLowerCase():"";var object},capitalizeFirstLetter=value=>{if(value){let lowerCased=value.toLowerCase();return lowerCased.charAt(0).toUpperCase()+lowerCased.slice(1)}return value},toUSD=num=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0}).format(num),youtubeUrlToEmbedUrl=youtubeUrl=>"https://www.youtube.com/embed/"+youtubeUrl.split("/").pop()+"?rel=0",isGoogleDriveImage=imageUrl=>imageUrl&&imageUrl.includes("drive.google.com"),extractIdFrom=imageUrl=>{if(imageUrl){const paramString=imageUrl.split("?")[1],id=new URLSearchParams(paramString).get("id");return null===id?"":id}return""},minumMaximum=(arr,field)=>{try{const sorted=arr.filter((value=>!value.active||value.active)).sort(((a,b)=>a[field]&&b[field]?a[field]-b[field]:0));return{min:sorted[0][field],max:sorted[sorted.length-1][field]}}catch(e){return{min:0,max:0}}},rangeFrom=(arr,field)=>{if(arr&&arr.length>0){const minMax=minumMaximum(arr,field);return minMax.min===minMax.max?minMax.min.toString():minMax.min+" - "+minMax.max}return"-"},dateToMoment=date=>moment__WEBPACK_IMPORTED_MODULE_1___default()(date,"YYYY-MM-DD"),decode=content=>(0,html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntity)(content),formatDate=date=>moment__WEBPACK_IMPORTED_MODULE_1___default()(date,"YYYY-MM-DD").format("MMM DD, YYYY"),isZipcodeValid=zipcode=>{if(!zipcode)return!0;return/^\d{5}$/.test(zipcode)}}}]);