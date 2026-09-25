import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./index-DlV_ZNC-.js";import{r as oe,A as se,t as ae,u as Fe,s as he,v as ye}from"./FloorplanService-RZ9U1YIK.js";import{B as ge,s as xe}from"./Bedroom-BuEuAjsV.js";import{S as v}from"./index-yRdh6vnA.js";import{F as Se}from"./FloorplanCardSkeleton-B_Z_6qjw.js";import{a as E,M}from"./Floorplan-D8hOydQa.js";import{w as b,f as je}from"./index.es-C9vOSklQ.js";import{A as ve,P as be,S as Ce,a as Ne,s as De}from"./Sort-r2kORH-p.js";import{j as Ie,k as Te,h as Ae}from"./Utils-BEMyHh2e.js";import{F as qe}from"./FloorplanCard-DLTWjXGm.js";import{V as Le}from"./VideoModal-CGWH7VTk.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./Api-BvKIhxln.js";/* empty css                      */import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";import"./video-icon-DUlcs8Mk.js";import"./AssetService-BHWYquN_.js";import"./FloorplanPrice-CGnZUFGS.js";import"./moment-DJMrFfPX.js";/* empty css                       */import"./SpecialOfferButton-CNu852L_.js";import"./ConcaveStar-Budf_w1-.js";const ne=({isCondensed:s})=>e.jsx("header",{className:"units-header",children:e.jsxs("div",{className:s?"":"container",children:[e.jsx("h2",{children:e.jsx(v,{})}),e.jsxs("div",{className:"units-filters",children:[e.jsx("div",{className:"filter-group",children:e.jsxs("div",{className:"filters",children:[e.jsx(v,{}),e.jsx(v,{}),e.jsx(v,{}),e.jsx(v,{})]})}),e.jsx("div",{className:"filter-group",children:e.jsx(v,{})})]})]})});ne.__docgenInfo={description:"",methods:[],displayName:"FloorplansHeaderSkeleton",props:{isCondensed:{required:!1,tsType:{name:"boolean"},description:""}}};const te=({isCondensed:s=!0,skeletonCount:l=8})=>e.jsx("section",{className:"section-floorplans",children:e.jsxs("div",{className:s?"container":"",children:[e.jsx(ne,{isCondensed:s}),e.jsx("div",{className:s?"":"container",children:e.jsx("div",{className:"floorplans-body",children:[...Array(l)].map((i,c)=>e.jsx(Se,{},c))})})]})});te.__docgenInfo={description:"",methods:[],displayName:"FloorplanSectionSkeleton",props:{isCondensed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},skeletonCount:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"8",computed:!1}}}};const le=({title:s,filters:l,floorplans:i,setCurrentFloorplans:c,isCondensed:f,currentFloorplansCount:m,defaultFloorplanStyle:y,defaultBedRooms:g,defaultAvailability:x,defaultMaxRent:S,defaultMinRent:j,defaultFloorplanIds:I})=>{const[u,T]=a.useState(g?[g]:[]),[F,_]=a.useState(x?[oe(x)]:[]),[h,w]=a.useState(y?[y]:[]),[t,A]=a.useState(j||E),[q,B]=a.useState(S||M),[H,ie]=a.useState("featured"),[L,pe]=a.useState(I||[]),p={bedroomFilters:u,availabilityFilters:F,styleFilters:h,minRent:t,maxRent:q,sortBy:H,floorplanIds:L},d=r=>{c(ae(i,r))},de=r=>{A(r),d({...p,minRent:r})},ce=r=>{B(r),d({...p,maxRent:r})},P=r=>{const n=u.indexOf(r),o=[...u];n>-1?o.splice(n,1):o.push(r),T(o),d({...p,bedroomFilters:o})},O=r=>{const n=F.indexOf(r),o=[...F];n>-1?o.splice(n,1):o.push(r),_(o),d({...p,availabilityFilters:o})},fe=r=>{const n=L.indexOf(r),o=[...L];n>-1&&o.splice(n,1),pe(o),d({...p,floorplanIds:o})},me=r=>{A(r.min),B(r.max),d({...p,minRent:r.min,maxRent:r.max})},W=r=>{const n=h.indexOf(r),o=[...h];n>-1?o.splice(n,1):o.push(r),w(o),d({...p,styleFilters:o})},ue=r=>{ie(r),d({...p,sortBy:r})};return e.jsx("header",{className:"units-header",children:e.jsxs("div",{className:f?"":"container",children:[e.jsx("h2",{children:s}),e.jsxs("div",{className:"units-filters",children:[e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{className:"filter-label",children:"Filter By:"}),e.jsxs("div",{className:"filters",children:[e.jsx(ge,{filters:l.bedroom,handleFilterChange:P,currentFilters:u}),e.jsx(ve,{filters:l.availability,handleFilterChange:O,currentFilters:F}),e.jsx(be,{minValue:t,maxValue:q,setMinValue:de,setMaxValue:ce}),e.jsx(Ce,{filters:l.style,handleFilterChange:W,currentFilters:h})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{className:"filter-label",children:"Sort By:"}),e.jsx("div",{className:"filters",children:e.jsx(Ne,{sortBy:H,handleSortChange:ue})})]})]}),e.jsxs("div",{className:"pills",children:[u.sort(xe).map(r=>e.jsx(b,{pillCloseHandler:()=>{P(r)},children:r+" bedroom"},r)),F.sort(De).map(r=>e.jsx(b,{pillCloseHandler:()=>{O(r)},children:se===r?r.toString():r.toString()+" availability"},r.toString())),t===E&&q===M?"":e.jsx(b,{pillCloseHandler:()=>{me({min:E,max:M})},children:"$"+t+" - $"+q},"rent"),h.map(r=>e.jsx(b,{pillCloseHandler:()=>{W(r)},children:Ie(Te(r))},r)),L.sort().map(r=>e.jsx(b,{pillCloseHandler:()=>{fe(r)},children:r},r)),e.jsxs("div",{className:"filter-result",children:[e.jsx(je,{name:"filter"})," Total: ",m," Results"]})]})]})})};le.__docgenInfo={description:"",methods:[],displayName:"FloorplansHeader",props:{defaultBedRooms:{required:!1,tsType:{name:"number"},description:""},defaultAvailability:{required:!1,tsType:{name:"string"},description:""},defaultFloorplanStyle:{required:!1,tsType:{name:"FloorplanStyle"},description:""},defaultMinRent:{required:!1,tsType:{name:"number"},description:""},defaultMaxRent:{required:!1,tsType:{name:"number"},description:""},defaultFloorplanIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},title:{required:!1,tsType:{name:"string"},description:""},filters:{required:!0,tsType:{name:"FloorplanFilters"},description:""},floorplans:{required:!0,tsType:{name:"Array",elements:[{name:"FloorplanCardData"}],raw:"FloorplanCardData[]"},description:""},setCurrentFloorplans:{required:!0,tsType:{name:"signature",type:"function",raw:"(floorplans: FloorplanCardData[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"FloorplanCardData"}],raw:"FloorplanCardData[]"},name:"floorplans"}],return:{name:"void"}}},description:""},isCondensed:{required:!1,tsType:{name:"boolean"},description:""},currentFloorplansCount:{required:!0,tsType:{name:"number"},description:""}}};const R=({floorplans:s,title:l="Floor plans",isCondensed:i=!0,propertyId:c,defaultFloorplanStyle:f,defaultBedRooms:m,defaultAvailability:y,defaultMaxRent:g,defaultMinRent:x,defaultFloorplanIds:S})=>{const[j,I]=a.useState(ae(s,{bedroomFilters:m?[m]:[],availabilityFilters:y?[oe(y)]:[],styleFilters:f?[f]:[],minRent:x||E,maxRent:g||M,sortBy:"featured",floorplanIds:S||[]})),[u,T]=a.useState(!1),[F,_]=a.useState({}),h=t=>{I(t)},w=t=>{_(t),T(!0)};return e.jsx(e.Fragment,{children:e.jsxs("section",{className:"section-floorplans",children:[e.jsx(Le,{video:F,showModal:u,setShowModal:T}),e.jsxs("div",{className:i?"container":"",children:[e.jsx(le,{title:l,filters:Fe(s),floorplans:s,setCurrentFloorplans:h,isCondensed:i,currentFloorplansCount:j.length,defaultFloorplanStyle:f,defaultBedRooms:m,defaultAvailability:y,defaultMaxRent:g,defaultMinRent:x,defaultFloorplanIds:S}),e.jsx("div",{className:i?"":"container",children:e.jsx("div",{className:"floorplans-body",children:j.length===0?e.jsx(e.Fragment,{children:e.jsx("p",{className:"floorplan-banner",children:"No matches found..."})}):j.map((t,A)=>e.jsx(qe,{floorplan:t,propertyId:c,videoClickHandler:w},A))})})]})]})})};R.__docgenInfo={description:"",methods:[],displayName:"FloorplansSection",props:{defaultBedRooms:{required:!1,tsType:{name:"number"},description:""},defaultAvailability:{required:!1,tsType:{name:"string"},description:""},defaultFloorplanStyle:{required:!1,tsType:{name:"FloorplanStyle"},description:""},defaultMinRent:{required:!1,tsType:{name:"number"},description:""},defaultMaxRent:{required:!1,tsType:{name:"number"},description:""},defaultFloorplanIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},floorplans:{required:!0,tsType:{name:"Array",elements:[{name:"FloorplanCardData"}],raw:"FloorplanCardData[]"},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Floor plans"',computed:!1}},isCondensed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},propertyId:{required:!0,tsType:{name:"string"},description:""}}};const or={title:"Section/FloorplansSection",component:R},V=s=>{const[l,i]=a.useState([]),[c,f]=a.useState(!0);return a.useEffect(()=>{he("verona-park").then(m=>{i(ye(m,"featured"))}).finally(()=>{f(!1)})},[]),c?e.jsx(te,{}):e.jsx(R,{...s,floorplans:l,propertyId:"scholars-rooftop"})},k=V.bind({}),C=V.bind({});C.args={defaultAvailability:Ae().add(1,"month").format("MM-YYYY"),propertyId:"verona-park"};const N=V.bind({});N.args={defaultAvailability:se};const D=V.bind({});D.args={defaultFloorplanIds:["blair-flat","crestone","capri","3335ec"],propertyId:"verona-park"};var Y,$,z;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`args => {
  const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    // getAllPropertyFilterData().then(properties => {
    //   const floorplans: FloorplanCardData[] = [];
    //   properties.forEach(property => {
    //     property.floorplans.forEach(floorplan => {
    //       floorplans.push(floorplan);
    //     });
    //   });
    //   setFloorplans(sortFloorplans(floorplans,"featured"));
    // }).finally(() => {
    //   setIsLoading(false);
    // });

    getFloorplansFilterData("verona-park").then(floorplanData => {
      setFloorplans(sortFloorplans(floorplanData, "featured"));
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);
  return isLoading ? <FloorplanSectionSkeleton /> : <FloorplansSection {...args} floorplans={floorplans} propertyId="scholars-rooftop" />;
}`,...(z=($=k.parameters)==null?void 0:$.docs)==null?void 0:z.source}}};var X,G,J;C.parameters={...C.parameters,docs:{...(X=C.parameters)==null?void 0:X.docs,source:{originalSource:`args => {
  const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    // getAllPropertyFilterData().then(properties => {
    //   const floorplans: FloorplanCardData[] = [];
    //   properties.forEach(property => {
    //     property.floorplans.forEach(floorplan => {
    //       floorplans.push(floorplan);
    //     });
    //   });
    //   setFloorplans(sortFloorplans(floorplans,"featured"));
    // }).finally(() => {
    //   setIsLoading(false);
    // });

    getFloorplansFilterData("verona-park").then(floorplanData => {
      setFloorplans(sortFloorplans(floorplanData, "featured"));
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);
  return isLoading ? <FloorplanSectionSkeleton /> : <FloorplansSection {...args} floorplans={floorplans} propertyId="scholars-rooftop" />;
}`,...(J=(G=C.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,U;N.parameters={...N.parameters,docs:{...(K=N.parameters)==null?void 0:K.docs,source:{originalSource:`args => {
  const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    // getAllPropertyFilterData().then(properties => {
    //   const floorplans: FloorplanCardData[] = [];
    //   properties.forEach(property => {
    //     property.floorplans.forEach(floorplan => {
    //       floorplans.push(floorplan);
    //     });
    //   });
    //   setFloorplans(sortFloorplans(floorplans,"featured"));
    // }).finally(() => {
    //   setIsLoading(false);
    // });

    getFloorplansFilterData("verona-park").then(floorplanData => {
      setFloorplans(sortFloorplans(floorplanData, "featured"));
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);
  return isLoading ? <FloorplanSectionSkeleton /> : <FloorplansSection {...args} floorplans={floorplans} propertyId="scholars-rooftop" />;
}`,...(U=(Q=N.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var Z,ee,re;D.parameters={...D.parameters,docs:{...(Z=D.parameters)==null?void 0:Z.docs,source:{originalSource:`args => {
  const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    // getAllPropertyFilterData().then(properties => {
    //   const floorplans: FloorplanCardData[] = [];
    //   properties.forEach(property => {
    //     property.floorplans.forEach(floorplan => {
    //       floorplans.push(floorplan);
    //     });
    //   });
    //   setFloorplans(sortFloorplans(floorplans,"featured"));
    // }).finally(() => {
    //   setIsLoading(false);
    // });

    getFloorplansFilterData("verona-park").then(floorplanData => {
      setFloorplans(sortFloorplans(floorplanData, "featured"));
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);
  return isLoading ? <FloorplanSectionSkeleton /> : <FloorplansSection {...args} floorplans={floorplans} propertyId="scholars-rooftop" />;
}`,...(re=(ee=D.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};const sr=["Default","WithFilters","AvailableNowFilter","WithFloorplanIds"];export{N as AvailableNowFilter,k as Default,C as WithFilters,D as WithFloorplanIds,sr as __namedExportsOrder,or as default};
