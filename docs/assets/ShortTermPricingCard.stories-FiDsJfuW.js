import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{j as h,k as l,t as p}from"./Utils-BEMyHh2e.js";import{S as i}from"./ShortTerm-DneDYtK-.js";import"./_commonjsHelpers-Cpj98o6Y.js";const d=({floorplans:s,contactNumber:y})=>{const r=(o,t,c)=>{const n=Number(o);return isNaN(n)||n<=0?o:(c?p(n*c):p(n))+t},b=o=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"col",children:[o.bedroom,"-Bedroom ",h(l(o.style))]}),e.jsx("div",{className:"col",children:o.bathroom}),e.jsxs("div",{className:"col",children:[o.squareFoot,"+"]}),e.jsx("div",{className:"col",children:r(o.priceFor14To29Days,"/day + tax")}),e.jsxs("div",{className:"col",children:[r(o.priceFor1To4Months,"/day/")," ",r(o.priceFor1To4Months,"/mo",30)]}),e.jsxs("div",{className:"col",children:[r(o.priceFor4andMoreMonths,"/day/")," ",r(o.priceFor4andMoreMonths,"/mo",30)]})]}),a=(o,t)=>e.jsxs("tr",{children:[e.jsx("th",{children:o}),t.map((c,n)=>e.jsx("td",{children:c},"td-"+n))]});return e.jsx("section",{className:"section-pricing-card",children:e.jsxs("div",{className:"container",children:[e.jsx("h2",{className:"heading",children:e.jsx("span",{className:"emphasized",children:"Short Term Pricing"})}),e.jsx("div",{className:"mobile",children:e.jsx("div",{className:"table-container",children:e.jsx("table",{children:e.jsxs("tbody",{children:[a("bedrooms",s.map(o=>o.bedroom+"-Bedroom "+h(l(o.style)))),a("bath",s.map(o=>o.bathroom+"")),a("sq. ft.",s.map(o=>o.squareFoot+"+")),a("14-29 days",s.map(o=>r(o.priceFor14To29Days,"/day + tax"))),a("1-4 months",s.map(o=>r(o.priceFor1To4Months,"/day/ ")+r(o.priceFor1To4Months,"/mo",30))),a("4+ months",s.map(o=>r(o.priceFor4andMoreMonths,"/day/ ")+r(o.priceFor4andMoreMonths,"/mo",30)))]})})})}),e.jsx("div",{className:"main",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col head",children:"bedrooms"}),e.jsx("div",{className:"col head",children:"bath"}),e.jsx("div",{className:"col head",children:"sq. ft."}),e.jsx("div",{className:"col head",children:"14-29 days"}),e.jsx("div",{className:"col head",children:"1-4 months"}),e.jsx("div",{className:"col head",children:"4+ months"}),s.sort((o,t)=>parseInt(o.name)-parseInt(t.name)).map(o=>b(o))]})})]})})};d.__docgenInfo={description:"",methods:[],displayName:"ShortTermPricingCard",props:{floorplans:{required:!0,tsType:{name:"Array",elements:[{name:"FloorplanShortTerm"}],raw:"FloorplanShortTerm[]"},description:""},contactNumber:{required:!0,tsType:{name:"string"},description:""}}};const S={component:d,title:"Short Term/Short Term Pricing Card",render:s=>e.jsx(d,{...s})},m={args:{contactNumber:"8123332280",floorplans:[{id:"17789",name:"2 Bedroom Flat",style:i.APARTMENT,bedroom:2,bathroom:2,priceFor14To29Days:"119.0",priceFor1To4Months:"93.0",priceFor4andMoreMonths:"81.0",squareFoot:750},{id:"17790",name:"2 townhome",style:i.TOWN_HOME,bedroom:2,bathroom:2.5,priceFor14To29Days:"127.0",priceFor1To4Months:"101.0",priceFor4andMoreMonths:"89.0",squareFoot:1132},{id:"17791",name:"1 bedroom",style:i.APARTMENT,bedroom:1,bathroom:1,priceFor14To29Days:"102.0",priceFor1To4Months:"75.0",priceFor4andMoreMonths:"63.0",squareFoot:501},{id:"17792",name:"1 bedroom",style:i.DELUXE_APARTMENT,bedroom:1,bathroom:1,priceFor14To29Days:"102.0",priceFor1To4Months:"75.0",priceFor4andMoreMonths:"63.0",squareFoot:501}]}};var T,F,M;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    contactNumber: "8123332280",
    floorplans: [{
      id: "17789",
      name: "2 Bedroom Flat",
      style: ShortTermStyle.APARTMENT,
      bedroom: 2,
      bathroom: 2,
      priceFor14To29Days: "119.0",
      priceFor1To4Months: "93.0",
      priceFor4andMoreMonths: "81.0",
      squareFoot: 750
    } as FloorplanShortTerm, {
      id: "17790",
      name: "2 townhome",
      style: ShortTermStyle.TOWN_HOME,
      bedroom: 2,
      bathroom: 2.5,
      priceFor14To29Days: "127.0",
      priceFor1To4Months: "101.0",
      priceFor4andMoreMonths: "89.0",
      squareFoot: 1132
    } as FloorplanShortTerm, {
      id: "17791",
      name: "1 bedroom",
      style: ShortTermStyle.APARTMENT,
      bedroom: 1,
      bathroom: 1,
      priceFor14To29Days: "102.0",
      priceFor1To4Months: "75.0",
      priceFor4andMoreMonths: "63.0",
      squareFoot: 501
    } as FloorplanShortTerm, {
      id: "17792",
      name: "1 bedroom",
      style: ShortTermStyle.DELUXE_APARTMENT,
      bedroom: 1,
      bathroom: 1,
      priceFor14To29Days: "102.0",
      priceFor1To4Months: "75.0",
      priceFor4andMoreMonths: "63.0",
      squareFoot: 501
    } as FloorplanShortTerm]
  }
}`,...(M=(F=m.parameters)==null?void 0:F.docs)==null?void 0:M.source}}};const v=["Default"];export{m as Default,v as __namedExportsOrder,S as default};
