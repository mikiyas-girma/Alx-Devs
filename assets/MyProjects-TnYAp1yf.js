import{u as m,a as c,r as j,f as u,a3 as N,j as e,B as r,L as v,a4 as w,o as g}from"./index-CWn7KDYs.js";import"./label-Cx-LPInz.js";import"./textarea-fE8hiQtz.js";import{C as i,d as y}from"./card-Ce3dUB3n.js";import{S as f}from"./separator-CwsoVe7h.js";const E=()=>{const t=m(),a=c(s=>s.user.loggeduser),n=c(s=>s.projects.projects),o=c(s=>s.projects.myProjects),d=c(s=>s.team.team),p=c(s=>s.projects.status);c(s=>s.projects.error),j.useEffect(()=>{p==="idle"&&t(u())},[p,t]),j.useEffect(()=>{const s=a==null?void 0:a.id;n.length>0&&s&&t(N(s))},[n,a==null?void 0:a.id,t]);const x=s=>{console.log(s.target.value);const l=s.target.value.split(",")[0];console.log(l),t(w(l))},h=s=>{const l=s.target.value;t(g(l))};return e.jsx("div",{className:"m-auto w-96 sm:w-full",children:e.jsxs(i,{className:"min-h-96 flex flex-col sm:flex-row sm:m-4",children:[e.jsxs("div",{className:"flex-1",children:[o.map((s,l)=>e.jsxs(i,{className:"m-4 p-2",children:[e.jsx("div",{children:e.jsx("p",{children:s.title})}),e.jsx("div",{children:e.jsx("p",{className:"font-serif",children:s.description})}),e.jsx(r,{className:"mt-2",variant:"outline",value:s.id,onClick:h,children:"See Team Members"})]},l)),o.length===0&&e.jsxs("div",{className:"flex flex-col items-center justify-center h-full",children:[e.jsx("p",{className:"font-serif font-light tracking-wider",children:"You have not created any projects yet"}),e.jsx(r,{variant:"outline",className:"m-2",children:e.jsx(v,{to:"/create_project",children:"Create Project"})})]})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-center w-full font-bold",children:"Team Members"}),e.jsx(i,{className:"m-4 p-2",children:e.jsx(y,{className:"text-left p-4",children:d.map((s,l)=>e.jsxs("div",{children:[s.status=="approved"&&s.role!=="Owner"&&e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex",children:[e.jsx("p",{className:"p-2 m-2 w-full",children:s.user.name}),e.jsx("p",{className:"p-2 m-2 w-full",children:s.role}),e.jsx("p",{className:"p-2 m-2 text-green-500 w-full",children:s.status}),e.jsx(r,{className:"px-2 m-2 bg-red-500 w-full",value:[s.id,"rejected"],onClick:x,children:"Reject"})]}),e.jsx(f,{})]}),(s.status=="pending"||s.status=="rejected"&&s.role!=="Owner")&&e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex",children:[e.jsx("p",{className:"p-2 m-2 w-full",children:s.user.name}),e.jsx("p",{className:"p-2 m-2 w-full",children:s.role}),e.jsx("p",{className:"p-2 m-2 text-yellow-400 w-full",children:s.status}),e.jsx(r,{className:"px-2 m-2 w-full",value:[s.id,"approved"],onClick:x,children:"Approve"})]}),e.jsx(f,{})]}),d.length<=1&&e.jsx("div",{className:"flex flex-col items-center justify-center h-full",children:e.jsx("p",{className:"font-serif font-light tracking-wider",children:"No applicants yet"})})]},l))})})]})]})})};export{E as default};
