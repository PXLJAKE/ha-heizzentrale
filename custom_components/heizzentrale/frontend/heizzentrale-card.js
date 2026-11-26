var J=globalThis,Q=J.ShadowRoot&&(J.ShadyCSS===void 0||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),ge=new WeakMap,D=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ge.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ge.set(e,t))}return t}toString(){return this.cssText}},ve=o=>new D(typeof o=="string"?o:o+"",void 0,se),X=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new D(e,o,se)},$e=(o,t)=>{if(Q)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=J.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},ie=Q?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ve(e)})(o):o;var{is:Le,defineProperty:De,getOwnPropertyDescriptor:We,getOwnPropertyNames:Be,getOwnPropertySymbols:je,getPrototypeOf:Fe}=Object,Y=globalThis,ye=Y.trustedTypes,Ie=ye?ye.emptyScript:"",Ve=Y.reactiveElementPolyfillSupport,W=(o,t)=>o,re={toAttribute(o,t){switch(t){case Boolean:o=o?Ie:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},xe=(o,t)=>!Le(o,t),be={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:xe};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=be){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&De(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=We(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let a=i?.call(this);n?.call(this,r),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??be}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let t=Fe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let e=this.properties,s=[...Be(e),...je(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(ie(i))}else t!==void 0&&e.push(ie(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:re).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:re;this._$Em=i;let a=r.fromAttribute(e,n.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let r=this.constructor;if(i===!1&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??xe)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:r}=n,a=this[i];r!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[W("elementProperties")]=new Map,w[W("finalized")]=new Map,Ve?.({ReactiveElement:w}),(Y.reactiveElementVersions??=[]).push("2.1.2");var he=globalThis,we=o=>o,ee=he.trustedTypes,Se=ee?ee.createPolicy("lit-html",{createHTML:o=>o}):void 0,Pe="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,Oe="?"+z,Ke=`<${Oe}>`,O=document,j=()=>O.createComment(""),F=o=>o===null||typeof o!="object"&&typeof o!="function",pe=Array.isArray,qe=o=>pe(o)||typeof o?.[Symbol.iterator]=="function",ne=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,ke=/>/g,E=RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ze=/'/g,Ce=/"/g,Te=/^(?:script|style|textarea|title)$/i,ue=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),m=ue(1),x=ue(2),dt=ue(3),T=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Ee=new WeakMap,P=O.createTreeWalker(O,129);function He(o,t){if(!pe(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Se!==void 0?Se.createHTML(t):t}var Ze=(o,t)=>{let e=o.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",r=B;for(let a=0;a<e;a++){let l=o[a],d,p,c=-1,u=0;for(;u<l.length&&(r.lastIndex=u,p=r.exec(l),p!==null);)u=r.lastIndex,r===B?p[1]==="!--"?r=Ae:p[1]!==void 0?r=ke:p[2]!==void 0?(Te.test(p[2])&&(i=RegExp("</"+p[2],"g")),r=E):p[3]!==void 0&&(r=E):r===E?p[0]===">"?(r=i??B,c=-1):p[1]===void 0?c=-2:(c=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?E:p[3]==='"'?Ce:ze):r===Ce||r===ze?r=E:r===Ae||r===ke?r=B:(r=E,i=void 0);let f=r===E&&o[a+1].startsWith("/>")?" ":"";n+=r===B?l+Ke:c>=0?(s.push(d),l.slice(0,c)+Pe+l.slice(c)+z+f):l+z+(c===-2?a:f)}return[He(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},I=class o{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0,a=t.length-1,l=this.parts,[d,p]=Ze(t,e);if(this.el=o.createElement(d,s),P.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=P.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(Pe)){let u=p[r++],f=i.getAttribute(c).split(z),v=/([.?@])?(.*)/.exec(u);l.push({type:1,index:n,name:v[2],strings:f,ctor:v[1]==="."?ae:v[1]==="?"?le:v[1]==="@"?ce:N}),i.removeAttribute(c)}else c.startsWith(z)&&(l.push({type:6,index:n}),i.removeAttribute(c));if(Te.test(i.tagName)){let c=i.textContent.split(z),u=c.length-1;if(u>0){i.textContent=ee?ee.emptyScript:"";for(let f=0;f<u;f++)i.append(c[f],j()),P.nextNode(),l.push({type:2,index:++n});i.append(c[u],j())}}}else if(i.nodeType===8)if(i.data===Oe)l.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(z,c+1))!==-1;)l.push({type:7,index:n}),c+=z.length-1}n++}}static createElement(t,e){let s=O.createElement("template");return s.innerHTML=t,s}};function M(o,t,e=o,s){if(t===T)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=F(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=M(o,i._$AS(o,t.values),i,s)),t}var oe=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);P.currentNode=i;let n=P.nextNode(),r=0,a=0,l=s[0];for(;l!==void 0;){if(r===l.index){let d;l.type===2?d=new V(n,n.nextSibling,this,t):l.type===1?d=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(d=new de(n,this,t)),this._$AV.push(d),l=s[++a]}r!==l?.index&&(n=P.nextNode(),r++)}return P.currentNode=O,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},V=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),F(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=I.createElement(He(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new oe(i,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Ee.get(t.strings);return e===void 0&&Ee.set(t.strings,e=new I(t)),e}k(t){pe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new o(this.O(j()),this.O(j()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=we(t).nextSibling;we(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,e=this,s,i){let n=this.strings,r=!1;if(n===void 0)t=M(this,t,e,0),r=!F(t)||t!==this._$AH&&t!==T,r&&(this._$AH=t);else{let a=t,l,d;for(t=n[0],l=0;l<n.length-1;l++)d=M(this,a[s+l],e,l),d===T&&(d=this._$AH[l]),r||=!F(d)||d!==this._$AH[l],d===h?t=h:t!==h&&(t+=(d??"")+n[l+1]),this._$AH[l]=d}r&&!i&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ae=class extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},le=class extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},ce=class extends N{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??h)===T)return;let s=this._$AH,i=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},de=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}};var Ge=he.litHtmlPolyfillSupport;Ge?.(I,V),(he.litHtmlVersions??=[]).push("3.3.3");var Re=(o,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new V(t.insertBefore(j(),n),n,void 0,e??{})}return i._$AI(o),i};var me=globalThis,S=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Re(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};S._$litElement$=!0,S.finalized=!0,me.litElementHydrateSupport?.({LitElement:S});var Je=me.litElementPolyfillSupport;Je?.({LitElement:S});(me.litElementVersions??=[]).push("4.2.2");var Me={loading:"Loading plant\u2026",no_plant:"No plant found. Add the Heizzentrale integration under Settings \u2192 Devices & services.",empty:"This plant has no parts yet. Open the integration and add a heat source, circuits and rooms.",mode_observe:"Observing",mode_off:"Off",outdoor:"Outdoor",other_rooms:"Other rooms",plant_room:"Plant room",flow:"Flow",return:"Return",spread:"Spread",target:"Target",heating:"heating",idle:"idle",window_open:"Window open",open:"open",closed:"closed",unknown:"unknown",running:"running",close:"Close",system_two_pipe:"two-pipe",system_one_pipe:"one-pipe",system_underfloor:"underfloor heating",system_other:"circuit",kind_pellet:"Pellet boiler",kind_wood:"Wood boiler",kind_gas:"Gas boiler",kind_oil:"Oil boiler",kind_heat_pump:"Heat pump",kind_district:"District heating",kind_other:"Heat source",x_what_circuit:"{name} is a {system} circuit. Hot water flows to the radiators (flow) and comes back cooler (return).",x_spread:"Flow {flow}, return {ret}: the spread is {spread}. A larger spread means the water gives off more heat on its way.",x_no_spread:"Flow and return sensors are needed to show the spread.",x_open_nc:"The circuit is open because its actuator is powered. Without power this actuator closes (NC).",x_closed_nc:"The circuit is closed because its actuator has no power. Without power this actuator closes (NC).",x_open_no:"The circuit is open because its actuator has no power. Without power this actuator opens (NO).",x_closed_no:"The circuit is closed because its actuator is powered. Without power this actuator opens (NO).",x_open_valve:"The valve reports that it is open.",x_closed_valve:"The valve reports that it is closed.",x_valve_unknown:"The actuator does not report a state right now. Heizzentrale treats the circuit as possibly open.",x_no_valve:"This circuit has no actuator, so it is always open.",x_rooms_on:"Rooms on this circuit: {rooms}.",x_room_heating:"{name} is heating: it is {current} and should be {target}.",x_room_idle:"{name} is not heating: it is {current}, target {target}.",x_room_off:"{name} is switched off.",x_room_unavailable:"The thermostat of {name} is not reachable right now.",x_room_window:"A window is open, so heating is paused here.",x_room_preset:"Active preset: {preset}.",x_room_circuit:"Its radiators are supplied by the circuit {circuit}.",x_buffer:"{name} stores hot water so the heat source does not have to start for every small demand. Hot water collects at the top.",x_buffer_mean:"Mean temperature: {mean}.",x_source:"{name} produces the heat for the house. Status: {status}.",x_source_temp:"Temperature: {temp}.",x_mode_observe:"Observe mode: Heizzentrale measures and explains but does not switch anything.",x_mode_off:"Off: Heizzentrale only measures.",editor_plant:"Plant",editor_title:"Title (optional)",editor_first:"First plant"},Qe={loading:"Anlage wird geladen \u2026",no_plant:"Keine Anlage gefunden. F\xFCge die Integration Heizzentrale unter Einstellungen \u2192 Ger\xE4te & Dienste hinzu.",empty:"Diese Anlage hat noch keine Teile. \xD6ffne die Integration und f\xFCge W\xE4rmeerzeuger, Kreise und R\xE4ume hinzu.",mode_observe:"Beobachtet",mode_off:"Aus",outdoor:"Au\xDFen",other_rooms:"Weitere R\xE4ume",plant_room:"Heizraum",flow:"Vorlauf",return:"R\xFCcklauf",spread:"Spreizung",target:"Soll",heating:"heizt",idle:"ruht",window_open:"Fenster offen",open:"offen",closed:"zu",unknown:"unbekannt",running:"l\xE4uft",close:"Schlie\xDFen",system_two_pipe:"Zweirohr",system_one_pipe:"Einrohr",system_underfloor:"Fu\xDFbodenheizung",system_other:"Kreis",kind_pellet:"Pelletkessel",kind_wood:"Holzkessel",kind_gas:"Gastherme",kind_oil:"\xD6lkessel",kind_heat_pump:"W\xE4rmepumpe",kind_district:"Fernw\xE4rme",kind_other:"W\xE4rmeerzeuger",x_what_circuit:"{name} ist ein Strang ({system}). Hei\xDFes Wasser flie\xDFt zu den Heizk\xF6rpern (Vorlauf) und kommt k\xFChler zur\xFCck (R\xFCcklauf).",x_spread:"Vorlauf {flow}, R\xFCcklauf {ret}: Die Spreizung betr\xE4gt {spread}. Eine gr\xF6\xDFere Spreizung hei\xDFt, das Wasser gibt unterwegs mehr W\xE4rme ab.",x_no_spread:"F\xFCr die Spreizung braucht es einen Vorlauf- und einen R\xFCcklauff\xFChler.",x_open_nc:"Der Strang ist offen, weil sein Stellantrieb Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_closed_nc:"Der Strang ist zu, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_open_no:"Der Strang ist offen, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_closed_no:"Der Strang ist zu, weil sein Stellantrieb Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_open_valve:"Das Ventil meldet, dass es offen ist.",x_closed_valve:"Das Ventil meldet, dass es zu ist.",x_valve_unknown:"Der Stellantrieb meldet gerade keinen Zustand. Heizzentrale behandelt den Strang als m\xF6glicherweise offen.",x_no_valve:"Dieser Strang hat keinen Stellantrieb und ist deshalb immer offen.",x_rooms_on:"R\xE4ume an diesem Strang: {rooms}.",x_room_heating:"{name} heizt gerade: Es hat {current} und soll {target} haben.",x_room_idle:"{name} heizt nicht: Es hat {current}, Soll {target}.",x_room_off:"{name} ist ausgeschaltet.",x_room_unavailable:"Das Thermostat von {name} ist gerade nicht erreichbar.",x_room_window:"Ein Fenster ist offen, deshalb pausiert die Heizung hier.",x_room_preset:"Aktives Preset: {preset}.",x_room_circuit:"Die Heizk\xF6rper h\xE4ngen am Strang {circuit}.",x_buffer:"{name} speichert hei\xDFes Wasser, damit der W\xE4rmeerzeuger nicht f\xFCr jeden kleinen Bedarf starten muss. Oben sammelt sich das hei\xDFe Wasser.",x_buffer_mean:"Mittlere Temperatur: {mean}.",x_source:"{name} erzeugt die W\xE4rme f\xFCr das Haus. Status: {status}.",x_source_temp:"Temperatur: {temp}.",x_mode_observe:"Beobachtungsmodus: Heizzentrale misst und erkl\xE4rt, schaltet aber nichts.",x_mode_off:"Aus: Heizzentrale misst nur.",editor_plant:"Anlage",editor_title:"Titel (optional)",editor_first:"Erste Anlage"};function fe(o){let t=(o??"en").toLowerCase().startsWith("de")?Qe:Me;return(e,s={})=>(t[e]??Me[e]??e).replace(/\{(\w+)\}/g,(i,n)=>s[n]??"")}var te=["#3b82f6","#14b8a6","#a855f7","#f59e0b","#ec4899","#84cc16","#6366f1","#f97316"];function U(o,t=7){let e=n=>Math.round(n*10)/10,s=`M${e(o[0][0])} ${e(o[0][1])}`;for(let n=1;n<o.length-1;n++){let[r,a]=o[n-1],[l,d]=o[n],[p,c]=o[n+1],u=Math.hypot(l-r,d-a),f=Math.hypot(p-l,c-d),v=Math.min(t,u/2,f/2);if(v<.5){s+=` L${e(l)} ${e(d)}`;continue}s+=` L${e(l-(l-r)/u*v)} ${e(d-(d-a)/u*v)}`,s+=` Q${e(l)} ${e(d)} ${e(l+(p-l)/f*v)} ${e(d+(c-d)/f*v)}`}let i=o[o.length-1];return`${s} L${e(i[0])} ${e(i[1])}`}var Xe=new Set(["on","heat","heating","running","true"]),K=class extends S{constructor(){super(...arguments);this._config={};this._loading=!1;this._watched=new Set;this._pipes=[];this._pipeSignature=""}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("heizzentrale-house-card-editor")}setConfig(e){this._config={...e}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}set hass(e){let s=this._hass;if(this._hass=e,!this._plants&&!this._loading){this._load();return}if(!s){this.requestUpdate();return}for(let i of this._watched)if(s.states[i]!==e.states[i]){this.requestUpdate();return}s.language!==e.language&&this.requestUpdate()}get hass(){return this._hass}async _load(){if(this._hass){this._loading=!0;try{let e=await this._hass.callWS({type:"heizzentrale/plants"});this._plants=e.plants,this._error=void 0}catch(e){this._error=e?.message??String(e),this._plants=[]}finally{this._loading=!1}}}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect(),this._observed=void 0}updated(){let e=this.renderRoot.querySelector(".house")??void 0;e!==this._observed&&(this._resize?.disconnect(),this._observed=e,e&&typeof ResizeObserver<"u"&&(this._resize??=new ResizeObserver(()=>this._measurePipes()),this._resize.observe(e))),this._measurePipes()}_lanes(e){return e.circuits.filter(s=>e.rooms.some(i=>i.circuit===s.id))}_measurePipes(){let e=this.renderRoot.querySelector(".house"),s=this._plant(),i=[];if(e&&s){let r=e.getBoundingClientRect(),a=g=>{let _=g.getBoundingClientRect();return{top:_.top-r.top,bottom:_.bottom-r.top,center:(_.left+_.right)/2-r.left,left:_.left-r.left}},l=g=>{let _=new Map;for(let $ of g){let y=Math.round($.bottom);_.set(y,[..._.get(y)??[],$])}return[..._.entries()].sort(($,y)=>$[0]-y[0]).map($=>$[1])},d=[...e.querySelectorAll("[data-part]")].map(a),p=s.circuits.some(g=>this._circuitOpen(g)!==!1),c="var(--hz-hot)",u;for(let g of l(d)){let _=g[0].bottom+8,$=g[0],y=g[g.length-1];u!==void 0&&i.push({d:U([[$.center,u],[$.center,_]]),color:c,active:p}),g.length>1&&i.push({d:U([[$.center,$.bottom-6],[$.center,_],[y.center,_],[y.center,y.bottom-6]]),color:c,active:p});for(let C of g.slice(1,-1))i.push({d:U([[C.center,_],[C.center,C.bottom-6]]),color:c,active:p});u=_}let f=this._lanes(s),v=e.querySelector(".walls"),H=e.querySelector(".parts"),Z=v?a(v).left+2:0,L=H?a(H).top:0;f.forEach((g,_)=>{let $=te[s.circuits.indexOf(g)%te.length],y=this._circuitOpen(g)!==!1,C=Z+9+_*6,Ne=[...e.querySelectorAll(`[data-circuit="${g.id}"]`)].map(b=>({...a(b),heating:b.classList.contains("heating")})),G;for(let b of l(Ne)){let A=b[0].bottom+6+_*4;G=Math.min(G??A,A),b.sort((k,Ue)=>k.center-Ue.center);let R=b[b.length-1];i.push({d:U([[C,A],[R.center,A],[R.center,R.bottom-6]]),color:$,active:y&&b.some(k=>k.heating)});for(let k of b.slice(0,-1))i.push({d:U([[k.center,A],[k.center,k.bottom-6]]),color:$,active:y&&k.heating})}let _e=e.querySelector(`[data-part="circuit:${g.id}"]`);if(_e&&G!==void 0){let b=a(_e),A=L-7-_*4,R=b.center+(_-(f.length-1)/2)*6;i.push({d:U([[R,b.top+6],[R,A],[C,A],[C,G]]),color:$,active:y})}})}let n=JSON.stringify(i);n!==this._pipeSignature&&(this._pipeSignature=n,this._pipes=i)}_renderPipes(){return m`<svg class="pipes" aria-hidden="true">
      ${this._pipes.map(e=>x`
          <path class="tube ${e.active?"active":""}" d=${e.d} style="stroke:${e.color}"/>
          ${e.active?x`<path class="flow" d=${e.d} style="stroke:${e.color}"/>`:h}`)}
    </svg>`}get _t(){return fe(this._hass?.locale?.language??this._hass?.language)}_state(e){if(e)return this._watched.add(e),this._hass?.states[e]}_number(e){let s=this._state(e);if(!s)return;let i=Number(s.state);return s.state!==""&&Number.isFinite(i)?i:void 0}_format(e,s,i=1){if(e===void 0)return"\u2013";let n=this._hass?.locale?.language??this._hass?.language??"en",r=new Intl.NumberFormat(n,{minimumFractionDigits:i,maximumFractionDigits:i}).format(e);return s?`${r} ${s}`:r}_temp(e){let i=this._state(e)?.attributes.unit_of_measurement??"\xB0C";return this._format(this._number(e),i)}_plant(){if(this._plants?.length)return this._plants.find(e=>e.entry_id===this._config.entry_id)??this._plants[0]}_circuitOpen(e){if(!e.valve_entity)return!0;let s=this._state(e.open_entity)?.state;if(s==="on")return!0;if(s==="off")return!1}_select(e){let s=this._selection&&this._selection.kind===e.kind&&this._selection.id===e.id;this._selection=s?void 0:e}_key(e,s){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(s))}_isSelected(e,s){let i=this._selection;return!!i&&i.kind===e&&i.id===s}render(){this._watched.clear();let e=this._t;if(!this._plants)return m`<ha-card><div class="note">${e("loading")}</div></ha-card>`;let s=this._plant();if(!s)return m`<ha-card
        ><div class="note">${this._error??e("no_plant")}</div></ha-card
      >`;let i=!s.rooms.length&&!s.circuits.length&&!s.buffers.length&&!s.heat_sources.length,n=new Map;return s.circuits.forEach((r,a)=>n.set(r.id,te[a%te.length])),m`
      <ha-card>
        ${this._renderHeader(s)}
        ${i?m`<div class="note">${e("empty")}</div>`:h}
        ${i?h:this._renderHouse(s,n)}
        ${this._renderExplanation(s)}
      </ha-card>
    `}_renderHeader(e){let s=this._t,i=this._state(e.mode_entity)?.state,n=e.outdoor_entity?m`<span class="chip" title=${s("outdoor")}
          >${s("outdoor")} ${this._temp(e.outdoor_entity)}</span
        >`:h,r=i==="observe"||i==="off"?m`<button
            class="chip mode ${i}"
            @click=${()=>this._select({kind:"mode"})}
          >
            ${s(i==="observe"?"mode_observe":"mode_off")}
          </button>`:h;return m`
      <div class="header">
        <h2>${this._config.title||e.name}</h2>
        <div class="chips">${n}${r}</div>
      </div>
    `}_renderHouse(e,s){let i=this._t,n=new Set(e.floors.map(c=>c.id)),r=(c,u)=>u.length?m`
            <section class="storey">
              ${c?m`<div class="floor-name">${c}</div>`:h}
              <div class="rooms">
                ${u.map(f=>this._renderRoom(e,f,s))}
              </div>
            </section>
          `:h,a=c=>e.rooms.filter(u=>u.floor===c),l=e.floors.filter(c=>(c.level??0)>=0),d=e.floors.filter(c=>(c.level??0)<0),p=e.rooms.filter(c=>!c.floor||!n.has(c.floor));return m`
      <div class="house" style="--hz-lanes:${this._lanes(e).length}">
        ${this._renderPipes()}
        <div class="roof">${tt}</div>
        <div class="walls">
          ${l.map(c=>r(c.name,a(c.id)))}
          ${r(e.floors.length?i("other_rooms"):"",p)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${d.map(c=>r(c.name,a(c.id)))}
          ${this._renderPlantRoom(e,s)}
        </div>
      </div>
    `}_renderRoom(e,s,i){let n=this._t,r=this._state(s.climate_entity),a=r?.attributes??{},l=!r||r.state==="unavailable"||r.state==="unknown",d=a.hvac_action==="heating",p=this._state(s.window_entity)?.state==="on",c="\xB0",u=a.current_temperature,f=a.temperature,v=a.preset_mode&&a.preset_mode!=="none"?String(a.preset_mode):void 0,H=e.circuits.find(L=>L.id===s.circuit),Z={kind:"room",id:s.id};return m`
      <div
        class="room ${d?"heating":""} ${l?"off":""}
          ${this._isSelected("room",s.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-circuit=${H?.id??h}
        @click=${()=>this._select(Z)}
        @keydown=${L=>this._key(L,Z)}
      >
        <div class="room-top">
          <span class="room-name"
            >${H?m`<span class="dot" style="background:${i.get(H.id)}"></span>`:h}${s.name}</span
          >
          <span class="icons">
            ${p?m`<span class="badge window" title=${n("window_open")}
                  >${et}</span
                >`:h}
            ${d?m`<span class="badge flame" title=${n("heating")}
                  >${Ye}</span
                >`:h}
          </span>
        </div>
        <div class="room-temp">
          ${this._format(typeof u=="number"?u:void 0,"")}<span
            class="unit"
            >${c}</span
          >
        </div>
        <div class="room-bottom">
          <span
            >${n("target")}
            ${r?.state==="off"?"\u2013":this._format(typeof f=="number"?f:void 0,"")}${c}</span
          >
          ${v?m`<span class="preset">${v}</span>`:h}
        </div>
      </div>
    `}_renderPlantRoom(e,s){let i=this._t;if(!e.heat_sources.length&&!e.buffers.length&&!e.circuits.length)return h;let n=e.circuits.some(r=>this._circuitOpen(r)!==!1);return m`
      <section class="storey plant-room">
        <div class="floor-name">${i("plant_room")}</div>
        <div class="parts">
          ${e.heat_sources.map(r=>this._renderSource(r,n))}
          ${e.buffers.map(r=>this._renderBuffer(r,n))}
          ${e.circuits.map(r=>this._renderCircuit(r,s.get(r.id)??"gray"))}
        </div>
      </section>
    `}_part(e,s,i,n=""){return m`
      <div
        class="part ${s?"flowing":""} ${n}
          ${this._isSelected(e.kind,e.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-part="${e.kind}:${e.id}"
        @click=${()=>this._select(e)}
        @keydown=${r=>this._key(r,e)}
      >
        ${i}
      </div>
    `}_sourceActive(e){let s=this._state(e.status_entity)?.state?.toLowerCase();return!!s&&Xe.has(s)}_renderSource(e,s){let i=this._t,n=this._sourceActive(e);return this._part({kind:"source",id:e.id},s,m`
        <div class="part-name">${e.name}</div>
        <div class="figure">${st(n)}</div>
        <div class="big">
          ${e.temperature_entity?this._temp(e.temperature_entity):e.flow_entity?this._temp(e.flow_entity):"\u2013"}
        </div>
        <div class="sub">
          ${i(n?"running":`kind_${e.kind}`)}
        </div>
      `)}_renderBuffer(e,s){let i=e.sensor_entities.map(n=>this._number(n));return this._part({kind:"buffer",id:e.id},s,m`
        <div class="part-name">${e.name}</div>
        <div class="figure buffer-figure">
          ${rt(i)}
          <div class="tank-values">
            ${e.sensor_entities.map(n=>m`<span>${this._temp(n)}</span>`)}
          </div>
        </div>
        <div class="sub">
          ${e.volume?`${this._format(e.volume,"l",0)}`:h}
        </div>
      `)}_renderCircuit(e,s){let i=this._t,n=this._circuitOpen(e),r=this._number(e.spread_entity),a=n===void 0?"unknown":n?"open":"closed";return this._part({kind:"circuit",id:e.id},n!==!1,m`
        <div class="part-name">
          <span class="dot" style="background:${s}"></span>${e.name}
        </div>
        <div class="figure">${nt(a)}</div>
        <div class="big">
          ${r===void 0?"\u2013":`\u0394 ${this._format(r,"K")}`}
        </div>
        <div class="pair">
          <span class="hot">${this._temp(e.flow_entity)}</span>
          <span class="cold">${this._temp(e.return_entity)}</span>
        </div>
        <div class="sub status-${a}">${i(a)}</div>
      `,`circuit-${a}`)}_renderExplanation(e){let s=this._selection;if(!s)return h;let i=this._t,n="",r=[];if(s.kind==="mode"){let a=this._state(e.mode_entity)?.state;n=i(a==="off"?"mode_off":"mode_observe"),r=[i(a==="off"?"x_mode_off":"x_mode_observe")]}else if(s.kind==="circuit"){let a=e.circuits.find(c=>c.id===s.id);if(!a)return h;n=a.name,r.push(i("x_what_circuit",{name:a.name,system:i(`system_${a.system_type}`)}));let l=this._number(a.spread_entity);r.push(l===void 0?i("x_no_spread"):i("x_spread",{flow:this._temp(a.flow_entity),ret:this._temp(a.return_entity),spread:this._format(l,"K")}));let d=this._circuitOpen(a);a.valve_entity?d===void 0?r.push(i("x_valve_unknown")):a.valve_entity.startsWith("valve.")?r.push(i(d?"x_open_valve":"x_closed_valve")):r.push(i(`x_${d?"open":"closed"}_${a.valve_type==="no"?"no":"nc"}`)):r.push(i("x_no_valve"));let p=e.rooms.filter(c=>c.circuit===a.id).map(c=>c.name);p.length&&r.push(i("x_rooms_on",{rooms:p.join(", ")}))}else if(s.kind==="room"){let a=e.rooms.find(u=>u.id===s.id);if(!a)return h;n=a.name;let l=this._state(a.climate_entity),d=l?.attributes??{},p={name:a.name,current:this._format(d.current_temperature,"\xB0C"),target:this._format(d.temperature,"\xB0C")};!l||l.state==="unavailable"||l.state==="unknown"?r.push(i("x_room_unavailable",p)):l.state==="off"?r.push(i("x_room_off",p)):d.hvac_action==="heating"?r.push(i("x_room_heating",p)):r.push(i("x_room_idle",p)),this._state(a.window_entity)?.state==="on"&&r.push(i("x_room_window")),d.preset_mode&&d.preset_mode!=="none"&&r.push(i("x_room_preset",{preset:String(d.preset_mode)}));let c=e.circuits.find(u=>u.id===a.circuit);c&&r.push(i("x_room_circuit",{circuit:c.name}))}else if(s.kind==="buffer"){let a=e.buffers.find(l=>l.id===s.id);if(!a)return h;n=a.name,r.push(i("x_buffer",{name:a.name})),this._number(a.mean_entity)!==void 0&&r.push(i("x_buffer_mean",{mean:this._temp(a.mean_entity)}))}else{let a=e.heat_sources.find(p=>p.id===s.id);if(!a)return h;n=a.name;let l=this._state(a.status_entity)?.state;r.push(i("x_source",{name:a.name,status:this._sourceActive(a)?i("running"):l??i("unknown")}));let d=a.temperature_entity??a.flow_entity;d&&r.push(i("x_source_temp",{temp:this._temp(d)}))}return m`
      <div class="explain" role="status">
        <div class="explain-head">
          <strong>${n}</strong>
          <button
            class="close"
            aria-label=${i("close")}
            @click=${()=>this._selection=void 0}
          >
            ✕
          </button>
        </div>
        ${r.map(a=>m`<p>${a}</p>`)}
      </div>
    `}};K.properties={_plants:{state:!0},_error:{state:!0},_selection:{state:!0},_config:{state:!0},_pipes:{state:!0}},K.styles=X`
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
  `;var Ye=x`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.5 5-2.5 7C8.4 11 9 12.5 9 12.5S7 12 6.6 9.8C4.9 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"/></svg>`,et=x`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`,tt=x`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;function st(o){return x`<svg viewBox="0 0 44 56" aria-hidden="true">
    <rect x="4" y="3" width="36" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
    <rect x="11" y="9" width="22" height="7" rx="2" fill="currentColor" opacity="0.25"/>
    <path transform="translate(10 22)" d="M12 2c1 3.5-1.500 5-2.500 7C8.400 11 9 12.500 9 12.500S7 12 6.600 9.800C4.900 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"
      fill=${o?"var(--hz-hot)":"currentColor"} opacity=${o?"1":"0.25"}/>
  </svg>`}function it(o){return o===void 0?"var(--divider-color, #ccc)":`color-mix(in srgb, var(--hz-hot) ${(Math.max(0,Math.min(1,(o-25)/50))*100).toFixed(0)}%, var(--hz-cold))`}function rt(o){let t=o.length?o:[void 0],e=44/t.length;return x`<svg viewBox="0 0 32 56" aria-hidden="true">
    <defs><clipPath id="hz-tank"><rect x="4" y="6" width="24" height="44" rx="9"/></clipPath></defs>
    <g clip-path="url(#hz-tank)">
      ${t.map((s,i)=>x`<rect x="4" y=${6+i*e} width="24" height=${e+.5} fill=${it(s)}/>`)}
    </g>
    <rect x="4" y="6" width="24" height="44" rx="9" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  </svg>`}function nt(o){let t=o==="open"?"var(--hz-ok)":o==="unknown"?"var(--hz-warn)":"currentColor",e=o==="closed"?"0.35":"1";return x`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M6 22 L28 34 L6 46 Z M50 22 L28 34 L50 46 Z" fill=${o==="open"?t:"none"}
      stroke=${t} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
    <path d="M28 34 V16 M19 16 H37" stroke=${t} stroke-width="2.5" stroke-linecap="round" opacity=${e}/>
    ${o==="closed"?x`<path d="M14 48 L42 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`:h}
  </svg>`}var q=class extends S{constructor(){super(...arguments);this._config={}}setConfig(e){this._config={...e}}set hass(e){this._hass=e,this._plants||(this._plants=[],e.callWS({type:"heizzentrale/plants"}).then(s=>this._plants=s.plants).catch(()=>{}))}_change(e,s){let i={...this._config};s?i[e]=s:delete i[e],this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}render(){let e=fe(this._hass?.locale?.language??this._hass?.language);return m`
      <label>
        ${e("editor_plant")}
        <select
          @change=${s=>this._change("entry_id",s.target.value)}
        >
          <option value="" ?selected=${!this._config.entry_id}>
            ${e("editor_first")}
          </option>
          ${(this._plants??[]).map(s=>m`<option
                value=${s.entry_id}
                ?selected=${s.entry_id===this._config.entry_id}
              >
                ${s.name}
              </option>`)}
        </select>
      </label>
      <label>
        ${e("editor_title")}
        <input
          type="text"
          .value=${this._config.title??""}
          @input=${s=>this._change("title",s.target.value)}
        />
      </label>
    `}};q.properties={_config:{state:!0},_plants:{state:!0}},q.styles=X`
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
  `;customElements.get("heizzentrale-house-card")||(customElements.define("heizzentrale-house-card",K),customElements.define("heizzentrale-house-card-editor",q),(window.customCards??=[]).push({type:"heizzentrale-house-card",name:"Heizzentrale",description:"House view: rooms per floor, heat source, buffer and circuits.",preview:!1}));
