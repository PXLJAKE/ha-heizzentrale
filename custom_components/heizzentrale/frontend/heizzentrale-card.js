var ee=globalThis,te=ee.ShadowRoot&&(ee.ShadyCSS===void 0||ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol(),$e=new WeakMap,K=class{constructor(s,e,t){if(this._$cssResult$=!0,t!==ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=e}get styleSheet(){let s=this.o,e=this.t;if(te&&s===void 0){let t=e!==void 0&&e.length===1;t&&(s=$e.get(e)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),t&&$e.set(e,s))}return s}toString(){return this.cssText}},xe=l=>new K(typeof l=="string"?l:l+"",void 0,ae),H=(l,...s)=>{let e=l.length===1?l[0]:s.reduce((t,n,i)=>t+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+l[i+1],l[0]);return new K(e,l,ae)},ke=(l,s)=>{if(te)l.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of s){let t=document.createElement("style"),n=ee.litNonce;n!==void 0&&t.setAttribute("nonce",n),t.textContent=e.cssText,l.appendChild(t)}},le=te?l=>l:l=>l instanceof CSSStyleSheet?(s=>{let e="";for(let t of s.cssRules)e+=t.cssText;return xe(e)})(l):l;var{is:Fe,defineProperty:Ie,getOwnPropertyDescriptor:Ve,getOwnPropertyNames:Ze,getOwnPropertySymbols:qe,getPrototypeOf:Ge}=Object,ne=globalThis,ze=ne.trustedTypes,Je=ze?ze.emptyScript:"",Ye=ne.reactiveElementPolyfillSupport,F=(l,s)=>l,ce={toAttribute(l,s){switch(s){case Boolean:l=l?Je:null;break;case Object:case Array:l=l==null?l:JSON.stringify(l)}return l},fromAttribute(l,s){let e=l;switch(s){case Boolean:e=l!==null;break;case Number:e=l===null?null:Number(l);break;case Object:case Array:try{e=JSON.parse(l)}catch{e=null}}return e}},Ae=(l,s)=>!Fe(l,s),Se={attribute:!0,type:String,converter:ce,reflect:!1,useDefault:!1,hasChanged:Ae};Symbol.metadata??=Symbol("metadata"),ne.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,e=Se){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(s,e),!e.noAccessor){let t=Symbol(),n=this.getPropertyDescriptor(s,t,e);n!==void 0&&Ie(this.prototype,s,n)}}static getPropertyDescriptor(s,e,t){let{get:n,set:i}=Ve(this.prototype,s)??{get(){return this[e]},set(r){this[e]=r}};return{get:n,set(r){let a=n?.call(this);i?.call(this,r),this.requestUpdate(s,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??Se}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;let s=Ge(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){let e=this.properties,t=[...Ze(e),...qe(e)];for(let n of t)this.createProperty(n,e[n])}let s=this[Symbol.metadata];if(s!==null){let e=litPropertyMetadata.get(s);if(e!==void 0)for(let[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let e=[];if(Array.isArray(s)){let t=new Set(s.flat(1/0).reverse());for(let n of t)e.unshift(le(n))}else s!==void 0&&e.push(le(s));return e}static _$Eu(s,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(s.set(t,this[t]),delete this[t]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ke(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,e,t){this._$AK(s,t)}_$ET(s,e){let t=this.constructor.elementProperties.get(s),n=this.constructor._$Eu(s,t);if(n!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:ce).toAttribute(e,t.type);this._$Em=s,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(s,e){let t=this.constructor,n=t._$Eh.get(s);if(n!==void 0&&this._$Em!==n){let i=t.getPropertyOptions(n),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:ce;this._$Em=n;let a=r.fromAttribute(e,i.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(s,e,t,n=!1,i){if(s!==void 0){let r=this.constructor;if(n===!1&&(i=this[s]),t??=r.getPropertyOptions(s),!((t.hasChanged??Ae)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(s)&&!this.hasAttribute(r._$Eu(s,t))))return;this.C(s,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,e,{useDefault:t,reflect:n,wrapped:i},r){t&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,r??e??this[s]),i!==!0||r!==void 0)||(this._$AL.has(s)||(this.hasUpdated||t||(e=void 0),this._$AL.set(s,e)),n===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,i]of t){let{wrapped:r}=i,a=this[n];r!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,i,a)}}let s=!1,e=this._$AL;try{s=this.shouldUpdate(e),s?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw s=!1,this._$EM(),t}s&&this._$AE(e)}willUpdate(s){}_$AE(s){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(s){}firstUpdated(s){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[F("elementProperties")]=new Map,A[F("finalized")]=new Map,Ye?.({ReactiveElement:A}),(ne.reactiveElementVersions??=[]).push("2.1.2");var fe=globalThis,Ee=l=>l,se=fe.trustedTypes,Ce=se?se.createPolicy("lit-html",{createHTML:l=>l}):void 0,Oe="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Ne="?"+P,Qe=`<${Ne}>`,N=document,V=()=>N.createComment(""),Z=l=>l===null||typeof l!="object"&&typeof l!="function",ge=Array.isArray,Xe=l=>ge(l)||typeof l?.[Symbol.iterator]=="function",de=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Te=/-->/g,Pe=/>/g,M=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Re=/'/g,He=/"/g,Le=/^(?:script|style|textarea|title)$/i,ve=l=>(s,...e)=>({_$litType$:l,strings:s,values:e}),p=ve(1),$=ve(2),yt=ve(3),L=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Me=new WeakMap,O=N.createTreeWalker(N,129);function We(l,s){if(!ge(l)||!l.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ce!==void 0?Ce.createHTML(s):s}var et=(l,s)=>{let e=l.length-1,t=[],n,i=s===2?"<svg>":s===3?"<math>":"",r=I;for(let a=0;a<e;a++){let o=l[a],h,c,d=-1,m=0;for(;m<o.length&&(r.lastIndex=m,c=r.exec(o),c!==null);)m=r.lastIndex,r===I?c[1]==="!--"?r=Te:c[1]!==void 0?r=Pe:c[2]!==void 0?(Le.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=M):c[3]!==void 0&&(r=M):r===M?c[0]===">"?(r=n??I,d=-1):c[1]===void 0?d=-2:(d=r.lastIndex-c[2].length,h=c[1],r=c[3]===void 0?M:c[3]==='"'?He:Re):r===He||r===Re?r=M:r===Te||r===Pe?r=I:(r=M,n=void 0);let _=r===M&&l[a+1].startsWith("/>")?" ":"";i+=r===I?o+Qe:d>=0?(t.push(h),o.slice(0,d)+Oe+o.slice(d)+P+_):o+P+(d===-2?a:_)}return[We(l,i+(l[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),t]},q=class l{constructor({strings:s,_$litType$:e},t){let n;this.parts=[];let i=0,r=0,a=s.length-1,o=this.parts,[h,c]=et(s,e);if(this.el=l.createElement(h,t),O.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=O.nextNode())!==null&&o.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let d of n.getAttributeNames())if(d.endsWith(Oe)){let m=c[r++],_=n.getAttribute(d).split(P),g=/([.?@])?(.*)/.exec(m);o.push({type:1,index:i,name:g[2],strings:_,ctor:g[1]==="."?pe:g[1]==="?"?ue:g[1]==="@"?me:U}),n.removeAttribute(d)}else d.startsWith(P)&&(o.push({type:6,index:i}),n.removeAttribute(d));if(Le.test(n.tagName)){let d=n.textContent.split(P),m=d.length-1;if(m>0){n.textContent=se?se.emptyScript:"";for(let _=0;_<m;_++)n.append(d[_],V()),O.nextNode(),o.push({type:2,index:++i});n.append(d[m],V())}}}else if(n.nodeType===8)if(n.data===Ne)o.push({type:2,index:i});else{let d=-1;for(;(d=n.data.indexOf(P,d+1))!==-1;)o.push({type:7,index:i}),d+=P.length-1}i++}}static createElement(s,e){let t=N.createElement("template");return t.innerHTML=s,t}};function B(l,s,e=l,t){if(s===L)return s;let n=t!==void 0?e._$Co?.[t]:e._$Cl,i=Z(s)?void 0:s._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(l),n._$AT(l,e,t)),t!==void 0?(e._$Co??=[])[t]=n:e._$Cl=n),n!==void 0&&(s=B(l,n._$AS(l,s.values),n,t)),s}var he=class{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:e},parts:t}=this._$AD,n=(s?.creationScope??N).importNode(e,!0);O.currentNode=n;let i=O.nextNode(),r=0,a=0,o=t[0];for(;o!==void 0;){if(r===o.index){let h;o.type===2?h=new G(i,i.nextSibling,this,s):o.type===1?h=new o.ctor(i,o.name,o.strings,this,s):o.type===6&&(h=new _e(i,this,s)),this._$AV.push(h),o=t[++a]}r!==o?.index&&(i=O.nextNode(),r++)}return O.currentNode=N,n}p(s){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,e),e+=t.strings.length-2):t._$AI(s[e])),e++}},G=class l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,e,t,n){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=t,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,e=this._$AM;return e!==void 0&&s?.nodeType===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=B(this,s,e),Z(s)?s===u||s==null||s===""?(this._$AH!==u&&this._$AR(),this._$AH=u):s!==this._$AH&&s!==L&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):Xe(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==u&&Z(this._$AH)?this._$AA.nextSibling.data=s:this.T(N.createTextNode(s)),this._$AH=s}$(s){let{values:e,_$litType$:t}=s,n=typeof t=="number"?this._$AC(s):(t.el===void 0&&(t.el=q.createElement(We(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===n)this._$AH.p(e);else{let i=new he(n,this),r=i.u(this.options);i.p(e),this.T(r),this._$AH=i}}_$AC(s){let e=Me.get(s.strings);return e===void 0&&Me.set(s.strings,e=new q(s)),e}k(s){ge(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,n=0;for(let i of s)n===e.length?e.push(t=new l(this.O(V()),this.O(V()),this,this.options)):t=e[n],t._$AI(i),n++;n<e.length&&(this._$AR(t&&t._$AB.nextSibling,n),e.length=n)}_$AR(s=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);s!==this._$AB;){let t=Ee(s).nextSibling;Ee(s).remove(),s=t}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,t,n,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=s,this.name=e,this._$AM=n,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=u}_$AI(s,e=this,t,n){let i=this.strings,r=!1;if(i===void 0)s=B(this,s,e,0),r=!Z(s)||s!==this._$AH&&s!==L,r&&(this._$AH=s);else{let a=s,o,h;for(s=i[0],o=0;o<i.length-1;o++)h=B(this,a[t+o],e,o),h===L&&(h=this._$AH[o]),r||=!Z(h)||h!==this._$AH[o],h===u?s=u:s!==u&&(s+=(h??"")+i[o+1]),this._$AH[o]=h}r&&!n&&this.j(s)}j(s){s===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},pe=class extends U{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===u?void 0:s}},ue=class extends U{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==u)}},me=class extends U{constructor(s,e,t,n,i){super(s,e,t,n,i),this.type=5}_$AI(s,e=this){if((s=B(this,s,e,0)??u)===L)return;let t=this._$AH,n=s===u&&t!==u||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,i=s!==u&&(t===u||n);n&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},_e=class{constructor(s,e,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){B(this,s)}};var tt=fe.litHtmlPolyfillSupport;tt?.(q,G),(fe.litHtmlVersions??=[]).push("3.3.3");var De=(l,s,e)=>{let t=e?.renderBefore??s,n=t._$litPart$;if(n===void 0){let i=e?.renderBefore??null;t._$litPart$=n=new G(s.insertBefore(V(),i),i,void 0,e??{})}return n._$AI(l),n};var be=globalThis,S=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=De(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};S._$litElement$=!0,S.finalized=!0,be.litElementHydrateSupport?.({LitElement:S});var nt=be.litElementPolyfillSupport;nt?.({LitElement:S});(be.litElementVersions??=[]).push("4.2.2");var Be={loading:"Loading plant\u2026",no_plant:"No plant found. Add the Heizzentrale integration under Settings \u2192 Devices & services.",empty:"This plant has no parts yet. Open the integration and add a heat source, circuits and rooms.",mode_observe:"Observing",mode_off:"Off",outdoor:"Outdoor",other_rooms:"Other rooms",plant_room:"Plant room",flow:"Flow",return:"Return",spread:"Spread",target:"Target",heating:"heating",idle:"idle",window_open:"Window open",open:"open",closed:"closed",unknown:"unknown",running:"running",close:"Close",system_two_pipe:"two-pipe",system_one_pipe:"one-pipe",system_underfloor:"underfloor heating",system_other:"circuit",kind_pellet:"Pellet boiler",kind_wood:"Wood boiler",kind_gas:"Gas boiler",kind_oil:"Oil boiler",kind_heat_pump:"Heat pump",kind_district:"District heating",kind_other:"Heat source",x_what_circuit:"{name} is a {system} circuit. Hot water flows to the radiators (flow) and comes back cooler (return).",x_spread:"Flow {flow}, return {ret}: the spread is {spread}. A larger spread means the water gives off more heat on its way.",x_no_spread:"Flow and return sensors are needed to show the spread.",x_open_nc:"The circuit is open because its actuator is powered. Without power this actuator closes (NC).",x_closed_nc:"The circuit is closed because its actuator has no power. Without power this actuator closes (NC).",x_open_no:"The circuit is open because its actuator has no power. Without power this actuator opens (NO).",x_closed_no:"The circuit is closed because its actuator is powered. Without power this actuator opens (NO).",x_open_valve:"The valve reports that it is open.",x_closed_valve:"The valve reports that it is closed.",x_valve_unknown:"The actuator does not report a state right now. Heizzentrale treats the circuit as possibly open.",x_no_valve:"This circuit has no actuator, so it is always open.",x_rooms_on:"Rooms on this circuit: {rooms}.",x_room_heating:"{name} is heating: it is {current} and should be {target}.",x_room_idle:"{name} is not heating: it is {current}, target {target}.",x_room_off:"{name} is switched off.",x_room_unavailable:"The thermostat of {name} is not reachable right now.",x_room_window:"A window is open, so heating is paused here.",x_room_preset:"Active preset: {preset}.",x_room_circuit:"Its radiators are supplied by the circuit {circuit}.",x_buffer:"{name} stores hot water so the heat source does not have to start for every small demand. Hot water collects at the top.",x_buffer_mean:"Mean temperature: {mean}.",x_source:"{name} produces the heat for the house. Status: {status}.",x_source_temp:"Temperature: {temp}.",x_mode_observe:"Observe mode: Heizzentrale measures and explains but does not switch anything.",x_mode_off:"Off: Heizzentrale only measures.",settings:"Settings",back:"Back to the house",circuit:"Circuit",why:"What is happening",room_turn_off:"Switch heating off in this room",room_turn_on:"Switch heating on in this room",open_thermostat:"Open thermostat details",set_mode:"Operating mode",set_mode_active:"A mode that switches on its own follows later and only after your OK.",set_sources:"Heat sources",set_buffers:"Buffer tanks",set_circuits:"Circuits",set_rooms:"Rooms",none_yet:"Nothing added yet.",n_rooms:"{count} rooms",one_room:"1 room",n_sensors:"{count} sensors",valve_nc:"actuator closes without power",valve_no:"actuator opens without power",valve_none:"no actuator",has_window:"window contact",warn_no_sensor:"No temperature sensor assigned.",warn_no_pipe_sensors:"Flow or return sensor missing, so no spread can be shown.",warn_no_rooms:"No room uses this circuit yet.",warn_no_circuit:"No circuit assigned, so no pipe is drawn to this room.",warn_no_floor:"No floor found. Assign the thermostat to an area with a floor in Home Assistant.",edit_parts:"Add or change parts",edit_hint:"Opens the Heizzentrale page of Home Assistant. Heat sources, buffers, circuits and rooms are added and changed there.",pump_group:"Pump group",pump_stopped:"stopped",set_pumps:"Pump groups",n_circuits:"{count} circuits",pump_switchable:"can be switched",warn_no_control:"No entity to switch it chosen. Heizzentrale will not be able to turn it off when all circuits are closed.",x_pump:"{name} pushes the heating water into the circuits behind it. A mixer, if there is one, sets how hot that water is.",x_pump_flow:"Flow temperature behind the mixer: {temp}.",x_pump_needed:"It is needed right now because these circuits are open: {circuits}.",x_pump_idle:"All circuits behind it are closed, so it has nothing to do. Once switching is enabled, Heizzentrale turns it off in this situation.",x_pump_running:"The pump reports that it is running.",x_pump_stopped:"The pump reports that it is stopped.",x_pump_control:"An entity to switch it is chosen. Heizzentrale only observes for now and does not use it yet.",x_pump_modes:"Off is the mode \u201C{off}\u201D, on is the mode \u201C{on}\u201D.",x_pump_no_control:"No entity to switch it is chosen yet.",setup_title:"Setup",setup_intro:"Add the parts of your heating in this order. Only the name is required each time; sensors can be filled in later.",setup_done:"The basics are set up. You can add or change parts at any time.",setup_optional:"only if you have one",setup_source:"Heat source",setup_source_hint:"Your boiler or heat pump.",setup_buffer:"Buffer tank",setup_buffer_hint:"The tank that stores hot water, with its temperature sensors.",setup_pump:"Pump group",setup_pump_hint:"The pump, with or without mixer, that feeds the circuits.",setup_circuits:"Circuits",setup_circuits_hint:"Every branch that can be opened and closed on its own, for example one per floor.",setup_rooms:"Rooms",setup_rooms_hint:"One per thermostat. Name and floor come from Home Assistant on their own.",n_windows:"{count} window contacts",set_language:"Language",lang_auto:"Like Home Assistant",lang_de:"Deutsch",lang_en:"English",set_language_hint:"Applies to this view for everyone. The setup dialogs of Home Assistant always follow the language in your user profile.",editor_plant:"Plant",editor_title:"Title (optional)",editor_first:"First plant",day_0:"Mon",day_1:"Tue",day_2:"Wed",day_3:"Thu",day_4:"Fri",day_5:"Sat",day_6:"Sun",days_all:"Daily",decimal:".",act_on:"On",act_off:"Off",act_temperature:"Temperature \u2026",action:"Action",time:"Time",name:"Name",floors:"Whole floors",rooms_single:"Single rooms",assigned_none:"nothing yet",unnamed:"Unnamed",edit:"Edit",remove:"Remove",save:"Save",cancel:"Cancel",delete:"Delete",and:"and",minutes:"minutes",save_failed:"Could not save. Only administrators can change this.",set_schedules:"Schedules",schedules_intro:"A schedule sets thermostats at fixed times, for example Comfort in the morning and Eco at night. Assign it to single rooms or to whole floors.",add_schedule:"New schedule",schedule_placeholder:'For example "Workdays"',points:"Switch points",points_hint:"Each switch point applies from its time until the next one. If you change a thermostat by hand, that stays until the next switch point.",add_point:"Add switch point",no_points:"No switch points yet, so this schedule does nothing.",applies_to:"Applies to:",assign_hint:"A schedule for a single room wins over the schedule of its floor.",set_absence:"Absence",absence_intro:"Turn rooms down automatically while nobody is home, without building an automation. When someone is back, the schedule applies again.",add_rule:"New absence rule",rule_placeholder:'For example "Jake away"',rule_who:"Who has to be away?",rule_who_hint:"People, phones or presence sensors. With several entries all of them have to be away. If a device cannot be reached, it counts as present, so the house stays warm when in doubt.",rule_add_entity:"Add person or device",rule_delay:"Away for at least",rule_then:"Then set the rooms to",rule_sentence:"As soon as {who} is away: {targets} to {action}.",rule_sentence_delay:"When {who} has been away for more than {minutes} minutes: {targets} to {action}.",rule_back:"On return the schedule applies again; without a schedule the thermostat goes back to how it was.",rule_active:"applies now",no_entities:"No person or device chosen yet, so this rule does nothing.",set_apply:"Schedules and absence",apply_off:"Only show",apply_on:"Apply",apply_off_hint:'Heizzentrale only shows what it would set and does not touch any thermostat. Check in the room windows whether it fits, then switch to "Apply".',apply_on_hint:"Heizzentrale sets the thermostats at the switch points and when an absence rule starts or ends.",plan:"Plan",plan_schedule:'Schedule "{name}": {action}.',plan_absence:'Absence rule "{name}" applies: {action}.',plan_would:'Not applied yet, because schedules are set to "Only show".',plan_none:"No schedule assigned."},st={loading:"Anlage wird geladen \u2026",no_plant:"Keine Anlage gefunden. F\xFCge die Integration Heizzentrale unter Einstellungen \u2192 Ger\xE4te & Dienste hinzu.",empty:"Diese Anlage hat noch keine Teile. \xD6ffne die Integration und f\xFCge W\xE4rmeerzeuger, Kreise und R\xE4ume hinzu.",mode_observe:"Beobachtet",mode_off:"Aus",outdoor:"Au\xDFen",other_rooms:"Weitere R\xE4ume",plant_room:"Heizraum",flow:"Vorlauf",return:"R\xFCcklauf",spread:"Spreizung",target:"Soll",heating:"heizt",idle:"ruht",window_open:"Fenster offen",open:"offen",closed:"zu",unknown:"unbekannt",running:"l\xE4uft",close:"Schlie\xDFen",system_two_pipe:"Zweirohr",system_one_pipe:"Einrohr",system_underfloor:"Fu\xDFbodenheizung",system_other:"Kreis",kind_pellet:"Pelletkessel",kind_wood:"Holzkessel",kind_gas:"Gastherme",kind_oil:"\xD6lkessel",kind_heat_pump:"W\xE4rmepumpe",kind_district:"Fernw\xE4rme",kind_other:"W\xE4rmeerzeuger",x_what_circuit:"{name} ist ein Strang ({system}). Hei\xDFes Wasser flie\xDFt zu den Heizk\xF6rpern (Vorlauf) und kommt k\xFChler zur\xFCck (R\xFCcklauf).",x_spread:"Vorlauf {flow}, R\xFCcklauf {ret}: Die Spreizung betr\xE4gt {spread}. Eine gr\xF6\xDFere Spreizung hei\xDFt, das Wasser gibt unterwegs mehr W\xE4rme ab.",x_no_spread:"F\xFCr die Spreizung braucht es einen Vorlauf- und einen R\xFCcklauff\xFChler.",x_open_nc:"Der Strang ist offen, weil sein Stellantrieb Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_closed_nc:"Der Strang ist zu, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_open_no:"Der Strang ist offen, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_closed_no:"Der Strang ist zu, weil sein Stellantrieb Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_open_valve:"Das Ventil meldet, dass es offen ist.",x_closed_valve:"Das Ventil meldet, dass es zu ist.",x_valve_unknown:"Der Stellantrieb meldet gerade keinen Zustand. Heizzentrale behandelt den Strang als m\xF6glicherweise offen.",x_no_valve:"Dieser Strang hat keinen Stellantrieb und ist deshalb immer offen.",x_rooms_on:"R\xE4ume an diesem Strang: {rooms}.",x_room_heating:"{name} heizt gerade: Es hat {current} und soll {target} haben.",x_room_idle:"{name} heizt nicht: Es hat {current}, Soll {target}.",x_room_off:"{name} ist ausgeschaltet.",x_room_unavailable:"Das Thermostat von {name} ist gerade nicht erreichbar.",x_room_window:"Ein Fenster ist offen, deshalb pausiert die Heizung hier.",x_room_preset:"Aktives Preset: {preset}.",x_room_circuit:"Die Heizk\xF6rper h\xE4ngen am Strang {circuit}.",x_buffer:"{name} speichert hei\xDFes Wasser, damit der W\xE4rmeerzeuger nicht f\xFCr jeden kleinen Bedarf starten muss. Oben sammelt sich das hei\xDFe Wasser.",x_buffer_mean:"Mittlere Temperatur: {mean}.",x_source:"{name} erzeugt die W\xE4rme f\xFCr das Haus. Status: {status}.",x_source_temp:"Temperatur: {temp}.",x_mode_observe:"Beobachtungsmodus: Heizzentrale misst und erkl\xE4rt, schaltet aber nichts.",x_mode_off:"Aus: Heizzentrale misst nur.",settings:"Einstellungen",back:"Zur\xFCck zum Haus",circuit:"Strang",why:"Was gerade passiert",room_turn_off:"Heizung in diesem Raum ausschalten",room_turn_on:"Heizung in diesem Raum einschalten",open_thermostat:"Details zum Thermostat \xF6ffnen",set_mode:"Betriebsart",set_mode_active:"Eine Betriebsart, die selbst schaltet, kommt sp\xE4ter und erst nach deinem OK.",set_sources:"W\xE4rmeerzeuger",set_buffers:"Pufferspeicher",set_circuits:"Str\xE4nge",set_rooms:"R\xE4ume",none_yet:"Noch nichts angelegt.",n_rooms:"{count} R\xE4ume",one_room:"1 Raum",n_sensors:"{count} F\xFChler",valve_nc:"Stellantrieb stromlos zu",valve_no:"Stellantrieb stromlos offen",valve_none:"kein Stellantrieb",has_window:"Fensterkontakt",warn_no_sensor:"Kein Temperaturf\xFChler zugewiesen.",warn_no_pipe_sensors:"Vorlauf- oder R\xFCcklauff\xFChler fehlt, deshalb gibt es keine Spreizung.",warn_no_rooms:"Noch kein Raum h\xE4ngt an diesem Strang.",warn_no_circuit:"Kein Strang zugewiesen, deshalb f\xFChrt keine Leitung zu diesem Raum.",warn_no_floor:"Kein Stockwerk gefunden. Weise das Thermostat in Home Assistant einem Bereich mit Stockwerk zu.",edit_parts:"Teile hinzuf\xFCgen oder \xE4ndern",edit_hint:"\xD6ffnet die Heizzentrale-Seite von Home Assistant. Dort werden W\xE4rmeerzeuger, Puffer, Str\xE4nge und R\xE4ume angelegt und ge\xE4ndert.",pump_group:"Pumpengruppe",pump_stopped:"steht",set_pumps:"Pumpengruppen",n_circuits:"{count} Str\xE4nge",pump_switchable:"schaltbar",warn_no_control:"Keine Entit\xE4t zum Schalten gew\xE4hlt. Heizzentrale kann sie dann nicht ausschalten, wenn alle Str\xE4nge zu sind.",x_pump:"{name} dr\xFCckt das Heizwasser in die Str\xE4nge dahinter. Ein Mischer, falls vorhanden, bestimmt, wie hei\xDF dieses Wasser ist.",x_pump_flow:"Vorlauftemperatur hinter dem Mischer: {temp}.",x_pump_needed:"Sie wird gerade gebraucht, weil diese Str\xE4nge offen sind: {circuits}.",x_pump_idle:"Alle Str\xE4nge dahinter sind zu, sie hat also nichts zu tun. Sobald das Schalten freigegeben ist, schaltet Heizzentrale sie in dieser Lage aus.",x_pump_running:"Die Pumpe meldet, dass sie l\xE4uft.",x_pump_stopped:"Die Pumpe meldet, dass sie steht.",x_pump_control:"Eine Entit\xE4t zum Schalten ist gew\xE4hlt. Heizzentrale beobachtet vorerst nur und benutzt sie noch nicht.",x_pump_modes:"Aus ist der Modus \u201E{off}\u201C, An ist der Modus \u201E{on}\u201C.",x_pump_no_control:"Es ist noch keine Entit\xE4t zum Schalten gew\xE4hlt.",setup_title:"Einrichtung",setup_intro:"Lege die Teile deiner Heizung in dieser Reihenfolge an. Pflicht ist jeweils nur der Name, F\xFChler kannst du nachtragen.",setup_done:"Die Grundeinrichtung steht. Du kannst jederzeit Teile hinzuf\xFCgen oder \xE4ndern.",setup_optional:"nur falls vorhanden",setup_source:"W\xE4rmeerzeuger",setup_source_hint:"Dein Kessel oder deine W\xE4rmepumpe.",setup_buffer:"Pufferspeicher",setup_buffer_hint:"Der Speicher f\xFCr hei\xDFes Wasser mit seinen Temperaturf\xFChlern.",setup_pump:"Pumpengruppe",setup_pump_hint:"Die Pumpe, mit oder ohne Mischer, die die Str\xE4nge versorgt.",setup_circuits:"Str\xE4nge",setup_circuits_hint:"Jeder Teil, der sich einzeln \xF6ffnen und schlie\xDFen l\xE4sst, zum Beispiel einer pro Stockwerk.",setup_rooms:"R\xE4ume",setup_rooms_hint:"Einer pro Thermostat. Name und Stockwerk kommen von selbst aus Home Assistant.",n_windows:"{count} Fensterkontakte",set_language:"Sprache",lang_auto:"Wie Home Assistant",lang_de:"Deutsch",lang_en:"English",set_language_hint:"Gilt f\xFCr diese Ansicht bei allen. Die Einrichtungsdialoge von Home Assistant folgen immer der Sprache in deinem Benutzerprofil.",editor_plant:"Anlage",editor_title:"Titel (optional)",editor_first:"Erste Anlage",day_0:"Mo",day_1:"Di",day_2:"Mi",day_3:"Do",day_4:"Fr",day_5:"Sa",day_6:"So",days_all:"T\xE4glich",decimal:",",act_on:"An",act_off:"Aus",act_temperature:"Temperatur \u2026",action:"Aktion",time:"Uhrzeit",name:"Name",floors:"Ganze Stockwerke",rooms_single:"Einzelne R\xE4ume",assigned_none:"noch nichts",unnamed:"Ohne Namen",edit:"Bearbeiten",remove:"Entfernen",save:"Speichern",cancel:"Abbrechen",delete:"L\xF6schen",and:"und",minutes:"Minuten",save_failed:"Speichern nicht m\xF6glich. Das d\xFCrfen nur Administratoren \xE4ndern.",set_schedules:"Zeitpl\xE4ne",schedules_intro:"Ein Zeitplan stellt Thermostate zu festen Zeiten um, zum Beispiel morgens auf Komfort und nachts auf Eco. Du weist ihn einzelnen R\xE4umen oder ganzen Stockwerken zu.",add_schedule:"Neuer Zeitplan",schedule_placeholder:"Zum Beispiel \u201EWerktage\u201C",points:"Schaltpunkte",points_hint:"Jeder Schaltpunkt gilt ab seiner Uhrzeit bis zum n\xE4chsten. Stellst du ein Thermostat von Hand um, bleibt das bis zum n\xE4chsten Schaltpunkt so.",add_point:"Schaltpunkt hinzuf\xFCgen",no_points:"Noch keine Schaltpunkte, dieser Zeitplan macht also nichts.",applies_to:"Gilt f\xFCr:",assign_hint:"Ein Zeitplan f\xFCr einen einzelnen Raum hat Vorrang vor dem Zeitplan seines Stockwerks.",set_absence:"Abwesenheit",absence_intro:"R\xE4ume automatisch absenken, solange niemand da ist, ganz ohne eigene Automation. Ist wieder jemand da, gilt der Zeitplan weiter.",add_rule:"Neue Abwesenheitsregel",rule_placeholder:"Zum Beispiel \u201EJake unterwegs\u201C",rule_who:"Wer muss weg sein?",rule_who_hint:"Personen, Handys oder Anwesenheitssensoren. Bei mehreren Eintr\xE4gen m\xFCssen alle weg sein. Ist ein Ger\xE4t nicht erreichbar, z\xE4hlt es als anwesend, damit es im Zweifel warm bleibt.",rule_add_entity:"Person oder Ger\xE4t hinzuf\xFCgen",rule_delay:"Mindestens weg seit",rule_then:"Dann die R\xE4ume stellen auf",rule_sentence:"Sobald {who} weg ist: {targets} auf {action}.",rule_sentence_delay:"Wenn {who} l\xE4nger als {minutes} Minuten weg ist: {targets} auf {action}.",rule_back:"Bei R\xFCckkehr gilt wieder der Zeitplan; ohne Zeitplan geht das Thermostat auf den Stand von vorher zur\xFCck.",rule_active:"trifft gerade zu",no_entities:"Noch keine Person und kein Ger\xE4t gew\xE4hlt, diese Regel macht also nichts.",set_apply:"Zeitpl\xE4ne und Abwesenheit",apply_off:"Nur anzeigen",apply_on:"Anwenden",apply_off_hint:"Heizzentrale zeigt nur, was sie stellen w\xFCrde, und fasst kein Thermostat an. Schau in den Raumfenstern, ob es passt, und stelle dann auf \u201EAnwenden\u201C.",apply_on_hint:"Heizzentrale stellt die Thermostate an den Schaltpunkten um und wenn eine Abwesenheitsregel beginnt oder endet.",plan:"Plan",plan_schedule:"Zeitplan \u201E{name}\u201C: {action}.",plan_absence:"Abwesenheitsregel \u201E{name}\u201C trifft zu: {action}.",plan_would:"Noch nicht angewendet, weil Zeitpl\xE4ne auf \u201ENur anzeigen\u201C stehen.",plan_none:"Kein Zeitplan zugewiesen."};function ye(l){let s=(l??"en").toLowerCase().startsWith("de")?st:Be;return(e,t={})=>(s[e]??Be[e]??e).replace(/\{(\w+)\}/g,(n,i)=>t[i]??"")}var ie=["day_0","day_1","day_2","day_3","day_4","day_5","day_6"],it=new Set(["presence","connectivity","occupancy"]);function Ue(){return Math.random().toString(36).slice(2,10)}function we(l,s,e,t){if(l==="on")return s("act_on");if(l==="off")return s("act_off");if(l.startsWith("temperature:"))return`${l.slice(12).replace(".",s("decimal"))} \xB0C`;let n=l.slice(7),i=t?e?.states[t]:void 0;return i&&e?.formatEntityAttributeValue?e.formatEntityAttributeValue(i,"preset_mode",n):n.charAt(0).toUpperCase()+n.slice(1)}function rt(l,s){let e=[...new Set(l)].sort();if(e.length===7)return s("days_all");let t=[];for(let n of e){let i=t[t.length-1];i&&i[i.length-1]===n-1?i.push(n):t.push([n])}return t.map(n=>n.length>2?`${s(ie[n[0]])}\u2013${s(ie[n[n.length-1]])}`:n.map(i=>s(ie[i])).join(", ")).join(", ")}var J=class extends S{constructor(){super(...arguments);this.t=e=>e;this._busy=!1}async _save(e){if(!this.hass||!this.plant)return!1;this._busy=!0;try{let t=await this.hass.callWS({type:"heizzentrale/control/save",entry_id:this.plant.entry_id,...e});return this._error=void 0,this.dispatchEvent(new CustomEvent("control-changed",{detail:t})),!0}catch(t){return this._error=`${this.t("save_failed")} ${t?.message??""}`,!1}finally{this._busy=!1}}_presets(){let e=[];for(let t of this.plant?.rooms??[]){let n=t.climate_entity?this.hass?.states[t.climate_entity]?.attributes.preset_modes:void 0;for(let i of Array.isArray(n)?n:[])i!=="none"&&!e.includes(i)&&e.push(i)}return e}_climateWith(e){return this.plant?.rooms.find(t=>t.climate_entity&&this.hass?.states[t.climate_entity]?.attributes.preset_modes?.includes(e))?.climate_entity}_label(e){let t=e.startsWith("preset:")?this._climateWith(e.slice(7)):void 0;return we(e,this.t,this.hass,t)}_actionPicker(e,t){let n=this.t,i=e.startsWith("temperature:"),r=this._presets().map(a=>`preset:${a}`);return e.startsWith("preset:")&&!r.includes(e)&&r.push(e),p`
      <select
        aria-label=${n("action")}
        @change=${a=>{let o=a.target.value;t(o==="temperature"?"temperature:20":o)}}
      >
        ${r.map(a=>p`<option value=${a} ?selected=${e===a}>
              ${this._label(a)}
            </option>`)}
        <option value="on" ?selected=${e==="on"}>${n("act_on")}</option>
        <option value="off" ?selected=${e==="off"}>${n("act_off")}</option>
        <option value="temperature" ?selected=${i}>${n("act_temperature")}</option>
      </select>
      ${i?p`<input
            class="short"
            type="number"
            min="5"
            max="30"
            step="0.5"
            aria-label="°C"
            .value=${e.slice(12)}
            @change=${a=>{let o=Number(a.target.value);if(Number.isFinite(o)){let h=Math.round(Math.min(30,Math.max(5,o))*2)/2;t(`temperature:${h}`)}}}
          />`:u}
    `}_targetPicker(e,t){let n=this.t,i=(a,o)=>a.includes(o)?a.filter(h=>h!==o):[...a,o],r=this.plant;return r?p`
      ${r.floors.length?p`<div class="label">${n("floors")}</div>
            <div class="choices">
              ${r.floors.map(a=>p`<button
                    class="choice ${e.floors.includes(a.id)?"on":""}"
                    aria-pressed=${e.floors.includes(a.id)}
                    @click=${()=>t(e.rooms,i(e.floors,a.id))}
                  >
                    ${a.name}
                  </button>`)}
            </div>`:u}
      <div class="label">${n("rooms_single")}</div>
      <div class="choices">
        ${r.rooms.map(a=>{let o=!!a.floor&&e.floors.includes(a.floor),h=e.rooms.includes(a.id);return p`<button
            class="choice ${h?"on":o?"via":""}"
            aria-pressed=${h}
            @click=${()=>t(i(e.rooms,a.id),e.floors)}
          >
            ${a.name}
          </button>`})}
      </div>
    `:u}_targetNames(e){let t=this.plant,n=[...e.floors.map(i=>t?.floors.find(r=>r.id===i)?.name),...e.rooms.map(i=>t?.rooms.find(r=>r.id===i)?.name)].filter(Boolean);return n.length?n.join(", "):this.t("assigned_none")}_renderSchedule(e){let t=this.t,n=[...e.points].sort((i,r)=>Math.min(...i.days)-Math.min(...r.days)||i.time.localeCompare(r.time));return p`
      <li>
        <div class="row-main">
          <span class="row-name">${e.name||t("unnamed")}</span>
          <button class="link" @click=${()=>this._schedule=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        ${n.length?n.map(i=>p`<div class="row-detail">
                  ${rt(i.days,t)} ${i.time} · ${this._label(i.action)}
                </div>`):p`<div class="row-warn">${t("no_points")}</div>`}
        <div class="row-detail">${t("applies_to")} ${this._targetNames(e)}</div>
      </li>
    `}_renderScheduleEditor(e){let t=this.t,n=o=>this._schedule={...e,...o},i=(o,h)=>n({points:e.points.map((c,d)=>d===o?{...c,...h}:c)}),r=this.control?.schedules.some(o=>o.id===e.id),a=async()=>{let o={...e,name:e.name.trim(),points:e.points.filter(d=>d.days.length)},h=(this.control?.schedules??[]).filter(d=>d.id!==e.id),c=r?(this.control?.schedules??[]).map(d=>d.id===e.id?o:d):[...h,o];await this._save({schedules:c})&&(this._schedule=void 0)};return p`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${e.name}
            placeholder=${t("schedule_placeholder")}
            @input=${o=>n({name:o.target.value})}
          />
        </label>
        <div class="label">${t("points")}</div>
        <p class="hint first">${t("points_hint")}</p>
        ${e.points.map((o,h)=>p`
            <div class="point">
              <div class="days">
                ${ie.map((c,d)=>p`<button
                      class="day ${o.days.includes(d)?"on":""}"
                      aria-pressed=${o.days.includes(d)}
                      @click=${()=>i(h,{days:o.days.includes(d)?o.days.filter(m=>m!==d):[...o.days,d].sort()})}
                    >
                      ${t(c)}
                    </button>`)}
              </div>
              <div class="point-line">
                <input
                  type="time"
                  aria-label=${t("time")}
                  .value=${o.time}
                  @change=${c=>i(h,{time:c.target.value||o.time})}
                />
                ${this._actionPicker(o.action,c=>i(h,{action:c}))}
                <button
                  class="icon"
                  aria-label=${t("remove")}
                  @click=${()=>n({points:e.points.filter((c,d)=>d!==h)})}
                >
                  ✕
                </button>
              </div>
            </div>
          `)}
        <button
          class="link"
          @click=${()=>n({points:[...e.points,{days:e.points[e.points.length-1]?.days??[0,1,2,3,4,5,6],time:e.points.length?"22:00":"06:00",action:this._presets().length?`preset:${this._presets()[0]}`:e.points.length?"off":"on"}]})}
        >
          + ${t("add_point")}
        </button>
        <div class="label">${t("applies_to")}</div>
        <p class="hint first">${t("assign_hint")}</p>
        ${this._targetPicker(e,(o,h)=>n({rooms:o,floors:h}))}
        ${this._renderEditorButtons(a,()=>this._schedule=void 0,r?async()=>{let o=(this.control?.schedules??[]).filter(h=>h.id!==e.id);await this._save({schedules:o})&&(this._schedule=void 0)}:void 0)}
      </div>
    `}_renderEditorButtons(e,t,n){let i=this.t;return p`
      ${this._error?p`<div class="row-warn">${this._error}</div>`:u}
      <div class="buttons">
        <button class="wide primary" ?disabled=${this._busy} @click=${e}>${i("save")}</button>
        <button class="wide" @click=${t}>${i("cancel")}</button>
        ${n?p`<button class="wide danger" ?disabled=${this._busy} @click=${n}>
              ${i("delete")}
            </button>`:u}
      </div>
    `}_entityName(e){return this.hass?.states[e]?.attributes.friendly_name??e}_candidates(){return Object.entries(this.hass?.states??{}).filter(([e,t])=>{let n=e.split(".",1)[0];return n==="person"||n==="device_tracker"||n==="input_boolean"?!0:n==="binary_sensor"&&it.has(t.attributes.device_class)}).map(([e])=>e).sort((e,t)=>this._entityName(e).localeCompare(this._entityName(t)))}_ruleSentence(e){let t=this.t,n=e.entities.map(i=>this._entityName(i)).join(` ${t("and")} `);return t(e.delay_min>0?"rule_sentence_delay":"rule_sentence",{who:n||"?",minutes:String(e.delay_min),targets:this._targetNames(e),action:this._label(e.action)})}_renderRule(e){let t=this.t,n=this.control?.active_rules.includes(e.id);return p`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${e.name||t("unnamed")}${n?p`<span class="badge">${t("rule_active")}</span>`:u}</span
          >
          <button class="link" @click=${()=>this._rule=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        <div class="row-detail">${this._ruleSentence(e)}</div>
        ${e.entities.length?u:p`<div class="row-warn">${t("no_entities")}</div>`}
      </li>
    `}_renderRuleEditor(e){let t=this.t,n=o=>this._rule={...e,...o},i=this.control?.rules.some(o=>o.id===e.id),r=this._candidates().filter(o=>!e.entities.includes(o)),a=async()=>{let o={...e,name:e.name.trim()},h=this.control?.rules??[],c=i?h.map(d=>d.id===e.id?o:d):[...h,o];await this._save({rules:c})&&(this._rule=void 0)};return p`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${e.name}
            placeholder=${t("rule_placeholder")}
            @input=${o=>n({name:o.target.value})}
          />
        </label>
        <div class="label">${t("rule_who")}</div>
        <p class="hint first">${t("rule_who_hint")}</p>
        <div class="choices">
          ${e.entities.map(o=>p`<button
                class="choice on"
                title=${o}
                @click=${()=>n({entities:e.entities.filter(h=>h!==o)})}
              >
                ${this._entityName(o)} ✕
              </button>`)}
        </div>
        <select
          aria-label=${t("rule_add_entity")}
          @change=${o=>{let h=o.target;h.value&&n({entities:[...e.entities,h.value]}),h.value=""}}
        >
          <option value="">+ ${t("rule_add_entity")}</option>
          ${r.map(o=>p`<option value=${o}>
                ${this._entityName(o)} (${o.split(".",1)[0]})
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
            @change=${o=>{let h=Number(o.target.value);n({delay_min:Number.isFinite(h)?Math.min(1440,Math.max(0,h)):0})}}
          />
          <span class="row-detail">${t("minutes")}</span>
        </label>
        <div class="label">${t("rule_then")}</div>
        <div class="point-line">
          ${this._actionPicker(e.action,o=>n({action:o}))}
        </div>
        <div class="label">${t("applies_to")}</div>
        ${this._targetPicker(e,(o,h)=>n({rooms:o,floors:h}))}
        <p class="hint">${this._ruleSentence(e)} ${t("rule_back")}</p>
        ${this._renderEditorButtons(a,()=>this._rule=void 0,i?async()=>{let o=(this.control?.rules??[]).filter(h=>h.id!==e.id);await this._save({rules:o})&&(this._rule=void 0)}:void 0)}
      </div>
    `}render(){let e=this.t,t=this.control;if(!t||!this.plant)return u;let n=this._presets().includes("away")?"preset:away":"off";return p`
      <section class="set">
        <h3>${e("set_schedules")}</h3>
        <p class="hint first">${e("schedules_intro")}</p>
        ${t.schedules.length?p`<ul>
              ${t.schedules.map(i=>this._schedule?.id===i.id?p`<li>${this._renderScheduleEditor(this._schedule)}</li>`:this._renderSchedule(i))}
            </ul>`:u}
        ${this._schedule&&!t.schedules.some(i=>i.id===this._schedule.id)?p`<div class="new">${this._renderScheduleEditor(this._schedule)}</div>`:p`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._schedule={id:Ue(),name:"",points:[],rooms:[],floors:[]}}}
            >
              + ${e("add_schedule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${e("set_absence")}</h3>
        <p class="hint first">${e("absence_intro")}</p>
        ${t.rules.length?p`<ul>
              ${t.rules.map(i=>this._rule?.id===i.id?p`<li>${this._renderRuleEditor(this._rule)}</li>`:this._renderRule(i))}
            </ul>`:u}
        ${this._rule&&!t.rules.some(i=>i.id===this._rule.id)?p`<div class="new">${this._renderRuleEditor(this._rule)}</div>`:p`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._rule={id:Ue(),name:"",entities:[],delay_min:10,rooms:[],floors:[],action:n}}}
            >
              + ${e("add_rule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${e("set_apply")}</h3>
        <div class="choices">
          ${[!1,!0].map(i=>p`<button
                class="choice ${t.enabled===i?"on":""}"
                aria-pressed=${t.enabled===i}
                ?disabled=${this._busy}
                @click=${()=>this._save({enabled:i})}
              >
                ${e(i?"apply_on":"apply_off")}
              </button>`)}
        </div>
        <p class="hint">${e(t.enabled?"apply_on_hint":"apply_off_hint")}</p>
        ${this._error&&!this._schedule&&!this._rule?p`<div class="row-warn">${this._error}</div>`:u}
      </section>
    `}};J.properties={hass:{attribute:!1},plant:{attribute:!1},control:{attribute:!1},t:{attribute:!1},_schedule:{state:!0},_rule:{state:!0},_error:{state:!0},_busy:{state:!0}},J.styles=H`
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
  `;customElements.get("heizzentrale-control")||customElements.define("heizzentrale-control",J);var re=["#3b82f6","#14b8a6","#a855f7","#f59e0b","#ec4899","#84cc16","#6366f1","#f97316"];function j(l,s=7){let e=i=>Math.round(i*10)/10,t=`M${e(l[0][0])} ${e(l[0][1])}`;for(let i=1;i<l.length-1;i++){let[r,a]=l[i-1],[o,h]=l[i],[c,d]=l[i+1],m=Math.hypot(o-r,h-a),_=Math.hypot(c-o,d-h),g=Math.min(s,m/2,_/2);if(g<.5){t+=` L${e(o)} ${e(h)}`;continue}t+=` L${e(o-(o-r)/m*g)} ${e(h-(h-a)/m*g)}`,t+=` Q${e(o)} ${e(h)} ${e(o+(c-o)/_*g)} ${e(h+(d-h)/_*g)}`}let n=l[l.length-1];return`${t} L${e(n[0])} ${e(n[1])}`}var je=new Set(["on","heat","heating","running","true"]),Y=class extends S{constructor(){super(...arguments);this._config={};this._loading=!1;this._watched=new Set;this._view="house";this._pipes=[];this._pipeSignature=""}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("heizzentrale-house-card-editor")}setConfig(e){this._config={...e}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}set hass(e){let t=this._hass;if(this._hass=e,!this._plants&&!this._loading){this._load();return}if(!t){this.requestUpdate();return}for(let n of this._watched)if(t.states[n]!==e.states[n]){this.requestUpdate();return}t.language!==e.language&&this.requestUpdate()}get hass(){return this._hass}async _load(){if(this._hass){this._loading=!0;try{let e=await this._hass.callWS({type:"heizzentrale/plants"});this._plants=e.plants,this._error=void 0,this._loadControl()}catch(e){this._error=e?.message??String(e),this._plants=[]}finally{this._loading=!1}}}async _loadControl(){let e=this._plant();if(!(!e||!this._hass))try{this._control=await this._hass.callWS({type:"heizzentrale/control/get",entry_id:e.entry_id})}catch{this._control=void 0}}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect(),this._observed=void 0}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal();let t=this.renderRoot.querySelector(".house")??void 0;t!==this._observed&&(this._resize?.disconnect(),this._observed=t,t&&typeof ResizeObserver<"u"&&(this._resize??=new ResizeObserver(()=>this._measurePipes()),this._resize.observe(t))),this._measurePipes()}_lanes(e){return e.circuits.filter(t=>e.rooms.some(n=>n.circuit===t.id))}_measurePipes(){let e=this.renderRoot.querySelector(".house"),t=this._plant(),n=[];if(e&&t){let r=e.getBoundingClientRect(),a=y=>{let f=y.getBoundingClientRect();return{top:f.top-r.top,bottom:f.bottom-r.top,center:(f.left+f.right)/2-r.left,left:f.left-r.left}},o=y=>{let f=new Map;for(let b of y){let w=Math.round(b.bottom);f.set(w,[...f.get(w)??[],b])}return[...f.entries()].sort((b,w)=>b[0]-w[0]).map(b=>b[1])},h=[...e.querySelectorAll("[data-part]")].map(a),c=t.circuits.some(y=>this._circuitOpen(y)!==!1),d="var(--hz-hot)",m;for(let y of o(h)){let f=y[0].bottom+8,b=y[0],w=y[y.length-1];m!==void 0&&n.push({d:j([[b.center,m],[b.center,f]]),color:d,active:c}),y.length>1&&n.push({d:j([[b.center,b.bottom-6],[b.center,f],[w.center,f],[w.center,w.bottom-6]]),color:d,active:c});for(let x of y.slice(1,-1))n.push({d:j([[x.center,f],[x.center,x.bottom-6]]),color:d,active:c});m=f}let _=this._lanes(t),g=e.querySelector(".walls"),R=e.querySelector(".parts"),k=g?a(g).left+2:0,E=R?a(R).top:0;_.forEach((y,f)=>{let b=re[t.circuits.indexOf(y)%re.length],w=this._circuitOpen(y)!==!1,x=k+9+f*6,oe=[...e.querySelectorAll(`[data-circuit="${y.id}"]`)].map(z=>({...a(z),heating:z.classList.contains("heating")})),W;for(let z of o(oe)){let C=z[0].bottom+6+f*4;W=Math.min(W??C,C),z.sort((T,Ke)=>T.center-Ke.center);let D=z[z.length-1];n.push({d:j([[x,C],[D.center,C],[D.center,D.bottom-6]]),color:b,active:w&&z.some(T=>T.heating)});for(let T of z.slice(0,-1))n.push({d:j([[T.center,C],[T.center,T.bottom-6]]),color:b,active:w&&T.heating})}let v=e.querySelector(`[data-part="circuit:${y.id}"]`);if(v&&W!==void 0){let z=a(v),C=E-7-f*4,D=z.center+(f-(_.length-1)/2)*6;n.push({d:j([[D,z.top+6],[D,C],[x,C],[x,W]]),color:b,active:w})}})}let i=JSON.stringify(n);i!==this._pipeSignature&&(this._pipeSignature=i,this._pipes=n)}_renderPipes(){return p`<svg class="pipes" aria-hidden="true">
      ${this._pipes.map(e=>$`
          <path class="tube ${e.active?"active":""}" d=${e.d} style="stroke:${e.color}"/>
          ${e.active?$`<path class="flow" d=${e.d} style="stroke:${e.color}"/>`:u}`)}
    </svg>`}get _language(){let e=this._plant()?.language;return e==="de"||e==="en"?e:this._hass?.locale?.language??this._hass?.language??"en"}get _t(){return ye(this._language)}async _setLanguage(e,t){await this._hass?.callWS({type:"heizzentrale/set_language",entry_id:e.entry_id,language:t}),await this._load()}_state(e){if(e)return this._watched.add(e),this._hass?.states[e]}_number(e){let t=this._state(e);if(!t)return;let n=Number(t.state);return t.state!==""&&Number.isFinite(n)?n:void 0}_format(e,t,n=1){if(e===void 0)return"\u2013";let i=this._language,r=new Intl.NumberFormat(i,{minimumFractionDigits:n,maximumFractionDigits:n}).format(e);return t?`${r} ${t}`:r}_temp(e){let n=this._state(e)?.attributes.unit_of_measurement??"\xB0C";return this._format(this._number(e),n)}_plant(){if(this._plants?.length)return this._plants.find(e=>e.entry_id===this._config.entry_id)??this._plants[0]}_circuitOpen(e){if(!e.valve_entity)return!0;let t=this._state(e.open_entity)?.state;if(t==="on")return!0;if(t==="off")return!1}_windowOpen(e){return(e.window_entities??[]).map(t=>this._state(t)?.state==="on").includes(!0)}_select(e){let t=this._selection&&this._selection.kind===e.kind&&this._selection.id===e.id;this._selection=t?void 0:e,!t&&e.kind==="room"&&this._loadControl()}_key(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(t))}_isSelected(e,t){let n=this._selection;return!!n&&n.kind===e&&n.id===t}render(){this._watched.clear();let e=this._t;if(!this._plants)return p`<ha-card><div class="note">${e("loading")}</div></ha-card>`;let t=this._plant();if(!t)return p`<ha-card
        ><div class="note">${this._error??e("no_plant")}</div></ha-card
      >`;let n=!t.rooms.length&&!t.circuits.length&&!t.buffers.length&&!t.pump_groups?.length&&!t.heat_sources.length,i=new Map;return t.circuits.forEach((r,a)=>i.set(r.id,re[a%re.length])),p`
      <ha-card>
        ${this._renderHeader(t)}
        ${n&&this._view==="house"?p`<div class="settings">${this._renderSetup(t)}</div>`:u}
        ${this._view==="settings"?this._renderSettings(t,i):p`${n?u:this._renderHouse(t,i)}
            ${this._renderExplanation(t)} ${this._renderRoomDialog(t,i)}`}
      </ha-card>
    `}_renderHeader(e){let t=this._t,n=this._state(e.mode_entity)?.state,i=e.outdoor_entity?p`<span class="chip" title=${t("outdoor")}
          >${t("outdoor")} ${this._temp(e.outdoor_entity)}</span
        >`:u,r=n==="observe"||n==="off"?p`<button
            class="chip mode ${n}"
            @click=${()=>this._select({kind:"mode"})}
          >
            ${t(n==="observe"?"mode_observe":"mode_off")}
          </button>`:u;return p`
      <div class="header">
        <h2>${this._config.title||e.name}</h2>
        <div class="chips">
          ${i}${r}
          <button
            class="chip icon ${this._view==="settings"?"on":""}"
            aria-label=${t(this._view==="settings"?"back":"settings")}
            title=${t(this._view==="settings"?"back":"settings")}
            @click=${()=>{this._selection=void 0,this._view=this._view==="settings"?"house":"settings",this._loadControl()}}
          >
            ${this._view==="settings"?lt:at}
          </button>
        </div>
      </div>
    `}_renderHouse(e,t){let n=this._t,i=new Set(e.floors.map(d=>d.id)),r=(d,m)=>m.length?p`
            <section class="storey">
              ${d?p`<div class="floor-name">${d}</div>`:u}
              <div class="rooms">
                ${m.map(_=>this._renderRoom(e,_,t))}
              </div>
            </section>
          `:u,a=d=>e.rooms.filter(m=>m.floor===d),o=e.floors.filter(d=>(d.level??0)>=0),h=e.floors.filter(d=>(d.level??0)<0),c=e.rooms.filter(d=>!d.floor||!i.has(d.floor));return p`
      <div class="house" style="--hz-lanes:${this._lanes(e).length}">
        ${this._renderPipes()}
        <div class="roof">${dt}</div>
        <div class="walls">
          ${o.map(d=>r(d.name,a(d.id)))}
          ${r(e.floors.length?n("other_rooms"):"",c)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${h.map(d=>r(d.name,a(d.id)))}
          ${this._renderPlantRoom(e,t)}
        </div>
      </div>
    `}_renderRoom(e,t,n){let i=this._t,r=this._state(t.climate_entity),a=r?.attributes??{},o=!r||r.state==="unavailable"||r.state==="unknown",h=a.hvac_action==="heating",c=this._windowOpen(t),d="\xB0",m=a.current_temperature,_=a.temperature,g=a.preset_mode&&a.preset_mode!=="none"?String(a.preset_mode):void 0,R=e.circuits.find(E=>E.id===t.circuit),k={kind:"room",id:t.id};return p`
      <div
        class="room ${h?"heating":""} ${o?"off":""}
          ${this._isSelected("room",t.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-circuit=${R?.id??u}
        @click=${()=>this._select(k)}
        @keydown=${E=>this._key(E,k)}
      >
        <div class="room-top">
          <span class="room-name"
            >${R?p`<span class="dot" style="background:${n.get(R.id)}"></span>`:u}${t.name}</span
          >
          <span class="icons">
            ${c?p`<span class="badge window" title=${i("window_open")}
                  >${ct}</span
                >`:u}
            ${h?p`<span class="badge flame" title=${i("heating")}
                  >${ot}</span
                >`:u}
          </span>
        </div>
        <div class="room-temp">
          ${this._format(typeof m=="number"?m:void 0,"")}<span
            class="unit"
            >${d}</span
          >
        </div>
        <div class="room-bottom">
          <span
            >${i("target")}
            ${r?.state==="off"?"\u2013":this._format(typeof _=="number"?_:void 0,"")}${d}</span
          >
          ${g?p`<span class="preset">${this._presetLabel(r,g)}</span>`:u}
        </div>
      </div>
    `}_renderPlantRoom(e,t){let n=this._t;if(!e.heat_sources.length&&!e.buffers.length&&!e.circuits.length&&!e.pump_groups?.length)return u;let i=e.circuits.some(r=>this._circuitOpen(r)!==!1);return p`
      <section class="storey plant-room">
        <div class="floor-name">${n("plant_room")}</div>
        <div class="parts">
          ${e.heat_sources.map(r=>this._renderSource(r,i))}
          ${e.buffers.map(r=>this._renderBuffer(r,i))}
          ${(e.pump_groups??[]).map(r=>this._renderPumpGroup(e,r))}
          ${e.circuits.map(r=>this._renderCircuit(r,t.get(r.id)??"gray"))}
        </div>
      </section>
    `}_part(e,t,n,i=""){return p`
      <div
        class="part ${t?"flowing":""} ${i}
          ${this._isSelected(e.kind,e.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-part="${e.kind}:${e.id}"
        @click=${()=>this._select(e)}
        @keydown=${r=>this._key(r,e)}
      >
        ${n}
      </div>
    `}_sourceActive(e){let t=this._state(e.status_entity)?.state?.toLowerCase();return!!t&&je.has(t)}_renderSource(e,t){let n=this._t,i=this._sourceActive(e);return this._part({kind:"source",id:e.id},t,p`
        <div class="part-name">${e.name}</div>
        <div class="figure">${pt(i)}</div>
        <div class="big">
          ${e.temperature_entity?this._temp(e.temperature_entity):e.flow_entity?this._temp(e.flow_entity):"\u2013"}
        </div>
        <div class="sub">
          ${n(i?"running":`kind_${e.kind}`)}
        </div>
      `)}_renderBuffer(e,t){let n=e.sensor_entities.map(i=>this._number(i));return this._part({kind:"buffer",id:e.id},t,p`
        <div class="part-name">${e.name}</div>
        <div class="figure buffer-figure">
          ${mt(n)}
          <div class="tank-values">
            ${e.sensor_entities.map(i=>p`<span>${this._temp(i)}</span>`)}
          </div>
        </div>
        <div class="sub">
          ${e.volume?`${this._format(e.volume,"l",0)}`:u}
        </div>
      `)}_pumpRunning(e){let t=this._state(e.status_entity)?.state?.toLowerCase();if(!(!t||t==="unavailable"||t==="unknown"))return je.has(t)}_renderPumpGroup(e,t){let n=this._t,i=this._pumpRunning(t),r=e.circuits.filter(a=>a.pump_group===t.id).some(a=>this._circuitOpen(a)!==!1);return this._part({kind:"pump",id:t.id},r,p`
        <div class="part-name">${t.name}</div>
        <div class="figure">${ht(i??r)}</div>
        <div class="big">${t.flow_entity?this._temp(t.flow_entity):"\u2013"}</div>
        ${t.return_entity?p`<div class="pair">
              <span class="hot">${this._temp(t.flow_entity)}</span>
              <span class="cold">${this._temp(t.return_entity)}</span>
            </div>`:u}
        <div class="sub ${i?"status-open":""}">
          ${n(i===void 0?"pump_group":i?"running":"pump_stopped")}
        </div>
      `)}_renderCircuit(e,t){let n=this._t,i=this._circuitOpen(e),r=this._number(e.spread_entity),a=i===void 0?"unknown":i?"open":"closed";return this._part({kind:"circuit",id:e.id},i!==!1,p`
        <div class="part-name">
          <span class="dot" style="background:${t}"></span>${e.name}
        </div>
        <div class="figure">${_t(a)}</div>
        <div class="big">
          ${r===void 0?"\u2013":`\u0394 ${this._format(r,"K")}`}
        </div>
        <div class="pair">
          <span class="hot">${this._temp(e.flow_entity)}</span>
          <span class="cold">${this._temp(e.return_entity)}</span>
        </div>
        <div class="sub status-${a}">${n(a)}</div>
      `,`circuit-${a}`)}_explain(e,t){let n=this._t,i="",r=[];if(t.kind==="mode"){let a=this._state(e.mode_entity)?.state;i=n(a==="off"?"mode_off":"mode_observe"),r=[n(a==="off"?"x_mode_off":"x_mode_observe")]}else if(t.kind==="circuit"){let a=e.circuits.find(d=>d.id===t.id);if(!a)return;i=a.name,r.push(n("x_what_circuit",{name:a.name,system:n(`system_${a.system_type}`)}));let o=this._number(a.spread_entity);r.push(o===void 0?n("x_no_spread"):n("x_spread",{flow:this._temp(a.flow_entity),ret:this._temp(a.return_entity),spread:this._format(o,"K")}));let h=this._circuitOpen(a);a.valve_entity?h===void 0?r.push(n("x_valve_unknown")):a.valve_entity.startsWith("valve.")?r.push(n(h?"x_open_valve":"x_closed_valve")):r.push(n(`x_${h?"open":"closed"}_${a.valve_type==="no"?"no":"nc"}`)):r.push(n("x_no_valve"));let c=e.rooms.filter(d=>d.circuit===a.id).map(d=>d.name);c.length&&r.push(n("x_rooms_on",{rooms:c.join(", ")}))}else if(t.kind==="room"){let a=e.rooms.find(m=>m.id===t.id);if(!a)return;i=a.name;let o=this._state(a.climate_entity),h=o?.attributes??{},c={name:a.name,current:this._format(h.current_temperature,"\xB0C"),target:this._format(h.temperature,"\xB0C")};!o||o.state==="unavailable"||o.state==="unknown"?r.push(n("x_room_unavailable",c)):o.state==="off"?r.push(n("x_room_off",c)):h.hvac_action==="heating"?r.push(n("x_room_heating",c)):r.push(n("x_room_idle",c)),this._windowOpen(a)&&r.push(n("x_room_window")),h.preset_mode&&h.preset_mode!=="none"&&r.push(n("x_room_preset",{preset:this._presetLabel(o,String(h.preset_mode))}));let d=e.circuits.find(m=>m.id===a.circuit);d&&r.push(n("x_room_circuit",{circuit:d.name}))}else if(t.kind==="pump"){let a=e.pump_groups?.find(c=>c.id===t.id);if(!a)return;i=a.name,r.push(n("x_pump",{name:a.name})),a.flow_entity&&r.push(n("x_pump_flow",{temp:this._temp(a.flow_entity)}));let o=e.circuits.filter(c=>c.pump_group===a.id);if(o.length){let c=o.filter(d=>this._circuitOpen(d)!==!1);r.push(c.length?n("x_pump_needed",{circuits:c.map(d=>d.name).join(", ")}):n("x_pump_idle"))}let h=this._pumpRunning(a);h!==void 0&&r.push(n(h?"x_pump_running":"x_pump_stopped")),r.push(n(a.control_entity?"x_pump_control":"x_pump_no_control")),a.control_off_option&&a.control_on_option&&r.push(n("x_pump_modes",{off:a.control_off_option,on:a.control_on_option}))}else if(t.kind==="buffer"){let a=e.buffers.find(o=>o.id===t.id);if(!a)return;i=a.name,r.push(n("x_buffer",{name:a.name})),this._number(a.mean_entity)!==void 0&&r.push(n("x_buffer_mean",{mean:this._temp(a.mean_entity)}))}else{let a=e.heat_sources.find(c=>c.id===t.id);if(!a)return;i=a.name;let o=this._state(a.status_entity)?.state;r.push(n("x_source",{name:a.name,status:this._sourceActive(a)?n("running"):o??n("unknown")}));let h=a.temperature_entity??a.flow_entity;h&&r.push(n("x_source_temp",{temp:this._temp(h)}))}return{title:i,lines:r}}_presetLabel(e,t){return e&&this._hass?.formatEntityAttributeValue?this._hass.formatEntityAttributeValue(e,"preset_mode",t):t}_renderExplanation(e){let t=this._selection;if(!t||t.kind==="room")return u;let n=this._explain(e,t);return n?p`
      <div class="explain" role="status">
        <div class="explain-head">
          <strong>${n.title}</strong>
          <button
            class="close"
            aria-label=${this._t("close")}
            @click=${()=>this._selection=void 0}
          >
            ✕
          </button>
        </div>
        ${n.lines.map(i=>p`<p>${i}</p>`)}
      </div>
    `:u}_call(e,t,n){this._hass?.callService?.(e,t,n)}_setTarget(e,t,n,i){let r=Math.round(Math.min(i,Math.max(n,t))*10)/10;this._pendingTarget={entity:e,value:r},window.clearTimeout(this._targetTimer),this._targetTimer=window.setTimeout(()=>{this._call("climate","set_temperature",{entity_id:e,temperature:r}),this._targetTimer=window.setTimeout(()=>this._pendingTarget=void 0,2500)},700)}_renderRoomDialog(e,t){let n=this._selection;if(!n||n.kind!=="room")return u;let i=e.rooms.find(v=>v.id===n.id);if(!i?.climate_entity)return u;let r=this._t,a=i.climate_entity,o=this._state(a),h=o?.attributes??{},c=!!o&&o.state!=="unavailable"&&o.state!=="unknown",d=o?.state==="off",m=Number(h.target_temp_step)||.5,_=typeof h.min_temp=="number"?h.min_temp:5,g=typeof h.max_temp=="number"?h.max_temp:30,k=(this._pendingTarget?.entity===a?this._pendingTarget.value:void 0)??(typeof h.temperature=="number"?h.temperature:void 0),E=Array.isArray(h.preset_modes)?h.preset_modes.filter(v=>v!=="none"):[],y=Array.isArray(h.hvac_modes)?h.hvac_modes:[],f=["heat","auto","heat_cool"].find(v=>y.includes(v)),b=e.circuits.find(v=>v.id===i.circuit),w=e.floors.find(v=>v.id===i.floor),x=()=>this._selection=void 0,oe=this._explain(e,n)?.lines??[],W=[b?`${r("circuit")} ${b.name}`:"",w?.name??""].filter(Boolean).join(" \xB7 ");return p`
      <dialog
        class="backdrop"
        aria-label=${i.name}
        @click=${x}
        @cancel=${x}
      >
        <div
          class="sheet"
          @click=${v=>v.stopPropagation()}
          @keydown=${v=>v.key==="Escape"&&x()}
        >
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${i.name}</div>
              <div class="sheet-sub">
                ${b?p`<span class="dot" style="background:${t.get(b.id)}"></span>`:u}${W}
              </div>
            </div>
            <button class="close" aria-label=${r("close")} @click=${x}>✕</button>
          </div>
          <div class="sheet-now ${h.hvac_action==="heating"?"heating":""}">
            <span class="now-value"
              >${this._format(typeof h.current_temperature=="number"?h.current_temperature:void 0,"")}°</span
            >
            <span class="now-label"
              >${h.hvac_action==="heating"?r("heating"):r(d?"mode_off":"idle")}</span
            >
          </div>
          <div class="stepper">
            <button
              aria-label="−"
              ?disabled=${!c||d||k===void 0||k<=_}
              @click=${()=>this._setTarget(a,(k??_)-m,_,g)}
            >
              −
            </button>
            <div class="stepper-value">
              <span>${d?"\u2013":`${this._format(k,"")}\xB0`}</span>
              <small>${r("target")}</small>
            </div>
            <button
              aria-label="+"
              ?disabled=${!c||d||k===void 0||k>=g}
              @click=${()=>this._setTarget(a,(k??_)+m,_,g)}
            >
              +
            </button>
          </div>
          ${E.length?p`<div class="choices">
                ${E.map(v=>p`<button
                      class="choice ${h.preset_mode===v?"on":""}"
                      ?disabled=${!c||d}
                      @click=${()=>this._call("climate","set_preset_mode",{entity_id:a,preset_mode:v})}
                    >
                      ${this._presetLabel(o,v)}
                    </button>`)}
              </div>`:u}
          ${y.includes("off")&&f?p`<button
                class="wide"
                ?disabled=${!c}
                @click=${()=>this._call("climate","set_hvac_mode",{entity_id:a,hvac_mode:d?f:"off"})}
              >
                ${r(d?"room_turn_on":"room_turn_off")}
              </button>`:u}
          <div class="why">
            <div class="why-title">${r("why")}</div>
            ${oe.map(v=>p`<p>${v}</p>`)}
          </div>
          ${this._renderPlan(i)}
          <button
            class="link"
            @click=${()=>{x(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:a},bubbles:!0,composed:!0}))}}
          >
            ${r("open_thermostat")}
          </button>
        </div>
      </dialog>
    `}_renderPlan(e){let t=this._control;if(!t||!t.schedules.length&&!t.rules.length)return u;let n=this._t,i=t.rooms[e.id],r=i?we(i.action,n,this._hass,e.climate_entity):"";return p`
      <div class="why">
        <div class="why-title">${n("plan")}</div>
        ${i?p`<p>
                ${n(i.source==="absence"?"plan_absence":"plan_schedule",{name:i.name,action:r})}
              </p>
              ${t.enabled?u:p`<p>${n("plan_would")}</p>`}`:p`<p>${n("plan_none")}</p>`}
      </div>
    `}_navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}_renderSetup(e){let t=this._t,n=[{key:"source",done:e.heat_sources.length>0,optional:!1},{key:"buffer",done:e.buffers.length>0,optional:!0},{key:"pump",done:(e.pump_groups?.length??0)>0,optional:!0},{key:"circuits",done:e.circuits.length>0,optional:!1},{key:"rooms",done:e.rooms.length>0,optional:!1}],i=n.filter(r=>!r.done&&!r.optional).length;return p`
      <section class="set setup">
        <h3>${t("setup_title")}</h3>
        <p class="hint first">${t(i?"setup_intro":"setup_done")}</p>
        <ol class="steps">
          ${n.map((r,a)=>p`
              <li class=${r.done?"done":""}>
                <span class="step-mark">${r.done?"\u2713":a+1}</span>
                <div>
                  <div class="row-name">
                    ${t(`setup_${r.key}`)}
                    ${r.optional&&!r.done?p`<span class="row-detail">${t("setup_optional")}</span>`:u}
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
    `}_renderSettings(e,t){let n=this._t,i=this._state(e.mode_entity),r=Array.isArray(i?.attributes.options)?i.attributes.options:[],a=(c,d,m,_)=>p`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${_?p`<span class="dot" style="background:${_}"></span>`:u}${c}</span
          >
          <span class="row-detail">${d}</span>
        </div>
        ${m.map(g=>p`<div class="row-warn">${g}</div>`)}
      </li>
    `,o=(c,d)=>p`
      <section class="set">
        <h3>${c}</h3>
        ${d.length?p`<ul>${d}</ul>`:p`<p class="hint">${n("none_yet")}</p>`}
      </section>
    `,h=c=>c.filter(Boolean).join(" \xB7 ");return p`
      <div class="settings">
        ${this._renderSetup(e)}
        <section class="set">
          <h3>${n("set_mode")}</h3>
          <div class="choices">
            ${r.map(c=>p`<button
                  class="choice ${i?.state===c?"on":""}"
                  @click=${()=>this._call("select","select_option",{entity_id:e.mode_entity,option:c})}
                >
                  ${n(`mode_${c}`)}
                </button>`)}
          </div>
          <p class="hint">
            ${n(i?.state==="off"?"x_mode_off":"x_mode_observe")}
            ${n("set_mode_active")}
          </p>
        </section>
        <section class="set">
          <h3>${n("set_language")}</h3>
          <div class="choices">
            ${["auto","de","en"].map(c=>p`<button
                  class="choice ${(e.language??"auto")===c?"on":""}"
                  @click=${()=>this._setLanguage(e,c)}
                >
                  ${n(`lang_${c}`)}
                </button>`)}
          </div>
          <p class="hint">${n("set_language_hint")}</p>
        </section>
        ${this._control?p`<heizzentrale-control
              .hass=${this._hass}
              .plant=${e}
              .control=${this._control}
              .t=${n}
              @control-changed=${c=>this._control=c.detail}
            ></heizzentrale-control>`:u}
        ${o(n("set_sources"),e.heat_sources.map(c=>a(c.name,n(`kind_${c.kind}`),c.temperature_entity||c.flow_entity?[]:[n("warn_no_sensor")])))}
        ${o(n("set_buffers"),e.buffers.map(c=>a(c.name,h([c.volume?this._format(c.volume,"l",0):"",n("n_sensors",{count:String(c.sensor_entities.length)})]),c.sensor_entities.length?[]:[n("warn_no_sensor")])))}
        ${o(n("set_pumps"),(e.pump_groups??[]).map(c=>a(c.name,h([n("n_circuits",{count:String(e.circuits.filter(d=>d.pump_group===c.id).length)}),c.control_entity?n("pump_switchable"):""]),[...c.flow_entity?[]:[n("warn_no_sensor")],...c.control_entity?[]:[n("warn_no_control")]])))}
        ${o(n("set_circuits"),e.circuits.map(c=>{let d=e.rooms.filter(m=>m.circuit===c.id).length;return a(c.name,h([n(`system_${c.system_type}`),c.valve_entity?n(c.valve_type==="no"?"valve_no":"valve_nc"):n("valve_none"),d===1?n("one_room"):n("n_rooms",{count:String(d)})]),[...c.flow_entity&&c.return_entity?[]:[n("warn_no_pipe_sensors")],...d?[]:[n("warn_no_rooms")]],t.get(c.id))}))}
        ${o(n("set_rooms"),e.rooms.map(c=>{let d=e.circuits.find(_=>_.id===c.circuit),m=e.floors.find(_=>_.id===c.floor);return a(c.name,h([d&&`${n("circuit")} ${d.name}`,m?.name,c.window_entities?.length===1&&n("has_window"),(c.window_entities?.length??0)>1&&n("n_windows",{count:String(c.window_entities.length)})]),[...d||!e.circuits.length?[]:[n("warn_no_circuit")],...m?[]:[n("warn_no_floor")]],d?t.get(d.id):void 0)}))}
      </div>
    `}};Y.properties={_plants:{state:!0},_error:{state:!0},_selection:{state:!0},_config:{state:!0},_pipes:{state:!0},_view:{state:!0},_pendingTarget:{state:!0},_control:{state:!0}},Y.styles=H`
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
      column-gap: 8px;
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
  `;var ot=$`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.5 5-2.5 7C8.4 11 9 12.5 9 12.5S7 12 6.6 9.8C4.9 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"/></svg>`,at=$`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.1a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.700 1.700 0 0 0 1.800.3h.1a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.1a1.700 1.700 0 0 0-.3 1.800v.1a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/></svg>`,lt=$`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.500"/><path d="M5.500 10v10h13V10"/></svg>`,ct=$`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`,dt=$`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;function ht(l){let s=l?"var(--hz-ok)":"currentColor",e=l?"1":"0.4";return $`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M4 28 H14 M42 28 H52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
    <circle cx="28" cy="28" r="14" fill="none" stroke=${s} stroke-width="2.5" opacity=${e}/>
    <path d="M22 19.500 L38 28 L22 36.500 Z" fill=${l?s:"none"} stroke=${s} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
  </svg>`}function pt(l){return $`<svg viewBox="0 0 44 56" aria-hidden="true">
    <rect x="4" y="3" width="36" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
    <rect x="11" y="9" width="22" height="7" rx="2" fill="currentColor" opacity="0.25"/>
    <path transform="translate(10 22)" d="M12 2c1 3.5-1.500 5-2.500 7C8.400 11 9 12.500 9 12.500S7 12 6.600 9.800C4.900 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"
      fill=${l?"var(--hz-hot)":"currentColor"} opacity=${l?"1":"0.25"}/>
  </svg>`}function ut(l){return l===void 0?"var(--divider-color, #ccc)":`color-mix(in srgb, var(--hz-hot) ${(Math.max(0,Math.min(1,(l-25)/50))*100).toFixed(0)}%, var(--hz-cold))`}function mt(l){let s=l.length?l:[void 0],e=44/s.length;return $`<svg viewBox="0 0 32 56" aria-hidden="true">
    <defs><clipPath id="hz-tank"><rect x="4" y="6" width="24" height="44" rx="9"/></clipPath></defs>
    <g clip-path="url(#hz-tank)">
      ${s.map((t,n)=>$`<rect x="4" y=${6+n*e} width="24" height=${e+.5} fill=${ut(t)}/>`)}
    </g>
    <rect x="4" y="6" width="24" height="44" rx="9" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  </svg>`}function _t(l){let s=l==="open"?"var(--hz-ok)":l==="unknown"?"var(--hz-warn)":"currentColor",e=l==="closed"?"0.35":"1";return $`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M6 22 L28 34 L6 46 Z M50 22 L28 34 L50 46 Z" fill=${l==="open"?s:"none"}
      stroke=${s} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
    <path d="M28 34 V16 M19 16 H37" stroke=${s} stroke-width="2.5" stroke-linecap="round" opacity=${e}/>
    ${l==="closed"?$`<path d="M14 48 L42 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`:u}
  </svg>`}var Q=class extends S{constructor(){super(...arguments);this.narrow=!1}set hass(e){this._hass=e;let t=this.renderRoot?.querySelector("heizzentrale-house-card");t&&(t.hass=e);let n=this.renderRoot?.querySelector("ha-menu-button");n&&(n.hass=e)}firstUpdated(){this.renderRoot.querySelector("heizzentrale-house-card").setConfig({}),this._hass&&(this.hass=this._hass)}render(){return p`
      <div class="bar">
        <ha-menu-button .narrow=${this.narrow}></ha-menu-button>
      </div>
      <main><heizzentrale-house-card></heizzentrale-house-card></main>
    `}};Q.properties={narrow:{type:Boolean,reflect:!0}},Q.styles=H`
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
  `;var X=class extends S{constructor(){super(...arguments);this._config={}}setConfig(e){this._config={...e}}set hass(e){this._hass=e,this._plants||(this._plants=[],e.callWS({type:"heizzentrale/plants"}).then(t=>this._plants=t.plants).catch(()=>{}))}_change(e,t){let n={...this._config};t?n[e]=t:delete n[e],this._config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}render(){let e=ye(this._hass?.locale?.language??this._hass?.language);return p`
      <label>
        ${e("editor_plant")}
        <select
          @change=${t=>this._change("entry_id",t.target.value)}
        >
          <option value="" ?selected=${!this._config.entry_id}>
            ${e("editor_first")}
          </option>
          ${(this._plants??[]).map(t=>p`<option
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
    `}};X.properties={_config:{state:!0},_plants:{state:!0}},X.styles=H`
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
  `;customElements.get("heizzentrale-house-card")||(customElements.define("heizzentrale-house-card",Y),customElements.define("heizzentrale-house-card-editor",X),customElements.define("heizzentrale-panel",Q),(window.customCards??=[]).push({type:"heizzentrale-house-card",name:"Heizzentrale",description:"House view: rooms per floor, heat source, buffer and circuits.",preview:!1}));
