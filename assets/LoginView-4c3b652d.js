import{_ as d,o as u,c,d as s,k as m,h as a,j as l}from"./index-44870636.js";const{VITE_APP_URL:p}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"yuna1002",BASE_URL:"/vueWeek6Hw/",MODE:"production",DEV:!1,PROD:!0},f={data(){return{user:{username:"",password:""}}},methods:{login(){this.$http.post(`${p}/admin/signin`,this.user).then(t=>{const{token:e,expired:i}=t.data;document.cookie=`yunaToken=${e}; expires=${new Date(i)}`,this.$router.push("/admin/backProducts")}).catch(t=>{t.response.data.success===!1&&(alert("輸入錯誤，請重新輸入"),this.user.username="",this.user.password="")})}}},_={class:"container"},h={class:"row justify-content-center"},w=s("h1",{class:"h3 mb-3 font-weight-normal text-center"},"登入後台",-1),g={class:"col-8"},b={class:"form-floating mb-3"},v=s("label",{for:"username"},"Email address",-1),P={class:"form-floating"},k=s("label",{for:"password"},"Password",-1);function x(t,e,i,E,r,n){return u(),c("div",_,[s("div",h,[w,s("div",g,[s("form",{id:"form",class:"form-signin",onSubmit:e[3]||(e[3]=m((...o)=>n.login&&n.login(...o),["prevent"]))},[s("div",b,[a(s("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:"","onUpdate:modelValue":e[0]||(e[0]=o=>r.user.username=o)},null,512),[[l,r.user.username]]),v]),s("div",P,[a(s("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":e[1]||(e[1]=o=>r.user.password=o)},null,512),[[l,r.user.password]]),k]),s("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit",onClick:e[2]||(e[2]=(...o)=>n.login&&n.login(...o))}," 登入 ")],32)])])])}const y=d(f,[["render",x]]);export{y as default};