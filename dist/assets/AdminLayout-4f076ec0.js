import{u as l,r,o as c,c as i,a as e,t as d,b as s,d as x,F as u}from"./index-73e3db28.js";const _={class:"flex justify-between"},p=e("div",null,[e("h1",{class:"text-2xl lg:text-6xl font-black text-white"},"App Salón"),e("h2",{class:"text-xl lg:text-2xl font-black text-white"},"Panel de Administración")],-1),h={class:"flex flex-col space-y-5"},m={class:"flex gap-2 items-center"},f={class:"text-white text-right"},g={class:"space-y-6"},y={__name:"AdminLayout",setup(b){const t=l();return(w,o)=>{const a=r("RouterView");return c(),i(u,null,[e("div",_,[p,e("div",h,[e("div",m,[e("p",f,"Hola: "+d(s(t).getUserName),1),e("button",{type:"button",class:"bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg",onClick:o[0]||(o[0]=(...n)=>s(t).logout&&s(t).logout(...n))}," Cerrar Sesión ")])])]),e("main",g,[x(a)])],64)}}};export{y as default};
