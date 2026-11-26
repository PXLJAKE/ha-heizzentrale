var Q=globalThis,Y=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ne=Symbol(),ve=new WeakMap,j=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Y&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ve.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ve.set(e,t))}return t}toString(){return this.cssText}},be=o=>new j(typeof o=="string"?o:o+"",void 0,ne),X=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new j(e,o,ne)},ye=(o,t)=>{if(Y)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=Q.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},re=Y?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return be(e)})(o):o;var{is:Le,defineProperty:De,getOwnPropertyDescriptor:Be,getOwnPropertyNames:We,getOwnPropertySymbols:je,getPrototypeOf:Ke}=Object,ee=globalThis,xe=ee.trustedTypes,Ve=xe?xe.emptyScript:"",Fe=ee.reactiveElementPolyfillSupport,K=(o,t)=>o,oe={toAttribute(o,t){switch(t){case Boolean:o=o?Ve:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},we=(o,t)=>!Le(o,t),$e={attribute:!0,type:String,converter:oe,reflect:!1,useDefault:!1,hasChanged:we};Symbol.metadata??=Symbol("metadata"),ee.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$e){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&De(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=Be(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let a=s?.call(this);n?.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$e}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;let t=Ke(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){let e=this.properties,i=[...We(e),...je(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(re(s))}else t!==void 0&&e.push(re(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ye(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:oe).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:oe;this._$Em=s;let a=r.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let r=this.constructor;if(s===!1&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??we)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,a=this[s];r!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[K("elementProperties")]=new Map,S[K("finalized")]=new Map,Fe?.({ReactiveElement:S}),(ee.reactiveElementVersions??=[]).push("2.1.2");var ue=globalThis,ke=o=>o,te=ue.trustedTypes,ze=te?te.createPolicy("lit-html",{createHTML:o=>o}):void 0,Pe="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Oe="?"+P,Ie=`<${Oe}>`,M=document,F=()=>M.createComment(""),I=o=>o===null||typeof o!="object"&&typeof o!="function",me=Array.isArray,qe=o=>me(o)||typeof o?.[Symbol.iterator]=="function",ae=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,Ae=/>/g,H=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ee=/'/g,Ce=/"/g,He=/^(?:script|style|textarea|title)$/i,_e=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=_e(1),$=_e(2),pt=_e(3),N=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Te=new WeakMap,R=M.createTreeWalker(M,129);function Re(o,t){if(!me(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ze!==void 0?ze.createHTML(t):t}var Ze=(o,t)=>{let e=o.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",r=V;for(let a=0;a<e;a++){let d=o[a],h,c,l=-1,m=0;for(;m<d.length&&(r.lastIndex=m,c=r.exec(d),c!==null);)m=r.lastIndex,r===V?c[1]==="!--"?r=Se:c[1]!==void 0?r=Ae:c[2]!==void 0?(He.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=H):c[3]!==void 0&&(r=H):r===H?c[0]===">"?(r=s??V,l=-1):c[1]===void 0?l=-2:(l=r.lastIndex-c[2].length,h=c[1],r=c[3]===void 0?H:c[3]==='"'?Ce:Ee):r===Ce||r===Ee?r=H:r===Se||r===Ae?r=V:(r=H,s=void 0);let _=r===H&&o[a+1].startsWith("/>")?" ":"";n+=r===V?d+Ie:l>=0?(i.push(h),d.slice(0,l)+Pe+d.slice(l)+P+_):d+P+(l===-2?a:_)}return[Re(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},q=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0,a=t.length-1,d=this.parts,[h,c]=Ze(t,e);if(this.el=o.createElement(h,i),R.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=R.nextNode())!==null&&d.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(Pe)){let m=c[r++],_=s.getAttribute(l).split(P),g=/([.?@])?(.*)/.exec(m);d.push({type:1,index:n,name:g[2],strings:_,ctor:g[1]==="."?ce:g[1]==="?"?de:g[1]==="@"?he:B}),s.removeAttribute(l)}else l.startsWith(P)&&(d.push({type:6,index:n}),s.removeAttribute(l));if(He.test(s.tagName)){let l=s.textContent.split(P),m=l.length-1;if(m>0){s.textContent=te?te.emptyScript:"";for(let _=0;_<m;_++)s.append(l[_],F()),R.nextNode(),d.push({type:2,index:++n});s.append(l[m],F())}}}else if(s.nodeType===8)if(s.data===Oe)d.push({type:2,index:n});else{let l=-1;for(;(l=s.data.indexOf(P,l+1))!==-1;)d.push({type:7,index:n}),l+=P.length-1}n++}}static createElement(t,e){let i=M.createElement("template");return i.innerHTML=t,i}};function D(o,t,e=o,i){if(t===N)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=I(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=D(o,s._$AS(o,t.values),s,i)),t}var le=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);R.currentNode=s;let n=R.nextNode(),r=0,a=0,d=i[0];for(;d!==void 0;){if(r===d.index){let h;d.type===2?h=new Z(n,n.nextSibling,this,t):d.type===1?h=new d.ctor(n,d.name,d.strings,this,t):d.type===6&&(h=new pe(n,this,t)),this._$AV.push(h),d=i[++a]}r!==d?.index&&(n=R.nextNode(),r++)}return R.currentNode=M,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Z=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),I(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==N&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=q.createElement(Re(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new le(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Te.get(t.strings);return e===void 0&&Te.set(t.strings,e=new q(t)),e}k(t){me(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new o(this.O(F()),this.O(F()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=ke(t).nextSibling;ke(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},B=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,s){let n=this.strings,r=!1;if(n===void 0)t=D(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==N,r&&(this._$AH=t);else{let a=t,d,h;for(t=n[0],d=0;d<n.length-1;d++)h=D(this,a[i+d],e,d),h===N&&(h=this._$AH[d]),r||=!I(h)||h!==this._$AH[d],h===p?t=p:t!==p&&(t+=(h??"")+n[d+1]),this._$AH[d]=h}r&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ce=class extends B{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},de=class extends B{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},he=class extends B{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=D(this,t,e,0)??p)===N)return;let i=this._$AH,s=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},pe=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}};var Ge=ue.litHtmlPolyfillSupport;Ge?.(q,Z),(ue.litHtmlVersions??=[]).push("3.3.3");var Me=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new Z(t.insertBefore(F(),n),n,void 0,e??{})}return s._$AI(o),s};var fe=globalThis,A=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Me(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};A._$litElement$=!0,A.finalized=!0,fe.litElementHydrateSupport?.({LitElement:A});var Je=fe.litElementPolyfillSupport;Je?.({LitElement:A});(fe.litElementVersions??=[]).push("4.2.2");var Ne={loading:"Loading plant\u2026",no_plant:"No plant found. Add the Heizzentrale integration under Settings \u2192 Devices & services.",empty:"This plant has no parts yet. Open the integration and add a heat source, circuits and rooms.",mode_observe:"Observing",mode_off:"Off",outdoor:"Outdoor",other_rooms:"Other rooms",plant_room:"Plant room",flow:"Flow",return:"Return",spread:"Spread",target:"Target",heating:"heating",idle:"idle",window_open:"Window open",open:"open",closed:"closed",unknown:"unknown",running:"running",close:"Close",system_two_pipe:"two-pipe",system_one_pipe:"one-pipe",system_underfloor:"underfloor heating",system_other:"circuit",kind_pellet:"Pellet boiler",kind_wood:"Wood boiler",kind_gas:"Gas boiler",kind_oil:"Oil boiler",kind_heat_pump:"Heat pump",kind_district:"District heating",kind_other:"Heat source",x_what_circuit:"{name} is a {system} circuit. Hot water flows to the radiators (flow) and comes back cooler (return).",x_spread:"Flow {flow}, return {ret}: the spread is {spread}. A larger spread means the water gives off more heat on its way.",x_no_spread:"Flow and return sensors are needed to show the spread.",x_open_nc:"The circuit is open because its actuator is powered. Without power this actuator closes (NC).",x_closed_nc:"The circuit is closed because its actuator has no power. Without power this actuator closes (NC).",x_open_no:"The circuit is open because its actuator has no power. Without power this actuator opens (NO).",x_closed_no:"The circuit is closed because its actuator is powered. Without power this actuator opens (NO).",x_open_valve:"The valve reports that it is open.",x_closed_valve:"The valve reports that it is closed.",x_valve_unknown:"The actuator does not report a state right now. Heizzentrale treats the circuit as possibly open.",x_no_valve:"This circuit has no actuator, so it is always open.",x_rooms_on:"Rooms on this circuit: {rooms}.",x_room_heating:"{name} is heating: it is {current} and should be {target}.",x_room_idle:"{name} is not heating: it is {current}, target {target}.",x_room_off:"{name} is switched off.",x_room_unavailable:"The thermostat of {name} is not reachable right now.",x_room_window:"A window is open, so heating is paused here.",x_room_preset:"Active preset: {preset}.",x_room_circuit:"Its radiators are supplied by the circuit {circuit}.",x_buffer:"{name} stores hot water so the heat source does not have to start for every small demand. Hot water collects at the top.",x_buffer_mean:"Mean temperature: {mean}.",x_source:"{name} produces the heat for the house. Status: {status}.",x_source_temp:"Temperature: {temp}.",x_mode_observe:"Observe mode: Heizzentrale measures and explains but does not switch anything.",x_mode_off:"Off: Heizzentrale only measures.",settings:"Settings",back:"Back to the house",circuit:"Circuit",why:"What is happening",room_turn_off:"Switch heating off in this room",room_turn_on:"Switch heating on in this room",open_thermostat:"Open thermostat details",set_mode:"Operating mode",set_mode_active:"A mode that switches on its own follows later and only after your OK.",set_sources:"Heat sources",set_buffers:"Buffer tanks",set_circuits:"Circuits",set_rooms:"Rooms",none_yet:"Nothing added yet.",n_rooms:"{count} rooms",one_room:"1 room",n_sensors:"{count} sensors",valve_nc:"actuator closes without power",valve_no:"actuator opens without power",valve_none:"no actuator",has_window:"window contact",warn_no_sensor:"No temperature sensor assigned.",warn_no_pipe_sensors:"Flow or return sensor missing, so no spread can be shown.",warn_no_rooms:"No room uses this circuit yet.",warn_no_circuit:"No circuit assigned, so no pipe is drawn to this room.",warn_no_floor:"No floor found. Assign the thermostat to an area with a floor in Home Assistant.",edit_parts:"Add or change parts",edit_hint:"Opens the Heizzentrale page of Home Assistant. Heat sources, buffers, circuits and rooms are added and changed there.",editor_plant:"Plant",editor_title:"Title (optional)",editor_first:"First plant"},Qe={loading:"Anlage wird geladen \u2026",no_plant:"Keine Anlage gefunden. F\xFCge die Integration Heizzentrale unter Einstellungen \u2192 Ger\xE4te & Dienste hinzu.",empty:"Diese Anlage hat noch keine Teile. \xD6ffne die Integration und f\xFCge W\xE4rmeerzeuger, Kreise und R\xE4ume hinzu.",mode_observe:"Beobachtet",mode_off:"Aus",outdoor:"Au\xDFen",other_rooms:"Weitere R\xE4ume",plant_room:"Heizraum",flow:"Vorlauf",return:"R\xFCcklauf",spread:"Spreizung",target:"Soll",heating:"heizt",idle:"ruht",window_open:"Fenster offen",open:"offen",closed:"zu",unknown:"unbekannt",running:"l\xE4uft",close:"Schlie\xDFen",system_two_pipe:"Zweirohr",system_one_pipe:"Einrohr",system_underfloor:"Fu\xDFbodenheizung",system_other:"Kreis",kind_pellet:"Pelletkessel",kind_wood:"Holzkessel",kind_gas:"Gastherme",kind_oil:"\xD6lkessel",kind_heat_pump:"W\xE4rmepumpe",kind_district:"Fernw\xE4rme",kind_other:"W\xE4rmeerzeuger",x_what_circuit:"{name} ist ein Strang ({system}). Hei\xDFes Wasser flie\xDFt zu den Heizk\xF6rpern (Vorlauf) und kommt k\xFChler zur\xFCck (R\xFCcklauf).",x_spread:"Vorlauf {flow}, R\xFCcklauf {ret}: Die Spreizung betr\xE4gt {spread}. Eine gr\xF6\xDFere Spreizung hei\xDFt, das Wasser gibt unterwegs mehr W\xE4rme ab.",x_no_spread:"F\xFCr die Spreizung braucht es einen Vorlauf- und einen R\xFCcklauff\xFChler.",x_open_nc:"Der Strang ist offen, weil sein Stellantrieb Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_closed_nc:"Der Strang ist zu, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_open_no:"Der Strang ist offen, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_closed_no:"Der Strang ist zu, weil sein Stellantrieb Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_open_valve:"Das Ventil meldet, dass es offen ist.",x_closed_valve:"Das Ventil meldet, dass es zu ist.",x_valve_unknown:"Der Stellantrieb meldet gerade keinen Zustand. Heizzentrale behandelt den Strang als m\xF6glicherweise offen.",x_no_valve:"Dieser Strang hat keinen Stellantrieb und ist deshalb immer offen.",x_rooms_on:"R\xE4ume an diesem Strang: {rooms}.",x_room_heating:"{name} heizt gerade: Es hat {current} und soll {target} haben.",x_room_idle:"{name} heizt nicht: Es hat {current}, Soll {target}.",x_room_off:"{name} ist ausgeschaltet.",x_room_unavailable:"Das Thermostat von {name} ist gerade nicht erreichbar.",x_room_window:"Ein Fenster ist offen, deshalb pausiert die Heizung hier.",x_room_preset:"Aktives Preset: {preset}.",x_room_circuit:"Die Heizk\xF6rper h\xE4ngen am Strang {circuit}.",x_buffer:"{name} speichert hei\xDFes Wasser, damit der W\xE4rmeerzeuger nicht f\xFCr jeden kleinen Bedarf starten muss. Oben sammelt sich das hei\xDFe Wasser.",x_buffer_mean:"Mittlere Temperatur: {mean}.",x_source:"{name} erzeugt die W\xE4rme f\xFCr das Haus. Status: {status}.",x_source_temp:"Temperatur: {temp}.",x_mode_observe:"Beobachtungsmodus: Heizzentrale misst und erkl\xE4rt, schaltet aber nichts.",x_mode_off:"Aus: Heizzentrale misst nur.",settings:"Einstellungen",back:"Zur\xFCck zum Haus",circuit:"Strang",why:"Was gerade passiert",room_turn_off:"Heizung in diesem Raum ausschalten",room_turn_on:"Heizung in diesem Raum einschalten",open_thermostat:"Details zum Thermostat \xF6ffnen",set_mode:"Betriebsart",set_mode_active:"Eine Betriebsart, die selbst schaltet, kommt sp\xE4ter und erst nach deinem OK.",set_sources:"W\xE4rmeerzeuger",set_buffers:"Pufferspeicher",set_circuits:"Str\xE4nge",set_rooms:"R\xE4ume",none_yet:"Noch nichts angelegt.",n_rooms:"{count} R\xE4ume",one_room:"1 Raum",n_sensors:"{count} F\xFChler",valve_nc:"Stellantrieb stromlos zu",valve_no:"Stellantrieb stromlos offen",valve_none:"kein Stellantrieb",has_window:"Fensterkontakt",warn_no_sensor:"Kein Temperaturf\xFChler zugewiesen.",warn_no_pipe_sensors:"Vorlauf- oder R\xFCcklauff\xFChler fehlt, deshalb gibt es keine Spreizung.",warn_no_rooms:"Noch kein Raum h\xE4ngt an diesem Strang.",warn_no_circuit:"Kein Strang zugewiesen, deshalb f\xFChrt keine Leitung zu diesem Raum.",warn_no_floor:"Kein Stockwerk gefunden. Weise das Thermostat in Home Assistant einem Bereich mit Stockwerk zu.",edit_parts:"Teile hinzuf\xFCgen oder \xE4ndern",edit_hint:"\xD6ffnet die Heizzentrale-Seite von Home Assistant. Dort werden W\xE4rmeerzeuger, Puffer, Str\xE4nge und R\xE4ume angelegt und ge\xE4ndert.",editor_plant:"Anlage",editor_title:"Titel (optional)",editor_first:"Erste Anlage"};function ge(o){let t=(o??"en").toLowerCase().startsWith("de")?Qe:Ne;return(e,i={})=>(t[e]??Ne[e]??e).replace(/\{(\w+)\}/g,(s,n)=>i[n]??"")}var ie=["#3b82f6","#14b8a6","#a855f7","#f59e0b","#ec4899","#84cc16","#6366f1","#f97316"];function W(o,t=7){let e=n=>Math.round(n*10)/10,i=`M${e(o[0][0])} ${e(o[0][1])}`;for(let n=1;n<o.length-1;n++){let[r,a]=o[n-1],[d,h]=o[n],[c,l]=o[n+1],m=Math.hypot(d-r,h-a),_=Math.hypot(c-d,l-h),g=Math.min(t,m/2,_/2);if(g<.5){i+=` L${e(d)} ${e(h)}`;continue}i+=` L${e(d-(d-r)/m*g)} ${e(h-(h-a)/m*g)}`,i+=` Q${e(d)} ${e(h)} ${e(d+(c-d)/_*g)} ${e(h+(l-h)/_*g)}`}let s=o[o.length-1];return`${i} L${e(s[0])} ${e(s[1])}`}var Ye=new Set(["on","heat","heating","running","true"]),G=class extends A{constructor(){super(...arguments);this._config={};this._loading=!1;this._watched=new Set;this._view="house";this._pipes=[];this._pipeSignature=""}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("heizzentrale-house-card-editor")}setConfig(e){this._config={...e}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}set hass(e){let i=this._hass;if(this._hass=e,!this._plants&&!this._loading){this._load();return}if(!i){this.requestUpdate();return}for(let s of this._watched)if(i.states[s]!==e.states[s]){this.requestUpdate();return}i.language!==e.language&&this.requestUpdate()}get hass(){return this._hass}async _load(){if(this._hass){this._loading=!0;try{let e=await this._hass.callWS({type:"heizzentrale/plants"});this._plants=e.plants,this._error=void 0}catch(e){this._error=e?.message??String(e),this._plants=[]}finally{this._loading=!1}}}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect(),this._observed=void 0}updated(){let e=this.renderRoot.querySelector(".house")??void 0;e!==this._observed&&(this._resize?.disconnect(),this._observed=e,e&&typeof ResizeObserver<"u"&&(this._resize??=new ResizeObserver(()=>this._measurePipes()),this._resize.observe(e))),this._measurePipes()}_lanes(e){return e.circuits.filter(i=>e.rooms.some(s=>s.circuit===i.id))}_measurePipes(){let e=this.renderRoot.querySelector(".house"),i=this._plant(),s=[];if(e&&i){let r=e.getBoundingClientRect(),a=y=>{let f=y.getBoundingClientRect();return{top:f.top-r.top,bottom:f.bottom-r.top,center:(f.left+f.right)/2-r.left,left:f.left-r.left}},d=y=>{let f=new Map;for(let b of y){let x=Math.round(b.bottom);f.set(x,[...f.get(x)??[],b])}return[...f.entries()].sort((b,x)=>b[0]-x[0]).map(b=>b[1])},h=[...e.querySelectorAll("[data-part]")].map(a),c=i.circuits.some(y=>this._circuitOpen(y)!==!1),l="var(--hz-hot)",m;for(let y of d(h)){let f=y[0].bottom+8,b=y[0],x=y[y.length-1];m!==void 0&&s.push({d:W([[b.center,m],[b.center,f]]),color:l,active:c}),y.length>1&&s.push({d:W([[b.center,b.bottom-6],[b.center,f],[x.center,f],[x.center,x.bottom-6]]),color:l,active:c});for(let k of y.slice(1,-1))s.push({d:W([[k.center,f],[k.center,k.bottom-6]]),color:l,active:c});m=f}let _=this._lanes(i),g=e.querySelector(".walls"),O=e.querySelector(".parts"),w=g?a(g).left+2:0,E=O?a(O).top:0;_.forEach((y,f)=>{let b=ie[i.circuits.indexOf(y)%ie.length],x=this._circuitOpen(y)!==!1,k=w+9+f*6,se=[...e.querySelectorAll(`[data-circuit="${y.id}"]`)].map(z=>({...a(z),heating:z.classList.contains("heating")})),U;for(let z of d(se)){let C=z[0].bottom+6+f*4;U=Math.min(U??C,C),z.sort((T,Ue)=>T.center-Ue.center);let L=z[z.length-1];s.push({d:W([[k,C],[L.center,C],[L.center,L.bottom-6]]),color:b,active:x&&z.some(T=>T.heating)});for(let T of z.slice(0,-1))s.push({d:W([[T.center,C],[T.center,T.bottom-6]]),color:b,active:x&&T.heating})}let v=e.querySelector(`[data-part="circuit:${y.id}"]`);if(v&&U!==void 0){let z=a(v),C=E-7-f*4,L=z.center+(f-(_.length-1)/2)*6;s.push({d:W([[L,z.top+6],[L,C],[k,C],[k,U]]),color:b,active:x})}})}let n=JSON.stringify(s);n!==this._pipeSignature&&(this._pipeSignature=n,this._pipes=s)}_renderPipes(){return u`<svg class="pipes" aria-hidden="true">
      ${this._pipes.map(e=>$`
          <path class="tube ${e.active?"active":""}" d=${e.d} style="stroke:${e.color}"/>
          ${e.active?$`<path class="flow" d=${e.d} style="stroke:${e.color}"/>`:p}`)}
    </svg>`}get _t(){return ge(this._hass?.locale?.language??this._hass?.language)}_state(e){if(e)return this._watched.add(e),this._hass?.states[e]}_number(e){let i=this._state(e);if(!i)return;let s=Number(i.state);return i.state!==""&&Number.isFinite(s)?s:void 0}_format(e,i,s=1){if(e===void 0)return"\u2013";let n=this._hass?.locale?.language??this._hass?.language??"en",r=new Intl.NumberFormat(n,{minimumFractionDigits:s,maximumFractionDigits:s}).format(e);return i?`${r} ${i}`:r}_temp(e){let s=this._state(e)?.attributes.unit_of_measurement??"\xB0C";return this._format(this._number(e),s)}_plant(){if(this._plants?.length)return this._plants.find(e=>e.entry_id===this._config.entry_id)??this._plants[0]}_circuitOpen(e){if(!e.valve_entity)return!0;let i=this._state(e.open_entity)?.state;if(i==="on")return!0;if(i==="off")return!1}_select(e){let i=this._selection&&this._selection.kind===e.kind&&this._selection.id===e.id;this._selection=i?void 0:e}_key(e,i){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(i))}_isSelected(e,i){let s=this._selection;return!!s&&s.kind===e&&s.id===i}render(){this._watched.clear();let e=this._t;if(!this._plants)return u`<ha-card><div class="note">${e("loading")}</div></ha-card>`;let i=this._plant();if(!i)return u`<ha-card
        ><div class="note">${this._error??e("no_plant")}</div></ha-card
      >`;let s=!i.rooms.length&&!i.circuits.length&&!i.buffers.length&&!i.heat_sources.length,n=new Map;return i.circuits.forEach((r,a)=>n.set(r.id,ie[a%ie.length])),u`
      <ha-card>
        ${this._renderHeader(i)}
        ${s&&this._view==="house"?u`<div class="note">${e("empty")}</div>`:p}
        ${this._view==="settings"?this._renderSettings(i,n):u`${s?p:this._renderHouse(i,n)}
            ${this._renderExplanation(i)} ${this._renderRoomDialog(i,n)}`}
      </ha-card>
    `}_renderHeader(e){let i=this._t,s=this._state(e.mode_entity)?.state,n=e.outdoor_entity?u`<span class="chip" title=${i("outdoor")}
          >${i("outdoor")} ${this._temp(e.outdoor_entity)}</span
        >`:p,r=s==="observe"||s==="off"?u`<button
            class="chip mode ${s}"
            @click=${()=>this._select({kind:"mode"})}
          >
            ${i(s==="observe"?"mode_observe":"mode_off")}
          </button>`:p;return u`
      <div class="header">
        <h2>${this._config.title||e.name}</h2>
        <div class="chips">
          ${n}${r}
          <button
            class="chip icon ${this._view==="settings"?"on":""}"
            aria-label=${i(this._view==="settings"?"back":"settings")}
            title=${i(this._view==="settings"?"back":"settings")}
            @click=${()=>{this._selection=void 0,this._view=this._view==="settings"?"house":"settings"}}
          >
            ${this._view==="settings"?tt:et}
          </button>
        </div>
      </div>
    `}_renderHouse(e,i){let s=this._t,n=new Set(e.floors.map(l=>l.id)),r=(l,m)=>m.length?u`
            <section class="storey">
              ${l?u`<div class="floor-name">${l}</div>`:p}
              <div class="rooms">
                ${m.map(_=>this._renderRoom(e,_,i))}
              </div>
            </section>
          `:p,a=l=>e.rooms.filter(m=>m.floor===l),d=e.floors.filter(l=>(l.level??0)>=0),h=e.floors.filter(l=>(l.level??0)<0),c=e.rooms.filter(l=>!l.floor||!n.has(l.floor));return u`
      <div class="house" style="--hz-lanes:${this._lanes(e).length}">
        ${this._renderPipes()}
        <div class="roof">${st}</div>
        <div class="walls">
          ${d.map(l=>r(l.name,a(l.id)))}
          ${r(e.floors.length?s("other_rooms"):"",c)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${h.map(l=>r(l.name,a(l.id)))}
          ${this._renderPlantRoom(e,i)}
        </div>
      </div>
    `}_renderRoom(e,i,s){let n=this._t,r=this._state(i.climate_entity),a=r?.attributes??{},d=!r||r.state==="unavailable"||r.state==="unknown",h=a.hvac_action==="heating",c=this._state(i.window_entity)?.state==="on",l="\xB0",m=a.current_temperature,_=a.temperature,g=a.preset_mode&&a.preset_mode!=="none"?String(a.preset_mode):void 0,O=e.circuits.find(E=>E.id===i.circuit),w={kind:"room",id:i.id};return u`
      <div
        class="room ${h?"heating":""} ${d?"off":""}
          ${this._isSelected("room",i.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-circuit=${O?.id??p}
        @click=${()=>this._select(w)}
        @keydown=${E=>this._key(E,w)}
      >
        <div class="room-top">
          <span class="room-name"
            >${O?u`<span class="dot" style="background:${s.get(O.id)}"></span>`:p}${i.name}</span
          >
          <span class="icons">
            ${c?u`<span class="badge window" title=${n("window_open")}
                  >${it}</span
                >`:p}
            ${h?u`<span class="badge flame" title=${n("heating")}
                  >${Xe}</span
                >`:p}
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
            >${n("target")}
            ${r?.state==="off"?"\u2013":this._format(typeof _=="number"?_:void 0,"")}${l}</span
          >
          ${g?u`<span class="preset">${this._presetLabel(r,g)}</span>`:p}
        </div>
      </div>
    `}_renderPlantRoom(e,i){let s=this._t;if(!e.heat_sources.length&&!e.buffers.length&&!e.circuits.length)return p;let n=e.circuits.some(r=>this._circuitOpen(r)!==!1);return u`
      <section class="storey plant-room">
        <div class="floor-name">${s("plant_room")}</div>
        <div class="parts">
          ${e.heat_sources.map(r=>this._renderSource(r,n))}
          ${e.buffers.map(r=>this._renderBuffer(r,n))}
          ${e.circuits.map(r=>this._renderCircuit(r,i.get(r.id)??"gray"))}
        </div>
      </section>
    `}_part(e,i,s,n=""){return u`
      <div
        class="part ${i?"flowing":""} ${n}
          ${this._isSelected(e.kind,e.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-part="${e.kind}:${e.id}"
        @click=${()=>this._select(e)}
        @keydown=${r=>this._key(r,e)}
      >
        ${s}
      </div>
    `}_sourceActive(e){let i=this._state(e.status_entity)?.state?.toLowerCase();return!!i&&Ye.has(i)}_renderSource(e,i){let s=this._t,n=this._sourceActive(e);return this._part({kind:"source",id:e.id},i,u`
        <div class="part-name">${e.name}</div>
        <div class="figure">${nt(n)}</div>
        <div class="big">
          ${e.temperature_entity?this._temp(e.temperature_entity):e.flow_entity?this._temp(e.flow_entity):"\u2013"}
        </div>
        <div class="sub">
          ${s(n?"running":`kind_${e.kind}`)}
        </div>
      `)}_renderBuffer(e,i){let s=e.sensor_entities.map(n=>this._number(n));return this._part({kind:"buffer",id:e.id},i,u`
        <div class="part-name">${e.name}</div>
        <div class="figure buffer-figure">
          ${ot(s)}
          <div class="tank-values">
            ${e.sensor_entities.map(n=>u`<span>${this._temp(n)}</span>`)}
          </div>
        </div>
        <div class="sub">
          ${e.volume?`${this._format(e.volume,"l",0)}`:p}
        </div>
      `)}_renderCircuit(e,i){let s=this._t,n=this._circuitOpen(e),r=this._number(e.spread_entity),a=n===void 0?"unknown":n?"open":"closed";return this._part({kind:"circuit",id:e.id},n!==!1,u`
        <div class="part-name">
          <span class="dot" style="background:${i}"></span>${e.name}
        </div>
        <div class="figure">${at(a)}</div>
        <div class="big">
          ${r===void 0?"\u2013":`\u0394 ${this._format(r,"K")}`}
        </div>
        <div class="pair">
          <span class="hot">${this._temp(e.flow_entity)}</span>
          <span class="cold">${this._temp(e.return_entity)}</span>
        </div>
        <div class="sub status-${a}">${s(a)}</div>
      `,`circuit-${a}`)}_explain(e,i){let s=this._t,n="",r=[];if(i.kind==="mode"){let a=this._state(e.mode_entity)?.state;n=s(a==="off"?"mode_off":"mode_observe"),r=[s(a==="off"?"x_mode_off":"x_mode_observe")]}else if(i.kind==="circuit"){let a=e.circuits.find(l=>l.id===i.id);if(!a)return;n=a.name,r.push(s("x_what_circuit",{name:a.name,system:s(`system_${a.system_type}`)}));let d=this._number(a.spread_entity);r.push(d===void 0?s("x_no_spread"):s("x_spread",{flow:this._temp(a.flow_entity),ret:this._temp(a.return_entity),spread:this._format(d,"K")}));let h=this._circuitOpen(a);a.valve_entity?h===void 0?r.push(s("x_valve_unknown")):a.valve_entity.startsWith("valve.")?r.push(s(h?"x_open_valve":"x_closed_valve")):r.push(s(`x_${h?"open":"closed"}_${a.valve_type==="no"?"no":"nc"}`)):r.push(s("x_no_valve"));let c=e.rooms.filter(l=>l.circuit===a.id).map(l=>l.name);c.length&&r.push(s("x_rooms_on",{rooms:c.join(", ")}))}else if(i.kind==="room"){let a=e.rooms.find(m=>m.id===i.id);if(!a)return;n=a.name;let d=this._state(a.climate_entity),h=d?.attributes??{},c={name:a.name,current:this._format(h.current_temperature,"\xB0C"),target:this._format(h.temperature,"\xB0C")};!d||d.state==="unavailable"||d.state==="unknown"?r.push(s("x_room_unavailable",c)):d.state==="off"?r.push(s("x_room_off",c)):h.hvac_action==="heating"?r.push(s("x_room_heating",c)):r.push(s("x_room_idle",c)),this._state(a.window_entity)?.state==="on"&&r.push(s("x_room_window")),h.preset_mode&&h.preset_mode!=="none"&&r.push(s("x_room_preset",{preset:this._presetLabel(d,String(h.preset_mode))}));let l=e.circuits.find(m=>m.id===a.circuit);l&&r.push(s("x_room_circuit",{circuit:l.name}))}else if(i.kind==="buffer"){let a=e.buffers.find(d=>d.id===i.id);if(!a)return;n=a.name,r.push(s("x_buffer",{name:a.name})),this._number(a.mean_entity)!==void 0&&r.push(s("x_buffer_mean",{mean:this._temp(a.mean_entity)}))}else{let a=e.heat_sources.find(c=>c.id===i.id);if(!a)return;n=a.name;let d=this._state(a.status_entity)?.state;r.push(s("x_source",{name:a.name,status:this._sourceActive(a)?s("running"):d??s("unknown")}));let h=a.temperature_entity??a.flow_entity;h&&r.push(s("x_source_temp",{temp:this._temp(h)}))}return{title:n,lines:r}}_presetLabel(e,i){return e&&this._hass?.formatEntityAttributeValue?this._hass.formatEntityAttributeValue(e,"preset_mode",i):i}_renderExplanation(e){let i=this._selection;if(!i||i.kind==="room")return p;let s=this._explain(e,i);return s?u`
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
        ${s.lines.map(n=>u`<p>${n}</p>`)}
      </div>
    `:p}_call(e,i,s){this._hass?.callService?.(e,i,s)}_setTarget(e,i,s,n){let r=Math.round(Math.min(n,Math.max(s,i))*10)/10;this._pendingTarget={entity:e,value:r},window.clearTimeout(this._targetTimer),this._targetTimer=window.setTimeout(()=>{this._call("climate","set_temperature",{entity_id:e,temperature:r}),this._targetTimer=window.setTimeout(()=>this._pendingTarget=void 0,2500)},700)}_renderRoomDialog(e,i){let s=this._selection;if(!s||s.kind!=="room")return p;let n=e.rooms.find(v=>v.id===s.id);if(!n?.climate_entity)return p;let r=this._t,a=n.climate_entity,d=this._state(a),h=d?.attributes??{},c=!!d&&d.state!=="unavailable"&&d.state!=="unknown",l=d?.state==="off",m=Number(h.target_temp_step)||.5,_=typeof h.min_temp=="number"?h.min_temp:5,g=typeof h.max_temp=="number"?h.max_temp:30,w=(this._pendingTarget?.entity===a?this._pendingTarget.value:void 0)??(typeof h.temperature=="number"?h.temperature:void 0),E=Array.isArray(h.preset_modes)?h.preset_modes.filter(v=>v!=="none"):[],y=Array.isArray(h.hvac_modes)?h.hvac_modes:[],f=["heat","auto","heat_cool"].find(v=>y.includes(v)),b=e.circuits.find(v=>v.id===n.circuit),x=e.floors.find(v=>v.id===n.floor),k=()=>this._selection=void 0,se=this._explain(e,s)?.lines??[],U=[b?`${r("circuit")} ${b.name}`:"",x?.name??""].filter(Boolean).join(" \xB7 ");return u`
      <div class="backdrop" @click=${k}>
        <div
          class="sheet"
          role="dialog"
          aria-modal="true"
          aria-label=${n.name}
          @click=${v=>v.stopPropagation()}
          @keydown=${v=>v.key==="Escape"&&k()}
        >
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${n.name}</div>
              <div class="sheet-sub">
                ${b?u`<span class="dot" style="background:${i.get(b.id)}"></span>`:p}${U}
              </div>
            </div>
            <button class="close" aria-label=${r("close")} @click=${k}>✕</button>
          </div>
          <div class="sheet-now ${h.hvac_action==="heating"?"heating":""}">
            <span class="now-value"
              >${this._format(typeof h.current_temperature=="number"?h.current_temperature:void 0,"")}°</span
            >
            <span class="now-label"
              >${h.hvac_action==="heating"?r("heating"):r(l?"mode_off":"idle")}</span
            >
          </div>
          <div class="stepper">
            <button
              aria-label="−"
              ?disabled=${!c||l||w===void 0||w<=_}
              @click=${()=>this._setTarget(a,(w??_)-m,_,g)}
            >
              −
            </button>
            <div class="stepper-value">
              <span>${l?"\u2013":`${this._format(w,"")}\xB0`}</span>
              <small>${r("target")}</small>
            </div>
            <button
              aria-label="+"
              ?disabled=${!c||l||w===void 0||w>=g}
              @click=${()=>this._setTarget(a,(w??_)+m,_,g)}
            >
              +
            </button>
          </div>
          ${E.length?u`<div class="choices">
                ${E.map(v=>u`<button
                      class="choice ${h.preset_mode===v?"on":""}"
                      ?disabled=${!c||l}
                      @click=${()=>this._call("climate","set_preset_mode",{entity_id:a,preset_mode:v})}
                    >
                      ${this._presetLabel(d,v)}
                    </button>`)}
              </div>`:p}
          ${y.includes("off")&&f?u`<button
                class="wide"
                ?disabled=${!c}
                @click=${()=>this._call("climate","set_hvac_mode",{entity_id:a,hvac_mode:l?f:"off"})}
              >
                ${r(l?"room_turn_on":"room_turn_off")}
              </button>`:p}
          <div class="why">
            <div class="why-title">${r("why")}</div>
            ${se.map(v=>u`<p>${v}</p>`)}
          </div>
          <button
            class="link"
            @click=${()=>{k(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:a},bubbles:!0,composed:!0}))}}
          >
            ${r("open_thermostat")}
          </button>
        </div>
      </div>
    `}_navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}_renderSettings(e,i){let s=this._t,n=this._state(e.mode_entity),r=Array.isArray(n?.attributes.options)?n.attributes.options:[],a=(c,l,m,_)=>u`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${_?u`<span class="dot" style="background:${_}"></span>`:p}${c}</span
          >
          <span class="row-detail">${l}</span>
        </div>
        ${m.map(g=>u`<div class="row-warn">${g}</div>`)}
      </li>
    `,d=(c,l)=>u`
      <section class="set">
        <h3>${c}</h3>
        ${l.length?u`<ul>${l}</ul>`:u`<p class="hint">${s("none_yet")}</p>`}
      </section>
    `,h=c=>c.filter(Boolean).join(" \xB7 ");return u`
      <div class="settings">
        <section class="set">
          <h3>${s("set_mode")}</h3>
          <div class="choices">
            ${r.map(c=>u`<button
                  class="choice ${n?.state===c?"on":""}"
                  @click=${()=>this._call("select","select_option",{entity_id:e.mode_entity,option:c})}
                >
                  ${s(`mode_${c}`)}
                </button>`)}
          </div>
          <p class="hint">
            ${s(n?.state==="off"?"x_mode_off":"x_mode_observe")}
            ${s("set_mode_active")}
          </p>
        </section>
        ${d(s("set_sources"),e.heat_sources.map(c=>a(c.name,s(`kind_${c.kind}`),c.temperature_entity||c.flow_entity?[]:[s("warn_no_sensor")])))}
        ${d(s("set_buffers"),e.buffers.map(c=>a(c.name,h([c.volume?this._format(c.volume,"l",0):"",s("n_sensors",{count:String(c.sensor_entities.length)})]),c.sensor_entities.length?[]:[s("warn_no_sensor")])))}
        ${d(s("set_circuits"),e.circuits.map(c=>{let l=e.rooms.filter(m=>m.circuit===c.id).length;return a(c.name,h([s(`system_${c.system_type}`),c.valve_entity?s(c.valve_type==="no"?"valve_no":"valve_nc"):s("valve_none"),l===1?s("one_room"):s("n_rooms",{count:String(l)})]),[...c.flow_entity&&c.return_entity?[]:[s("warn_no_pipe_sensors")],...l?[]:[s("warn_no_rooms")]],i.get(c.id))}))}
        ${d(s("set_rooms"),e.rooms.map(c=>{let l=e.circuits.find(_=>_.id===c.circuit),m=e.floors.find(_=>_.id===c.floor);return a(c.name,h([l&&`${s("circuit")} ${l.name}`,m?.name,c.window_entity&&s("has_window")]),[...l||!e.circuits.length?[]:[s("warn_no_circuit")],...m?[]:[s("warn_no_floor")]],l?i.get(l.id):void 0)}))}
        <section class="set">
          <button
            class="wide primary"
            @click=${()=>this._navigate("/config/integrations/integration/heizzentrale")}
          >
            ${s("edit_parts")}
          </button>
          <p class="hint">${s("edit_hint")}</p>
        </section>
      </div>
    `}};G.properties={_plants:{state:!0},_error:{state:!0},_selection:{state:!0},_config:{state:!0},_pipes:{state:!0},_view:{state:!0},_pendingTarget:{state:!0}},G.styles=X`
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
  `;var Xe=$`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.5 5-2.5 7C8.4 11 9 12.5 9 12.5S7 12 6.6 9.8C4.9 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"/></svg>`,et=$`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.1a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.700 1.700 0 0 0 1.800.3h.1a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.1a1.700 1.700 0 0 0-.3 1.800v.1a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/></svg>`,tt=$`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.500"/><path d="M5.500 10v10h13V10"/></svg>`,it=$`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`,st=$`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;function nt(o){return $`<svg viewBox="0 0 44 56" aria-hidden="true">
    <rect x="4" y="3" width="36" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
    <rect x="11" y="9" width="22" height="7" rx="2" fill="currentColor" opacity="0.25"/>
    <path transform="translate(10 22)" d="M12 2c1 3.5-1.500 5-2.500 7C8.400 11 9 12.500 9 12.500S7 12 6.600 9.800C4.900 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"
      fill=${o?"var(--hz-hot)":"currentColor"} opacity=${o?"1":"0.25"}/>
  </svg>`}function rt(o){return o===void 0?"var(--divider-color, #ccc)":`color-mix(in srgb, var(--hz-hot) ${(Math.max(0,Math.min(1,(o-25)/50))*100).toFixed(0)}%, var(--hz-cold))`}function ot(o){let t=o.length?o:[void 0],e=44/t.length;return $`<svg viewBox="0 0 32 56" aria-hidden="true">
    <defs><clipPath id="hz-tank"><rect x="4" y="6" width="24" height="44" rx="9"/></clipPath></defs>
    <g clip-path="url(#hz-tank)">
      ${t.map((i,s)=>$`<rect x="4" y=${6+s*e} width="24" height=${e+.5} fill=${rt(i)}/>`)}
    </g>
    <rect x="4" y="6" width="24" height="44" rx="9" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  </svg>`}function at(o){let t=o==="open"?"var(--hz-ok)":o==="unknown"?"var(--hz-warn)":"currentColor",e=o==="closed"?"0.35":"1";return $`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M6 22 L28 34 L6 46 Z M50 22 L28 34 L50 46 Z" fill=${o==="open"?t:"none"}
      stroke=${t} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
    <path d="M28 34 V16 M19 16 H37" stroke=${t} stroke-width="2.5" stroke-linecap="round" opacity=${e}/>
    ${o==="closed"?$`<path d="M14 48 L42 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`:p}
  </svg>`}var J=class extends A{constructor(){super(...arguments);this._config={}}setConfig(e){this._config={...e}}set hass(e){this._hass=e,this._plants||(this._plants=[],e.callWS({type:"heizzentrale/plants"}).then(i=>this._plants=i.plants).catch(()=>{}))}_change(e,i){let s={...this._config};i?s[e]=i:delete s[e],this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}render(){let e=ge(this._hass?.locale?.language??this._hass?.language);return u`
      <label>
        ${e("editor_plant")}
        <select
          @change=${i=>this._change("entry_id",i.target.value)}
        >
          <option value="" ?selected=${!this._config.entry_id}>
            ${e("editor_first")}
          </option>
          ${(this._plants??[]).map(i=>u`<option
                value=${i.entry_id}
                ?selected=${i.entry_id===this._config.entry_id}
              >
                ${i.name}
              </option>`)}
        </select>
      </label>
      <label>
        ${e("editor_title")}
        <input
          type="text"
          .value=${this._config.title??""}
          @input=${i=>this._change("title",i.target.value)}
        />
      </label>
    `}};J.properties={_config:{state:!0},_plants:{state:!0}},J.styles=X`
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
  `;customElements.get("heizzentrale-house-card")||(customElements.define("heizzentrale-house-card",G),customElements.define("heizzentrale-house-card-editor",J),(window.customCards??=[]).push({type:"heizzentrale-house-card",name:"Heizzentrale",description:"House view: rooms per floor, heat source, buffer and circuits.",preview:!1}));
