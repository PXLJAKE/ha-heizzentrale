var le=globalThis,de=le.ShadowRoot&&(le.ShadyCSS===void 0||le.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),He=new WeakMap,G=class{constructor(n,e,t){if(this._$cssResult$=!0,t!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=e}get styleSheet(){let n=this.o,e=this.t;if(de&&n===void 0){let t=e!==void 0&&e.length===1;t&&(n=He.get(e)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),t&&He.set(e,n))}return n}toString(){return this.cssText}},Me=c=>new G(typeof c=="string"?c:c+"",void 0,ge),F=(c,...n)=>{let e=c.length===1?c[0]:n.reduce((t,s,i)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+c[i+1],c[0]);return new G(e,c,ge)},Ne=(c,n)=>{if(de)c.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of n){let t=document.createElement("style"),s=le.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,c.appendChild(t)}},fe=de?c=>c:c=>c instanceof CSSStyleSheet?(n=>{let e="";for(let t of n.cssRules)e+=t.cssText;return Me(e)})(c):c;var{is:Qe,defineProperty:et,getOwnPropertyDescriptor:tt,getOwnPropertyNames:st,getOwnPropertySymbols:nt,getPrototypeOf:it}=Object,ce=globalThis,Oe=ce.trustedTypes,ot=Oe?Oe.emptyScript:"",rt=ce.reactiveElementPolyfillSupport,Y=(c,n)=>c,ve={toAttribute(c,n){switch(n){case Boolean:c=c?ot:null;break;case Object:case Array:c=c==null?c:JSON.stringify(c)}return c},fromAttribute(c,n){let e=c;switch(n){case Boolean:e=c!==null;break;case Number:e=c===null?null:Number(c);break;case Object:case Array:try{e=JSON.parse(c)}catch{e=null}}return e}},We=(c,n)=>!Qe(c,n),Le={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:We};Symbol.metadata??=Symbol("metadata"),ce.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,e=Le){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(n,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(n,t,e);s!==void 0&&et(this.prototype,n,s)}}static getPropertyDescriptor(n,e,t){let{get:s,set:i}=tt(this.prototype,n)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let r=s?.call(this);i?.call(this,o),this.requestUpdate(n,r,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??Le}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;let n=it(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){let e=this.properties,t=[...st(e),...nt(e)];for(let s of t)this.createProperty(s,e[s])}let n=this[Symbol.metadata];if(n!==null){let e=litPropertyMetadata.get(n);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let e=[];if(Array.isArray(n)){let t=new Set(n.flat(1/0).reverse());for(let s of t)e.unshift(fe(s))}else n!==void 0&&e.push(fe(n));return e}static _$Eu(n,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(n.set(t,this[t]),delete this[t]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ne(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,e,t){this._$AK(n,t)}_$ET(n,e){let t=this.constructor.elementProperties.get(n),s=this.constructor._$Eu(n,t);if(s!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:ve).toAttribute(e,t.type);this._$Em=n,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(n,e){let t=this.constructor,s=t._$Eh.get(n);if(s!==void 0&&this._$Em!==s){let i=t.getPropertyOptions(s),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:ve;this._$Em=s;let r=o.fromAttribute(e,i.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(n,e,t,s=!1,i){if(n!==void 0){let o=this.constructor;if(s===!1&&(i=this[n]),t??=o.getPropertyOptions(n),!((t.hasChanged??We)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(n)&&!this.hasAttribute(o._$Eu(n,t))))return;this.C(n,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,e,{useDefault:t,reflect:s,wrapped:i},o){t&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,o??e??this[n]),i!==!0||o!==void 0)||(this._$AL.has(n)||(this.hasUpdated||t||(e=void 0),this._$AL.set(n,e)),s===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,i]of t){let{wrapped:o}=i,r=this[s];o!==!0||this._$AL.has(s)||r===void 0||this.C(s,void 0,i,r)}}let n=!1,e=this._$AL;try{n=this.shouldUpdate(e),n?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw n=!1,this._$EM(),t}n&&this._$AE(e)}willUpdate(n){}_$AE(n){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(n){}firstUpdated(n){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[Y("elementProperties")]=new Map,O[Y("finalized")]=new Map,rt?.({ReactiveElement:O}),(ce.reactiveElementVersions??=[]).push("2.1.2");var ze=globalThis,De=c=>c,he=ze.trustedTypes,je=he?he.createPolicy("lit-html",{createHTML:c=>c}):void 0,Ve="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,Ze="?"+j,at=`<${Ze}>`,I=document,X=()=>I.createComment(""),Q=c=>c===null||typeof c!="object"&&typeof c!="function",Se=Array.isArray,lt=c=>Se(c)||typeof c?.[Symbol.iterator]=="function",be=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Be=/-->/g,Fe=/>/g,U=RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Ke=/"/g,qe=/^(?:script|style|textarea|title)$/i,Ae=c=>(n,...e)=>({_$litType$:c,strings:n,values:e}),u=Ae(1),E=Ae(2),Tt=Ae(3),V=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Ie=new WeakMap,K=I.createTreeWalker(I,129);function Ge(c,n){if(!Se(c)||!c.hasOwnProperty("raw"))throw Error("invalid template strings array");return je!==void 0?je.createHTML(n):n}var dt=(c,n)=>{let e=c.length-1,t=[],s,i=n===2?"<svg>":n===3?"<math>":"",o=J;for(let r=0;r<e;r++){let l=c[r],a,d,h=-1,p=0;for(;p<l.length&&(o.lastIndex=p,d=o.exec(l),d!==null);)p=o.lastIndex,o===J?d[1]==="!--"?o=Be:d[1]!==void 0?o=Fe:d[2]!==void 0?(qe.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=U):d[3]!==void 0&&(o=U):o===U?d[0]===">"?(o=s??J,h=-1):d[1]===void 0?h=-2:(h=o.lastIndex-d[2].length,a=d[1],o=d[3]===void 0?U:d[3]==='"'?Ke:Ue):o===Ke||o===Ue?o=U:o===Be||o===Fe?o=J:(o=U,s=void 0);let f=o===U&&c[r+1].startsWith("/>")?" ":"";i+=o===J?l+at:h>=0?(t.push(a),l.slice(0,h)+Ve+l.slice(h)+j+f):l+j+(h===-2?r:f)}return[Ge(c,i+(c[e]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),t]},ee=class c{constructor({strings:n,_$litType$:e},t){let s;this.parts=[];let i=0,o=0,r=n.length-1,l=this.parts,[a,d]=dt(n,e);if(this.el=c.createElement(a,t),K.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=K.nextNode())!==null&&l.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Ve)){let p=d[o++],f=s.getAttribute(h).split(j),_=/([.?@])?(.*)/.exec(p);l.push({type:1,index:i,name:_[2],strings:f,ctor:_[1]==="."?ye:_[1]==="?"?$e:_[1]==="@"?xe:q}),s.removeAttribute(h)}else h.startsWith(j)&&(l.push({type:6,index:i}),s.removeAttribute(h));if(qe.test(s.tagName)){let h=s.textContent.split(j),p=h.length-1;if(p>0){s.textContent=he?he.emptyScript:"";for(let f=0;f<p;f++)s.append(h[f],X()),K.nextNode(),l.push({type:2,index:++i});s.append(h[p],X())}}}else if(s.nodeType===8)if(s.data===Ze)l.push({type:2,index:i});else{let h=-1;for(;(h=s.data.indexOf(j,h+1))!==-1;)l.push({type:7,index:i}),h+=j.length-1}i++}}static createElement(n,e){let t=I.createElement("template");return t.innerHTML=n,t}};function Z(c,n,e=c,t){if(n===V)return n;let s=t!==void 0?e._$Co?.[t]:e._$Cl,i=Q(n)?void 0:n._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(c),s._$AT(c,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(n=Z(c,s._$AS(c,n.values),s,t)),n}var we=class{constructor(n,e){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:e},parts:t}=this._$AD,s=(n?.creationScope??I).importNode(e,!0);K.currentNode=s;let i=K.nextNode(),o=0,r=0,l=t[0];for(;l!==void 0;){if(o===l.index){let a;l.type===2?a=new te(i,i.nextSibling,this,n):l.type===1?a=new l.ctor(i,l.name,l.strings,this,n):l.type===6&&(a=new ke(i,this,n)),this._$AV.push(a),l=t[++r]}o!==l?.index&&(i=K.nextNode(),o++)}return K.currentNode=I,s}p(n){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(n,t,e),e+=t.strings.length-2):t._$AI(n[e])),e++}},te=class c{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,e,t,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=n,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,e=this._$AM;return e!==void 0&&n?.nodeType===11&&(n=e.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,e=this){n=Z(this,n,e),Q(n)?n===m||n==null||n===""?(this._$AH!==m&&this._$AR(),this._$AH=m):n!==this._$AH&&n!==V&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):lt(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==m&&Q(this._$AH)?this._$AA.nextSibling.data=n:this.T(I.createTextNode(n)),this._$AH=n}$(n){let{values:e,_$litType$:t}=n,s=typeof t=="number"?this._$AC(n):(t.el===void 0&&(t.el=ee.createElement(Ge(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new we(s,this),o=i.u(this.options);i.p(e),this.T(o),this._$AH=i}}_$AC(n){let e=Ie.get(n.strings);return e===void 0&&Ie.set(n.strings,e=new ee(n)),e}k(n){Se(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let i of n)s===e.length?e.push(t=new c(this.O(X()),this.O(X()),this,this.options)):t=e[s],t._$AI(i),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(n=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);n!==this._$AB;){let t=De(n).nextSibling;De(n).remove(),n=t}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,e,t,s,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=n,this.name=e,this._$AM=s,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(n,e=this,t,s){let i=this.strings,o=!1;if(i===void 0)n=Z(this,n,e,0),o=!Q(n)||n!==this._$AH&&n!==V,o&&(this._$AH=n);else{let r=n,l,a;for(n=i[0],l=0;l<i.length-1;l++)a=Z(this,r[t+l],e,l),a===V&&(a=this._$AH[l]),o||=!Q(a)||a!==this._$AH[l],a===m?n=m:n!==m&&(n+=(a??"")+i[l+1]),this._$AH[l]=a}o&&!s&&this.j(n)}j(n){n===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},ye=class extends q{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===m?void 0:n}},$e=class extends q{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==m)}},xe=class extends q{constructor(n,e,t,s,i){super(n,e,t,s,i),this.type=5}_$AI(n,e=this){if((n=Z(this,n,e,0)??m)===V)return;let t=this._$AH,s=n===m&&t!==m||n.capture!==t.capture||n.once!==t.once||n.passive!==t.passive,i=n!==m&&(t===m||s);s&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},ke=class{constructor(n,e,t){this.element=n,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(n){Z(this,n)}};var ct=ze.litHtmlPolyfillSupport;ct?.(ee,te),(ze.litHtmlVersions??=[]).push("3.3.3");var Ye=(c,n,e)=>{let t=e?.renderBefore??n,s=t._$litPart$;if(s===void 0){let i=e?.renderBefore??null;t._$litPart$=s=new te(n.insertBefore(X(),i),i,void 0,e??{})}return s._$AI(c),s};var Ee=globalThis,P=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=Ye(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};P._$litElement$=!0,P.finalized=!0,Ee.litElementHydrateSupport?.({LitElement:P});var ht=Ee.litElementPolyfillSupport;ht?.({LitElement:P});(Ee.litElementVersions??=[]).push("4.2.2");var Je={loading:"Loading plant\u2026",no_plant:"No plant found. Add the Heizzentrale integration under Settings \u2192 Devices & services.",empty:"This plant has no parts yet. Open the integration and add a heat source, circuits and rooms.",mode_observe:"Observing",mode_off:"Off",mode_active:"Switching",x_mode_active:"Switching: Heizzentrale closes circuits no room needs and switches the pump group off when no circuit needs heat. When in doubt everything stays open.",mode_confirm:"From now on Heizzentrale switches your circuits and the pump group itself. A circuit closes after 10 minutes without demand and opens at once when a room asks for heat. You can go back to observing at any time; everything is then opened and switched on again.",mode_confirm_yes:"Yes, switch now",x_adv_closed:"Heizzentrale has closed it.",x_adv_by_hand:"Someone opened it by hand. Heizzentrale leaves it like that until a room needs heat again.",x_padv_off:"No circuit needs heat: Heizzentrale has switched the pump group off.",x_padv_by_hand:"Someone switched it on by hand. Heizzentrale leaves it like that until a circuit needs heat again.",x_padv_hand_off:"A circuit needs heat, but the pump group was switched off by hand. Heizzentrale only switches on what it switched off itself.",plan_window:"A window is open: {action}.",set_window:"Open windows",window_on:"Switch room off",window_off:"Change nothing",window_delay:"Wait before switching off (minutes)",window_hint:"While a window of a room is open its thermostat is switched off and put back when the window closes. A room without a window contact is never affected.",outdoor:"Outdoor",other_rooms:"Other rooms",plant_room:"Plant room",flow:"Flow",return:"Return",spread:"Spread",target:"Target",heating:"heating",idle:"idle",window_open:"Window open",open:"open",closed:"closed",unknown:"unknown",running:"running",close:"Close",system_two_pipe:"two-pipe",system_one_pipe:"one-pipe",system_underfloor:"underfloor heating",system_other:"circuit",kind_pellet:"Pellet boiler",kind_wood:"Wood boiler",kind_gas:"Gas boiler",kind_oil:"Oil boiler",kind_heat_pump:"Heat pump",kind_district:"District heating",kind_other:"Heat source",x_what_circuit:"{name} is a {system} circuit. Hot water flows to the radiators (flow) and comes back cooler (return).",x_spread:"Flow {flow}, return {ret}: the spread is {spread}. A larger spread means the water gives off more heat on its way.",x_no_spread:"Flow and return sensors are needed to show the spread.",x_open_nc:"The circuit is open because its actuator is powered. Without power this actuator closes (NC).",x_closed_nc:"The circuit is closed because its actuator has no power. Without power this actuator closes (NC).",x_open_no:"The circuit is open because its actuator has no power. Without power this actuator opens (NO).",x_closed_no:"The circuit is closed because its actuator is powered. Without power this actuator opens (NO).",x_open_valve:"The valve reports that it is open.",x_closed_valve:"The valve reports that it is closed.",x_valve_unknown:"The actuator does not report a state right now. Heizzentrale treats the circuit as possibly open.",x_no_valve:"This circuit has no actuator, so it is always open.",x_rooms_on:"Rooms on this circuit: {rooms}.",x_room_heating:"{name} is heating: it is {current} and should be {target}.",x_room_idle:"{name} is not heating: it is {current}, target {target}.",x_room_off:"{name} is switched off.",x_room_unavailable:"The thermostat of {name} is not reachable right now.",x_room_window:"A window is open, so heating is paused here.",x_room_preset:"Active preset: {preset}.",x_room_circuit:"Its radiators are supplied by the circuit {circuit}.",x_buffer:"{name} stores hot water so the heat source does not have to start for every small demand. Hot water collects at the top.",x_buffer_mean:"Mean temperature: {mean}.",x_source:"{name} produces the heat for the house. Status: {status}.",x_source_temp:"Temperature: {temp}.",x_mode_observe:"Observe mode: Heizzentrale measures and explains but does not switch any circuit or pump.",x_mode_off:"Off: Heizzentrale only measures.",settings:"Settings",back:"Back to the house",circuit:"Circuit",why:"What is happening",room_turn_off:"Switch heating off in this room",room_turn_on:"Switch heating on in this room",open_thermostat:"Open thermostat details",set_mode:"Operating mode",set_sources:"Heat sources",set_buffers:"Buffer tanks",set_circuits:"Circuits",set_rooms:"Rooms",none_yet:"Nothing added yet.",n_rooms:"{count} rooms",one_room:"1 room",n_sensors:"{count} sensors",valve_nc:"actuator closes without power",valve_no:"actuator opens without power",valve_none:"no actuator",has_window:"window contact",warn_no_sensor:"No temperature sensor assigned.",warn_no_pipe_sensors:"Flow or return sensor missing, so no spread can be shown.",warn_no_rooms:"No room uses this circuit yet.",warn_no_circuit:"No circuit assigned, so no pipe is drawn to this room.",warn_no_floor:"No floor found. Assign the thermostat to an area with a floor in Home Assistant.",edit_parts:"Add or change parts",edit_hint:"Opens the Heizzentrale page of Home Assistant. Heat sources, buffers, circuits and rooms are added and changed there.",pump_group:"Pump group",pump_stopped:"stopped",set_pumps:"Pump groups",n_circuits:"{count} circuits",pump_switchable:"can be switched",warn_no_control:"No entity to switch it chosen. Heizzentrale will not be able to turn it off when all circuits are closed.",x_pump:"{name} pushes the heating water into the circuits behind it. A mixer, if there is one, sets how hot that water is.",x_pump_flow:"Flow temperature behind the mixer: {temp}.",x_pump_needed:"It is needed right now because these circuits are open: {circuits}.",x_pump_idle:"All circuits behind it are closed, so it has nothing to do. Once switching is enabled, Heizzentrale turns it off in this situation.",x_pump_running:"The pump reports that it is running.",x_pump_stopped:"The pump reports that it is stopped.",x_pump_control:"An entity to switch it is chosen. Heizzentrale only observes for now and does not use it yet.",x_pump_modes:"Off is the mode \u201C{off}\u201D, on is the mode \u201C{on}\u201D.",x_pump_no_control:"No entity to switch it is chosen yet.",setup_title:"Setup",setup_intro:"Add the parts of your heating in this order. Only the name is required each time; sensors can be filled in later.",setup_done:"The basics are set up. You can add or change parts at any time.",setup_optional:"only if you have one",setup_source:"Heat source",setup_source_hint:"Your boiler or heat pump.",setup_buffer:"Buffer tank",setup_buffer_hint:"The tank that stores hot water, with its temperature sensors.",setup_pump:"Pump group",setup_pump_hint:"The pump, with or without mixer, that feeds the circuits.",setup_circuits:"Circuits",setup_circuits_hint:"Every branch that can be opened and closed on its own, for example one per floor.",setup_rooms:"Rooms",setup_rooms_hint:"One per thermostat. Name and floor come from Home Assistant on their own.",n_windows:"{count} window contacts",set_language:"Language",lang_auto:"Like Home Assistant",lang_de:"Deutsch",lang_en:"English",set_language_hint:"Applies to this view for everyone. The setup dialogs of Home Assistant always follow the language in your user profile.",editor_plant:"Plant",editor_title:"Title (optional)",editor_first:"First plant",stove_in_room:"In a room",stove_own_tile:"Own tile on a floor",stove_out:"out",would_close:"would close now",would_open:"would open now",would_on:"would switch on now",would_off:"would switch off now",x_adv_rooms_calling:"This circuit is needed: {rooms} is asking for heat.",x_adv_unknown_room:"This circuit stays open to be safe, because the thermostat of {rooms} cannot be read.",x_adv_no_rooms:"No rooms are assigned to this circuit, so it always counts as needed.",x_adv_waiting:"No room is asking for heat right now. After 10 minutes without demand the circuit would close.",x_adv_no_demand:"For more than 10 minutes no room on this circuit has asked for heat.",x_adv_would_close:"Heizzentrale would close it now. While observing it switches nothing.",x_adv_would_open:"Heizzentrale would open it now. While observing it switches nothing.",x_padv_manual:"Its control entity is in a mode someone chose by hand. Heizzentrale leaves it like that.",x_padv_would_off:"No circuit needs heat: Heizzentrale would switch the pump group off now. While observing it switches nothing.",x_padv_would_on:"A circuit needs heat: Heizzentrale would switch the pump group on now. While observing it switches nothing.",edit_grip:"Drag to move",edit_house:"Arrange the house",edit_done:"Done",edit_note:"Drag rooms to where they belong, also onto another floor, or use the arrows. Add further sensors to any tile.",edit_drop:"Drag a room here",edit_left:"Move left",edit_right:"Move right",edit_sensor:"Sensor",edit_sensor_title:"Sensors for {name}",edit_sensor_hint:"Shown on the tile in addition, for example humidity or a second temperature.",edit_sensor_search:"Search sensors",edit_sensor_label:"Short label (optional)",edit_sensor_add:"Add sensor",set_stoves:"Stoves",stoves_intro:"A wood stove warms its room and the rooms around it. While it burns, the radiators there are not needed. Choose per room what happens then.",add_stove:"New stove",stove_placeholder:'For example "Wood stove living room"',stove_sensor:"Temperature sensor at the stove",stove_sensor_hint:"A sensor on the stove or its flue pipe. It only has to tell whether the stove is burning.",choose:"Please choose",stove_threshold:"Burning from",stove_now:"Right now:",stove_room:"Where is the stove?",stove_room_none:"Do not show in the house",stove_actions:"While the stove burns",stove_actions_hint:"For example the room with the stove off and rooms further away on Eco. Once the stove has cooled down, the schedule applies again.",stove_leave:"Leave as it is",stove_burning:"burning",stove_summary:"Counts as burning from {degrees} \xB0C.",stove_while:"While it burns:",stove_no_rooms:"No room chosen yet, so this stove changes nothing.",stove_no_sensor:"No temperature sensor chosen yet.",plan_stove:'Stove "{name}" is burning: {action}.',stove:"Stove",day_0:"Mon",day_1:"Tue",day_2:"Wed",day_3:"Thu",day_4:"Fri",day_5:"Sat",day_6:"Sun",days_all:"Daily",decimal:".",act_on:"On",act_off:"Off",act_temperature:"Temperature \u2026",action:"Action",time:"Time",name:"Name",floors:"Whole floors",rooms_single:"Single rooms",assigned_none:"nothing yet",unnamed:"Unnamed",edit:"Edit",remove:"Remove",save:"Save",cancel:"Cancel",delete:"Delete",and:"and",minutes:"minutes",save_failed:"Could not save. Only administrators can change this.",set_schedules:"Schedules",schedules_intro:"A schedule sets thermostats at fixed times, for example Comfort in the morning and Eco at night. Assign it to single rooms or to whole floors.",add_schedule:"New schedule",schedule_placeholder:'For example "Workdays"',points:"Switch points",points_hint:"Each switch point applies from its time until the next one. If you change a thermostat by hand, that stays until the next switch point.",add_point:"Add switch point",no_points:"No switch points yet, so this schedule does nothing.",applies_to:"Applies to:",assign_hint:"A schedule for a single room wins over the schedule of its floor.",set_absence:"Absence",absence_intro:"Turn rooms down automatically while nobody is home, without building an automation. When someone is back, the schedule applies again.",add_rule:"New absence rule",rule_placeholder:'For example "Jake away"',rule_who:"Who has to be away?",rule_who_hint:"People, phones or presence sensors. With several entries all of them have to be away. If a device cannot be reached, it counts as present, so the house stays warm when in doubt.",rule_add_entity:"Add person or device",rule_delay:"Away for at least",rule_then:"Then set the rooms to",rule_sentence:"As soon as {who} is away: {targets} to {action}.",rule_sentence_delay:"When {who} has been away for more than {minutes} minutes: {targets} to {action}.",rule_back:"On return the schedule applies again; without a schedule the thermostat goes back to how it was.",rule_active:"applies now",no_entities:"No person or device chosen yet, so this rule does nothing.",set_apply:"Schedules, absence and stoves",apply_off:"Only show",apply_on:"Apply",apply_off_hint:'Heizzentrale only shows what it would set and does not touch any thermostat. Check in the room windows whether it fits, then switch to "Apply".',apply_on_hint:"Heizzentrale sets the thermostats at the switch points and when an absence rule or a stove starts or ends.",plan:"Plan",plan_schedule:'Schedule "{name}": {action}.',plan_absence:'Absence rule "{name}" applies: {action}.',plan_would:'Not applied yet, because schedules are set to "Only show".',plan_none:"No schedule assigned."},ut={loading:"Anlage wird geladen \u2026",no_plant:"Keine Anlage gefunden. F\xFCge die Integration Heizzentrale unter Einstellungen \u2192 Ger\xE4te & Dienste hinzu.",empty:"Diese Anlage hat noch keine Teile. \xD6ffne die Integration und f\xFCge W\xE4rmeerzeuger, Kreise und R\xE4ume hinzu.",mode_observe:"Beobachtet",mode_off:"Aus",mode_active:"Schaltet",x_mode_active:"Schaltet: Heizzentrale schlie\xDFt Str\xE4nge, die kein Raum braucht, und schaltet die Pumpengruppe aus, wenn kein Strang W\xE4rme braucht. Im Zweifel bleibt alles offen.",mode_confirm:"Ab jetzt schaltet Heizzentrale deine Str\xE4nge und die Pumpengruppe selbst. Ein Strang schlie\xDFt nach 10 Minuten ohne Bedarf und \xF6ffnet sofort, wenn ein Raum W\xE4rme will. Du kannst jederzeit zur\xFCck auf Beobachten; dann wird alles wieder ge\xF6ffnet und eingeschaltet.",mode_confirm_yes:"Ja, jetzt schalten",x_adv_closed:"Heizzentrale hat ihn geschlossen.",x_adv_by_hand:"Jemand hat ihn von Hand ge\xF6ffnet. Heizzentrale l\xE4sst das so, bis wieder ein Raum W\xE4rme braucht.",x_padv_off:"Kein Strang braucht W\xE4rme: Heizzentrale hat die Pumpengruppe ausgeschaltet.",x_padv_by_hand:"Jemand hat sie von Hand eingeschaltet. Heizzentrale l\xE4sst das so, bis wieder ein Strang W\xE4rme braucht.",x_padv_hand_off:"Ein Strang braucht W\xE4rme, aber die Pumpengruppe wurde von Hand ausgeschaltet. Heizzentrale schaltet nur wieder ein, was sie selbst ausgeschaltet hat.",plan_window:"Ein Fenster ist offen: {action}.",set_window:"Offene Fenster",window_on:"Raum ausschalten",window_off:"Nichts \xE4ndern",window_delay:"Wartezeit bis zum Ausschalten (Minuten)",window_hint:"Solange ein Fenster eines Raums offen ist, wird sein Thermostat ausgeschaltet und beim Schlie\xDFen wieder zur\xFCckgestellt. Ein Raum ohne Fensterkontakt ist nie betroffen.",outdoor:"Au\xDFen",other_rooms:"Weitere R\xE4ume",plant_room:"Heizraum",flow:"Vorlauf",return:"R\xFCcklauf",spread:"Spreizung",target:"Soll",heating:"heizt",idle:"ruht",window_open:"Fenster offen",open:"offen",closed:"zu",unknown:"unbekannt",running:"l\xE4uft",close:"Schlie\xDFen",system_two_pipe:"Zweirohr",system_one_pipe:"Einrohr",system_underfloor:"Fu\xDFbodenheizung",system_other:"Kreis",kind_pellet:"Pelletkessel",kind_wood:"Holzkessel",kind_gas:"Gastherme",kind_oil:"\xD6lkessel",kind_heat_pump:"W\xE4rmepumpe",kind_district:"Fernw\xE4rme",kind_other:"W\xE4rmeerzeuger",x_what_circuit:"{name} ist ein Strang ({system}). Hei\xDFes Wasser flie\xDFt zu den Heizk\xF6rpern (Vorlauf) und kommt k\xFChler zur\xFCck (R\xFCcklauf).",x_spread:"Vorlauf {flow}, R\xFCcklauf {ret}: Die Spreizung betr\xE4gt {spread}. Eine gr\xF6\xDFere Spreizung hei\xDFt, das Wasser gibt unterwegs mehr W\xE4rme ab.",x_no_spread:"F\xFCr die Spreizung braucht es einen Vorlauf- und einen R\xFCcklauff\xFChler.",x_open_nc:"Der Strang ist offen, weil sein Stellantrieb Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_closed_nc:"Der Strang ist zu, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom schlie\xDFt dieser Antrieb (NC).",x_open_no:"Der Strang ist offen, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_closed_no:"Der Strang ist zu, weil sein Stellantrieb Strom bekommt. Ohne Strom \xF6ffnet dieser Antrieb (NO).",x_open_valve:"Das Ventil meldet, dass es offen ist.",x_closed_valve:"Das Ventil meldet, dass es zu ist.",x_valve_unknown:"Der Stellantrieb meldet gerade keinen Zustand. Heizzentrale behandelt den Strang als m\xF6glicherweise offen.",x_no_valve:"Dieser Strang hat keinen Stellantrieb und ist deshalb immer offen.",x_rooms_on:"R\xE4ume an diesem Strang: {rooms}.",x_room_heating:"{name} heizt gerade: Es hat {current} und soll {target} haben.",x_room_idle:"{name} heizt nicht: Es hat {current}, Soll {target}.",x_room_off:"{name} ist ausgeschaltet.",x_room_unavailable:"Das Thermostat von {name} ist gerade nicht erreichbar.",x_room_window:"Ein Fenster ist offen, deshalb pausiert die Heizung hier.",x_room_preset:"Aktives Preset: {preset}.",x_room_circuit:"Die Heizk\xF6rper h\xE4ngen am Strang {circuit}.",x_buffer:"{name} speichert hei\xDFes Wasser, damit der W\xE4rmeerzeuger nicht f\xFCr jeden kleinen Bedarf starten muss. Oben sammelt sich das hei\xDFe Wasser.",x_buffer_mean:"Mittlere Temperatur: {mean}.",x_source:"{name} erzeugt die W\xE4rme f\xFCr das Haus. Status: {status}.",x_source_temp:"Temperatur: {temp}.",x_mode_observe:"Beobachtungsmodus: Heizzentrale misst und erkl\xE4rt, schaltet aber keinen Strang und keine Pumpe.",x_mode_off:"Aus: Heizzentrale misst nur.",settings:"Einstellungen",back:"Zur\xFCck zum Haus",circuit:"Strang",why:"Was gerade passiert",room_turn_off:"Heizung in diesem Raum ausschalten",room_turn_on:"Heizung in diesem Raum einschalten",open_thermostat:"Details zum Thermostat \xF6ffnen",set_mode:"Betriebsart",set_sources:"W\xE4rmeerzeuger",set_buffers:"Pufferspeicher",set_circuits:"Str\xE4nge",set_rooms:"R\xE4ume",none_yet:"Noch nichts angelegt.",n_rooms:"{count} R\xE4ume",one_room:"1 Raum",n_sensors:"{count} F\xFChler",valve_nc:"Stellantrieb stromlos zu",valve_no:"Stellantrieb stromlos offen",valve_none:"kein Stellantrieb",has_window:"Fensterkontakt",warn_no_sensor:"Kein Temperaturf\xFChler zugewiesen.",warn_no_pipe_sensors:"Vorlauf- oder R\xFCcklauff\xFChler fehlt, deshalb gibt es keine Spreizung.",warn_no_rooms:"Noch kein Raum h\xE4ngt an diesem Strang.",warn_no_circuit:"Kein Strang zugewiesen, deshalb f\xFChrt keine Leitung zu diesem Raum.",warn_no_floor:"Kein Stockwerk gefunden. Weise das Thermostat in Home Assistant einem Bereich mit Stockwerk zu.",edit_parts:"Teile hinzuf\xFCgen oder \xE4ndern",edit_hint:"\xD6ffnet die Heizzentrale-Seite von Home Assistant. Dort werden W\xE4rmeerzeuger, Puffer, Str\xE4nge und R\xE4ume angelegt und ge\xE4ndert.",pump_group:"Pumpengruppe",pump_stopped:"steht",set_pumps:"Pumpengruppen",n_circuits:"{count} Str\xE4nge",pump_switchable:"schaltbar",warn_no_control:"Keine Entit\xE4t zum Schalten gew\xE4hlt. Heizzentrale kann sie dann nicht ausschalten, wenn alle Str\xE4nge zu sind.",x_pump:"{name} dr\xFCckt das Heizwasser in die Str\xE4nge dahinter. Ein Mischer, falls vorhanden, bestimmt, wie hei\xDF dieses Wasser ist.",x_pump_flow:"Vorlauftemperatur hinter dem Mischer: {temp}.",x_pump_needed:"Sie wird gerade gebraucht, weil diese Str\xE4nge offen sind: {circuits}.",x_pump_idle:"Alle Str\xE4nge dahinter sind zu, sie hat also nichts zu tun. Sobald das Schalten freigegeben ist, schaltet Heizzentrale sie in dieser Lage aus.",x_pump_running:"Die Pumpe meldet, dass sie l\xE4uft.",x_pump_stopped:"Die Pumpe meldet, dass sie steht.",x_pump_control:"Eine Entit\xE4t zum Schalten ist gew\xE4hlt. Heizzentrale beobachtet vorerst nur und benutzt sie noch nicht.",x_pump_modes:"Aus ist der Modus \u201E{off}\u201C, An ist der Modus \u201E{on}\u201C.",x_pump_no_control:"Es ist noch keine Entit\xE4t zum Schalten gew\xE4hlt.",setup_title:"Einrichtung",setup_intro:"Lege die Teile deiner Heizung in dieser Reihenfolge an. Pflicht ist jeweils nur der Name, F\xFChler kannst du nachtragen.",setup_done:"Die Grundeinrichtung steht. Du kannst jederzeit Teile hinzuf\xFCgen oder \xE4ndern.",setup_optional:"nur falls vorhanden",setup_source:"W\xE4rmeerzeuger",setup_source_hint:"Dein Kessel oder deine W\xE4rmepumpe.",setup_buffer:"Pufferspeicher",setup_buffer_hint:"Der Speicher f\xFCr hei\xDFes Wasser mit seinen Temperaturf\xFChlern.",setup_pump:"Pumpengruppe",setup_pump_hint:"Die Pumpe, mit oder ohne Mischer, die die Str\xE4nge versorgt.",setup_circuits:"Str\xE4nge",setup_circuits_hint:"Jeder Teil, der sich einzeln \xF6ffnen und schlie\xDFen l\xE4sst, zum Beispiel einer pro Stockwerk.",setup_rooms:"R\xE4ume",setup_rooms_hint:"Einer pro Thermostat. Name und Stockwerk kommen von selbst aus Home Assistant.",n_windows:"{count} Fensterkontakte",set_language:"Sprache",lang_auto:"Wie Home Assistant",lang_de:"Deutsch",lang_en:"English",set_language_hint:"Gilt f\xFCr diese Ansicht bei allen. Die Einrichtungsdialoge von Home Assistant folgen immer der Sprache in deinem Benutzerprofil.",editor_plant:"Anlage",editor_title:"Titel (optional)",editor_first:"Erste Anlage",stove_in_room:"In einem Raum",stove_own_tile:"Eigene Kachel im Stockwerk",stove_out:"aus",would_close:"w\xFCrde jetzt schlie\xDFen",would_open:"w\xFCrde jetzt \xF6ffnen",would_on:"w\xFCrde jetzt einschalten",would_off:"w\xFCrde jetzt ausschalten",x_adv_rooms_calling:"Der Strang wird gebraucht: {rooms} will W\xE4rme.",x_adv_unknown_room:"Der Strang bleibt sicherheitshalber offen, weil das Thermostat von {rooms} nicht lesbar ist.",x_adv_no_rooms:"Diesem Strang sind keine R\xE4ume zugeordnet, deshalb gilt er immer als gebraucht.",x_adv_waiting:"Gerade will kein Raum W\xE4rme. Nach 10 Minuten ohne Bedarf w\xFCrde der Strang schlie\xDFen.",x_adv_no_demand:"Seit \xFCber 10 Minuten will kein Raum an diesem Strang W\xE4rme.",x_adv_would_close:"Heizzentrale w\xFCrde ihn jetzt schlie\xDFen. Solange sie nur beobachtet, schaltet sie nichts.",x_adv_would_open:"Heizzentrale w\xFCrde ihn jetzt \xF6ffnen. Solange sie nur beobachtet, schaltet sie nichts.",x_padv_manual:"Die Steuer-Entit\xE4t steht in einem Modus, den jemand von Hand gew\xE4hlt hat. Heizzentrale l\xE4sst das so.",x_padv_would_off:"Kein Strang braucht W\xE4rme: Heizzentrale w\xFCrde die Pumpengruppe jetzt ausschalten. Solange sie nur beobachtet, schaltet sie nichts.",x_padv_would_on:"Ein Strang braucht W\xE4rme: Heizzentrale w\xFCrde die Pumpengruppe jetzt einschalten. Solange sie nur beobachtet, schaltet sie nichts.",edit_grip:"Zum Verschieben ziehen",edit_house:"Haus anordnen",edit_done:"Fertig",edit_note:"Ziehe R\xE4ume an ihren Platz, auch in ein anderes Stockwerk, oder nutze die Pfeile. An jede Kachel kannst du weitere F\xFChler h\xE4ngen.",edit_drop:"Raum hierher ziehen",edit_left:"Nach links",edit_right:"Nach rechts",edit_sensor:"F\xFChler",edit_sensor_title:"F\xFChler f\xFCr {name}",edit_sensor_hint:"Wird zus\xE4tzlich auf der Kachel angezeigt, zum Beispiel Luftfeuchte oder eine zweite Temperatur.",edit_sensor_search:"F\xFChler suchen",edit_sensor_label:"Kurze Beschriftung (optional)",edit_sensor_add:"F\xFChler hinzuf\xFCgen",set_stoves:"\xD6fen",stoves_intro:"Ein Schwedenofen w\xE4rmt seinen Raum und die R\xE4ume drumherum. Solange er brennt, braucht es dort keine Heizk\xF6rper. Lege pro Raum fest, was dann passiert.",add_stove:"Neuer Ofen",stove_placeholder:"Zum Beispiel \u201ESchwedenofen Wohnzimmer\u201C",stove_sensor:"Temperaturf\xFChler am Ofen",stove_sensor_hint:"Ein F\xFChler am Ofen oder am Ofenrohr. Er muss nur verraten, ob der Ofen brennt.",choose:"Bitte w\xE4hlen",stove_threshold:"Brennt ab",stove_now:"Gerade:",stove_room:"Wo steht der Ofen?",stove_room_none:"Nicht im Haus anzeigen",stove_actions:"Solange der Ofen brennt",stove_actions_hint:"Zum Beispiel den Raum mit dem Ofen aus und weiter entfernte R\xE4ume auf Eco. Ist der Ofen abgek\xFChlt, gilt wieder der Zeitplan.",stove_leave:"So lassen",stove_burning:"brennt",stove_summary:"Gilt als an ab {degrees} \xB0C.",stove_while:"Solange er brennt:",stove_no_rooms:"Noch kein Raum gew\xE4hlt, dieser Ofen \xE4ndert also nichts.",stove_no_sensor:"Noch kein Temperaturf\xFChler gew\xE4hlt.",plan_stove:"Ofen \u201E{name}\u201C brennt: {action}.",stove:"Ofen",day_0:"Mo",day_1:"Di",day_2:"Mi",day_3:"Do",day_4:"Fr",day_5:"Sa",day_6:"So",days_all:"T\xE4glich",decimal:",",act_on:"An",act_off:"Aus",act_temperature:"Temperatur \u2026",action:"Aktion",time:"Uhrzeit",name:"Name",floors:"Ganze Stockwerke",rooms_single:"Einzelne R\xE4ume",assigned_none:"noch nichts",unnamed:"Ohne Namen",edit:"Bearbeiten",remove:"Entfernen",save:"Speichern",cancel:"Abbrechen",delete:"L\xF6schen",and:"und",minutes:"Minuten",save_failed:"Speichern nicht m\xF6glich. Das d\xFCrfen nur Administratoren \xE4ndern.",set_schedules:"Zeitpl\xE4ne",schedules_intro:"Ein Zeitplan stellt Thermostate zu festen Zeiten um, zum Beispiel morgens auf Komfort und nachts auf Eco. Du weist ihn einzelnen R\xE4umen oder ganzen Stockwerken zu.",add_schedule:"Neuer Zeitplan",schedule_placeholder:"Zum Beispiel \u201EWerktage\u201C",points:"Schaltpunkte",points_hint:"Jeder Schaltpunkt gilt ab seiner Uhrzeit bis zum n\xE4chsten. Stellst du ein Thermostat von Hand um, bleibt das bis zum n\xE4chsten Schaltpunkt so.",add_point:"Schaltpunkt hinzuf\xFCgen",no_points:"Noch keine Schaltpunkte, dieser Zeitplan macht also nichts.",applies_to:"Gilt f\xFCr:",assign_hint:"Ein Zeitplan f\xFCr einen einzelnen Raum hat Vorrang vor dem Zeitplan seines Stockwerks.",set_absence:"Abwesenheit",absence_intro:"R\xE4ume automatisch absenken, solange niemand da ist, ganz ohne eigene Automation. Ist wieder jemand da, gilt der Zeitplan weiter.",add_rule:"Neue Abwesenheitsregel",rule_placeholder:"Zum Beispiel \u201EJake unterwegs\u201C",rule_who:"Wer muss weg sein?",rule_who_hint:"Personen, Handys oder Anwesenheitssensoren. Bei mehreren Eintr\xE4gen m\xFCssen alle weg sein. Ist ein Ger\xE4t nicht erreichbar, z\xE4hlt es als anwesend, damit es im Zweifel warm bleibt.",rule_add_entity:"Person oder Ger\xE4t hinzuf\xFCgen",rule_delay:"Mindestens weg seit",rule_then:"Dann die R\xE4ume stellen auf",rule_sentence:"Sobald {who} weg ist: {targets} auf {action}.",rule_sentence_delay:"Wenn {who} l\xE4nger als {minutes} Minuten weg ist: {targets} auf {action}.",rule_back:"Bei R\xFCckkehr gilt wieder der Zeitplan; ohne Zeitplan geht das Thermostat auf den Stand von vorher zur\xFCck.",rule_active:"trifft gerade zu",no_entities:"Noch keine Person und kein Ger\xE4t gew\xE4hlt, diese Regel macht also nichts.",set_apply:"Zeitpl\xE4ne, Abwesenheit und \xD6fen",apply_off:"Nur anzeigen",apply_on:"Anwenden",apply_off_hint:"Heizzentrale zeigt nur, was sie stellen w\xFCrde, und fasst kein Thermostat an. Schau in den Raumfenstern, ob es passt, und stelle dann auf \u201EAnwenden\u201C.",apply_on_hint:"Heizzentrale stellt die Thermostate an den Schaltpunkten um und wenn eine Abwesenheitsregel beginnt oder endet oder ein Ofen an- oder ausgeht.",plan:"Plan",plan_schedule:"Zeitplan \u201E{name}\u201C: {action}.",plan_absence:"Abwesenheitsregel \u201E{name}\u201C trifft zu: {action}.",plan_would:"Noch nicht angewendet, weil Zeitpl\xE4ne auf \u201ENur anzeigen\u201C stehen.",plan_none:"Kein Zeitplan zugewiesen."};function Te(c){let n=(c??"en").toLowerCase().startsWith("de")?ut:Je;return(e,t={})=>(n[e]??Je[e]??e).replace(/\{(\w+)\}/g,(s,i)=>t[i]??"")}var ue=["day_0","day_1","day_2","day_3","day_4","day_5","day_6"],pt=new Set(["presence","connectivity","occupancy"]);function Ce(){return Math.random().toString(36).slice(2,10)}function Pe(c,n,e,t){if(c==="on")return n("act_on");if(c==="off")return n("act_off");if(c.startsWith("temperature:"))return`${c.slice(12).replace(".",n("decimal"))} \xB0C`;let s=c.slice(7),i=t?e?.states[t]:void 0;return i&&e?.formatEntityAttributeValue?e.formatEntityAttributeValue(i,"preset_mode",s):s.charAt(0).toUpperCase()+s.slice(1)}function mt(c,n){let e=[...new Set(c)].sort();if(e.length===7)return n("days_all");let t=[];for(let s of e){let i=t[t.length-1];i&&i[i.length-1]===s-1?i.push(s):t.push([s])}return t.map(s=>s.length>2?`${n(ue[s[0]])}\u2013${n(ue[s[s.length-1]])}`:s.map(i=>n(ue[i])).join(", ")).join(", ")}var se=class extends P{constructor(){super(...arguments);this.t=e=>e;this._busy=!1}async _save(e){if(!this.hass||!this.plant)return!1;this._busy=!0;try{let t=await this.hass.callWS({type:"heizzentrale/control/save",entry_id:this.plant.entry_id,...e});return this._error=void 0,this.dispatchEvent(new CustomEvent("control-changed",{detail:t})),!0}catch(t){return this._error=`${this.t("save_failed")} ${t?.message??""}`,!1}finally{this._busy=!1}}_presets(){let e=[];for(let t of this.plant?.rooms??[]){let s=t.climate_entity?this.hass?.states[t.climate_entity]?.attributes.preset_modes:void 0;for(let i of Array.isArray(s)?s:[])i!=="none"&&!e.includes(i)&&e.push(i)}return e}_climateWith(e){return this.plant?.rooms.find(t=>t.climate_entity&&this.hass?.states[t.climate_entity]?.attributes.preset_modes?.includes(e))?.climate_entity}_label(e){let t=e.startsWith("preset:")?this._climateWith(e.slice(7)):void 0;return Pe(e,this.t,this.hass,t)}_actionPicker(e,t,s){let i=this.t,o=e.startsWith("temperature:"),r=this._presets().map(l=>`preset:${l}`);return e.startsWith("preset:")&&!r.includes(e)&&r.push(e),u`
      <select
        aria-label=${i("action")}
        @change=${l=>{let a=l.target.value;t(a==="temperature"?"temperature:20":a)}}
      >
        ${s!==void 0?u`<option value="" ?selected=${e===""}>${s}</option>`:m}
        ${r.map(l=>u`<option value=${l} ?selected=${e===l}>
              ${this._label(l)}
            </option>`)}
        <option value="on" ?selected=${e==="on"}>${i("act_on")}</option>
        <option value="off" ?selected=${e==="off"}>${i("act_off")}</option>
        <option value="temperature" ?selected=${o}>${i("act_temperature")}</option>
      </select>
      ${o?u`<input
            class="short"
            type="number"
            min="5"
            max="30"
            step="0.5"
            aria-label="°C"
            .value=${e.slice(12)}
            @change=${l=>{let a=Number(l.target.value);if(Number.isFinite(a)){let d=Math.round(Math.min(30,Math.max(5,a))*2)/2;t(`temperature:${d}`)}}}
          />`:m}
    `}_targetPicker(e,t){let s=this.t,i=(r,l)=>r.includes(l)?r.filter(a=>a!==l):[...r,l],o=this.plant;return o?u`
      ${o.floors.length?u`<div class="label">${s("floors")}</div>
            <div class="choices">
              ${o.floors.map(r=>u`<button
                    class="choice ${e.floors.includes(r.id)?"on":""}"
                    aria-pressed=${e.floors.includes(r.id)}
                    @click=${()=>t(e.rooms,i(e.floors,r.id))}
                  >
                    ${r.name}
                  </button>`)}
            </div>`:m}
      <div class="label">${s("rooms_single")}</div>
      <div class="choices">
        ${o.rooms.map(r=>{let l=!!r.floor&&e.floors.includes(r.floor),a=e.rooms.includes(r.id);return u`<button
            class="choice ${a?"on":l?"via":""}"
            aria-pressed=${a}
            @click=${()=>t(i(e.rooms,r.id),e.floors)}
          >
            ${r.name}
          </button>`})}
      </div>
    `:m}_targetNames(e){let t=this.plant,s=[...e.floors.map(i=>t?.floors.find(o=>o.id===i)?.name),...e.rooms.map(i=>t?.rooms.find(o=>o.id===i)?.name)].filter(Boolean);return s.length?s.join(", "):this.t("assigned_none")}_renderSchedule(e){let t=this.t,s=[...e.points].sort((i,o)=>Math.min(...i.days)-Math.min(...o.days)||i.time.localeCompare(o.time));return u`
      <li>
        <div class="row-main">
          <span class="row-name">${e.name||t("unnamed")}</span>
          <button class="link" @click=${()=>this._schedule=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        ${s.length?s.map(i=>u`<div class="row-detail">
                  ${mt(i.days,t)} ${i.time} · ${this._label(i.action)}
                </div>`):u`<div class="row-warn">${t("no_points")}</div>`}
        <div class="row-detail">${t("applies_to")} ${this._targetNames(e)}</div>
      </li>
    `}_renderScheduleEditor(e){let t=this.t,s=l=>this._schedule={...e,...l},i=(l,a)=>s({points:e.points.map((d,h)=>h===l?{...d,...a}:d)}),o=this.control?.schedules.some(l=>l.id===e.id),r=async()=>{let l={...e,name:e.name.trim(),points:e.points.filter(h=>h.days.length)},a=(this.control?.schedules??[]).filter(h=>h.id!==e.id),d=o?(this.control?.schedules??[]).map(h=>h.id===e.id?l:h):[...a,l];await this._save({schedules:d})&&(this._schedule=void 0)};return u`
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
        ${e.points.map((l,a)=>u`
            <div class="point">
              <div class="days">
                ${ue.map((d,h)=>u`<button
                      class="day ${l.days.includes(h)?"on":""}"
                      aria-pressed=${l.days.includes(h)}
                      @click=${()=>i(a,{days:l.days.includes(h)?l.days.filter(p=>p!==h):[...l.days,h].sort()})}
                    >
                      ${t(d)}
                    </button>`)}
              </div>
              <div class="point-line">
                <input
                  type="time"
                  aria-label=${t("time")}
                  .value=${l.time}
                  @change=${d=>i(a,{time:d.target.value||l.time})}
                />
                ${this._actionPicker(l.action,d=>i(a,{action:d}))}
                <button
                  class="icon"
                  aria-label=${t("remove")}
                  @click=${()=>s({points:e.points.filter((d,h)=>h!==a)})}
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
        ${this._targetPicker(e,(l,a)=>s({rooms:l,floors:a}))}
        ${this._renderEditorButtons(r,()=>this._schedule=void 0,o?async()=>{let l=(this.control?.schedules??[]).filter(a=>a.id!==e.id);await this._save({schedules:l})&&(this._schedule=void 0)}:void 0)}
      </div>
    `}_renderEditorButtons(e,t,s){let i=this.t;return u`
      ${this._error?u`<div class="row-warn">${this._error}</div>`:m}
      <div class="buttons">
        <button class="wide primary" ?disabled=${this._busy} @click=${e}>${i("save")}</button>
        <button class="wide" @click=${t}>${i("cancel")}</button>
        ${s?u`<button class="wide danger" ?disabled=${this._busy} @click=${s}>
              ${i("delete")}
            </button>`:m}
      </div>
    `}_entityName(e){return this.hass?.states[e]?.attributes.friendly_name??e}_candidates(){return Object.entries(this.hass?.states??{}).filter(([e,t])=>{let s=e.split(".",1)[0];return s==="person"||s==="device_tracker"||s==="input_boolean"?!0:s==="binary_sensor"&&pt.has(t.attributes.device_class)}).map(([e])=>e).sort((e,t)=>this._entityName(e).localeCompare(this._entityName(t)))}_ruleSentence(e){let t=this.t,s=e.entities.map(i=>this._entityName(i)).join(` ${t("and")} `);return t(e.delay_min>0?"rule_sentence_delay":"rule_sentence",{who:s||"?",minutes:String(e.delay_min),targets:this._targetNames(e),action:this._label(e.action)})}_renderRule(e){let t=this.t,s=this.control?.active_rules.includes(e.id);return u`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${e.name||t("unnamed")}${s?u`<span class="badge">${t("rule_active")}</span>`:m}</span
          >
          <button class="link" @click=${()=>this._rule=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        <div class="row-detail">${this._ruleSentence(e)}</div>
        ${e.entities.length?m:u`<div class="row-warn">${t("no_entities")}</div>`}
      </li>
    `}_renderRuleEditor(e){let t=this.t,s=l=>this._rule={...e,...l},i=this.control?.rules.some(l=>l.id===e.id),o=this._candidates().filter(l=>!e.entities.includes(l)),r=async()=>{let l={...e,name:e.name.trim()},a=this.control?.rules??[],d=i?a.map(h=>h.id===e.id?l:h):[...a,l];await this._save({rules:d})&&(this._rule=void 0)};return u`
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
          ${e.entities.map(l=>u`<button
                class="choice on"
                title=${l}
                @click=${()=>s({entities:e.entities.filter(a=>a!==l)})}
              >
                ${this._entityName(l)} ✕
              </button>`)}
        </div>
        <select
          aria-label=${t("rule_add_entity")}
          @change=${l=>{let a=l.target;a.value&&s({entities:[...e.entities,a.value]}),a.value=""}}
        >
          <option value="">+ ${t("rule_add_entity")}</option>
          ${o.map(l=>u`<option value=${l}>
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
            @change=${l=>{let a=Number(l.target.value);s({delay_min:Number.isFinite(a)?Math.min(1440,Math.max(0,a)):0})}}
          />
          <span class="row-detail">${t("minutes")}</span>
        </label>
        <div class="label">${t("rule_then")}</div>
        <div class="point-line">
          ${this._actionPicker(e.action,l=>s({action:l}))}
        </div>
        <div class="label">${t("applies_to")}</div>
        ${this._targetPicker(e,(l,a)=>s({rooms:l,floors:a}))}
        <p class="hint">${this._ruleSentence(e)} ${t("rule_back")}</p>
        ${this._renderEditorButtons(r,()=>this._rule=void 0,i?async()=>{let l=(this.control?.rules??[]).filter(a=>a.id!==e.id);await this._save({rules:l})&&(this._rule=void 0)}:void 0)}
      </div>
    `}_stoveTemp(e){let t=e.sensor?this.hass?.states[e.sensor]:void 0,s=Number(t?.state);return!t||!Number.isFinite(s)?"":`${Math.round(s)} ${t.attributes.unit_of_measurement??"\xB0C"}`}_renderStove(e){let t=this.t,s=this.control?.burning?.includes(e.id),i=Object.entries(e.actions).map(([o,r])=>{let l=this.plant?.rooms.find(a=>a.id===o);return l?`${l.name} ${this._label(r)}`:""}).filter(Boolean);return u`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${e.name||t("unnamed")}${s?u`<span class="badge hot">${t("stove_burning")}</span>`:m}</span
          >
          <button class="link" @click=${()=>this._stove=structuredClone(e)}>
            ${t("edit")}
          </button>
        </div>
        <div class="row-detail">
          ${t("stove_summary",{degrees:String(e.on_above)})}
          ${this._stoveTemp(e)?`${t("stove_now")} ${this._stoveTemp(e)}.`:""}
        </div>
        ${i.length?u`<div class="row-detail">${t("stove_while")} ${i.join(", ")}</div>`:u`<div class="row-warn">${t("stove_no_rooms")}</div>`}
        ${e.sensor?m:u`<div class="row-warn">${t("stove_no_sensor")}</div>`}
      </li>
    `}_renderStoveEditor(e){let t=this.t,s=a=>this._stove={...e,...a},i=this.control?.stoves??[],o=i.some(a=>a.id===e.id),r=Object.entries(this.hass?.states??{}).filter(([a,d])=>a.startsWith("sensor.")&&d.attributes.device_class==="temperature").map(([a])=>a).sort((a,d)=>this._entityName(a).localeCompare(this._entityName(d)));e.sensor&&!r.includes(e.sensor)&&r.unshift(e.sensor);let l=async()=>{let a={...e,name:e.name.trim()},d=o?i.map(h=>h.id===e.id?a:h):[...i,a];await this._save({stoves:d})&&(this._stove=void 0)};return u`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${e.name}
            placeholder=${t("stove_placeholder")}
            @input=${a=>s({name:a.target.value})}
          />
        </label>
        <div class="label">${t("stove_sensor")}</div>
        <p class="hint first">${t("stove_sensor_hint")}</p>
        <select
          aria-label=${t("stove_sensor")}
          @change=${a=>s({sensor:a.target.value||null})}
        >
          <option value="" ?selected=${!e.sensor}>${t("choose")}</option>
          ${r.map(a=>u`<option value=${a} ?selected=${e.sensor===a}>
                ${this._entityName(a)}
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
            @change=${a=>{let d=Number(a.target.value);s({on_above:Number.isFinite(d)?Math.min(500,Math.max(25,d)):40})}}
          />
          <span class="row-detail"
            >°C ${this._stoveTemp(e)?`\xB7 ${t("stove_now")} ${this._stoveTemp(e)}`:""}</span
          >
        </label>
        <label class="field">
          <span class="label">${t("stove_room")}</span>
          <select
            @change=${a=>{let[d,h]=a.target.value.split(":");s({room:d==="room"?h:null,floor:d==="floor"?h:null})}}
          >
            <option value="" ?selected=${!e.room&&!e.floor}>
              ${t("stove_room_none")}
            </option>
            <optgroup label=${t("stove_in_room")}>
              ${this.plant?.rooms.map(a=>u`<option value="room:${a.id}" ?selected=${e.room===a.id}>
                    ${this._roomLabel(a)}
                  </option>`)}
            </optgroup>
            <optgroup label=${t("stove_own_tile")}>
              ${this.plant?.floors.map(a=>u`<option
                    value="floor:${a.id}"
                    ?selected=${!e.room&&e.floor===a.id}
                  >
                    ${a.name}
                  </option>`)}
            </optgroup>
          </select>
        </label>
        <div class="label">${t("stove_actions")}</div>
        <p class="hint first">${t("stove_actions_hint")}</p>
        ${this.plant?.rooms.map(a=>u`
            <div class="room-line">
              <span>${this._roomLabel(a)}</span>
              <span class="point-line">
                ${this._actionPicker(e.actions[a.id]??"",d=>{let h={...e.actions};d?h[a.id]=d:delete h[a.id],s({actions:h})},t("stove_leave"))}
              </span>
            </div>
          `)}
        ${this._renderEditorButtons(l,()=>this._stove=void 0,o?async()=>{let a=i.filter(d=>d.id!==e.id);await this._save({stoves:a})&&(this._stove=void 0)}:void 0)}
      </div>
    `}_roomLabel(e){let t=this.plant?.floors.find(s=>s.id===e.floor);return t?`${e.name} (${t.name})`:e.name}render(){let e=this.t,t=this.control;if(!t||!this.plant)return m;let s=this._presets().includes("away")?"preset:away":"off",i=t.stoves??[],o=t.window??{enabled:!0,delay_min:2};return u`
      <section class="set">
        <h3>${e("set_schedules")}</h3>
        <p class="hint first">${e("schedules_intro")}</p>
        ${t.schedules.length?u`<ul>
              ${t.schedules.map(r=>this._schedule?.id===r.id?u`<li>${this._renderScheduleEditor(this._schedule)}</li>`:this._renderSchedule(r))}
            </ul>`:m}
        ${this._schedule&&!t.schedules.some(r=>r.id===this._schedule.id)?u`<div class="new">${this._renderScheduleEditor(this._schedule)}</div>`:u`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._schedule={id:Ce(),name:"",points:[],rooms:[],floors:[]}}}
            >
              + ${e("add_schedule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${e("set_absence")}</h3>
        <p class="hint first">${e("absence_intro")}</p>
        ${t.rules.length?u`<ul>
              ${t.rules.map(r=>this._rule?.id===r.id?u`<li>${this._renderRuleEditor(this._rule)}</li>`:this._renderRule(r))}
            </ul>`:m}
        ${this._rule&&!t.rules.some(r=>r.id===this._rule.id)?u`<div class="new">${this._renderRuleEditor(this._rule)}</div>`:u`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._rule={id:Ce(),name:"",entities:[],delay_min:10,rooms:[],floors:[],action:s}}}
            >
              + ${e("add_rule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${e("set_stoves")}</h3>
        <p class="hint first">${e("stoves_intro")}</p>
        ${i.length?u`<ul>
              ${i.map(r=>this._stove?.id===r.id?u`<li>${this._renderStoveEditor(this._stove)}</li>`:this._renderStove(r))}
            </ul>`:m}
        ${this._stove&&!i.some(r=>r.id===this._stove.id)?u`<div class="new">${this._renderStoveEditor(this._stove)}</div>`:u`<button
              class="wide"
              @click=${()=>{this._error=void 0,this._stove={id:Ce(),name:"",sensor:null,on_above:40,room:null,floor:null,actions:{}}}}
            >
              + ${e("add_stove")}
            </button>`}
      </section>
      <section class="set">
        <h3>${e("set_window")}</h3>
        <div class="choices">
          ${[!1,!0].map(r=>u`<button
                class="choice ${o.enabled===r?"on":""}"
                aria-pressed=${o.enabled===r}
                ?disabled=${this._busy}
                @click=${()=>this._save({window:{...o,enabled:r}})}
              >
                ${e(r?"window_on":"window_off")}
              </button>`)}
        </div>
        ${o.enabled?u`<label class="field inline">
              <span class="label">${e("window_delay")}</span>
              <input
                class="short"
                type="number"
                min="0"
                max="60"
                step="1"
                .value=${String(o.delay_min)}
                @change=${r=>{let l=Number(r.target.value);this._save({window:{...o,delay_min:Number.isFinite(l)?Math.min(60,Math.max(0,l)):2}})}}
              />
            </label>`:m}
        <p class="hint">${e("window_hint")}</p>
      </section>
      <section class="set">
        <h3>${e("set_apply")}</h3>
        <div class="choices">
          ${[!1,!0].map(r=>u`<button
                class="choice ${t.enabled===r?"on":""}"
                aria-pressed=${t.enabled===r}
                ?disabled=${this._busy}
                @click=${()=>this._save({enabled:r})}
              >
                ${e(r?"apply_on":"apply_off")}
              </button>`)}
        </div>
        <p class="hint">${e(t.enabled?"apply_on_hint":"apply_off_hint")}</p>
        ${this._error&&!this._schedule&&!this._rule&&!this._stove?u`<div class="row-warn">${this._error}</div>`:m}
      </section>
    `}};se.properties={hass:{attribute:!1},plant:{attribute:!1},control:{attribute:!1},t:{attribute:!1},_schedule:{state:!0},_rule:{state:!0},_stove:{state:!0},_error:{state:!0},_busy:{state:!0}},se.styles=F`
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
  `;customElements.get("heizzentrale-control")||customElements.define("heizzentrale-control",se);var pe=["#3b82f6","#14b8a6","#a855f7","#f59e0b","#ec4899","#84cc16","#6366f1","#f97316"];function L(c,n=7){let e=i=>Math.round(i*10)/10,t=`M${e(c[0][0])} ${e(c[0][1])}`;for(let i=1;i<c.length-1;i++){let[o,r]=c[i-1],[l,a]=c[i],[d,h]=c[i+1],p=Math.hypot(l-o,a-r),f=Math.hypot(d-l,h-a),_=Math.min(n,p/2,f/2);if(_<.5){t+=` L${e(l)} ${e(a)}`;continue}t+=` L${e(l-(l-o)/p*_)} ${e(a-(a-r)/p*_)}`,t+=` Q${e(l)} ${e(a)} ${e(l+(d-l)/f*_)} ${e(a+(h-a)/f*_)}`}let s=c[c.length-1];return`${t} L${e(s[0])} ${e(s[1])}`}var Xe=new Set(["on","heat","heating","running","true"]),ne=class extends P{constructor(){super(...arguments);this._config={};this._loading=!1;this._watched=new Set;this._view="house";this._confirmActive=!1;this._edit=!1;this._sensorFilter="";this._pipes=[];this._pipeSignature=""}static getStubConfig(){return{}}static getConfigElement(){return document.createElement("heizzentrale-house-card-editor")}setConfig(e){this._config={...e}}getCardSize(){return 8}getGridOptions(){return{columns:"full",min_columns:6}}set hass(e){let t=this._hass;if(this._hass=e,!this._plants&&!this._loading){this._load();return}if(!t){this.requestUpdate();return}for(let s of this._watched)if(t.states[s]!==e.states[s]){this.requestUpdate(),window.clearTimeout(this._adviceTimer),this._adviceTimer=window.setTimeout(()=>{this._loadControl()},2500);return}t.language!==e.language&&this.requestUpdate()}get hass(){return this._hass}async _load(){if(this._hass){this._loading=!0;try{let e=await this._hass.callWS({type:"heizzentrale/plants"});this._plants=e.plants,this._error=void 0,this._loadControl()}catch(e){this._error=e?.message??String(e),this._plants=[]}finally{this._loading=!1}}}async _loadControl(){let e=this._plant();if(!(!e||!this._hass))try{this._control=await this._hass.callWS({type:"heizzentrale/control/get",entry_id:e.entry_id})}catch{this._control=void 0}}disconnectedCallback(){super.disconnectedCallback(),this._resize?.disconnect(),this._observed=void 0,window.clearTimeout(this._adviceTimer)}updated(){let e=this.renderRoot.querySelector("dialog");e&&!e.open&&e.showModal();let t=this.renderRoot.querySelector(".house")??void 0;t!==this._observed&&(this._resize?.disconnect(),this._observed=t,t&&typeof ResizeObserver<"u"&&(this._resize??=new ResizeObserver(()=>this._measurePipes()),this._resize.observe(t))),this._measurePipes()}_lanes(e){return e.circuits.filter(t=>e.rooms.some(s=>s.circuit===t.id))}_measurePipes(){let e=this.renderRoot.querySelector(".house"),t=this._plant(),s=[];if(e&&t){let o=e.getBoundingClientRect(),r=g=>{let v=g.getBoundingClientRect();return{top:v.top-o.top,bottom:v.bottom-o.top,center:(v.left+v.right)/2-o.left,left:v.left-o.left,right:v.right-o.left}},l=g=>{let v=new Map;for(let w of g){let $=Math.round(w.bottom);v.set($,[...v.get($)??[],w])}return[...v.entries()].sort((w,$)=>w[0]-$[0]).map(w=>w[1])},a="var(--hz-hot)",d=(g,v)=>{let w=e.querySelector(`[data-part="${g}:${v}"]`);return w?r(w):void 0},h=g=>g.filter(v=>!!v),p=g=>this._circuitOpen(g)!==!1,f=t.circuits.some(p),_=(g,v,w)=>{if(Math.abs(g.top-v.top)<4&&v.left>=g.right){let $=(g.top+g.bottom)/2;s.push({d:L([[g.right-4,$],[v.left+4,$]]),color:a,active:w})}else{let $=g.bottom+8;s.push({d:L([[g.center,g.bottom-6],[g.center,$],[v.center,$],[v.center,v.top+6]]),color:a,active:w})}},S=(g,v,w)=>{let $=v.map(b=>({circuit:b,at:d("circuit",b.id)})).filter(b=>!!b.at);if(!$.length)return;let R=$.some(b=>p(b.circuit)),H=g.bottom+8+w,N=[g.center],D=g.center;s.push({d:L([[g.center,g.bottom-6],[g.center,H]]),color:a,active:R});let A=()=>{let b=Math.min(...N),C=Math.max(...N);C-b>1&&s.push({d:L([[b,H],[C,H]]),color:a,active:R})};for(let b of l($.map(C=>({...C,bottom:C.at.bottom})))){let C=b[0].at.top<H;if(!C&&b[0].at.top-H>30){A();let z=b[0].at.top-10+w;s.push({d:L([[D,H],[D,z]]),color:a,active:R}),H=z,N=[D]}for(let z of b){let _e=C?z.at.bottom-6:z.at.top+6;N.push(z.at.center),s.push({d:L([[z.at.center,H],[z.at.center,_e]]),color:a,active:p(z.circuit)})}D=b[0].at.center}A()},y=h([...t.heat_sources.map(g=>d("source",g.id)),...t.buffers.map(g=>d("buffer",g.id))]);y.slice(1).forEach((g,v)=>_(y[v],g,f));let T=y[y.length-1],B=t.pump_groups??[],x=new Set;B.forEach((g,v)=>{let w=d("pump",g.id);if(!w)return;let $=t.circuits.filter(R=>R.pump_group===g.id);$.forEach(R=>x.add(R.id)),T&&_(T,w,$.some(p)),S(w,$,v*5)});let M=t.circuits.filter(g=>!x.has(g.id));T&&M.length&&S(T,M,B.length*5);let re=this._lanes(t),W=e.querySelector(".walls"),ae=e.querySelector(".parts"),me=W?r(W).left+2:0,k=ae?r(ae).top:0;re.forEach((g,v)=>{let w=pe[t.circuits.indexOf(g)%pe.length],$=this._circuitOpen(g)!==!1,R=me+9+v*6,H=[...e.querySelectorAll(`[data-circuit="${g.id}"]`)].map(A=>({...r(A),heating:A.classList.contains("heating")})),N;for(let A of l(H)){let b=A[0].bottom+6+v*4;N=Math.min(N??b,b),A.sort((z,_e)=>z.center-_e.center);let C=A[A.length-1];s.push({d:L([[R,b],[C.center,b],[C.center,C.bottom-6]]),color:w,active:$&&A.some(z=>z.heating)});for(let z of A.slice(0,-1))s.push({d:L([[z.center,b],[z.center,z.bottom-6]]),color:w,active:$&&z.heating})}let D=d("circuit",g.id);if(D&&N!==void 0){let A=k-7-v*4,b=D.center+(v-(re.length-1)/2)*6;s.push({d:L([[b,D.top+6],[b,A],[R,A],[R,N]]),color:w,active:$})}})}let i=JSON.stringify(s);i!==this._pipeSignature&&(this._pipeSignature=i,this._pipes=s)}_renderPipes(){return u`<svg class="pipes" aria-hidden="true">
      ${this._pipes.map(e=>E`
          <path class="tube ${e.active?"active":""}" d=${e.d} style="stroke:${e.color}"/>
          ${e.active?E`<path class="flow" d=${e.d} style="stroke:${e.color}"/>`:m}`)}
    </svg>`}get _language(){let e=this._plant()?.language;return e==="de"||e==="en"?e:this._hass?.locale?.language??this._hass?.language??"en"}get _t(){return Te(this._language)}async _setLanguage(e,t){await this._hass?.callWS({type:"heizzentrale/set_language",entry_id:e.entry_id,language:t}),await this._load()}_state(e){if(e)return this._watched.add(e),this._hass?.states[e]}_number(e){let t=this._state(e);if(!t)return;let s=Number(t.state);return t.state!==""&&Number.isFinite(s)?s:void 0}_format(e,t,s=1){if(e===void 0)return"\u2013";let i=this._language,o=new Intl.NumberFormat(i,{minimumFractionDigits:s,maximumFractionDigits:s}).format(e);return t?`${o} ${t}`:o}_temp(e){let s=this._state(e)?.attributes.unit_of_measurement??"\xB0C";return this._format(this._number(e),s)}_plant(){if(this._plants?.length)return this._plants.find(e=>e.entry_id===this._config.entry_id)??this._plants[0]}_circuitOpen(e){if(!e.valve_entity)return!0;let t=this._state(e.open_entity)?.state;if(t==="on")return!0;if(t==="off")return!1}_windowOpen(e){return(e.window_entities??[]).map(t=>this._state(t)?.state==="on").includes(!0)}_select(e){let t=this._selection&&this._selection.kind===e.kind&&this._selection.id===e.id;this._selection=t?void 0:e,!t&&e.kind==="room"&&this._loadControl()}_key(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._select(t))}_isSelected(e,t){let s=this._selection;return!!s&&s.kind===e&&s.id===t}render(){this._watched.clear();let e=this._t;if(!this._plants)return u`<ha-card><div class="note">${e("loading")}</div></ha-card>`;let t=this._plant();if(!t)return u`<ha-card
        ><div class="note">${this._error??e("no_plant")}</div></ha-card
      >`;let s=!t.rooms.length&&!t.circuits.length&&!t.buffers.length&&!t.pump_groups?.length&&!t.heat_sources.length,i=new Map;return t.circuits.forEach((o,r)=>i.set(o.id,pe[r%pe.length])),u`
      <ha-card>
        ${this._renderHeader(t)}
        ${s&&this._view==="house"?u`<div class="settings">${this._renderSetup(t)}</div>`:m}
        ${this._view==="settings"?this._renderSettings(t,i):u`${s?m:this._renderHouse(t,i)}
            ${this._renderExplanation(t)} ${this._renderRoomDialog(t,i)}
            ${this._renderSensorDialog(t)}`}
      </ha-card>
    `}_renderHeader(e){let t=this._t,s=this._state(e.mode_entity)?.state,i=e.outdoor_entity?u`<span class="chip" title=${t("outdoor")}
          >${t("outdoor")} ${this._temp(e.outdoor_entity)}</span
        >`:m,o=s==="observe"||s==="off"||s==="active"?u`<button
            class="chip mode ${s}"
            @click=${()=>this._select({kind:"mode"})}
          >
            ${t(`mode_${s}`)}
          </button>`:m;return u`
      <div class="header">
        <h2>${this._config.title||e.name}</h2>
        <div class="chips">
          ${i}${o}
          ${this._view==="house"&&e.rooms.length?u`<button
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
    `}_renderHouse(e,t){let s=this._t,i=new Set(e.floors.map(_=>_.id)),o=this._edit,r=o?e.all_floors??e.floors:e.floors,l=_=>(this._control?.stoves??[]).some(S=>!S.room&&S.floor===_),a=(_,S,y="")=>S.length||y&&(o||l(y))?u`
            <section
              class="storey ${this._drag?.moved&&this._drag.overFloor===y?"drop":""}"
              data-floor=${y}
            >
              ${_?u`<div class="floor-name">${_}</div>`:m}
              <div class="rooms">
                ${S.map(T=>this._renderRoom(e,T,t))}
                ${y?this._renderStoveTiles(y):m}
                ${S.length||!o?m:u`<div class="drop-hint">${s("edit_drop")}</div>`}
              </div>
            </section>
          `:m,d=_=>e.rooms.filter(S=>S.floor===_),h=r.filter(_=>(_.level??0)>=0),p=r.filter(_=>(_.level??0)<0),f=e.rooms.filter(_=>!_.floor||!i.has(_.floor));return u`
      <div class="house" style="--hz-lanes:${this._lanes(e).length}">
        ${o?m:this._renderPipes()}
        ${o?u`<p class="edit-note">${s("edit_note")}</p>`:m}
        <div class="roof">${bt}</div>
        <div class="walls">
          ${h.map(_=>a(_.name,d(_.id),_.id))}
          ${a(r.length?s("other_rooms"):"",f)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${p.map(_=>a(_.name,d(_.id),_.id))}
          ${this._renderPlantRoom(e,t)}
        </div>
      </div>
    `}_renderRoom(e,t,s){let i=this._t,o=this._state(t.climate_entity),r=o?.attributes??{},l=!o||o.state==="unavailable"||o.state==="unknown",a=r.hvac_action==="heating",d=this._windowOpen(t),h="\xB0",p=r.current_temperature,f=r.temperature,_=r.preset_mode&&r.preset_mode!=="none"?String(r.preset_mode):void 0,S=e.circuits.find(x=>x.id===t.circuit),y={kind:"room",id:t.id},T=this._drag?.id===t.id&&this._drag.moved?this._drag:void 0,B=this._drag?.moved&&this._drag.overRoom===t.id?this._drag.after?"drop-after":"drop-before":"";return u`
      <div
        class="room ${a?"heating":""} ${l?"off":""}
          ${this._isSelected("room",t.id)?"selected":""}
          ${this._edit?"editing":""} ${T?"dragging":""} ${B}"
        style=${T?`transform:translate(${T.dx}px,${T.dy}px)`:m}
        role="button"
        tabindex="0"
        data-room=${t.id}
        data-circuit=${S?.id??m}
        @click=${()=>!this._edit&&this._select(y)}
        @keydown=${x=>!this._edit&&this._key(x,y)}
        @pointerdown=${x=>this._dragStart(x,t)}
        @pointermove=${x=>this._dragMove(x)}
        @pointerup=${x=>this._dragEnd(x,e)}
        @pointercancel=${()=>this._drag=void 0}
      >
        <div class="room-top">
          <span class="room-name"
            >${S?u`<span class="dot" style="background:${s.get(S.id)}"></span>`:m}${t.name}</span
          >
          <span class="icons">
            ${this._edit?u`<span class="grip" title=${i("edit_grip")}>⠿</span>`:m}
            ${d?u`<span class="badge window" title=${i("window_open")}
                  >${vt}</span
                >`:m}
            ${a?u`<span class="badge flame" title=${i("heating")}
                  >${Re}</span
                >`:m}
          </span>
        </div>
        <div class="room-temp">
          ${this._format(typeof p=="number"?p:void 0,"")}<span
            class="unit"
            >${h}</span
          >
        </div>
        <div class="room-bottom">
          <span
            >${i("target")}
            ${o?.state==="off"?"\u2013":this._format(typeof f=="number"?f:void 0,"")}${h}</span
          >
          ${_?u`<span class="preset">${this._presetLabel(o,_)}</span>`:m}
        </div>
        ${(this._control?.stoves??[]).filter(x=>x.room===t.id).map(x=>{let M=this._control?.burning?.includes(x.id);return u`<div class="stove ${M?"burning":""}">
              ${Re}<span class="stove-name">${x.name||i("stove")}</span>
              <span>${this._format(this._number(x.sensor),"\xB0",0)}</span>
            </div>`})}
        ${this._renderExtras(e,`room:${t.id}`)}
        ${this._edit?u`<div class="edit-row">
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
    `}_renderStoveTiles(e){let t=this._t;return(this._control?.stoves??[]).filter(s=>!s.room&&s.floor===e).map(s=>{let i=!!this._control?.burning?.includes(s.id);return u`<div class="room stove-tile ${i?"heating":""}">
          <div class="room-top">
            <span class="room-name">${s.name||t("stove")}</span>
            <span class="icons"
              >${i?u`<span class="badge flame" title=${t("stove_burning")}>${Re}</span>`:m}</span
            >
          </div>
          <div class="room-temp">
            ${this._format(this._number(s.sensor),"",0)}<span class="unit">°</span>
          </div>
          <div class="room-bottom">
            <span>${t(i?"stove_burning":"stove_out")}</span>
            <span class="preset">${t("stove")}</span>
          </div>
        </div>`})}_renderExtras(e,t){let s=(e.extra_sensors??[]).filter(i=>i.place===t);return s.length?u`<div class="extras">
      ${s.map(i=>{let o=this._state(i.entity),r=this._number(i.entity),l=o?.attributes.unit_of_measurement??"",a=r!==void 0?this._format(r,l,Math.abs(r)>=100?0:1):o?.state??"\u2013";return u`<div class="extra">
          <span class="extra-name"
            >${i.label||o?.attributes.friendly_name||i.entity}</span
          ><span>${a}</span>
        </div>`})}
    </div>`:m}async _saveLayout(e,t){try{let s=await this._hass.callWS({type:"heizzentrale/layout/save",entry_id:e.entry_id,...t});this._plants=s.plants,this._error=void 0}catch(s){this._error=s?.message??String(s)}}_moveRoom(e,t,s,i,o=!1){let r=e.rooms.map(h=>h.id).filter(h=>h!==t),l=i?r.indexOf(i):-1;l>=0?r.splice(l+(o?1:0),0,t):r.push(t);let a={...e.placed_floors??{}};s?a[t]=s:s===""&&delete a[t];let d=new Map(e.rooms.map(h=>[h.id,h]));e.rooms=r.map(h=>{let p=d.get(h);return h===t&&s?{...p,floor:s}:p}),this.requestUpdate(),this._saveLayout(e,{order:r,floors:a})}_nudge(e,t,s){let i=e.rooms.filter(r=>(r.floor??"")===(t.floor??"")),o=i[i.indexOf(t)+s];o&&this._moveRoom(e,t.id,void 0,o.id,s>0)}_dragStart(e,t){!this._edit||e.button!==0||e.target.closest("button")||e.pointerType!=="mouse"&&!e.target.closest(".grip")||(e.currentTarget.setPointerCapture(e.pointerId),this._drag={id:t.id,startX:e.clientX,startY:e.clientY,dx:0,dy:0,moved:!1})}_dragMove(e){let t=this._drag;if(!t)return;let s=e.clientX-t.startX,i=e.clientY-t.startY,o={...t,dx:s,dy:i,moved:t.moved||Math.hypot(s,i)>6};o.overRoom=o.overFloor=void 0;let l=this.renderRoot.elementsFromPoint?.(e.clientX,e.clientY)??[];for(let a of l){let d=a.closest?.(".room[data-room]");if(d&&d.dataset.room!==t.id){let p=d.getBoundingClientRect();o.overRoom=d.dataset.room,o.after=e.clientX>p.left+p.width/2}let h=a.closest?.(".storey[data-floor]");if(h){o.overFloor=h.dataset.floor??"";break}}this._drag=o}_dragEnd(e,t){let s=this._drag;this._drag=void 0,!(!s?.moved||s.overFloor===void 0)&&this._moveRoom(t,s.id,s.overFloor,s.overRoom,s.after)}_renderSensorDialog(e){let t=this._sensorPlace;if(!t)return m;let s=this._t,i=e.extra_sensors??[],o=i.filter(p=>p.place===t.place),r=()=>{this._sensorPlace=void 0,this._sensorFilter=""},l=this._sensorFilter.trim().toLowerCase(),a=p=>String(this._hass?.states[p]?.attributes.friendly_name??p),d=Object.keys(this._hass?.states??{}).filter(p=>p.startsWith("sensor.")).filter(p=>!l||p.toLowerCase().includes(l)||a(p).toLowerCase().includes(l)).sort((p,f)=>a(p).localeCompare(a(f))).slice(0,200),h=()=>{let p=this.renderRoot.querySelector("#extra-entity"),f=this.renderRoot.querySelector("#extra-label");if(!p?.value)return;let _={id:Math.random().toString(36).slice(2,10),entity:p.value,label:f?.value.trim()??"",place:t.place};f&&(f.value=""),this._saveLayout(e,{sensors:[...i,_]})};return u`
      <dialog class="backdrop" aria-label=${s("edit_sensor")} @click=${r} @cancel=${r}>
        <div class="sheet" @click=${p=>p.stopPropagation()}>
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${s("edit_sensor_title",{name:t.name})}</div>
              <div class="sheet-sub">${s("edit_sensor_hint")}</div>
            </div>
            <button class="close" aria-label=${s("close")} @click=${r}>✕</button>
          </div>
          ${o.map(p=>u`<div class="extra-row">
                <span>${p.label||a(p.entity)}</span>
                <button
                  class="close"
                  aria-label=${s("remove")}
                  @click=${()=>this._saveLayout(e,{sensors:i.filter(f=>f.id!==p.id)})}
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
            ${d.map(p=>u`<option value=${p}>${a(p)}</option>`)}
          </select>
          <input
            id="extra-label"
            class="field"
            type="text"
            maxlength="30"
            placeholder=${s("edit_sensor_label")}
            aria-label=${s("edit_sensor_label")}
          />
          <button class="wide primary" ?disabled=${!d.length} @click=${h}>
            ${s("edit_sensor_add")}
          </button>
        </div>
      </dialog>
    `}_renderPlantRoom(e,t){let s=this._t;if(!e.heat_sources.length&&!e.buffers.length&&!e.circuits.length&&!e.pump_groups?.length)return m;let i=e.circuits.some(o=>this._circuitOpen(o)!==!1);return u`
      <section class="storey plant-room">
        <div class="floor-name">${s("plant_room")}</div>
        <div class="parts">
          ${e.heat_sources.map(o=>this._renderSource(o,i))}
          ${e.buffers.map(o=>this._renderBuffer(o,i))}
          ${(e.pump_groups??[]).map(o=>this._renderPumpGroup(e,o))}
          ${e.circuits.map(o=>this._renderCircuit(o,t.get(o.id)??"gray"))}
        </div>
      </section>
    `}_part(e,t,s,i=""){return u`
      <div
        class="part ${t?"flowing":""} ${i}
          ${this._isSelected(e.kind,e.id)?"selected":""}"
        role="button"
        tabindex="0"
        data-part="${e.kind}:${e.id}"
        @click=${()=>!this._edit&&this._select(e)}
        @keydown=${o=>!this._edit&&this._key(o,e)}
      >
        ${s}
        ${this._plant()?this._renderExtras(this._plant(),`${e.kind}:${e.id}`):m}
        ${this._edit&&e.kind!=="mode"?u`<button
              class="edit-add"
              @click=${o=>{o.stopPropagation(),this._sensorPlace={place:`${e.kind}:${e.id}`,name:o.currentTarget.closest(".part")?.querySelector(".part-name")?.textContent?.trim()??""}}}
            >
              + ${this._t("edit_sensor")}
            </button>`:m}
      </div>
    `}_sourceActive(e){let t=this._state(e.status_entity)?.state?.toLowerCase();return!!t&&Xe.has(t)}_renderSource(e,t){let s=this._t,i=this._sourceActive(e);return this._part({kind:"source",id:e.id},t,u`
        <div class="part-name">${e.name}</div>
        <div class="figure">${yt(i)}</div>
        <div class="big">
          ${e.temperature_entity?this._temp(e.temperature_entity):e.flow_entity?this._temp(e.flow_entity):"\u2013"}
        </div>
        <div class="sub">
          ${s(i?"running":`kind_${e.kind}`)}
        </div>
      `)}_renderBuffer(e,t){let s=e.sensor_entities.map(i=>this._number(i));return this._part({kind:"buffer",id:e.id},t,u`
        <div class="part-name">${e.name}</div>
        <div class="figure buffer-figure">
          ${xt(s)}
          <div class="tank-values">
            ${e.sensor_entities.map(i=>u`<span>${this._temp(i)}</span>`)}
          </div>
        </div>
        <div class="sub">
          ${e.volume?`${this._format(e.volume,"l",0)}`:m}
        </div>
      `)}_pumpRunning(e){let t=this._state(e.status_entity)?.state?.toLowerCase();if(!(!t||t==="unavailable"||t==="unknown"))return Xe.has(t)}_renderPumpGroup(e,t){let s=this._t,i=this._pumpRunning(t),o=e.circuits.filter(r=>r.pump_group===t.id).some(r=>this._circuitOpen(r)!==!1);return this._part({kind:"pump",id:t.id},o,u`
        <div class="part-name">${t.name}</div>
        <div class="figure">${wt(i??o)}</div>
        <div class="big">${t.flow_entity?this._temp(t.flow_entity):"\u2013"}</div>
        ${t.return_entity?u`<div class="pair">
              <span class="hot">${this._temp(t.flow_entity)}</span>
              <span class="cold">${this._temp(t.return_entity)}</span>
            </div>`:m}
        <div class="sub ${i?"status-open":""}">
          ${s(i===void 0?"pump_group":i?"running":"pump_stopped")}
        </div>
        ${this._renderWould(this._control?.advice?.pump_groups[t.id]?.action)}
      `)}_renderCircuit(e,t){let s=this._t,i=this._circuitOpen(e),o=this._number(e.spread_entity),r=i===void 0?"unknown":i?"open":"closed";return this._part({kind:"circuit",id:e.id},i!==!1,u`
        <div class="part-name">
          <span class="dot" style="background:${t}"></span>${e.name}
        </div>
        <div class="figure">${kt(r)}</div>
        <div class="big">
          ${o===void 0?"\u2013":`\u0394 ${this._format(o,"K")}`}
        </div>
        <div class="pair">
          <span class="hot">${this._temp(e.flow_entity)}</span>
          <span class="cold">${this._temp(e.return_entity)}</span>
        </div>
        <div class="sub status-${r}">${s(r)}</div>
        ${this._renderWould(this._control?.advice?.circuits[e.id]?.action)}
      `,`circuit-${r}`)}_renderWould(e){return!e||this._control?.switching?m:u`<div class="would">${this._t(`would_${e}`)}</div>`}_explain(e,t){let s=this._t,i="",o=[];if(t.kind==="mode"){let r=this._state(e.mode_entity)?.state,l=r==="off"||r==="active"?r:"observe";i=s(`mode_${l}`),o=[s(`x_mode_${l}`)]}else if(t.kind==="circuit"){let r=e.circuits.find(p=>p.id===t.id);if(!r)return;i=r.name,o.push(s("x_what_circuit",{name:r.name,system:s(`system_${r.system_type}`)}));let l=this._number(r.spread_entity);o.push(l===void 0?s("x_no_spread"):s("x_spread",{flow:this._temp(r.flow_entity),ret:this._temp(r.return_entity),spread:this._format(l,"K")}));let a=this._circuitOpen(r);r.valve_entity?a===void 0?o.push(s("x_valve_unknown")):r.valve_entity.startsWith("valve.")?o.push(s(a?"x_open_valve":"x_closed_valve")):o.push(s(`x_${a?"open":"closed"}_${r.valve_type==="no"?"no":"nc"}`)):o.push(s("x_no_valve"));let d=e.rooms.filter(p=>p.circuit===r.id).map(p=>p.name);d.length&&o.push(s("x_rooms_on",{rooms:d.join(", ")}));let h=this._control?.advice?.circuits[r.id];h&&(o.push(s(`x_adv_${h.reason}`,{rooms:h.rooms.join(", ")})),this._control?.switching?this._control.switched?.[r.id]==="close"&&o.push(s(h.action?"x_adv_by_hand":"x_adv_closed")):h.action&&o.push(s(`x_adv_would_${h.action}`)))}else if(t.kind==="room"){let r=e.rooms.find(p=>p.id===t.id);if(!r)return;i=r.name;let l=this._state(r.climate_entity),a=l?.attributes??{},d={name:r.name,current:this._format(a.current_temperature,"\xB0C"),target:this._format(a.temperature,"\xB0C")};!l||l.state==="unavailable"||l.state==="unknown"?o.push(s("x_room_unavailable",d)):l.state==="off"?o.push(s("x_room_off",d)):a.hvac_action==="heating"?o.push(s("x_room_heating",d)):o.push(s("x_room_idle",d)),this._windowOpen(r)&&o.push(s("x_room_window")),a.preset_mode&&a.preset_mode!=="none"&&o.push(s("x_room_preset",{preset:this._presetLabel(l,String(a.preset_mode))}));let h=e.circuits.find(p=>p.id===r.circuit);h&&o.push(s("x_room_circuit",{circuit:h.name}))}else if(t.kind==="pump"){let r=e.pump_groups?.find(h=>h.id===t.id);if(!r)return;i=r.name,o.push(s("x_pump",{name:r.name})),r.flow_entity&&o.push(s("x_pump_flow",{temp:this._temp(r.flow_entity)}));let l=e.circuits.filter(h=>h.pump_group===r.id);if(l.length){let h=l.filter(p=>this._circuitOpen(p)!==!1);o.push(h.length?s("x_pump_needed",{circuits:h.map(p=>p.name).join(", ")}):s("x_pump_idle"))}let a=this._pumpRunning(r);a!==void 0&&o.push(s(a?"x_pump_running":"x_pump_stopped")),o.push(s(r.control_entity?"x_pump_control":"x_pump_no_control")),r.control_off_option&&r.control_on_option&&o.push(s("x_pump_modes",{off:r.control_off_option,on:r.control_on_option}));let d=this._control?.advice?.pump_groups[r.id];d?.reason==="manual"?o.push(s("x_padv_manual")):this._control?.switching?this._control.switched?.[r.id]==="off"?o.push(s(d?.action==="off"?"x_padv_by_hand":"x_padv_off")):d?.action==="on"&&o.push(s("x_padv_hand_off")):d?.action&&o.push(s(`x_padv_would_${d.action}`))}else if(t.kind==="buffer"){let r=e.buffers.find(l=>l.id===t.id);if(!r)return;i=r.name,o.push(s("x_buffer",{name:r.name})),this._number(r.mean_entity)!==void 0&&o.push(s("x_buffer_mean",{mean:this._temp(r.mean_entity)}))}else{let r=e.heat_sources.find(d=>d.id===t.id);if(!r)return;i=r.name;let l=this._state(r.status_entity)?.state;o.push(s("x_source",{name:r.name,status:this._sourceActive(r)?s("running"):l??s("unknown")}));let a=r.temperature_entity??r.flow_entity;a&&o.push(s("x_source_temp",{temp:this._temp(a)}))}return{title:i,lines:o}}_presetLabel(e,t){return e&&this._hass?.formatEntityAttributeValue?this._hass.formatEntityAttributeValue(e,"preset_mode",t):t}_renderExplanation(e){let t=this._selection;if(!t||t.kind==="room")return m;let s=this._explain(e,t);return s?u`
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
        ${s.lines.map(i=>u`<p>${i}</p>`)}
      </div>
    `:m}_call(e,t,s){this._hass?.callService?.(e,t,s)}_setTarget(e,t,s,i){let o=Math.round(Math.min(i,Math.max(s,t))*10)/10;this._pendingTarget={entity:e,value:o},window.clearTimeout(this._targetTimer),this._targetTimer=window.setTimeout(()=>{this._call("climate","set_temperature",{entity_id:e,temperature:o}),this._targetTimer=window.setTimeout(()=>this._pendingTarget=void 0,2500)},700)}_renderRoomDialog(e,t){let s=this._selection;if(!s||s.kind!=="room")return m;let i=e.rooms.find(k=>k.id===s.id);if(!i?.climate_entity)return m;let o=this._t,r=i.climate_entity,l=this._state(r),a=l?.attributes??{},d=!!l&&l.state!=="unavailable"&&l.state!=="unknown",h=l?.state==="off",p=Number(a.target_temp_step)||.5,f=typeof a.min_temp=="number"?a.min_temp:5,_=typeof a.max_temp=="number"?a.max_temp:30,y=(this._pendingTarget?.entity===r?this._pendingTarget.value:void 0)??(typeof a.temperature=="number"?a.temperature:void 0),T=Array.isArray(a.preset_modes)?a.preset_modes.filter(k=>k!=="none"):[],B=Array.isArray(a.hvac_modes)?a.hvac_modes:[],x=["heat","auto","heat_cool"].find(k=>B.includes(k)),M=e.circuits.find(k=>k.id===i.circuit),re=e.floors.find(k=>k.id===i.floor),W=()=>this._selection=void 0,ae=this._explain(e,s)?.lines??[],me=[M?`${o("circuit")} ${M.name}`:"",re?.name??""].filter(Boolean).join(" \xB7 ");return u`
      <dialog
        class="backdrop"
        aria-label=${i.name}
        @click=${W}
        @cancel=${W}
      >
        <div
          class="sheet"
          @click=${k=>k.stopPropagation()}
          @keydown=${k=>k.key==="Escape"&&W()}
        >
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${i.name}</div>
              <div class="sheet-sub">
                ${M?u`<span class="dot" style="background:${t.get(M.id)}"></span>`:m}${me}
              </div>
            </div>
            <button class="close" aria-label=${o("close")} @click=${W}>✕</button>
          </div>
          <div class="sheet-now ${a.hvac_action==="heating"?"heating":""}">
            <span class="now-value"
              >${this._format(typeof a.current_temperature=="number"?a.current_temperature:void 0,"")}°</span
            >
            <span class="now-label"
              >${a.hvac_action==="heating"?o("heating"):o(h?"mode_off":"idle")}</span
            >
          </div>
          <div class="stepper">
            <button
              aria-label="−"
              ?disabled=${!d||h||y===void 0||y<=f}
              @click=${()=>this._setTarget(r,(y??f)-p,f,_)}
            >
              −
            </button>
            <div class="stepper-value">
              <span>${h?"\u2013":`${this._format(y,"")}\xB0`}</span>
              <small>${o("target")}</small>
            </div>
            <button
              aria-label="+"
              ?disabled=${!d||h||y===void 0||y>=_}
              @click=${()=>this._setTarget(r,(y??f)+p,f,_)}
            >
              +
            </button>
          </div>
          ${T.length?u`<div class="choices">
                ${T.map(k=>u`<button
                      class="choice ${a.preset_mode===k?"on":""}"
                      ?disabled=${!d||h}
                      @click=${()=>this._call("climate","set_preset_mode",{entity_id:r,preset_mode:k})}
                    >
                      ${this._presetLabel(l,k)}
                    </button>`)}
              </div>`:m}
          ${B.includes("off")&&x?u`<button
                class="wide"
                ?disabled=${!d}
                @click=${()=>this._call("climate","set_hvac_mode",{entity_id:r,hvac_mode:h?x:"off"})}
              >
                ${o(h?"room_turn_on":"room_turn_off")}
              </button>`:m}
          <div class="why">
            <div class="why-title">${o("why")}</div>
            ${ae.map(k=>u`<p>${k}</p>`)}
          </div>
          ${this._renderPlan(i)}
          <button
            class="link"
            @click=${()=>{W(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r},bubbles:!0,composed:!0}))}}
          >
            ${o("open_thermostat")}
          </button>
        </div>
      </dialog>
    `}_renderPlan(e){let t=this._control;if(!t)return m;let s=this._t,i=t.rooms[e.id];if(!i&&!t.schedules.length&&!t.rules.length&&!t.stoves?.length)return m;let o=i?Pe(i.action,s,this._hass,e.climate_entity):"";return u`
      <div class="why">
        <div class="why-title">${s("plan")}</div>
        ${i?u`<p>
                ${s(`plan_${i.source}`,{name:i.name,action:o})}
              </p>
              ${t.enabled||i.source==="window"&&i.applied?m:u`<p>${s("plan_would")}</p>`}`:u`<p>${s("plan_none")}</p>`}
      </div>
    `}_navigate(e){history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}_renderSetup(e){let t=this._t,s=[{key:"source",done:e.heat_sources.length>0,optional:!1},{key:"buffer",done:e.buffers.length>0,optional:!0},{key:"pump",done:(e.pump_groups?.length??0)>0,optional:!0},{key:"circuits",done:e.circuits.length>0,optional:!1},{key:"rooms",done:e.rooms.length>0,optional:!1}],i=s.filter(o=>!o.done&&!o.optional).length;return u`
      <section class="set setup">
        <h3>${t("setup_title")}</h3>
        <p class="hint first">${t(i?"setup_intro":"setup_done")}</p>
        <ol class="steps">
          ${s.map((o,r)=>u`
              <li class=${o.done?"done":""}>
                <span class="step-mark">${o.done?"\u2713":r+1}</span>
                <div>
                  <div class="row-name">
                    ${t(`setup_${o.key}`)}
                    ${o.optional&&!o.done?u`<span class="row-detail">${t("setup_optional")}</span>`:m}
                  </div>
                  <div class="row-detail">${t(`setup_${o.key}_hint`)}</div>
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
    `}async _setMode(e,t){await this._call("select","select_option",{entity_id:e.mode_entity,option:t}),window.setTimeout(()=>{this._loadControl()},800)}_renderSettings(e,t){let s=this._t,i=this._state(e.mode_entity),o=Array.isArray(i?.attributes.options)?i.attributes.options:[],r=(d,h,p,f)=>u`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${f?u`<span class="dot" style="background:${f}"></span>`:m}${d}</span
          >
          <span class="row-detail">${h}</span>
        </div>
        ${p.map(_=>u`<div class="row-warn">${_}</div>`)}
      </li>
    `,l=(d,h)=>u`
      <section class="set">
        <h3>${d}</h3>
        ${h.length?u`<ul>${h}</ul>`:u`<p class="hint">${s("none_yet")}</p>`}
      </section>
    `,a=d=>d.filter(Boolean).join(" \xB7 ");return u`
      <div class="settings">
        ${this._renderSetup(e)}
        <section class="set">
          <h3>${s("set_mode")}</h3>
          <div class="choices">
            ${o.map(d=>u`<button
                  class="choice ${i?.state===d?"on":""}"
                  @click=${()=>{if(d==="active"&&i?.state!=="active"){this._confirmActive=!0;return}this._confirmActive=!1,this._setMode(e,d)}}
                >
                  ${s(`mode_${d}`)}
                </button>`)}
          </div>
          ${this._confirmActive?u`<div class="confirm">
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
            ${s(`x_mode_${i?.state==="off"||i?.state==="active"?i.state:"observe"}`)}
          </p>
        </section>
        <section class="set">
          <h3>${s("set_language")}</h3>
          <div class="choices">
            ${["auto","de","en"].map(d=>u`<button
                  class="choice ${(e.language??"auto")===d?"on":""}"
                  @click=${()=>this._setLanguage(e,d)}
                >
                  ${s(`lang_${d}`)}
                </button>`)}
          </div>
          <p class="hint">${s("set_language_hint")}</p>
        </section>
        ${this._control?u`<heizzentrale-control
              .hass=${this._hass}
              .plant=${e}
              .control=${this._control}
              .t=${s}
              @control-changed=${d=>this._control=d.detail}
            ></heizzentrale-control>`:m}
        ${l(s("set_sources"),e.heat_sources.map(d=>r(d.name,s(`kind_${d.kind}`),d.temperature_entity||d.flow_entity?[]:[s("warn_no_sensor")])))}
        ${l(s("set_buffers"),e.buffers.map(d=>r(d.name,a([d.volume?this._format(d.volume,"l",0):"",s("n_sensors",{count:String(d.sensor_entities.length)})]),d.sensor_entities.length?[]:[s("warn_no_sensor")])))}
        ${l(s("set_pumps"),(e.pump_groups??[]).map(d=>r(d.name,a([s("n_circuits",{count:String(e.circuits.filter(h=>h.pump_group===d.id).length)}),d.control_entity?s("pump_switchable"):""]),[...d.flow_entity?[]:[s("warn_no_sensor")],...d.control_entity?[]:[s("warn_no_control")]])))}
        ${l(s("set_circuits"),e.circuits.map(d=>{let h=e.rooms.filter(p=>p.circuit===d.id).length;return r(d.name,a([s(`system_${d.system_type}`),d.valve_entity?s(d.valve_type==="no"?"valve_no":"valve_nc"):s("valve_none"),h===1?s("one_room"):s("n_rooms",{count:String(h)})]),[...d.flow_entity&&d.return_entity?[]:[s("warn_no_pipe_sensors")],...h?[]:[s("warn_no_rooms")]],t.get(d.id))}))}
        ${l(s("set_rooms"),e.rooms.map(d=>{let h=e.circuits.find(f=>f.id===d.circuit),p=e.floors.find(f=>f.id===d.floor);return r(d.name,a([h&&`${s("circuit")} ${h.name}`,p?.name,d.window_entities?.length===1&&s("has_window"),(d.window_entities?.length??0)>1&&s("n_windows",{count:String(d.window_entities.length)})]),[...h||!e.circuits.length?[]:[s("warn_no_circuit")],...p?[]:[s("warn_no_floor")]],h?t.get(h.id):void 0)}))}
      </div>
    `}};ne.properties={_plants:{state:!0},_error:{state:!0},_selection:{state:!0},_config:{state:!0},_pipes:{state:!0},_view:{state:!0},_pendingTarget:{state:!0},_control:{state:!0},_edit:{state:!0},_confirmActive:{state:!0},_drag:{state:!0},_sensorPlace:{state:!0},_sensorFilter:{state:!0}},ne.styles=F`
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
  `;var Re=E`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.5 5-2.5 7C8.4 11 9 12.5 9 12.5S7 12 6.6 9.8C4.9 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"/></svg>`,_t=E`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.1a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.700 1.700 0 0 0 1.800.3h.1a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.1a1.700 1.700 0 0 0-.3 1.800v.1a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/></svg>`,gt=E`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.500 6.500l4 4"/></svg>`,ft=E`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.500"/><path d="M5.500 10v10h13V10"/></svg>`,vt=E`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`,bt=E`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;function wt(c){let n=c?"var(--hz-ok)":"currentColor",e=c?"1":"0.4";return E`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M4 28 H14 M42 28 H52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
    <circle cx="28" cy="28" r="14" fill="none" stroke=${n} stroke-width="2.5" opacity=${e}/>
    <path d="M22 19.500 L38 28 L22 36.500 Z" fill=${c?n:"none"} stroke=${n} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
  </svg>`}function yt(c){return E`<svg viewBox="0 0 44 56" aria-hidden="true">
    <rect x="4" y="3" width="36" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
    <rect x="11" y="9" width="22" height="7" rx="2" fill="currentColor" opacity="0.25"/>
    <path transform="translate(10 22)" d="M12 2c1 3.5-1.500 5-2.500 7C8.400 11 9 12.500 9 12.500S7 12 6.600 9.800C4.900 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"
      fill=${c?"var(--hz-hot)":"currentColor"} opacity=${c?"1":"0.25"}/>
  </svg>`}function $t(c){return c===void 0?"var(--divider-color, #ccc)":`color-mix(in srgb, var(--hz-hot) ${(Math.max(0,Math.min(1,(c-25)/50))*100).toFixed(0)}%, var(--hz-cold))`}function xt(c){let n=c.length?c:[void 0],e=44/n.length;return E`<svg viewBox="0 0 32 56" aria-hidden="true">
    <defs><clipPath id="hz-tank"><rect x="4" y="6" width="24" height="44" rx="9"/></clipPath></defs>
    <g clip-path="url(#hz-tank)">
      ${n.map((t,s)=>E`<rect x="4" y=${6+s*e} width="24" height=${e+.5} fill=${$t(t)}/>`)}
    </g>
    <rect x="4" y="6" width="24" height="44" rx="9" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  </svg>`}function kt(c){let n=c==="open"?"var(--hz-ok)":c==="unknown"?"var(--hz-warn)":"currentColor",e=c==="closed"?"0.35":"1";return E`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M6 22 L28 34 L6 46 Z M50 22 L28 34 L50 46 Z" fill=${c==="open"?n:"none"}
      stroke=${n} stroke-width="2.5" stroke-linejoin="round" opacity=${e}/>
    <path d="M28 34 V16 M19 16 H37" stroke=${n} stroke-width="2.5" stroke-linecap="round" opacity=${e}/>
    ${c==="closed"?E`<path d="M14 48 L42 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`:m}
  </svg>`}var ie=class extends P{constructor(){super(...arguments);this.narrow=!1}set hass(e){this._hass=e;let t=this.renderRoot?.querySelector("heizzentrale-house-card");t&&(t.hass=e);let s=this.renderRoot?.querySelector("ha-menu-button");s&&(s.hass=e)}firstUpdated(){this.renderRoot.querySelector("heizzentrale-house-card").setConfig({}),this._hass&&(this.hass=this._hass)}render(){return u`
      <div class="bar">
        <ha-menu-button .narrow=${this.narrow}></ha-menu-button>
      </div>
      <main><heizzentrale-house-card></heizzentrale-house-card></main>
    `}};ie.properties={narrow:{type:Boolean,reflect:!0}},ie.styles=F`
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
  `;var oe=class extends P{constructor(){super(...arguments);this._config={}}setConfig(e){this._config={...e}}set hass(e){this._hass=e,this._plants||(this._plants=[],e.callWS({type:"heizzentrale/plants"}).then(t=>this._plants=t.plants).catch(()=>{}))}_change(e,t){let s={...this._config};t?s[e]=t:delete s[e],this._config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}render(){let e=Te(this._hass?.locale?.language??this._hass?.language);return u`
      <label>
        ${e("editor_plant")}
        <select
          @change=${t=>this._change("entry_id",t.target.value)}
        >
          <option value="" ?selected=${!this._config.entry_id}>
            ${e("editor_first")}
          </option>
          ${(this._plants??[]).map(t=>u`<option
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
    `}};oe.properties={_config:{state:!0},_plants:{state:!0}},oe.styles=F`
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
  `;customElements.get("heizzentrale-house-card")||(customElements.define("heizzentrale-house-card",ne),customElements.define("heizzentrale-house-card-editor",oe),customElements.define("heizzentrale-panel",ie),(window.customCards??=[]).push({type:"heizzentrale-house-card",name:"Heizzentrale",description:"House view: rooms per floor, heat source, buffer and circuits.",preview:!1}));
