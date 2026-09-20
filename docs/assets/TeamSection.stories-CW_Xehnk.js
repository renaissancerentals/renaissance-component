import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./index-DlV_ZNC-.js";import{T as y}from"./TeamCard-CF4CGDSa.js";import{T}from"./TeamCardSkeleton-B0eysEEH.js";import{a as b}from"./PropertyService-D8WNZ4U9.js";import{A as M}from"./Api-BvKIhxln.js";import"./_commonjsHelpers-Cpj98o6Y.js";/* empty css                 */import"./AssetService-BHWYquN_.js";import"./Utils-BEMyHh2e.js";import"./index-yRdh6vnA.js";const p=({teamMembers:t,isLoading:s,propertyId:o})=>e.jsxs("section",{className:"section-team",children:[e.jsx("h2",{className:"heading",children:e.jsx("span",{className:"emphasized",children:"Meet Our Team"})}),e.jsx("div",{className:"members",children:s?[...Array(3)].map((r,n)=>e.jsx(T,{},n)):t.map(r=>e.jsx(y,{member:r,propertyId:o},r.name))})]});p.__docgenInfo={description:"",methods:[],displayName:"TeamSection",props:{teamMembers:{required:!0,tsType:{name:"Array",elements:[{name:"TeamMember"}],raw:"TeamMember[]"},description:""},isLoading:{required:!0,tsType:{name:"boolean"},description:""},propertyId:{required:!0,tsType:{name:"string"},description:""}}};const S=()=>M.get("teamMembers").then(t=>t.data),P={title:"Section/Team",component:p},m=()=>{const[t,s]=a.useState({}),[o,r]=a.useState(!0);return a.useEffect(()=>{b("verona-park").then(n=>{s(n)}).finally(()=>{r(!1)})},[]),e.jsx(p,{isLoading:o,teamMembers:t.teamMembers,propertyId:"verona-park"})},i=()=>{const[t,s]=a.useState([]),[o,r]=a.useState(!0);return a.useEffect(()=>{S().then(n=>{s(n)}).finally(()=>{r(!1)})},[]),e.jsx(p,{isLoading:o,teamMembers:t,propertyId:"verona-park"})};m.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"All"};var d,c,l;m.parameters={...m.parameters,docs:{...(d=m.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [property, setProperty] = useState<PropertyDetails>({} as PropertyDetails);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getProperty("verona-park").then(data => {
      setProperty(data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);
  return <TeamSection isLoading={isLoading} teamMembers={property.teamMembers} propertyId="verona-park" />;
}`,...(l=(c=m.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var u,f,g;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllTeamMembers().then(data => {
      setTeamMembers(data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);
  return <TeamSection isLoading={isLoading} teamMembers={teamMembers} propertyId="verona-park" />;
}`,...(g=(f=i.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const D=["Default","All"];export{i as All,m as Default,D as __namedExportsOrder,P as default};
