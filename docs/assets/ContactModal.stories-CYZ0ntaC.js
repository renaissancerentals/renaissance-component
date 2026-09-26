import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as p}from"./index-DlV_ZNC-.js";import{a as h,f as v,u as g}from"./index.es-C9vOSklQ.js";import{C,t as f}from"./ContactSection-7Q-1HVRe.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";import"./Utils-85FbDmvI.js";import"./Property-CWCRJdXv.js";import"./Floorplan-D8hOydQa.js";import"./Api-BvKIhxln.js";import"./SubmissionRequestBanner-Cl8uG4Zn.js";const o=({showContactModal:r,contactModalCloseHandler:a,propertyId:t,variant:c,conversionTrackingId2:m,conversionTrackingId1:d,contactNumber:u})=>e.jsx("div",{className:"div-contact--modal",children:e.jsxs(h,{show:r,setShow:a,children:[e.jsx("div",{className:"close",onClick:a,children:e.jsx(v,{name:"close",size:"medium"})}),e.jsx(C,{variant:c,conversionTrackingId1:d,conversionTrackingId2:m,contactNumber:u,propertyId:t})]})});o.__docgenInfo={description:"",methods:[],displayName:"ContactModal",props:{propertyId:{required:!0,tsType:{name:"union",raw:"| PropertyId | UmbrellaSiteId",elements:[{name:"union",raw:`"arch-haven" |
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
| "bloomington-apartments"`,elements:[{name:"literal",value:'"renaissance-rentals"'},{name:"literal",value:'"apartments-in-bloomington"'},{name:"literal",value:'"bloomington-apartments"'}]}]},description:""},variant:{required:!1,tsType:{name:"literal",value:'"long"'},description:""},contactNumber:{required:!1,tsType:{name:"string"},description:""},conversionTrackingId1:{required:!1,tsType:{name:"string"},description:""},conversionTrackingId2:{required:!1,tsType:{name:"string"},description:""},showContactModal:{required:!0,tsType:{name:"boolean"},description:""},contactModalCloseHandler:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const E={title:"Section/Contact Modal",component:o},M=r=>{const[a,t]=p.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(o,{showContactModal:a,propertyId:"scholars-quad",contactModalCloseHandler:()=>t(!1),contactNumber:"8123456789"}),e.jsx(g,{onClick:()=>{t(!0),f("scholars-quad")},children:"Contact"})]})},n=M.bind({});var s,l,i;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const [showContactModal, setShowContactModal] = useState(false);
  return <>
      <ContactModal showContactModal={showContactModal} propertyId="scholars-quad" contactModalCloseHandler={() => setShowContactModal(false)} contactNumber={"8123456789"} />
      <Button onClick={() => {
      setShowContactModal(true);
      trackContactClicked("scholars-quad");
    }}>
        Contact
      </Button>
    </>;
}`,...(i=(l=n.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};const B=["Default"];export{n as Default,B as __namedExportsOrder,E as default};
