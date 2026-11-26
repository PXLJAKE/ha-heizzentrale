var le=globalThis,de=le.ShadowRoot&&(le.ShadyCSS===void 0||le.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),Re=new WeakMap,G=class{constructor(s,e,t){if(this._$cssResult$=!0,t!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=e}get styleSheet(){let s=this.o,e=this.t;if(de&&s===void 0){let t=e!==void 0&&e.length===1;t&&(s=Re.get(e)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),t&&Re.set(e,s))}return s}toString(){return this.cssText}},Me=u=>new G(typeof u=="string"?u:u+"",void 0,ge),B=(u,...s)=>{let e=u.length===1?u[0]:s.reduce((t,n,i)=>t+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+u[i+1],u[0]);return new G(e,u,ge)},Ne=(u,s)=>{if(de)u.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of s){let t=document.createElement("style"),n=le.litNonce;n!==void 0&&t.setAttribute("nonce",n),t.textContent=e.cssText,u.appendChild(t)}},fe=de?u=>u:u=>u instanceof CSSStyleSheet?(s=>{let e="";for(let t of s.cssRules)e+=t.cssText;return Me(e)})(u):u;var{is:Qe,defineProperty:et,getOwnPropertyDescriptor:tt,getOwnPropertyNames:nt,getOwnPropertySymbols:st,getPrototypeOf:it}=Object,ce=globalThis,Oe=ce.trustedTypes,rt=Oe?Oe.emptyScript:"",ot=ce.reactiveElementPolyfillSupport,Y=(u,s)=>u,ve={toAttribute(u,s){switch(s){case Boolean:u=u?rt:null;break;case Object:case Array:u=u==null?u:JSON.stringify(u)}return u},fromAttribute(u,s){let e=u;switch(s){case Boolean:e=u!==null;break;case Number:e=u===null?null:Number(u);break;case Object:case Array:try{e=JSON.parse(u)}catch{e=null}}return e}},Le=(u,s)=>!Qe(u,s),We={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:Le};Symbol.metadata??=Symbol("metadata"),ce.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,e=We){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(s,e),!e.noAccessor){let t=Symbol(),n=this.getPropertyDescriptor(s,t,e);n!==void 0&&et(this.prototype,s,n)}}static getPropertyDescriptor(s,e,t){let{get:n,set:i}=tt(this.prototype,s)??{get(){return this[e]},set(r){this[e]=r}};return{get:n,set(r){let l=n?.call(this);i?.call(this,r),this.requestUpdate(s,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??We}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;let s=it(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){let e=this.properties,t=[...nt(e),...st(e)];for(let n of t)this.createProperty(n,e[n])}let s=this[Symbol.metadata];if(s!==null){let e=litPropertyMetadata.get(s);if(e!==void 0)for(let[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let e=[];if(Array.isArray(s)){let t=new Set(s.flat(1/0).reverse());for(let n of t)e.unshift(fe(n))}else s!==void 0&&e.push(fe(s));return e}static _$Eu(s,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(s.set(t,this[t]),delete this[t]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ne(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,e,t){this._$AK(s,t)}_$ET(s,e){let t=this.constructor.elementProperties.get(s),n=this.constructor._$Eu(s,t);if(n!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:ve).toAttribute(e,t.type);this._$Em=s,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(s,e){let t=this.constructor,n=t._$Eh.get(s);if(n!==void 0&&this._$Em!==n){let i=t.getPropertyOptions(n),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:ve;this._$Em=n;let l=r.fromAttribute(e,i.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(s,e,t,n=!1,i){if(s!==void 0){let r=this.constructor;if(n===!1&&(i=this[s]),t??=r.getPropertyOptions(s),!((t.hasChanged??Le)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(s)&&!this.hasAttribute(r._$Eu(s,t))))return;this.C(s,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,e,{useDefault:t,reflect:n,wrapped:i},r){t&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,r??e??this[s]),i!==!0||r!==void 0)||(this._$AL.has(s)||(this.hasUpdated||t||(e=void 0),this._$AL.set(s,e)),n===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,i]of t){let{wrapped:r}=i,l=this[n];r!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,i,l)}}let s=!1,e=this._$AL;try{s=this.shouldUpdate(e),s?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw s=!1,this._$EM(),t}s&&this._$AE(e)}willUpdate(s){}_$AE(s){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(s){}firstUpdated(s){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[Y("elementProperties")]=new Map,O[Y("finalized")]=new Map,ot?.({ReactiveElement:O}),(ce.reactiveElementVersions??=[]).push("2.1.2");var ke=globalThis,De=u=>u,he=ke.trustedTypes,Fe=he?he.createPolicy("lit-html",{createHTML:u=>u}):void 0,Ie="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,Ve="?"+F,at=`<${Ve}>`,Z=document,X=()=>Z.createComment(""),Q=u=>u===null||typeof u!="object"&&typeof u!="function",Se=Array.isArray,lt=u=>Se(u)||typeof u?.[Symbol.iterator]=="function",be=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,je=/-->/g,Be=/>/g,U=RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Ke=/"/g,qe=/^(?:script|style|textarea|title)$/i,Ae=u=>(s,...e)=>({_$litType$:u,strings:s,values:e}),h=Ae(1),E=Ae(2),Tt=Ae(3),I=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Ze=new WeakMap,K=Z.createTreeWalker(Z,129);function Ge(u,s){if(!Se(u)||!u.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fe!==void 0?Fe.createHTML(s):s}var dt=(u,s)=>{let e=u.length-1,t=[],n,i=s===2?"<svg>":s===3?"<math>":"",r=J;for(let l=0;l<e;l++){let a=u[l],o,c,d=-1,p=0;for(;p<a.length&&(r.lastIndex=p,c=r.exec(a),c!==null);)p=r.lastIndex,r===J?c[1]==="!--"?r=je:c[1]!==void 0?r=Be:c[2]!==void 0?(qe.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=U):c[3]!==void 0&&(r=U):r===U?c[0]===">"?(r=n??J,d=-1):c[1]===void 0?d=-2:(d=r.lastIndex-c[2].length,o=c[1],r=c[3]===void 0?U:c[3]==='"'?Ke:Ue):r===Ke||r===Ue?r=U:r===je||r===Be?r=J:(r=U,n=void 0);let g=r===U&&u[l+1].startsWith("/>")?" ":"";i+=r===J?a+at:d>=0?(t.push(o),a.slice(0,d)+Ie+a.slice(d)+F+g):a+F+(d===-2?l:g)}return[Ge(u,i+(u[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),t]},ee=class u{constructor({strings:s,_$litType$:e},t){let n;this.parts=[];let i=0,r=0,l=s.length-1,a=this.parts,[o,c]=dt(s,e);if(this.el=u.createElement(o,t),K.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=K.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let d of n.getAttributeNames())if(d.endsWith(Ie)){let p=c[r++],g=n.getAttribute(d).split(F),_=/([.?@])?(.*)/.exec(p);a.push({type:1,index:i,name:_[2],strings:g,ctor:_[1]==="."?ye:_[1]==="?"?$e:_[1]==="@"?xe:q}),n.removeAttribute(d)}else d.startsWith(F)&&(a.push({type:6,index:i}),n.removeAttribute(d));if(qe.test(n.tagName)){let d=n.textContent.split(F),p=d.length-1;if(p>0){n.textContent=he?he.emptyScript:"";for(let g=0;g<p;g++)n.append(d[g],X()),K.nextNode(),a.push({type:2,index:++i});n.append(d[p],X())}}}else if(n.nodeType===8)if(n.data===Ve)a.push({type:2,index:i});else{let d=-1;for(;(d=n.data.indexOf(F,d+1))!==-1;)a.push({type:7,index:i}),d+=F.length-1}i++}}static createElement(s,e){let t=Z.createElement("template");return t.innerHTML=s,t}};function V(u,s,e=u,t){if(s===I)return s;let n=t!==void 0?e._$Co?.[t]:e._$Cl,i=Q(s)?void 0:s._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(u),n._$AT(u,e,t)),t!==void 0?(e._$Co??=[])[t]=n:e._$Cl=n),n!==void 0&&(s=V(u,n._$AS(u,s.values),n,t)),s}var we=class{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:e},parts:t}=this._$AD,n=(s?.creationScope??Z).importNode(e,!0);K.currentNode=n;let i=K.nextNode(),r=0,l=0,a=t[0];for(;a!==void 0;){if(r===a.index){let o;a.type===2?o=new te(i,i.nextSibling,this,s):a.type===1?o=new a.ctor(i,a.name,a.strings,this,s):a.type===6&&(o=new ze(i,this,s)),this._$AV.push(o),a=t[++l]}r!==a?.index&&(i=K.nextNode(),r++)}return K.currentNode=Z,n}p(s){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,e),e+=t.strings.length-2):t._$AI(s[e])),e++}},te=class u{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,e,t,n){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=t,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,e=this._$AM;return e!==void 0&&s?.nodeType===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=V(this,s,e),Q(s)?s===m||s==null||s===""?(this._$AH!==m&&this._$AR(),this._$AH=m):s!==this._$AH&&s!==I&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):lt(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==m&&Q(this._$AH)?this._$AA.nextSibling.data=s:this.T(Z.createTextNode(s)),this._$AH=s}$(s){let{values:e,_$litType$:t}=s,n=typeof t=="number"?this._$AC(s):(t.el===void 0&&(t.el=ee.createElement(Ge(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===n)this._$AH.p(e);else{let i=new we(n,this),r=i.u(this.options);i.p(e),this.T(r),this._$AH=i}}_$AC(s){let e=Ze.get(s.strings);return e===void 0&&Ze.set(s.strings,e=new ee(s)),e}k(s){Se(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,n=0;for(let i of s)n===e.length?e.push(t=new u(this.O(X()),this.O(X()),this,this.options)):t=e[n],t._$AI(i),n++;n<e.length&&(this._$AR(t&&t._$AB.nextSibling,n),e.length=n)}_$AR(s=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);s!==this._$AB;){let t=De(s).nextSibling;De(s).remove(),s=t}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,t,n,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=s,this.name=e,this._$AM=n,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(s,e=this,t,n){let i=this.strings,r=!1;if(i===void 0)s=V(this,s,e,0),r=!Q(s)||s!==this._$AH&&s!==I,r&&(this._$AH=s);else{let l=s,a,o;for(s=i[0],a=0;a<i.length-1;a++)o=V(this,l[t+a],e,a),o===I&&(o=this._$AH[a]),r||=!Q(o)||o!==this._$AH[a],o===m?s=m:s!==m&&(s+=(o??"")+i[a+1]),this._$AH[a]=o}r&&!n&&this.j(s)}j(s){s===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},ye=class extends q{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===m?void 0:s}},$e=class extends q{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==m)}},xe=class extends q{constructor(s,e,t,n,i){super(s,e,t,n,i),this.type=5}_$AI(s,e=this){if((s=V(this,s,e,0)??m)===I)return;let t=this._$AH,n=s===m&&t!==m||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,i=s!==m&&(t===m||n);n&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},ze=class{constructor(s,e,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){V(this,s)}};var ct=ke.litHtmlPolyfillSupport;ct?.(ee,te),(ke.litHtmlVersions??=[]).push("3.3.3");var Ye=(u,s,e)=>{let t=e?.renderBefore??s,n=t._$litPart$;if(n===void 0){let i=e?.renderBefore??null;t._$litPart$=n=new te(s.insertBefore(X(),i),i,void 0,e??{})}return n._$AI(u),n};var Ee=globalThis,P=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=Ye(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};P._$litElement$=!0,P.finalized=!0,Ee.litElementHydrateSupport?.({LitElement:P});var ht=Ee.litElementPolyfillSupport;ht?.({LitElement:P});(Ee.litElementVersions??=[]).push("4.2.2");var Je={loading:"Loading plant\u2026",no_plant:"No plant found. Add the Heizzentrale integration under Settings \u2192 Devices & services.",empty:"This plant has no parts yet. Open the integration and add a heat source, circuits and rooms.",mode_observe:"Observing",mode_off:"Off",mode_active:"Switching",x_mode_active:"Switching: Heizzentrale closes circuits no room needs and switches the pump group off when no circuit needs heat. When in doubt everything stays open.",mode_confirm:"From now on Heizzentrale switches your circuits and the pump group itself. A circuit closes after 10 minutes without demand and opens at once when a room asks for heat. You can go back to observing at any time; everything is then opened and switched on again.",mode_confirm_yes:"Yes, switch now",x_adv_closed:"Heizzentrale has closed it.",x_adv_by_hand:"Someone opened it by hand. Heizzentrale leaves it like that until a room needs heat again.",x_padv_off:"No circuit needs heat: Heizzentrale has switched the pump group off.",x_padv_by_hand:"Someone switched it on by hand. Heizzentrale leaves it like that until a circuit needs heat again.",x_padv_hand_off:"A circuit needs heat, but the pump group was switched off by hand. Heizzentrale only switches on what it switched off itself.",plan_window:"A window is open: {action}.",set_flow:"Flow temperature by demand",flow_hint:"If every room that asks for heat reaches its setpoint, the heating curve is set hotter than needed. Heizzentrale then lowers one number of your heat source in small steps, and raises it again as soon as a room stays too cold. Pick the number that shifts the heating curve, for example the room setpoint of the heating circuit.",flow_entity:"Number that shifts the heating curve",flow_none:"Not used",flow_min:"Lowest value",flow_max:"Highest value",flow_step:"Step",flow_now:"Now: {value}.",flow_r_unknown:"The value cannot be read.",flow_r_hold:"No change needed right now.",flow_r_waiting:"{rooms} is not getting warm. After the last change Heizzentrale waits an hour before raising again.",flow_r_lagging:"{rooms} has been more than half a degree too cold for over 90 minutes: one step up to {target}.",flow_r_covered:"For four hours every room that asked for heat reached its setpoint: one step down to {target}.",flow_r_at_max:"The highest value is reached. {rooms}",flow_r_at_min:"The lowest value is reached.",flow_apply_off:"Heizzentrale only shows what it would set and does not change the number.",flow_apply_on:'Heizzentrale changes the number itself, one step at a time and only inside your limits. "Only show" puts it back to the value from before.',x_flow:"Flow temperature by demand: {text}",set_window:"Open windows",window_on:"Switch room off",window_off:"Change nothing",window_delay:"Wait before switching off (minutes)",window_hint:"While a window of a room is open its thermostat is switched off and put back when the window closes. A room without a window contact is never affected.",outdoor:"Outdoor",other_rooms:"Other rooms",plant_room:"Plant room",flow:"Flow",return:"Return",spread:"Spread",target:"Target",heating:"heating",idle:"idle",window_open:"Window open",open:"open",closed:"closed",unknown:"unknown",running:"running",close:"Close",system_two_pipe:"two-pipe",system_one_pipe:"one-pipe",system_underfloor:"underfloor heating",system_other:"circuit",kind_pellet:"Pellet boiler",kind_wood:"Wood boiler",kind_gas:"Gas boiler",kind_oil:"Oil boiler",kind_heat_pump:"Heat pump",kind_district:"District heating",kind_other:"Heat source",x_what_circuit:"{name} is a {system} circuit. Hot water flows to the radiators (flow) and comes back cooler (return).",x_spread:"Flow {flow}, return {ret}: the spread is {spread}. A larger spread means the water gives off more heat on its way.",x_no_spread:"Flow and return sensors are needed to show the spread.",x_open_nc:"The circuit is open because its actuator is powered. Without power this actuator closes (NC).",x_closed_nc:"The circuit is closed because its actuator has no power. Without power this actuator closes (NC).",x_open_no:"The circuit is open because its actuator has no power. Without power this actuator opens (NO).",x_closed_no:"The circuit is closed because its actuator is powered. Without power this actuator opens (NO).",x_open_valve:"The valve reports that it is open.",x_closed_valve:"The valve reports that it is closed.",x_valve_unknown:"The actuator does not report a state right now. Heizzentrale treats the circuit as possibly open.",x_no_valve:"This circuit has no actuator, so it is always open.",x_rooms_on:"Rooms on this circuit: {rooms}.",x_room_heating:"{name} is heating: it is {current} and should be {target}.",x_room_idle:"{name} is not heating: it is {current}, target {target}.",x_room_off:"{name} is switched off.",x_room_unavailable:"The thermostat of {name} is not reachable right now.",x_room_window:"A window is open, so heating is paused here.",x_room_preset:"Active preset: {preset}.",x_room_circuit:"Its radiators are supplied by the circuit {circuit}.",x_buffer:"{name} stores hot water so the heat source does not have to start for every small demand. Hot water collects at the top.",x_buffer_mean:"Mean temperature: {mean}.",x_source:"{name} produces the heat for the house. Status: {status}.",x_source_temp:"Temperature: {temp}.",x_mode_observe:"Observe mode: Heizzentrale measures and explains but does not switch any circuit or pump.",x_mode_off:"Off: Heizzentrale only measures.",settings:"Settings",back:"Back to the house",circuit:"Circuit",why:"What is happening",room_turn_off:"Switch heating off in this room",room_turn_on:"Switch heating on in this room",open_thermostat:"Open thermostat details",set_mode:"Operating mode",set_sources:"Heat sources",set_buffers:"Buffer tanks",set_circuits:"Circuits",set_rooms:"Rooms",none_yet:"Nothing added yet.",n_rooms:"{count} rooms",one_room:"1 room",n_sensors:"{count} sensors",valve_nc:"actuator closes without power",valve_no:"actuator opens without power",valve_none:"no actuator",has_window:"window contact",warn_no_sensor:"No temperature sensor assigned.",warn_no_pipe_sensors:"Flow or return sensor missing, so no spread can be shown.",warn_no_rooms:"No room uses this circuit yet.",warn_no_circuit:"No circuit assigned, so no pipe is drawn to this room.",warn_no_floor:"No floor found. Assign the thermostat to an area with a floor in Home Assistant.",edit_parts:"Add or change parts",edit_hint:"Opens the Heizzentrale page of Home Assistant. Heat sources, buffers, circuits and rooms are added and changed there.",pump_group:"Pump group",pump_stopped:"stopped",set_pumps:"Pump groups",n_circuits:"{count} circuits",pump_switchable:"can be switched",warn_no_control:"No entity to switch it chosen. Heizzentrale will not be able to turn it off when all circuits are closed.",x_pump:"{name} pushes the heating water into the circuits behind it. A mixer, if there is one, sets how hot that water is.",x_pump_flow:"Flow temperature behind the mixer: {temp}.",x_pump_needed:"It is needed right now because these circuits are open: {circuits}.",x_pump_idle:"All circuits behind it are closed, so it has nothing to do. Once switching is enabled, Heizzentrale turns it off in this situation.",x_pump_running:"The pump reports that it is running.",x_pump_stopped:"The pump reports that it is stopped.",x_pump_control:"An entity to switch it is chosen. Heizzentrale only observes for now and does not use it yet.",x_pump_modes:"Off is the mode \u201C{off}\u201D, on is the mode \u201C{on}\u201D.",x_pump_no_control:"No entity to switch it is chosen yet.",setup_title:"Setup",setup_intro:"Add the parts of your heating in this order. Only the name is required each time; sensors can be filled in later.",setup_done:"The basics are set up. You can add or change parts at any time.",setup_optional:"only if you have one",setup_source:"Heat source",setup_source_hint:"Your boiler or heat pump.",setup_buffer:"Buffer tank",setup_buffer_hint:"The tank that stores hot water, with its temperature sensors.",setup_pump:"Pump group",setup_pump_hint:"The pump, with or without mixer, that feeds the circuits.",setup_circuits:"Circuits",setup_circuits_hint:"Every branch that can be opened and closed on its own, for example one per floor.",setup_rooms:"Rooms",setup_rooms_hint:"One per thermostat. Name and floor come from Home Assistant on their own.",n_windows:"{count} window contacts",set_language:"Language",lang_auto:"Like Home Assistant",lang_de:"Deutsch",lang_en:"English",set_language_hint:"Applies to this view for everyone. The setup dialogs of Home Assistant always follow the language in your user profile.",editor_plant:"Plant",editor_title:"Title (optional)",editor_first:"First plant",stove_in_room:"In a room",stove_own_tile:"Own tile on a floor",stove_out:"out",would_close:"would close now",would_open:"would open now",would_on:"would switch on now",would_off:"would switch off now",x_adv_rooms_calling:"This circuit is needed: {rooms} is asking for heat.",x_adv_unknown_room:"This circuit stays open to be safe, because the thermostat of {rooms} cannot be read.",x_adv_no_rooms:"No rooms are assigned to this circuit, so it always counts as needed.",x_adv_waiting:"No room is asking for heat right now. After 10 minutes without demand the circuit would close.",x_adv_no_demand:"For more than 10 minutes no room on this circuit has asked for heat.",x_adv_would_close:"Heizzentrale would close it now. While observing it switches nothing.",x_adv_would_open:"Heizzentrale would open it now. While observing it switches nothing.",x_padv_manual:"Its control entity is in a mode someone chose by hand. Heizzentrale leaves it like that.",x_padv_would_off:"No circuit needs heat: Heizzentrale would switch the pump group off now. While observing it switches nothing.",x_padv_would_on:"A circuit needs heat: Heizzentrale would switch the pump group on now. While observing it switches nothing.",edit_grip:"Drag to move",edit_house:"Arrange the house",edit_done:"Done",edit_note:"Drag rooms to where they belong, also onto another floor, or use the arrows. Add further sensors to any tile.",edit_drop:"Drag a room here",edit_left:"Move left",edit_right:"Move right",edit_sensor:"Sensor",edit_sensor_title:"Sensors for {name}",edit_sensor_hint:"Shown on the tile in addition, for example humidity or a second temperature.",edit_sensor_search:"Search sensors",edit_sensor_label:"Short label (optional)",edit_sensor_add:"Add sensor",set_stoves:"Stoves",stoves_intro:"A wood stove warms its room and the rooms around it. While it burns, the radiators there are not needed. Choose per room what happens then.",add_stove:"New stove",stove_placeholder:'For example "Wood stove living room"',stove_sensor:"Temperature sensor at the stove",stove_sensor_hint:"A sensor on the stove or its flue pipe. It only has to tell whether the stove is burning.",choose:"Please choose",stove_threshold:"Burning from",stove_now:"Right now:",stove_room:"Where is the stove?",stove_room_none:"Do not show in the house",stove_actions:"While the stove burns",stove_actions_hint:"For example the room with the stove off and rooms further away on Eco. Once the stove has cooled down, the schedule applies again.",stove_leave:"Leave as it is",stove_burning:"burning",stove_summary:"Counts as burning from {degrees} \xB0C.",stove_while:"While it burns:",stove_no_rooms:"No room chosen yet, so this stove changes nothing.",stove_no_sensor:"No temperature sensor chosen yet.",plan_stove:'Stove "{name}" is burning: {action}.',stove:"Stove",day_0:"Mon",day_1:"Tue",day_2:"Wed",day_3:"Thu",day_4:"Fri",day_5:"Sat",day_6:"Sun",days_all:"Daily",decimal:".",act_on:"On",act_off:"Off",act_temperature:"Temperature \u2026",action:"Action",time:"Time",name:"Name",floors:"Whole floors",rooms_single:"Single rooms",assigned_none:"nothing yet",unnamed:"Unnamed",edit:"Edit",remove:"Remove",save:"Save",cancel:"Cancel",delete:"Delete",and:"and",minutes:"minutes",save_failed:"Could not save. Only administrators can change this.",set_schedules:"Schedules",schedules_intro:"A schedule sets thermostats at fixed times, for example Comfort in the morning and Eco at night. Assign it to single rooms or to whole floors.",add_schedule:"New schedule",schedule_placeholder:'For example "Workdays"',points:"Switch points",points_hint:"Each switch point applies from its time until the next one. If you change a thermostat by hand, that stays until the next switch point.",add_point:"Add switch point",no_points:"No switch points yet, so this schedule does nothing.",applies_to:"Applies to:",assign_hint:"A schedule for a single room wins over the schedule of its floor.",set_absence:"Absence",absence_intro:"Turn rooms down automatically while nobody is home, without building an automation. When someone is back, the schedule applies again.",add_rule:"New absence rule",rule_placeholder:'For example "Jake away"',rule_who:"Who has to be away?",rule_who_hint:"People, phones or presence sensors. With several entries all of them have to be away. If a device cannot be reached, it counts as present, so the house stays warm when in doubt.",rule_add_entity:"Add person or device",rule_delay:"Away for at least",rule_then:"Then set the rooms to",rule_sentence:"As soon as {who} is away: {targets} to {action}.",rule_sentence_delay:"When {who} has been away for more than {minutes} minutes: {targets} to {action}.",rule_back:"On return the schedule applies again; without a schedule the thermostat goes back to how it was.",rule_active:"applies now",no_entities:"No person or device chosen yet, so this rule does nothing.",set_apply:"Schedules, absence and stoves",apply_off:"Only show",apply_on:"Apply",apply_off_hint:'Heizzentrale only shows what it would set and does not touch any thermostat. Check in the room windows whether it fits, then switch to "Apply".',apply_on_hint:"Heizzentrale sets the thermostats at the switch points and when an absence rule or a stove starts or ends.",plan:"Plan",plan_schedule:'Schedule "{name}": {action}.',plan_absence:'Absence rule "{name}" applies: {action}.',plan_would:'Not applied yet, because schedules are set to "Only show".',plan_none:"No schedule assigned."},ut={loading:"Anlage wird geladen \u2026",no_plant:"Keine Anlage gefunden. F\xFCge die Integration Heizzentrale unter Einstellungen \u2192 Ger\xE4te & Dienste hinzu.",empty:"Diese Anlage hat noch keine Teile. \xD6ffne die Integration und f\xFCge W\xE4rmeerzeuger, Kreise und R\xE4ume hinzu.",mode_observe:"Beobachtet",mode_off:"Aus",mode_active:"Schaltet",x_mode_active:"Schaltet: Heizzentrale schlie\xDFt Str\xE4nge, die kein Raum braucht, und schaltet die Pumpengruppe aus, wenn kein Strang W\xE4rme braucht. Im Zweifel bleibt alles offen.",mode_confirm:"Ab jetzt schaltet Heizzentrale deine Str\xE4nge und die Pumpengruppe selbst. Ein Strang schlie\xDFt nach 10 Minuten ohne Bedarf und \xF6ffnet sofort, wenn ein Raum W\xE4rme will. Du kannst jederzeit zur\xFCck auf Beobachten; dann wird alles wieder ge\xF6ffnet und eingeschaltet.",mode_confirm_yes:"Ja, jetzt schalten",x_adv_closed:"Heizzentrale hat ihn geschlossen.",x_adv_by_hand:"Jemand hat ihn von Hand ge\xF6ffnet. Heizzentrale l\xE4sst das so, bis wieder ein Raum W\xE4rme braucht.",x_padv_off:"Kein Strang braucht W\xE4rme: Heizzentrale hat die Pumpengruppe ausgeschaltet.",x_padv_by_hand:"Jemand hat sie von Hand eingeschaltet. Heizzentrale l\xE4sst das so, bis wieder ein Strang W\xE4rme braucht.",x_padv_hand_off:"Ein Strang braucht W\xE4rme, aber die Pumpengruppe wurde von Hand ausgeschaltet. Heizzentrale schaltet nur wieder ein, was sie selbst ausgeschaltet hat.",plan_window:"Ein Fenster ist offen: {action}.",set_flow:"Vorlauf nach Bedarf",flow_hint:"Wenn alle R\xE4ume, die W\xE4rme wollen, ihre Solltemperatur erreichen, ist die Heizkurve hei\xDFer eingestellt als n\xF6tig. Heizzentrale senkt dann eine Zahl deines W\xE4rmeerzeugers in kleinen Schritten ab und hebt sie wieder an, sobald ein Raum zu kalt bleibt. W\xE4hle die Zahl, die die Heizkurve verschiebt, zum Beispiel die Raum-Solltemperatur des Heizkreises.",flow_entity:"Zahl, die die Heizkurve verschiebt",flow_none:"Nicht nutzen",flow_min:"Kleinster Wert",flow_max:"Gr\xF6\xDFter Wert",flow_step:"Schrittweite",flow_now:"Jetzt: {value}.",flow_r_unknown:"Der Wert ist nicht lesbar.",flow_r_hold:"Gerade ist keine \xC4nderung n\xF6tig.",flow_r_waiting:"{rooms} wird nicht warm. Nach der letzten \xC4nderung wartet Heizzentrale eine Stunde, bevor sie weiter anhebt.",flow_r_lagging:"{rooms} ist seit \xFCber 90 Minuten mehr als ein halbes Grad zu kalt: einen Schritt hoch auf {target}.",flow_r_covered:"Seit vier Stunden erreicht jeder Raum, der W\xE4rme wollte, seine Solltemperatur: einen Schritt runter auf {target}.",flow_r_at_max:"Der gr\xF6\xDFte Wert ist erreicht. {rooms}",flow_r_at_min:"Der kleinste Wert ist erreicht.",flow_apply_off:"Heizzentrale zeigt nur, was sie stellen w\xFCrde, und \xE4ndert die Zahl nicht.",flow_apply_on:"Heizzentrale \xE4ndert die Zahl selbst, immer nur einen Schritt und nur innerhalb deiner Grenzen. \u201ENur anzeigen\u201C stellt sie zur\xFCck auf den Wert von vorher.",x_flow:"Vorlauf nach Bedarf: {text}",set_window:"Offene Fenster",window_on:"Raum ausschalten",window_off:"Nichts \xE4ndern",window_delay:"Wartezeit bis zum Ausschalten (Minuten)",window_hint:"Solange ein Fenster eines Raums offen ist, wird sein Thermostat ausgeschaltet und beim Schlie\xDFen wieder zur\xFCckgestellt. Ein Raum ohne Fensterkontakt ist nie betroffen.",outdoor:"Au\xDFen",other_rooms:"Weitere R\xE4ume",plant_room:"Heizraum",flow:"Vorlauf",return:"R\xFCcklauf",spread:"Spreizung",target:"Soll",heating:"heizt",idle:"ruht",window_open:"Fenster offen",open:"offen",closed:"zu",unknown:"unbekannt",running:"l\xE4uft",close:"Schlie\xDFen",system_two_pipe:"Zweirohr",system_one_pipe:"Einrohr",system_underfloor:"Fu\xDFbodenheizung",system_other:"Kreis",kind_pellet:"Pelletkessel",kind_wood:"Holzkessel",kind_gas:"Gastherme",kind_oil:"\xD6lkessel",kind_heat_pump:"W\xE4rmepumpe",kind_district:"Fernw\xE4rme",kind_other:"W\xE4rmeerzeuger",x_what_circuit:"{name} ist ein Strang ({system}). Hei\xDFes Wasser flie\xDFt zu den Heizk\xF6rpern (Vorlauf) und kommt k\xFChler zur\xFCck (R\xFCcklauf).",x_spread:"Vorlauf {flow}, R\xFCcklauf {ret}: Die Spreizung betr\xE4gt {spread}. Eine gr\xF6\xDFere Spreizung hei\xDFt, das Wasser gibt unterwegs mehr W\xE4rme ab.",x_no_spread:"F\xFCr die Spreizung braucht es einen Vorlauf- und einen R\xFCcklauff\xFChler.",x_open_nc:"Der Strang ist offen, weil sein Stellantrieb Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_closed_nc:"Der Strang ist zu, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_open_no:"Der Strang ist offen, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_closed_no:"Der Strang ist zu, weil sein Stellantrieb Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_open_valve:"Das Ventil meldet, dass es offen ist.",x_closed_valve:"Das Ventil meldet, dass es zu ist.",x_valve_unknown:"Der Stellantrieb meldet gerade keinen Zustand. Heizzentrale behandelt den Strang als m\xF6glicherweise offen.",x_no_valve:"Dieser Strang hat keinen Stellantrieb und ist deshalb immer offen.",x_rooms_on:"R\xE4ume an diesem Strang: {rooms}.",x_room_heating:"{name} heizt gerade: Es hat {current} und soll {target} haben.",x_room_idle:"{name} heizt nicht: Es hat {current}, Soll {target}.",x_room_off:"{name} ist ausgeschaltet.",x_room_unavailable:"Das Thermostat von {name} ist gerade nicht erreichbar.",x_room_window:"Ein Fenster ist offen, deshalb pausiert die Heizung hier.",x_room_preset:"Aktives Preset: {preset}.",x_room_circuit:"Die Heizk\xF6rper h\xE4ngen am Strang {circuit}.",x_buffer:"{name} speichert hei\xDFes Wasser, damit der W\xE4rmeerzeuger nicht f\xFCr jeden kleinen Bedarf starten muss. Oben sammelt sich das hei\xDFe Wasser.",x_buffer_mean:"Mittlere Temperatur: {mean}.",x_source:"{name} erzeugt die W\xE4rme f\xFCr das Haus. Status: {status}.",x_source_temp:"Temperatur: {temp}.",x_mode_observe:"Beobachtungsmodus: Heizzentrale misst und erkl\xE4rt, schaltet aber keinen Strang und keine Pumpe.",x_mode_off:"Aus: Heizzentrale misst nur.",settings:"Einstellungen",back:"Zur\xFCck zum Haus",circuit:"Strang",why:"Was gerade passiert",room_turn_off:"Heizung in diesem Raum ausschalten",room_turn_on:"Heizung in diesem Raum einschalten",open_thermostat:"Details zum Thermostat \xF6ffnen",set_mode:"Betriebsart",set_sources:"W\xE4rmeerzeuger",set_buffers:"Pufferspeicher",set_circuits:"Str\xE4nge",set_rooms:"R\xE4ume",none_yet:"Noch nichts angelegt.",n_rooms:"{count} R\xE4ume",one_room:"1 Raum",n_sensors:"{count} F\xFChler",valve_nc:"Stellantrieb stromlos zu",valve_no:"Stellantrieb stromlos offen",valve_none:"kein Stellantrieb",has_window:"Fensterkontakt",warn_no_sensor:"Kein Temperaturf\xFChler zugewiesen.",warn_no_pipe_sensors:"Vorlauf- oder R\xFCcklauff\xFChler fehlt, deshalb gibt es keine Spreizung.",warn_no_rooms:"Noch kein Raum h\xE4ngt an diesem Strang.",warn_no_circuit:"Kein Strang zugewiesen, deshalb f\xFChrt keine Leitung zu diesem Raum.",warn_no_floor:"Kein Stockwerk gefunden. Weise das Thermostat in Home Assistant einem Bereich mit Stockwerk zu.",edit_parts:"Teile hinzuf\xFCgen oder \xE4ndern",edit_hint:"\xD6ffnet die Heizzentrale-Seite von Home Assistant. Dort werden W\xE4rmeerzeuger, Puffer, Str\xE4nge und R\xE4ume angelegt und ge\xE4ndert.",pump_group:"Pumpengruppe",pump_stopped:"steht",set_pumps:"Pumpengruppen",n_circuits:"{count} Str\xE4nge",pump_switchable:"schaltbar",warn_no_control:"Keine Entit\xE4t zum Schalten gew\xE4hlt. Heizzentrale kann sie dann nicht ausschalten, wenn alle Str\xE4nge zu sind.",x_pump:"{name} dr\xFCckt das Heizwasser in die Str\xE4nge dahinter. Ein Mischer, falls vorhanden, bestimmt, wie hei\xDF dieses Wasser ist.",x_pump_flow:"Vorlauftemperatur hinter dem Mischer: {temp}.",x_pump_needed:"Sie wird gerade gebraucht, weil diese Str\xE4nge offen sind: {circuits}.",x_pump_idle:"Alle Str\xE4nge dahinter sind zu, sie hat also nichts zu tun. Sobald das Schalten freigegeben ist, schaltet Heizzentrale sie in dieser Lage aus.",x_pump_running:"Die Pumpe meldet, dass sie l\xE4uft.",x_pump_stopped:"Die Pumpe meldet, dass sie steht.",x_pump_control:"Eine Entit\xE4t zum Schalten ist gew\xE4hlt. Heizzentrale beobachtet vorerst nur und benutzt sie noch nicht.",x_pump_modes:"Aus ist der Modus \u201E{off}\u201C, An ist der Modus \u201E{on}\u201C.",x_pump_no_control:"Es ist noch keine Entit\xE4t zum Schalten gew\xE4hlt.",setup_title:"Einrichtung",setup_intro:"Lege die Teile deiner Heizung in dieser Reihenfolge an. Pflicht ist jeweils nur der Name, F\xFChler kannst du nachtragen.",setup_done:"Die Grundeinrichtung steht. Du kannst jederzeit Teile hinzuf\xFCgen oder \xE4ndern.",setup_optional:"nur falls vorhanden",setup_source:"W\xE4rmeerzeuger",setup_source_hint:"Dein Kessel oder deine W\xE4rmepumpe.",setup_buffer:"Pufferspeicher",setup_buffer_hint:"Der Speicher f\xFCr hei\xDFes Wasser mit seinen Temperaturf\xFChlern.",setup_pump:"Pumpengruppe",setup_pump_hint:"Die Pumpe, mit oder ohne Mischer, die die Str\xE4nge versorgt.",setup_circuits:"Str\xE4nge",setup_circuits_hint:"Jeder Teil, der sich einzeln \xF6ffnen und schlie\xDFen l\xE4sst, zum Beispiel einer pro Stockwerk.",setup_rooms:"R\xE4ume",setup_rooms_hint:"Einer pro Thermostat. Name und Stockwerk kommen von selbst aus Home Assistant.",n_windows:"{count} Fensterkontakte",set_language:"Sprache",lang_auto:"Wie Home Assistant",lang_de:"Deutsch",lang_en:"English",set_language_hint:"Gilt f\xFCr diese Ansicht bei allen. Die Einrichtungsdialoge von Home Assistant folgen immer der Sprache in deinem Benutzerprofil.",editor_plant:"Anlage",editor_title:"Titel (optional)",editor_first:"Erste Anlage",stove_in_room:"In einem Raum",stove_own_tile:"Eigene Kachel im Stockwerk",stove_out:"aus",would_close:"w\xFCrde jetzt schlie\xDFen",would_open:"w\xFCrde jetzt \xF6ffnen",would_on:"w\xFCrde jetzt einschalten",would_off:"w\xFCrde jetzt ausschalten",x_adv_rooms_calling:"Der Strang wird gebraucht: {rooms} will W\xE4rme.",x_adv_unknown_room:"Der Strang bleibt sicherheitshalber offen, weil das Thermostat von {rooms} nicht lesbar ist.",x_adv_no_rooms:"Diesem Strang sind keine R\xE4ume zugeordnet, deshalb gilt er immer als gebraucht.",x_adv_waiting:"Gerade will kein Raum W\xE4rme. Nach 10 Minuten ohne Bedarf w\xFCrde der Strang schlie\xDFen.",x_adv_no_demand:"Seit \xFCber 10 Minuten will kein Raum an diesem Strang W\xE4rme.",x_adv_would_close:"Heizzentrale w\xFCrde ihn jetzt schlie\xDFen. Solange sie nur beobachtet, schaltet sie nichts.",x_adv_would_open:"Heizzentrale w\xFCrde ihn jetzt \xF6ffnen. Solange sie nur beobachtet, schaltet sie nichts.",x_padv_manual:"Die Steuer-Entit\xE4t steht in einem Modus, den jemand von Hand gew\xE4hlt hat. Heizzentrale l\xE4sst das so.",x_padv_would_off:"Kein Strang braucht W\xE4rme: Heizzentrale w\xFCrde die Pumpengruppe jetzt ausschalten. Solange sie nur beobachtet, schaltet sie nichts.",x_padv_would_on:"Ein Strang braucht W\xE4rme: Heizzentrale w\xFCrde die Pumpengruppe jetzt einschalten. Solange sie nur beobachtet, schaltet sie nichts.",edit_grip:"Zum Verschieben ziehen",edit_house:"Haus anordnen",edit_done:"Fertig",edit_note:"Ziehe R\xE4ume an ihren Platz, auch in ein anderes Stockwerk, oder nutze die Pfeile. An jede Kachel kannst du weitere F\xFChler h\xE4ngen.",edit_drop:"Raum hierher ziehen",edit_left:"Nach links",edit_right:"Nach rechts",edit_sensor:"F\xFChler",edit_sensor_title:"F\xFChler f\xFCr {name}",edit_sensor_hint:"Wird zus\xE4tzlich auf der Kachel angezeigt, zum Beispiel Luftfeuchte oder eine zweite Temperatur.",edit_sensor_search:"F\xFChler suchen",edit_sensor_label:"Kurze Beschriftung (optional)",edit_sensor_add:"F\xFChler hinzuf\xFCgen",set_stoves:"\xD6fen",stoves_intro:"Ein Schwedenofen w\xE4rmt seinen Raum und die R\xE4ume drumherum. Solange er brennt, braucht es dort keine Heizk\xF6rper. Lege pro Raum fest, was dann passiert.",add_stove:"Neuer Ofen",stove_placeholder:"Zum Beispiel \u201ESchwedenofen Wohnzimmer\u201C",stove_sensor:"Temperaturf\xFChler am Ofen",stove_sensor_hint:"Ein F\xFChler am Ofen oder am Ofenrohr. Er muss nur verraten, ob der Ofen brennt.",choose:"Bitte w\xE4hlen",stove_threshold:"Brennt ab",stove_now:"Gerade:",stove_room:"Wo steht der Ofen?",stove_room_none:"Nicht im Haus anzeigen",stove_actions:"Solange der Ofen brennt",stove_actions_hint:"Zum Beispiel den Raum mit dem Ofen aus und weiter entfernte R\xE4ume auf Eco. Ist der Ofen abgek\xFChlt, gilt wieder der Zeitplan.",stove_leave:"So lassen",stove_burning:"brennt",stove_summary:"Gilt als an ab {degrees} \xB0C.",stove_while:"Solange er brennt:",stove_no_rooms:"Noch kein Raum gew\xE4hlt, dieser Ofen \xE4ndert also nichts.",stove_no_sensor:"Noch kein Temperaturf\xFChler gew\xE4hlt.",plan_stove:"Ofen \u201E{name}\u201C brennt: {action}.",stove:"Ofen",day_0:"Mo",day_1:"Di",day_2:"Mi",day_3:"Do",day_4:"Fr",day_5:"Sa",day_6:"So",days_all:"T\xE4glich",decimal:",",act_on:"An",act_off:"Aus",act_temperature:"Temperatur \u2026",action:"Aktion",time:"Uhrzeit",name:"Name",floors:"Ganze Stockwerke",rooms_single:"Einzelne R\xE4ume",assigned_none:"noch nichts",unnamed:"Ohne Namen",edit:"Bearbeiten",remove:"Entfernen",save:"Speichern",cancel:"Abbrechen",delete:"L\xF6schen",and:"und",minutes:"Minuten",save_failed:"Speichern nicht m\xF6glich. Das d\xFCrfen nur Administratoren \xE4ndern.",set_schedules:"Zeitpl\xE4ne",schedules_intro:"Ein Zeitplan stellt Thermostate zu festen Zeiten um, zum Beispiel morgens auf Komfort und nachts auf Eco. Du weist ihn einzelnen R\xE4umen oder ganzen Stockwerken zu.",add_schedule:"Neuer Zeitplan",schedule_placeholder:"Zum Beispiel \u201EWerktage\u201C",points:"Schaltpunkte",points_hint:"Jeder Schaltpunkt gilt ab seiner Uhrzeit bis zum n\xE4chsten. Stellst du ein Thermostat von Hand um, bleibt das bis zum n\xE4chsten Schaltpunkt so.",add_point:"Schaltpunkt hinzuf\xFCgen",no_points:"Noch keine Schaltpunkte, dieser Zeitplan macht also nichts.",applies_to:"Gilt f\xFCr:",assign_hint:"Ein Zeitplan f\xFCr einen einzelnen Raum hat Vorrang vor dem Zeitplan seines Stockwerks.",set_absence:"Abwesenheit",absence_intro:"R\xE4ume automatisch absenken, solange niemand da ist, ganz ohne eigene Automation. Ist wieder jemand da, gilt der Zeitplan weiter.",add_rule:"Neue Abwesenheitsregel",rule_placeholder:"Zum Beispiel \u201EJake unterwegs\u201C",rule_who:"Wer muss weg sein?",rule_who_hint:"Personen, Handys oder Anwesenheitssensoren. Bei mehreren Eintr\xE4gen m\xFCssen alle weg sein. Ist ein Ger\xE4t nicht erreichbar, z\xE4hlt es als anwesend, damit es im Zweifel warm bleibt.",rule_add_entity:"Person oder Ger\xE4t hinzuf\xFCgen",rule_delay:"Mindestens weg seit",rule_then:"Dann die R\xE4ume stellen auf",rule_sentence:"Sobald {who} weg ist: {targets} auf {action}.",rule_sentence_delay:"Wenn {who} l\xE4nger als {minutes} Minuten weg ist: {targets} auf {action}.",rule_back:"Bei R\xFCckkehr gilt wieder der Zeitplan; ohne Zeitplan geht das Thermostat auf den Stand von vorher zur\xFCck.",rule_active:"trifft gerade zu",no_entities:"Noch keine Person und kein Ger\xE4t gew\xE4hlt, diese Regel macht also nichts.",set_apply:"Zeitpl\xE4ne, Abwesenheit und \xD6fen",apply_off:"Nur anzeigen",apply_on:"Anwenden",apply_off_hint:"Heizzentrale zeigt nur, was sie stellen w\xFCrde, und fasst kein Thermostat an. Schau in den Raumfenstern, ob es passt, und stelle dann auf \u201EAnwenden\u201C.",apply_on_hint:"Heizzentrale stellt die Thermostate an den Schaltpunkten um und wenn eine Abwesenheitsregel beginnt oder endet oder ein Ofen an- oder ausgeht.",plan:"Plan",plan_schedule:"Zeitplan \u201E{name}\u201C: {action}.",plan_absence:"Abwesenheitsregel \u201E{name}\u201C trifft zu: {action}.",plan_would:"Noch nicht angewendet, weil Zeitpl\xE4ne auf \u201ENur anzeigen\u201C stehen.",plan_none:"Kein Zeitplan zugewiesen."};function Te(u){let s=(u??"en").toLowerCase().startsWith("de")?ut:Je;return(e,t={})=>(s[e]??Je[e]??e).replace(/\{(\w+)\}/g,(n,i)=>t[i]??"")}var ue=["day_0","day_1","day_2","day_3","day_4","day_5","day_6"],pt=new Set(["presence","connectivity","occupancy"]);function Ce(){return Math.random().toString(36).slice(2,10)}function Pe(u,s,e,t){if(u==="on")return s("act_on");if(u==="off")return s("act_off");if(u.startsWith("temperature:"))return`${u.slice(12).replace(".",s("decimal"))} \xB0C`;let n=u.slice(7),i=t?e?.states[t]:void 0;return i&&e?.formatEntityAttributeValue?e.formatEntityAttributeValue(i,"preset_mode",n):n.charAt(0).toUpperCase()+n.slice(1)}function mt(u,s){let e=[...new Set(u)].sort();if(e.length===7)return s("days_all");let t=[];for(let n of e){let i=t[t.length-1];i&&i[i.length-1]===n-1?i.push(n):t.push([n])}return t.map(n=>n.length>2?`${s(ue[n[0]])}\u2013${s(ue[n[n.length-1]])}`:n.map(i=>s(ue[i])).join(", ")).join(", ")}var ne=class extends P{constructor(){super(...arguments);this.t=e=>e;this._busy=!1}async _save(e){if(!this.hass||!this.plant)return!1;this._busy=!0;try{let t=await this.hass.callWS({type:"heizzentrale/control/save",entry_id:this.plant.entry_id,...e});return this._error=void 0,this.dispatchEvent(new CustomEvent("control-changed",{detail:t})),!0}catch(t){return this._error=`${this.t("save_failed")} ${t?.message??""}`,!1}finally{this._busy=!1}}_presets(){let e=[];for(let t of this.plant?.rooms??[]){let n=t.climate_entity?this.hass?.states[t.climate_entity]?.attributes.preset_modes:void 0;for(let i of Array.isArray(n)?n:[])i!=="none"&&!e.includes(i)&&e.push(i)}return e}_climateWith(e){return this.plant?.rooms.find(t=>t.climate_entity&&this.hass?.states[t.climate_entity]?.attributes.preset_modes?.includes(e))?.climate_entity}_label(e){let t=e.startsWith("preset:")?this._climateWith(e.slice(7)):void 0;return Pe(e,this.t,this.hass,t)}_actionPicker(e,t,n){let i=this.t,r=e.startsWith("temperature:"),l=this._presets().map(a=>`preset:${a}`);return e.startsWith("preset:")&&!l.includes(e)&&l.push(e),h`
      <select
        aria-label=${i("action")}
        @change=${a=>{let o=a.target.value;t(o==="temperature"?"temperature:20":o)}}
      >
        ${n!==void 0?h`<option value="" ?selected=${e===""}>${n}</option>`:m}
        ${l.map(a=>h`<option value=${a} ?selected=${e===a}>
              ${this._label(a)}
            </option>`)}
        <option value="on" ?selected=${e==="on"}>${i("act_on")}</option>
        <option value="off" ?selected=${e==="off"}>${i("act_off")}</option>
        <option value="temperature" ?selected=${r}>${i("act_temperature")}</option>
      </select>
      ${r?h`<input
            class="short"
            type="number"
            min="5"
            max="30"
            step="0.5"
            aria-label="°C"
            .value=${e.slice(12)}
            @change=${a=>{let o=Number(a.target.value);if(Number.isFinite(o)){let c=Math.round(Math.min(30,Math.max(5,o))*2)/2;t(`temperature:${c}`)}}}
          />`:m}
    `}_targetPicker(e,t){let n=this.t,i=(l,a)=>l.includes(a)?l.filter(o=>o!==a):[...l,a],r=this.plant;return r?h`
      ${r.floors.length?h`<div class="label">${n("floors")}</div>
            <div class="choices">
              ${r.floors.map(l=>h`<button
                    class="choice ${e.floors.includes(l.id)?"on":""}"
                    aria-pressed=${e.floors.includes(l.id)}
                    @click=${()=>t(e.rooms,i(e.floors,l.id))}
                  >
                    ${l.name}
                  </button>`)}
            </div>`:m}
      <div class="label">${n("rooms_single")}</div>
      <div class="choices">
        ${r.rooms.map(l=>{let a=!!l.floor&&e.floors.includes(l.floor),o=e.rooms.includes(l.id);return h`<button
            class="choice ${o?"on":a?"via":""}"
            aria-pressed=${o}
            @click=${()=>t(i(e.rooms,l.id),e.floors)}
          >
            ${l.name}
          </button>`})}
      </div>
    `:m}_targetNames(e){let t=this.plant,n=[...e.floors.map(i=>t?.floors.find(r=>r.id===i)?.name),...e.rooms.map(i=>t?.rooms.find(r=>r.id===i)?.name)].filter(Boolean);return n.length?n.join(", "):this.t("assigned_none")}_renderSchedule(e){let t=this.t,n=[...e.points].sort((i,r)=>Math.min(...i.days)-Math.min(...r.days)||i.time.localeCompare(r.time));return h`
      <li>
        <div class="row-main">
          <span class="row-name">${e.name||t("unnamed")}</span>
          <button class="link" @click=${()=>this._schedule=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        ${n.length?n.map(i=>h`<div class="row-detail">
                  ${mt(i.days,t)} ${i.time} · ${this._label(i.action)}
                </div>`):h`<div class="row-warn">${t("no_points")}</div>`}
        <div class="row-detail">${t("applies_to")} ${this._targetNames(e)}</div>
      </li>
    `}_renderScheduleEditor(e){let t=this.t,n=a=>this._schedule={...e,...a},i=(a,o)=>n({points:e.points.map((c,d)=>d===a?{...c,...o}:c)}),r=this.control?.schedules.some(a=>a.id===e.id),l=async()=>{let a={...e,name:e.name.trim(),points:e.points.filter(d=>d.days.length)},o=(this.control?.schedules??[]).filter(d=>d.id!==e.id),c=r?(this.control?.schedules??[]).map(d=>d.id===e.id?a:d):[...o,a];await this._save({schedules:c})&&(this._schedule=void 0)};return h`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${e.name}
            placeholder=${t("schedule_placeholder")}
            @input=${a=>n({name:a.target.value})}
          />
        </label>
        <div class="label">${t("points")}</div>
        <p class="hint first">${t("points_hint")}</p>
        ${e.points.map((a,o)=>h`
            <div class="point">
              <div class="days">
                ${ue.map((c,d)=>h`<button
                      class="day ${a.days.includes(d)?"on":""}"
                      aria-pressed=${a.days.includes(d)}
                      @click=${()=>i(o,{days:a.days.includes(d)?a.days.filter(p=>p!==d):[...a.days,d].sort()})}
                    >
                      ${t(c)}
                    </button>`)}
              </div>
              <div class="point-line">
                <input
                  type="time"
                  aria-label=${t("time")}
                  .value=${a.time}
                  @change=${c=>i(o,{time:c.target.value||a.time})}
                />
                ${this._actionPicker(a.action,c=>i(o,{action:c}))}
                <button
                  class="icon"
                  aria-label=${t("remove")}
                  @click=${()=>n({points:e.points.filter((c,d)=>d!==o)})}
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
        ${this._targetPicker(e,(a,o)=>n({rooms:a,floors:o}))}
        ${this._renderEditorButtons(l,()=>this._schedule=void 0,r?async()=>{let a=(this.control?.schedules??[]).filter(o=>o.id!==e.id);await this._save({schedules:a})&&(this._schedule=void 0)}:void 0)}
      </div>
    `}_renderEditorButtons(e,t,n){let i=this.t;return h`
      ${this._error?h`<div class="row-warn">${this._error}</div>`:m}
      <div class="buttons">
        <button class="wide primary" ?disabled=${this._busy} @click=${e}>${i("save")}</button>
        <button class="wide" @click=${t}>${i("cancel")}</button>
        ${n?h`<button class="wide danger" ?disabled=${this._busy} @click=${n}>
              ${i("delete")}
            </button>`:m}
      </div>
    `}_entityName(e){return this.hass?.states[e]?.attributes.friendly_name??e}_candidates(){return Object.entries(this.hass?.states??{}).filter(([e,t])=>{let n=e.split(".",1)[0];return n==="person"||n==="device_tracker"||n==="input_boolean"?!0:n==="binary_sensor"&&pt.has(t.attributes.device_class)}).map(([e])=>e).sort((e,t)=>this._entityName(e).localeCompare(this._entityName(t)))}_ruleSentence(e){let t=this.t,n=e.entities.map(i=>this._entityName(i)).join(` ${t("and")} `);return t(e.delay_min>0?"rule_sentence_delay":"rule_sentence",{who:n||"?",minutes:String(e.delay_min),targets:this._targetNames(e),action:this._label(e.action)})}_renderRule(e){let t=this.t,n=this.control?.active_rules.includes(e.id);return h`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${e.name||t("unnamed")}${n?h`<span class="badge">${t("rule_active")}</span>`:m}</span
          >
          <button class="link" @click=${()=>this._rule=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        <div class="row-detail">${this._ruleSentence(e)}</div>
        ${e.entities.length?m:h`<div class="row-warn">${t("no_entities")}</div>`}
      </li>
    `}_renderRuleEditor(e){let t=this.t,n=a=>this._rule={...e,...a},i=this.control?.rules.some(a=>a.id===e.id),r=this._candidates().filter(a=>!e.entities.includes(a)),l=async()=>{let a={...e,name:e.name.trim()},o=this.control?.rules??[],c=i?o.map(d=>d.id===e.id?a:d):[...o,a];await this._save({rules:c})&&(this._rule=void 0)};return h`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${e.name}
            placeholder=${t("rule_placeholder")}
            @input=${a=>n({name:a.target.value})}
          />
        </label>
        <div class="label">${t("rule_who")}</div>
        <p class="hint first">${t("rule_who_hint")}</p>
        <div class="choices">
          ${e.entities.map(a=>h`<button
                class="choice on"
                title=${a}
                @click=${()=>n({entities:e.entities.filter(o=>o!==a)})}
              >
                ${this._entityName(a)} ✕
              </button>`)}
        </div>
        <select
          aria-label=${t("rule_add_entity")}
          @change=${a=>{let o=a.target;o.value&&n({entities:[...e.entities,o.value]}),o.value=""}}
        >
          <option value="">+ ${t("rule_add_entity")}</option>
          ${r.map(a=>h`<option value=${a}>
                ${this._entityName(a)} (${a.split(".",1)[0]})
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
            @change=${a=>{let o=Number(a.target.value);n({delay_min:Number.isFinite(o)?Math.min(1440,Math.max(0,o)):0})}}
          />
          <span class="row-detail">${t("minutes")}</span>
        </label>
        <div class="label">${t("rule_then")}</div>
        <div class="point-line">
          ${this._actionPicker(e.action,a=>n({action:a}))}
        </div>
        <div class="label">${t("applies_to")}</div>
        ${this._targetPicker(e,(a,o)=>n({rooms:a,floors:o}))}
        <p class="hint">${this._ruleSentence(e)} ${t("rule_back")}</p>
        ${this._renderEditorButtons(l,()=>this._rule=void 0,i?async()=>{let a=(this.control?.rules??[]).filter(o=>o.id!==e.id);await this._save({rules:a})&&(this._rule=void 0)}:void 0)}
      </div>
    `}_stoveTemp(e){let t=e.sensor?this.hass?.states[e.sensor]:void 0,n=Number(t?.state);return!t||!Number.isFinite(n)?"":`${Math.round(n)} ${t.attributes.unit_of_measurement??"\xB0C"}`}_renderStove(e){let t=this.t,n=this.control?.burning?.includes(e.id),i=Object.entries(e.actions).map(([r,l])=>{let a=this.plant?.rooms.find(o=>o.id===r);return a?`${a.name} ${this._label(l)}`:""}).filter(Boolean);return h`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${e.name||t("unnamed")}${n?h`<span class="badge hot">${t("stove_burning")}</span>`:m}</span
          >
          <button class="link" @click=${()=>this._stove=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        <div class="row-detail">
          ${t("stove_summary",{degrees:String(e.on_above)})}
          ${this._stoveTemp(e)?`${t("stove_now")} ${this._stoveTemp(e)}.`:""}
        </div>
        ${i.length?h`<div class="row-detail">${t("stove_while")} ${i.join(", ")}</div>`:h`<div class="row-warn">${t("stove_no_rooms")}</div>`}
        ${e.sensor?m:h`<div class="row-warn">${t("stove_no_sensor")}</div>`}
      </li>
    `}_renderStoveEditor(e){let t=this.t,n=o=>this._stove={...e,...o},i=this.control?.stoves??[],r=i.some(o=>o.id===e.id),l=Object.entries(this.hass?.states??{}).filter(([o,c])=>o.startsWith("sensor.")&&c.attributes.device_class==="temperature").map(([o])=>o).sort((o,c)=>this._entityName(o).localeCompare(this._entityName(c)));e.sensor&&!l.includes(e.sensor)&&l.unshift(e.sensor);let a=async()=>{let o={...e,name:e.name.trim()},c=r?i.map(d=>d.id===e.id?o:d):[...i,o];await this._save({stoves:c})&&(this._stove=void 0)};return h`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${e.name}
            placeholder=${t("stove_placeholder")}
            @input=${o=>n({name:o.target.value})}
          />
        </label>
        <div class="label">${t("stove_sensor")}</div>
        <p class="hint first">${t("stove_sensor_hint")}</p>
        <select
          aria-label=${t("stove_sensor")}
          @change=${o=>n({sensor:o.target.value||null})}
        >
          <option value="" ?selected=${!e.sensor}>${t("choose")}</option>
          ${l.map(o=>h`<option value=${o} ?selected=${e.sensor===o}>
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
            @change=${o=>{let c=Number(o.target.value);n({on_above:Number.isFinite(c)?Math.min(500,Math.max(25,c)):40})}}
          />
          <span class="row-detail"
            >°C ${this._stoveTemp(e)?`\xB7 ${t("stove_now")} ${this._stoveTemp(e)}`:""}</span
          >
        </label>
        <label class="field">
          <span class="label">${t("stove_room")}</span>
          <select
            @change=${o=>{let[c,d]=o.target.value.split(":");n({room:c==="room"?d:null,floor:c==="floor"?d:null})}}
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
                ${this._actionPicker(e.actions[o.id]??"",c=>{let d={...e.actions};c?d[o.id]=c:delete d[o.id],n({actions:d})},t("stove_leave"))}
              </span>
            </div>
          `)}
        ${this._renderEditorButtons(a,()=>this._stove=void 0,r?async()=>{let o=i.filter(c=>c.id!==e.id);await this._save({stoves:o})&&(this._stove=void 0)}:void 0)}
      </div>
    `}_roomLabel(e){let t=this.plant?.floors.find(n=>n.id===e.floor);return t?`${e.name} (${t.name})`:e.name}render(){let e=this.t,t=this.control;if(!t||!this.plant)return m;let n=this._presets().includes("away")?"preset:away":"off",i=t.stoves??[],r=t.window??{enabled:!0,delay_min:2};return h`${this._renderMain(t,n,i)}${this._renderFlow(t)}
    ${this._renderTail(t,r)}`}_renderFlow(e){let t=this.t,n=e.flow??{entity:null,min:19,max:22,step:.5,apply:!1},i=()=>({entity:n.entity,min:n.min,max:n.max,step:n.step,apply:n.apply}),r=Object.keys(this.hass?.states??{}).filter(d=>d.startsWith("number.")||d.startsWith("input_number.")).filter(d=>{let p=this.hass.states[d].attributes.unit_of_measurement;return p==="\xB0C"||p==="K"||p==="\xB0F"||d===n.entity}).sort((d,p)=>this._entityName(d).localeCompare(this._entityName(p))),l=n.entity?this.hass?.states[n.entity]?.attributes.unit_of_measurement??"":"",a=d=>d==null?"?":`${d.toLocaleString(this.language||void 0,{maximumFractionDigits:1})} ${l}`.trim(),o=(d,p,g)=>h`
      <label class="field inline">
        <span class="label">${t(`flow_${d}`)}</span>
        <input
          class="short"
          type="number"
          min=${p}
          max=${g}
          step="0.1"
          .value=${String(n[d])}
          @change=${_=>{let k=Number(_.target.value);if(!Number.isFinite(k))return;let b={...i(),[d]:Math.min(g,Math.max(p,k))};b.min>b.max&&(d==="min"?b.max=b.min:b.min=b.max),this._save({flow:b})}}
        />
      </label>
    `,c=n.reason??"unknown";return h`
      <section class="set">
        <h3>${t("set_flow")}</h3>
        <p class="hint first">${t("flow_hint")}</p>
        <div class="label">${t("flow_entity")}</div>
        <select
          aria-label=${t("flow_entity")}
          ?disabled=${this._busy}
          @change=${d=>this._save({flow:{...i(),entity:d.target.value||null,apply:!1}})}
        >
          <option value="" ?selected=${!n.entity}>${t("flow_none")}</option>
          ${r.map(d=>h`<option value=${d} ?selected=${n.entity===d}>
                ${this._entityName(d)}
              </option>`)}
        </select>
        ${n.entity?h`
              ${o("min",-50,100)} ${o("max",-50,100)} ${o("step",.1,5)}
              <div class="status">
                <p>
                  ${t("flow_now",{value:a(n.value)})}
                  ${t(`flow_r_${c}`,{rooms:(n.rooms??[]).join(", "),target:a(n.target)})}
                </p>
                ${(n.history??[]).slice(-3).reverse().map(d=>h`<p class="row-detail">
                        ${new Date(d.time).toLocaleString(this.language||void 0,{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}:
                        ${a(d.from)} → ${a(d.to)}
                      </p>`)}
              </div>
              <div class="choices">
                ${[!1,!0].map(d=>h`<button
                      class="choice ${n.apply===d?"on":""}"
                      aria-pressed=${n.apply===d}
                      ?disabled=${this._busy}
                      @click=${()=>this._save({flow:{...i(),apply:d}})}
                    >
                      ${t(d?"apply_on":"apply_off")}
                    </button>`)}
              </div>
              <p class="hint">${t(n.apply?"flow_apply_on":"flow_apply_off")}</p>
            `:m}
      </section>
    `}_renderMain(e,t,n){let i=this.t;return h`
      <section class="set">
        <h3>${i("set_schedules")}</h3>
        <p class="hint first">${i("schedules_intro")}</p>
        ${e.schedules.length?h`<ul>
              ${e.schedules.map(r=>this._schedule?.id===r.id?h`<li>${this._renderScheduleEditor(this._schedule)}</li>`:this._renderSchedule(r))}
            </ul>`:m}
        ${this._schedule&&!e.schedules.some(r=>r.id===this._schedule.id)?h`<div class="new">${this._renderScheduleEditor(this._schedule)}</div>`:h`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._schedule={id:Ce(),name:"",points:[],rooms:[],floors:[]}}}
            >
              + ${i("add_schedule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${i("set_absence")}</h3>
        <p class="hint first">${i("absence_intro")}</p>
        ${e.rules.length?h`<ul>
              ${e.rules.map(r=>this._rule?.id===r.id?h`<li>${this._renderRuleEditor(this._rule)}</li>`:this._renderRule(r))}
            </ul>`:m}
        ${this._rule&&!e.rules.some(r=>r.id===this._rule.id)?h`<div class="new">${this._renderRuleEditor(this._rule)}</div>`:h`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._rule={id:Ce(),name:"",entities:[],delay_min:10,rooms:[],floors:[],action:t}}}
            >
              + ${i("add_rule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${i("set_stoves")}</h3>
        <p class="hint first">${i("stoves_intro")}</p>
        ${n.length?h`<ul>
              ${n.map(r=>this._stove?.id===r.id?h`<li>${this._renderStoveEditor(this._stove)}</li>`:this._renderStove(r))}
            </ul>`:m}
        ${this._stove&&!n.some(r=>r.id===this._stove.id)?h`<div class="new">${this._renderStoveEditor(this._stove)}</div>`:h`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._stove={id:Ce(),name:"",sensor:null,on_above:40,room:null,floor:null,actions:{}}}}
            >
              + ${i("add_stove")}
            </button>`}
      </section>
    `}_renderTail(e,t){let n=this.t;return h`
      <section class="set">
        <h3>${n("set_window")}</h3>
        <div class="choices">
          ${[!1,!0].map(i=>h`<button
                class="choice ${t.enabled===i?"on":""}"
                aria-pressed=${t.enabled===i}
                ?disabled=${this._busy}
                @click=${()=>this._save({window:{...t,enabled:i}})}
              >
                ${n(i?"window_on":"window_off")}
              </button>`)}
        </div>
        ${t.enabled?h`<label class="field inline">
              <span class="label">${n("window_delay")}</span>
              <input
                class="short"
                type="number"
                min="0"
                max="60"
                step="1"
                .value=${String(t.delay_min)}
                @change=${i=>{let r=Number(i.target.value);this._save({window:{...t,delay_min:Number.isFinite(r)?Math.min(60,Math.max(0,r)):2}})}}
              />
            </label>`:m}
        <p class="hint">${n("window_hint")}</p>
      </section>
      <section class="set">
        <h3>${n("set_apply")}</h3>
        <div class="choices">
          ${[!1,!0].map(i=>h`<button
                class="choice ${e.enabled===i?"on":""}"
                aria-pressed=${e.enabled===i}
                ?disabled=${this._busy}
                @click=${()=>this._save({enabled:i})}
              >
                ${n(i?"apply_on":"apply_off")}
              </button>`)}
        </div>
        <p class="hint">${n(e.enabled?"apply_on_hint":"apply_off_hint")}</p>
        ${this._error&&!this._schedule&&!this._rule&&!this._stove?h`<div class="row-warn">${this._error}</div>`:m}
      </section>
    `}};ne.properties={hass:{attribute:!1},plant:{attribute:!1},control:{attribute:!1},t:{attribute:!1},language:{attribute:!1},_schedule:{state:!0},_rule:{state:!0},_stove:{state:!0},_error:{state:!0},_busy:{state:!0}},ne.styles=B`
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
  `;customElements.get("heizzentrale-control")||customElements.define("heizzentrale-control",ne);var pe=["#3b82f6","#14b8a6","#a855f7","#f59e0b","#ec4899","#84cc16","#6366f1","#f97316"];function W(u,s=7){let e=i=>Math.round(i*10)/10,t=`M${e(u[0][0])} ${e(u[0][1])}`;for(let i=1;i<u.length-1;i++){let[r,l]=u[i-1],[a,o]=u[i],[c,d]=u[i+1],p=Math.hypot(a-r,o-l),g=Math.hypot(c-a,d-o),_=Math.min(s,p/2,g/2);if(_<.5){t+=` L${e(a)} ${e(o)}`;continue}t+=` L${e(a-(a-r)/p*_)} ${e(o-(o-l)/p*_)}`,t+=` Q${e(a)} ${e(o)} ${e(a+(c-a)/g*_)} ${e(o+(d-o)/g*_)}`}let n=u[u.length-1];return`${t} L${e(n[0])} ${e(n[1])}`}var Xe=new Set(["on","heat","heating","running","true"]),se=class extends P{constructor(){super(...arguments);this._config={};this._loading=!1;this._watched=new Set;this._view="house";this._confirmActive=!1;this._edit=!1;this._sensorFilter="";this._pipes=[];this._pipeSignature=""}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("heizzentrale-house-card-editor")}setConfig(e){this._config={...e}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}set hass(e){let t=this._hass;if(this._hass=e,!this._plants&&!this._loading){this._load();return}if(!t){this.requestUpdate();return}for(let n of this._watched)if(t.states[n]!==e.states[n]){this.requestUpdate(),window.clearTimeout(this._adviceTimer),this._adviceTimer=window.setTimeout(()=>{this._loadControl()},2500);return}t.language!==e.language&&this.requestUpdate()}get hass(){return this._hass}async _load(){if(this._hass){this._loading=!0;try{let e=await this._hass.callWS({type:"heizzentrale/plants"});this._plants=e.plants,this._error=void 0,this._loadControl()}catch(e){this._error=e?.message??String(e),this._plants=[]}finally{this._loading=!1}}}async _loadControl(){let e=this._plant();if(!(!e||!this._hass))try{this._control=await this._hass.callWS({type:"heizzentrale/control/get",entry_id:e.entry_id})}catch{this._control=void 0}}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect(),this._observed=void 0,window.clearTimeout(this._adviceTimer)}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal();let t=this.renderRoot.querySelector(".house")??void 0;t!==this._observed&&(this._resize?.disconnect(),this._observed=t,t&&typeof ResizeObserver<"u"&&(this._resize??=new ResizeObserver(()=>this._measurePipes()),this._resize.observe(t))),this._measurePipes()}_lanes(e){return e.circuits.filter(t=>e.rooms.some(n=>n.circuit===t.id))}_measurePipes(){let e=this.renderRoot.querySelector(".house"),t=this._plant(),n=[];if(e&&t){let r=e.getBoundingClientRect(),l=f=>{let v=f.getBoundingClientRect();return{top:v.top-r.top,bottom:v.bottom-r.top,center:(v.left+v.right)/2-r.left,left:v.left-r.left,right:v.right-r.left}},a=f=>{let v=new Map;for(let y of f){let $=Math.round(y.bottom);v.set($,[...v.get($)??[],y])}return[...v.entries()].sort((y,$)=>y[0]-$[0]).map(y=>y[1])},o="var(--hz-hot)",c=(f,v)=>{let y=e.querySelector(`[data-part="${f}:${v}"]`);return y?l(y):void 0},d=f=>f.filter(v=>!!v),p=f=>this._circuitOpen(f)!==!1,g=t.circuits.some(p),_=(f,v,y)=>{if(Math.abs(f.top-v.top)<4&&v.left>=f.right){let $=(f.top+f.bottom)/2;n.push({d:W([[f.right-4,$],[v.left+4,$]]),color:o,active:y})}else{let $=f.bottom+8;n.push({d:W([[f.center,f.bottom-6],[f.center,$],[v.center,$],[v.center,v.top+6]]),color:o,active:y})}},k=(f,v,y)=>{let $=v.map(w=>({circuit:w,at:c("circuit",w.id)})).filter(w=>!!w.at);if(!$.length)return;let H=$.some(w=>p(w.circuit)),R=f.bottom+8+y,N=[f.center],D=f.center;n.push({d:W([[f.center,f.bottom-6],[f.center,R]]),color:o,active:H});let A=()=>{let w=Math.min(...N),C=Math.max(...N);C-w>1&&n.push({d:W([[w,R],[C,R]]),color:o,active:H})};for(let w of a($.map(C=>({...C,bottom:C.at.bottom})))){let C=w[0].at.top<R;if(!C&&w[0].at.top-R>30){A();let S=w[0].at.top-10+y;n.push({d:W([[D,R],[D,S]]),color:o,active:H}),R=S,N=[D]}for(let S of w){let _e=C?S.at.bottom-6:S.at.top+6;N.push(S.at.center),n.push({d:W([[S.at.center,R],[S.at.center,_e]]),color:o,active:p(S.circuit)})}D=w[0].at.center}A()},b=d([...t.heat_sources.map(f=>c("source",f.id)),...t.buffers.map(f=>c("buffer",f.id))]);b.slice(1).forEach((f,v)=>_(b[v],f,g));let T=b[b.length-1],j=t.pump_groups??[],x=new Set;j.forEach((f,v)=>{let y=c("pump",f.id);if(!y)return;let $=t.circuits.filter(H=>H.pump_group===f.id);$.forEach(H=>x.add(H.id)),T&&_(T,y,$.some(p)),k(y,$,v*5)});let M=t.circuits.filter(f=>!x.has(f.id));T&&M.length&&k(T,M,j.length*5);let oe=this._lanes(t),L=e.querySelector(".walls"),ae=e.querySelector(".parts"),me=L?l(L).left+2:0,z=ae?l(ae).top:0;oe.forEach((f,v)=>{let y=pe[t.circuits.indexOf(f)%pe.length],$=this._circuitOpen(f)!==!1,H=me+9+v*6,R=[...e.querySelectorAll(`[data-circuit="${f.id}"]`)].map(A=>({...l(A),heating:A.classList.contains("heating")})),N;for(let A of a(R)){let w=A[0].bottom+6+v*4;N=Math.min(N??w,w),A.sort((S,_e)=>S.center-_e.center);let C=A[A.length-1];n.push({d:W([[H,w],[C.center,w],[C.center,C.bottom-6]]),color:y,active:$&&A.some(S=>S.heating)});for(let S of A.slice(0,-1))n.push({d:W([[S.center,w],[S.center,S.bottom-6]]),color:y,active:$&&S.heating})}let D=c("circuit",f.id);if(D&&N!==void 0){let A=z-7-v*4,w=D.center+(v-(oe.length-1)/2)*6;n.push({d:W([[w,D.top+6],[w,A],[H,A],[H,N]]),color:y,active:$})}})}let i=JSON.stringify(n);i!==this._pipeSignature&&(this._pipeSignature=i,this._pipes=n)}_renderPipes(){return h`<svg class="pipes" aria-hidden="true">
      ${this._pipes.map(e=>E`
          <path class="tube ${e.active?"active":""}" d=${e.d} style="stroke:${e.color}"/>
          ${e.active?E`<path class="flow" d=${e.d} style="stroke:${e.color}"/>`:m}`)}
    </svg>`}get _language(){let e=this._plant()?.language;return e==="de"||e==="en"?e:this._hass?.locale?.language??this._hass?.language??"en"}get _t(){return Te(this._language)}async _setLanguage(e,t){await this._hass?.callWS({type:"heizzentrale/set_language",entry_id:e.entry_id,language:t}),await this._load()}_state(e){if(e)return this._watched.add(e),this._hass?.states[e]}_number(e){let t=this._state(e);if(!t)return;let n=Number(t.state);return t.state!==""&&Number.isFinite(n)?n:void 0}_format(e,t,n=1){if(e===void 0)return"\u2013";let i=this._language,r=new Intl.NumberFormat(i,{minimumFractionDigits:n,maximumFractionDigits:n}).format(e);return t?`${r} ${t}`:r}_temp(e){let n=this._state(e)?.attributes.unit_of_measurement??"\xB0C";return this._format(this._number(e),n)}_plant(){if(this._plants?.length)return this._plants.find(e=>e.entry_id===this._config.entry_id)??this._plants[0]}_circuitOpen(e){if(!e.valve_entity)return!0;let t=this._state(e.open_entity)?.state;if(t==="on")return!0;if(t==="off")return!1}_windowOpen(e){return(e.window_entities??[]).map(t=>this._state(t)?.state==="on").includes(!0)}_select(e){let t=this._selection&&this._selection.kind===e.kind&&this._selection.id===e.id;this._selection=t?void 0:e,!t&&e.kind==="room"&&this._loadControl()}_key(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(t))}_isSelected(e,t){let n=this._selection;return!!n&&n.kind===e&&n.id===t}render(){this._watched.clear();let e=this._t;if(!this._plants)return h`<ha-card><div class="note">${e("loading")}</div></ha-card>`;let t=this._plant();if(!t)return h`<ha-card
        ><div class="note">${this._error??e("no_plant")}</div></ha-card
      >`;let n=!t.rooms.length&&!t.circuits.length&&!t.buffers.length&&!t.pump_groups?.length&&!t.heat_sources.length,i=new Map;return t.circuits.forEach((r,l)=>i.set(r.id,pe[l%pe.length])),h`
      <ha-card>
        ${this._renderHeader(t)}
        ${n&&this._view==="house"?h`<div class="settings">${this._renderSetup(t)}</div>`:m}
        ${this._view==="settings"?this._renderSettings(t,i):h`${n?m:this._renderHouse(t,i)}
            ${this._renderExplanation(t)} ${this._renderRoomDialog(t,i)}
            ${this._renderSensorDialog(t)}`}
      </ha-card>
    `}_renderHeader(e){let t=this._t,n=this._state(e.mode_entity)?.state,i=e.outdoor_entity?h`<span class="chip" title=${t("outdoor")}
          >${t("outdoor")} ${this._temp(e.outdoor_entity)}</span
        >`:m,r=n==="observe"||n==="off"||n==="active"?h`<button
            class="chip mode ${n}"
            @click=${()=>this._select({kind:"mode"})}
          >
            ${t(`mode_${n}`)}
          </button>`:m;return h`
      <div class="header">
        <h2>${this._config.title||e.name}</h2>
        <div class="chips">
          ${i}${r}
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
            ${this._view==="settings"?ft:_t}
          </button>
        </div>
      </div>
    `}_renderHouse(e,t){let n=this._t,i=new Set(e.floors.map(_=>_.id)),r=this._edit,l=r?e.all_floors??e.floors:e.floors,a=_=>(this._control?.stoves??[]).some(k=>!k.room&&k.floor===_),o=(_,k,b="")=>k.length||b&&(r||a(b))?h`
            <section
              class="storey ${this._drag?.moved&&this._drag.overFloor===b?"drop":""}"
              data-floor=${b}
            >
              ${_?h`<div class="floor-name">${_}</div>`:m}
              <div class="rooms">
                ${k.map(T=>this._renderRoom(e,T,t))}
                ${b?this._renderStoveTiles(b):m}
                ${k.length||!r?m:h`<div class="drop-hint">${n("edit_drop")}</div>`}
              </div>
            </section>
          `:m,c=_=>e.rooms.filter(k=>k.floor===_),d=l.filter(_=>(_.level??0)>=0),p=l.filter(_=>(_.level??0)<0),g=e.rooms.filter(_=>!_.floor||!i.has(_.floor));return h`
      <div class="house" style="--hz-lanes:${this._lanes(e).length}">
        ${r?m:this._renderPipes()}
        ${r?h`<p class="edit-note">${n("edit_note")}</p>`:m}
        <div class="roof">${bt}</div>
        <div class="walls">
          ${d.map(_=>o(_.name,c(_.id),_.id))}
          ${o(l.length?n("other_rooms"):"",g)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${p.map(_=>o(_.name,c(_.id),_.id))}
          ${this._renderPlantRoom(e,t)}
        </div>
      </div>
    `}_renderRoom(e,t,n){let i=this._t,r=this._state(t.climate_entity),l=r?.attributes??{},a=!r||r.state==="unavailable"||r.state==="unknown",o=l.hvac_action==="heating",c=this._windowOpen(t),d="\xB0",p=l.current_temperature,g=l.temperature,_=l.preset_mode&&l.preset_mode!=="none"?String(l.preset_mode):void 0,k=e.circuits.find(x=>x.id===t.circuit),b={kind:"room",id:t.id},T=this._drag?.id===t.id&&this._drag.moved?this._drag:void 0,j=this._drag?.moved&&this._drag.overRoom===t.id?this._drag.after?"drop-after":"drop-before":"";return h`
      <div
        class="room ${o?"heating":""} ${a?"off":""}
          ${this._isSelected("room",t.id)?"selected":""}
          ${this._edit?"editing":""} ${T?"dragging":""} ${j}"
        style=${T?`transform:translate(${T.dx}px,${T.dy}px)`:m}
        role="button"
        tabindex="0"
        data-room=${t.id}
        data-circuit=${k?.id??m}
        @click=${()=>!this._edit&&this._select(b)}
        @keydown=${x=>!this._edit&&this._key(x,b)}
        @pointerdown=${x=>this._dragStart(x,t)}
        @pointermove=${x=>this._dragMove(x)}
        @pointerup=${x=>this._dragEnd(x,e)}
        @pointercancel=${()=>this._drag=void 0}
      >
        <div class="room-top">
          <span class="room-name"
            >${k?h`<span class="dot" style="background:${n.get(k.id)}"></span>`:m}${t.name}</span
          >
          <span class="icons">
            ${this._edit?h`<span class="grip" title=${i("edit_grip")}>⠿</span>`:m}
            ${c?h`<span class="badge window" title=${i("window_open")}
                  >${vt}</span
                >`:m}
            ${o?h`<span class="badge flame" title=${i("heating")}
                  >${He}</span
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
            >${i("target")}
            ${r?.state==="off"?"\u2013":this._format(typeof g=="number"?g:void 0,"")}${d}</span
          >
          ${_?h`<span class="preset">${this._presetLabel(r,_)}</span>`:m}
        </div>
        ${(this._control?.stoves??[]).filter(x=>x.room===t.id).map(x=>{let M=this._control?.burning?.includes(x.id);return h`<div class="stove ${M?"burning":""}">
              ${He}<span class="stove-name">${x.name||i("stove")}</span>
              <span>${this._format(this._number(x.sensor),"\xB0",0)}</span>
            </div>`})}
        ${this._renderExtras(e,`room:${t.id}`)}
        ${this._edit?h`<div class="edit-row">
              <button
                aria-label=${i("edit_left")}
                title=${i("edit_left")}
                @click=${()=>this._nudge(e,t,-1)}
              >
                ◀
              </button>
              <button
                class="grow"
                @click=${()=>this._sensorPlace={place:`room:${t.id}`,name:t.name}}
              >
                + ${i("edit_sensor")}
              </button>
              <button
                aria-label=${i("edit_right")}
                title=${i("edit_right")}
                @click=${()=>this._nudge(e,t,1)}
              >
                ▶
              </button>
            </div>`:m}
      </div>
    `}_renderStoveTiles(e){let t=this._t;return(this._control?.stoves??[]).filter(n=>!n.room&&n.floor===e).map(n=>{let i=!!this._control?.burning?.includes(n.id);return h`<div class="room stove-tile ${i?"heating":""}">
          <div class="room-top">
            <span class="room-name">${n.name||t("stove")}</span>
            <span class="icons"
              >${i?h`<span class="badge flame" title=${t("stove_burning")}>${He}</span>`:m}</span
            >
          </div>
          <div class="room-temp">
            ${this._format(this._number(n.sensor),"",0)}<span class="unit">°</span>
          </div>
          <div class="room-bottom">
            <span>${t(i?"stove_burning":"stove_out")}</span>
            <span class="preset">${t("stove")}</span>
          </div>
        </div>`})}_renderExtras(e,t){let n=(e.extra_sensors??[]).filter(i=>i.place===t);return n.length?h`<div class="extras">
      ${n.map(i=>{let r=this._state(i.entity),l=this._number(i.entity),a=r?.attributes.unit_of_measurement??"",o=l!==void 0?this._format(l,a,Math.abs(l)>=100?0:1):r?.state??"\u2013";return h`<div class="extra">
          <span class="extra-name"
            >${i.label||r?.attributes.friendly_name||i.entity}</span
          ><span>${o}</span>
        </div>`})}
    </div>`:m}async _saveLayout(e,t){try{let n=await this._hass.callWS({type:"heizzentrale/layout/save",entry_id:e.entry_id,...t});this._plants=n.plants,this._error=void 0}catch(n){this._error=n?.message??String(n)}}_moveRoom(e,t,n,i,r=!1){let l=e.rooms.map(d=>d.id).filter(d=>d!==t),a=i?l.indexOf(i):-1;a>=0?l.splice(a+(r?1:0),0,t):l.push(t);let o={...e.placed_floors??{}};n?o[t]=n:n===""&&delete o[t];let c=new Map(e.rooms.map(d=>[d.id,d]));e.rooms=l.map(d=>{let p=c.get(d);return d===t&&n?{...p,floor:n}:p}),this.requestUpdate(),this._saveLayout(e,{order:l,floors:o})}_nudge(e,t,n){let i=e.rooms.filter(l=>(l.floor??"")===(t.floor??"")),r=i[i.indexOf(t)+n];r&&this._moveRoom(e,t.id,void 0,r.id,n>0)}_dragStart(e,t){!this._edit||e.button!==0||e.target.closest("button")||e.pointerType!=="mouse"&&!e.target.closest(".grip")||(e.currentTarget.setPointerCapture(e.pointerId),this._drag={id:t.id,startX:e.clientX,startY:e.clientY,dx:0,dy:0,moved:!1})}_dragMove(e){let t=this._drag;if(!t)return;let n=e.clientX-t.startX,i=e.clientY-t.startY,r={...t,dx:n,dy:i,moved:t.moved||Math.hypot(n,i)>6};r.overRoom=r.overFloor=void 0;let a=this.renderRoot.elementsFromPoint?.(e.clientX,e.clientY)??[];for(let o of a){let c=o.closest?.(".room[data-room]");if(c&&c.dataset.room!==t.id){let p=c.getBoundingClientRect();r.overRoom=c.dataset.room,r.after=e.clientX>p.left+p.width/2}let d=o.closest?.(".storey[data-floor]");if(d){r.overFloor=d.dataset.floor??"";break}}this._drag=r}_dragEnd(e,t){let n=this._drag;this._drag=void 0,!(!n?.moved||n.overFloor===void 0)&&this._moveRoom(t,n.id,n.overFloor,n.overRoom,n.after)}_renderSensorDialog(e){let t=this._sensorPlace;if(!t)return m;let n=this._t,i=e.extra_sensors??[],r=i.filter(p=>p.place===t.place),l=()=>{this._sensorPlace=void 0,this._sensorFilter=""},a=this._sensorFilter.trim().toLowerCase(),o=p=>String(this._hass?.states[p]?.attributes.friendly_name??p),c=Object.keys(this._hass?.states??{}).filter(p=>p.startsWith("sensor.")).filter(p=>!a||p.toLowerCase().includes(a)||o(p).toLowerCase().includes(a)).sort((p,g)=>o(p).localeCompare(o(g))).slice(0,200),d=()=>{let p=this.renderRoot.querySelector("#extra-entity"),g=this.renderRoot.querySelector("#extra-label");if(!p?.value)return;let _={id:Math.random().toString(36).slice(2,10),entity:p.value,label:g?.value.trim()??"",place:t.place};g&&(g.value=""),this._saveLayout(e,{sensors:[...i,_]})};return h`
      <dialog class="backdrop" aria-label=${n("edit_sensor")} @click=${l} @cancel=${l}>
        <div class="sheet" @click=${p=>p.stopPropagation()}>
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${n("edit_sensor_title",{name:t.name})}</div>
              <div class="sheet-sub">${n("edit_sensor_hint")}</div>
            </div>
            <button class="close" aria-label=${n("close")} @click=${l}>✕</button>
          </div>
          ${r.map(p=>h`<div class="extra-row">
                <span>${p.label||o(p.entity)}</span>
                <button
                  class="close"
                  aria-label=${n("remove")}
                  @click=${()=>this._saveLayout(e,{sensors:i.filter(g=>g.id!==p.id)})}
                >
                  ✕
                </button>
              </div>`)}
          <input
            class="field"
            type="search"
            placeholder=${n("edit_sensor_search")}
            aria-label=${n("edit_sensor_search")}
            .value=${this._sensorFilter}
            @input=${p=>this._sensorFilter=p.target.value}
          />
          <select id="extra-entity" class="field" aria-label=${n("edit_sensor")}>
            ${c.map(p=>h`<option value=${p}>${o(p)}</option>`)}
          </select>
          <input
            id="extra-label"
            class="field"
            type="text"
            maxlength="30"
            placeholder=${n("edit_sensor_label")}
            aria-label=${n("edit_sensor_label")}
          />
          <button class="wide primary" ?disabled=${!c.length} @click=${d}>
            ${n("edit_sensor_add")}
          </button>
        </div>
      </dialog>
    `}_renderPlantRoom(e,t){let n=this._t;if(!e.heat_sources.length&&!e.buffers.length&&!e.circuits.length&&!e.pump_groups?.length)return m;let i=e.circuits.some(r=>this._circuitOpen(r)!==!1);return h`
      <section class="storey plant-room">
        <div class="floor-name">${n("plant_room")}</div>
        <div class="parts">
          ${e.heat_sources.map(r=>this._renderSource(r,i))}
          ${e.buffers.map(r=>this._renderBuffer(r,i))}
          ${(e.pump_groups??[]).map(r=>this._renderPumpGroup(e,r))}
          ${e.circuits.map(r=>this._renderCircuit(r,t.get(r.id)??"gray"))}
        </div>
      </section>
    `}_part(e,t,n,i=""){return h`
      <div
        class="part ${t?"flowing":""} ${i}
          ${this._isSelected(e.kind,e.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-part="${e.kind}:${e.id}"
        @click=${()=>!this._edit&&this._select(e)}
        @keydown=${r=>!this._edit&&this._key(r,e)}
      >
        ${n}
        ${this._plant()?this._renderExtras(this._plant(),`${e.kind}:${e.id}`):m}
        ${this._edit&&e.kind!=="mode"?h`<button
              class="edit-add"
              @click=${r=>{r.stopPropagation(),this._sensorPlace={place:`${e.kind}:${e.id}`,name:r.currentTarget.closest(".part")?.querySelector(".part-name")?.textContent?.trim()??""}}}
            >
              + ${this._t("edit_sensor")}
            </button>`:m}
      </div>
    `}_sourceActive(e){let t=this._state(e.status_entity)?.state?.toLowerCase();return!!t&&Xe.has(t)}_renderSource(e,t){let n=this._t,i=this._sourceActive(e);return this._part({kind:"source",id:e.id},t,h`
        <div class="part-name">${e.name}</div>
        <div class="figure">${yt(i)}</div>
        <div class="big">
          ${e.temperature_entity?this._temp(e.temperature_entity):e.flow_entity?this._temp(e.flow_entity):"\u2013"}
        </div>
        <div class="sub">
          ${n(i?"running":`kind_${e.kind}`)}
        </div>
      `)}_renderBuffer(e,t){let n=e.sensor_entities.map(i=>this._number(i));return this._part({kind:"buffer",id:e.id},t,h`
        <div class="part-name">${e.name}</div>
        <div class="figure buffer-figure">
          ${xt(n)}
          <div class="tank-values">
            ${e.sensor_entities.map(i=>h`<span>${this._temp(i)}</span>`)}
          </div>
        </div>
        <div class="sub">
          ${e.volume?`${this._format(e.volume,"l",0)}`:m}
        </div>
      `)}_pumpRunning(e){let t=this._state(e.status_entity)?.state?.toLowerCase();if(!(!t||t==="unavailable"||t==="unknown"))return Xe.has(t)}_renderPumpGroup(e,t){let n=this._t,i=this._pumpRunning(t),r=e.circuits.filter(l=>l.pump_group===t.id).some(l=>this._circuitOpen(l)!==!1);return this._part({kind:"pump",id:t.id},r,h`
        <div class="part-name">${t.name}</div>
        <div class="figure">${wt(i??r)}</div>
        <div class="big">${t.flow_entity?this._temp(t.flow_entity):"\u2013"}</div>
        ${t.return_entity?h`<div class="pair">
              <span class="hot">${this._temp(t.flow_entity)}</span>
              <span class="cold">${this._temp(t.return_entity)}</span>
            </div>`:m}
        <div class="sub ${i?"status-open":""}">
          ${n(i===void 0?"pump_group":i?"running":"pump_stopped")}
        </div>
        ${this._renderWould(this._control?.advice?.pump_groups[t.id]?.action)}
      `)}_renderCircuit(e,t){let n=this._t,i=this._circuitOpen(e),r=this._number(e.spread_entity),l=i===void 0?"unknown":i?"open":"closed";return this._part({kind:"circuit",id:e.id},i!==!1,h`
        <div class="part-name">
          <span class="dot" style="background:${t}"></span>${e.name}
        </div>
        <div class="figure">${zt(l)}</div>
        <div class="big">
          ${r===void 0?"\u2013":`\u0394 ${this._format(r,"K")}`}
        </div>
        <div class="pair">
          <span class="hot">${this._temp(e.flow_entity)}</span>
          <span class="cold">${this._temp(e.return_entity)}</span>
        </div>
        <div class="sub status-${l}">${n(l)}</div>
        ${this._renderWould(this._control?.advice?.circuits[e.id]?.action)}
      `,`circuit-${l}`)}_renderWould(e){return!e||this._control?.switching?m:h`<div class="would">${this._t(`would_${e}`)}</div>`}_explain(e,t){let n=this._t,i="",r=[];if(t.kind==="mode"){let l=this._state(e.mode_entity)?.state,a=l==="off"||l==="active"?l:"observe";i=n(`mode_${a}`),r=[n(`x_mode_${a}`)]}else if(t.kind==="circuit"){let l=e.circuits.find(p=>p.id===t.id);if(!l)return;i=l.name,r.push(n("x_what_circuit",{name:l.name,system:n(`system_${l.system_type}`)}));let a=this._number(l.spread_entity);r.push(a===void 0?n("x_no_spread"):n("x_spread",{flow:this._temp(l.flow_entity),ret:this._temp(l.return_entity),spread:this._format(a,"K")}));let o=this._circuitOpen(l);l.valve_entity?o===void 0?r.push(n("x_valve_unknown")):l.valve_entity.startsWith("valve.")?r.push(n(o?"x_open_valve":"x_closed_valve")):r.push(n(`x_${o?"open":"closed"}_${l.valve_type==="no"?"no":"nc"}`)):r.push(n("x_no_valve"));let c=e.rooms.filter(p=>p.circuit===l.id).map(p=>p.name);c.length&&r.push(n("x_rooms_on",{rooms:c.join(", ")}));let d=this._control?.advice?.circuits[l.id];d&&(r.push(n(`x_adv_${d.reason}`,{rooms:d.rooms.join(", ")})),this._control?.switching?this._control.switched?.[l.id]==="close"&&r.push(n(d.action?"x_adv_by_hand":"x_adv_closed")):d.action&&r.push(n(`x_adv_would_${d.action}`)))}else if(t.kind==="room"){let l=e.rooms.find(p=>p.id===t.id);if(!l)return;i=l.name;let a=this._state(l.climate_entity),o=a?.attributes??{},c={name:l.name,current:this._format(o.current_temperature,"\xB0C"),target:this._format(o.temperature,"\xB0C")};!a||a.state==="unavailable"||a.state==="unknown"?r.push(n("x_room_unavailable",c)):a.state==="off"?r.push(n("x_room_off",c)):o.hvac_action==="heating"?r.push(n("x_room_heating",c)):r.push(n("x_room_idle",c)),this._windowOpen(l)&&r.push(n("x_room_window")),o.preset_mode&&o.preset_mode!=="none"&&r.push(n("x_room_preset",{preset:this._presetLabel(a,String(o.preset_mode))}));let d=e.circuits.find(p=>p.id===l.circuit);d&&r.push(n("x_room_circuit",{circuit:d.name}))}else if(t.kind==="pump"){let l=e.pump_groups?.find(d=>d.id===t.id);if(!l)return;i=l.name,r.push(n("x_pump",{name:l.name})),l.flow_entity&&r.push(n("x_pump_flow",{temp:this._temp(l.flow_entity)}));let a=e.circuits.filter(d=>d.pump_group===l.id);if(a.length){let d=a.filter(p=>this._circuitOpen(p)!==!1);r.push(d.length?n("x_pump_needed",{circuits:d.map(p=>p.name).join(", ")}):n("x_pump_idle"))}let o=this._pumpRunning(l);o!==void 0&&r.push(n(o?"x_pump_running":"x_pump_stopped")),r.push(n(l.control_entity?"x_pump_control":"x_pump_no_control")),l.control_off_option&&l.control_on_option&&r.push(n("x_pump_modes",{off:l.control_off_option,on:l.control_on_option}));let c=this._control?.advice?.pump_groups[l.id];c?.reason==="manual"?r.push(n("x_padv_manual")):this._control?.switching?this._control.switched?.[l.id]==="off"?r.push(n(c?.action==="off"?"x_padv_by_hand":"x_padv_off")):c?.action==="on"&&r.push(n("x_padv_hand_off")):c?.action&&r.push(n(`x_padv_would_${c.action}`))}else if(t.kind==="buffer"){let l=e.buffers.find(a=>a.id===t.id);if(!l)return;i=l.name,r.push(n("x_buffer",{name:l.name})),this._number(l.mean_entity)!==void 0&&r.push(n("x_buffer_mean",{mean:this._temp(l.mean_entity)}))}else{let l=e.heat_sources.find(c=>c.id===t.id);if(!l)return;i=l.name;let a=this._state(l.status_entity)?.state;r.push(n("x_source",{name:l.name,status:this._sourceActive(l)?n("running"):a??n("unknown")}));let o=l.temperature_entity??l.flow_entity;o&&r.push(n("x_source_temp",{temp:this._temp(o)}))}return{title:i,lines:r}}_presetLabel(e,t){return e&&this._hass?.formatEntityAttributeValue?this._hass.formatEntityAttributeValue(e,"preset_mode",t):t}_renderExplanation(e){let t=this._selection;if(!t||t.kind==="room")return m;let n=this._explain(e,t);return n?h`
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
        ${n.lines.map(i=>h`<p>${i}</p>`)}
      </div>
    `:m}_call(e,t,n){this._hass?.callService?.(e,t,n)}_setTarget(e,t,n,i){let r=Math.round(Math.min(i,Math.max(n,t))*10)/10;this._pendingTarget={entity:e,value:r},window.clearTimeout(this._targetTimer),this._targetTimer=window.setTimeout(()=>{this._call("climate","set_temperature",{entity_id:e,temperature:r}),this._targetTimer=window.setTimeout(()=>this._pendingTarget=void 0,2500)},700)}_renderRoomDialog(e,t){let n=this._selection;if(!n||n.kind!=="room")return m;let i=e.rooms.find(z=>z.id===n.id);if(!i?.climate_entity)return m;let r=this._t,l=i.climate_entity,a=this._state(l),o=a?.attributes??{},c=!!a&&a.state!=="unavailable"&&a.state!=="unknown",d=a?.state==="off",p=Number(o.target_temp_step)||.5,g=typeof o.min_temp=="number"?o.min_temp:5,_=typeof o.max_temp=="number"?o.max_temp:30,b=(this._pendingTarget?.entity===l?this._pendingTarget.value:void 0)??(typeof o.temperature=="number"?o.temperature:void 0),T=Array.isArray(o.preset_modes)?o.preset_modes.filter(z=>z!=="none"):[],j=Array.isArray(o.hvac_modes)?o.hvac_modes:[],x=["heat","auto","heat_cool"].find(z=>j.includes(z)),M=e.circuits.find(z=>z.id===i.circuit),oe=e.floors.find(z=>z.id===i.floor),L=()=>this._selection=void 0,ae=this._explain(e,n)?.lines??[],me=[M?`${r("circuit")} ${M.name}`:"",oe?.name??""].filter(Boolean).join(" \xB7 ");return h`
      <dialog
        class="backdrop"
        aria-label=${i.name}
        @click=${L}
        @cancel=${L}
      >
        <div
          class="sheet"
          @click=${z=>z.stopPropagation()}
          @keydown=${z=>z.key==="Escape"&&L()}
        >
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${i.name}</div>
              <div class="sheet-sub">
                ${M?h`<span class="dot" style="background:${t.get(M.id)}"></span>`:m}${me}
              </div>
            </div>
            <button class="close" aria-label=${r("close")} @click=${L}>✕</button>
          </div>
          <div class="sheet-now ${o.hvac_action==="heating"?"heating":""}">
            <span class="now-value"
              >${this._format(typeof o.current_temperature=="number"?o.current_temperature:void 0,"")}°</span
            >
            <span class="now-label"
              >${o.hvac_action==="heating"?r("heating"):r(d?"mode_off":"idle")}</span
            >
          </div>
          <div class="stepper">
            <button
              aria-label="−"
              ?disabled=${!c||d||b===void 0||b<=g}
              @click=${()=>this._setTarget(l,(b??g)-p,g,_)}
            >
              −
            </button>
            <div class="stepper-value">
              <span>${d?"\u2013":`${this._format(b,"")}\xB0`}</span>
              <small>${r("target")}</small>
            </div>
            <button
              aria-label="+"
              ?disabled=${!c||d||b===void 0||b>=_}
              @click=${()=>this._setTarget(l,(b??g)+p,g,_)}
            >
              +
            </button>
          </div>
          ${T.length?h`<div class="choices">
                ${T.map(z=>h`<button
                      class="choice ${o.preset_mode===z?"on":""}"
                      ?disabled=${!c||d}
                      @click=${()=>this._call("climate","set_preset_mode",{entity_id:l,preset_mode:z})}
                    >
                      ${this._presetLabel(a,z)}
                    </button>`)}
              </div>`:m}
          ${j.includes("off")&&x?h`<button
                class="wide"
                ?disabled=${!c}
                @click=${()=>this._call("climate","set_hvac_mode",{entity_id:l,hvac_mode:d?x:"off"})}
              >
                ${r(d?"room_turn_on":"room_turn_off")}
              </button>`:m}
          <div class="why">
            <div class="why-title">${r("why")}</div>
            ${ae.map(z=>h`<p>${z}</p>`)}
          </div>
          ${this._renderPlan(i)}
          <button
            class="link"
            @click=${()=>{L(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:l},bubbles:!0,composed:!0}))}}
          >
            ${r("open_thermostat")}
          </button>
        </div>
      </dialog>
    `}_renderPlan(e){let t=this._control;if(!t)return m;let n=this._t,i=t.rooms[e.id];if(!i&&!t.schedules.length&&!t.rules.length&&!t.stoves?.length)return m;let r=i?Pe(i.action,n,this._hass,e.climate_entity):"";return h`
      <div class="why">
        <div class="why-title">${n("plan")}</div>
        ${i?h`<p>
                ${n(`plan_${i.source}`,{name:i.name,action:r})}
              </p>
              ${t.enabled||i.source==="window"&&i.applied?m:h`<p>${n("plan_would")}</p>`}`:h`<p>${n("plan_none")}</p>`}
      </div>
    `}_navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}_renderSetup(e){let t=this._t,n=[{key:"source",done:e.heat_sources.length>0,optional:!1},{key:"buffer",done:e.buffers.length>0,optional:!0},{key:"pump",done:(e.pump_groups?.length??0)>0,optional:!0},{key:"circuits",done:e.circuits.length>0,optional:!1},{key:"rooms",done:e.rooms.length>0,optional:!1}],i=n.filter(r=>!r.done&&!r.optional).length;return h`
      <section class="set setup">
        <h3>${t("setup_title")}</h3>
        <p class="hint first">${t(i?"setup_intro":"setup_done")}</p>
        <ol class="steps">
          ${n.map((r,l)=>h`
              <li class=${r.done?"done":""}>
                <span class="step-mark">${r.done?"\u2713":l+1}</span>
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
    `}async _setMode(e,t){await this._call("select","select_option",{entity_id:e.mode_entity,option:t}),window.setTimeout(()=>{this._loadControl()},800)}_renderSettings(e,t){let n=this._t,i=this._state(e.mode_entity),r=Array.isArray(i?.attributes.options)?i.attributes.options:[],l=(c,d,p,g)=>h`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${g?h`<span class="dot" style="background:${g}"></span>`:m}${c}</span
          >
          <span class="row-detail">${d}</span>
        </div>
        ${p.map(_=>h`<div class="row-warn">${_}</div>`)}
      </li>
    `,a=(c,d)=>h`
      <section class="set">
        <h3>${c}</h3>
        ${d.length?h`<ul>${d}</ul>`:h`<p class="hint">${n("none_yet")}</p>`}
      </section>
    `,o=c=>c.filter(Boolean).join(" \xB7 ");return h`
      <div class="settings">
        ${this._renderSetup(e)}
        <section class="set">
          <h3>${n("set_mode")}</h3>
          <div class="choices">
            ${r.map(c=>h`<button
                  class="choice ${i?.state===c?"on":""}"
                  @click=${()=>{if(c==="active"&&i?.state!=="active"){this._confirmActive=!0;return}this._confirmActive=!1,this._setMode(e,c)}}
                >
                  ${n(`mode_${c}`)}
                </button>`)}
          </div>
          ${this._confirmActive?h`<div class="confirm">
                <p>${n("mode_confirm")}</p>
                <div class="choices">
                  <button
                    class="choice on"
                    @click=${()=>{this._confirmActive=!1,this._setMode(e,"active")}}
                  >
                    ${n("mode_confirm_yes")}
                  </button>
                  <button class="choice" @click=${()=>this._confirmActive=!1}>
                    ${n("cancel")}
                  </button>
                </div>
              </div>`:m}
          <p class="hint">
            ${n(`x_mode_${i?.state==="off"||i?.state==="active"?i.state:"observe"}`)}
          </p>
        </section>
        <section class="set">
          <h3>${n("set_language")}</h3>
          <div class="choices">
            ${["auto","de","en"].map(c=>h`<button
                  class="choice ${(e.language??"auto")===c?"on":""}"
                  @click=${()=>this._setLanguage(e,c)}
                >
                  ${n(`lang_${c}`)}
                </button>`)}
          </div>
          <p class="hint">${n("set_language_hint")}</p>
        </section>
        ${this._control?h`<heizzentrale-control
              .hass=${this._hass}
              .plant=${e}
              .control=${this._control}
              .t=${n}
              .language=${this._language}
              @control-changed=${c=>this._control=c.detail}
            ></heizzentrale-control>`:m}
        ${a(n("set_sources"),e.heat_sources.map(c=>l(c.name,n(`kind_${c.kind}`),c.temperature_entity||c.flow_entity?[]:[n("warn_no_sensor")])))}
        ${a(n("set_buffers"),e.buffers.map(c=>l(c.name,o([c.volume?this._format(c.volume,"l",0):"",n("n_sensors",{count:String(c.sensor_entities.length)})]),c.sensor_entities.length?[]:[n("warn_no_sensor")])))}
        ${a(n("set_pumps"),(e.pump_groups??[]).map(c=>l(c.name,o([n("n_circuits",{count:String(e.circuits.filter(d=>d.pump_group===c.id).length)}),c.control_entity?n("pump_switchable"):""]),[...c.flow_entity?[]:[n("warn_no_sensor")],...c.control_entity?[]:[n("warn_no_control")]])))}
        ${a(n("set_circuits"),e.circuits.map(c=>{let d=e.rooms.filter(p=>p.circuit===c.id).length;return l(c.name,o([n(`system_${c.system_type}`),c.valve_entity?n(c.valve_type==="no"?"valve_no":"valve_nc"):n("valve_none"),d===1?n("one_room"):n("n_rooms",{count:String(d)})]),[...c.flow_entity&&c.return_entity?[]:[n("warn_no_pipe_sensors")],...d?[]:[n("warn_no_rooms")]],t.get(c.id))}))}
        ${a(n("set_rooms"),e.rooms.map(c=>{let d=e.circuits.find(g=>g.id===c.circuit),p=e.floors.find(g=>g.id===c.floor);return l(c.name,o([d&&`${n("circuit")} ${d.name}`,p?.name,c.window_entities?.length===1&&n("has_window"),(c.window_entities?.length??0)>1&&n("n_windows",{count:String(c.window_entities.length)})]),[...d||!e.circuits.length?[]:[n("warn_no_circuit")],...p?[]:[n("warn_no_floor")]],d?t.get(d.id):void 0)}))}
      </div>
    `}};se.properties={_plants:{state:!0},_error:{state:!0},_selection:{state:!0},_config:{state:!0},_pipes:{state:!0},_view:{state:!0},_pendingTarget:{state:!0},_control:{state:!0},_edit:{state:!0},_confirmActive:{state:!0},_drag:{state:!0},_sensorPlace:{state:!0},_sensorFilter:{state:!0}},se.styles=B`
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
  `;var He=E`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.5 5-2.5 7C8.4 11 9 12.5 9 12.5S7 12 6.6 9.8C4.9 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"/></svg>`,_t=E`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.1a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.700 1.700 0 0 0 1.800.3h.1a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.1a1.700 1.700 0 0 0-.3 1.800v.1a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/></svg>`,gt=E`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.500 6.500l4 4"/></svg>`,ft=E`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.500"/><path d="M5.500 10v10h13V10"/></svg>`,vt=E`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`,bt=E`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;function wt(u){let s=u?"var(--hz-ok)":"currentColor",e=u?"1":"0.4";return E`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M4 28 H14 M42 28 H52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
    <circle cx="28" cy="28" r="14" fill="none" stroke=${s} stroke-width="2.5" opacity=${e}/>
    <path d="M22 19.500 L38 28 L22 36.500 Z" fill=${u?s:"none"} stroke=${s} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
  </svg>`}function yt(u){return E`<svg viewBox="0 0 44 56" aria-hidden="true">
    <rect x="4" y="3" width="36" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
    <rect x="11" y="9" width="22" height="7" rx="2" fill="currentColor" opacity="0.25"/>
    <path transform="translate(10 22)" d="M12 2c1 3.5-1.500 5-2.500 7C8.400 11 9 12.500 9 12.500S7 12 6.600 9.800C4.900 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"
      fill=${u?"var(--hz-hot)":"currentColor"} opacity=${u?"1":"0.25"}/>
  </svg>`}function $t(u){return u===void 0?"var(--divider-color, #ccc)":`color-mix(in srgb, var(--hz-hot) ${(Math.max(0,Math.min(1,(u-25)/50))*100).toFixed(0)}%, var(--hz-cold))`}function xt(u){let s=u.length?u:[void 0],e=44/s.length;return E`<svg viewBox="0 0 32 56" aria-hidden="true">
    <defs><clipPath id="hz-tank"><rect x="4" y="6" width="24" height="44" rx="9"/></clipPath></defs>
    <g clip-path="url(#hz-tank)">
      ${s.map((t,n)=>E`<rect x="4" y=${6+n*e} width="24" height=${e+.5} fill=${$t(t)}/>`)}
    </g>
    <rect x="4" y="6" width="24" height="44" rx="9" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  </svg>`}function zt(u){let s=u==="open"?"var(--hz-ok)":u==="unknown"?"var(--hz-warn)":"currentColor",e=u==="closed"?"0.35":"1";return E`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M6 22 L28 34 L6 46 Z M50 22 L28 34 L50 46 Z" fill=${u==="open"?s:"none"}
      stroke=${s} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
    <path d="M28 34 V16 M19 16 H37" stroke=${s} stroke-width="2.5" stroke-linecap="round" opacity=${e}/>
    ${u==="closed"?E`<path d="M14 48 L42 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`:m}
  </svg>`}var ie=class extends P{constructor(){super(...arguments);this.narrow=!1}set hass(e){this._hass=e;let t=this.renderRoot?.querySelector("heizzentrale-house-card");t&&(t.hass=e);let n=this.renderRoot?.querySelector("ha-menu-button");n&&(n.hass=e)}firstUpdated(){this.renderRoot.querySelector("heizzentrale-house-card").setConfig({}),this._hass&&(this.hass=this._hass)}render(){return h`
      <div class="bar">
        <ha-menu-button .narrow=${this.narrow}></ha-menu-button>
      </div>
      <main><heizzentrale-house-card></heizzentrale-house-card></main>
    `}};ie.properties={narrow:{type:Boolean,reflect:!0}},ie.styles=B`
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
  `;var re=class extends P{constructor(){super(...arguments);this._config={}}setConfig(e){this._config={...e}}set hass(e){this._hass=e,this._plants||(this._plants=[],e.callWS({type:"heizzentrale/plants"}).then(t=>this._plants=t.plants).catch(()=>{}))}_change(e,t){let n={...this._config};t?n[e]=t:delete n[e],this._config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}render(){let e=Te(this._hass?.locale?.language??this._hass?.language);return h`
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
    `}};re.properties={_config:{state:!0},_plants:{state:!0}},re.styles=B`
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
  `;customElements.get("heizzentrale-house-card")||(customElements.define("heizzentrale-house-card",se),customElements.define("heizzentrale-house-card-editor",re),customElements.define("heizzentrale-panel",ie),(window.customCards??=[]).push({type:"heizzentrale-house-card",name:"Heizzentrale",description:"House view: rooms per floor, heat source, buffer and circuits.",preview:!1}));
