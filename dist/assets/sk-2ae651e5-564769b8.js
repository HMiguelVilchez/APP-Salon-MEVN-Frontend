import{$ as _}from"./index-21b082e6-add6e1c7.js";import"./en-4402d6fc-aaf0afdb.js";function o(e){return e>1&&e<5&&~~(e/10)!==1}function n(e,t,s,r){var m=e+" ";switch(s){case"s":return t||r?"pár sekúnd":"pár sekundami";case"m":return t?"minúta":r?"minútu":"minútou";case"mm":return t||r?m+(o(e)?"minúty":"minút"):m+"minútami";case"h":return t?"hodina":r?"hodinu":"hodinou";case"hh":return t||r?m+(o(e)?"hodiny":"hodín"):m+"hodinami";case"d":return t||r?"deň":"dňom";case"dd":return t||r?m+(o(e)?"dni":"dní"):m+"dňami";case"M":return t||r?"mesiac":"mesiacom";case"MM":return t||r?m+(o(e)?"mesiace":"mesiacov"):m+"mesiacmi";case"y":return t||r?"rok":"rokom";case"yy":return t||r?m+(o(e)?"roky":"rokov"):m+"rokmi"}}var a={name:"sk",weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),months:"január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),monthsShort:"jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),weekStart:1,yearStart:4,ordinal:function(e){return e+"."},formats:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm",l:"D. M. YYYY"},relativeTime:{future:"za %s",past:"pred %s",s:n,m:n,mm:n,h:n,hh:n,d:n,dd:n,M:n,MM:n,y:n,yy:n}};_.locale(a,null,!0);export{a as default};
