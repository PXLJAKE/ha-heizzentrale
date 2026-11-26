var N=globalThis,U=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),re=new WeakMap,z=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(U&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=re.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&re.set(e,t))}return t}toString(){return this.cssText}},ne=o=>new z(typeof o=="string"?o:o+"",void 0,j),D=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new z(e,o,j)},oe=(o,t)=>{if(U)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=N.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},F=U?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ne(e)})(o):o;var{is:Ae,defineProperty:Se,getOwnPropertyDescriptor:ke,getOwnPropertyNames:ze,getOwnPropertySymbols:Ee,getPrototypeOf:Ce}=Object,L=globalThis,ae=L.trustedTypes,Pe=ae?ae.emptyScript:"",Oe=L.reactiveElementPolyfillSupport,E=(o,t)=>o,I={toAttribute(o,t){switch(t){case Boolean:o=o?Pe:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},de=(o,t)=>!Ae(o,t),le={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:de};Symbol.metadata??=Symbol("metadata"),L.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=le){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Se(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=ke(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let a=s?.call(this);n?.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??le}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;let t=Ce(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){let e=this.properties,i=[...ze(e),...Ee(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(F(s))}else t!==void 0&&e.push(F(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return oe(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:I).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:I;this._$Em=s;let a=r.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let r=this.constructor;if(s===!1&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??de)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,a=this[s];r!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[E("elementProperties")]=new Map,f[E("finalized")]=new Map,Oe?.({ReactiveElement:f}),(L.reactiveElementVersions??=[]).push("2.1.2");var Q=globalThis,ce=o=>o,W=Q.trustedTypes,he=W?W.createPolicy("lit-html",{createHTML:o=>o}):void 0,ge="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ve="?"+$,Te=`<${ve}>`,w=document,P=()=>w.createComment(""),O=o=>o===null||typeof o!="object"&&typeof o!="function",X=Array.isArray,He=o=>X(o)||typeof o?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,ue=/>/g,b=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,me=/"/g,$e=/^(?:script|style|textarea|title)$/i,Y=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=Y(1),g=Y(2),Je=Y(3),A=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),fe=new WeakMap,x=w.createTreeWalker(w,129);function ye(o,t){if(!X(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return he!==void 0?he.createHTML(t):t}var Re=(o,t)=>{let e=o.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",r=C;for(let a=0;a<e;a++){let d=o[a],c,p,l=-1,_=0;for(;_<d.length&&(r.lastIndex=_,p=r.exec(d),p!==null);)_=r.lastIndex,r===C?p[1]==="!--"?r=pe:p[1]!==void 0?r=ue:p[2]!==void 0?($e.test(p[2])&&(s=RegExp("</"+p[2],"g")),r=b):p[3]!==void 0&&(r=b):r===b?p[0]===">"?(r=s??C,l=-1):p[1]===void 0?l=-2:(l=r.lastIndex-p[2].length,c=p[1],r=p[3]===void 0?b:p[3]==='"'?me:_e):r===me||r===_e?r=b:r===pe||r===ue?r=C:(r=b,s=void 0);let m=r===b&&o[a+1].startsWith("/>")?" ":"";n+=r===C?d+Te:l>=0?(i.push(c),d.slice(0,l)+ge+d.slice(l)+$+m):d+$+(l===-2?a:m)}return[ye(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},T=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0,a=t.length-1,d=this.parts,[c,p]=Re(t,e);if(this.el=o.createElement(c,i),x.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=x.nextNode())!==null&&d.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(ge)){let _=p[r++],m=s.getAttribute(l).split($),y=/([.?@])?(.*)/.exec(_);d.push({type:1,index:n,name:y[2],strings:m,ctor:y[1]==="."?q:y[1]==="?"?Z:y[1]==="@"?G:k}),s.removeAttribute(l)}else l.startsWith($)&&(d.push({type:6,index:n}),s.removeAttribute(l));if($e.test(s.tagName)){let l=s.textContent.split($),_=l.length-1;if(_>0){s.textContent=W?W.emptyScript:"";for(let m=0;m<_;m++)s.append(l[m],P()),x.nextNode(),d.push({type:2,index:++n});s.append(l[_],P())}}}else if(s.nodeType===8)if(s.data===ve)d.push({type:2,index:n});else{let l=-1;for(;(l=s.data.indexOf($,l+1))!==-1;)d.push({type:7,index:n}),l+=$.length-1}n++}}static createElement(t,e){let i=w.createElement("template");return i.innerHTML=t,i}};function S(o,t,e=o,i){if(t===A)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=O(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=S(o,s._$AS(o,t.values),s,i)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??w).importNode(e,!0);x.currentNode=s;let n=x.nextNode(),r=0,a=0,d=i[0];for(;d!==void 0;){if(r===d.index){let c;d.type===2?c=new H(n,n.nextSibling,this,t):d.type===1?c=new d.ctor(n,d.name,d.strings,this,t):d.type===6&&(c=new J(n,this,t)),this._$AV.push(c),d=i[++a]}r!==d?.index&&(n=x.nextNode(),r++)}return x.currentNode=w,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},H=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),O(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):He(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=T.createElement(ye(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new K(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=fe.get(t.strings);return e===void 0&&fe.set(t.strings,e=new T(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new o(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=ce(t).nextSibling;ce(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},k=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(t,e=this,i,s){let n=this.strings,r=!1;if(n===void 0)t=S(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==A,r&&(this._$AH=t);else{let a=t,d,c;for(t=n[0],d=0;d<n.length-1;d++)c=S(this,a[i+d],e,d),c===A&&(c=this._$AH[d]),r||=!O(c)||c!==this._$AH[d],c===h?t=h:t!==h&&(t+=(c??"")+n[d+1]),this._$AH[d]=c}r&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},q=class extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},Z=class extends k{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},G=class extends k{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??h)===A)return;let i=this._$AH,s=t===h&&i!==h||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==h&&(i===h||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},J=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Me=Q.litHtmlPolyfillSupport;Me?.(T,H),(Q.litHtmlVersions??=[]).push("3.3.3");var be=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new H(t.insertBefore(P(),n),n,void 0,e??{})}return s._$AI(o),s};var ee=globalThis,v=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=be(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};v._$litElement$=!0,v.finalized=!0,ee.litElementHydrateSupport?.({LitElement:v});var Ne=ee.litElementPolyfillSupport;Ne?.({LitElement:v});(ee.litElementVersions??=[]).push("4.2.2");var xe={loading:"Loading plant\u2026",no_plant:"No plant found. Add the Heizzentrale integration under Settings \u2192 Devices & services.",empty:"This plant has no parts yet. Open the integration and add a heat source, circuits and rooms.",mode_observe:"Observing",mode_off:"Off",outdoor:"Outdoor",other_rooms:"Other rooms",plant_room:"Plant room",flow:"Flow",return:"Return",spread:"Spread",target:"Target",heating:"heating",idle:"idle",window_open:"Window open",open:"open",closed:"closed",unknown:"unknown",running:"running",close:"Close",system_two_pipe:"two-pipe",system_one_pipe:"one-pipe",system_underfloor:"underfloor heating",system_other:"circuit",kind_pellet:"Pellet boiler",kind_wood:"Wood boiler",kind_gas:"Gas boiler",kind_oil:"Oil boiler",kind_heat_pump:"Heat pump",kind_district:"District heating",kind_other:"Heat source",x_what_circuit:"{name} is a {system} circuit. Hot water flows to the radiators (flow) and comes back cooler (return).",x_spread:"Flow {flow}, return {ret}: the spread is {spread}. A larger spread means the water gives off more heat on its way.",x_no_spread:"Flow and return sensors are needed to show the spread.",x_open_nc:"The circuit is open because its actuator is powered. Without power this actuator closes (NC).",x_closed_nc:"The circuit is closed because its actuator has no power. Without power this actuator closes (NC).",x_open_no:"The circuit is open because its actuator has no power. Without power this actuator opens (NO).",x_closed_no:"The circuit is closed because its actuator is powered. Without power this actuator opens (NO).",x_open_valve:"The valve reports that it is open.",x_closed_valve:"The valve reports that it is closed.",x_valve_unknown:"The actuator does not report a state right now. Heizzentrale treats the circuit as possibly open.",x_no_valve:"This circuit has no actuator, so it is always open.",x_rooms_on:"Rooms on this circuit: {rooms}.",x_room_heating:"{name} is heating: it is {current} and should be {target}.",x_room_idle:"{name} is not heating: it is {current}, target {target}.",x_room_off:"{name} is switched off.",x_room_unavailable:"The thermostat of {name} is not reachable right now.",x_room_window:"A window is open, so heating is paused here.",x_room_preset:"Active preset: {preset}.",x_room_circuit:"Its radiators are supplied by the circuit {circuit}.",x_buffer:"{name} stores hot water so the heat source does not have to start for every small demand. Hot water collects at the top.",x_buffer_mean:"Mean temperature: {mean}.",x_source:"{name} produces the heat for the house. Status: {status}.",x_source_temp:"Temperature: {temp}.",x_mode_observe:"Observe mode: Heizzentrale measures and explains but does not switch anything.",x_mode_off:"Off: Heizzentrale only measures.",editor_plant:"Plant",editor_title:"Title (optional)",editor_first:"First plant"},Ue={loading:"Anlage wird geladen \u2026",no_plant:"Keine Anlage gefunden. F\xFCge die Integration Heizzentrale unter Einstellungen \u2192 Ger\xE4te & Dienste hinzu.",empty:"Diese Anlage hat noch keine Teile. \xD6ffne die Integration und f\xFCge W\xE4rmeerzeuger, Kreise und R\xE4ume hinzu.",mode_observe:"Beobachtet",mode_off:"Aus",outdoor:"Au\xDFen",other_rooms:"Weitere R\xE4ume",plant_room:"Heizraum",flow:"Vorlauf",return:"R\xFCcklauf",spread:"Spreizung",target:"Soll",heating:"heizt",idle:"ruht",window_open:"Fenster offen",open:"offen",closed:"zu",unknown:"unbekannt",running:"l\xE4uft",close:"Schlie\xDFen",system_two_pipe:"Zweirohr",system_one_pipe:"Einrohr",system_underfloor:"Fu\xDFbodenheizung",system_other:"Kreis",kind_pellet:"Pelletkessel",kind_wood:"Holzkessel",kind_gas:"Gastherme",kind_oil:"\xD6lkessel",kind_heat_pump:"W\xE4rmepumpe",kind_district:"Fernw\xE4rme",kind_other:"W\xE4rmeerzeuger",x_what_circuit:"{name} ist ein Strang ({system}). Hei\xDFes Wasser flie\xDFt zu den Heizk\xF6rpern (Vorlauf) und kommt k\xFChler zur\xFCck (R\xFCcklauf).",x_spread:"Vorlauf {flow}, R\xFCcklauf {ret}: Die Spreizung betr\xE4gt {spread}. Eine gr\xF6\xDFere Spreizung hei\xDFt, das Wasser gibt unterwegs mehr W\xE4rme ab.",x_no_spread:"F\xFCr die Spreizung braucht es einen Vorlauf- und einen R\xFCcklauff\xFChler.",x_open_nc:"Der Strang ist offen, weil sein Stellantrieb Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_closed_nc:"Der Strang ist zu, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_open_no:"Der Strang ist offen, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_closed_no:"Der Strang ist zu, weil sein Stellantrieb Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_open_valve:"Das Ventil meldet, dass es offen ist.",x_closed_valve:"Das Ventil meldet, dass es zu ist.",x_valve_unknown:"Der Stellantrieb meldet gerade keinen Zustand. Heizzentrale behandelt den Strang als m\xF6glicherweise offen.",x_no_valve:"Dieser Strang hat keinen Stellantrieb und ist deshalb immer offen.",x_rooms_on:"R\xE4ume an diesem Strang: {rooms}.",x_room_heating:"{name} heizt gerade: Es hat {current} und soll {target} haben.",x_room_idle:"{name} heizt nicht: Es hat {current}, Soll {target}.",x_room_off:"{name} ist ausgeschaltet.",x_room_unavailable:"Das Thermostat von {name} ist gerade nicht erreichbar.",x_room_window:"Ein Fenster ist offen, deshalb pausiert die Heizung hier.",x_room_preset:"Aktives Preset: {preset}.",x_room_circuit:"Die Heizk\xF6rper h\xE4ngen am Strang {circuit}.",x_buffer:"{name} speichert hei\xDFes Wasser, damit der W\xE4rmeerzeuger nicht f\xFCr jeden kleinen Bedarf starten muss. Oben sammelt sich das hei\xDFe Wasser.",x_buffer_mean:"Mittlere Temperatur: {mean}.",x_source:"{name} erzeugt die W\xE4rme f\xFCr das Haus. Status: {status}.",x_source_temp:"Temperatur: {temp}.",x_mode_observe:"Beobachtungsmodus: Heizzentrale misst und erkl\xE4rt, schaltet aber nichts.",x_mode_off:"Aus: Heizzentrale misst nur.",editor_plant:"Anlage",editor_title:"Titel (optional)",editor_first:"Erste Anlage"};function te(o){let t=(o??"en").toLowerCase().startsWith("de")?Ue:xe;return(e,i={})=>(t[e]??xe[e]??e).replace(/\{(\w+)\}/g,(s,n)=>i[n]??"")}var we=["var(--blue-color, #2196f3)","var(--teal-color, #009688)","var(--purple-color, #9c27b0)","var(--amber-color, #ffc107)","var(--pink-color, #e91e63)","var(--light-green-color, #8bc34a)","var(--indigo-color, #3f51b5)","var(--brown-color, #795548)"],De=new Set(["on","heat","heating","running","true"]),R=class extends v{constructor(){super(...arguments);this._config={};this._loading=!1;this._watched=new Set}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("heizzentrale-house-card-editor")}setConfig(e){this._config={...e}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}set hass(e){let i=this._hass;if(this._hass=e,!this._plants&&!this._loading){this._load();return}if(!i){this.requestUpdate();return}for(let s of this._watched)if(i.states[s]!==e.states[s]){this.requestUpdate();return}i.language!==e.language&&this.requestUpdate()}get hass(){return this._hass}async _load(){if(this._hass){this._loading=!0;try{let e=await this._hass.callWS({type:"heizzentrale/plants"});this._plants=e.plants,this._error=void 0}catch(e){this._error=e?.message??String(e),this._plants=[]}finally{this._loading=!1}}}get _t(){return te(this._hass?.locale?.language??this._hass?.language)}_state(e){if(e)return this._watched.add(e),this._hass?.states[e]}_number(e){let i=this._state(e);if(!i)return;let s=Number(i.state);return i.state!==""&&Number.isFinite(s)?s:void 0}_format(e,i,s=1){if(e===void 0)return"\u2013";let n=this._hass?.locale?.language??this._hass?.language??"en",r=new Intl.NumberFormat(n,{minimumFractionDigits:s,maximumFractionDigits:s}).format(e);return i?`${r} ${i}`:r}_temp(e){let s=this._state(e)?.attributes.unit_of_measurement??"\xB0C";return this._format(this._number(e),s)}_plant(){if(this._plants?.length)return this._plants.find(e=>e.entry_id===this._config.entry_id)??this._plants[0]}_circuitOpen(e){if(!e.valve_entity)return!0;let i=this._state(e.open_entity)?.state;if(i==="on")return!0;if(i==="off")return!1}_select(e){let i=this._selection&&this._selection.kind===e.kind&&this._selection.id===e.id;this._selection=i?void 0:e}_key(e,i){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(i))}_isSelected(e,i){let s=this._selection;return!!s&&s.kind===e&&s.id===i}render(){this._watched.clear();let e=this._t;if(!this._plants)return u`<ha-card><div class="note">${e("loading")}</div></ha-card>`;let i=this._plant();if(!i)return u`<ha-card
        ><div class="note">${this._error??e("no_plant")}</div></ha-card
      >`;let s=!i.rooms.length&&!i.circuits.length&&!i.buffers.length&&!i.heat_sources.length,n=new Map;return i.circuits.forEach((r,a)=>n.set(r.id,we[a%we.length])),u`
      <ha-card>
        ${this._renderHeader(i)}
        ${s?u`<div class="note">${e("empty")}</div>`:h}
        ${s?h:this._renderHouse(i,n)}
        ${this._renderExplanation(i)}
      </ha-card>
    `}_renderHeader(e){let i=this._t,s=this._state(e.mode_entity)?.state,n=e.outdoor_entity?u`<span class="chip" title=${i("outdoor")}
          >${i("outdoor")} ${this._temp(e.outdoor_entity)}</span
        >`:h,r=s==="observe"||s==="off"?u`<button
            class="chip mode ${s}"
            @click=${()=>this._select({kind:"mode"})}
          >
            ${i(s==="observe"?"mode_observe":"mode_off")}
          </button>`:h;return u`
      <div class="header">
        <h2>${this._config.title||e.name}</h2>
        <div class="chips">${n}${r}</div>
      </div>
    `}_renderHouse(e,i){let s=this._t,n=new Set(e.floors.map(l=>l.id)),r=(l,_)=>_.length?u`
            <section class="storey">
              ${l?u`<div class="floor-name">${l}</div>`:h}
              <div class="rooms">
                ${_.map(m=>this._renderRoom(e,m,i))}
              </div>
            </section>
          `:h,a=l=>e.rooms.filter(_=>_.floor===l),d=e.floors.filter(l=>(l.level??0)>=0),c=e.floors.filter(l=>(l.level??0)<0),p=e.rooms.filter(l=>!l.floor||!n.has(l.floor));return u`
      <div class="house">
        <div class="roof">${Be}</div>
        <div class="walls">
          ${d.map(l=>r(l.name,a(l.id)))}
          ${r(e.floors.length?s("other_rooms"):"",p)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${c.map(l=>r(l.name,a(l.id)))}
          ${this._renderPlantRoom(e,i)}
        </div>
      </div>
    `}_renderRoom(e,i,s){let n=this._t,r=this._state(i.climate_entity),a=r?.attributes??{},d=!r||r.state==="unavailable"||r.state==="unknown",c=a.hvac_action==="heating",p=this._state(i.window_entity)?.state==="on",l="\xB0",_=a.current_temperature,m=a.temperature,y=a.preset_mode&&a.preset_mode!=="none"?String(a.preset_mode):void 0,ie=e.circuits.find(B=>B.id===i.circuit),se={kind:"room",id:i.id};return u`
      <div
        class="room ${c?"heating":""} ${d?"off":""}
          ${this._isSelected("room",i.id)?"selected":""}"
        role="button"
        tabindex="0"
        @click=${()=>this._select(se)}
        @keydown=${B=>this._key(B,se)}
      >
        <div class="room-top">
          <span class="room-name"
            >${ie?u`<span class="dot" style="background:${s.get(ie.id)}"></span>`:h}${i.name}</span
          >
          <span class="icons">
            ${p?u`<span class="badge window" title=${n("window_open")}
                  >${We}</span
                >`:h}
            ${c?u`<span class="badge flame" title=${n("heating")}
                  >${Le}</span
                >`:h}
          </span>
        </div>
        <div class="room-temp">
          ${this._format(typeof _=="number"?_:void 0,"")}<span
            class="unit"
            >${l}</span
          >
        </div>
        <div class="room-bottom">
          <span
            >${n("target")}
            ${r?.state==="off"?"\u2013":this._format(typeof m=="number"?m:void 0,"")}${l}</span
          >
          ${y?u`<span class="preset">${y}</span>`:h}
        </div>
      </div>
    `}_renderPlantRoom(e,i){let s=this._t;if(!e.heat_sources.length&&!e.buffers.length&&!e.circuits.length)return h;let n=e.circuits.some(r=>this._circuitOpen(r)!==!1);return u`
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
        @click=${()=>this._select(e)}
        @keydown=${r=>this._key(r,e)}
      >
        <div class="rail flow-rail"></div>
        ${s}
        <div class="rail return-rail"></div>
      </div>
    `}_sourceActive(e){let i=this._state(e.status_entity)?.state?.toLowerCase();return!!i&&De.has(i)}_renderSource(e,i){let s=this._t,n=this._sourceActive(e);return this._part({kind:"source",id:e.id},i,u`
        <div class="part-name">${e.name}</div>
        <div class="figure">${je(n)}</div>
        <div class="big">
          ${e.temperature_entity?this._temp(e.temperature_entity):e.flow_entity?this._temp(e.flow_entity):"\u2013"}
        </div>
        <div class="sub">
          ${s(n?"running":`kind_${e.kind}`)}
        </div>
      `)}_renderBuffer(e,i){let s=e.sensor_entities.map(n=>this._number(n));return this._part({kind:"buffer",id:e.id},i,u`
        <div class="part-name">${e.name}</div>
        <div class="figure buffer-figure">
          ${Ie(s)}
          <div class="tank-values">
            ${e.sensor_entities.map(n=>u`<span>${this._temp(n)}</span>`)}
          </div>
        </div>
        <div class="sub">
          ${e.volume?`${this._format(e.volume,"l",0)}`:h}
        </div>
      `)}_renderCircuit(e,i){let s=this._t,n=this._circuitOpen(e),r=this._number(e.spread_entity),a=n===void 0?"unknown":n?"open":"closed";return this._part({kind:"circuit",id:e.id},n!==!1,u`
        <div class="part-name">
          <span class="dot" style="background:${i}"></span>${e.name}
        </div>
        <div class="figure">${Ve(a)}</div>
        <div class="big">
          ${r===void 0?"\u2013":`\u0394 ${this._format(r,"K")}`}
        </div>
        <div class="pair">
          <span class="hot">${this._temp(e.flow_entity)}</span>
          <span class="cold">${this._temp(e.return_entity)}</span>
        </div>
        <div class="sub status-${a}">${s(a)}</div>
      `,`circuit-${a}`)}_renderExplanation(e){let i=this._selection;if(!i)return h;let s=this._t,n="",r=[];if(i.kind==="mode"){let a=this._state(e.mode_entity)?.state;n=s(a==="off"?"mode_off":"mode_observe"),r=[s(a==="off"?"x_mode_off":"x_mode_observe")]}else if(i.kind==="circuit"){let a=e.circuits.find(l=>l.id===i.id);if(!a)return h;n=a.name,r.push(s("x_what_circuit",{name:a.name,system:s(`system_${a.system_type}`)}));let d=this._number(a.spread_entity);r.push(d===void 0?s("x_no_spread"):s("x_spread",{flow:this._temp(a.flow_entity),ret:this._temp(a.return_entity),spread:this._format(d,"K")}));let c=this._circuitOpen(a);a.valve_entity?c===void 0?r.push(s("x_valve_unknown")):a.valve_entity.startsWith("valve.")?r.push(s(c?"x_open_valve":"x_closed_valve")):r.push(s(`x_${c?"open":"closed"}_${a.valve_type==="no"?"no":"nc"}`)):r.push(s("x_no_valve"));let p=e.rooms.filter(l=>l.circuit===a.id).map(l=>l.name);p.length&&r.push(s("x_rooms_on",{rooms:p.join(", ")}))}else if(i.kind==="room"){let a=e.rooms.find(_=>_.id===i.id);if(!a)return h;n=a.name;let d=this._state(a.climate_entity),c=d?.attributes??{},p={name:a.name,current:this._format(c.current_temperature,"\xB0C"),target:this._format(c.temperature,"\xB0C")};!d||d.state==="unavailable"||d.state==="unknown"?r.push(s("x_room_unavailable",p)):d.state==="off"?r.push(s("x_room_off",p)):c.hvac_action==="heating"?r.push(s("x_room_heating",p)):r.push(s("x_room_idle",p)),this._state(a.window_entity)?.state==="on"&&r.push(s("x_room_window")),c.preset_mode&&c.preset_mode!=="none"&&r.push(s("x_room_preset",{preset:String(c.preset_mode)}));let l=e.circuits.find(_=>_.id===a.circuit);l&&r.push(s("x_room_circuit",{circuit:l.name}))}else if(i.kind==="buffer"){let a=e.buffers.find(d=>d.id===i.id);if(!a)return h;n=a.name,r.push(s("x_buffer",{name:a.name})),this._number(a.mean_entity)!==void 0&&r.push(s("x_buffer_mean",{mean:this._temp(a.mean_entity)}))}else{let a=e.heat_sources.find(p=>p.id===i.id);if(!a)return h;n=a.name;let d=this._state(a.status_entity)?.state;r.push(s("x_source",{name:a.name,status:this._sourceActive(a)?s("running"):d??s("unknown")}));let c=a.temperature_entity??a.flow_entity;c&&r.push(s("x_source_temp",{temp:this._temp(c)}))}return u`
      <div class="explain" role="status">
        <div class="explain-head">
          <strong>${n}</strong>
          <button
            class="close"
            aria-label=${s("close")}
            @click=${()=>this._selection=void 0}
          >
            ✕
          </button>
        </div>
        ${r.map(a=>u`<p>${a}</p>`)}
      </div>
    `}};R.properties={_plants:{state:!0},_error:{state:!0},_selection:{state:!0},_config:{state:!0}},R.styles=D`
    :host {
      --hz-hot: var(--error-color, #db4437);
      --hz-cold: var(--info-color, #039be5);
      --hz-ok: var(--success-color, #43a047);
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
      font-weight: 500;
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
      --hz-line: color-mix(in srgb, var(--primary-text-color) 70%, transparent);
      --hz-wall: 2px;
      padding: 0 14px;
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
      padding: 8px 10px 12px;
      border-top: var(--hz-wall) solid var(--hz-line);
    }
    .walls:not(.underground) > .storey:first-child {
      border-top: 0;
    }
    .ground {
      margin: 0 -14px;
      border-top: 3px solid color-mix(in srgb, var(--hz-ok) 70%, var(--hz-line));
    }
    .underground {
      border-bottom: var(--hz-wall) solid var(--hz-line);
      background: repeating-linear-gradient(
        135deg,
        transparent 0 9px,
        color-mix(in srgb, var(--primary-text-color) 5%, transparent) 9px 10px
      );
    }
    .underground > .storey:first-child {
      border-top: 0;
    }
    .floor-name {
      font-size: 0.7rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hz-muted);
      margin-bottom: 6px;
    }
    .rooms,
    .parts {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(auto-fill, minmax(124px, 1fr));
    }
    .room,
    .part {
      position: relative;
      background: var(--card-background-color, transparent);
      border: 1.5px solid var(--divider-color, #ddd);
      border-radius: 10px;
      cursor: pointer;
      outline: none;
      transition:
        box-shadow 0.15s ease,
        border-color 0.15s ease;
    }
    .room:focus-visible,
    .part:focus-visible,
    .selected {
      box-shadow: 0 0 0 2px var(--primary-color);
    }
    .room {
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-height: 78px;
    }
    .room.heating {
      border-color: var(--hz-hot);
      background: color-mix(
        in srgb,
        var(--hz-hot) 7%,
        var(--card-background-color, transparent)
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
      font-size: 1.6rem;
      font-weight: 500;
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
      gap: 4px;
      font-size: 0.75rem;
      color: var(--hz-muted);
    }
    .preset {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .parts {
      gap: 0;
      row-gap: 10px;
    }
    .part {
      border-radius: 0;
      border-width: 0;
      background: var(--card-background-color, transparent);
      padding: 12px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      text-align: center;
    }
    .rail {
      position: absolute;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--divider-color, #ddd);
    }
    .flow-rail {
      top: 0;
    }
    .return-rail {
      bottom: 0;
    }
    .flowing .flow-rail {
      background: repeating-linear-gradient(
        90deg,
        var(--hz-hot) 0 10px,
        color-mix(in srgb, var(--hz-hot) 45%, transparent) 10px 20px
      );
      background-size: 20px 4px;
      animation: hz-right 1.2s linear infinite;
    }
    .flowing .return-rail {
      background: repeating-linear-gradient(
        90deg,
        var(--hz-cold) 0 10px,
        color-mix(in srgb, var(--hz-cold) 45%, transparent) 10px 20px
      );
      background-size: 20px 4px;
      animation: hz-left 1.2s linear infinite;
    }
    @keyframes hz-right {
      to {
        background-position: 20px 0;
      }
    }
    @keyframes hz-left {
      to {
        background-position: -20px 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .flowing .rail {
        animation: none;
      }
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
      font-weight: 500;
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
    .explain {
      background: var(--hz-tile);
      border-radius: 12px;
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
  `;var Le=g`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.5 5-2.5 7C8.4 11 9 12.5 9 12.5S7 12 6.6 9.8C4.9 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"/></svg>`,We=g`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`,Be=g`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;function je(o){return g`<svg viewBox="0 0 44 56" aria-hidden="true">
    <rect x="4" y="3" width="36" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
    <rect x="11" y="9" width="22" height="7" rx="2" fill="currentColor" opacity="0.25"/>
    <path transform="translate(10 22)" d="M12 2c1 3.5-1.500 5-2.500 7C8.400 11 9 12.500 9 12.500S7 12 6.600 9.800C4.900 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"
      fill=${o?"var(--hz-hot)":"currentColor"} opacity=${o?"1":"0.25"}/>
  </svg>`}function Fe(o){return o===void 0?"var(--divider-color, #ccc)":`color-mix(in srgb, var(--hz-hot) ${(Math.max(0,Math.min(1,(o-25)/50))*100).toFixed(0)}%, var(--hz-cold))`}function Ie(o){let t=o.length?o:[void 0],e=44/t.length;return g`<svg viewBox="0 0 32 56" aria-hidden="true">
    <defs><clipPath id="hz-tank"><rect x="4" y="6" width="24" height="44" rx="9"/></clipPath></defs>
    <g clip-path="url(#hz-tank)">
      ${t.map((i,s)=>g`<rect x="4" y=${6+s*e} width="24" height=${e+.5} fill=${Fe(i)}/>`)}
    </g>
    <rect x="4" y="6" width="24" height="44" rx="9" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  </svg>`}function Ve(o){let t=o==="open"?"var(--hz-ok)":o==="unknown"?"var(--hz-warn)":"currentColor",e=o==="closed"?"0.35":"1";return g`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M6 22 L28 34 L6 46 Z M50 22 L28 34 L50 46 Z" fill=${o==="open"?t:"none"}
      stroke=${t} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
    <path d="M28 34 V16 M19 16 H37" stroke=${t} stroke-width="2.5" stroke-linecap="round" opacity=${e}/>
    ${o==="closed"?g`<path d="M14 48 L42 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`:h}
  </svg>`}var M=class extends v{constructor(){super(...arguments);this._config={}}setConfig(e){this._config={...e}}set hass(e){this._hass=e,this._plants||(this._plants=[],e.callWS({type:"heizzentrale/plants"}).then(i=>this._plants=i.plants).catch(()=>{}))}_change(e,i){let s={...this._config};i?s[e]=i:delete s[e],this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}render(){let e=te(this._hass?.locale?.language??this._hass?.language);return u`
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
    `}};M.properties={_config:{state:!0},_plants:{state:!0}},M.styles=D`
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
  `;customElements.get("heizzentrale-house-card")||(customElements.define("heizzentrale-house-card",R),customElements.define("heizzentrale-house-card-editor",M),(window.customCards??=[]).push({type:"heizzentrale-house-card",name:"Heizzentrale",description:"House view: rooms per floor, heat source, buffer and circuits.",preview:!1}));
