// The LastMenu JS library as an inline string for bundling.
// This is the same code as ../../last-menu.js but as a self-contained IIFE
// that exposes window.LastMenu.

export const LAST_MENU_JS = `
(function(){
"use strict";
var R={link:function(i){if(i.children&&i.children.length){var b=E("button","lm-item lm-item-sub");b.innerHTML=I(i,true);b.addEventListener("click",function(){S.push({items:W,title:T});W=i.children;T=i.label;P(i.children,i.label,true)});return b}var a=E("a","lm-item");a.href=i.url||"#";if(i.target)a.target=i.target;a.innerHTML=I(i,false);a.addEventListener("click",function(){O(false)});return a}};
var D={title:"Menu",columns:2,scrollable:false,theme:"minimal",position:"bottom-right",items:[]};
var C={},N=null,Z=false,S=[],W=[],T="";
window.LastMenu={init:function(j,m){if(typeof j==="string"){fetch(j).then(function(r){return r.json()}).then(function(c){B(c,m)})}else{B(j,m)}},open:function(){O(true)},close:function(){O(false)},toggle:function(){O(!Z)},registerItemType:function(t,r){R[t]=r}};
function B(c,m){C=Object.assign({},D,c);S=[];var mt=m||document.body;N=E("div","lm-root");N.setAttribute("data-theme",C.theme);N.setAttribute("data-pos",C.position);var o=E("div","lm-overlay");o.addEventListener("click",function(){O(false)});N.appendChild(o);var p=E("nav","lm-panel");p.setAttribute("aria-label",C.title);if(C.scrollable)p.classList.add("lm-scrollable");N.appendChild(p);W=C.items;T=C.title;P(C.items,C.title,false);var f=E("button","lm-fab");f.setAttribute("aria-label","Toggle menu");f.innerHTML='<svg class="lm-icon-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></svg><svg class="lm-icon-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg>';f.addEventListener("click",function(){O(!Z)});N.appendChild(f);mt.appendChild(N)}
function P(items,title,isSub){var p=N.querySelector(".lm-panel");p.innerHTML="";var h=E("div","lm-panel-head");if(isSub){var bk=E("button","lm-back");bk.setAttribute("aria-label","Back");bk.innerHTML='<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>';bk.addEventListener("click",function(){var pr=S.pop();if(pr){W=pr.items;T=pr.title;P(pr.items,pr.title,S.length>0)}});h.appendChild(bk)}var ti=E("span","lm-panel-title");ti.textContent=title;h.appendChild(ti);var cl=E("button","lm-close");cl.setAttribute("aria-label","Close menu");cl.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg>';cl.addEventListener("click",function(){O(false)});h.appendChild(cl);p.appendChild(h);var g=E("div","lm-items");g.style.gridTemplateColumns="repeat("+C.columns+",minmax(0,1fr))";items.forEach(function(it){var r=R[it.type||"link"];if(!r)return;var el=r(it);if(el)g.appendChild(el)});p.appendChild(g)}
function I(i,arrow){var h="";if(i.icon)h+='<span class="lm-item-icon">'+i.icon+"</span>";h+='<span class="lm-item-label">'+X(i.label)+"</span>";if(arrow)h+='<svg class="lm-arrow" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"></path></svg>';return h}
function O(open){Z=open;N.classList.toggle("lm-open",open);if(!open){setTimeout(function(){S=[];W=C.items;T=C.title;P(C.items,C.title,false)},250)}}
function E(tag,cls){var e=document.createElement(tag);if(cls)e.className=cls;return e}
function X(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
})();
`.trim();
