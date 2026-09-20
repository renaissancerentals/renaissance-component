import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-DlV_ZNC-.js";import{A as d}from"./AssetModal-ZkHLVWSl.js";import{a as p}from"./index.es-CPsIdmmi.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./AssetService-BHWYquN_.js";import"./Utils-BEMyHh2e.js";import"./Api-BvKIhxln.js";import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";const g={title:"Modal/AssetModal",component:d},o=()=>{const[n,e]=l.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsx(d,{assetUrl:"https://drive.google.com/uc?id=1DDxBOSmahKAbFAD0Y31Fu8i-4VPpyMEX&export=download",propertyId:"verona-park",assetTitle:"Asset image",showModal:n,setShowModal:e}),t.jsx(p,{onClick:()=>{e(!0)},children:"Show Image"})]})};o.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,a,r;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const [showModal, setShowModal] = useState(false);
  return <>
      <AssetModal assetUrl="https://drive.google.com/uc?id=1DDxBOSmahKAbFAD0Y31Fu8i-4VPpyMEX&export=download" propertyId="verona-park" assetTitle="Asset image" showModal={showModal} setShowModal={setShowModal} />
      <Button onClick={() => {
      setShowModal(true);
    }}>
        Show Image
      </Button>
    </>;
}`,...(r=(a=o.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const A=["Default"];export{o as Default,A as __namedExportsOrder,g as default};
