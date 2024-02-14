/*! For license information please see gallery-GalleryHeroSkeleton-stories.6ad552b2.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_renaissancerentals_renaissance_component=self.webpackChunk_renaissancerentals_renaissance_component||[]).push([[569],{"./src/gallery/GalleryHeroSkeleton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _GalleryHeroSkeleton__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/gallery/GalleryHeroSkeleton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Section/GalleryHeroMain Skeleton",component:_GalleryHeroSkeleton__WEBPACK_IMPORTED_MODULE_1__.R},Default=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_GalleryHeroSkeleton__WEBPACK_IMPORTED_MODULE_1__.R,{});Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <GalleryHeroSkeleton />",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/gallery/assets/GalleryHero.scss":()=>{},"./node_modules/react-loading-skeleton/dist/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const SkeletonThemeContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({}),defaultEnableAnimation=!0;function styleOptionsToCssProperties({baseColor,highlightColor,width,height,borderRadius,circle,direction,duration,enableAnimation=defaultEnableAnimation}){const style={};return"rtl"===direction&&(style["--animation-direction"]="reverse"),"number"==typeof duration&&(style["--animation-duration"]=`${duration}s`),enableAnimation||(style["--pseudo-element-display"]="none"),"string"!=typeof width&&"number"!=typeof width||(style.width=width),"string"!=typeof height&&"number"!=typeof height||(style.height=height),"string"!=typeof borderRadius&&"number"!=typeof borderRadius||(style.borderRadius=borderRadius),circle&&(style.borderRadius="50%"),void 0!==baseColor&&(style["--base-color"]=baseColor),void 0!==highlightColor&&(style["--highlight-color"]=highlightColor),style}function Skeleton({count=1,wrapper:Wrapper,className:customClassName,containerClassName,containerTestId,circle=!1,style:styleProp,...originalPropsStyleOptions}){var _a,_b,_c;const contextStyleOptions=react__WEBPACK_IMPORTED_MODULE_0__.useContext(SkeletonThemeContext),propsStyleOptions={...originalPropsStyleOptions};for(const[key,value]of Object.entries(originalPropsStyleOptions))void 0===value&&delete propsStyleOptions[key];const styleOptions={...contextStyleOptions,...propsStyleOptions,circle},style={...styleProp,...styleOptionsToCssProperties(styleOptions)};let className="react-loading-skeleton";customClassName&&(className+=` ${customClassName}`);const inline=null!==(_a=styleOptions.inline)&&void 0!==_a&&_a,elements=[],countCeil=Math.ceil(count);for(let i=0;i<countCeil;i++){let thisStyle=style;if(countCeil>count&&i===countCeil-1){const width=null!==(_b=thisStyle.width)&&void 0!==_b?_b:"100%",fractionalPart=count%1,fractionalWidth="number"==typeof width?width*fractionalPart:`calc(${width} * ${fractionalPart})`;thisStyle={...thisStyle,width:fractionalWidth}}const skeletonSpan=react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className,style:thisStyle,key:i},"‌");inline?elements.push(skeletonSpan):elements.push(react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{key:i},skeletonSpan,react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null)))}return react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{className:containerClassName,"data-testid":containerTestId,"aria-live":"polite","aria-busy":null!==(_c=styleOptions.enableAnimation)&&void 0!==_c?_c:defaultEnableAnimation},Wrapper?elements.map(((el,i)=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(Wrapper,{key:i},el))):elements)}},"./src/gallery/GalleryHeroSkeleton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>GalleryHeroSkeleton});__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/gallery/assets/GalleryHero.scss");var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react-loading-skeleton/dist/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const GalleryHeroSkeleton=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"div-gallery",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"gallery-hero",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3__.Z,{})})});try{GalleryHeroSkeleton.displayName="GalleryHeroSkeleton",GalleryHeroSkeleton.__docgenInfo={description:"",displayName:"GalleryHeroSkeleton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/gallery/GalleryHeroSkeleton.tsx#GalleryHeroSkeleton"]={docgenInfo:GalleryHeroSkeleton.__docgenInfo,name:"GalleryHeroSkeleton",path:"src/gallery/GalleryHeroSkeleton.tsx#GalleryHeroSkeleton"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);