import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{m as a}from"./Utils-85FbDmvI.js";import{m as s}from"./moment-DJMrFfPX.js";import{H as c,u}from"./HomePageSpecialModal-DF3ebZJC.js";import{u as y}from"./index.es-C9vOSklQ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-DlV_ZNC-.js";import"./HomePageSpecialCard-B32QXVW6.js";import"./AssetService-D81cTkxb.js";import"./Api-BvKIhxln.js";import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";const E={component:c,title:"Modal/Home Page Special",decorators:[r=>e.jsx("div",{style:{padding:"2rem",background:"#f5f5f5"},children:e.jsx(r,{})})]},w={id:"id",description:"High-end, luxurios, unique apartments and townhomes available for rent this summer",image:"https://drive.google.com/uc?id=1NJSraw9EOii8eHhgBaa31-tj6FECvYPA&export=download",properties:["covenanter-hill","high-grove","renaissance-rentals"],startDate:a(s().subtract(1,"days")),endDate:a(s().add(1,"month")),links:[{x:3.750003912510016,y:85.00000859650088,width:23.076923076923077,height:7.922535211267606,url:"https://www.veronaparkneighborhood.com/"},{x:29.39102955353566,y:85.00000859650088,width:20.993589743589745,height:7.746478873239436,url:"https://www.highgrovebloomington.com/"}]},f={id:"29686",description:"TEst",image:"https://drive.google.com/uc?id=1SwftE1RyvuGxybGFQoy2AqDxHz3U-Mjl&export=download",startDate:a(s().subtract(1,"days")),endDate:a(s().add(1,"month")),properties:["covenanter-hill","high-grove","renaissance-rentals"],links:[{x:2.1886000072847027,y:58.892991182109085,width:10.696692470091484,height:6.088560885608856,url:"http://www.google.com"}]},i="renaissance-rentals-specialModalClosed",o=()=>{const[r,n]=u([i]);return e.jsxs(e.Fragment,{children:["This section loads after 3 seconds",e.jsx(y,{variant:"tertiary",onClick:()=>{n(i,!1,{path:"/",maxAge:2592e3}),window.location.reload()},children:"Reset Cookie and Reload"}),e.jsx(c,{homePageSpecial:w,propertyId:"renaissance-rentals"})]})},t=()=>{const[r,n]=u([i]);return e.jsxs(e.Fragment,{children:["This section loads after 3 seconds",e.jsx(y,{variant:"tertiary",onClick:()=>{n(i,!1,{path:"/",maxAge:2592e3}),window.location.reload()},children:"Reset Cookie and Reload"}),e.jsx(c,{homePageSpecial:f,propertyId:"renaissance-rentals"})]})};o.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"Single"};var d,l,m;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [cookies, setCookie] = useCookies([cookieName]);
  return <>
        This section loads after 3 seconds
        <Button variant="tertiary" onClick={() => {
      const thirtyDays = 60 * 60 * 24 * 30;
      setCookie(cookieName, false, {
        path: '/',
        maxAge: thirtyDays
      });
      window.location.reload();
    }}>Reset Cookie and Reload</Button>
        <HomePageSpecialModal homePageSpecial={special} propertyId="renaissance-rentals" />
    </>;
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,h,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const [cookies, setCookie] = useCookies([cookieName]);
  return <>
        This section loads after 3 seconds
        <Button variant="tertiary" onClick={() => {
      const thirtyDays = 60 * 60 * 24 * 30;
      setCookie(cookieName, false, {
        path: '/',
        maxAge: thirtyDays
      });
      window.location.reload();
    }}>Reset Cookie and Reload</Button>
        <HomePageSpecialModal homePageSpecial={special1} propertyId="renaissance-rentals" />
    </>;
}`,...(g=(h=t.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const I=["Default","Single"];export{o as Default,t as Single,I as __namedExportsOrder,E as default};
