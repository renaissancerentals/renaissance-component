import{j as J}from"./jsx-runtime-D_zvdyIk.js";import{F as p}from"./FloorplanCard-Q_n2GDvD.js";import{F as P}from"./Floorplan-D8hOydQa.js";import{m}from"./moment-DJMrFfPX.js";import{m as c}from"./Utils-85FbDmvI.js";import"./index-DlV_ZNC-.js";import"./_commonjsHelpers-Cpj98o6Y.js";/* empty css                      */import"./video-icon-DUlcs8Mk.js";import"./index.es-C9vOSklQ.js";import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";import"./AssetService-D81cTkxb.js";import"./Api-BvKIhxln.js";import"./FloorplanService-DKInOy-T.js";import"./FloorplanPrice-BuqRjZZZ.js";/* empty css                       */import"./SpecialOfferButton-CNu852L_.js";import"./ConcaveStar-Budf_w1-.js";const rr={component:p,title:"Card/Floorplan Card",render:o=>J.jsx(p,{...o})},e={name:"Barcelona",id:"barcelona",virtualTourLink:"https://www.paneek.net/#/tour/view/3712",videoTourLink:"https://youtu.be/UioR0vCXkUo",photosFolderId:"18BL3coOPSHfMFJyJdZ4duB63SmPbgDDI",units:[{id:"1100-8",squareFoot:710,rent:1195,moveInDate:"2023-08-04",availabilityExtensionMonths:null},{id:"1100-9",squareFoot:710,rent:1165,moveInDate:"2023-08-09",availabilityExtensionMonths:null}],style:P.APARTMENT,bathroom:1,featured:!0,bedroom:1,coverImage:"https://drive.google.com/uc?id=1pXtrJgJhTrdLeuwtP6lKSjULfF7TPJtf&export=download",specialRent:0,specialRentStartDate:"",specialRentEndDate:"",address:"1100 N Walnut St",zipcode:"47404",webSpecials:[]},r={args:{floorplan:e,propertyId:"verona-park",videoClickHandler:o=>console.log("url: ",o.url," type ",o.type)}},a={args:{...r.args,floorplan:{...e,virtualTourLink:""}}},t={args:{...r.args,floorplan:{...e,virtualTourLink:"",videoTourLink:""}}},n={args:{...r.args,size:"small"}},s={args:{...r.args,floorplan:{...e,webSpecials:["$250 off your first month rent when you sign a 12-month lease","$250 off your second month rent when you sign a 12-month lease"]}}},l={args:{...r.args,floorplan:{...e,specialRent:800,specialRentStartDate:c(m().subtract(2,"days")),specialRentEndDate:c(m().add(2,"days"))}}},i={args:{...r.args,variant:"featured"}};var u,d,f;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    floorplan: floorplan,
    propertyId: "verona-park",
    videoClickHandler: (video: Video) => console.log("url: ", video.url, " type ", video.type)
  }
}`,...(f=(d=r.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var g,h,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    floorplan: {
      ...floorplan,
      virtualTourLink: ""
    }
  }
}`,...(v=(h=a.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var y,S,D;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    floorplan: {
      ...floorplan,
      virtualTourLink: "",
      videoTourLink: ""
    }
  }
}`,...(D=(S=t.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var T,k,R;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'small'
  }
}`,...(R=(k=n.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var w,L,b;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    floorplan: {
      ...floorplan,
      webSpecials: ["$250 off your first month rent when you sign a 12-month lease", "$250 off your second month rent when you sign a 12-month lease"]
    }
  }
}`,...(b=(L=s.parameters)==null?void 0:L.docs)==null?void 0:b.source}}};var F,I,W;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    floorplan: {
      ...floorplan,
      specialRent: 800,
      specialRentStartDate: momentToDate(moment().subtract(2, "days")),
      specialRentEndDate: momentToDate(moment().add(2, "days"))
    }
  }
}`,...(W=(I=l.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var x,E,C;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: "featured"
  }
}`,...(C=(E=i.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};const er=["Default","Without360Icon","WithoutLeftIcons","Small","WithSpecialOffer","WithSpecialRent","Featured"];export{r as Default,i as Featured,n as Small,s as WithSpecialOffer,l as WithSpecialRent,a as Without360Icon,t as WithoutLeftIcons,er as __namedExportsOrder,rr as default};
