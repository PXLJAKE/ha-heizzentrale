var ae=globalThis,le=ae.ShadowRoot&&(ae.ShadyCSS===void 0||ae.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),He=new WeakMap,Y=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(le&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=He.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&He.set(e,i))}return i}toString(){return this.cssText}},Me=u=>new Y(typeof u=="string"?u:u+"",void 0,ge),U=(u,...i)=>{let e=u.length===1?u[0]:i.reduce((t,s,n)=>t+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+u[n+1],u[0]);return new Y(e,u,ge)},Ne=(u,i)=>{if(le)u.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),s=ae.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,u.appendChild(t)}},fe=le?u=>u:u=>u instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return Me(e)})(u):u;var{is:et,defineProperty:tt,getOwnPropertyDescriptor:st,getOwnPropertyNames:nt,getOwnPropertySymbols:it,getPrototypeOf:rt}=Object,de=globalThis,Oe=de.trustedTypes,ot=Oe?Oe.emptyScript:"",at=de.reactiveElementPolyfillSupport,J=(u,i)=>u,ve={toAttribute(u,i){switch(i){case Boolean:u=u?ot:null;break;case Object:case Array:u=u==null?u:JSON.stringify(u)}return u},fromAttribute(u,i){let e=u;switch(i){case Boolean:e=u!==null;break;case Number:e=u===null?null:Number(u);break;case Object:case Array:try{e=JSON.parse(u)}catch{e=null}}return e}},Le=(u,i)=>!et(u,i),We={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:Le};Symbol.metadata??=Symbol("metadata"),de.litPropertyMetadata??=new WeakMap;var W=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=We){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(i,t,e);s!==void 0&&tt(this.prototype,i,s)}}static getPropertyDescriptor(i,e,t){let{get:s,set:n}=st(this.prototype,i)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let a=s?.call(this);n?.call(this,r),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??We}static _$Ei(){if(this.hasOwnProperty(J("elementProperties")))return;let i=rt(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(J("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(J("properties"))){let e=this.properties,t=[...nt(e),...it(e)];for(let s of t)this.createProperty(s,e[s])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let s of t)e.unshift(fe(s))}else i!==void 0&&e.push(fe(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ne(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),s=this.constructor._$Eu(i,t);if(s!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:ve).toAttribute(e,t.type);this._$Em=i,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(i,e){let t=this.constructor,s=t._$Eh.get(i);if(s!==void 0&&this._$Em!==s){let n=t.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ve;this._$Em=s;let a=r.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(i,e,t,s=!1,n){if(i!==void 0){let r=this.constructor;if(s===!1&&(n=this[i]),t??=r.getPropertyOptions(i),!((t.hasChanged??Le)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(i)&&!this.hasAttribute(r._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:s,wrapped:n},r){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,r??e??this[i]),n!==!0||r!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),s===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,n]of t){let{wrapped:r}=n,a=this[s];r!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[J("elementProperties")]=new Map,W[J("finalized")]=new Map,at?.({ReactiveElement:W}),(de.reactiveElementVersions??=[]).push("2.1.2");var ke=globalThis,De=u=>u,ce=ke.trustedTypes,Fe=ce?ce.createPolicy("lit-html",{createHTML:u=>u}):void 0,Ie="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,Ve="?"+j,lt=`<${Ve}>`,I=document,Q=()=>I.createComment(""),ee=u=>u===null||typeof u!="object"&&typeof u!="function",Se=Array.isArray,dt=u=>Se(u)||typeof u?.[Symbol.iterator]=="function",be=`[ 	
\f\r]`,X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,je=/-->/g,Be=/>/g,K=RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Ke=/"/g,Ge=/^(?:script|style|textarea|title)$/i,Ee=u=>(i,...e)=>({_$litType$:u,strings:i,values:e}),h=Ee(1),A=Ee(2),Tt=Ee(3),V=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Ze=new WeakMap,Z=I.createTreeWalker(I,129);function qe(u,i){if(!Se(u)||!u.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fe!==void 0?Fe.createHTML(i):i}var ct=(u,i)=>{let e=u.length-1,t=[],s,n=i===2?"<svg>":i===3?"<math>":"",r=X;for(let a=0;a<e;a++){let l=u[a],o,c,d=-1,p=0;for(;p<l.length&&(r.lastIndex=p,c=r.exec(l),c!==null);)p=r.lastIndex,r===X?c[1]==="!--"?r=je:c[1]!==void 0?r=Be:c[2]!==void 0?(Ge.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=K):c[3]!==void 0&&(r=K):r===K?c[0]===">"?(r=s??X,d=-1):c[1]===void 0?d=-2:(d=r.lastIndex-c[2].length,o=c[1],r=c[3]===void 0?K:c[3]==='"'?Ke:Ue):r===Ke||r===Ue?r=K:r===je||r===Be?r=X:(r=K,s=void 0);let f=r===K&&u[a+1].startsWith("/>")?" ":"";n+=r===X?l+lt:d>=0?(t.push(o),l.slice(0,d)+Ie+l.slice(d)+j+f):l+j+(d===-2?a:f)}return[qe(u,n+(u[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},te=class u{constructor({strings:i,_$litType$:e},t){let s;this.parts=[];let n=0,r=0,a=i.length-1,l=this.parts,[o,c]=ct(i,e);if(this.el=u.createElement(o,t),Z.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=Z.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(Ie)){let p=c[r++],f=s.getAttribute(d).split(j),g=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:g[2],strings:f,ctor:g[1]==="."?$e:g[1]==="?"?ye:g[1]==="@"?xe:q}),s.removeAttribute(d)}else d.startsWith(j)&&(l.push({type:6,index:n}),s.removeAttribute(d));if(Ge.test(s.tagName)){let d=s.textContent.split(j),p=d.length-1;if(p>0){s.textContent=ce?ce.emptyScript:"";for(let f=0;f<p;f++)s.append(d[f],Q()),Z.nextNode(),l.push({type:2,index:++n});s.append(d[p],Q())}}}else if(s.nodeType===8)if(s.data===Ve)l.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(j,d+1))!==-1;)l.push({type:7,index:n}),d+=j.length-1}n++}}static createElement(i,e){let t=I.createElement("template");return t.innerHTML=i,t}};function G(u,i,e=u,t){if(i===V)return i;let s=t!==void 0?e._$Co?.[t]:e._$Cl,n=ee(i)?void 0:i._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(u),s._$AT(u,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(i=G(u,s._$AS(u,i.values),s,t)),i}var we=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,s=(i?.creationScope??I).importNode(e,!0);Z.currentNode=s;let n=Z.nextNode(),r=0,a=0,l=t[0];for(;l!==void 0;){if(r===l.index){let o;l.type===2?o=new se(n,n.nextSibling,this,i):l.type===1?o=new l.ctor(n,l.name,l.strings,this,i):l.type===6&&(o=new ze(n,this,i)),this._$AV.push(o),l=t[++a]}r!==l?.index&&(n=Z.nextNode(),r++)}return Z.currentNode=I,s}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},se=class u{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=G(this,i,e),ee(i)?i===m||i==null||i===""?(this._$AH!==m&&this._$AR(),this._$AH=m):i!==this._$AH&&i!==V&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):dt(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==m&&ee(this._$AH)?this._$AA.nextSibling.data=i:this.T(I.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,s=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=te.createElement(qe(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new we(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(i){let e=Ze.get(i.strings);return e===void 0&&Ze.set(i.strings,e=new te(i)),e}k(i){Se(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let n of i)s===e.length?e.push(t=new u(this.O(Q()),this.O(Q()),this,this.options)):t=e[s],t._$AI(n),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=De(i).nextSibling;De(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=i,this.name=e,this._$AM=s,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(i,e=this,t,s){let n=this.strings,r=!1;if(n===void 0)i=G(this,i,e,0),r=!ee(i)||i!==this._$AH&&i!==V,r&&(this._$AH=i);else{let a=i,l,o;for(i=n[0],l=0;l<n.length-1;l++)o=G(this,a[t+l],e,l),o===V&&(o=this._$AH[l]),r||=!ee(o)||o!==this._$AH[l],o===m?i=m:i!==m&&(i+=(o??"")+n[l+1]),this._$AH[l]=o}r&&!s&&this.j(i)}j(i){i===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},$e=class extends q{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===m?void 0:i}},ye=class extends q{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==m)}},xe=class extends q{constructor(i,e,t,s,n){super(i,e,t,s,n),this.type=5}_$AI(i,e=this){if((i=G(this,i,e,0)??m)===V)return;let t=this._$AH,s=i===m&&t!==m||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,n=i!==m&&(t===m||s);s&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},ze=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){G(this,i)}};var ht=ke.litHtmlPolyfillSupport;ht?.(te,se),(ke.litHtmlVersions??=[]).push("3.3.3");var Ye=(u,i,e)=>{let t=e?.renderBefore??i,s=t._$litPart$;if(s===void 0){let n=e?.renderBefore??null;t._$litPart$=s=new se(i.insertBefore(Q(),n),n,void 0,e??{})}return s._$AI(u),s};var Ae=globalThis,C=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Ye(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};C._$litElement$=!0,C.finalized=!0,Ae.litElementHydrateSupport?.({LitElement:C});var ut=Ae.litElementPolyfillSupport;ut?.({LitElement:C});(Ae.litElementVersions??=[]).push("4.2.2");var Je={loading:"Loading plant\u2026",no_plant:"No plant found. Add the Heizzentrale integration under Settings \u2192 Devices & services.",empty:"This plant has no parts yet. Open the integration and add a heat source, circuits and rooms.",mode_observe:"Observing",mode_off:"Off",mode_active:"Switching",x_mode_active:"Switching: Heizzentrale closes circuits no room needs and switches the pump group off when no circuit needs heat. When in doubt everything stays open.",mode_confirm:"From now on Heizzentrale switches your circuits and the pump group itself. A circuit closes after 10 minutes without demand and opens at once when a room asks for heat. You can go back to observing at any time; everything is then opened and switched on again.",mode_confirm_yes:"Yes, switch now",x_adv_closed:"Heizzentrale has closed it.",x_adv_by_hand:"Someone opened it by hand. Heizzentrale leaves it like that until a room needs heat again.",x_padv_off:"No circuit needs heat: Heizzentrale has switched the pump group off.",x_padv_by_hand:"Someone switched it on by hand. Heizzentrale leaves it like that until a circuit needs heat again.",x_padv_hand_off:"A circuit needs heat, but the pump group was switched off by hand. Heizzentrale only switches on what it switched off itself.",plan_window:"A window is open: {action}.",set_flow:"Flow temperature by demand",flow_hint:"If every room that asks for heat reaches its setpoint, the heating curve is set hotter than needed. Heizzentrale then lowers one number of your heat source in small steps, and raises it again as soon as a room stays too cold. Pick the number that shifts the heating curve, for example the room setpoint of the heating circuit.",flow_entity:"Number that shifts the heating curve",flow_none:"Not used",flow_min:"Lowest value",flow_max:"Highest value",flow_step:"Step",flow_now:"Now: {value}.",flow_r_unknown:"The value cannot be read.",flow_r_hold:"No change needed right now.",flow_r_waiting:"{rooms} is not getting warm. After the last change Heizzentrale waits an hour before raising again.",flow_r_lagging:"{rooms} has been more than half a degree too cold for over 90 minutes: one step up to {target}.",flow_r_covered:"For four hours every room that asked for heat reached its setpoint: one step down to {target}.",flow_r_at_max:"The highest value is reached. {rooms}",flow_r_at_min:"The lowest value is reached.",flow_apply_off:"Heizzentrale only shows what it would set and does not change the number.",flow_apply_on:'Heizzentrale changes the number itself, one step at a time and only inside your limits. "Only show" puts it back to the value from before.',x_flow:"Flow temperature by demand: {text}",set_preheat:"Preheating",preheat_on:"Start early",preheat_off:"Start at the switch point",preheat_max:"Start at most this many minutes early",preheat_hint:'A schedule then says when a room should be warm. Heizzentrale measures how fast each room warms up and switches the thermostat early enough. Only towards warmer, never towards colder, and only when schedules are set to "Apply".',preheat_learned:"Measured so far, in degrees per hour: {rooms}.",preheat_learning:"No room has been measured yet. That happens on its own the next time a room heats up for at least 20 minutes.",plan_preheat:'Preheating for schedule "{name}": {action}.',set_window:"Open windows",window_on:"Switch room off",window_off:"Change nothing",window_delay:"Wait before switching off (minutes)",window_hint:"While a window of a room is open its thermostat is switched off and put back when the window closes. A room without a window contact is never affected.",outdoor:"Outdoor",other_rooms:"Other rooms",plant_room:"Plant room",flow:"Flow",return:"Return",spread:"Spread",target:"Target",heating:"heating",idle:"idle",window_open:"Window open",open:"open",closed:"closed",unknown:"unknown",running:"running",close:"Close",system_two_pipe:"two-pipe",system_one_pipe:"one-pipe",system_underfloor:"underfloor heating",system_other:"circuit",kind_pellet:"Pellet boiler",kind_wood:"Wood boiler",kind_gas:"Gas boiler",kind_oil:"Oil boiler",kind_heat_pump:"Heat pump",kind_district:"District heating",kind_other:"Heat source",x_what_circuit:"{name} is a {system} circuit. Hot water flows to the radiators (flow) and comes back cooler (return).",x_spread:"Flow {flow}, return {ret}: the spread is {spread}. A larger spread means the water gives off more heat on its way.",x_no_spread:"Flow and return sensors are needed to show the spread.",x_open_nc:"The circuit is open because its actuator is powered. Without power this actuator closes (NC).",x_closed_nc:"The circuit is closed because its actuator has no power. Without power this actuator closes (NC).",x_open_no:"The circuit is open because its actuator has no power. Without power this actuator opens (NO).",x_closed_no:"The circuit is closed because its actuator is powered. Without power this actuator opens (NO).",x_open_valve:"The valve reports that it is open.",x_closed_valve:"The valve reports that it is closed.",x_valve_unknown:"The actuator does not report a state right now. Heizzentrale treats the circuit as possibly open.",x_no_valve:"This circuit has no actuator, so it is always open.",x_rooms_on:"Rooms on this circuit: {rooms}.",x_room_heating:"{name} is heating: it is {current} and should be {target}.",x_room_idle:"{name} is not heating: it is {current}, target {target}.",x_room_off:"{name} is switched off.",x_room_unavailable:"The thermostat of {name} is not reachable right now.",x_room_window:"A window is open, so heating is paused here.",x_room_preset:"Active preset: {preset}.",x_room_circuit:"Its radiators are supplied by the circuit {circuit}.",x_buffer:"{name} stores hot water so the heat source does not have to start for every small demand. Hot water collects at the top.",x_buffer_mean:"Mean temperature: {mean}.",x_source:"{name} produces the heat for the house. Status: {status}.",x_source_temp:"Temperature: {temp}.",x_mode_observe:"Observe mode: Heizzentrale measures and explains but does not switch any circuit or pump.",x_mode_off:"Off: Heizzentrale only measures.",settings:"Settings",back:"Back to the house",circuit:"Circuit",why:"What is happening",room_turn_off:"Switch heating off in this room",room_turn_on:"Switch heating on in this room",open_thermostat:"Open thermostat details",preset_temps:"Adjust temperatures",preset_temps_hint:"This is how warm the room gets when the mode is chosen, by hand or by a schedule. It applies to this room only and is stored in the thermostat.",preset_save_failed:"Could not save. Is the thermostat reachable?",set_mode:"Operating mode",set_sources:"Heat sources",set_buffers:"Buffer tanks",set_circuits:"Circuits",set_rooms:"Rooms",none_yet:"Nothing added yet.",n_rooms:"{count} rooms",one_room:"1 room",n_sensors:"{count} sensors",valve_nc:"actuator closes without power",valve_no:"actuator opens without power",valve_none:"no actuator",has_window:"window contact",warn_no_sensor:"No temperature sensor assigned.",warn_no_pipe_sensors:"Flow or return sensor missing, so no spread can be shown.",warn_no_rooms:"No room uses this circuit yet.",warn_no_circuit:"No circuit assigned, so no pipe is drawn to this room.",warn_no_floor:"No floor found. Assign the thermostat to an area with a floor in Home Assistant.",edit_parts:"Add or change parts",edit_hint:"Opens the Heizzentrale page of Home Assistant. Heat sources, buffers, circuits and rooms are added and changed there.",pump_group:"Pump group",pump_stopped:"stopped",set_pumps:"Pump groups",n_circuits:"{count} circuits",pump_switchable:"can be switched",warn_no_control:"No entity to switch it chosen. Heizzentrale will not be able to turn it off when all circuits are closed.",x_pump:"{name} pushes the heating water into the circuits behind it. A mixer, if there is one, sets how hot that water is.",x_pump_flow:"Flow temperature behind the mixer: {temp}.",x_pump_flow_set:"The heat source is aiming for {temp} there right now.",target_short:"Target",x_pump_needed:"It is needed right now because these circuits are open: {circuits}.",x_pump_idle:"All circuits behind it are closed, so it has nothing to do. Once switching is enabled, Heizzentrale turns it off in this situation.",x_pump_running:"The pump reports that it is running.",x_pump_stopped:"The pump reports that it is stopped.",x_pump_control:"An entity to switch it is chosen. Heizzentrale only observes for now and does not use it yet.",x_pump_modes:"Off is the mode \u201C{off}\u201D, on is the mode \u201C{on}\u201D.",x_pump_no_control:"No entity to switch it is chosen yet.",setup_title:"Setup",setup_intro:"Add the parts of your heating in this order. Only the name is required each time; sensors can be filled in later.",setup_done:"The basics are set up. You can add or change parts at any time.",setup_optional:"only if you have one",setup_source:"Heat source",setup_source_hint:"Your boiler or heat pump.",setup_buffer:"Buffer tank",setup_buffer_hint:"The tank that stores hot water, with its temperature sensors.",setup_pump:"Pump group",setup_pump_hint:"The pump, with or without mixer, that feeds the circuits.",setup_circuits:"Circuits",setup_circuits_hint:"Every branch that can be opened and closed on its own, for example one per floor.",setup_rooms:"Rooms",setup_rooms_hint:"One per thermostat. Name and floor come from Home Assistant on their own.",n_windows:"{count} window contacts",set_language:"Language",lang_auto:"Like Home Assistant",lang_de:"Deutsch",lang_en:"English",set_language_hint:"Applies to this view for everyone. The setup dialogs of Home Assistant always follow the language in your user profile.",editor_plant:"Plant",editor_title:"Title (optional)",editor_first:"First plant",stove_in_room:"In a room",stove_own_tile:"Own tile on a floor",stove_out:"out",would_close:"would close now",would_open:"would open now",would_on:"would switch on now",would_off:"would switch off now",x_adv_rooms_calling:"This circuit is needed: {rooms} is asking for heat.",x_adv_unknown_room:"This circuit stays open to be safe, because the thermostat of {rooms} cannot be read.",x_adv_no_rooms:"No rooms are assigned to this circuit, so it always counts as needed.",x_adv_waiting:"No room is asking for heat right now. After 10 minutes without demand the circuit would close.",x_adv_no_demand:"For more than 10 minutes no room on this circuit has asked for heat.",x_adv_would_close:"Heizzentrale would close it now. While observing it switches nothing.",x_adv_would_open:"Heizzentrale would open it now. While observing it switches nothing.",x_padv_manual:"Its control entity is in a mode someone chose by hand. Heizzentrale leaves it like that.",x_padv_would_off:"No circuit needs heat: Heizzentrale would switch the pump group off now. While observing it switches nothing.",x_padv_would_on:"A circuit needs heat: Heizzentrale would switch the pump group on now. While observing it switches nothing.",edit_grip:"Drag to move",edit_house:"Arrange the house",edit_done:"Done",edit_note:"Drag rooms to where they belong, also onto another floor, or use the arrows. Add further sensors to any tile.",edit_drop:"Drag a room here",edit_left:"Move left",edit_right:"Move right",edit_sensor:"Sensor",edit_sensor_title:"Sensors for {name}",edit_sensor_hint:"Shown on the tile in addition, for example humidity or a second temperature.",edit_sensor_search:"Search sensors",edit_sensor_label:"Short label (optional)",edit_sensor_add:"Add sensor",set_stoves:"Stoves",stoves_intro:"A wood stove warms its room and the rooms around it. While it burns, the radiators there are not needed. Choose per room what happens then.",add_stove:"New stove",stove_placeholder:'For example "Wood stove living room"',stove_sensor:"Temperature sensor at the stove",stove_sensor_hint:"A sensor on the stove or its flue pipe. It only has to tell whether the stove is burning.",choose:"Please choose",stove_threshold:"Burning from",stove_now:"Right now:",stove_room:"Where is the stove?",stove_room_none:"Do not show in the house",stove_actions:"While the stove burns",stove_actions_hint:"For example the room with the stove off and rooms further away on Eco. Once the stove has cooled down, the schedule applies again.",stove_leave:"Leave as it is",stove_burning:"burning",stove_summary:"Counts as burning from {degrees} \xB0C.",stove_while:"While it burns:",stove_no_rooms:"No room chosen yet, so this stove changes nothing.",stove_no_sensor:"No temperature sensor chosen yet.",plan_stove:'Stove "{name}" is burning: {action}.',stove:"Stove",day_0:"Mon",day_1:"Tue",day_2:"Wed",day_3:"Thu",day_4:"Fri",day_5:"Sat",day_6:"Sun",days_all:"Daily",decimal:".",act_on:"On",act_off:"Off",act_temperature:"Temperature \u2026",action:"Action",time:"Time",name:"Name",floors:"Whole floors",rooms_single:"Single rooms",assigned_none:"nothing yet",unnamed:"Unnamed",edit:"Edit",remove:"Remove",save:"Save",cancel:"Cancel",delete:"Delete",and:"and",minutes:"minutes",save_failed:"Could not save. Only administrators can change this.",set_schedules:"Schedules",schedules_intro:"A schedule sets thermostats at fixed times, for example Comfort in the morning and Eco at night. Assign it to single rooms or to whole floors.",add_schedule:"New schedule",schedule_placeholder:'For example "Workdays"',points:"Switch points",points_hint:"Each switch point applies from its time until the next one. If you change a thermostat by hand, that stays until the next switch point.",add_point:"Add switch point",no_points:"No switch points yet, so this schedule does nothing.",applies_to:"Applies to:",assign_hint:"A schedule for a single room wins over the schedule of its floor.",set_absence:"Absence",absence_intro:"Turn rooms down automatically while nobody is home, without building an automation. When someone is back, the schedule applies again.",add_rule:"New absence rule",rule_placeholder:'For example "Jake away"',rule_who:"Who has to be away?",rule_who_hint:"People, phones or presence sensors. With several entries all of them have to be away. If a device cannot be reached, it counts as present, so the house stays warm when in doubt.",rule_add_entity:"Add person or device",rule_delay:"Away for at least",rule_then:"Then set the rooms to",rule_sentence:"As soon as {who} is away: {targets} to {action}.",rule_sentence_delay:"When {who} has been away for more than {minutes} minutes: {targets} to {action}.",rule_back:"On return the schedule applies again; without a schedule the thermostat goes back to how it was.",rule_active:"applies now",no_entities:"No person or device chosen yet, so this rule does nothing.",set_apply:"Schedules, absence and stoves",apply_off:"Only show",apply_on:"Apply",apply_off_hint:'Heizzentrale only shows what it would set and does not touch any thermostat. Check in the room windows whether it fits, then switch to "Apply".',apply_on_hint:"Heizzentrale sets the thermostats at the switch points and when an absence rule or a stove starts or ends.",plan:"Plan",plan_schedule:'Schedule "{name}": {action}.',plan_absence:'Absence rule "{name}" applies: {action}.',plan_would:'Not applied yet, because schedules are set to "Only show".',plan_none:"No schedule assigned."},pt={loading:"Anlage wird geladen \u2026",no_plant:"Keine Anlage gefunden. F\xFCge die Integration Heizzentrale unter Einstellungen \u2192 Ger\xE4te & Dienste hinzu.",empty:"Diese Anlage hat noch keine Teile. \xD6ffne die Integration und f\xFCge W\xE4rmeerzeuger, Kreise und R\xE4ume hinzu.",mode_observe:"Beobachtet",mode_off:"Aus",mode_active:"Schaltet",x_mode_active:"Schaltet: Heizzentrale schlie\xDFt Str\xE4nge, die kein Raum braucht, und schaltet die Pumpengruppe aus, wenn kein Strang W\xE4rme braucht. Im Zweifel bleibt alles offen.",mode_confirm:"Ab jetzt schaltet Heizzentrale deine Str\xE4nge und die Pumpengruppe selbst. Ein Strang schlie\xDFt nach 10 Minuten ohne Bedarf und \xF6ffnet sofort, wenn ein Raum W\xE4rme will. Du kannst jederzeit zur\xFCck auf Beobachten; dann wird alles wieder ge\xF6ffnet und eingeschaltet.",mode_confirm_yes:"Ja, jetzt schalten",x_adv_closed:"Heizzentrale hat ihn geschlossen.",x_adv_by_hand:"Jemand hat ihn von Hand ge\xF6ffnet. Heizzentrale l\xE4sst das so, bis wieder ein Raum W\xE4rme braucht.",x_padv_off:"Kein Strang braucht W\xE4rme: Heizzentrale hat die Pumpengruppe ausgeschaltet.",x_padv_by_hand:"Jemand hat sie von Hand eingeschaltet. Heizzentrale l\xE4sst das so, bis wieder ein Strang W\xE4rme braucht.",x_padv_hand_off:"Ein Strang braucht W\xE4rme, aber die Pumpengruppe wurde von Hand ausgeschaltet. Heizzentrale schaltet nur wieder ein, was sie selbst ausgeschaltet hat.",plan_window:"Ein Fenster ist offen: {action}.",set_flow:"Vorlauf nach Bedarf",flow_hint:"Wenn alle R\xE4ume, die W\xE4rme wollen, ihre Solltemperatur erreichen, ist die Heizkurve hei\xDFer eingestellt als n\xF6tig. Heizzentrale senkt dann eine Zahl deines W\xE4rmeerzeugers in kleinen Schritten ab und hebt sie wieder an, sobald ein Raum zu kalt bleibt. W\xE4hle die Zahl, die die Heizkurve verschiebt, zum Beispiel die Raum-Solltemperatur des Heizkreises.",flow_entity:"Zahl, die die Heizkurve verschiebt",flow_none:"Nicht nutzen",flow_min:"Kleinster Wert",flow_max:"Gr\xF6\xDFter Wert",flow_step:"Schrittweite",flow_now:"Jetzt: {value}.",flow_r_unknown:"Der Wert ist nicht lesbar.",flow_r_hold:"Gerade ist keine \xC4nderung n\xF6tig.",flow_r_waiting:"{rooms} wird nicht warm. Nach der letzten \xC4nderung wartet Heizzentrale eine Stunde, bevor sie weiter anhebt.",flow_r_lagging:"{rooms} ist seit \xFCber 90 Minuten mehr als ein halbes Grad zu kalt: einen Schritt hoch auf {target}.",flow_r_covered:"Seit vier Stunden erreicht jeder Raum, der W\xE4rme wollte, seine Solltemperatur: einen Schritt runter auf {target}.",flow_r_at_max:"Der gr\xF6\xDFte Wert ist erreicht. {rooms}",flow_r_at_min:"Der kleinste Wert ist erreicht.",flow_apply_off:"Heizzentrale zeigt nur, was sie stellen w\xFCrde, und \xE4ndert die Zahl nicht.",flow_apply_on:"Heizzentrale \xE4ndert die Zahl selbst, immer nur einen Schritt und nur innerhalb deiner Grenzen. \u201ENur anzeigen\u201C stellt sie zur\xFCck auf den Wert von vorher.",x_flow:"Vorlauf nach Bedarf: {text}",set_preheat:"Rechtzeitig vorheizen",preheat_on:"Fr\xFCher starten",preheat_off:"Am Schaltpunkt starten",preheat_max:"H\xF6chstens so viele Minuten fr\xFCher starten",preheat_hint:"Ein Zeitplan sagt dann, wann ein Raum warm sein soll. Heizzentrale misst, wie schnell jeder Raum warm wird, und stellt das Thermostat entsprechend fr\xFCher um. Nur in Richtung w\xE4rmer, nie in Richtung k\xE4lter, und nur wenn Zeitpl\xE4ne auf \u201EAnwenden\u201C stehen.",preheat_learned:"Bisher gemessen, in Grad pro Stunde: {rooms}.",preheat_learning:"Noch ist kein Raum gemessen. Das passiert von selbst, sobald ein Raum das n\xE4chste Mal mindestens 20 Minuten aufheizt.",plan_preheat:"Heizt vor f\xFCr Zeitplan \u201E{name}\u201C: {action}.",set_window:"Offene Fenster",window_on:"Raum ausschalten",window_off:"Nichts \xE4ndern",window_delay:"Wartezeit bis zum Ausschalten (Minuten)",window_hint:"Solange ein Fenster eines Raums offen ist, wird sein Thermostat ausgeschaltet und beim Schlie\xDFen wieder zur\xFCckgestellt. Ein Raum ohne Fensterkontakt ist nie betroffen.",outdoor:"Au\xDFen",other_rooms:"Weitere R\xE4ume",plant_room:"Heizraum",flow:"Vorlauf",return:"R\xFCcklauf",spread:"Spreizung",target:"Soll",heating:"heizt",idle:"ruht",window_open:"Fenster offen",open:"offen",closed:"zu",unknown:"unbekannt",running:"l\xE4uft",close:"Schlie\xDFen",system_two_pipe:"Zweirohr",system_one_pipe:"Einrohr",system_underfloor:"Fu\xDFbodenheizung",system_other:"Kreis",kind_pellet:"Pelletkessel",kind_wood:"Holzkessel",kind_gas:"Gastherme",kind_oil:"\xD6lkessel",kind_heat_pump:"W\xE4rmepumpe",kind_district:"Fernw\xE4rme",kind_other:"W\xE4rmeerzeuger",x_what_circuit:"{name} ist ein Strang ({system}). Hei\xDFes Wasser flie\xDFt zu den Heizk\xF6rpern (Vorlauf) und kommt k\xFChler zur\xFCck (R\xFCcklauf).",x_spread:"Vorlauf {flow}, R\xFCcklauf {ret}: Die Spreizung betr\xE4gt {spread}. Eine gr\xF6\xDFere Spreizung hei\xDFt, das Wasser gibt unterwegs mehr W\xE4rme ab.",x_no_spread:"F\xFCr die Spreizung braucht es einen Vorlauf- und einen R\xFCcklauff\xFChler.",x_open_nc:"Der Strang ist offen, weil sein Stellantrieb Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_closed_nc:"Der Strang ist zu, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_open_no:"Der Strang ist offen, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_closed_no:"Der Strang ist zu, weil sein Stellantrieb Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_open_valve:"Das Ventil meldet, dass es offen ist.",x_closed_valve:"Das Ventil meldet, dass es zu ist.",x_valve_unknown:"Der Stellantrieb meldet gerade keinen Zustand. Heizzentrale behandelt den Strang als m\xF6glicherweise offen.",x_no_valve:"Dieser Strang hat keinen Stellantrieb und ist deshalb immer offen.",x_rooms_on:"R\xE4ume an diesem Strang: {rooms}.",x_room_heating:"{name} heizt gerade: Es hat {current} und soll {target} haben.",x_room_idle:"{name} heizt nicht: Es hat {current}, Soll {target}.",x_room_off:"{name} ist ausgeschaltet.",x_room_unavailable:"Das Thermostat von {name} ist gerade nicht erreichbar.",x_room_window:"Ein Fenster ist offen, deshalb pausiert die Heizung hier.",x_room_preset:"Aktives Preset: {preset}.",x_room_circuit:"Die Heizk\xF6rper h\xE4ngen am Strang {circuit}.",x_buffer:"{name} speichert hei\xDFes Wasser, damit der W\xE4rmeerzeuger nicht f\xFCr jeden kleinen Bedarf starten muss. Oben sammelt sich das hei\xDFe Wasser.",x_buffer_mean:"Mittlere Temperatur: {mean}.",x_source:"{name} erzeugt die W\xE4rme f\xFCr das Haus. Status: {status}.",x_source_temp:"Temperatur: {temp}.",x_mode_observe:"Beobachtungsmodus: Heizzentrale misst und erkl\xE4rt, schaltet aber keinen Strang und keine Pumpe.",x_mode_off:"Aus: Heizzentrale misst nur.",settings:"Einstellungen",back:"Zur\xFCck zum Haus",circuit:"Strang",why:"Was gerade passiert",room_turn_off:"Heizung in diesem Raum ausschalten",room_turn_on:"Heizung in diesem Raum einschalten",open_thermostat:"Details zum Thermostat \xF6ffnen",preset_temps:"Temperaturen anpassen",preset_temps_hint:"So warm wird der Raum, wenn der Modus gew\xE4hlt ist, von Hand oder durch einen Zeitplan. Das gilt nur f\xFCr diesen Raum und wird im Thermostat gespeichert.",preset_save_failed:"Speichern nicht m\xF6glich. Ist das Thermostat erreichbar?",set_mode:"Betriebsart",set_sources:"W\xE4rmeerzeuger",set_buffers:"Pufferspeicher",set_circuits:"Str\xE4nge",set_rooms:"R\xE4ume",none_yet:"Noch nichts angelegt.",n_rooms:"{count} R\xE4ume",one_room:"1 Raum",n_sensors:"{count} F\xFChler",valve_nc:"Stellantrieb stromlos zu",valve_no:"Stellantrieb stromlos offen",valve_none:"kein Stellantrieb",has_window:"Fensterkontakt",warn_no_sensor:"Kein Temperaturf\xFChler zugewiesen.",warn_no_pipe_sensors:"Vorlauf- oder R\xFCcklauff\xFChler fehlt, deshalb gibt es keine Spreizung.",warn_no_rooms:"Noch kein Raum h\xE4ngt an diesem Strang.",warn_no_circuit:"Kein Strang zugewiesen, deshalb f\xFChrt keine Leitung zu diesem Raum.",warn_no_floor:"Kein Stockwerk gefunden. Weise das Thermostat in Home Assistant einem Bereich mit Stockwerk zu.",edit_parts:"Teile hinzuf\xFCgen oder \xE4ndern",edit_hint:"\xD6ffnet die Heizzentrale-Seite von Home Assistant. Dort werden W\xE4rmeerzeuger, Puffer, Str\xE4nge und R\xE4ume angelegt und ge\xE4ndert.",pump_group:"Pumpengruppe",pump_stopped:"steht",set_pumps:"Pumpengruppen",n_circuits:"{count} Str\xE4nge",pump_switchable:"schaltbar",warn_no_control:"Keine Entit\xE4t zum Schalten gew\xE4hlt. Heizzentrale kann sie dann nicht ausschalten, wenn alle Str\xE4nge zu sind.",x_pump:"{name} dr\xFCckt das Heizwasser in die Str\xE4nge dahinter. Ein Mischer, falls vorhanden, bestimmt, wie hei\xDF dieses Wasser ist.",x_pump_flow:"Vorlauftemperatur hinter dem Mischer: {temp}.",x_pump_flow_set:"Der W\xE4rmeerzeuger strebt dort gerade {temp} an.",target_short:"Soll",x_pump_needed:"Sie wird gerade gebraucht, weil diese Str\xE4nge offen sind: {circuits}.",x_pump_idle:"Alle Str\xE4nge dahinter sind zu, sie hat also nichts zu tun. Sobald das Schalten freigegeben ist, schaltet Heizzentrale sie in dieser Lage aus.",x_pump_running:"Die Pumpe meldet, dass sie l\xE4uft.",x_pump_stopped:"Die Pumpe meldet, dass sie steht.",x_pump_control:"Eine Entit\xE4t zum Schalten ist gew\xE4hlt. Heizzentrale beobachtet vorerst nur und benutzt sie noch nicht.",x_pump_modes:"Aus ist der Modus \u201E{off}\u201C, An ist der Modus \u201E{on}\u201C.",x_pump_no_control:"Es ist noch keine Entit\xE4t zum Schalten gew\xE4hlt.",setup_title:"Einrichtung",setup_intro:"Lege die Teile deiner Heizung in dieser Reihenfolge an. Pflicht ist jeweils nur der Name, F\xFChler kannst du nachtragen.",setup_done:"Die Grundeinrichtung steht. Du kannst jederzeit Teile hinzuf\xFCgen oder \xE4ndern.",setup_optional:"nur falls vorhanden",setup_source:"W\xE4rmeerzeuger",setup_source_hint:"Dein Kessel oder deine W\xE4rmepumpe.",setup_buffer:"Pufferspeicher",setup_buffer_hint:"Der Speicher f\xFCr hei\xDFes Wasser mit seinen Temperaturf\xFChlern.",setup_pump:"Pumpengruppe",setup_pump_hint:"Die Pumpe, mit oder ohne Mischer, die die Str\xE4nge versorgt.",setup_circuits:"Str\xE4nge",setup_circuits_hint:"Jeder Teil, der sich einzeln \xF6ffnen und schlie\xDFen l\xE4sst, zum Beispiel einer pro Stockwerk.",setup_rooms:"R\xE4ume",setup_rooms_hint:"Einer pro Thermostat. Name und Stockwerk kommen von selbst aus Home Assistant.",n_windows:"{count} Fensterkontakte",set_language:"Sprache",lang_auto:"Wie Home Assistant",lang_de:"Deutsch",lang_en:"English",set_language_hint:"Gilt f\xFCr diese Ansicht bei allen. Die Einrichtungsdialoge von Home Assistant folgen immer der Sprache in deinem Benutzerprofil.",editor_plant:"Anlage",editor_title:"Titel (optional)",editor_first:"Erste Anlage",stove_in_room:"In einem Raum",stove_own_tile:"Eigene Kachel im Stockwerk",stove_out:"aus",would_close:"w\xFCrde jetzt schlie\xDFen",would_open:"w\xFCrde jetzt \xF6ffnen",would_on:"w\xFCrde jetzt einschalten",would_off:"w\xFCrde jetzt ausschalten",x_adv_rooms_calling:"Der Strang wird gebraucht: {rooms} will W\xE4rme.",x_adv_unknown_room:"Der Strang bleibt sicherheitshalber offen, weil das Thermostat von {rooms} nicht lesbar ist.",x_adv_no_rooms:"Diesem Strang sind keine R\xE4ume zugeordnet, deshalb gilt er immer als gebraucht.",x_adv_waiting:"Gerade will kein Raum W\xE4rme. Nach 10 Minuten ohne Bedarf w\xFCrde der Strang schlie\xDFen.",x_adv_no_demand:"Seit \xFCber 10 Minuten will kein Raum an diesem Strang W\xE4rme.",x_adv_would_close:"Heizzentrale w\xFCrde ihn jetzt schlie\xDFen. Solange sie nur beobachtet, schaltet sie nichts.",x_adv_would_open:"Heizzentrale w\xFCrde ihn jetzt \xF6ffnen. Solange sie nur beobachtet, schaltet sie nichts.",x_padv_manual:"Die Steuer-Entit\xE4t steht in einem Modus, den jemand von Hand gew\xE4hlt hat. Heizzentrale l\xE4sst das so.",x_padv_would_off:"Kein Strang braucht W\xE4rme: Heizzentrale w\xFCrde die Pumpengruppe jetzt ausschalten. Solange sie nur beobachtet, schaltet sie nichts.",x_padv_would_on:"Ein Strang braucht W\xE4rme: Heizzentrale w\xFCrde die Pumpengruppe jetzt einschalten. Solange sie nur beobachtet, schaltet sie nichts.",edit_grip:"Zum Verschieben ziehen",edit_house:"Haus anordnen",edit_done:"Fertig",edit_note:"Ziehe R\xE4ume an ihren Platz, auch in ein anderes Stockwerk, oder nutze die Pfeile. An jede Kachel kannst du weitere F\xFChler h\xE4ngen.",edit_drop:"Raum hierher ziehen",edit_left:"Nach links",edit_right:"Nach rechts",edit_sensor:"F\xFChler",edit_sensor_title:"F\xFChler f\xFCr {name}",edit_sensor_hint:"Wird zus\xE4tzlich auf der Kachel angezeigt, zum Beispiel Luftfeuchte oder eine zweite Temperatur.",edit_sensor_search:"F\xFChler suchen",edit_sensor_label:"Kurze Beschriftung (optional)",edit_sensor_add:"F\xFChler hinzuf\xFCgen",set_stoves:"\xD6fen",stoves_intro:"Ein Schwedenofen w\xE4rmt seinen Raum und die R\xE4ume drumherum. Solange er brennt, braucht es dort keine Heizk\xF6rper. Lege pro Raum fest, was dann passiert.",add_stove:"Neuer Ofen",stove_placeholder:"Zum Beispiel \u201ESchwedenofen Wohnzimmer\u201C",stove_sensor:"Temperaturf\xFChler am Ofen",stove_sensor_hint:"Ein F\xFChler am Ofen oder am Ofenrohr. Er muss nur verraten, ob der Ofen brennt.",choose:"Bitte w\xE4hlen",stove_threshold:"Brennt ab",stove_now:"Gerade:",stove_room:"Wo steht der Ofen?",stove_room_none:"Nicht im Haus anzeigen",stove_actions:"Solange der Ofen brennt",stove_actions_hint:"Zum Beispiel den Raum mit dem Ofen aus und weiter entfernte R\xE4ume auf Eco. Ist der Ofen abgek\xFChlt, gilt wieder der Zeitplan.",stove_leave:"So lassen",stove_burning:"brennt",stove_summary:"Gilt als an ab {degrees} \xB0C.",stove_while:"Solange er brennt:",stove_no_rooms:"Noch kein Raum gew\xE4hlt, dieser Ofen \xE4ndert also nichts.",stove_no_sensor:"Noch kein Temperaturf\xFChler gew\xE4hlt.",plan_stove:"Ofen \u201E{name}\u201C brennt: {action}.",stove:"Ofen",day_0:"Mo",day_1:"Di",day_2:"Mi",day_3:"Do",day_4:"Fr",day_5:"Sa",day_6:"So",days_all:"T\xE4glich",decimal:",",act_on:"An",act_off:"Aus",act_temperature:"Temperatur \u2026",action:"Aktion",time:"Uhrzeit",name:"Name",floors:"Ganze Stockwerke",rooms_single:"Einzelne R\xE4ume",assigned_none:"noch nichts",unnamed:"Ohne Namen",edit:"Bearbeiten",remove:"Entfernen",save:"Speichern",cancel:"Abbrechen",delete:"L\xF6schen",and:"und",minutes:"Minuten",save_failed:"Speichern nicht m\xF6glich. Das d\xFCrfen nur Administratoren \xE4ndern.",set_schedules:"Zeitpl\xE4ne",schedules_intro:"Ein Zeitplan stellt Thermostate zu festen Zeiten um, zum Beispiel morgens auf Komfort und nachts auf Eco. Du weist ihn einzelnen R\xE4umen oder ganzen Stockwerken zu.",add_schedule:"Neuer Zeitplan",schedule_placeholder:"Zum Beispiel \u201EWerktage\u201C",points:"Schaltpunkte",points_hint:"Jeder Schaltpunkt gilt ab seiner Uhrzeit bis zum n\xE4chsten. Stellst du ein Thermostat von Hand um, bleibt das bis zum n\xE4chsten Schaltpunkt so.",add_point:"Schaltpunkt hinzuf\xFCgen",no_points:"Noch keine Schaltpunkte, dieser Zeitplan macht also nichts.",applies_to:"Gilt f\xFCr:",assign_hint:"Ein Zeitplan f\xFCr einen einzelnen Raum hat Vorrang vor dem Zeitplan seines Stockwerks.",set_absence:"Abwesenheit",absence_intro:"R\xE4ume automatisch absenken, solange niemand da ist, ganz ohne eigene Automation. Ist wieder jemand da, gilt der Zeitplan weiter.",add_rule:"Neue Abwesenheitsregel",rule_placeholder:"Zum Beispiel \u201EJake unterwegs\u201C",rule_who:"Wer muss weg sein?",rule_who_hint:"Personen, Handys oder Anwesenheitssensoren. Bei mehreren Eintr\xE4gen m\xFCssen alle weg sein. Ist ein Ger\xE4t nicht erreichbar, z\xE4hlt es als anwesend, damit es im Zweifel warm bleibt.",rule_add_entity:"Person oder Ger\xE4t hinzuf\xFCgen",rule_delay:"Mindestens weg seit",rule_then:"Dann die R\xE4ume stellen auf",rule_sentence:"Sobald {who} weg ist: {targets} auf {action}.",rule_sentence_delay:"Wenn {who} l\xE4nger als {minutes} Minuten weg ist: {targets} auf {action}.",rule_back:"Bei R\xFCckkehr gilt wieder der Zeitplan; ohne Zeitplan geht das Thermostat auf den Stand von vorher zur\xFCck.",rule_active:"trifft gerade zu",no_entities:"Noch keine Person und kein Ger\xE4t gew\xE4hlt, diese Regel macht also nichts.",set_apply:"Zeitpl\xE4ne, Abwesenheit und \xD6fen",apply_off:"Nur anzeigen",apply_on:"Anwenden",apply_off_hint:"Heizzentrale zeigt nur, was sie stellen w\xFCrde, und fasst kein Thermostat an. Schau in den Raumfenstern, ob es passt, und stelle dann auf \u201EAnwenden\u201C.",apply_on_hint:"Heizzentrale stellt die Thermostate an den Schaltpunkten um und wenn eine Abwesenheitsregel beginnt oder endet oder ein Ofen an- oder ausgeht.",plan:"Plan",plan_schedule:"Zeitplan \u201E{name}\u201C: {action}.",plan_absence:"Abwesenheitsregel \u201E{name}\u201C trifft zu: {action}.",plan_would:"Noch nicht angewendet, weil Zeitpl\xE4ne auf \u201ENur anzeigen\u201C stehen.",plan_none:"Kein Zeitplan zugewiesen."};function Te(u){let i=(u??"en").toLowerCase().startsWith("de")?pt:Je;return(e,t={})=>(i[e]??Je[e]??e).replace(/\{(\w+)\}/g,(s,n)=>t[n]??"")}var he=["day_0","day_1","day_2","day_3","day_4","day_5","day_6"],mt=new Set(["presence","connectivity","occupancy"]);function Ce(){return Math.random().toString(36).slice(2,10)}function Pe(u,i,e,t){if(u==="on")return i("act_on");if(u==="off")return i("act_off");if(u.startsWith("temperature:"))return`${u.slice(12).replace(".",i("decimal"))} \xB0C`;let s=u.slice(7),n=t?e?.states[t]:void 0;return n&&e?.formatEntityAttributeValue?e.formatEntityAttributeValue(n,"preset_mode",s):s.charAt(0).toUpperCase()+s.slice(1)}function _t(u,i){let e=[...new Set(u)].sort();if(e.length===7)return i("days_all");let t=[];for(let s of e){let n=t[t.length-1];n&&n[n.length-1]===s-1?n.push(s):t.push([s])}return t.map(s=>s.length>2?`${i(he[s[0]])}\u2013${i(he[s[s.length-1]])}`:s.map(n=>i(he[n])).join(", ")).join(", ")}var ne=class extends C{constructor(){super(...arguments);this.t=e=>e;this._busy=!1}async _save(e){if(!this.hass||!this.plant)return!1;this._busy=!0;try{let t=await this.hass.callWS({type:"heizzentrale/control/save",entry_id:this.plant.entry_id,...e});return this._error=void 0,this.dispatchEvent(new CustomEvent("control-changed",{detail:t})),!0}catch(t){return this._error=`${this.t("save_failed")} ${t?.message??""}`,!1}finally{this._busy=!1}}_presets(){let e=[];for(let t of this.plant?.rooms??[]){let s=t.climate_entity?this.hass?.states[t.climate_entity]?.attributes.preset_modes:void 0;for(let n of Array.isArray(s)?s:[])n!=="none"&&!e.includes(n)&&e.push(n)}return e}_climateWith(e){return this.plant?.rooms.find(t=>t.climate_entity&&this.hass?.states[t.climate_entity]?.attributes.preset_modes?.includes(e))?.climate_entity}_label(e){let t=e.startsWith("preset:")?this._climateWith(e.slice(7)):void 0;return Pe(e,this.t,this.hass,t)}_actionPicker(e,t,s){let n=this.t,r=e.startsWith("temperature:"),a=this._presets().map(l=>`preset:${l}`);return e.startsWith("preset:")&&!a.includes(e)&&a.push(e),h`
      <select
        aria-label=${n("action")}
        @change=${l=>{let o=l.target.value;t(o==="temperature"?"temperature:20":o)}}
      >
        ${s!==void 0?h`<option value="" ?selected=${e===""}>${s}</option>`:m}
        ${a.map(l=>h`<option value=${l} ?selected=${e===l}>
              ${this._label(l)}
            </option>`)}
        <option value="on" ?selected=${e==="on"}>${n("act_on")}</option>
        <option value="off" ?selected=${e==="off"}>${n("act_off")}</option>
        <option value="temperature" ?selected=${r}>${n("act_temperature")}</option>
      </select>
      ${r?h`<input
            class="short"
            type="number"
            min="5"
            max="30"
            step="0.5"
            aria-label="°C"
            .value=${e.slice(12)}
            @change=${l=>{let o=Number(l.target.value);if(Number.isFinite(o)){let c=Math.round(Math.min(30,Math.max(5,o))*2)/2;t(`temperature:${c}`)}}}
          />`:m}
    `}_targetPicker(e,t){let s=this.t,n=(a,l)=>a.includes(l)?a.filter(o=>o!==l):[...a,l],r=this.plant;return r?h`
      ${r.floors.length?h`<div class="label">${s("floors")}</div>
            <div class="choices">
              ${r.floors.map(a=>h`<button
                    class="choice ${e.floors.includes(a.id)?"on":""}"
                    aria-pressed=${e.floors.includes(a.id)}
                    @click=${()=>t(e.rooms,n(e.floors,a.id))}
                  >
                    ${a.name}
                  </button>`)}
            </div>`:m}
      <div class="label">${s("rooms_single")}</div>
      <div class="choices">
        ${r.rooms.map(a=>{let l=!!a.floor&&e.floors.includes(a.floor),o=e.rooms.includes(a.id);return h`<button
            class="choice ${o?"on":l?"via":""}"
            aria-pressed=${o}
            @click=${()=>t(n(e.rooms,a.id),e.floors)}
          >
            ${a.name}
          </button>`})}
      </div>
    `:m}_targetNames(e){let t=this.plant,s=[...e.floors.map(n=>t?.floors.find(r=>r.id===n)?.name),...e.rooms.map(n=>t?.rooms.find(r=>r.id===n)?.name)].filter(Boolean);return s.length?s.join(", "):this.t("assigned_none")}_renderSchedule(e){let t=this.t,s=[...e.points].sort((n,r)=>Math.min(...n.days)-Math.min(...r.days)||n.time.localeCompare(r.time));return h`
      <li>
        <div class="row-main">
          <span class="row-name">${e.name||t("unnamed")}</span>
          <button class="link" @click=${()=>this._schedule=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        ${s.length?s.map(n=>h`<div class="row-detail">
                  ${_t(n.days,t)} ${n.time} · ${this._label(n.action)}
                </div>`):h`<div class="row-warn">${t("no_points")}</div>`}
        <div class="row-detail">${t("applies_to")} ${this._targetNames(e)}</div>
      </li>
    `}_renderScheduleEditor(e){let t=this.t,s=l=>this._schedule={...e,...l},n=(l,o)=>s({points:e.points.map((c,d)=>d===l?{...c,...o}:c)}),r=this.control?.schedules.some(l=>l.id===e.id),a=async()=>{let l={...e,name:e.name.trim(),points:e.points.filter(d=>d.days.length)},o=(this.control?.schedules??[]).filter(d=>d.id!==e.id),c=r?(this.control?.schedules??[]).map(d=>d.id===e.id?l:d):[...o,l];await this._save({schedules:c})&&(this._schedule=void 0)};return h`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${e.name}
            placeholder=${t("schedule_placeholder")}
            @input=${l=>s({name:l.target.value})}
          />
        </label>
        <div class="label">${t("points")}</div>
        <p class="hint first">${t("points_hint")}</p>
        ${e.points.map((l,o)=>h`
            <div class="point">
              <div class="days">
                ${he.map((c,d)=>h`<button
                      class="day ${l.days.includes(d)?"on":""}"
                      aria-pressed=${l.days.includes(d)}
                      @click=${()=>n(o,{days:l.days.includes(d)?l.days.filter(p=>p!==d):[...l.days,d].sort()})}
                    >
                      ${t(c)}
                    </button>`)}
              </div>
              <div class="point-line">
                <input
                  type="time"
                  aria-label=${t("time")}
                  .value=${l.time}
                  @change=${c=>n(o,{time:c.target.value||l.time})}
                />
                ${this._actionPicker(l.action,c=>n(o,{action:c}))}
                <button
                  class="icon"
                  aria-label=${t("remove")}
                  @click=${()=>s({points:e.points.filter((c,d)=>d!==o)})}
                >
                  ✕
                </button>
              </div>
            </div>
          `)}
        <button
          class="link"
          @click=${()=>s({points:[...e.points,{days:e.points[e.points.length-1]?.days??[0,1,2,3,4,5,6],time:e.points.length?"22:00":"06:00",action:this._presets().length?`preset:${this._presets()[0]}`:e.points.length?"off":"on"}]})}
        >
          + ${t("add_point")}
        </button>
        <div class="label">${t("applies_to")}</div>
        <p class="hint first">${t("assign_hint")}</p>
        ${this._targetPicker(e,(l,o)=>s({rooms:l,floors:o}))}
        ${this._renderEditorButtons(a,()=>this._schedule=void 0,r?async()=>{let l=(this.control?.schedules??[]).filter(o=>o.id!==e.id);await this._save({schedules:l})&&(this._schedule=void 0)}:void 0)}
      </div>
    `}_renderEditorButtons(e,t,s){let n=this.t;return h`
      ${this._error?h`<div class="row-warn">${this._error}</div>`:m}
      <div class="buttons">
        <button class="wide primary" ?disabled=${this._busy} @click=${e}>${n("save")}</button>
        <button class="wide" @click=${t}>${n("cancel")}</button>
        ${s?h`<button class="wide danger" ?disabled=${this._busy} @click=${s}>
              ${n("delete")}
            </button>`:m}
      </div>
    `}_entityName(e){return this.hass?.states[e]?.attributes.friendly_name??e}_candidates(){return Object.entries(this.hass?.states??{}).filter(([e,t])=>{let s=e.split(".",1)[0];return s==="person"||s==="device_tracker"||s==="input_boolean"?!0:s==="binary_sensor"&&mt.has(t.attributes.device_class)}).map(([e])=>e).sort((e,t)=>this._entityName(e).localeCompare(this._entityName(t)))}_ruleSentence(e){let t=this.t,s=e.entities.map(n=>this._entityName(n)).join(` ${t("and")} `);return t(e.delay_min>0?"rule_sentence_delay":"rule_sentence",{who:s||"?",minutes:String(e.delay_min),targets:this._targetNames(e),action:this._label(e.action)})}_renderRule(e){let t=this.t,s=this.control?.active_rules.includes(e.id);return h`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${e.name||t("unnamed")}${s?h`<span class="badge">${t("rule_active")}</span>`:m}</span
          >
          <button class="link" @click=${()=>this._rule=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        <div class="row-detail">${this._ruleSentence(e)}</div>
        ${e.entities.length?m:h`<div class="row-warn">${t("no_entities")}</div>`}
      </li>
    `}_renderRuleEditor(e){let t=this.t,s=l=>this._rule={...e,...l},n=this.control?.rules.some(l=>l.id===e.id),r=this._candidates().filter(l=>!e.entities.includes(l)),a=async()=>{let l={...e,name:e.name.trim()},o=this.control?.rules??[],c=n?o.map(d=>d.id===e.id?l:d):[...o,l];await this._save({rules:c})&&(this._rule=void 0)};return h`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${e.name}
            placeholder=${t("rule_placeholder")}
            @input=${l=>s({name:l.target.value})}
          />
        </label>
        <div class="label">${t("rule_who")}</div>
        <p class="hint first">${t("rule_who_hint")}</p>
        <div class="choices">
          ${e.entities.map(l=>h`<button
                class="choice on"
                title=${l}
                @click=${()=>s({entities:e.entities.filter(o=>o!==l)})}
              >
                ${this._entityName(l)} ✕
              </button>`)}
        </div>
        <select
          aria-label=${t("rule_add_entity")}
          @change=${l=>{let o=l.target;o.value&&s({entities:[...e.entities,o.value]}),o.value=""}}
        >
          <option value="">+ ${t("rule_add_entity")}</option>
          ${r.map(l=>h`<option value=${l}>
                ${this._entityName(l)} (${l.split(".",1)[0]})
              </option>`)}
        </select>
        <label class="field inline">
          <span class="label">${t("rule_delay")}</span>
          <input
            class="short"
            type="number"
            min="0"
            max="1440"
            step="1"
            .value=${String(e.delay_min)}
            @change=${l=>{let o=Number(l.target.value);s({delay_min:Number.isFinite(o)?Math.min(1440,Math.max(0,o)):0})}}
          />
          <span class="row-detail">${t("minutes")}</span>
        </label>
        <div class="label">${t("rule_then")}</div>
        <div class="point-line">
          ${this._actionPicker(e.action,l=>s({action:l}))}
        </div>
        <div class="label">${t("applies_to")}</div>
        ${this._targetPicker(e,(l,o)=>s({rooms:l,floors:o}))}
        <p class="hint">${this._ruleSentence(e)} ${t("rule_back")}</p>
        ${this._renderEditorButtons(a,()=>this._rule=void 0,n?async()=>{let l=(this.control?.rules??[]).filter(o=>o.id!==e.id);await this._save({rules:l})&&(this._rule=void 0)}:void 0)}
      </div>
    `}_stoveTemp(e){let t=e.sensor?this.hass?.states[e.sensor]:void 0,s=Number(t?.state);return!t||!Number.isFinite(s)?"":`${Math.round(s)} ${t.attributes.unit_of_measurement??"\xB0C"}`}_renderStove(e){let t=this.t,s=this.control?.burning?.includes(e.id),n=Object.entries(e.actions).map(([r,a])=>{let l=this.plant?.rooms.find(o=>o.id===r);return l?`${l.name} ${this._label(a)}`:""}).filter(Boolean);return h`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${e.name||t("unnamed")}${s?h`<span class="badge hot">${t("stove_burning")}</span>`:m}</span
          >
          <button class="link" @click=${()=>this._stove=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        <div class="row-detail">
          ${t("stove_summary",{degrees:String(e.on_above)})}
          ${this._stoveTemp(e)?`${t("stove_now")} ${this._stoveTemp(e)}.`:""}
        </div>
        ${n.length?h`<div class="row-detail">${t("stove_while")} ${n.join(", ")}</div>`:h`<div class="row-warn">${t("stove_no_rooms")}</div>`}
        ${e.sensor?m:h`<div class="row-warn">${t("stove_no_sensor")}</div>`}
      </li>
    `}_renderStoveEditor(e){let t=this.t,s=o=>this._stove={...e,...o},n=this.control?.stoves??[],r=n.some(o=>o.id===e.id),a=Object.entries(this.hass?.states??{}).filter(([o,c])=>o.startsWith("sensor.")&&c.attributes.device_class==="temperature").map(([o])=>o).sort((o,c)=>this._entityName(o).localeCompare(this._entityName(c)));e.sensor&&!a.includes(e.sensor)&&a.unshift(e.sensor);let l=async()=>{let o={...e,name:e.name.trim()},c=r?n.map(d=>d.id===e.id?o:d):[...n,o];await this._save({stoves:c})&&(this._stove=void 0)};return h`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${e.name}
            placeholder=${t("stove_placeholder")}
            @input=${o=>s({name:o.target.value})}
          />
        </label>
        <div class="label">${t("stove_sensor")}</div>
        <p class="hint first">${t("stove_sensor_hint")}</p>
        <select
          aria-label=${t("stove_sensor")}
          @change=${o=>s({sensor:o.target.value||null})}
        >
          <option value="" ?selected=${!e.sensor}>${t("choose")}</option>
          ${a.map(o=>h`<option value=${o} ?selected=${e.sensor===o}>
                ${this._entityName(o)}
              </option>`)}
        </select>
        <label class="field inline">
          <span class="label">${t("stove_threshold")}</span>
          <input
            class="short"
            type="number"
            min="25"
            max="500"
            step="1"
            .value=${String(e.on_above)}
            @change=${o=>{let c=Number(o.target.value);s({on_above:Number.isFinite(c)?Math.min(500,Math.max(25,c)):40})}}
          />
          <span class="row-detail"
            >°C ${this._stoveTemp(e)?`\xB7 ${t("stove_now")} ${this._stoveTemp(e)}`:""}</span
          >
        </label>
        <label class="field">
          <span class="label">${t("stove_room")}</span>
          <select
            @change=${o=>{let[c,d]=o.target.value.split(":");s({room:c==="room"?d:null,floor:c==="floor"?d:null})}}
          >
            <option value="" ?selected=${!e.room&&!e.floor}>
              ${t("stove_room_none")}
            </option>
            <optgroup label=${t("stove_in_room")}>
              ${this.plant?.rooms.map(o=>h`<option value="room:${o.id}" ?selected=${e.room===o.id}>
                    ${this._roomLabel(o)}
                  </option>`)}
            </optgroup>
            <optgroup label=${t("stove_own_tile")}>
              ${this.plant?.floors.map(o=>h`<option
                    value="floor:${o.id}"
                    ?selected=${!e.room&&e.floor===o.id}
                  >
                    ${o.name}
                  </option>`)}
            </optgroup>
          </select>
        </label>
        <div class="label">${t("stove_actions")}</div>
        <p class="hint first">${t("stove_actions_hint")}</p>
        ${this.plant?.rooms.map(o=>h`
            <div class="room-line">
              <span>${this._roomLabel(o)}</span>
              <span class="point-line">
                ${this._actionPicker(e.actions[o.id]??"",c=>{let d={...e.actions};c?d[o.id]=c:delete d[o.id],s({actions:d})},t("stove_leave"))}
              </span>
            </div>
          `)}
        ${this._renderEditorButtons(l,()=>this._stove=void 0,r?async()=>{let o=n.filter(c=>c.id!==e.id);await this._save({stoves:o})&&(this._stove=void 0)}:void 0)}
      </div>
    `}_roomLabel(e){let t=this.plant?.floors.find(s=>s.id===e.floor);return t?`${e.name} (${t.name})`:e.name}render(){let e=this.t,t=this.control;if(!t||!this.plant)return m;let s=this._presets().includes("away")?"preset:away":"off",n=t.stoves??[],r=t.window??{enabled:!0,delay_min:2};return h`${this._renderMain(t,s,n)}${this._renderFlow(t)}
    ${this._renderTail(t,r)}`}_renderFlow(e){let t=this.t,s=e.flow??{entity:null,min:19,max:22,step:.5,apply:!1},n=()=>({entity:s.entity,min:s.min,max:s.max,step:s.step,apply:s.apply}),r=Object.keys(this.hass?.states??{}).filter(d=>d.startsWith("number.")||d.startsWith("input_number.")).filter(d=>{let p=this.hass.states[d].attributes.unit_of_measurement;return p==="\xB0C"||p==="K"||p==="\xB0F"||d===s.entity}).sort((d,p)=>this._entityName(d).localeCompare(this._entityName(p))),a=s.entity?this.hass?.states[s.entity]?.attributes.unit_of_measurement??"":"",l=d=>d==null?"?":`${d.toLocaleString(this.language||void 0,{maximumFractionDigits:1})} ${a}`.trim(),o=(d,p,f)=>h`
      <label class="field inline">
        <span class="label">${t(`flow_${d}`)}</span>
        <input
          class="short"
          type="number"
          min=${p}
          max=${f}
          step="0.1"
          .value=${String(s[d])}
          @change=${g=>{let w=Number(g.target.value);if(!Number.isFinite(w))return;let b={...n(),[d]:Math.min(f,Math.max(p,w))};b.min>b.max&&(d==="min"?b.max=b.min:b.min=b.max),this._save({flow:b})}}
        />
      </label>
    `,c=s.reason??"unknown";return h`
      <section class="set">
        <h3>${t("set_flow")}</h3>
        <p class="hint first">${t("flow_hint")}</p>
        <div class="label">${t("flow_entity")}</div>
        <select
          aria-label=${t("flow_entity")}
          ?disabled=${this._busy}
          @change=${d=>this._save({flow:{...n(),entity:d.target.value||null,apply:!1}})}
        >
          <option value="" ?selected=${!s.entity}>${t("flow_none")}</option>
          ${r.map(d=>h`<option value=${d} ?selected=${s.entity===d}>
                ${this._entityName(d)}
              </option>`)}
        </select>
        ${s.entity?h`
              ${o("min",-50,100)} ${o("max",-50,100)} ${o("step",.1,5)}
              <div class="status">
                <p>
                  ${t("flow_now",{value:l(s.value)})}
                  ${t(`flow_r_${c}`,{rooms:(s.rooms??[]).join(", "),target:l(s.target)})}
                </p>
                ${(s.history??[]).slice(-3).reverse().map(d=>h`<p class="row-detail">
                        ${new Date(d.time).toLocaleString(this.language||void 0,{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}:
                        ${l(d.from)} → ${l(d.to)}
                      </p>`)}
              </div>
              <div class="choices">
                ${[!1,!0].map(d=>h`<button
                      class="choice ${s.apply===d?"on":""}"
                      aria-pressed=${s.apply===d}
                      ?disabled=${this._busy}
                      @click=${()=>this._save({flow:{...n(),apply:d}})}
                    >
                      ${t(d?"apply_on":"apply_off")}
                    </button>`)}
              </div>
              <p class="hint">${t(s.apply?"flow_apply_on":"flow_apply_off")}</p>
            `:m}
      </section>
    `}_renderMain(e,t,s){let n=this.t;return h`
      <section class="set">
        <h3>${n("set_schedules")}</h3>
        <p class="hint first">${n("schedules_intro")}</p>
        ${e.schedules.length?h`<ul>
              ${e.schedules.map(r=>this._schedule?.id===r.id?h`<li>${this._renderScheduleEditor(this._schedule)}</li>`:this._renderSchedule(r))}
            </ul>`:m}
        ${this._schedule&&!e.schedules.some(r=>r.id===this._schedule.id)?h`<div class="new">${this._renderScheduleEditor(this._schedule)}</div>`:h`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._schedule={id:Ce(),name:"",points:[],rooms:[],floors:[]}}}
            >
              + ${n("add_schedule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${n("set_absence")}</h3>
        <p class="hint first">${n("absence_intro")}</p>
        ${e.rules.length?h`<ul>
              ${e.rules.map(r=>this._rule?.id===r.id?h`<li>${this._renderRuleEditor(this._rule)}</li>`:this._renderRule(r))}
            </ul>`:m}
        ${this._rule&&!e.rules.some(r=>r.id===this._rule.id)?h`<div class="new">${this._renderRuleEditor(this._rule)}</div>`:h`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._rule={id:Ce(),name:"",entities:[],delay_min:10,rooms:[],floors:[],action:t}}}
            >
              + ${n("add_rule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${n("set_stoves")}</h3>
        <p class="hint first">${n("stoves_intro")}</p>
        ${s.length?h`<ul>
              ${s.map(r=>this._stove?.id===r.id?h`<li>${this._renderStoveEditor(this._stove)}</li>`:this._renderStove(r))}
            </ul>`:m}
        ${this._stove&&!s.some(r=>r.id===this._stove.id)?h`<div class="new">${this._renderStoveEditor(this._stove)}</div>`:h`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._stove={id:Ce(),name:"",sensor:null,on_above:40,room:null,floor:null,actions:{}}}}
            >
              + ${n("add_stove")}
            </button>`}
      </section>
    `}_renderPreheat(e){let t=this.t,s=e.preheat??{enabled:!1,max_min:120},n={enabled:s.enabled,max_min:s.max_min},r=(this.plant?.rooms??[]).filter(a=>s.rates?.[a.id]!==void 0).map(a=>`${a.name} ${s.rates[a.id].toLocaleString(this.language||void 0,{maximumFractionDigits:1})}`);return h`
      <section class="set">
        <h3>${t("set_preheat")}</h3>
        <div class="choices">
          ${[!1,!0].map(a=>h`<button
                class="choice ${s.enabled===a?"on":""}"
                aria-pressed=${s.enabled===a}
                ?disabled=${this._busy}
                @click=${()=>this._save({preheat:{...n,enabled:a}})}
              >
                ${t(a?"preheat_on":"preheat_off")}
              </button>`)}
        </div>
        ${s.enabled?h`<label class="field inline">
              <span class="label">${t("preheat_max")}</span>
              <input
                class="short"
                type="number"
                min="15"
                max="360"
                step="15"
                .value=${String(s.max_min)}
                @change=${a=>{let l=Number(a.target.value);this._save({preheat:{...n,max_min:Number.isFinite(l)?Math.min(360,Math.max(15,l)):120}})}}
              />
            </label>`:m}
        <p class="hint">${t("preheat_hint")}</p>
        <p class="hint">
          ${r.length?t("preheat_learned",{rooms:r.join(", ")}):t("preheat_learning")}
        </p>
      </section>
    `}_renderTail(e,t){let s=this.t;return h`
      ${this._renderPreheat(e)}
      <section class="set">
        <h3>${s("set_window")}</h3>
        <div class="choices">
          ${[!1,!0].map(n=>h`<button
                class="choice ${t.enabled===n?"on":""}"
                aria-pressed=${t.enabled===n}
                ?disabled=${this._busy}
                @click=${()=>this._save({window:{...t,enabled:n}})}
              >
                ${s(n?"window_on":"window_off")}
              </button>`)}
        </div>
        ${t.enabled?h`<label class="field inline">
              <span class="label">${s("window_delay")}</span>
              <input
                class="short"
                type="number"
                min="0"
                max="60"
                step="1"
                .value=${String(t.delay_min)}
                @change=${n=>{let r=Number(n.target.value);this._save({window:{...t,delay_min:Number.isFinite(r)?Math.min(60,Math.max(0,r)):2}})}}
              />
            </label>`:m}
        <p class="hint">${s("window_hint")}</p>
      </section>
      <section class="set">
        <h3>${s("set_apply")}</h3>
        <div class="choices">
          ${[!1,!0].map(n=>h`<button
                class="choice ${e.enabled===n?"on":""}"
                aria-pressed=${e.enabled===n}
                ?disabled=${this._busy}
                @click=${()=>this._save({enabled:n})}
              >
                ${s(n?"apply_on":"apply_off")}
              </button>`)}
        </div>
        <p class="hint">${s(e.enabled?"apply_on_hint":"apply_off_hint")}</p>
        ${this._error&&!this._schedule&&!this._rule&&!this._stove?h`<div class="row-warn">${this._error}</div>`:m}
      </section>
    `}};ne.properties={hass:{attribute:!1},plant:{attribute:!1},control:{attribute:!1},t:{attribute:!1},language:{attribute:!1},_schedule:{state:!0},_rule:{state:!0},_stove:{state:!0},_error:{state:!0},_busy:{state:!0}},ne.styles=U`
    :host {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    h3 {
      margin: 0 0 8px;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--hz-muted);
    }
    ul {
      list-style: none;
      margin: 10px 0;
      padding: 0;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
    }
    li {
      padding: 10px 12px;
    }
    li + li {
      border-top: 1px solid var(--hz-edge);
    }
    .new {
      margin: 10px 0;
      padding: 12px;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
    }
    .row-main {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .row-name {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      font-weight: 500;
    }
    .row-detail {
      font-size: 0.8rem;
      line-height: 1.5;
      color: var(--hz-muted);
    }
    .row-warn {
      margin-top: 4px;
      font-size: 0.8rem;
      color: color-mix(in srgb, var(--hz-warn) 75%, var(--primary-text-color));
    }
    .badge {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--hz-cold) 22%, transparent);
    }
    .badge.hot {
      background: color-mix(in srgb, var(--hz-hot) 24%, transparent);
    }
    .room-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      font-size: 0.9rem;
      padding: 4px 0;
      border-top: 1px solid var(--hz-edge);
    }
    .room-line .point-line {
      flex: 0 1 260px;
    }
    .status p {
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.45;
    }
    .hint {
      margin: 8px 0 0;
      font-size: 0.82rem;
      line-height: 1.4;
      color: var(--hz-muted);
    }
    .hint.first {
      margin: 0 0 8px;
    }
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .label {
      margin-top: 6px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field.inline {
      flex-direction: row;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .field.inline .label {
      margin: 0;
    }
    input,
    select {
      font: inherit;
      font-size: 0.9rem;
      color: var(--primary-text-color);
      background: var(--hz-card);
      border: 1px solid var(--hz-edge);
      border-radius: 10px;
      padding: 8px 10px;
      min-width: 0;
      box-sizing: border-box;
    }
    input[type="text"],
    .editor > select {
      width: 100%;
    }
    input.short {
      width: 84px;
    }
    .point {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 10px;
      border: 1px solid var(--hz-edge);
      border-radius: 12px;
      background: var(--hz-card);
    }
    .days {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
    .day {
      font: inherit;
      font-size: 0.78rem;
      min-width: 36px;
      padding: 6px 0;
      color: var(--primary-text-color);
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 8px;
      cursor: pointer;
    }
    .day.on,
    .choice.on {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .point-line {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }
    .point-line select {
      flex: 1 1 90px;
    }
    .icon {
      font: inherit;
      width: 36px;
      height: 36px;
      color: var(--hz-muted);
      background: none;
      border: 0;
      border-radius: 50%;
      cursor: pointer;
    }
    .choices {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .choice {
      font: inherit;
      font-size: 0.85rem;
      color: var(--primary-text-color);
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 999px;
      padding: 7px 14px;
      cursor: pointer;
    }
    .editor .choice:not(.on) {
      background: var(--hz-card);
    }
    .choice.via {
      border-color: var(--primary-color);
      border-style: dashed;
    }
    .wide {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
      padding: 11px;
      cursor: pointer;
      width: 100%;
    }
    .wide.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
    .wide.danger {
      color: var(--error-color, #db4437);
      background: none;
    }
    .buttons {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
    .buttons .wide {
      flex: 1 1 110px;
      width: auto;
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .link {
      font: inherit;
      font-size: 0.85rem;
      background: none;
      border: 0;
      padding: 0;
      color: var(--primary-color);
      cursor: pointer;
      align-self: flex-start;
      flex: none;
    }
    button:focus-visible,
    input:focus-visible,
    select:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `;customElements.get("heizzentrale-control")||customElements.define("heizzentrale-control",ne);var ue=["#3b82f6","#14b8a6","#a855f7","#f59e0b","#ec4899","#84cc16","#6366f1","#f97316"];function L(u,i=7){let e=n=>Math.round(n*10)/10,t=`M${e(u[0][0])} ${e(u[0][1])}`;for(let n=1;n<u.length-1;n++){let[r,a]=u[n-1],[l,o]=u[n],[c,d]=u[n+1],p=Math.hypot(l-r,o-a),f=Math.hypot(c-l,d-o),g=Math.min(i,p/2,f/2);if(g<.5){t+=` L${e(l)} ${e(o)}`;continue}t+=` L${e(l-(l-r)/p*g)} ${e(o-(o-a)/p*g)}`,t+=` Q${e(l)} ${e(o)} ${e(l+(c-l)/f*g)} ${e(o+(d-o)/f*g)}`}let s=u[u.length-1];return`${t} L${e(s[0])} ${e(s[1])}`}var Xe=new Set(["on","heat","heating","running","true"]),ie=class extends C{constructor(){super(...arguments);this._config={};this._loading=!1;this._watched=new Set;this._view="house";this._confirmActive=!1;this._edit=!1;this._sensorFilter="";this._pipes=[];this._pipeSignature=""}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("heizzentrale-house-card-editor")}setConfig(e){this._config={...e}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}set hass(e){let t=this._hass;if(this._hass=e,!this._plants&&!this._loading){this._load();return}if(!t){this.requestUpdate();return}for(let s of this._watched)if(t.states[s]!==e.states[s]){this.requestUpdate(),window.clearTimeout(this._adviceTimer),this._adviceTimer=window.setTimeout(()=>{this._loadControl()},2500);return}t.language!==e.language&&this.requestUpdate()}get hass(){return this._hass}async _load(){if(this._hass){this._loading=!0;try{let e=await this._hass.callWS({type:"heizzentrale/plants"});this._plants=e.plants,this._error=void 0,this._loadControl()}catch(e){this._error=e?.message??String(e),this._plants=[]}finally{this._loading=!1}}}async _loadControl(){let e=this._plant();if(!(!e||!this._hass))try{this._control=await this._hass.callWS({type:"heizzentrale/control/get",entry_id:e.entry_id})}catch{this._control=void 0}}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect(),this._observed=void 0,window.clearTimeout(this._adviceTimer)}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal();let t=this.renderRoot.querySelector(".house")??void 0;t!==this._observed&&(this._resize?.disconnect(),this._observed=t,t&&typeof ResizeObserver<"u"&&(this._resize??=new ResizeObserver(()=>this._measurePipes()),this._resize.observe(t))),this._measurePipes()}_lanes(e){return e.circuits.filter(t=>e.rooms.some(s=>s.circuit===t.id))}_measurePipes(){let e=this.renderRoot.querySelector(".house"),t=this._plant(),s=[];if(e&&t){let r=e.getBoundingClientRect(),a=_=>{let v=_.getBoundingClientRect();return{top:v.top-r.top,bottom:v.bottom-r.top,center:(v.left+v.right)/2-r.left,left:v.left-r.left,right:v.right-r.left}},l=_=>{let v=new Map;for(let z of _){let k=Math.round(z.bottom);v.set(k,[...v.get(k)??[],z])}return[...v.entries()].sort((z,k)=>z[0]-k[0]).map(z=>z[1])},o="var(--hz-hot)",c=(_,v)=>{let z=e.querySelector(`[data-part="${_}:${v}"]`);return z?a(z):void 0},d=_=>_.filter(v=>!!v),p=_=>this._circuitOpen(_)!==!1,f=t.circuits.some(p),g=(_,v,z)=>{if(Math.abs(_.top-v.top)<4&&v.left>=_.right){let k=(_.top+_.bottom)/2;s.push({d:L([[_.right-4,k],[v.left+4,k]]),color:o,active:z})}else{let k=_.bottom+8;s.push({d:L([[_.center,_.bottom-6],[_.center,k],[v.center,k],[v.center,v.top+6]]),color:o,active:z})}},w=(_,v,z)=>{let k=v.map(y=>({circuit:y,at:c("circuit",y.id)})).filter(y=>!!y.at);if(!k.length)return;let P=k.some(y=>p(y.circuit)),M=_.bottom+8+z,O=[_.center],F=_.center;s.push({d:L([[_.center,_.bottom-6],[_.center,M]]),color:o,active:P});let E=()=>{let y=Math.min(...O),T=Math.max(...O);T-y>1&&s.push({d:L([[y,M],[T,M]]),color:o,active:P})};for(let y of l(k.map(T=>({...T,bottom:T.at.bottom})))){let T=y[0].at.top<M;if(!T&&y[0].at.top-M>30){E();let S=y[0].at.top-10+z;s.push({d:L([[F,M],[F,S]]),color:o,active:P}),M=S,O=[F]}for(let S of y){let _e=T?S.at.bottom-6:S.at.top+6;O.push(S.at.center),s.push({d:L([[S.at.center,M],[S.at.center,_e]]),color:o,active:p(S.circuit)})}F=y[0].at.center}E()},b=d([...t.heat_sources.map(_=>c("source",_.id)),...t.buffers.map(_=>c("buffer",_.id))]);b.slice(1).forEach((_,v)=>g(b[v],_,f));let x=b[b.length-1],R=t.pump_groups??[],$=new Set;R.forEach((_,v)=>{let z=c("pump",_.id);if(!z)return;let k=t.circuits.filter(P=>P.pump_group===_.id);k.forEach(P=>$.add(P.id)),x&&g(x,z,k.some(p)),w(z,k,v*5)});let N=t.circuits.filter(_=>!$.has(_.id));x&&N.length&&w(x,N,R.length*5);let H=this._lanes(t),B=e.querySelector(".walls"),D=e.querySelector(".parts"),pe=B?a(B).left+2:0,me=D?a(D).top:0;H.forEach((_,v)=>{let z=ue[t.circuits.indexOf(_)%ue.length],k=this._circuitOpen(_)!==!1,P=pe+9+v*6,M=[...e.querySelectorAll(`[data-circuit="${_.id}"]`)].map(E=>({...a(E),heating:E.classList.contains("heating")})),O;for(let E of l(M)){let y=E[0].bottom+6+v*4;O=Math.min(O??y,y),E.sort((S,_e)=>S.center-_e.center);let T=E[E.length-1];s.push({d:L([[P,y],[T.center,y],[T.center,T.bottom-6]]),color:z,active:k&&E.some(S=>S.heating)});for(let S of E.slice(0,-1))s.push({d:L([[S.center,y],[S.center,S.bottom-6]]),color:z,active:k&&S.heating})}let F=c("circuit",_.id);if(F&&O!==void 0){let E=me-7-v*4,y=F.center+(v-(H.length-1)/2)*6;s.push({d:L([[y,F.top+6],[y,E],[P,E],[P,O]]),color:z,active:k})}})}let n=JSON.stringify(s);n!==this._pipeSignature&&(this._pipeSignature=n,this._pipes=s)}_renderPipes(){return h`<svg class="pipes" aria-hidden="true">
      ${this._pipes.map(e=>A`
          <path class="tube ${e.active?"active":""}" d=${e.d} style="stroke:${e.color}"/>
          ${e.active?A`<path class="flow" d=${e.d} style="stroke:${e.color}"/>`:m}`)}
    </svg>`}get _language(){let e=this._plant()?.language;return e==="de"||e==="en"?e:this._hass?.locale?.language??this._hass?.language??"en"}get _t(){return Te(this._language)}async _setLanguage(e,t){await this._hass?.callWS({type:"heizzentrale/set_language",entry_id:e.entry_id,language:t}),await this._load()}_state(e){if(e)return this._watched.add(e),this._hass?.states[e]}_number(e){let t=this._state(e);if(!t)return;let s=Number(t.state);return t.state!==""&&Number.isFinite(s)?s:void 0}_format(e,t,s=1){if(e===void 0)return"\u2013";let n=this._language,r=new Intl.NumberFormat(n,{minimumFractionDigits:s,maximumFractionDigits:s}).format(e);return t?`${r} ${t}`:r}_temp(e){let s=this._state(e)?.attributes.unit_of_measurement??"\xB0C";return this._format(this._number(e),s)}_plant(){if(this._plants?.length)return this._plants.find(e=>e.entry_id===this._config.entry_id)??this._plants[0]}_circuitOpen(e){if(!e.valve_entity)return!0;let t=this._state(e.open_entity)?.state;if(t==="on")return!0;if(t==="off")return!1}_windowOpen(e){return(e.window_entities??[]).map(t=>this._state(t)?.state==="on").includes(!0)}_select(e){let t=this._selection&&this._selection.kind===e.kind&&this._selection.id===e.id;this._selection=t?void 0:e,!t&&e.kind==="room"&&this._loadControl()}_key(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(t))}_isSelected(e,t){let s=this._selection;return!!s&&s.kind===e&&s.id===t}render(){this._watched.clear();let e=this._t;if(!this._plants)return h`<ha-card><div class="note">${e("loading")}</div></ha-card>`;let t=this._plant();if(!t)return h`<ha-card
        ><div class="note">${this._error??e("no_plant")}</div></ha-card
      >`;let s=!t.rooms.length&&!t.circuits.length&&!t.buffers.length&&!t.pump_groups?.length&&!t.heat_sources.length,n=new Map;return t.circuits.forEach((r,a)=>n.set(r.id,ue[a%ue.length])),h`
      <ha-card>
        ${this._renderHeader(t)}
        ${s&&this._view==="house"?h`<div class="settings">${this._renderSetup(t)}</div>`:m}
        ${this._view==="settings"?this._renderSettings(t,n):h`${s?m:this._renderHouse(t,n)}
            ${this._renderExplanation(t)} ${this._renderRoomDialog(t,n)}
            ${this._renderSensorDialog(t)}`}
      </ha-card>
    `}_renderHeader(e){let t=this._t,s=this._state(e.mode_entity)?.state,n=e.outdoor_entity?h`<span class="chip" title=${t("outdoor")}
          >${t("outdoor")} ${this._temp(e.outdoor_entity)}</span
        >`:m,r=s==="observe"||s==="off"||s==="active"?h`<button
            class="chip mode ${s}"
            @click=${()=>this._select({kind:"mode"})}
          >
            ${t(`mode_${s}`)}
          </button>`:m;return h`
      <div class="header">
        <h2>${this._config.title||e.name}</h2>
        <div class="chips">
          ${n}${r}
          ${this._view==="house"&&e.rooms.length?h`<button
                class="chip ${this._edit?"on":"icon"}"
                aria-label=${t(this._edit?"edit_done":"edit_house")}
                title=${t(this._edit?"edit_done":"edit_house")}
                aria-pressed=${this._edit}
                @click=${()=>{this._selection=void 0,this._edit=!this._edit}}
              >
                ${this._edit?t("edit_done"):gt}
              </button>`:m}
          <button
            class="chip icon ${this._view==="settings"?"on":""}"
            aria-label=${t(this._view==="settings"?"back":"settings")}
            title=${t(this._view==="settings"?"back":"settings")}
            @click=${()=>{this._selection=void 0,this._view=this._view==="settings"?"house":"settings",this._edit=!1,this._loadControl()}}
          >
            ${this._view==="settings"?ft:Qe}
          </button>
        </div>
      </div>
    `}_renderHouse(e,t){let s=this._t,n=new Set(e.floors.map(g=>g.id)),r=this._edit,a=r?e.all_floors??e.floors:e.floors,l=g=>(this._control?.stoves??[]).some(w=>!w.room&&w.floor===g),o=(g,w,b="")=>w.length||b&&(r||l(b))?h`
            <section
              class="storey ${this._drag?.moved&&this._drag.overFloor===b?"drop":""}"
              data-floor=${b}
            >
              ${g?h`<div class="floor-name">${g}</div>`:m}
              <div class="rooms">
                ${w.map(x=>this._renderRoom(e,x,t))}
                ${b?this._renderStoveTiles(b):m}
                ${w.length||!r?m:h`<div class="drop-hint">${s("edit_drop")}</div>`}
              </div>
            </section>
          `:m,c=g=>e.rooms.filter(w=>w.floor===g),d=a.filter(g=>(g.level??0)>=0),p=a.filter(g=>(g.level??0)<0),f=e.rooms.filter(g=>!g.floor||!n.has(g.floor));return h`
      <div class="house" style="--hz-lanes:${this._lanes(e).length}">
        ${r?m:this._renderPipes()}
        ${r?h`<p class="edit-note">${s("edit_note")}</p>`:m}
        <div class="roof">${bt}</div>
        <div class="walls">
          ${d.map(g=>o(g.name,c(g.id),g.id))}
          ${o(a.length?s("other_rooms"):"",f)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${p.map(g=>o(g.name,c(g.id),g.id))}
          ${this._renderPlantRoom(e,t)}
        </div>
      </div>
    `}_renderRoom(e,t,s){let n=this._t,r=this._state(t.climate_entity),a=r?.attributes??{},l=!r||r.state==="unavailable"||r.state==="unknown",o=a.hvac_action==="heating",c=this._windowOpen(t),d="\xB0",p=a.current_temperature,f=a.temperature,g=a.preset_mode&&a.preset_mode!=="none"?String(a.preset_mode):void 0,w=e.circuits.find($=>$.id===t.circuit),b={kind:"room",id:t.id},x=this._drag?.id===t.id&&this._drag.moved?this._drag:void 0,R=this._drag?.moved&&this._drag.overRoom===t.id?this._drag.after?"drop-after":"drop-before":"";return h`
      <div
        class="room ${o?"heating":""} ${l?"off":""}
          ${this._isSelected("room",t.id)?"selected":""}
          ${this._edit?"editing":""} ${x?"dragging":""} ${R}"
        style=${x?`transform:translate(${x.dx}px,${x.dy}px)`:m}
        role="button"
        tabindex="0"
        data-room=${t.id}
        data-circuit=${w?.id??m}
        @click=${()=>!this._edit&&this._select(b)}
        @keydown=${$=>!this._edit&&this._key($,b)}
        @pointerdown=${$=>this._dragStart($,t)}
        @pointermove=${$=>this._dragMove($)}
        @pointerup=${$=>this._dragEnd($,e)}
        @pointercancel=${()=>this._drag=void 0}
      >
        <div class="room-top">
          <span class="room-name"
            >${w?h`<span class="dot" style="background:${s.get(w.id)}"></span>`:m}${t.name}</span
          >
          <span class="icons">
            ${this._edit?h`<span class="grip" title=${n("edit_grip")}>⠿</span>`:m}
            ${c?h`<span class="badge window" title=${n("window_open")}
                  >${vt}</span
                >`:m}
            ${o?h`<span class="badge flame" title=${n("heating")}
                  >${Re}</span
                >`:m}
          </span>
        </div>
        <div class="room-temp">
          ${this._format(typeof p=="number"?p:void 0,"")}<span
            class="unit"
            >${d}</span
          >
        </div>
        <div class="room-bottom">
          <span
            >${n("target")}
            ${r?.state==="off"?"\u2013":this._format(typeof f=="number"?f:void 0,"")}${d}</span
          >
          ${g?h`<span class="preset">${this._presetLabel(r,g)}</span>`:m}
        </div>
        ${(this._control?.stoves??[]).filter($=>$.room===t.id).map($=>{let N=this._control?.burning?.includes($.id);return h`<div class="stove ${N?"burning":""}">
              ${Re}<span class="stove-name">${$.name||n("stove")}</span>
              <span>${this._format(this._number($.sensor),"\xB0",0)}</span>
            </div>`})}
        ${this._renderExtras(e,`room:${t.id}`)}
        ${this._edit?h`<div class="edit-row">
              <button
                aria-label=${n("edit_left")}
                title=${n("edit_left")}
                @click=${()=>this._nudge(e,t,-1)}
              >
                ◀
              </button>
              <button
                class="grow"
                @click=${()=>this._sensorPlace={place:`room:${t.id}`,name:t.name}}
              >
                + ${n("edit_sensor")}
              </button>
              <button
                aria-label=${n("edit_right")}
                title=${n("edit_right")}
                @click=${()=>this._nudge(e,t,1)}
              >
                ▶
              </button>
            </div>`:m}
      </div>
    `}_renderStoveTiles(e){let t=this._t;return(this._control?.stoves??[]).filter(s=>!s.room&&s.floor===e).map(s=>{let n=!!this._control?.burning?.includes(s.id);return h`<div class="room stove-tile ${n?"heating":""}">
          <div class="room-top">
            <span class="room-name">${s.name||t("stove")}</span>
            <span class="icons"
              >${n?h`<span class="badge flame" title=${t("stove_burning")}>${Re}</span>`:m}</span
            >
          </div>
          <div class="room-temp">
            ${this._format(this._number(s.sensor),"",0)}<span class="unit">°</span>
          </div>
          <div class="room-bottom">
            <span>${t(n?"stove_burning":"stove_out")}</span>
            <span class="preset">${t("stove")}</span>
          </div>
        </div>`})}_renderExtras(e,t){let s=(e.extra_sensors??[]).filter(n=>n.place===t);return s.length?h`<div class="extras">
      ${s.map(n=>{let r=this._state(n.entity),a=this._number(n.entity),l=r?.attributes.unit_of_measurement??"",o=a!==void 0?this._format(a,l,Math.abs(a)>=100?0:1):r?.state??"\u2013";return h`<div class="extra">
          <span class="extra-name"
            >${n.label||r?.attributes.friendly_name||n.entity}</span
          ><span>${o}</span>
        </div>`})}
    </div>`:m}async _saveLayout(e,t){try{let s=await this._hass.callWS({type:"heizzentrale/layout/save",entry_id:e.entry_id,...t});this._plants=s.plants,this._error=void 0}catch(s){this._error=s?.message??String(s)}}_moveRoom(e,t,s,n,r=!1){let a=e.rooms.map(d=>d.id).filter(d=>d!==t),l=n?a.indexOf(n):-1;l>=0?a.splice(l+(r?1:0),0,t):a.push(t);let o={...e.placed_floors??{}};s?o[t]=s:s===""&&delete o[t];let c=new Map(e.rooms.map(d=>[d.id,d]));e.rooms=a.map(d=>{let p=c.get(d);return d===t&&s?{...p,floor:s}:p}),this.requestUpdate(),this._saveLayout(e,{order:a,floors:o})}_nudge(e,t,s){let n=e.rooms.filter(a=>(a.floor??"")===(t.floor??"")),r=n[n.indexOf(t)+s];r&&this._moveRoom(e,t.id,void 0,r.id,s>0)}_dragStart(e,t){!this._edit||e.button!==0||e.target.closest("button")||e.pointerType!=="mouse"&&!e.target.closest(".grip")||(e.currentTarget.setPointerCapture(e.pointerId),this._drag={id:t.id,startX:e.clientX,startY:e.clientY,dx:0,dy:0,moved:!1})}_dragMove(e){let t=this._drag;if(!t)return;let s=e.clientX-t.startX,n=e.clientY-t.startY,r={...t,dx:s,dy:n,moved:t.moved||Math.hypot(s,n)>6};r.overRoom=r.overFloor=void 0;let l=this.renderRoot.elementsFromPoint?.(e.clientX,e.clientY)??[];for(let o of l){let c=o.closest?.(".room[data-room]");if(c&&c.dataset.room!==t.id){let p=c.getBoundingClientRect();r.overRoom=c.dataset.room,r.after=e.clientX>p.left+p.width/2}let d=o.closest?.(".storey[data-floor]");if(d){r.overFloor=d.dataset.floor??"";break}}this._drag=r}_dragEnd(e,t){let s=this._drag;this._drag=void 0,!(!s?.moved||s.overFloor===void 0)&&this._moveRoom(t,s.id,s.overFloor,s.overRoom,s.after)}_renderSensorDialog(e){let t=this._sensorPlace;if(!t)return m;let s=this._t,n=e.extra_sensors??[],r=n.filter(p=>p.place===t.place),a=()=>{this._sensorPlace=void 0,this._sensorFilter=""},l=this._sensorFilter.trim().toLowerCase(),o=p=>String(this._hass?.states[p]?.attributes.friendly_name??p),c=Object.keys(this._hass?.states??{}).filter(p=>p.startsWith("sensor.")).filter(p=>!l||p.toLowerCase().includes(l)||o(p).toLowerCase().includes(l)).sort((p,f)=>o(p).localeCompare(o(f))).slice(0,200),d=()=>{let p=this.renderRoot.querySelector("#extra-entity"),f=this.renderRoot.querySelector("#extra-label");if(!p?.value)return;let g={id:Math.random().toString(36).slice(2,10),entity:p.value,label:f?.value.trim()??"",place:t.place};f&&(f.value=""),this._saveLayout(e,{sensors:[...n,g]})};return h`
      <dialog class="backdrop" aria-label=${s("edit_sensor")} @click=${a} @cancel=${a}>
        <div class="sheet" @click=${p=>p.stopPropagation()}>
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${s("edit_sensor_title",{name:t.name})}</div>
              <div class="sheet-sub">${s("edit_sensor_hint")}</div>
            </div>
            <button class="close" aria-label=${s("close")} @click=${a}>✕</button>
          </div>
          ${r.map(p=>h`<div class="extra-row">
                <span>${p.label||o(p.entity)}</span>
                <button
                  class="close"
                  aria-label=${s("remove")}
                  @click=${()=>this._saveLayout(e,{sensors:n.filter(f=>f.id!==p.id)})}
                >
                  ✕
                </button>
              </div>`)}
          <input
            class="field"
            type="search"
            placeholder=${s("edit_sensor_search")}
            aria-label=${s("edit_sensor_search")}
            .value=${this._sensorFilter}
            @input=${p=>this._sensorFilter=p.target.value}
          />
          <select id="extra-entity" class="field" aria-label=${s("edit_sensor")}>
            ${c.map(p=>h`<option value=${p}>${o(p)}</option>`)}
          </select>
          <input
            id="extra-label"
            class="field"
            type="text"
            maxlength="30"
            placeholder=${s("edit_sensor_label")}
            aria-label=${s("edit_sensor_label")}
          />
          <button class="wide primary" ?disabled=${!c.length} @click=${d}>
            ${s("edit_sensor_add")}
          </button>
        </div>
      </dialog>
    `}_renderPlantRoom(e,t){let s=this._t;if(!e.heat_sources.length&&!e.buffers.length&&!e.circuits.length&&!e.pump_groups?.length)return m;let n=e.circuits.some(r=>this._circuitOpen(r)!==!1);return h`
      <section class="storey plant-room">
        <div class="floor-name">${s("plant_room")}</div>
        <div class="parts">
          ${e.heat_sources.map(r=>this._renderSource(r,n))}
          ${e.buffers.map(r=>this._renderBuffer(r,n))}
          ${(e.pump_groups??[]).map(r=>this._renderPumpGroup(e,r))}
          ${e.circuits.map(r=>this._renderCircuit(r,t.get(r.id)??"gray"))}
        </div>
      </section>
    `}_part(e,t,s,n=""){return h`
      <div
        class="part ${t?"flowing":""} ${n}
          ${this._isSelected(e.kind,e.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-part="${e.kind}:${e.id}"
        @click=${()=>!this._edit&&this._select(e)}
        @keydown=${r=>!this._edit&&this._key(r,e)}
      >
        ${s}
        ${this._plant()?this._renderExtras(this._plant(),`${e.kind}:${e.id}`):m}
        ${this._edit&&e.kind!=="mode"?h`<button
              class="edit-add"
              @click=${r=>{r.stopPropagation(),this._sensorPlace={place:`${e.kind}:${e.id}`,name:r.currentTarget.closest(".part")?.querySelector(".part-name")?.textContent?.trim()??""}}}
            >
              + ${this._t("edit_sensor")}
            </button>`:m}
      </div>
    `}_sourceActive(e){let t=this._state(e.status_entity)?.state?.toLowerCase();return!!t&&Xe.has(t)}_renderSource(e,t){let s=this._t,n=this._sourceActive(e);return this._part({kind:"source",id:e.id},t,h`
        <div class="part-name">${e.name}</div>
        <div class="figure">${$t(n)}</div>
        <div class="big">
          ${e.temperature_entity?this._temp(e.temperature_entity):e.flow_entity?this._temp(e.flow_entity):"\u2013"}
        </div>
        <div class="sub">
          ${s(n?"running":`kind_${e.kind}`)}
        </div>
      `)}_renderBuffer(e,t){let s=e.sensor_entities.map(n=>this._number(n));return this._part({kind:"buffer",id:e.id},t,h`
        <div class="part-name">${e.name}</div>
        <div class="figure buffer-figure">
          ${xt(s)}
          <div class="tank-values">
            ${e.sensor_entities.map(n=>h`<span>${this._temp(n)}</span>`)}
          </div>
        </div>
        <div class="sub">
          ${e.volume?`${this._format(e.volume,"l",0)}`:m}
        </div>
      `)}_pumpRunning(e){let t=this._state(e.status_entity)?.state?.toLowerCase();if(!(!t||t==="unavailable"||t==="unknown"))return Xe.has(t)}_renderPumpGroup(e,t){let s=this._t,n=this._pumpRunning(t),r=e.circuits.filter(a=>a.pump_group===t.id).some(a=>this._circuitOpen(a)!==!1);return this._part({kind:"pump",id:t.id},r,h`
        <div class="part-name">${t.name}</div>
        <div class="figure">${wt(n??r)}</div>
        <div class="big">${t.flow_entity?this._temp(t.flow_entity):"\u2013"}</div>
        ${t.flow_setpoint_entity?h`<div class="target">
              ${s("target_short")} ${this._temp(t.flow_setpoint_entity)}
            </div>`:m}
        ${t.return_entity?h`<div class="pair">
              <span class="hot">${this._temp(t.flow_entity)}</span>
              <span class="cold">${this._temp(t.return_entity)}</span>
            </div>`:m}
        <div class="sub ${n?"status-open":""}">
          ${s(n===void 0?"pump_group":n?"running":"pump_stopped")}
        </div>
        ${this._renderWould(this._control?.advice?.pump_groups[t.id]?.action)}
      `)}_renderCircuit(e,t){let s=this._t,n=this._circuitOpen(e),r=this._number(e.spread_entity),a=n===void 0?"unknown":n?"open":"closed";return this._part({kind:"circuit",id:e.id},n!==!1,h`
        <div class="part-name">
          <span class="dot" style="background:${t}"></span>${e.name}
        </div>
        <div class="figure">${zt(a)}</div>
        <div class="big">
          ${r===void 0?"\u2013":`\u0394 ${this._format(r,"K")}`}
        </div>
        <div class="pair">
          <span class="hot">${this._temp(e.flow_entity)}</span>
          <span class="cold">${this._temp(e.return_entity)}</span>
        </div>
        <div class="sub status-${a}">${s(a)}</div>
        ${this._renderWould(this._control?.advice?.circuits[e.id]?.action)}
      `,`circuit-${a}`)}_renderWould(e){return!e||this._control?.switching?m:h`<div class="would">${this._t(`would_${e}`)}</div>`}_explain(e,t){let s=this._t,n="",r=[];if(t.kind==="mode"){let a=this._state(e.mode_entity)?.state,l=a==="off"||a==="active"?a:"observe";n=s(`mode_${l}`),r=[s(`x_mode_${l}`)]}else if(t.kind==="circuit"){let a=e.circuits.find(p=>p.id===t.id);if(!a)return;n=a.name,r.push(s("x_what_circuit",{name:a.name,system:s(`system_${a.system_type}`)}));let l=this._number(a.spread_entity);r.push(l===void 0?s("x_no_spread"):s("x_spread",{flow:this._temp(a.flow_entity),ret:this._temp(a.return_entity),spread:this._format(l,"K")}));let o=this._circuitOpen(a);a.valve_entity?o===void 0?r.push(s("x_valve_unknown")):a.valve_entity.startsWith("valve.")?r.push(s(o?"x_open_valve":"x_closed_valve")):r.push(s(`x_${o?"open":"closed"}_${a.valve_type==="no"?"no":"nc"}`)):r.push(s("x_no_valve"));let c=e.rooms.filter(p=>p.circuit===a.id).map(p=>p.name);c.length&&r.push(s("x_rooms_on",{rooms:c.join(", ")}));let d=this._control?.advice?.circuits[a.id];d&&(r.push(s(`x_adv_${d.reason}`,{rooms:d.rooms.join(", ")})),this._control?.switching?this._control.switched?.[a.id]==="close"&&r.push(s(d.action?"x_adv_by_hand":"x_adv_closed")):d.action&&r.push(s(`x_adv_would_${d.action}`)))}else if(t.kind==="room"){let a=e.rooms.find(p=>p.id===t.id);if(!a)return;n=a.name;let l=this._state(a.climate_entity),o=l?.attributes??{},c={name:a.name,current:this._format(o.current_temperature,"\xB0C"),target:this._format(o.temperature,"\xB0C")};!l||l.state==="unavailable"||l.state==="unknown"?r.push(s("x_room_unavailable",c)):l.state==="off"?r.push(s("x_room_off",c)):o.hvac_action==="heating"?r.push(s("x_room_heating",c)):r.push(s("x_room_idle",c)),this._windowOpen(a)&&r.push(s("x_room_window")),o.preset_mode&&o.preset_mode!=="none"&&r.push(s("x_room_preset",{preset:this._presetLabel(l,String(o.preset_mode))}));let d=e.circuits.find(p=>p.id===a.circuit);d&&r.push(s("x_room_circuit",{circuit:d.name}))}else if(t.kind==="pump"){let a=e.pump_groups?.find(d=>d.id===t.id);if(!a)return;n=a.name,r.push(s("x_pump",{name:a.name})),a.flow_entity&&r.push(s("x_pump_flow",{temp:this._temp(a.flow_entity)})),a.flow_setpoint_entity&&r.push(s("x_pump_flow_set",{temp:this._temp(a.flow_setpoint_entity)}));let l=e.circuits.filter(d=>d.pump_group===a.id);if(l.length){let d=l.filter(p=>this._circuitOpen(p)!==!1);r.push(d.length?s("x_pump_needed",{circuits:d.map(p=>p.name).join(", ")}):s("x_pump_idle"))}let o=this._pumpRunning(a);o!==void 0&&r.push(s(o?"x_pump_running":"x_pump_stopped")),r.push(s(a.control_entity?"x_pump_control":"x_pump_no_control")),a.control_off_option&&a.control_on_option&&r.push(s("x_pump_modes",{off:a.control_off_option,on:a.control_on_option}));let c=this._control?.advice?.pump_groups[a.id];c?.reason==="manual"?r.push(s("x_padv_manual")):this._control?.switching?this._control.switched?.[a.id]==="off"?r.push(s(c?.action==="off"?"x_padv_by_hand":"x_padv_off")):c?.action==="on"&&r.push(s("x_padv_hand_off")):c?.action&&r.push(s(`x_padv_would_${c.action}`))}else if(t.kind==="buffer"){let a=e.buffers.find(l=>l.id===t.id);if(!a)return;n=a.name,r.push(s("x_buffer",{name:a.name})),this._number(a.mean_entity)!==void 0&&r.push(s("x_buffer_mean",{mean:this._temp(a.mean_entity)}))}else{let a=e.heat_sources.find(c=>c.id===t.id);if(!a)return;n=a.name;let l=this._state(a.status_entity)?.state;r.push(s("x_source",{name:a.name,status:this._sourceActive(a)?s("running"):l??s("unknown")}));let o=a.temperature_entity??a.flow_entity;o&&r.push(s("x_source_temp",{temp:this._temp(o)}))}return{title:n,lines:r}}_presetLabel(e,t){return e&&this._hass?.formatEntityAttributeValue?this._hass.formatEntityAttributeValue(e,"preset_mode",t):t}_renderExplanation(e){let t=this._selection;if(!t||t.kind==="room")return m;let s=this._explain(e,t);return s?h`
      <div class="explain" role="status">
        <div class="explain-head">
          <strong>${s.title}</strong>
          <button
            class="close"
            aria-label=${this._t("close")}
            @click=${()=>this._selection=void 0}
          >
            ✕
          </button>
        </div>
        ${s.lines.map(n=>h`<p>${n}</p>`)}
      </div>
    `:m}_call(e,t,s){this._hass?.callService?.(e,t,s)}_setTarget(e,t,s,n){let r=Math.round(Math.min(n,Math.max(s,t))*10)/10;this._pendingTarget={entity:e,value:r},window.clearTimeout(this._targetTimer),this._targetTimer=window.setTimeout(()=>{this._call("climate","set_temperature",{entity_id:e,temperature:r}),this._targetTimer=window.setTimeout(()=>this._pendingTarget=void 0,2500)},700)}_renderRoomDialog(e,t){let s=this._selection;if(!s||s.kind!=="room")return m;let n=e.rooms.find(_=>_.id===s.id);if(!n?.climate_entity)return m;if(this._presetEdit?.room===n.id)return this._renderPresetDialog(n);let r=this._t,a=n.climate_entity,l=this._state(a),o=l?.attributes??{},c=n.preset_entities??{},d=!!l&&l.state!=="unavailable"&&l.state!=="unknown",p=l?.state==="off",f=Number(o.target_temp_step)||.5,g=typeof o.min_temp=="number"?o.min_temp:5,w=typeof o.max_temp=="number"?o.max_temp:30,x=(this._pendingTarget?.entity===a?this._pendingTarget.value:void 0)??(typeof o.temperature=="number"?o.temperature:void 0),R=Array.isArray(o.preset_modes)?o.preset_modes.filter(_=>_!=="none"):[],$=Array.isArray(o.hvac_modes)?o.hvac_modes:[],N=["heat","auto","heat_cool"].find(_=>$.includes(_)),H=e.circuits.find(_=>_.id===n.circuit),B=e.floors.find(_=>_.id===n.floor),D=()=>this._selection=void 0,pe=this._explain(e,s)?.lines??[],me=[H?`${r("circuit")} ${H.name}`:"",B?.name??""].filter(Boolean).join(" \xB7 ");return h`
      <dialog
        class="backdrop"
        aria-label=${n.name}
        @click=${D}
        @cancel=${D}
      >
        <div
          class="sheet"
          @click=${_=>_.stopPropagation()}
          @keydown=${_=>_.key==="Escape"&&D()}
        >
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${n.name}</div>
              <div class="sheet-sub">
                ${H?h`<span class="dot" style="background:${t.get(H.id)}"></span>`:m}${me}
              </div>
            </div>
            <button class="close" aria-label=${r("close")} @click=${D}>✕</button>
          </div>
          <div class="sheet-now ${o.hvac_action==="heating"?"heating":""}">
            <span class="now-value"
              >${this._format(typeof o.current_temperature=="number"?o.current_temperature:void 0,"")}°</span
            >
            <span class="now-label"
              >${o.hvac_action==="heating"?r("heating"):r(p?"mode_off":"idle")}</span
            >
          </div>
          <div class="stepper">
            <button
              aria-label="−"
              ?disabled=${!d||p||x===void 0||x<=g}
              @click=${()=>this._setTarget(a,(x??g)-f,g,w)}
            >
              −
            </button>
            <div class="stepper-value">
              <span>${p?"\u2013":`${this._format(x,"")}\xB0`}</span>
              <small>${r("target")}</small>
            </div>
            <button
              aria-label="+"
              ?disabled=${!d||p||x===void 0||x>=w}
              @click=${()=>this._setTarget(a,(x??g)+f,g,w)}
            >
              +
            </button>
          </div>
          ${R.length||Object.keys(c).length?h`<div class="choices">
                ${R.map(_=>{let v=this._number(c[_]);return h`<button
                    class="choice ${o.preset_mode===_?"on":""}"
                    ?disabled=${!d||p}
                    @click=${()=>this._call("climate","set_preset_mode",{entity_id:a,preset_mode:_})}
                  >
                    ${this._presetLabel(l,_)}${v===void 0?m:h` <small>${this._format(v,"")}°</small>`}
                  </button>`})}
                ${Object.keys(c).length?h`<button
                      class="choice gear"
                      title=${r("preset_temps")}
                      aria-label=${r("preset_temps")}
                      @click=${()=>this._presetEdit={room:n.id,values:{}}}
                    >
                      ${Qe}
                    </button>`:m}
              </div>`:m}
          ${$.includes("off")&&N?h`<button
                class="wide"
                ?disabled=${!d}
                @click=${()=>this._call("climate","set_hvac_mode",{entity_id:a,hvac_mode:p?N:"off"})}
              >
                ${r(p?"room_turn_on":"room_turn_off")}
              </button>`:m}
          <div class="why">
            <div class="why-title">${r("why")}</div>
            ${pe.map(_=>h`<p>${_}</p>`)}
          </div>
          ${this._renderPlan(n)}
          <button
            class="link"
            @click=${()=>{D(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:a},bubbles:!0,composed:!0}))}}
          >
            ${r("open_thermostat")}
          </button>
        </div>
      </dialog>
    `}_presetRows(e){let t=e.preset_entities??{},s=this._state(e.climate_entity)?.attributes.preset_modes,n=Array.isArray(s)?s:[];return Object.keys(t).sort((r,a)=>{let[l,o]=[n.indexOf(r),n.indexOf(a)];return(l<0?n.length:l)-(o<0?n.length:o)}).map(r=>({preset:r,entity:t[r]}))}async _savePresets(){let e=this._presetEdit;if(!e||e.saving)return;let t=Object.entries(e.values);if(!t.length){this._presetEdit=void 0;return}this._presetEdit={...e,saving:!0,failed:!1};try{await Promise.all(t.map(([s,n])=>this._hass?.callService?.("number","set_value",{entity_id:s,value:n}))),this._presetEdit=void 0}catch{this._presetEdit={...e,saving:!1,failed:!0}}}_renderPresetDialog(e){let t=this._presetEdit,s=this._t,n=this._state(e.climate_entity),r=()=>{t.saving||(this._presetEdit=void 0)},a=Object.keys(t.values).length>0;return h`
      <dialog
        class="backdrop"
        aria-label=${s("preset_temps")}
        @click=${r}
        @cancel=${l=>{l.preventDefault(),r()}}
      >
        <div class="sheet" @click=${l=>l.stopPropagation()}>
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${s("preset_temps")}</div>
              <div class="sheet-sub">${e.name}</div>
            </div>
            <button class="close" aria-label=${s("close")} @click=${r}>✕</button>
          </div>
          <div class="preset-rows">
            ${this._presetRows(e).map(({preset:l,entity:o})=>{let d=this._state(o)?.attributes??{},p=this._number(o),f=Number(d.step)>0?Number(d.step):.5,g=typeof d.min=="number"?d.min:5,w=typeof d.max=="number"?d.max:35,b=t.values[o]??p,x=this._presetLabel(n,l),R=N=>{let H=Math.round(Math.min(w,Math.max(g,N))*10)/10,B={...t.values,[o]:H};H===p&&delete B[o],this._presetEdit={...t,values:B,failed:!1}},$=b===void 0||t.saving;return h`<div class="preset-row ${o in t.values?"changed":""}">
                <span class="preset-name">${x}</span>
                <button
                  aria-label="${x} −"
                  ?disabled=${$||b<=g}
                  @click=${()=>R(b-f)}
                >
                  −
                </button>
                <span class="preset-value">${this._format(b,"")}°</span>
                <button
                  aria-label="${x} +"
                  ?disabled=${$||b>=w}
                  @click=${()=>R(b+f)}
                >
                  +
                </button>
              </div>`})}
          </div>
          <p class="hint">${s("preset_temps_hint")}</p>
          ${t.failed?h`<p class="hint warn">${s("preset_save_failed")}</p>`:m}
          <div class="sheet-actions">
            <button class="wide" ?disabled=${t.saving} @click=${r}>
              ${s("cancel")}
            </button>
            <button
              class="wide primary"
              ?disabled=${!a||t.saving}
              @click=${()=>this._savePresets()}
            >
              ✓ ${s("save")}
            </button>
          </div>
        </div>
      </dialog>
    `}_renderPlan(e){let t=this._control;if(!t)return m;let s=this._t,n=t.rooms[e.id];if(!n&&!t.schedules.length&&!t.rules.length&&!t.stoves?.length)return m;let r=n?Pe(n.action,s,this._hass,e.climate_entity):"";return h`
      <div class="why">
        <div class="why-title">${s("plan")}</div>
        ${n?h`<p>
                ${s(`plan_${n.source}`,{name:n.name,action:r})}
              </p>
              ${t.enabled||n.source==="window"&&n.applied?m:h`<p>${s("plan_would")}</p>`}`:h`<p>${s("plan_none")}</p>`}
      </div>
    `}_navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}_renderSetup(e){let t=this._t,s=[{key:"source",done:e.heat_sources.length>0,optional:!1},{key:"buffer",done:e.buffers.length>0,optional:!0},{key:"pump",done:(e.pump_groups?.length??0)>0,optional:!0},{key:"circuits",done:e.circuits.length>0,optional:!1},{key:"rooms",done:e.rooms.length>0,optional:!1}],n=s.filter(r=>!r.done&&!r.optional).length;return h`
      <section class="set setup">
        <h3>${t("setup_title")}</h3>
        <p class="hint first">${t(n?"setup_intro":"setup_done")}</p>
        <ol class="steps">
          ${s.map((r,a)=>h`
              <li class=${r.done?"done":""}>
                <span class="step-mark">${r.done?"\u2713":a+1}</span>
                <div>
                  <div class="row-name">
                    ${t(`setup_${r.key}`)}
                    ${r.optional&&!r.done?h`<span class="row-detail">${t("setup_optional")}</span>`:m}
                  </div>
                  <div class="row-detail">${t(`setup_${r.key}_hint`)}</div>
                </div>
              </li>
            `)}
        </ol>
        <button
          class="wide primary"
          @click=${()=>this._navigate("/config/integrations/integration/heizzentrale")}
        >
          ${t("edit_parts")}
        </button>
        <p class="hint">${t("edit_hint")}</p>
      </section>
    `}async _setMode(e,t){await this._call("select","select_option",{entity_id:e.mode_entity,option:t}),window.setTimeout(()=>{this._loadControl()},800)}_renderSettings(e,t){let s=this._t,n=this._state(e.mode_entity),r=Array.isArray(n?.attributes.options)?n.attributes.options:[],a=(c,d,p,f)=>h`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${f?h`<span class="dot" style="background:${f}"></span>`:m}${c}</span
          >
          <span class="row-detail">${d}</span>
        </div>
        ${p.map(g=>h`<div class="row-warn">${g}</div>`)}
      </li>
    `,l=(c,d)=>h`
      <section class="set">
        <h3>${c}</h3>
        ${d.length?h`<ul>${d}</ul>`:h`<p class="hint">${s("none_yet")}</p>`}
      </section>
    `,o=c=>c.filter(Boolean).join(" \xB7 ");return h`
      <div class="settings">
        ${this._renderSetup(e)}
        <section class="set">
          <h3>${s("set_mode")}</h3>
          <div class="choices">
            ${r.map(c=>h`<button
                  class="choice ${n?.state===c?"on":""}"
                  @click=${()=>{if(c==="active"&&n?.state!=="active"){this._confirmActive=!0;return}this._confirmActive=!1,this._setMode(e,c)}}
                >
                  ${s(`mode_${c}`)}
                </button>`)}
          </div>
          ${this._confirmActive?h`<div class="confirm">
                <p>${s("mode_confirm")}</p>
                <div class="choices">
                  <button
                    class="choice on"
                    @click=${()=>{this._confirmActive=!1,this._setMode(e,"active")}}
                  >
                    ${s("mode_confirm_yes")}
                  </button>
                  <button class="choice" @click=${()=>this._confirmActive=!1}>
                    ${s("cancel")}
                  </button>
                </div>
              </div>`:m}
          <p class="hint">
            ${s(`x_mode_${n?.state==="off"||n?.state==="active"?n.state:"observe"}`)}
          </p>
        </section>
        <section class="set">
          <h3>${s("set_language")}</h3>
          <div class="choices">
            ${["auto","de","en"].map(c=>h`<button
                  class="choice ${(e.language??"auto")===c?"on":""}"
                  @click=${()=>this._setLanguage(e,c)}
                >
                  ${s(`lang_${c}`)}
                </button>`)}
          </div>
          <p class="hint">${s("set_language_hint")}</p>
        </section>
        ${this._control?h`<heizzentrale-control
              .hass=${this._hass}
              .plant=${e}
              .control=${this._control}
              .t=${s}
              .language=${this._language}
              @control-changed=${c=>this._control=c.detail}
            ></heizzentrale-control>`:m}
        ${l(s("set_sources"),e.heat_sources.map(c=>a(c.name,s(`kind_${c.kind}`),c.temperature_entity||c.flow_entity?[]:[s("warn_no_sensor")])))}
        ${l(s("set_buffers"),e.buffers.map(c=>a(c.name,o([c.volume?this._format(c.volume,"l",0):"",s("n_sensors",{count:String(c.sensor_entities.length)})]),c.sensor_entities.length?[]:[s("warn_no_sensor")])))}
        ${l(s("set_pumps"),(e.pump_groups??[]).map(c=>a(c.name,o([s("n_circuits",{count:String(e.circuits.filter(d=>d.pump_group===c.id).length)}),c.control_entity?s("pump_switchable"):""]),[...c.flow_entity?[]:[s("warn_no_sensor")],...c.control_entity?[]:[s("warn_no_control")]])))}
        ${l(s("set_circuits"),e.circuits.map(c=>{let d=e.rooms.filter(p=>p.circuit===c.id).length;return a(c.name,o([s(`system_${c.system_type}`),c.valve_entity?s(c.valve_type==="no"?"valve_no":"valve_nc"):s("valve_none"),d===1?s("one_room"):s("n_rooms",{count:String(d)})]),[...c.flow_entity&&c.return_entity?[]:[s("warn_no_pipe_sensors")],...d?[]:[s("warn_no_rooms")]],t.get(c.id))}))}
        ${l(s("set_rooms"),e.rooms.map(c=>{let d=e.circuits.find(f=>f.id===c.circuit),p=e.floors.find(f=>f.id===c.floor);return a(c.name,o([d&&`${s("circuit")} ${d.name}`,p?.name,c.window_entities?.length===1&&s("has_window"),(c.window_entities?.length??0)>1&&s("n_windows",{count:String(c.window_entities.length)})]),[...d||!e.circuits.length?[]:[s("warn_no_circuit")],...p?[]:[s("warn_no_floor")]],d?t.get(d.id):void 0)}))}
      </div>
    `}};ie.properties={_plants:{state:!0},_error:{state:!0},_selection:{state:!0},_config:{state:!0},_pipes:{state:!0},_view:{state:!0},_pendingTarget:{state:!0},_presetEdit:{state:!0},_control:{state:!0},_edit:{state:!0},_confirmActive:{state:!0},_drag:{state:!0},_sensorPlace:{state:!0},_sensorFilter:{state:!0}},ie.styles=U`
    :host {
      --hz-hot: var(--heizzentrale-hot-color, #f2643d);
      --hz-cold: var(--heizzentrale-cold-color, #3b9dff);
      --hz-ok: var(--heizzentrale-ok-color, #22b07d);
      --hz-card: var(--ha-card-background, var(--card-background-color, #fff));
      --hz-soft: color-mix(in srgb, var(--primary-text-color) 5%, var(--hz-card));
      --hz-edge: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
      --hz-warn: var(--warning-color, #ffa600);
      --hz-tile: var(--secondary-background-color, #f3f3f3);
      --hz-muted: var(--secondary-text-color, #727272);
      display: block;
    }
    ha-card {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
    }
    h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .chip {
      font: inherit;
      font-size: 0.8rem;
      color: var(--primary-text-color);
      background: var(--hz-tile);
      border: 0;
      border-radius: 999px;
      padding: 4px 10px;
    }
    button.chip {
      cursor: pointer;
    }
    .chip.mode.active {
      background: color-mix(in srgb, var(--hz-ok, #2e9e5b) 24%, transparent);
    }
    .confirm {
      border: 1px solid var(--hz-warn);
      border-radius: 10px;
      padding: 10px 12px;
      margin-top: 8px;
    }
    .confirm p {
      margin: 0 0 8px;
    }
    .chip.mode.observe {
      background: color-mix(in srgb, var(--hz-warn) 22%, transparent);
    }
    .note {
      color: var(--hz-muted);
      padding: 8px 0;
    }
    .house {
      --hz-line: color-mix(in srgb, var(--primary-text-color) 55%, transparent);
      --hz-wall: 2px;
      position: relative;
      padding: 0 14px;
    }
    .pipes {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      overflow: visible;
    }
    .pipes path {
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .tube {
      stroke-width: 3;
      opacity: 0.22;
    }
    .tube.active {
      opacity: 0.4;
    }
    .flow {
      stroke-width: 3;
      stroke-dasharray: 1 11;
      animation: hz-flow 0.9s linear infinite;
    }
    @keyframes hz-flow {
      to {
        stroke-dashoffset: -12;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .flow {
        animation: none;
      }
    }
    .roof {
      margin: 0 -14px;
      height: clamp(56px, 14vw, 132px);
      color: var(--hz-line);
    }
    .roof svg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }
    .walls {
      border-left: var(--hz-wall) solid var(--hz-line);
      border-right: var(--hz-wall) solid var(--hz-line);
    }
    .walls:empty {
      display: none;
    }
    .storey {
      padding: 10px 12px calc(12px + var(--hz-lanes, 0) * 4px)
        calc(16px + var(--hz-lanes, 0) * 6px);
      border-top: var(--hz-wall) solid var(--hz-line);
    }
    .walls:not(.underground) > .storey:first-child {
      border-top: 0;
    }
    .ground {
      margin: 0 -14px;
      height: 3px;
      border-radius: 3px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--hz-ok) 6%,
        var(--hz-ok) 94%,
        transparent
      );
    }
    .underground {
      border-bottom: var(--hz-wall) solid var(--hz-line);
      border-radius: 0 0 14px 14px;
      background: repeating-linear-gradient(
        135deg,
        transparent 0 9px,
        color-mix(in srgb, var(--primary-text-color) 4%, transparent) 9px 10px
      );
    }
    .underground > .storey:first-child {
      border-top: 0;
    }
    .floor-name {
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--hz-muted);
      margin-bottom: 8px;
    }
    .rooms,
    .parts {
      display: grid;
      column-gap: 12px;
      row-gap: calc(10px + var(--hz-lanes, 0) * 4px);
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    }
    .room,
    .part {
      position: relative;
      z-index: 1;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
      cursor: pointer;
      outline: none;
      transition:
        box-shadow 0.15s ease,
        border-color 0.15s ease,
        transform 0.15s ease;
    }
    .room:active,
    .part:active {
      transform: scale(0.98);
    }
    .room:focus-visible,
    .part:focus-visible,
    .selected {
      box-shadow: 0 0 0 2px var(--primary-color);
    }
    .room {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-height: 78px;
    }
    .room.heating {
      border-color: color-mix(in srgb, var(--hz-hot) 55%, transparent);
      background: linear-gradient(
        160deg,
        color-mix(in srgb, var(--hz-hot) 20%, var(--hz-card)),
        color-mix(in srgb, var(--hz-hot) 6%, var(--hz-card))
      );
    }
    .room.off {
      opacity: 0.6;
    }
    .room-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      min-height: 20px;
    }
    .room-name {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      font-size: 0.85rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icons {
      display: flex;
      gap: 2px;
      flex: none;
    }
    .badge svg {
      width: 18px;
      height: 18px;
      display: block;
    }
    .flame {
      color: var(--hz-hot);
    }
    .window {
      color: var(--hz-cold);
    }
    .room-temp {
      font-size: 1.7rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      line-height: 1.15;
    }
    .unit {
      font-size: 1rem;
      color: var(--hz-muted);
    }
    .room-bottom > :first-child {
      white-space: nowrap;
    }
    .room-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: var(--hz-muted);
    }
    .preset {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      border-radius: 999px;
      padding: 1px 6px;
      font-size: 0.7rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .parts {
      margin-top: calc(10px + var(--hz-lanes, 0) * 4px);
      row-gap: 18px;
    }
    .plant-room {
      padding-bottom: 20px;
    }
    .part {
      padding: 12px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      text-align: center;
    }
    .part-name {
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 6px;
      max-width: 100%;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .figure {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .figure svg {
      height: 56px;
    }
    .tank-values {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 52px;
      font-size: 0.7rem;
      color: var(--hz-muted);
      text-align: left;
    }
    .big {
      font-size: 1.05rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .part .target {
      font-size: 0.75rem;
      color: var(--hz-muted);
    }
    .pair {
      display: flex;
      gap: 8px;
      font-size: 0.75rem;
    }
    .hot {
      color: var(--hz-hot);
    }
    .cold {
      color: var(--hz-cold);
    }
    .sub {
      font-size: 0.75rem;
      color: var(--hz-muted);
      min-height: 1em;
    }
    .status-open {
      color: var(--hz-ok);
    }
    .status-unknown {
      color: var(--hz-warn);
    }
    @media (max-width: 500px) {
      ha-card {
        padding: 12px;
      }
      .house {
        padding: 0 8px;
      }
      .roof,
      .ground {
        margin: 0 -8px;
      }
      .storey {
        padding-right: 8px;
        padding-left: calc(12px + var(--hz-lanes, 0) * 6px);
      }
      .rooms,
      .parts {
        grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
      }
      .room {
        padding: 8px;
      }
    }
    .chip.icon {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
    }
    .chip.icon svg {
      width: 16px;
      height: 16px;
    }
    .chip.icon.on {
      background: color-mix(in srgb, var(--primary-color) 22%, transparent);
    }
    .backdrop {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      max-width: none;
      max-height: none;
      margin: 0;
      border: 0;
      box-sizing: border-box;
      color: inherit;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: hz-fade 0.15s ease;
    }
    .backdrop:not([open]) {
      display: none;
    }
    .backdrop::backdrop {
      background: transparent;
    }
    .sheet {
      width: min(380px, 100%);
      max-height: 100%;
      overflow: auto;
      box-sizing: border-box;
      /* Solid on purpose: card backgrounds of some themes are see-through. */
      background: color-mix(
        in srgb,
        var(--primary-text-color) 7%,
        var(--primary-background-color, #fff)
      );
      color: var(--primary-text-color);
      border-radius: 22px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
      animation: hz-rise 0.2s ease;
    }
    @keyframes hz-fade {
      from {
        opacity: 0;
      }
    }
    @keyframes hz-rise {
      from {
        transform: translateY(14px);
        opacity: 0;
      }
    }
    @media (max-width: 500px) {
      .backdrop {
        align-items: flex-end;
        padding: 0;
      }
      .sheet {
        width: 100%;
        border-radius: 22px 22px 0 0;
        padding-bottom: calc(18px + env(safe-area-inset-bottom, 0px));
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .sheet {
        animation: none;
      }
    }
    .sheet-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .sheet-title {
      font-size: 1.2rem;
      font-weight: 600;
    }
    .sheet-sub {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      color: var(--hz-muted);
      min-height: 1.1em;
    }
    .sheet-now {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }
    .now-value {
      font-size: 3rem;
      font-weight: 600;
      letter-spacing: -0.03em;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .now-label {
      color: var(--hz-muted);
      font-size: 0.9rem;
    }
    .sheet-now.heating .now-label {
      color: var(--hz-hot);
    }
    .stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 18px;
      padding: 8px;
    }
    .stepper button {
      font: inherit;
      font-size: 1.6rem;
      line-height: 1;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      border: 0;
      cursor: pointer;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
    }
    .stepper-value {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .stepper-value span {
      font-size: 1.7rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .stepper-value small {
      color: var(--hz-muted);
    }
    button:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .would {
      margin-top: 4px;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--hz-warn) 24%, transparent);
    }
    .extras {
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid var(--hz-edge);
      font-size: 0.75rem;
      color: var(--hz-muted);
      width: 100%;
    }
    .extra,
    .extra-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .extra-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .extra span:last-child {
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .edit-note {
      margin: 0 0 10px;
      font-size: 0.85rem;
      color: var(--hz-muted);
    }
    .grip {
      touch-action: none;
      cursor: grab;
      font-size: 1.1rem;
      line-height: 1;
      padding: 4px 6px;
      margin: -4px -4px -4px 0;
      color: var(--hz-muted);
    }
    .room.editing {
      cursor: grab;
      user-select: none;
      border-style: dashed;
    }
    .room.dragging {
      cursor: grabbing;
      pointer-events: none;
      z-index: 5;
      opacity: 0.9;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
    }
    .room.drop-before {
      box-shadow: -4px 0 0 var(--primary-color);
    }
    .room.drop-after {
      box-shadow: 4px 0 0 var(--primary-color);
    }
    .storey.drop {
      background: color-mix(in srgb, var(--primary-color) 9%, transparent);
    }
    .drop-hint {
      font-size: 0.8rem;
      color: var(--hz-muted);
      border: 1px dashed var(--hz-edge);
      border-radius: 14px;
      padding: 18px 14px;
    }
    .edit-row {
      display: flex;
      gap: 4px;
      margin-top: 8px;
    }
    .edit-row button,
    .edit-add {
      font: inherit;
      font-size: 0.72rem;
      color: var(--primary-text-color);
      background: var(--hz-card);
      border: 1px solid var(--hz-edge);
      border-radius: 8px;
      padding: 5px 7px;
      cursor: pointer;
      white-space: nowrap;
    }
    .edit-row {
      flex-wrap: wrap;
    }
    .edit-row button {
      flex: 1;
    }
    .edit-row .grow {
      flex: 1 0 100%;
      order: 2;
    }
    .edit-add {
      margin-top: 8px;
    }
    .sheet .field {
      font: inherit;
      font-size: 0.9rem;
      color: var(--primary-text-color);
      background: var(--hz-card);
      border: 1px solid var(--hz-edge);
      border-radius: 10px;
      padding: 9px 10px;
      width: 100%;
      box-sizing: border-box;
    }
    .chip.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      cursor: pointer;
    }
    .stove-tile {
      cursor: default;
    }
    .stove {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid var(--hz-edge);
      font-size: 0.75rem;
      color: var(--hz-muted);
    }
    .stove svg {
      width: 13px;
      height: 13px;
      flex: none;
      opacity: 0.5;
    }
    .stove.burning {
      color: var(--hz-hot);
      font-weight: 600;
    }
    .stove.burning svg {
      opacity: 1;
    }
    .stove-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .choices {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .choice {
      font: inherit;
      font-size: 0.85rem;
      color: var(--primary-text-color);
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 999px;
      padding: 7px 14px;
      cursor: pointer;
    }
    .choice small {
      font-size: inherit;
      opacity: 0.65;
      font-variant-numeric: tabular-nums;
    }
    .choice.gear {
      display: inline-flex;
      align-items: center;
      padding: 7px 9px;
      color: var(--hz-muted);
    }
    .choice.gear svg {
      width: 16px;
      height: 16px;
    }
    .preset-rows {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .preset-row {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 16px;
      padding: 6px 6px 6px 14px;
    }
    .preset-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .preset-value {
      min-width: 3.6em;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .preset-row.changed .preset-value {
      color: var(--primary-color);
    }
    .preset-row button {
      font: inherit;
      font-size: 1.4rem;
      line-height: 1;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      border: 0;
      cursor: pointer;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
    }
    .sheet-actions {
      display: flex;
      gap: 8px;
    }
    .sheet > .hint {
      margin: 0;
    }
    .sheet > .hint.warn {
      color: var(--error-color, #db4437);
    }
    .choice.on {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .wide {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
      padding: 11px;
      cursor: pointer;
      width: 100%;
    }
    .wide.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
    .why {
      font-size: 0.88rem;
      line-height: 1.45;
    }
    .why p {
      margin: 4px 0 0;
    }
    .why-title {
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--hz-muted);
    }
    .link {
      font: inherit;
      font-size: 0.85rem;
      background: none;
      border: 0;
      padding: 0;
      color: var(--primary-color);
      cursor: pointer;
      align-self: flex-start;
    }
    .settings {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .set h3 {
      margin: 0 0 8px;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--hz-muted);
    }
    .set ul {
      list-style: none;
      margin: 0;
      padding: 0;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
    }
    .set li {
      padding: 10px 12px;
    }
    .set li + li {
      border-top: 1px solid var(--hz-edge);
    }
    .row-main {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
    }
    .row-name {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
    }
    .row-detail {
      font-size: 0.8rem;
      color: var(--hz-muted);
    }
    .row-warn {
      margin-top: 4px;
      font-size: 0.8rem;
      color: color-mix(in srgb, var(--hz-warn) 75%, var(--primary-text-color));
    }
    .steps {
      list-style: none;
      margin: 10px 0 12px;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .steps li {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }
    .steps .row-name {
      gap: 8px;
      flex-wrap: wrap;
    }
    .step-mark {
      flex: none;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 600;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
    }
    .done .step-mark {
      background: var(--hz-ok);
      border-color: var(--hz-ok);
      color: #fff;
    }
    .hint.first {
      margin-top: 0;
    }
    .hint {
      margin: 8px 0 0;
      font-size: 0.82rem;
      line-height: 1.4;
      color: var(--hz-muted);
    }
    .explain {
      background: var(--hz-tile);
      border-radius: 14px;
      padding: 12px 14px;
      font-size: 0.9rem;
      line-height: 1.45;
    }
    .explain p {
      margin: 6px 0 0;
    }
    .explain-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .close {
      font: inherit;
      background: none;
      border: 0;
      color: var(--hz-muted);
      cursor: pointer;
      padding: 4px 8px;
    }
  `;var Re=A`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.5 5-2.5 7C8.4 11 9 12.5 9 12.5S7 12 6.6 9.8C4.9 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"/></svg>`,Qe=A`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.1a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.700 1.700 0 0 0 1.800.3h.1a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.1a1.700 1.700 0 0 0-.3 1.800v.1a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/></svg>`,gt=A`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.500 6.500l4 4"/></svg>`,ft=A`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.500"/><path d="M5.500 10v10h13V10"/></svg>`,vt=A`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`,bt=A`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;function wt(u){let i=u?"var(--hz-ok)":"currentColor",e=u?"1":"0.4";return A`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M4 28 H14 M42 28 H52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
    <circle cx="28" cy="28" r="14" fill="none" stroke=${i} stroke-width="2.5" opacity=${e}/>
    <path d="M22 19.500 L38 28 L22 36.500 Z" fill=${u?i:"none"} stroke=${i} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
  </svg>`}function $t(u){return A`<svg viewBox="0 0 44 56" aria-hidden="true">
    <rect x="4" y="3" width="36" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
    <rect x="11" y="9" width="22" height="7" rx="2" fill="currentColor" opacity="0.25"/>
    <path transform="translate(10 22)" d="M12 2c1 3.5-1.500 5-2.500 7C8.400 11 9 12.500 9 12.500S7 12 6.600 9.800C4.900 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"
      fill=${u?"var(--hz-hot)":"currentColor"} opacity=${u?"1":"0.25"}/>
  </svg>`}function yt(u){return u===void 0?"var(--divider-color, #ccc)":`color-mix(in srgb, var(--hz-hot) ${(Math.max(0,Math.min(1,(u-25)/50))*100).toFixed(0)}%, var(--hz-cold))`}function xt(u){let i=u.length?u:[void 0],e=44/i.length;return A`<svg viewBox="0 0 32 56" aria-hidden="true">
    <defs><clipPath id="hz-tank"><rect x="4" y="6" width="24" height="44" rx="9"/></clipPath></defs>
    <g clip-path="url(#hz-tank)">
      ${i.map((t,s)=>A`<rect x="4" y=${6+s*e} width="24" height=${e+.5} fill=${yt(t)}/>`)}
    </g>
    <rect x="4" y="6" width="24" height="44" rx="9" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  </svg>`}function zt(u){let i=u==="open"?"var(--hz-ok)":u==="unknown"?"var(--hz-warn)":"currentColor",e=u==="closed"?"0.35":"1";return A`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M6 22 L28 34 L6 46 Z M50 22 L28 34 L50 46 Z" fill=${u==="open"?i:"none"}
      stroke=${i} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
    <path d="M28 34 V16 M19 16 H37" stroke=${i} stroke-width="2.5" stroke-linecap="round" opacity=${e}/>
    ${u==="closed"?A`<path d="M14 48 L42 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`:m}
  </svg>`}var re=class extends C{constructor(){super(...arguments);this.narrow=!1}set hass(e){this._hass=e;let t=this.renderRoot?.querySelector("heizzentrale-house-card");t&&(t.hass=e);let s=this.renderRoot?.querySelector("ha-menu-button");s&&(s.hass=e)}firstUpdated(){this.renderRoot.querySelector("heizzentrale-house-card").setConfig({}),this._hass&&(this.hass=this._hass)}render(){return h`
      <div class="bar">
        <ha-menu-button .narrow=${this.narrow}></ha-menu-button>
      </div>
      <main><heizzentrale-house-card></heizzentrale-house-card></main>
    `}};re.properties={narrow:{type:Boolean,reflect:!0}},re.styles=U`
    :host {
      display: block;
      min-height: 100vh;
      box-sizing: border-box;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .bar {
      height: 0;
      position: relative;
      z-index: 2;
    }
    ha-menu-button {
      position: absolute;
      top: 4px;
      left: 4px;
    }
    main {
      max-width: 1100px;
      margin: 0 auto;
      padding: 16px;
    }
    :host([narrow]) main {
      padding: 52px 8px 8px;
    }
  `;var oe=class extends C{constructor(){super(...arguments);this._config={}}setConfig(e){this._config={...e}}set hass(e){this._hass=e,this._plants||(this._plants=[],e.callWS({type:"heizzentrale/plants"}).then(t=>this._plants=t.plants).catch(()=>{}))}_change(e,t){let s={...this._config};t?s[e]=t:delete s[e],this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}render(){let e=Te(this._hass?.locale?.language??this._hass?.language);return h`
      <label>
        ${e("editor_plant")}
        <select
          @change=${t=>this._change("entry_id",t.target.value)}
        >
          <option value="" ?selected=${!this._config.entry_id}>
            ${e("editor_first")}
          </option>
          ${(this._plants??[]).map(t=>h`<option
                value=${t.entry_id}
                ?selected=${t.entry_id===this._config.entry_id}
              >
                ${t.name}
              </option>`)}
        </select>
      </label>
      <label>
        ${e("editor_title")}
        <input
          type="text"
          .value=${this._config.title??""}
          @input=${t=>this._change("title",t.target.value)}
        />
      </label>
    `}};oe.properties={_config:{state:!0},_plants:{state:!0}},oe.styles=U`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    select,
    input {
      font: inherit;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
  `;customElements.get("heizzentrale-house-card")||(customElements.define("heizzentrale-house-card",ie),customElements.define("heizzentrale-house-card-editor",oe),customElements.define("heizzentrale-panel",re),(window.customCards??=[]).push({type:"heizzentrale-house-card",name:"Heizzentrale",description:"House view: rooms per floor, heat source, buffer and circuits.",preview:!1}));
