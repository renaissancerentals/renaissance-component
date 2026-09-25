import{j as x}from"./jsx-runtime-D_zvdyIk.js";import{U as m}from"./UnitCard-DASS2vCa.js";import{m as p}from"./moment-DJMrFfPX.js";import{m as u}from"./Utils-BEMyHh2e.js";import{F as E}from"./Floorplan-D8hOydQa.js";import"./index-DlV_ZNC-.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index.es-C9vOSklQ.js";import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";import"./AssetService-BHWYquN_.js";import"./Api-BvKIhxln.js";import"./SpecialOfferButton-CNu852L_.js";import"./ConcaveStar-Budf_w1-.js";import"./UnitService-DlxCAYg7.js";import"./FloorplanService-RZ9U1YIK.js";import"./FloorplanPrice-CGnZUFGS.js";/* empty css                       */const X={component:m,title:"Card/Unit Card",render:t=>x.jsx(m,{...t})},r={id:"3809-315",rent:1e3,squareFoot:1e3,moveInDate:"2023-08-04",availabilityExtensionMonths:null,floorplanId:"barcelona",floorplanName:"Barcelona",bedroom:1,bathroom:1.5,coverImage:"https://drive.google.com/uc?id=1AwPhezfH9zcAeSxDa-H1dv0rkJ2ypkGA&export=download",featured:!0,style:E.APARTMENT,specialRent:0,specialRentStartDate:"",specialRentEndDate:"",address:"1100 N Walnut St",zipcode:"47404",virtualTourLink:"https://www.paneek.net/#/tour/view/3712",videoTourLink:"https://youtu.be/UioR0vCXkUo",photosFolderId:"18BL3coOPSHfMFJyJdZ4duB63SmPbgDDI",webSpecials:[]},e={args:{unit:r,propertyId:"verona-park",videoClickHandler:t=>console.log("url: ",t.url," type ",t.type)}},a={args:{...e.args,unit:{...r,virtualTourLink:""}}},o={args:{...e.args,unit:{...r,virtualTourLink:"",videoTourLink:"",address:""}}},n={args:{...e.args,size:"small"}},s={args:{...e.args,unit:{...r,webSpecials:["$250 off your first month rent when you sign a 12-month lease","$250 off your second month rent when you sign a 12-month lease"]}}},i={args:{...e.args,unit:{...r,specialRent:800,specialRentStartDate:u(p().subtract(2,"days")),specialRentEndDate:u(p().add(2,"days"))}}};var c,l,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    unit: unit,
    propertyId: "verona-park",
    videoClickHandler: (video: Video) => console.log("url: ", video.url, " type ", video.type)
  }
}`,...(d=(l=e.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var g,f,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    unit: {
      ...unit,
      virtualTourLink: ""
    }
  }
}`,...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var y,S,v;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    unit: {
      ...unit,
      virtualTourLink: "",
      videoTourLink: "",
      address: ""
    }
  }
}`,...(v=(S=o.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var D,k,R;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'small'
  }
}`,...(R=(k=n.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var w,T,b;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    unit: {
      ...unit,
      webSpecials: ["$250 off your first month rent when you sign a 12-month lease", "$250 off your second month rent when you sign a 12-month lease"]
    }
  }
}`,...(b=(T=s.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var I,L,W;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    unit: {
      ...unit,
      specialRent: 800,
      specialRentStartDate: momentToDate(moment().subtract(2, "days")),
      specialRentEndDate: momentToDate(moment().add(2, "days"))
    }
  }
}`,...(W=(L=i.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const Z=["Default","Without360Icon","WithoutLeftIcons","Small","WithSpecialOffer","WithSpecialRent"];export{e as Default,n as Small,s as WithSpecialOffer,i as WithSpecialRent,a as Without360Icon,o as WithoutLeftIcons,Z as __namedExportsOrder,X as default};
