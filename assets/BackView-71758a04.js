import{_ as d,R as _,a as p,r as u,o as h,c as k,b as e,d as o,e as s,w as c,k as m,F as f}from"./index-44870636.js";const{VITE_APP_URL:$}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"yuna1002",BASE_URL:"/vueWeek6Hw/",MODE:"production",DEV:!1,PROD:!0},v={components:{RouterLink:_,RouterView:p},methods:{logout(){document.cookie=`yunaToken=; expires=${new Date}`,this.$router.push("/login")},checkAccount(){const r=document.cookie.replace(/(?:(?:^|.*;\s*)yunaToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=r,this.$http.post(`${$}/api/user/check`).then(t=>{}).catch(t=>{t.response.data.success||this.$router.push("/login")})}},mounted(){this.checkAccount()}},w={class:"d-flex justify-content-between align-items-center"},P=o("hr",null,null,-1);function V(r,t,b,x,A,a){const n=u("router-link"),i=u("router-view");return h(),k(f,null,[e(" 這是後台 "),o("div",w,[o("div",null,[s(n,{to:"/admin/backProducts"},{default:c(()=>[e("產品管理")]),_:1}),e(" | "),s(n,{to:"/admin/backOders"},{default:c(()=>[e("訂單管理")]),_:1}),e(" | "),s(n,{to:"/"},{default:c(()=>[e("返回前台")]),_:1})]),o("div",null,[o("button",{class:"btn btn-primary",type:"button",onClick:t[0]||(t[0]=m((...l)=>a.logout&&a.logout(...l),["prevent"]))},"登出")])]),P,s(i)],64)}const E=d(v,[["render",V]]);export{E as default};