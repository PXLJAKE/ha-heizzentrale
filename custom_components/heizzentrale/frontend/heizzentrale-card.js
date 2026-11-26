var X=globalThis,ee=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,re=Symbol(),be=new WeakMap,j=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(ee&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=be.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&be.set(e,i))}return i}toString(){return this.cssText}},ye=o=>new j(typeof o=="string"?o:o+"",void 0,re),K=(o,...i)=>{let e=o.length===1?o[0]:i.reduce((t,s,r)=>t+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new j(e,o,re)},xe=(o,i)=>{if(ee)o.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),s=X.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,o.appendChild(t)}},oe=ee?o=>o:o=>o instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return ye(e)})(o):o;var{is:Be,defineProperty:We,getOwnPropertyDescriptor:je,getOwnPropertyNames:Ke,getOwnPropertySymbols:Fe,getPrototypeOf:Ve}=Object,te=globalThis,we=te.trustedTypes,Ie=we?we.emptyScript:"",qe=te.reactiveElementPolyfillSupport,F=(o,i)=>o,ae={toAttribute(o,i){switch(i){case Boolean:o=o?Ie:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,i){let e=o;switch(i){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},ke=(o,i)=>!Be(o,i),$e={attribute:!0,type:String,converter:ae,reflect:!1,useDefault:!1,hasChanged:ke};Symbol.metadata??=Symbol("metadata"),te.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=$e){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(i,t,e);s!==void 0&&We(this.prototype,i,s)}}static getPropertyDescriptor(i,e,t){let{get:s,set:r}=je(this.prototype,i)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let a=s?.call(this);r?.call(this,n),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??$e}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;let i=Ve(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){let e=this.properties,t=[...Ke(e),...Fe(e)];for(let s of t)this.createProperty(s,e[s])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let s of t)e.unshift(oe(s))}else i!==void 0&&e.push(oe(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xe(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),s=this.constructor._$Eu(i,t);if(s!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:ae).toAttribute(e,t.type);this._$Em=i,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(i,e){let t=this.constructor,s=t._$Eh.get(i);if(s!==void 0&&this._$Em!==s){let r=t.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ae;this._$Em=s;let a=n.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(i,e,t,s=!1,r){if(i!==void 0){let n=this.constructor;if(s===!1&&(r=this[i]),t??=n.getPropertyOptions(i),!((t.hasChanged??ke)(r,e)||t.useDefault&&t.reflect&&r===this._$Ej?.get(i)&&!this.hasAttribute(n._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:s,wrapped:r},n){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,n??e??this[i]),r!==!0||n!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),s===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,r]of t){let{wrapped:n}=r,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[F("elementProperties")]=new Map,A[F("finalized")]=new Map,qe?.({ReactiveElement:A}),(te.reactiveElementVersions??=[]).push("2.1.2");var me=globalThis,ze=o=>o,ie=me.trustedTypes,Se=ie?ie.createPolicy("lit-html",{createHTML:o=>o}):void 0,He="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Re="?"+P,Ge=`<${Re}>`,M=document,I=()=>M.createComment(""),q=o=>o===null||typeof o!="object"&&typeof o!="function",_e=Array.isArray,Ze=o=>_e(o)||typeof o?.[Symbol.iterator]=="function",le=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Ee=/>/g,R=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ce=/'/g,Te=/"/g,Oe=/^(?:script|style|textarea|title)$/i,fe=o=>(i,...e)=>({_$litType$:o,strings:i,values:e}),h=fe(1),w=fe(2),mt=fe(3),N=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Pe=new WeakMap,O=M.createTreeWalker(M,129);function Me(o,i){if(!_e(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Se!==void 0?Se.createHTML(i):i}var Je=(o,i)=>{let e=o.length-1,t=[],s,r=i===2?"<svg>":i===3?"<math>":"",n=V;for(let a=0;a<e;a++){let d=o[a],p,c,l=-1,m=0;for(;m<d.length&&(n.lastIndex=m,c=n.exec(d),c!==null);)m=n.lastIndex,n===V?c[1]==="!--"?n=Ae:c[1]!==void 0?n=Ee:c[2]!==void 0?(Oe.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=R):c[3]!==void 0&&(n=R):n===R?c[0]===">"?(n=s??V,l=-1):c[1]===void 0?l=-2:(l=n.lastIndex-c[2].length,p=c[1],n=c[3]===void 0?R:c[3]==='"'?Te:Ce):n===Te||n===Ce?n=R:n===Ae||n===Ee?n=V:(n=R,s=void 0);let _=n===R&&o[a+1].startsWith("/>")?" ":"";r+=n===V?d+Ge:l>=0?(t.push(p),d.slice(0,l)+He+d.slice(l)+P+_):d+P+(l===-2?a:_)}return[Me(o,r+(o[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},G=class o{constructor({strings:i,_$litType$:e},t){let s;this.parts=[];let r=0,n=0,a=i.length-1,d=this.parts,[p,c]=Je(i,e);if(this.el=o.createElement(p,t),O.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=O.nextNode())!==null&&d.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(He)){let m=c[n++],_=s.getAttribute(l).split(P),g=/([.?@])?(.*)/.exec(m);d.push({type:1,index:r,name:g[2],strings:_,ctor:g[1]==="."?de:g[1]==="?"?pe:g[1]==="@"?he:B}),s.removeAttribute(l)}else l.startsWith(P)&&(d.push({type:6,index:r}),s.removeAttribute(l));if(Oe.test(s.tagName)){let l=s.textContent.split(P),m=l.length-1;if(m>0){s.textContent=ie?ie.emptyScript:"";for(let _=0;_<m;_++)s.append(l[_],I()),O.nextNode(),d.push({type:2,index:++r});s.append(l[m],I())}}}else if(s.nodeType===8)if(s.data===Re)d.push({type:2,index:r});else{let l=-1;for(;(l=s.data.indexOf(P,l+1))!==-1;)d.push({type:7,index:r}),l+=P.length-1}r++}}static createElement(i,e){let t=M.createElement("template");return t.innerHTML=i,t}};function D(o,i,e=o,t){if(i===N)return i;let s=t!==void 0?e._$Co?.[t]:e._$Cl,r=q(i)?void 0:i._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(i=D(o,s._$AS(o,i.values),s,t)),i}var ce=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,s=(i?.creationScope??M).importNode(e,!0);O.currentNode=s;let r=O.nextNode(),n=0,a=0,d=t[0];for(;d!==void 0;){if(n===d.index){let p;d.type===2?p=new Z(r,r.nextSibling,this,i):d.type===1?p=new d.ctor(r,d.name,d.strings,this,i):d.type===6&&(p=new ue(r,this,i)),this._$AV.push(p),d=t[++a]}n!==d?.index&&(r=O.nextNode(),n++)}return O.currentNode=M,s}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},Z=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=D(this,i,e),q(i)?i===u||i==null||i===""?(this._$AH!==u&&this._$AR(),this._$AH=u):i!==this._$AH&&i!==N&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Ze(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==u&&q(this._$AH)?this._$AA.nextSibling.data=i:this.T(M.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,s=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=G.createElement(Me(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new ce(s,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(i){let e=Pe.get(i.strings);return e===void 0&&Pe.set(i.strings,e=new G(i)),e}k(i){_e(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let r of i)s===e.length?e.push(t=new o(this.O(I()),this.O(I()),this,this.options)):t=e[s],t._$AI(r),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=ze(i).nextSibling;ze(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},B=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,s,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=i,this.name=e,this._$AM=s,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=u}_$AI(i,e=this,t,s){let r=this.strings,n=!1;if(r===void 0)i=D(this,i,e,0),n=!q(i)||i!==this._$AH&&i!==N,n&&(this._$AH=i);else{let a=i,d,p;for(i=r[0],d=0;d<r.length-1;d++)p=D(this,a[t+d],e,d),p===N&&(p=this._$AH[d]),n||=!q(p)||p!==this._$AH[d],p===u?i=u:i!==u&&(i+=(p??"")+r[d+1]),this._$AH[d]=p}n&&!s&&this.j(i)}j(i){i===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},de=class extends B{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===u?void 0:i}},pe=class extends B{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==u)}},he=class extends B{constructor(i,e,t,s,r){super(i,e,t,s,r),this.type=5}_$AI(i,e=this){if((i=D(this,i,e,0)??u)===N)return;let t=this._$AH,s=i===u&&t!==u||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,r=i!==u&&(t===u||s);s&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},ue=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){D(this,i)}};var Ye=me.litHtmlPolyfillSupport;Ye?.(G,Z),(me.litHtmlVersions??=[]).push("3.3.3");var Ne=(o,i,e)=>{let t=e?.renderBefore??i,s=t._$litPart$;if(s===void 0){let r=e?.renderBefore??null;t._$litPart$=s=new Z(i.insertBefore(I(),r),r,void 0,e??{})}return s._$AI(o),s};var ge=globalThis,S=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Ne(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};S._$litElement$=!0,S.finalized=!0,ge.litElementHydrateSupport?.({LitElement:S});var Qe=ge.litElementPolyfillSupport;Qe?.({LitElement:S});(ge.litElementVersions??=[]).push("4.2.2");var Le={loading:"Loading plant\u2026",no_plant:"No plant found. Add the Heizzentrale integration under Settings \u2192 Devices & services.",empty:"This plant has no parts yet. Open the integration and add a heat source, circuits and rooms.",mode_observe:"Observing",mode_off:"Off",outdoor:"Outdoor",other_rooms:"Other rooms",plant_room:"Plant room",flow:"Flow",return:"Return",spread:"Spread",target:"Target",heating:"heating",idle:"idle",window_open:"Window open",open:"open",closed:"closed",unknown:"unknown",running:"running",close:"Close",system_two_pipe:"two-pipe",system_one_pipe:"one-pipe",system_underfloor:"underfloor heating",system_other:"circuit",kind_pellet:"Pellet boiler",kind_wood:"Wood boiler",kind_gas:"Gas boiler",kind_oil:"Oil boiler",kind_heat_pump:"Heat pump",kind_district:"District heating",kind_other:"Heat source",x_what_circuit:"{name} is a {system} circuit. Hot water flows to the radiators (flow) and comes back cooler (return).",x_spread:"Flow {flow}, return {ret}: the spread is {spread}. A larger spread means the water gives off more heat on its way.",x_no_spread:"Flow and return sensors are needed to show the spread.",x_open_nc:"The circuit is open because its actuator is powered. Without power this actuator closes (NC).",x_closed_nc:"The circuit is closed because its actuator has no power. Without power this actuator closes (NC).",x_open_no:"The circuit is open because its actuator has no power. Without power this actuator opens (NO).",x_closed_no:"The circuit is closed because its actuator is powered. Without power this actuator opens (NO).",x_open_valve:"The valve reports that it is open.",x_closed_valve:"The valve reports that it is closed.",x_valve_unknown:"The actuator does not report a state right now. Heizzentrale treats the circuit as possibly open.",x_no_valve:"This circuit has no actuator, so it is always open.",x_rooms_on:"Rooms on this circuit: {rooms}.",x_room_heating:"{name} is heating: it is {current} and should be {target}.",x_room_idle:"{name} is not heating: it is {current}, target {target}.",x_room_off:"{name} is switched off.",x_room_unavailable:"The thermostat of {name} is not reachable right now.",x_room_window:"A window is open, so heating is paused here.",x_room_preset:"Active preset: {preset}.",x_room_circuit:"Its radiators are supplied by the circuit {circuit}.",x_buffer:"{name} stores hot water so the heat source does not have to start for every small demand. Hot water collects at the top.",x_buffer_mean:"Mean temperature: {mean}.",x_source:"{name} produces the heat for the house. Status: {status}.",x_source_temp:"Temperature: {temp}.",x_mode_observe:"Observe mode: Heizzentrale measures and explains but does not switch anything.",x_mode_off:"Off: Heizzentrale only measures.",settings:"Settings",back:"Back to the house",circuit:"Circuit",why:"What is happening",room_turn_off:"Switch heating off in this room",room_turn_on:"Switch heating on in this room",open_thermostat:"Open thermostat details",set_mode:"Operating mode",set_mode_active:"A mode that switches on its own follows later and only after your OK.",set_sources:"Heat sources",set_buffers:"Buffer tanks",set_circuits:"Circuits",set_rooms:"Rooms",none_yet:"Nothing added yet.",n_rooms:"{count} rooms",one_room:"1 room",n_sensors:"{count} sensors",valve_nc:"actuator closes without power",valve_no:"actuator opens without power",valve_none:"no actuator",has_window:"window contact",warn_no_sensor:"No temperature sensor assigned.",warn_no_pipe_sensors:"Flow or return sensor missing, so no spread can be shown.",warn_no_rooms:"No room uses this circuit yet.",warn_no_circuit:"No circuit assigned, so no pipe is drawn to this room.",warn_no_floor:"No floor found. Assign the thermostat to an area with a floor in Home Assistant.",edit_parts:"Add or change parts",edit_hint:"Opens the Heizzentrale page of Home Assistant. Heat sources, buffers, circuits and rooms are added and changed there.",pump_group:"Pump group",pump_stopped:"stopped",set_pumps:"Pump groups",n_circuits:"{count} circuits",pump_switchable:"can be switched",warn_no_control:"No entity to switch it chosen. Heizzentrale will not be able to turn it off when all circuits are closed.",x_pump:"{name} pushes the heating water into the circuits behind it. A mixer, if there is one, sets how hot that water is.",x_pump_flow:"Flow temperature behind the mixer: {temp}.",x_pump_needed:"It is needed right now because these circuits are open: {circuits}.",x_pump_idle:"All circuits behind it are closed, so it has nothing to do. Once switching is enabled, Heizzentrale turns it off in this situation.",x_pump_running:"The pump reports that it is running.",x_pump_stopped:"The pump reports that it is stopped.",x_pump_control:"An entity to switch it is chosen. Heizzentrale only observes for now and does not use it yet.",x_pump_no_control:"No entity to switch it is chosen yet.",setup_title:"Setup",setup_intro:"Add the parts of your heating in this order. Only the name is required each time; sensors can be filled in later.",setup_done:"The basics are set up. You can add or change parts at any time.",setup_optional:"only if you have one",setup_source:"Heat source",setup_source_hint:"Your boiler or heat pump.",setup_buffer:"Buffer tank",setup_buffer_hint:"The tank that stores hot water, with its temperature sensors.",setup_pump:"Pump group",setup_pump_hint:"The pump, with or without mixer, that feeds the circuits.",setup_circuits:"Circuits",setup_circuits_hint:"Every branch that can be opened and closed on its own, for example one per floor.",setup_rooms:"Rooms",setup_rooms_hint:"One per thermostat. Name and floor come from Home Assistant on their own.",editor_plant:"Plant",editor_title:"Title (optional)",editor_first:"First plant"},Xe={loading:"Anlage wird geladen \u2026",no_plant:"Keine Anlage gefunden. F\xFCge die Integration Heizzentrale unter Einstellungen \u2192 Ger\xE4te & Dienste hinzu.",empty:"Diese Anlage hat noch keine Teile. \xD6ffne die Integration und f\xFCge W\xE4rmeerzeuger, Kreise und R\xE4ume hinzu.",mode_observe:"Beobachtet",mode_off:"Aus",outdoor:"Au\xDFen",other_rooms:"Weitere R\xE4ume",plant_room:"Heizraum",flow:"Vorlauf",return:"R\xFCcklauf",spread:"Spreizung",target:"Soll",heating:"heizt",idle:"ruht",window_open:"Fenster offen",open:"offen",closed:"zu",unknown:"unbekannt",running:"l\xE4uft",close:"Schlie\xDFen",system_two_pipe:"Zweirohr",system_one_pipe:"Einrohr",system_underfloor:"Fu\xDFbodenheizung",system_other:"Kreis",kind_pellet:"Pelletkessel",kind_wood:"Holzkessel",kind_gas:"Gastherme",kind_oil:"\xD6lkessel",kind_heat_pump:"W\xE4rmepumpe",kind_district:"Fernw\xE4rme",kind_other:"W\xE4rmeerzeuger",x_what_circuit:"{name} ist ein Strang ({system}). Hei\xDFes Wasser flie\xDFt zu den Heizk\xF6rpern (Vorlauf) und kommt k\xFChler zur\xFCck (R\xFCcklauf).",x_spread:"Vorlauf {flow}, R\xFCcklauf {ret}: Die Spreizung betr\xE4gt {spread}. Eine gr\xF6\xDFere Spreizung hei\xDFt, das Wasser gibt unterwegs mehr W\xE4rme ab.",x_no_spread:"F\xFCr die Spreizung braucht es einen Vorlauf- und einen R\xFCcklauff\xFChler.",x_open_nc:"Der Strang ist offen, weil sein Stellantrieb Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_closed_nc:"Der Strang ist zu, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_open_no:"Der Strang ist offen, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_closed_no:"Der Strang ist zu, weil sein Stellantrieb Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_open_valve:"Das Ventil meldet, dass es offen ist.",x_closed_valve:"Das Ventil meldet, dass es zu ist.",x_valve_unknown:"Der Stellantrieb meldet gerade keinen Zustand. Heizzentrale behandelt den Strang als m\xF6glicherweise offen.",x_no_valve:"Dieser Strang hat keinen Stellantrieb und ist deshalb immer offen.",x_rooms_on:"R\xE4ume an diesem Strang: {rooms}.",x_room_heating:"{name} heizt gerade: Es hat {current} und soll {target} haben.",x_room_idle:"{name} heizt nicht: Es hat {current}, Soll {target}.",x_room_off:"{name} ist ausgeschaltet.",x_room_unavailable:"Das Thermostat von {name} ist gerade nicht erreichbar.",x_room_window:"Ein Fenster ist offen, deshalb pausiert die Heizung hier.",x_room_preset:"Aktives Preset: {preset}.",x_room_circuit:"Die Heizk\xF6rper h\xE4ngen am Strang {circuit}.",x_buffer:"{name} speichert hei\xDFes Wasser, damit der W\xE4rmeerzeuger nicht f\xFCr jeden kleinen Bedarf starten muss. Oben sammelt sich das hei\xDFe Wasser.",x_buffer_mean:"Mittlere Temperatur: {mean}.",x_source:"{name} erzeugt die W\xE4rme f\xFCr das Haus. Status: {status}.",x_source_temp:"Temperatur: {temp}.",x_mode_observe:"Beobachtungsmodus: Heizzentrale misst und erkl\xE4rt, schaltet aber nichts.",x_mode_off:"Aus: Heizzentrale misst nur.",settings:"Einstellungen",back:"Zur\xFCck zum Haus",circuit:"Strang",why:"Was gerade passiert",room_turn_off:"Heizung in diesem Raum ausschalten",room_turn_on:"Heizung in diesem Raum einschalten",open_thermostat:"Details zum Thermostat \xF6ffnen",set_mode:"Betriebsart",set_mode_active:"Eine Betriebsart, die selbst schaltet, kommt sp\xE4ter und erst nach deinem OK.",set_sources:"W\xE4rmeerzeuger",set_buffers:"Pufferspeicher",set_circuits:"Str\xE4nge",set_rooms:"R\xE4ume",none_yet:"Noch nichts angelegt.",n_rooms:"{count} R\xE4ume",one_room:"1 Raum",n_sensors:"{count} F\xFChler",valve_nc:"Stellantrieb stromlos zu",valve_no:"Stellantrieb stromlos offen",valve_none:"kein Stellantrieb",has_window:"Fensterkontakt",warn_no_sensor:"Kein Temperaturf\xFChler zugewiesen.",warn_no_pipe_sensors:"Vorlauf- oder R\xFCcklauff\xFChler fehlt, deshalb gibt es keine Spreizung.",warn_no_rooms:"Noch kein Raum h\xE4ngt an diesem Strang.",warn_no_circuit:"Kein Strang zugewiesen, deshalb f\xFChrt keine Leitung zu diesem Raum.",warn_no_floor:"Kein Stockwerk gefunden. Weise das Thermostat in Home Assistant einem Bereich mit Stockwerk zu.",edit_parts:"Teile hinzuf\xFCgen oder \xE4ndern",edit_hint:"\xD6ffnet die Heizzentrale-Seite von Home Assistant. Dort werden W\xE4rmeerzeuger, Puffer, Str\xE4nge und R\xE4ume angelegt und ge\xE4ndert.",pump_group:"Pumpengruppe",pump_stopped:"steht",set_pumps:"Pumpengruppen",n_circuits:"{count} Str\xE4nge",pump_switchable:"schaltbar",warn_no_control:"Keine Entit\xE4t zum Schalten gew\xE4hlt. Heizzentrale kann sie dann nicht ausschalten, wenn alle Str\xE4nge zu sind.",x_pump:"{name} dr\xFCckt das Heizwasser in die Str\xE4nge dahinter. Ein Mischer, falls vorhanden, bestimmt, wie hei\xDF dieses Wasser ist.",x_pump_flow:"Vorlauftemperatur hinter dem Mischer: {temp}.",x_pump_needed:"Sie wird gerade gebraucht, weil diese Str\xE4nge offen sind: {circuits}.",x_pump_idle:"Alle Str\xE4nge dahinter sind zu, sie hat also nichts zu tun. Sobald das Schalten freigegeben ist, schaltet Heizzentrale sie in dieser Lage aus.",x_pump_running:"Die Pumpe meldet, dass sie l\xE4uft.",x_pump_stopped:"Die Pumpe meldet, dass sie steht.",x_pump_control:"Eine Entit\xE4t zum Schalten ist gew\xE4hlt. Heizzentrale beobachtet vorerst nur und benutzt sie noch nicht.",x_pump_no_control:"Es ist noch keine Entit\xE4t zum Schalten gew\xE4hlt.",setup_title:"Einrichtung",setup_intro:"Lege die Teile deiner Heizung in dieser Reihenfolge an. Pflicht ist jeweils nur der Name, F\xFChler kannst du nachtragen.",setup_done:"Die Grundeinrichtung steht. Du kannst jederzeit Teile hinzuf\xFCgen oder \xE4ndern.",setup_optional:"nur falls vorhanden",setup_source:"W\xE4rmeerzeuger",setup_source_hint:"Dein Kessel oder deine W\xE4rmepumpe.",setup_buffer:"Pufferspeicher",setup_buffer_hint:"Der Speicher f\xFCr hei\xDFes Wasser mit seinen Temperaturf\xFChlern.",setup_pump:"Pumpengruppe",setup_pump_hint:"Die Pumpe, mit oder ohne Mischer, die die Str\xE4nge versorgt.",setup_circuits:"Str\xE4nge",setup_circuits_hint:"Jeder Teil, der sich einzeln \xF6ffnen und schlie\xDFen l\xE4sst, zum Beispiel einer pro Stockwerk.",setup_rooms:"R\xE4ume",setup_rooms_hint:"Einer pro Thermostat. Name und Stockwerk kommen von selbst aus Home Assistant.",editor_plant:"Anlage",editor_title:"Titel (optional)",editor_first:"Erste Anlage"};function ve(o){let i=(o??"en").toLowerCase().startsWith("de")?Xe:Le;return(e,t={})=>(i[e]??Le[e]??e).replace(/\{(\w+)\}/g,(s,r)=>t[r]??"")}var se=["#3b82f6","#14b8a6","#a855f7","#f59e0b","#ec4899","#84cc16","#6366f1","#f97316"];function W(o,i=7){let e=r=>Math.round(r*10)/10,t=`M${e(o[0][0])} ${e(o[0][1])}`;for(let r=1;r<o.length-1;r++){let[n,a]=o[r-1],[d,p]=o[r],[c,l]=o[r+1],m=Math.hypot(d-n,p-a),_=Math.hypot(c-d,l-p),g=Math.min(i,m/2,_/2);if(g<.5){t+=` L${e(d)} ${e(p)}`;continue}t+=` L${e(d-(d-n)/m*g)} ${e(p-(p-a)/m*g)}`,t+=` Q${e(d)} ${e(p)} ${e(d+(c-d)/_*g)} ${e(p+(l-p)/_*g)}`}let s=o[o.length-1];return`${t} L${e(s[0])} ${e(s[1])}`}var Ue=new Set(["on","heat","heating","running","true"]),J=class extends S{constructor(){super(...arguments);this._config={};this._loading=!1;this._watched=new Set;this._view="house";this._pipes=[];this._pipeSignature=""}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("heizzentrale-house-card-editor")}setConfig(e){this._config={...e}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}set hass(e){let t=this._hass;if(this._hass=e,!this._plants&&!this._loading){this._load();return}if(!t){this.requestUpdate();return}for(let s of this._watched)if(t.states[s]!==e.states[s]){this.requestUpdate();return}t.language!==e.language&&this.requestUpdate()}get hass(){return this._hass}async _load(){if(this._hass){this._loading=!0;try{let e=await this._hass.callWS({type:"heizzentrale/plants"});this._plants=e.plants,this._error=void 0}catch(e){this._error=e?.message??String(e),this._plants=[]}finally{this._loading=!1}}}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect(),this._observed=void 0}updated(){let e=this.renderRoot.querySelector(".house")??void 0;e!==this._observed&&(this._resize?.disconnect(),this._observed=e,e&&typeof ResizeObserver<"u"&&(this._resize??=new ResizeObserver(()=>this._measurePipes()),this._resize.observe(e))),this._measurePipes()}_lanes(e){return e.circuits.filter(t=>e.rooms.some(s=>s.circuit===t.id))}_measurePipes(){let e=this.renderRoot.querySelector(".house"),t=this._plant(),s=[];if(e&&t){let n=e.getBoundingClientRect(),a=y=>{let f=y.getBoundingClientRect();return{top:f.top-n.top,bottom:f.bottom-n.top,center:(f.left+f.right)/2-n.left,left:f.left-n.left}},d=y=>{let f=new Map;for(let b of y){let x=Math.round(b.bottom);f.set(x,[...f.get(x)??[],b])}return[...f.entries()].sort((b,x)=>b[0]-x[0]).map(b=>b[1])},p=[...e.querySelectorAll("[data-part]")].map(a),c=t.circuits.some(y=>this._circuitOpen(y)!==!1),l="var(--hz-hot)",m;for(let y of d(p)){let f=y[0].bottom+8,b=y[0],x=y[y.length-1];m!==void 0&&s.push({d:W([[b.center,m],[b.center,f]]),color:l,active:c}),y.length>1&&s.push({d:W([[b.center,b.bottom-6],[b.center,f],[x.center,f],[x.center,x.bottom-6]]),color:l,active:c});for(let k of y.slice(1,-1))s.push({d:W([[k.center,f],[k.center,k.bottom-6]]),color:l,active:c});m=f}let _=this._lanes(t),g=e.querySelector(".walls"),H=e.querySelector(".parts"),$=g?a(g).left+2:0,E=H?a(H).top:0;_.forEach((y,f)=>{let b=se[t.circuits.indexOf(y)%se.length],x=this._circuitOpen(y)!==!1,k=$+9+f*6,ne=[...e.querySelectorAll(`[data-circuit="${y.id}"]`)].map(z=>({...a(z),heating:z.classList.contains("heating")})),L;for(let z of d(ne)){let C=z[0].bottom+6+f*4;L=Math.min(L??C,C),z.sort((T,De)=>T.center-De.center);let U=z[z.length-1];s.push({d:W([[k,C],[U.center,C],[U.center,U.bottom-6]]),color:b,active:x&&z.some(T=>T.heating)});for(let T of z.slice(0,-1))s.push({d:W([[T.center,C],[T.center,T.bottom-6]]),color:b,active:x&&T.heating})}let v=e.querySelector(`[data-part="circuit:${y.id}"]`);if(v&&L!==void 0){let z=a(v),C=E-7-f*4,U=z.center+(f-(_.length-1)/2)*6;s.push({d:W([[U,z.top+6],[U,C],[k,C],[k,L]]),color:b,active:x})}})}let r=JSON.stringify(s);r!==this._pipeSignature&&(this._pipeSignature=r,this._pipes=s)}_renderPipes(){return h`<svg class="pipes" aria-hidden="true">
      ${this._pipes.map(e=>w`
          <path class="tube ${e.active?"active":""}" d=${e.d} style="stroke:${e.color}"/>
          ${e.active?w`<path class="flow" d=${e.d} style="stroke:${e.color}"/>`:u}`)}
    </svg>`}get _t(){return ve(this._hass?.locale?.language??this._hass?.language)}_state(e){if(e)return this._watched.add(e),this._hass?.states[e]}_number(e){let t=this._state(e);if(!t)return;let s=Number(t.state);return t.state!==""&&Number.isFinite(s)?s:void 0}_format(e,t,s=1){if(e===void 0)return"\u2013";let r=this._hass?.locale?.language??this._hass?.language??"en",n=new Intl.NumberFormat(r,{minimumFractionDigits:s,maximumFractionDigits:s}).format(e);return t?`${n} ${t}`:n}_temp(e){let s=this._state(e)?.attributes.unit_of_measurement??"\xB0C";return this._format(this._number(e),s)}_plant(){if(this._plants?.length)return this._plants.find(e=>e.entry_id===this._config.entry_id)??this._plants[0]}_circuitOpen(e){if(!e.valve_entity)return!0;let t=this._state(e.open_entity)?.state;if(t==="on")return!0;if(t==="off")return!1}_select(e){let t=this._selection&&this._selection.kind===e.kind&&this._selection.id===e.id;this._selection=t?void 0:e}_key(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(t))}_isSelected(e,t){let s=this._selection;return!!s&&s.kind===e&&s.id===t}render(){this._watched.clear();let e=this._t;if(!this._plants)return h`<ha-card><div class="note">${e("loading")}</div></ha-card>`;let t=this._plant();if(!t)return h`<ha-card
        ><div class="note">${this._error??e("no_plant")}</div></ha-card
      >`;let s=!t.rooms.length&&!t.circuits.length&&!t.buffers.length&&!t.pump_groups?.length&&!t.heat_sources.length,r=new Map;return t.circuits.forEach((n,a)=>r.set(n.id,se[a%se.length])),h`
      <ha-card>
        ${this._renderHeader(t)}
        ${s&&this._view==="house"?h`<div class="settings">${this._renderSetup(t)}</div>`:u}
        ${this._view==="settings"?this._renderSettings(t,r):h`${s?u:this._renderHouse(t,r)}
            ${this._renderExplanation(t)} ${this._renderRoomDialog(t,r)}`}
      </ha-card>
    `}_renderHeader(e){let t=this._t,s=this._state(e.mode_entity)?.state,r=e.outdoor_entity?h`<span class="chip" title=${t("outdoor")}
          >${t("outdoor")} ${this._temp(e.outdoor_entity)}</span
        >`:u,n=s==="observe"||s==="off"?h`<button
            class="chip mode ${s}"
            @click=${()=>this._select({kind:"mode"})}
          >
            ${t(s==="observe"?"mode_observe":"mode_off")}
          </button>`:u;return h`
      <div class="header">
        <h2>${this._config.title||e.name}</h2>
        <div class="chips">
          ${r}${n}
          <button
            class="chip icon ${this._view==="settings"?"on":""}"
            aria-label=${t(this._view==="settings"?"back":"settings")}
            title=${t(this._view==="settings"?"back":"settings")}
            @click=${()=>{this._selection=void 0,this._view=this._view==="settings"?"house":"settings"}}
          >
            ${this._view==="settings"?it:tt}
          </button>
        </div>
      </div>
    `}_renderHouse(e,t){let s=this._t,r=new Set(e.floors.map(l=>l.id)),n=(l,m)=>m.length?h`
            <section class="storey">
              ${l?h`<div class="floor-name">${l}</div>`:u}
              <div class="rooms">
                ${m.map(_=>this._renderRoom(e,_,t))}
              </div>
            </section>
          `:u,a=l=>e.rooms.filter(m=>m.floor===l),d=e.floors.filter(l=>(l.level??0)>=0),p=e.floors.filter(l=>(l.level??0)<0),c=e.rooms.filter(l=>!l.floor||!r.has(l.floor));return h`
      <div class="house" style="--hz-lanes:${this._lanes(e).length}">
        ${this._renderPipes()}
        <div class="roof">${nt}</div>
        <div class="walls">
          ${d.map(l=>n(l.name,a(l.id)))}
          ${n(e.floors.length?s("other_rooms"):"",c)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${p.map(l=>n(l.name,a(l.id)))}
          ${this._renderPlantRoom(e,t)}
        </div>
      </div>
    `}_renderRoom(e,t,s){let r=this._t,n=this._state(t.climate_entity),a=n?.attributes??{},d=!n||n.state==="unavailable"||n.state==="unknown",p=a.hvac_action==="heating",c=this._state(t.window_entity)?.state==="on",l="\xB0",m=a.current_temperature,_=a.temperature,g=a.preset_mode&&a.preset_mode!=="none"?String(a.preset_mode):void 0,H=e.circuits.find(E=>E.id===t.circuit),$={kind:"room",id:t.id};return h`
      <div
        class="room ${p?"heating":""} ${d?"off":""}
          ${this._isSelected("room",t.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-circuit=${H?.id??u}
        @click=${()=>this._select($)}
        @keydown=${E=>this._key(E,$)}
      >
        <div class="room-top">
          <span class="room-name"
            >${H?h`<span class="dot" style="background:${s.get(H.id)}"></span>`:u}${t.name}</span
          >
          <span class="icons">
            ${c?h`<span class="badge window" title=${r("window_open")}
                  >${st}</span
                >`:u}
            ${p?h`<span class="badge flame" title=${r("heating")}
                  >${et}</span
                >`:u}
          </span>
        </div>
        <div class="room-temp">
          ${this._format(typeof m=="number"?m:void 0,"")}<span
            class="unit"
            >${l}</span
          >
        </div>
        <div class="room-bottom">
          <span
            >${r("target")}
            ${n?.state==="off"?"\u2013":this._format(typeof _=="number"?_:void 0,"")}${l}</span
          >
          ${g?h`<span class="preset">${this._presetLabel(n,g)}</span>`:u}
        </div>
      </div>
    `}_renderPlantRoom(e,t){let s=this._t;if(!e.heat_sources.length&&!e.buffers.length&&!e.circuits.length&&!e.pump_groups?.length)return u;let r=e.circuits.some(n=>this._circuitOpen(n)!==!1);return h`
      <section class="storey plant-room">
        <div class="floor-name">${s("plant_room")}</div>
        <div class="parts">
          ${e.heat_sources.map(n=>this._renderSource(n,r))}
          ${e.buffers.map(n=>this._renderBuffer(n,r))}
          ${(e.pump_groups??[]).map(n=>this._renderPumpGroup(e,n))}
          ${e.circuits.map(n=>this._renderCircuit(n,t.get(n.id)??"gray"))}
        </div>
      </section>
    `}_part(e,t,s,r=""){return h`
      <div
        class="part ${t?"flowing":""} ${r}
          ${this._isSelected(e.kind,e.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-part="${e.kind}:${e.id}"
        @click=${()=>this._select(e)}
        @keydown=${n=>this._key(n,e)}
      >
        ${s}
      </div>
    `}_sourceActive(e){let t=this._state(e.status_entity)?.state?.toLowerCase();return!!t&&Ue.has(t)}_renderSource(e,t){let s=this._t,r=this._sourceActive(e);return this._part({kind:"source",id:e.id},t,h`
        <div class="part-name">${e.name}</div>
        <div class="figure">${ot(r)}</div>
        <div class="big">
          ${e.temperature_entity?this._temp(e.temperature_entity):e.flow_entity?this._temp(e.flow_entity):"\u2013"}
        </div>
        <div class="sub">
          ${s(r?"running":`kind_${e.kind}`)}
        </div>
      `)}_renderBuffer(e,t){let s=e.sensor_entities.map(r=>this._number(r));return this._part({kind:"buffer",id:e.id},t,h`
        <div class="part-name">${e.name}</div>
        <div class="figure buffer-figure">
          ${lt(s)}
          <div class="tank-values">
            ${e.sensor_entities.map(r=>h`<span>${this._temp(r)}</span>`)}
          </div>
        </div>
        <div class="sub">
          ${e.volume?`${this._format(e.volume,"l",0)}`:u}
        </div>
      `)}_pumpRunning(e){let t=this._state(e.status_entity)?.state?.toLowerCase();if(!(!t||t==="unavailable"||t==="unknown"))return Ue.has(t)}_renderPumpGroup(e,t){let s=this._t,r=this._pumpRunning(t),n=e.circuits.filter(a=>a.pump_group===t.id).some(a=>this._circuitOpen(a)!==!1);return this._part({kind:"pump",id:t.id},n,h`
        <div class="part-name">${t.name}</div>
        <div class="figure">${rt(r??n)}</div>
        <div class="big">${t.flow_entity?this._temp(t.flow_entity):"\u2013"}</div>
        ${t.return_entity?h`<div class="pair">
              <span class="hot">${this._temp(t.flow_entity)}</span>
              <span class="cold">${this._temp(t.return_entity)}</span>
            </div>`:u}
        <div class="sub ${r?"status-open":""}">
          ${s(r===void 0?"pump_group":r?"running":"pump_stopped")}
        </div>
      `)}_renderCircuit(e,t){let s=this._t,r=this._circuitOpen(e),n=this._number(e.spread_entity),a=r===void 0?"unknown":r?"open":"closed";return this._part({kind:"circuit",id:e.id},r!==!1,h`
        <div class="part-name">
          <span class="dot" style="background:${t}"></span>${e.name}
        </div>
        <div class="figure">${ct(a)}</div>
        <div class="big">
          ${n===void 0?"\u2013":`\u0394 ${this._format(n,"K")}`}
        </div>
        <div class="pair">
          <span class="hot">${this._temp(e.flow_entity)}</span>
          <span class="cold">${this._temp(e.return_entity)}</span>
        </div>
        <div class="sub status-${a}">${s(a)}</div>
      `,`circuit-${a}`)}_explain(e,t){let s=this._t,r="",n=[];if(t.kind==="mode"){let a=this._state(e.mode_entity)?.state;r=s(a==="off"?"mode_off":"mode_observe"),n=[s(a==="off"?"x_mode_off":"x_mode_observe")]}else if(t.kind==="circuit"){let a=e.circuits.find(l=>l.id===t.id);if(!a)return;r=a.name,n.push(s("x_what_circuit",{name:a.name,system:s(`system_${a.system_type}`)}));let d=this._number(a.spread_entity);n.push(d===void 0?s("x_no_spread"):s("x_spread",{flow:this._temp(a.flow_entity),ret:this._temp(a.return_entity),spread:this._format(d,"K")}));let p=this._circuitOpen(a);a.valve_entity?p===void 0?n.push(s("x_valve_unknown")):a.valve_entity.startsWith("valve.")?n.push(s(p?"x_open_valve":"x_closed_valve")):n.push(s(`x_${p?"open":"closed"}_${a.valve_type==="no"?"no":"nc"}`)):n.push(s("x_no_valve"));let c=e.rooms.filter(l=>l.circuit===a.id).map(l=>l.name);c.length&&n.push(s("x_rooms_on",{rooms:c.join(", ")}))}else if(t.kind==="room"){let a=e.rooms.find(m=>m.id===t.id);if(!a)return;r=a.name;let d=this._state(a.climate_entity),p=d?.attributes??{},c={name:a.name,current:this._format(p.current_temperature,"\xB0C"),target:this._format(p.temperature,"\xB0C")};!d||d.state==="unavailable"||d.state==="unknown"?n.push(s("x_room_unavailable",c)):d.state==="off"?n.push(s("x_room_off",c)):p.hvac_action==="heating"?n.push(s("x_room_heating",c)):n.push(s("x_room_idle",c)),this._state(a.window_entity)?.state==="on"&&n.push(s("x_room_window")),p.preset_mode&&p.preset_mode!=="none"&&n.push(s("x_room_preset",{preset:this._presetLabel(d,String(p.preset_mode))}));let l=e.circuits.find(m=>m.id===a.circuit);l&&n.push(s("x_room_circuit",{circuit:l.name}))}else if(t.kind==="pump"){let a=e.pump_groups?.find(c=>c.id===t.id);if(!a)return;r=a.name,n.push(s("x_pump",{name:a.name})),a.flow_entity&&n.push(s("x_pump_flow",{temp:this._temp(a.flow_entity)}));let d=e.circuits.filter(c=>c.pump_group===a.id);if(d.length){let c=d.filter(l=>this._circuitOpen(l)!==!1);n.push(c.length?s("x_pump_needed",{circuits:c.map(l=>l.name).join(", ")}):s("x_pump_idle"))}let p=this._pumpRunning(a);p!==void 0&&n.push(s(p?"x_pump_running":"x_pump_stopped")),n.push(s(a.control_entity?"x_pump_control":"x_pump_no_control"))}else if(t.kind==="buffer"){let a=e.buffers.find(d=>d.id===t.id);if(!a)return;r=a.name,n.push(s("x_buffer",{name:a.name})),this._number(a.mean_entity)!==void 0&&n.push(s("x_buffer_mean",{mean:this._temp(a.mean_entity)}))}else{let a=e.heat_sources.find(c=>c.id===t.id);if(!a)return;r=a.name;let d=this._state(a.status_entity)?.state;n.push(s("x_source",{name:a.name,status:this._sourceActive(a)?s("running"):d??s("unknown")}));let p=a.temperature_entity??a.flow_entity;p&&n.push(s("x_source_temp",{temp:this._temp(p)}))}return{title:r,lines:n}}_presetLabel(e,t){return e&&this._hass?.formatEntityAttributeValue?this._hass.formatEntityAttributeValue(e,"preset_mode",t):t}_renderExplanation(e){let t=this._selection;if(!t||t.kind==="room")return u;let s=this._explain(e,t);return s?h`
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
        ${s.lines.map(r=>h`<p>${r}</p>`)}
      </div>
    `:u}_call(e,t,s){this._hass?.callService?.(e,t,s)}_setTarget(e,t,s,r){let n=Math.round(Math.min(r,Math.max(s,t))*10)/10;this._pendingTarget={entity:e,value:n},window.clearTimeout(this._targetTimer),this._targetTimer=window.setTimeout(()=>{this._call("climate","set_temperature",{entity_id:e,temperature:n}),this._targetTimer=window.setTimeout(()=>this._pendingTarget=void 0,2500)},700)}_renderRoomDialog(e,t){let s=this._selection;if(!s||s.kind!=="room")return u;let r=e.rooms.find(v=>v.id===s.id);if(!r?.climate_entity)return u;let n=this._t,a=r.climate_entity,d=this._state(a),p=d?.attributes??{},c=!!d&&d.state!=="unavailable"&&d.state!=="unknown",l=d?.state==="off",m=Number(p.target_temp_step)||.5,_=typeof p.min_temp=="number"?p.min_temp:5,g=typeof p.max_temp=="number"?p.max_temp:30,$=(this._pendingTarget?.entity===a?this._pendingTarget.value:void 0)??(typeof p.temperature=="number"?p.temperature:void 0),E=Array.isArray(p.preset_modes)?p.preset_modes.filter(v=>v!=="none"):[],y=Array.isArray(p.hvac_modes)?p.hvac_modes:[],f=["heat","auto","heat_cool"].find(v=>y.includes(v)),b=e.circuits.find(v=>v.id===r.circuit),x=e.floors.find(v=>v.id===r.floor),k=()=>this._selection=void 0,ne=this._explain(e,s)?.lines??[],L=[b?`${n("circuit")} ${b.name}`:"",x?.name??""].filter(Boolean).join(" \xB7 ");return h`
      <div class="backdrop" @click=${k}>
        <div
          class="sheet"
          role="dialog"
          aria-modal="true"
          aria-label=${r.name}
          @click=${v=>v.stopPropagation()}
          @keydown=${v=>v.key==="Escape"&&k()}
        >
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${r.name}</div>
              <div class="sheet-sub">
                ${b?h`<span class="dot" style="background:${t.get(b.id)}"></span>`:u}${L}
              </div>
            </div>
            <button class="close" aria-label=${n("close")} @click=${k}>✕</button>
          </div>
          <div class="sheet-now ${p.hvac_action==="heating"?"heating":""}">
            <span class="now-value"
              >${this._format(typeof p.current_temperature=="number"?p.current_temperature:void 0,"")}°</span
            >
            <span class="now-label"
              >${p.hvac_action==="heating"?n("heating"):n(l?"mode_off":"idle")}</span
            >
          </div>
          <div class="stepper">
            <button
              aria-label="−"
              ?disabled=${!c||l||$===void 0||$<=_}
              @click=${()=>this._setTarget(a,($??_)-m,_,g)}
            >
              −
            </button>
            <div class="stepper-value">
              <span>${l?"\u2013":`${this._format($,"")}\xB0`}</span>
              <small>${n("target")}</small>
            </div>
            <button
              aria-label="+"
              ?disabled=${!c||l||$===void 0||$>=g}
              @click=${()=>this._setTarget(a,($??_)+m,_,g)}
            >
              +
            </button>
          </div>
          ${E.length?h`<div class="choices">
                ${E.map(v=>h`<button
                      class="choice ${p.preset_mode===v?"on":""}"
                      ?disabled=${!c||l}
                      @click=${()=>this._call("climate","set_preset_mode",{entity_id:a,preset_mode:v})}
                    >
                      ${this._presetLabel(d,v)}
                    </button>`)}
              </div>`:u}
          ${y.includes("off")&&f?h`<button
                class="wide"
                ?disabled=${!c}
                @click=${()=>this._call("climate","set_hvac_mode",{entity_id:a,hvac_mode:l?f:"off"})}
              >
                ${n(l?"room_turn_on":"room_turn_off")}
              </button>`:u}
          <div class="why">
            <div class="why-title">${n("why")}</div>
            ${ne.map(v=>h`<p>${v}</p>`)}
          </div>
          <button
            class="link"
            @click=${()=>{k(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:a},bubbles:!0,composed:!0}))}}
          >
            ${n("open_thermostat")}
          </button>
        </div>
      </div>
    `}_navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}_renderSetup(e){let t=this._t,s=[{key:"source",done:e.heat_sources.length>0,optional:!1},{key:"buffer",done:e.buffers.length>0,optional:!0},{key:"pump",done:(e.pump_groups?.length??0)>0,optional:!0},{key:"circuits",done:e.circuits.length>0,optional:!1},{key:"rooms",done:e.rooms.length>0,optional:!1}],r=s.filter(n=>!n.done&&!n.optional).length;return h`
      <section class="set setup">
        <h3>${t("setup_title")}</h3>
        <p class="hint first">${t(r?"setup_intro":"setup_done")}</p>
        <ol class="steps">
          ${s.map((n,a)=>h`
              <li class=${n.done?"done":""}>
                <span class="step-mark">${n.done?"\u2713":a+1}</span>
                <div>
                  <div class="row-name">
                    ${t(`setup_${n.key}`)}
                    ${n.optional&&!n.done?h`<span class="row-detail">${t("setup_optional")}</span>`:u}
                  </div>
                  <div class="row-detail">${t(`setup_${n.key}_hint`)}</div>
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
    `}_renderSettings(e,t){let s=this._t,r=this._state(e.mode_entity),n=Array.isArray(r?.attributes.options)?r.attributes.options:[],a=(c,l,m,_)=>h`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${_?h`<span class="dot" style="background:${_}"></span>`:u}${c}</span
          >
          <span class="row-detail">${l}</span>
        </div>
        ${m.map(g=>h`<div class="row-warn">${g}</div>`)}
      </li>
    `,d=(c,l)=>h`
      <section class="set">
        <h3>${c}</h3>
        ${l.length?h`<ul>${l}</ul>`:h`<p class="hint">${s("none_yet")}</p>`}
      </section>
    `,p=c=>c.filter(Boolean).join(" \xB7 ");return h`
      <div class="settings">
        ${this._renderSetup(e)}
        <section class="set">
          <h3>${s("set_mode")}</h3>
          <div class="choices">
            ${n.map(c=>h`<button
                  class="choice ${r?.state===c?"on":""}"
                  @click=${()=>this._call("select","select_option",{entity_id:e.mode_entity,option:c})}
                >
                  ${s(`mode_${c}`)}
                </button>`)}
          </div>
          <p class="hint">
            ${s(r?.state==="off"?"x_mode_off":"x_mode_observe")}
            ${s("set_mode_active")}
          </p>
        </section>
        ${d(s("set_sources"),e.heat_sources.map(c=>a(c.name,s(`kind_${c.kind}`),c.temperature_entity||c.flow_entity?[]:[s("warn_no_sensor")])))}
        ${d(s("set_buffers"),e.buffers.map(c=>a(c.name,p([c.volume?this._format(c.volume,"l",0):"",s("n_sensors",{count:String(c.sensor_entities.length)})]),c.sensor_entities.length?[]:[s("warn_no_sensor")])))}
        ${d(s("set_pumps"),(e.pump_groups??[]).map(c=>a(c.name,p([s("n_circuits",{count:String(e.circuits.filter(l=>l.pump_group===c.id).length)}),c.control_entity?s("pump_switchable"):""]),[...c.flow_entity?[]:[s("warn_no_sensor")],...c.control_entity?[]:[s("warn_no_control")]])))}
        ${d(s("set_circuits"),e.circuits.map(c=>{let l=e.rooms.filter(m=>m.circuit===c.id).length;return a(c.name,p([s(`system_${c.system_type}`),c.valve_entity?s(c.valve_type==="no"?"valve_no":"valve_nc"):s("valve_none"),l===1?s("one_room"):s("n_rooms",{count:String(l)})]),[...c.flow_entity&&c.return_entity?[]:[s("warn_no_pipe_sensors")],...l?[]:[s("warn_no_rooms")]],t.get(c.id))}))}
        ${d(s("set_rooms"),e.rooms.map(c=>{let l=e.circuits.find(_=>_.id===c.circuit),m=e.floors.find(_=>_.id===c.floor);return a(c.name,p([l&&`${s("circuit")} ${l.name}`,m?.name,c.window_entity&&s("has_window")]),[...l||!e.circuits.length?[]:[s("warn_no_circuit")],...m?[]:[s("warn_no_floor")]],l?t.get(l.id):void 0)}))}
      </div>
    `}};J.properties={_plants:{state:!0},_error:{state:!0},_selection:{state:!0},_config:{state:!0},_pipes:{state:!0},_view:{state:!0},_pendingTarget:{state:!0}},J.styles=K`
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
      z-index: 10;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: hz-fade 0.15s ease;
    }
    .sheet {
      width: min(380px, 100%);
      max-height: 100%;
      overflow: auto;
      box-sizing: border-box;
      background: var(--hz-card);
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
  `;var et=w`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.5 5-2.5 7C8.4 11 9 12.5 9 12.5S7 12 6.6 9.8C4.9 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"/></svg>`,tt=w`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.1a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.700 1.700 0 0 0 1.800.3h.1a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.1a1.700 1.700 0 0 0-.3 1.800v.1a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/></svg>`,it=w`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.500"/><path d="M5.500 10v10h13V10"/></svg>`,st=w`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`,nt=w`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;function rt(o){let i=o?"var(--hz-ok)":"currentColor",e=o?"1":"0.4";return w`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M4 28 H14 M42 28 H52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
    <circle cx="28" cy="28" r="14" fill="none" stroke=${i} stroke-width="2.5" opacity=${e}/>
    <path d="M22 19.500 L38 28 L22 36.500 Z" fill=${o?i:"none"} stroke=${i} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
  </svg>`}function ot(o){return w`<svg viewBox="0 0 44 56" aria-hidden="true">
    <rect x="4" y="3" width="36" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
    <rect x="11" y="9" width="22" height="7" rx="2" fill="currentColor" opacity="0.25"/>
    <path transform="translate(10 22)" d="M12 2c1 3.5-1.500 5-2.500 7C8.400 11 9 12.500 9 12.500S7 12 6.600 9.800C4.900 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"
      fill=${o?"var(--hz-hot)":"currentColor"} opacity=${o?"1":"0.25"}/>
  </svg>`}function at(o){return o===void 0?"var(--divider-color, #ccc)":`color-mix(in srgb, var(--hz-hot) ${(Math.max(0,Math.min(1,(o-25)/50))*100).toFixed(0)}%, var(--hz-cold))`}function lt(o){let i=o.length?o:[void 0],e=44/i.length;return w`<svg viewBox="0 0 32 56" aria-hidden="true">
    <defs><clipPath id="hz-tank"><rect x="4" y="6" width="24" height="44" rx="9"/></clipPath></defs>
    <g clip-path="url(#hz-tank)">
      ${i.map((t,s)=>w`<rect x="4" y=${6+s*e} width="24" height=${e+.5} fill=${at(t)}/>`)}
    </g>
    <rect x="4" y="6" width="24" height="44" rx="9" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  </svg>`}function ct(o){let i=o==="open"?"var(--hz-ok)":o==="unknown"?"var(--hz-warn)":"currentColor",e=o==="closed"?"0.35":"1";return w`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M6 22 L28 34 L6 46 Z M50 22 L28 34 L50 46 Z" fill=${o==="open"?i:"none"}
      stroke=${i} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
    <path d="M28 34 V16 M19 16 H37" stroke=${i} stroke-width="2.5" stroke-linecap="round" opacity=${e}/>
    ${o==="closed"?w`<path d="M14 48 L42 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`:u}
  </svg>`}var Y=class extends S{constructor(){super(...arguments);this.narrow=!1}set hass(e){this._hass=e;let t=this.renderRoot?.querySelector("heizzentrale-house-card");t&&(t.hass=e);let s=this.renderRoot?.querySelector("ha-menu-button");s&&(s.hass=e)}firstUpdated(){this.renderRoot.querySelector("heizzentrale-house-card").setConfig({}),this._hass&&(this.hass=this._hass)}render(){return h`
      <div class="bar">
        <ha-menu-button .narrow=${this.narrow}></ha-menu-button>
      </div>
      <main><heizzentrale-house-card></heizzentrale-house-card></main>
    `}};Y.properties={narrow:{type:Boolean,reflect:!0}},Y.styles=K`
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
  `;var Q=class extends S{constructor(){super(...arguments);this._config={}}setConfig(e){this._config={...e}}set hass(e){this._hass=e,this._plants||(this._plants=[],e.callWS({type:"heizzentrale/plants"}).then(t=>this._plants=t.plants).catch(()=>{}))}_change(e,t){let s={...this._config};t?s[e]=t:delete s[e],this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}render(){let e=ve(this._hass?.locale?.language??this._hass?.language);return h`
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
    `}};Q.properties={_config:{state:!0},_plants:{state:!0}},Q.styles=K`
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
  `;customElements.get("heizzentrale-house-card")||(customElements.define("heizzentrale-house-card",J),customElements.define("heizzentrale-house-card-editor",Q),customElements.define("heizzentrale-panel",Y),(window.customCards??=[]).push({type:"heizzentrale-house-card",name:"Heizzentrale",description:"House view: rooms per floor, heat source, buffer and circuits.",preview:!1}));
