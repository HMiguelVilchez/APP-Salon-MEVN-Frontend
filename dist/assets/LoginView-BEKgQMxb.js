import{Q as m,U as d,e as u,m as p,c as _,n as t,q as i,F as f,a as r,W as g,o as h,b as x}from"./main-D-xxpp6D.js";const w=r("h1",{class:"text-6xl font-extrabold text-white text-center mt-10"}," Cruz Barber ",-1),b=r("p",{class:"text-2xl text-white text-center my-5"}," Si tienes cuenta inicia sesión ",-1),E={__name:"LoginView",setup(v){const n=m("toast"),l=d(),s=u(!1),c=async o=>{s.value=!0;try{const{data:{token:e}}=await g.login(o);localStorage.setItem("AUTH_TOKEN",e),l.push({name:"my_appointments"})}catch(e){n.open({message:e.response.data.msg,type:"error"})}finally{s.value=!1}};return(o,e)=>{const a=p("FormKit");return h(),_(f,null,[w,b,t(a,{id:"loginForm",type:"form",actions:!1,"incomplete-message":"No se pudo enviar, revisa las notificaciones",onSubmit:c},{default:i(()=>[t(a,{type:"email",label:"Email",name:"email",placeholder:"Email de Usuario",validation:"required|email",autocomplete:"username","validation-messages":{required:"El Email es obligatorio",email:"Email no válido"}}),t(a,{type:"password",label:"Password",name:"password",placeholder:"Password de Usuario",validation:"required",autocomplete:"current-password","validation-messages":{required:"El Password es obligatorio"}}),t(a,{type:"submit"},{default:i(()=>[x("Iniciar Sesión")]),_:1})]),_:1})],64)}}};export{E as default};
