import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-DlV_ZNC-.js";import{u as m}from"./index.es-C9vOSklQ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C0QTL6_X.js";import"./index-p5Ixs3OV.js";const r=({delay:n=3e3,children:c})=>{const[l,u]=s.useState(!1);return s.useEffect(()=>{const d=setTimeout(()=>{u(!0)},n);return()=>clearTimeout(d)},[n]),e.jsx(s.Fragment,{children:l?e.jsx("div",{className:"section-announcement",children:c}):""})};r.__docgenInfo={description:"",methods:[],displayName:"Banner",props:{delay:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"3000",computed:!1}},children:{required:!1,tsType:{name:"any"},description:""}}};const j={title:"Section/Banner",component:r},f=()=>e.jsxs("div",{children:[e.jsx("p",{children:e.jsx("strong",{children:"This section loads after 3 seconds"})}),e.jsxs(r,{children:[e.jsxs("section",{className:"left",children:[e.jsx("h2",{children:"Offices Are Safely Open"}),e.jsx("p",{children:"Our offices are open by appointment; walk-in's are also welcome. We are now offering self-guided tours on-site in select units."}),e.jsx(m,{onClick:()=>{console.log("contact clicked...")},size:"small",children:"Questions? contact us ››"})]}),e.jsxs("section",{className:"right",children:[e.jsx("h2",{children:"Live, Virtual & Video Tours Available"}),e.jsx("p",{children:"Do you prefer to look for your next home from the comfort of your own living room? Schedule a live video tour with our leasing team for a customized experience.We also have Virtual 360° Tours and Video Tours for you to view online at your convenience."})]})]})]}),o=f.bind({});var t,i,a;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
  return <div>
      <p>
        <strong>This section loads after 3 seconds</strong>
      </p>
      <Banner>
        <section className="left">
          <h2>Offices Are Safely Open</h2>
          <p>
            Our offices are open by appointment; walk-in's are also welcome. We
            are now offering self-guided tours on-site in select units.
          </p>
          <Button onClick={() => {
          console.log("contact clicked...");
        }} size="small">
            Questions? contact us ››
          </Button>
        </section>
        <section className="right">
          <h2>Live, Virtual & Video Tours Available</h2>
          <p>
            Do you prefer to look for your next home from the comfort of your
            own living room? Schedule a live video tour with our leasing team
            for a customized experience.We also have Virtual 360&deg; Tours and
            Video Tours for you to view online at your convenience.
          </p>
        </section>
      </Banner>
    </div>;
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const T=["Default"];export{o as Default,T as __namedExportsOrder,j as default};
