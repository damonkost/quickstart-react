(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5492:function(e,t){"use strict";var r,n;Object.defineProperty(t,"__esModule",{value:!0}),t.Api=t.HttpClient=t.ContentType=void 0,(n=r||(t.ContentType=r={})).Json="application/json",n.FormData="multipart/form-data",n.UrlEncoded="application/x-www-form-urlencoded",n.Text="text/plain";class i{baseUrl="https://west-api.vapi.ai";securityData=null;securityWorker;abortControllers=new Map;customFetch=(...e)=>fetch(...e);baseApiParams={credentials:"same-origin",headers:{},redirect:"follow",referrerPolicy:"no-referrer"};constructor(e={}){Object.assign(this,e)}setSecurityData=e=>{this.securityData=e};encodeQueryParam(e,t){let r=encodeURIComponent(e);return`${r}=${encodeURIComponent("number"==typeof t?t:`${t}`)}`}addQueryParam(e,t){return this.encodeQueryParam(t,e[t])}addArrayQueryParam(e,t){return e[t].map(e=>this.encodeQueryParam(t,e)).join("&")}toQueryString(e){let t=e||{};return Object.keys(t).filter(e=>void 0!==t[e]).map(e=>Array.isArray(t[e])?this.addArrayQueryParam(t,e):this.addQueryParam(t,e)).join("&")}addQueryParams(e){let t=this.toQueryString(e);return t?`?${t}`:""}contentFormatters={[r.Json]:e=>null!==e&&("object"==typeof e||"string"==typeof e)?JSON.stringify(e):e,[r.Text]:e=>null!==e&&"string"!=typeof e?JSON.stringify(e):e,[r.FormData]:e=>Object.keys(e||{}).reduce((t,r)=>{let n=e[r];return t.append(r,n instanceof Blob?n:"object"==typeof n&&null!==n?JSON.stringify(n):`${n}`),t},new FormData),[r.UrlEncoded]:e=>this.toQueryString(e)};mergeRequestParams(e,t){return{...this.baseApiParams,...e,...t||{},headers:{...this.baseApiParams.headers||{},...e.headers||{},...t&&t.headers||{}}}}createAbortSignal=e=>{if(this.abortControllers.has(e)){let t=this.abortControllers.get(e);return t?t.signal:void 0}let t=new AbortController;return this.abortControllers.set(e,t),t.signal};abortRequest=e=>{let t=this.abortControllers.get(e);t&&(t.abort(),this.abortControllers.delete(e))};request=async({body:e,secure:t,path:n,type:i,query:o,format:s,baseUrl:a,cancelToken:l,...c})=>{let u=("boolean"==typeof t?t:this.baseApiParams.secure)&&this.securityWorker&&await this.securityWorker(this.securityData)||{},d=this.mergeRequestParams(c,u),h=o&&this.toQueryString(o),p=this.contentFormatters[i||r.Json],f=s||d.format;return this.customFetch(`${a||this.baseUrl||""}${n}${h?`?${h}`:""}`,{...d,headers:{...d.headers||{},...i&&i!==r.FormData?{"Content-Type":i}:{}},signal:(l?this.createAbortSignal(l):d.signal)||null,body:null==e?null:p(e)}).then(async e=>{e.data=null,e.error=null;let t=f?await e[f]().then(t=>(e.ok?e.data=t:e.error=t,e)).catch(t=>(e.error=t,e)):e;if(l&&this.abortControllers.delete(l),!e.ok)throw t;return t})}}t.HttpClient=i;class o extends i{assistant={assistantControllerCreate:(e,t={})=>this.request({path:"/assistant",method:"POST",body:e,secure:!0,type:r.Json,format:"json",...t}),assistantControllerFindAll:(e,t={})=>this.request({path:"/assistant",method:"GET",query:e,secure:!0,format:"json",...t}),assistantControllerFindOne:(e,t={})=>this.request({path:`/assistant/${e}`,method:"GET",secure:!0,format:"json",...t}),assistantControllerUpdate:(e,t,n={})=>this.request({path:`/assistant/${e}`,method:"PATCH",body:t,secure:!0,type:r.Json,format:"json",...n}),assistantControllerReplace:(e,t,n={})=>this.request({path:`/assistant/${e}`,method:"PUT",body:t,secure:!0,type:r.Json,format:"json",...n}),assistantControllerRemove:(e,t={})=>this.request({path:`/assistant/${e}`,method:"DELETE",secure:!0,format:"json",...t})};call={callControllerFindAll:(e,t={})=>this.request({path:"/call",method:"GET",query:e,secure:!0,format:"json",...t}),callControllerFindOne:(e,t={})=>this.request({path:`/call/${e}`,method:"GET",secure:!0,format:"json",...t}),callControllerCreatePhoneCall:(e,t={})=>this.request({path:"/call/phone",method:"POST",body:e,secure:!0,type:r.Json,format:"json",...t}),callControllerCreateWebCall:(e,t={})=>this.request({path:"/call/web",method:"POST",body:e,secure:!0,type:r.Json,format:"json",...t})};credential={credentialControllerCreate:(e,t={})=>this.request({path:"/credential",method:"POST",body:e,secure:!0,type:r.Json,format:"json",...t}),credentialControllerFindAll:(e,t={})=>this.request({path:"/credential",method:"GET",query:e,secure:!0,format:"json",...t}),credentialControllerFindOne:(e,t={})=>this.request({path:`/credential/${e}`,method:"GET",secure:!0,format:"json",...t}),credentialControllerUpdate:(e,t,n={})=>this.request({path:`/credential/${e}`,method:"PUT",body:t,secure:!0,type:r.Json,format:"json",...n}),credentialControllerRemove:(e,t={})=>this.request({path:`/credential/${e}`,method:"DELETE",secure:!0,format:"json",...t})};phoneNumber={phoneNumberControllerBuy:(e,t={})=>this.request({path:"/phone-number/buy",method:"POST",body:e,secure:!0,type:r.Json,format:"json",...t}),phoneNumberControllerImportTwilio:(e,t={})=>this.request({path:"/phone-number/import/twilio",method:"POST",body:e,secure:!0,type:r.Json,format:"json",...t}),phoneNumberControllerImportVonage:(e,t={})=>this.request({path:"/phone-number/import/vonage",method:"POST",body:e,secure:!0,type:r.Json,format:"json",...t}),phoneNumberControllerFindAll:(e,t={})=>this.request({path:"/phone-number",method:"GET",query:e,secure:!0,format:"json",...t}),phoneNumberControllerFindOne:(e,t={})=>this.request({path:`/phone-number/${e}`,method:"GET",secure:!0,format:"json",...t}),phoneNumberControllerUpdate:(e,t,n={})=>this.request({path:`/phone-number/${e}`,method:"PATCH",body:t,secure:!0,type:r.Json,format:"json",...n}),phoneNumberControllerRemove:(e,t={})=>this.request({path:`/phone-number/${e}`,method:"DELETE",secure:!0,format:"json",...t})};metrics={metricsControllerFindAll:(e,t={})=>this.request({path:"/metrics",method:"GET",query:e,secure:!0,format:"json",...t})}}t.Api=o},3851:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.client=void 0;let n=new(r(5492)).Api({baseUrl:"https://api.vapi.ai",baseApiParams:{secure:!0},securityWorker:async e=>{if(e)return{headers:{Authorization:`Bearer ${e}`}}}});t.client=n},5349:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});let i=n(r(4190)),o=n(r(7187)),s=r(3851);async function a(e,t){e.muted=!1,e.autoplay=!0,null!=t&&(e.srcObject=new MediaStream([t]),await e.play())}async function l(e,t){let r=document.createElement("audio");return r.dataset.participantId=t,document.body.appendChild(r),await a(r,e),r}class c extends o.default{on(e,t){return super.on(e,t),this}once(e,t){return super.once(e,t),this}emit(e,...t){return super.emit(e,...t)}removeListener(e,t){return super.removeListener(e,t),this}removeAllListeners(e){return super.removeAllListeners(e),this}}class u extends c{started=!1;call=null;speakingTimeout=null;averageSpeechLevel=0;constructor(e,t){super(),s.client.baseUrl=t??"https://api.vapi.ai",s.client.setSecurityData(e)}cleanup(){this.started=!1,this.call?.destroy(),this.call=null,this.speakingTimeout=null}async start(e){if(this.started)return null;this.started=!0;try{let t=(await s.client.call.callControllerCreateWebCall({assistant:"string"==typeof e?void 0:e,assistantId:"string"==typeof e?e:void 0})).data;return this.call&&this.cleanup(),this.call=i.default.createCallObject({audioSource:!0,videoSource:!1}),this.call.iframe()?.style.setProperty("display","none"),this.call.on("left-meeting",()=>{this.emit("call-end"),this.cleanup()}),this.call.on("participant-left",e=>{e&&function(e){let t=document.querySelector(`audio[data-participant-id="${e}"]`);t?.remove()}(e.participant.session_id)}),this.call.on("error",()=>{}),this.call.on("track-started",async e=>{!e||!e.participant||e.participant?.local||"audio"!==e.track.kind||(await l(e.track,e.participant.session_id),e?.participant?.user_name==="Vapi Speaker"&&this.call?.sendAppMessage("playable"))}),this.call.on("participant-joined",e=>{if(e&&this.call){var t;t=this.call,e.participant.local||t.updateParticipant(e.participant.session_id,{setSubscribedTracks:{audio:!0,video:!1}})}}),await this.call.join({url:t.webCallUrl,subscribeToTracksAutomatically:!1}),this.call.startRemoteParticipantsAudioLevelObserver(100),this.call.on("remote-participants-audio-level",e=>{e&&this.handleRemoteParticipantsAudioLevel(e)}),this.call.on("app-message",e=>this.onAppMessage(e)),this.call.updateInputSettings({audio:{processor:{type:"noise-cancellation"}}}),t}catch(e){return console.error(e),this.emit("error",e),this.cleanup(),null}}onAppMessage(e){if(e)try{if("listening"===e.data)return this.emit("call-start");try{let t=JSON.parse(e.data);this.emit("message",t)}catch(e){console.log("Error parsing message data: ",e)}}catch(e){console.error(e)}}handleRemoteParticipantsAudioLevel(e){let t=Object.values(e.participantsAudioLevel).reduce((e,t)=>e+t,0);this.emit("volume-level",Math.min(1,t/.15)),t>.01&&(this.speakingTimeout?(clearTimeout(this.speakingTimeout),this.speakingTimeout=null):this.emit("speech-start"),this.speakingTimeout=setTimeout(()=>{this.emit("speech-end"),this.speakingTimeout=null},1e3))}stop(){this.started=!1,this.call?.destroy(),this.call=null}send(e){this.call?.sendAppMessage(JSON.stringify(e))}setMuted(e){try{if(!this.call)throw Error("Call object is not available.");this.call.setLocalAudio(!e)}catch(e){throw e}}isMuted(){try{if(!this.call)return!1;return!1===this.call.localAudio()}catch(e){throw e}}}t.default=u},7187:function(e){"use strict";var t,r="object"==typeof Reflect?Reflect:null,n=r&&"function"==typeof r.apply?r.apply:function(e,t,r){return Function.prototype.apply.call(e,t,r)};t=r&&"function"==typeof r.ownKeys?r.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var i=Number.isNaN||function(e){return e!=e};function o(){o.init.call(this)}e.exports=o,e.exports.once=function(e,t){return new Promise(function(r,n){var i;function o(r){e.removeListener(t,s),n(r)}function s(){"function"==typeof e.removeListener&&e.removeListener("error",o),r([].slice.call(arguments))}m(e,t,s,{once:!0}),"error"!==t&&(i={once:!0},"function"==typeof e.on&&m(e,"error",o,i))})},o.EventEmitter=o,o.prototype._events=void 0,o.prototype._eventsCount=0,o.prototype._maxListeners=void 0;var s=10;function a(e){if("function"!=typeof e)throw TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function l(e){return void 0===e._maxListeners?o.defaultMaxListeners:e._maxListeners}function c(e,t,r,n){if(a(r),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,r.listener?r.listener:r),o=e._events),s=o[t]),void 0===s)s=o[t]=r,++e._eventsCount;else if("function"==typeof s?s=o[t]=n?[r,s]:[s,r]:n?s.unshift(r):s.push(r),(i=l(e))>0&&s.length>i&&!s.warned){s.warned=!0;var i,o,s,c=Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=s.length,console&&console.warn&&console.warn(c)}return e}function u(){if(!this.fired)return(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0==arguments.length)?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(e,t,r){var n={fired:!1,wrapFn:void 0,target:e,type:t,listener:r},i=u.bind(n);return i.listener=r,n.wrapFn=i,i}function h(e,t,r){var n=e._events;if(void 0===n)return[];var i=n[t];return void 0===i?[]:"function"==typeof i?r?[i.listener||i]:[i]:r?function(e){for(var t=Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}(i):f(i,i.length)}function p(e){var t=this._events;if(void 0!==t){var r=t[e];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function f(e,t){for(var r=Array(t),n=0;n<t;++n)r[n]=e[n];return r}function m(e,t,r,n){if("function"==typeof e.on)n.once?e.once(t,r):e.on(t,r);else if("function"==typeof e.addEventListener)e.addEventListener(t,function i(o){n.once&&e.removeEventListener(t,i),r(o)});else throw TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e)}Object.defineProperty(o,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||i(e))throw RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),o.init=function(){(void 0===this._events||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},o.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||i(e))throw RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},o.prototype.getMaxListeners=function(){return l(this)},o.prototype.emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t.push(arguments[r]);var i="error"===e,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var s,a=Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var l=o[e];if(void 0===l)return!1;if("function"==typeof l)n(l,this,t);else for(var c=l.length,u=f(l,c),r=0;r<c;++r)n(u[r],this,t);return!0},o.prototype.addListener=function(e,t){return c(this,e,t,!1)},o.prototype.on=o.prototype.addListener,o.prototype.prependListener=function(e,t){return c(this,e,t,!0)},o.prototype.once=function(e,t){return a(t),this.on(e,d(this,e,t)),this},o.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,d(this,e,t)),this},o.prototype.removeListener=function(e,t){var r,n,i,o,s;if(a(t),void 0===(n=this._events)||void 0===(r=n[e]))return this;if(r===t||r.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete n[e],n.removeListener&&this.emit("removeListener",e,r.listener||t));else if("function"!=typeof r){for(i=-1,o=r.length-1;o>=0;o--)if(r[o]===t||r[o].listener===t){s=r[o].listener,i=o;break}if(i<0)return this;0===i?r.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(r,i),1===r.length&&(n[e]=r[0]),void 0!==n.removeListener&&this.emit("removeListener",e,s||t)}return this},o.prototype.off=o.prototype.removeListener,o.prototype.removeAllListeners=function(e){var t,r,n;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0==arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[e]),this;if(0==arguments.length){var i,o=Object.keys(r);for(n=0;n<o.length;++n)"removeListener"!==(i=o[n])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=r[e]))this.removeListener(e,t);else if(void 0!==t)for(n=t.length-1;n>=0;n--)this.removeListener(e,t[n]);return this},o.prototype.listeners=function(e){return h(this,e,!0)},o.prototype.rawListeners=function(e){return h(this,e,!1)},o.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):p.call(e,t)},o.prototype.listenerCount=p,o.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}},3454:function(e,t,r){"use strict";var n,i;e.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(i=r.g.process)?void 0:i.env)?r.g.process:r(7663)},5557:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(2014)}])},2014:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return b}});var n=r(5893),i=r(7294),o=r(9008),s=r.n(o),a=e=>{let{attorneyProfile:t}=e,r=t.firmName||"LegalScout",i=t.logo||"/images/default-logo.png";return console.log("Received Attorney Profile:",t),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s(),{children:(0,n.jsx)("title",{children:r})}),(0,n.jsx)("header",{children:(0,n.jsxs)("nav",{children:[(0,n.jsx)("div",{className:"logo-container",children:(0,n.jsx)("img",{className:"logo",src:i,alt:"".concat(r," Logo"),style:{maxWidth:"150px",height:"auto"},onError:e=>{console.log("Logo failed to load:",e),e.target.style.display="none"}})}),(0,n.jsxs)("div",{className:"nav-links",children:[(0,n.jsx)("a",{href:"https://legalscout.ai/dl/Home",children:"Home"}),(0,n.jsx)("a",{href:"https://legalscout.ai/dl/Cases",children:"My Cases"}),(0,n.jsx)("a",{href:"https://legalscout.ai/dl/About",children:"About"})]})]})}),(0,n.jsx)("main",{className:"hero",children:(0,n.jsxs)("div",{className:"statement",children:[(0,n.jsxs)("p",{children:[(0,n.jsx)("span",{children:"Use our free AI to be matched"}),(0,n.jsx)("span",{children:"with an ideal human lawyer,"}),(0,n.jsx)("span",{children:"knowledgeable about your case and eager to help."})]}),(0,n.jsxs)("button",{children:[(0,n.jsx)("img",{src:i,alt:"".concat(r," Logo"),style:{maxWidth:"30px",marginRight:"10px"}}),"Talk to ",r]})]})})]})},l=e=>{let{isSpeaking:t}=e;return(0,n.jsx)("div",{style:{display:"flex",alignItems:"center",marginBottom:"10px",visibility:t?"visible":"hidden"},children:(0,n.jsx)("p",{style:{color:"white",margin:0},children:t?"Barking":"Listening"})})},c=r(5779),u=r.n(c);let d=()=>{let e=window.location.hostname.split(".");return e.length>2?e[0]:null};var h=e=>{let{label:t,onClick:r,isLoading:o,disabled:s=!1}=e,[a,l]=(0,i.useState)(null);(0,i.useEffect)(()=>{let e=d();e&&"scout"!==e&&fetch("/subdomain_config.json").then(e=>e.json()).then(t=>{t[e]&&l(t[e].logo)}).catch(e=>console.error("Error fetching subdomain config:",e))},[]);let c=o?(0,n.jsx)(u(),{color:"#000",height:10,width:2.5,margin:.5,loading:!0,size:50,css:{display:"block",margin:"auto"}}):(0,n.jsx)("p",{style:{margin:0,padding:"0 10px",fontFamily:"Courier, monospace",fontWeight:"bold",fontSize:"24px",background:"linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #ff7f00, #0000ff, #ff7f00, #ff7f00)",backgroundSize:"200% 200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 2s linear infinite"},children:t});return(0,n.jsx)("div",{className:"button-container",children:(0,n.jsx)("button",{onClick:r,style:{backgroundColor:"transparent",border:"none",padding:"0px",display:"block",margin:"0 auto",cursor:s?"not-allowed":"pointer",opacity:s?.75:1,transition:"all 0.3s ease"},children:(0,n.jsxs)("div",{style:{width:"300px",height:"300px",borderRadius:"50%",background:"url(".concat(a||"https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FZf7Uh2x67Yz3nEftEH2i%2Fpub%2FipEv2VSSLIL0o0e2ostK.png",")"),backgroundSize:"cover",backgroundPosition:"center",boxShadow:"0 0 40px 10px rgba(0, 0, 100, 0.7)",display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",animation:"pulse 1.1s infinite, morph 3s ease-in-out infinite alternate",position:"relative"},children:[(0,n.jsx)("span",{style:{content:"''",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"100%",height:"100%",borderRadius:"50%",background:"radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",animation:"emanate 2s infinite alternate"}}),c]})})})},p=e=>{let{volume:t}=e;return(0,n.jsxs)("div",{style:{padding:"20px"},children:[(0,n.jsx)("div",{style:{color:"white",marginBottom:"8px"},children:(0,n.jsx)("p",{children:"Volume Level:"})}),(0,n.jsx)("div",{style:{display:"flex",marginBottom:"10px"},children:Array.from({length:10},(e,r)=>(0,n.jsx)("div",{style:{width:"20px",height:"20px",margin:"2px",backgroundColor:r/10<t?"#3ef07c":"white",borderRadius:"2px"}},r))}),(0,n.jsx)("div",{style:{color:"white"},children:t})]})},f=e=>{let{assistantIsSpeaking:t,volumeLevel:r,onEndCallClick:i}=e;return(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{style:{marginTop:"20px",textAlign:"center"},children:(0,n.jsx)(h,{label:"End Call",onClick:i})}),(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"15px",border:"1px solid #ddd",borderRadius:"8px",boxShadow:"0px 4px 8px rgba(0,0,0,0.1)",width:"400px",height:"200px"},children:[(0,n.jsx)(l,{isSpeaking:t}),(0,n.jsx)(p,{volume:r})]})]})},m=r(5349),y=r.n(m);let v=e=>{let{vapiError:t}=e;return!!t&&403===t.error.statusCode&&"Forbidden"===t.error.error},g=new(y())("310f0d43-27c2-47a5-a76d-e55171d024f7");var b=()=>{let[e,t]=(0,i.useState)(!1),[r,o]=(0,i.useState)(!1),[s,l]=(0,i.useState)(null),[c,u]=(0,i.useState)(null),[d,p]=(0,i.useState)(!0),[m,y]=(0,i.useState)(!1),[b,x]=(0,i.useState)(0),[j,w]=(0,i.useState)(!1),[C,_]=(0,i.useState)(!1);(0,i.useEffect)(()=>{(async()=>{try{var e;p(!0);let t=(e=window.location.hostname,"localhost"===e||"127.0.0.1"===e?"localhost":e.split(".")[0]),r=await fetch("/api/v1/attorneys?subdomain=".concat(t));if(!r.ok)throw Error("Failed to fetch attorney profile");let n=await r.json();if("success"===n.status)l(n.data),document.title=n.data.firmName;else throw Error(n.message)}catch(e){u(e.message),console.error("Error fetching attorney profile:",e)}finally{p(!1)}})()},[]),(0,i.useEffect)(()=>{let e=()=>{t(!1),o(!0),_(!1)},r=()=>{t(!1),o(!1),_(!1)},n=()=>{y(!0)},i=()=>{y(!1)},s=e=>{console.error(e),t(!1),v({vapiError:e})&&_(!0)};return g.on("call.start",e),g.on("call.end",r),g.on("speech.start",n),g.on("speech.end",i),g.on("error",s),()=>{g.off("call.start",e),g.off("call.end",r),g.off("speech.start",n),g.off("speech.end",i),g.off("error",s)}},[]);let E=async()=>{try{t(!0),await navigator.mediaDevices.getUserMedia({audio:!0}),w(!0);let e={transcriber:{provider:"deepgram",model:"nova-2",language:"en-US"},recordingEnabled:!0,instructions:(null==s?void 0:s.vapiInstructions)||"I am a legal assistant"};await g.start((null==s?void 0:s.vapiContext)||"e3fff1dd-2e82-4cce-ac6c-8c3271eb0865",e)}catch(e){t(!1),console.error("Error starting call:",e),v(e)&&_(!0)}};return d?(0,n.jsx)("div",{children:"Loading..."}):c?(0,n.jsxs)("div",{children:["Error: ",c]}):(0,n.jsx)(a,{attorneyProfile:s,children:(0,n.jsxs)("div",{children:[(0,n.jsx)(h,{label:r?"End Call":e?"Connecting...":"Start Call",onClick:r?()=>{g.stop()}:E,isLoading:e,disabled:e}),r&&(0,n.jsx)(f,{assistantIsSpeaking:m,volumeLevel:b}),C&&(0,n.jsx)("div",{style:{position:"fixed",bottom:"25px",left:"25px",padding:"10px",color:"#fff",backgroundColor:"#f03e3e",borderRadius:"5px",boxShadow:"0 2px 5px rgba(0,0,0,0.2)"},children:"Is your Vapi Public Key missing? (recheck your code)"})]})})}},7663:function(e){!function(){var t={229:function(e){var t,r,n,i=e.exports={};function o(){throw Error("setTimeout has not been defined")}function s(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:o}catch(e){t=o}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var l=[],c=!1,u=-1;function d(){c&&n&&(c=!1,n.length?l=n.concat(l):u=-1,l.length&&h())}function h(){if(!c){var e=a(d);c=!0;for(var t=l.length;t;){for(n=l,l=[];++u<t;)n&&n[u].run();u=-1,t=l.length}n=null,c=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function f(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new p(e,t)),1!==l.length||c||a(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=f,i.addListener=f,i.once=f,i.off=f,i.removeListener=f,i.removeAllListeners=f,i.emit=f,i.prependListener=f,i.prependOnceListener=f,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var o=r[e]={exports:{}},s=!0;try{t[e](o,o.exports,n),s=!1}finally{s&&delete r[e]}return o.exports}n.ab="//";var i=n(229);e.exports=i}()},9008:function(e,t,r){e.exports=r(3867)},5779:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&i(t,e,r);return o(t,e),t},a=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)0>t.indexOf(n[i])&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]]);return r};Object.defineProperty(t,"__esModule",{value:!0});var l=s(r(7294)),c=r(6657),u=(0,r(10).createAnimation)("ScaleLoader","0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}","scale");t.default=function(e){var t=e.loading,r=e.color,i=void 0===r?"#000000":r,o=e.speedMultiplier,s=void 0===o?1:o,d=e.cssOverride,h=e.height,p=void 0===h?35:h,f=e.width,m=void 0===f?4:f,y=e.radius,v=void 0===y?2:y,g=e.margin,b=void 0===g?2:g,x=a(e,["loading","color","speedMultiplier","cssOverride","height","width","radius","margin"]),j=n({display:"inherit"},void 0===d?{}:d),w=function(e){return{backgroundColor:i,width:(0,c.cssValue)(m),height:(0,c.cssValue)(p),margin:(0,c.cssValue)(b),borderRadius:(0,c.cssValue)(v),display:"inline-block",animation:"".concat(u," ").concat(1/s,"s ").concat(.1*e,"s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"),animationFillMode:"both"}};return void 0===t||t?l.createElement("span",n({style:j},x),l.createElement("span",{style:w(1)}),l.createElement("span",{style:w(2)}),l.createElement("span",{style:w(3)}),l.createElement("span",{style:w(4)}),l.createElement("span",{style:w(5)})):null}},10:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createAnimation=void 0,t.createAnimation=function(e,t,r){var n="react-spinners-".concat(e,"-").concat(r);if("undefined"==typeof window||!window.document)return n;var i=document.createElement("style");document.head.appendChild(i);var o=i.sheet,s="\n    @keyframes ".concat(n," {\n      ").concat(t,"\n    }\n  ");return o&&o.insertRule(s,0),n}},6657:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.cssValue=t.parseLengthAndUnit=void 0;var r={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function n(e){if("number"==typeof e)return{value:e,unit:"px"};var t,n=(e.match(/^[0-9.]*/)||"").toString();t=n.includes(".")?parseFloat(n):parseInt(n,10);var i=(e.match(/[^0-9]*$/)||"").toString();return r[i]?{value:t,unit:i}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(t,"px.")),{value:t,unit:"px"})}t.parseLengthAndUnit=n,t.cssValue=function(e){var t=n(e);return"".concat(t.value).concat(t.unit)}}},function(e){e.O(0,[789,888,774,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);