import{r as h,o as e,c as s,a as t,e as c,t as i,b as a,F as p,f as _,d as f,k as g,u as k,j as b}from"./index-73e3db28.js";import{d as y}from"./date-2980fb59.js";import{f as u}from"./index-6e1818aa.js";import{u as C}from"./appointments-9313e5de.js";const w={class:"bg-white p-5 space-y-3 rounded-lg"},A={class:"text-gray-500 font-black"},$={class:"font-light"},v={class:"font-light"},B=t("p",{class:"text-lg font-black"},"Servicios solicitados en la cita",-1),N={class:"text-2xl font-black text-blue-500"},S={class:"text-2xl font-black text-right"},V={class:"text-blue-600"},E={class:"flex gap-2 items-center"},F={__name:"Appointment",props:{appointment:{type:Object,required:!0}},setup(n){const o=C(),d=n,m=()=>{confirm("¿Estás seguro de que deseas cancelar esta cita?")&&o.cancelAppointment(d.appointment._id)};return(r,T)=>{const x=h("RouterLink");return e(),s("div",w,[t("p",A,[c(" Fecha: "),t("span",$,i(a(y)(n.appointment.date)),1),c(" Hora: "),t("span",v,i(n.appointment.time),1)]),B,(e(!0),s(p,null,_(n.appointment.services,l=>(e(),s("div",{key:l.id},[t("p",null,i(l.name),1),t("p",N,i(a(u)(l.price)),1)]))),128)),t("p",S,[c(" Total a pagar: "),t("span",V,i(a(u)(n.appointment.totalAmount)),1)]),t("div",E,[f(x,{to:{name:"edit-appointment",params:{id:n.appointment._id}},class:"bg-slate-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"},{default:g(()=>[c(" Editar Cita ")]),_:1},8,["to"]),t("button",{onClick:m,class:"bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"}," Cancelar Cita ")])])}}},L=t("h2",{class:"text-4xl font-extrabold text-white mt-10"},"Mis Citas",-1),j=t("p",{class:"text-white text-lg mt-5"}," A continuación podrás administrar tus citas ",-1),q={key:0,class:"text-white text-2xl text-center mt-5"},D={key:1},M={key:0,class:"text-white text-2xl text-center mt-5"},R={key:1,class:"grid grid-cols-1 gap-5 mt-10"},G={__name:"MyAppointmentsView",setup(n){const o=k();return(d,m)=>(e(),s(p,null,[L,j,a(o).loading?(e(),s("p",q," Cargando... ")):(e(),s("div",D,[a(o).noAppointments?(e(),s("p",M," No tienes próximas citas ")):(e(),s("div",R,[(e(!0),s(p,null,_(a(o).userAppointments,r=>(e(),b(F,{key:r._id,appointment:r},null,8,["appointment"]))),128))]))]))],64))}};export{G as default};
