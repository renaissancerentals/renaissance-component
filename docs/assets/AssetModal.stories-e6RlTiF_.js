import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-DlV_ZNC-.js";import{A as d}from"./AssetModal-D4CPhkQ2.js";import{u as p}from"./index.es-C9vOSklQ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./AssetService-DZhsFs_F.js";import"./Utils-Dufct5dv.js";import"./Api-hWnmHzV3.js";import"./ImageWidth-DGGxL6yB.js";import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";const A={title:"Modal/AssetModal",component:d},o=()=>{const[n,e]=l.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsx(d,{assetUrl:"https://drive.google.com/uc?id=1DDxBOSmahKAbFAD0Y31Fu8i-4VPpyMEX&export=download",propertyId:"verona-park",assetTitle:"Asset image",showModal:n,setShowModal:e}),t.jsx(p,{onClick:()=>{e(!0)},children:"Show Image"})]})};o.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,r,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const [showModal, setShowModal] = useState(false);
  return <>
      <AssetModal assetUrl="https://drive.google.com/uc?id=1DDxBOSmahKAbFAD0Y31Fu8i-4VPpyMEX&export=download" propertyId="verona-park" assetTitle="Asset image" showModal={showModal} setShowModal={setShowModal} />
      <Button onClick={() => {
      setShowModal(true);
    }}>
        Show Image
      </Button>
    </>;
}`,...(a=(r=o.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const D=["Default"];export{o as Default,D as __namedExportsOrder,A as default};
