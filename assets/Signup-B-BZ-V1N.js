import{r as l,j as e,I as r,B as j,L as w}from"./index-CSB939iI.js";import{C as f,a as C,b as N,c as v,d as c}from"./card-Bx1McRU0.js";import{a as y}from"./axiosInstance-EX1YJLMY.js";const P=()=>{const[a,u]=l.useState({name:"",username:"",email:""}),[t,p]=l.useState(""),[d,h]=l.useState(""),[i,n]=l.useState(""),x=s=>{h(s.target.value),t!==s.target.value?n("Passwords do not match"):n("")},m=s=>{u({...a,[s.target.name]:s.target.value})},g=async s=>{if(s.preventDefault(),t!==d){n("Passwords do not match");return}try{const o=await y.post("/users/",{...a,password:t});console.log("Registration successful",o.data)}catch(o){console.log(o.response.data.msg),n(o.response.data.msg)}};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"m-auto w-96 sm:w-2/3 lg:w-1/2 lg:p-12 rounded-lg",children:e.jsxs(f,{children:[e.jsxs(C,{className:"text-center",children:[e.jsx(N,{children:"Sign up to register"}),e.jsx(v,{className:"text-blue-900 ",children:"Explore the power of working together"})]}),e.jsxs("form",{onSubmit:g,children:[e.jsxs(c,{className:"w-3/4 m-auto",children:[e.jsx(r,{className:"m-4",name:"name",type:"text",placeholder:"name",value:a.name,onChange:m,required:!0}),e.jsx(r,{className:"m-4",name:"username",type:"text",placeholder:"user name",value:a.username,onChange:m,required:!0}),e.jsx(r,{className:"m-4",name:"email",type:"email",placeholder:"email",value:a.email,onChange:m,required:!0}),e.jsx(r,{className:"m-4",type:"password",name:"password",placeholder:"password",value:t,onChange:s=>p(s.target.value),required:!0}),e.jsx(r,{className:"m-4",type:"password",name:"confirmpassword",placeholder:"Confirm password",value:d,onChange:x,required:!0}),i&&e.jsx("p",{className:"text-red-500",children:i})]}),e.jsx(c,{className:"text-center",children:e.jsx(j,{type:"submit",children:"Register"})}),e.jsx(c,{className:"text-center",children:e.jsxs("p",{children:["Already have an account? ",e.jsx(w,{to:"/login",className:"text-blue-500",children:"Login"})]})})]})]})})})};export{P as default};
