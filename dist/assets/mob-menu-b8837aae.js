import{a as V,i as y,e as ae,b as re}from"./vendor-322b39ab.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const X=document.querySelector(".modal-give-rating"),H=document.querySelector(".give-rating-form"),le=document.querySelector(".give-rating-close"),D=H.querySelector('button[type="submit"]'),ce=document.querySelector(".give-rating-p1"),F=document.querySelector(".backdrop"),Z=document.querySelector(".modal-window"),B=document.querySelector(".give-rating-stars"),de="https://energyflow.b.goit.study/api",ue=5,me=new URL("/team02-jsproject/assets/sprite-30cecc96.svg#icon-Star-2",self.location);let x,q;const ge=(e,i)=>{x=e.currentTarget.querySelector("input").value,ee(i)},ve=(e,i)=>{ee(i)},ee=e=>{const i=event.currentTarget.querySelector("input").value;e.forEach((o,s)=>{const t=s<i;o.classList.toggle("li-selected",t),o.classList.toggle("li-unselected",!t)})},pe=async e=>{var i,o;D.disabled=!0,e.preventDefault();try{if(!x)throw Error("Please select rating! Make sure to click!");await V.patch(`${de}/exercises/${q}/rating`,{rate:+x,email:e.target.email.value,review:e.target.comment.value}),y.success({message:"Thanks for your review!",position:"topRight",icon:"",zindex:9999999999,messageColor:"var(--white)",backgroundColor:"var(--dark-gray)",position:"topRight"}),H.reset(),te(),await A(q)}catch(s){y.error({message:((o=(i=s.response)==null?void 0:i.data)==null?void 0:o.message)||s.message,position:"topRight",icon:"",zindex:9999999999})}finally{D.disabled=!1}return!1},fe=(e,i)=>{F.appendChild(X),F.classList.remove("visually-hidden"),Z.style.display="none",B.innerHTML="",x=void 0,q=e,ce.innerHTML=i;const o=`
    <svg
      class="icon-Star-2"
      width="24"
      height="24"
      aria-label="modal rating star icon"
    >
      <use href="${me}"></use>
    </svg>`,s=Array.from({length:ue},(n,a)=>{const c=document.createElement("li");c.classList.add("li-star");const r=document.createElement("label");r.innerHTML=o,r.style.pointerEvents="none";const d=document.createElement("input");return d.setAttribute("type","checkbox"),d.style.display="none",d.setAttribute("value",`${a+1}`),c.append(r,d),c});B.append(...s);const t=B.querySelectorAll("li");t.forEach(n=>{n.addEventListener("click",a=>ge(a,t)),n.addEventListener("mouseover",a=>ve(a,t))}),H.addEventListener("submit",pe)};le.addEventListener("click",async e=>{e.stopImmediatePropagation(),await A(q),te()});const te=()=>{X.classList.add("hidden"),Z.style.display="block"},J=new URL("/team02-jsproject/assets/sprite-30cecc96.svg#icon-Star-2",self.location),I=document.querySelector(".backdrop");async function he(e){return I.classList.add("is-open"),A(e)}const ye=document.querySelector(".modal-give-rating"),W=document.querySelector(".modal-btn-rating"),be=document.querySelector(".modal-window");async function A(e){try{let r=function(l){l.stopImmediatePropagation(),l.preventDefault();let E=JSON.parse(localStorage.getItem("favorites"))||[];const U=E.findIndex(ne=>ne._id===o._id);U!==-1?(E.splice(U,1),n.innerText="Add to favorites",y.show({message:"Exercise removed from favorites",messageColor:"var(--black)",backgroundColor:"var(--dark-gray)",position:"topRight",zindex:9999999999})):(E.push(o),n.innerText="Remove from favorites",y.show({message:"Exercise added to favorites",messageColor:"var(--white-smoke)",backgroundColor:"var(--dark-gray)",position:"topRight",zindex:9999999999})),localStorage.setItem("favorites",JSON.stringify(E))},C=function(){location.pathname.includes("favorites.html")&&se(),I.classList.remove("is-open"),t.removeEventListener("click",r),d.removeEventListener("click",C),document.removeEventListener("keydown",_),W.removeEventListener("click",j)},_=function(l){l.key==="Escape"&&C()};const o=(await V.get(`https://energyflow.b.goit.study/api/exercises/${e}`)).data;localStorage.setItem("exerciseModalData",JSON.stringify(o));const s=document.getElementsByClassName("modal-rating-stars")[0];s.innerHTML=o.rating;for(let l=1;l<=5;l++)l<=Math.round(+o.rating)?s.innerHTML+=`<li>
          <svg class="modal-rating-stars-svg-active" width="18" height="18">
            <use href=${J}></use>
          </svg>
        </li>`:s.innerHTML+=`<li>
          <svg class="modal-rating-stars-svg" width="18" height="18">
            <use href=${J}></use>
          </svg>
        </li>`;document.getElementsByClassName("img-gif")[0].src=o.gifUrl,document.getElementsByClassName("modal-title")[0].innerHTML=o.name,document.getElementsByClassName("modal-info-list-title-value")[0].innerHTML=o.target,document.getElementsByClassName("modal-info-list-title-value")[1].innerHTML=o.bodyPart,document.getElementsByClassName("modal-info-list-title-value")[2].innerHTML=o.equipment,document.getElementsByClassName("modal-info-list-title-value")[3].innerHTML=o.popularity,document.getElementsByClassName("modal-info-list-title-value")[4].innerHTML=o.burnedCalories,document.getElementsByClassName("descr")[0].innerHTML=o.description;const t=document.querySelector(".modal-btn-favorites"),n=document.querySelector(".modal-btn-favorites-text"),c=(JSON.parse(localStorage.getItem("favorites"))||[]).findIndex(l=>l._id===o._id);n.innerText=c!==-1?"Remove from favorites":"Add to favorites",t.addEventListener("click",r);const d=document.querySelector(".modal-btn-close");d.addEventListener("click",C);const j=l=>{I.classList.remove("visually-hidden"),be.classList.add("hidden"),fe(e,JSON.parse(localStorage.getItem("exerciseModalData")).rating),ye.classList.remove("hidden"),l.stopImmediatePropagation(),localStorage.removeItem("exerciseModalData")};W.addEventListener("click",j),document.addEventListener("keydown",_)}catch(i){y.error({message:i.message,zindex:9999999999})}}const N=document.querySelector(".favorites-page-items-not-found"),u=document.querySelector(".favorites-page-items-gallery"),oe=document.querySelector(".favorites-page-items"),h=document.querySelector(".favorites-mobile-pagination"),Le=new URL("/team02-jsproject/assets/sprite-30cecc96.svg#icon-arrow",self.location),w="favorites",Se=localStorage.getItem(w);let p=JSON.parse(Se);const we=new URL("/team02-jsproject/assets/sprite-30cecc96.svg#icon-lighticon",self.location),ke=new URL("/team02-jsproject/assets/sprite-30cecc96.svg#icon-trash",self.location),v=8;let k=1,m=k*v,b=m-v,g="",M,T,z,L;function R(e){e.style.display="none",e===u&&innerWidth>768&&(oe.style.paddingRight="48px")}function O(e){e.style.display="flex",e===u&&innerWidth>768&&(oe.style.paddingRight="0")}function S(e){u.innerHTML="";const i=e.reduce((o,s)=>o+`<li class="gallery-list-item">
        <div class="workout-box" id=${s._id}>
          <div class="workout-header">
              <div class="workout-header-wrap">
                  <span class="workout-title">WORKOUT</span>
                  <button type="button" class="delete-workout-btn" id="${s._id}">                            
                      <svg class="trash-icon" id="${s._id}" width="16" height="16" aria-label="trash-icon">
                        <use href=${ke} id="${s._id}"></use>
                      </svg>
                  </button>
              </div>
              <div class="start-button-wrap">Start
                  <svg class="start-arrow-icon" id=${s._id} width="14" height="14" aria-label="start-arrow">
                    <use href=${Le}></use>
                  </svg>
              </div>
          </div>
          <div class="workout-type">
              <svg class="run-man-icon" width="24" height="24" aria-label="run-man">
                  <use href="${we}"></use>
              </svg>
              <h3 class="workout-name">${s.name}</h3>
          </div>
          <div class="workout-description">
              <p class="description-item-name">Burned calories:
                  <span class="description-item-value">${s.burnedCalories} / ${s.time} min</span>
              </p>
              <p class="description-item-name">Body part:
                  <span class="description-item-value">${s.bodyPart}</span>
              </p>
              <p class="description-item-name">Target:
                  <span class="description-item-value">${s.target}</span>
              </p>
          </div>
        </div>
      </li>`,"");u.innerHTML=i,u.addEventListener("click",async o=>{let s;const t=o.target;t.className!=="delete-workout-btn"&&t&&t.closest(".workout-box")&&(s=t.closest(".workout-box").getAttribute("id"),await he(s))}),u.addEventListener("click",o=>{if(o.preventDefault(),o.target.className==="delete-workout-btn"){M=localStorage.getItem(w),T=JSON.parse(M);const s=T.filter(t=>t._id!==o.target.id);if(localStorage.setItem(w,JSON.stringify(s)),s.length===0)R(u),O(N),window.scrollBy({top:700,behavior:"smooth"}),window.innerWidth<768&&R(h);else if(window.innerWidth<768){L=Math.ceil(s.length/v),g="";for(let t=1;t<=L;t++)t===Number(k)?g+=`
                <li>
                  <button class="favorites-pagination-button fav-active-page" type="button" id="${t}">${t}</button>
                </li>`:g+=`
                <li>
                  <button class="favorites-pagination-button" type="button" id="${t}">${t}</button>
                </li>`;h.innerHTML=g,m=k*v,b=m-v,S(s.slice(b,m)),window.scrollBy({top:700,behavior:"smooth"})}else S(s)}})}const se=()=>{if(window.innerWidth<768&&O(h),window.innerWidth<768){g="",h.innerHTML="",L=Math.ceil(p.length/v);for(let e=1;e<=L;e++)e===1?g+=`
          <li>
            <button class="favorites-pagination-button fav-active-page" type="button" id="${e}">${e}</button>
          </li>`:g+=`
          <li>
            <button class="favorites-pagination-button" type="button" id="${e}">${e}</button>
          </li>`;h.innerHTML=g,S(p.slice(b,m)),h.addEventListener("click",e=>{if(e.preventDefault(),e.target.classList.value.includes("favorites-pagination-button")){k=e.target.id,m=k*v,b=m-v,M=localStorage.getItem(w),T=JSON.parse(M),S(T.slice(b,m));const i=e.target.closest(".favorites-pagination-button");z=document.querySelectorAll(".favorites-pagination-button"),z.forEach(o=>{o.id===i.id?o.classList.add("fav-active-page"):o.classList.remove("fav-active-page")}),window.scrollBy({top:700,behavior:"smooth"})}})}p=JSON.parse(localStorage.getItem(w))||{},!p||p.length===0?(R(u),O(N)):(R(N),S(p)),L=Math.ceil(p.length/3)},G=document.querySelector(".header-navigation-home"),K=document.querySelector(".header-navigation-favorites"),Q=document.querySelector(".menu-list-link-home"),Y=document.querySelector(".menu-list-link-favorites"),f=location.pathname;f==="/team-02-jsproject/index.html"||f==="/team-02-jsproject/"||f==="/index.html"||f==="/"?(K.classList.remove("is-active"),Y.classList.remove("is-active"),G.classList.add("is-active"),Q.classList.add("is-active")):(f==="/team-02-jsproject/favorites.html"||f==="/favorites.html")&&(se(),G.classList.remove("is-active"),Q.classList.remove("is-active"),K.classList.add("is-active"),Y.classList.add("is-active"));document.addEventListener("DOMContentLoaded",function(){const e="https://energyflow.b.goit.study/api/quote",i="quoteData",o=new Date().toISOString().split("T")[0],s=document.getElementById("quote"),t=JSON.parse(localStorage.getItem(i));t&&t.date===o?n(t.quote,t.author):fetch(e).then(a=>a.json()).then(a=>{const c=a.quote,r=a.author;n(c,r),localStorage.setItem(i,JSON.stringify({quote:c,author:r,date:o}))}).catch(a=>{console.error("Error fetching quote:",a),t&&n(t.quote,t.author)});function n(a,c){const r=s.querySelector(".quote-text"),d=s.querySelector(".quote-author");a.length<100&&(r.style.marginTop="30px",d.style.marginTop="15px"),r.textContent=a,d.textContent=c}});const ie=document.querySelector(".mobile-menu"),$=document.querySelector(".header-burger"),Ee=document.querySelector(".menu-close-button"),xe=document.querySelectorAll(".social-links-link"),P=()=>{const e=$.getAttribute("aria-expanded")==="true"||!1;$.setAttribute("aria-expanded",!e),ie.classList.toggle("is-open"),re[e?"enableBodyScroll":"disableBodyScroll"](document.body)};xe.forEach(e=>e.addEventListener("click",P));$.addEventListener("click",P);Ee.addEventListener("click",P);window.matchMedia("(min-width: 768px)").addEventListener("change",e=>{e.matches&&(ie.classList.remove("is-open"),$.setAttribute("aria-expanded",!1),ae(document.body))});export{he as o};
//# sourceMappingURL=mob-menu-b8837aae.js.map
