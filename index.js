import{S as u,i as f}from"./assets/vendor-B07T6_gy.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const c=document.querySelector(".js-gallery");let i=null;const m=({webformatURL:s,tags:r,largeImageURL:o,likes:n,views:e,comments:t,downloads:a})=>`
<li class="gallery-item">
   <a class="gallery-link" href="${o}">
		<img 
		  class="gallery-img" 
		  src="${s}" 
		  alt="${r}" 
		/>
   </a>
   <div class="image-stats">
    <p><b>Likes</b><br>${n}</p>
    <p><b>Views</b><br>${e}</p>
    <p><b>Comments</b><br>${t}</p>
    <p><b>Downloads</b><br>${a}</p>
  </div>
</li>
`;function g(s){const r=s.map(m).join("");c.innerHTML=r,i?i.refresh():i=new u(".js-gallery a",{captionsData:"alt",captionDelay:250})}function p(){c.innerHTML=""}const d=s=>{const r=new URLSearchParams({key:"50304425-dc6600d3dd72044e5b60da34e",q:s,image_type:"photo",per_page:"9",orientation:"horizontal",safesearch:!0});return console.log(r.toString()),fetch(`https://pixabay.com/api/?${r}`).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()})},l={searchForm:document.querySelector(".js-form")},y=s=>{s.preventDefault();const r=s.currentTarget.elements.search_text.value.trim();r!==""&&d(r).then(({hits:o})=>{if(o.length===0){f.error({title:"",titleColor:"#fff",message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight",icon:"",close:!0,messageColor:"#fff",backgroundColor:"#ef4040"}),l.searchForm.reset(),p();return}g(o),l.searchForm.reset()}).catch(o=>{console.error(o)})};l.searchForm.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
