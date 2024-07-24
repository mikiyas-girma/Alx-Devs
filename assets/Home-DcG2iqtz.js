import{c as p,u as N,a as r,b as g,r as C,f as y,j as e,L as l,B as n,I as d,s as v,P}from"./index-DAXjKe-k.js";import{C as i,a as m,b as x,c as j,d as b}from"./card-NGvnU_dD.js";import{L as w}from"./loading-spinner-CyNq3rb8.js";/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=p("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),q=()=>{const a=N(),o=r(s=>s.projects.projects),t=r(s=>s.projects.status),h=r(s=>s.projects.error),c=r(s=>s.user.loggeduser),u=g(),f=s=>{a(v(s)),u(P.PROJECT.replace(":id",s.id))};return C.useEffect(()=>{(t=="idle"||!o.length)&&a(y())},[t,a]),t=="loading"?e.jsx("div",{className:"flex items-center h-96 justify-center",children:e.jsx(w,{className:""})}):t=="failed"?e.jsx("div",{children:h}):e.jsx(e.Fragment,{children:e.jsxs(i,{className:"min-h-screen",children:[e.jsxs(i,{className:"flex justify-around items-center",children:[e.jsxs(m,{className:"text-center text-[#03AC13]",children:[e.jsxs(x,{children:["Welcome ",c==null?void 0:c.username]}),e.jsx(j,{className:`text-base tracking-wider
                                                            text-current font-serif`,children:"Explore and Apply for Projects"})]}),e.jsx(l,{to:"../my_requests",children:e.jsx(n,{className:"m-4 border-green-700",variant:"outline",children:"My Requests"})}),e.jsx(l,{to:"../create_project",children:e.jsx(n,{className:"m-4 border-green-700",variant:"outline",children:"Create Project"})})]}),e.jsx("h2",{className:"my-7 font-serif text-xl text-center",children:"Explore Some Projects You Can Do"}),e.jsxs("div",{className:"m-auto md:pb-7 w-96 sm:w-2/3 gap-4 flex justify-around",children:[e.jsx(d,{type:"text",placeholder:"Filter",className:"text-center mx-2"}),e.jsx("form",{className:"w-full",children:e.jsxs("div",{className:"relative",children:[e.jsx(k,{className:"absolute left-2.5 top-2.5 h-5 w-4 text-muted-foreground"}),e.jsx(d,{type:"search",placeholder:"Search Projects...",className:"pl-8"})]})})]}),e.jsx("div",{className:`mx-6 my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:m-2 sm:gap-2 md:gap-4 md:mx-6 md:my-4
                                lg:grid-cols-3 flex flex-wrap`,children:o.map(s=>e.jsx("div",{className:"flex-1",children:e.jsxs(i,{className:"h-full flex flex-col",children:[e.jsxs(m,{children:[e.jsx(x,{className:"text-center text-[#03C04A]",children:s.title}),e.jsx(j,{className:`text-base tracking-wider
                                                            text-current font-serif`,children:s.description})]}),e.jsx(b,{className:"mt-auto",children:e.jsx(n,{variant:"outline",onClick:()=>f(s),asChild:!0,children:e.jsx(l,{className:"m-auto text-[#0C7C59]",children:"View"})})})]})},s.id))})]})})};export{q as default};
