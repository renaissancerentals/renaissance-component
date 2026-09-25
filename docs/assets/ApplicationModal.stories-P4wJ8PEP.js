import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-DlV_ZNC-.js";import{a as d,f as u,u as h}from"./index.es-C9vOSklQ.js";import{A as v}from"./ApplicationSection-BRZ9zswj.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";import"./Api-BvKIhxln.js";import"./Property-CWCRJdXv.js";import"./SubmissionRequestBanner-Cl8uG4Zn.js";import"./ApplicationCompletion-DoL1do3O.js";const t=({showApplicationModal:r,applicationModalCloseHandler:a,propertyId:o,community:c,contactClickHandler:p})=>e.jsx("div",{className:"div-contact--modal",children:e.jsxs(d,{show:r,setShow:a,children:[e.jsx("div",{className:"close",onClick:a,children:e.jsx(u,{name:"close",size:"medium"})}),e.jsx(v,{contactClickHandler:p,propertyId:o,community:c})]})});t.__docgenInfo={description:"",methods:[],displayName:"ApplicationModal",props:{propertyId:{required:!0,tsType:{name:"union",raw:"| PropertyId | UmbrellaSiteId",elements:[{name:"union",raw:`"arch-haven" |
"cov-affordable" |
"covenanter-hill" |
"high-grove" |
"huntington-gardens" |
"sh-garages" |
"scholars-quad" |
"scholars-rock" |
"scholars-rooftop" |
"summer-house" |
"summer-house-short-term" |
"verona-park"`,elements:[{name:"literal",value:'"arch-haven"'},{name:"literal",value:'"cov-affordable"'},{name:"literal",value:'"covenanter-hill"'},{name:"literal",value:'"high-grove"'},{name:"literal",value:'"huntington-gardens"'},{name:"literal",value:'"sh-garages"'},{name:"literal",value:'"scholars-quad"'},{name:"literal",value:'"scholars-rock"'},{name:"literal",value:'"scholars-rooftop"'},{name:"literal",value:'"summer-house"'},{name:"literal",value:'"summer-house-short-term"'},{name:"literal",value:'"verona-park"'}]},{name:"union",raw:`| "renaissance-rentals"
| "apartments-in-bloomington"
| "bloomington-apartments"`,elements:[{name:"literal",value:'"renaissance-rentals"'},{name:"literal",value:'"apartments-in-bloomington"'},{name:"literal",value:'"bloomington-apartments"'}]}]},description:""},community:{required:!1,tsType:{name:"string"},description:""},contactClickHandler:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},showApplicationModal:{required:!0,tsType:{name:"boolean"},description:""},applicationModalCloseHandler:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const q={title:"Section/Application Modal",component:t},g=r=>{const[a,o]=m.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(t,{showApplicationModal:a,applicationModalCloseHandler:()=>o(!1),contactClickHandler:()=>console.log("contact clicked"),propertyId:"scholars-rooftop"}),e.jsx(h,{onClick:()=>{o(!0)},children:"Application"})]})},n=g.bind({});var l,i,s;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  return <>
      <ApplicationModal showApplicationModal={showApplicationModal} applicationModalCloseHandler={() => setShowApplicationModal(false)} contactClickHandler={() => console.log("contact clicked")} propertyId="scholars-rooftop" />
      <Button onClick={() => {
      setShowApplicationModal(true);
    }}>
        Application
      </Button>
    </>;
}`,...(s=(i=n.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const I=["Default"];export{n as Default,I as __namedExportsOrder,q as default};
