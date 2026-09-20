import{j as G}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./index-DlV_ZNC-.js";import{G as p}from"./Gallery-hRvwhHdd.js";import{b as L}from"./AssetService-BHWYquN_.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index.es-CPsIdmmi.js";import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";import"./index-yRdh6vnA.js";import"./Utils-BEMyHh2e.js";import"./Api-BvKIhxln.js";const h={title:"Section/Gallery",component:p},g=l=>{const[d,c]=r.useState(!0),[u,I]=r.useState([]);return r.useEffect(()=>{L("0B6C97UNWKNaIMXNZWFBBNmV2enM").then(y=>{I(y.filter((N,f)=>f<9)),c(!1)})},[]),G.jsx(p,{...l,images:u,isLoading:d,propertyId:"verona-park"})},e=g.bind({});e.args={type:"grid",propertyId:"verona-park"};const s=g.bind({});s.args={type:"simple",propertyId:"verona-park"};var a,t,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<Asset[]>([]);
  useEffect(() => {
    getAssetsFrom("0B6C97UNWKNaIMXNZWFBBNmV2enM").then(galleryImages => {
      setImages(galleryImages.filter((value, index) => index < 9));
      setIsLoading(false);
    });
  }, []);
  return <Gallery {...args} images={images} isLoading={isLoading} propertyId="verona-park" />;
}`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var n,i,m;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<Asset[]>([]);
  useEffect(() => {
    getAssetsFrom("0B6C97UNWKNaIMXNZWFBBNmV2enM").then(galleryImages => {
      setImages(galleryImages.filter((value, index) => index < 9));
      setIsLoading(false);
    });
  }, []);
  return <Gallery {...args} images={images} isLoading={isLoading} propertyId="verona-park" />;
}`,...(m=(i=s.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const j=["GridGallery","SimpleGallery"];export{e as GridGallery,s as SimpleGallery,j as __namedExportsOrder,h as default};
