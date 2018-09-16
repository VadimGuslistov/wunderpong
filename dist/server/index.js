parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"PTgE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getMatches=exports.postMatch=void 0;var e=require("pg"),t=require("pg-format"),r=c(t),a=require("dotenv"),s=c(a),n=require("camelcase-keys"),o=c(n);function c(e){return e&&e.__esModule?e:{default:e}}"production"!==process.env.NODE_ENV&&s.default.load();const i=new e.Pool({connectionString:process.env.DATABASE_URL,ssl:!0}),u=exports.postMatch=(async(e,t)=>{const r=await i.connect(),a={name:"add-match",text:'\n      INSERT INTO "public"."matches"("winner", "loser")\n      VALUES($1, $2)\n      RETURNING "id", "created_at", "winner", "loser";\n    ',values:[e,t]},s=await r.query(a);return await r.release(),s&&s.rows&&s.rows[0]&&(0,o.default)(s.rows[0])}),l=exports.getMatches=(async()=>{const e=await i.connect(),t=await e.query("\n    SELECT *\n    FROM matches\n  ");return await e.release(),t.rows});
},{}],"VO5s":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./postgres");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}})});
},{"./postgres":"PTgE"}],"jWsf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=exports.resolveLadderFromMatches=(e=>{let s=[];return e.forEach(e=>{if(s.includes(e.loser)){const r=s.indexOf(e.loser);let n=s.indexOf(e.winner);-1===n&&(n=1/0),n>r&&s.splice(r,0,e.winner);const i=[];s=s.filter(e=>!i.includes(e)&&(i.push(e),!0))}else s.includes(e.winner)||s.push(e.winner),s.push(e.loser)}),s});
},{}],"lY9v":[function(require,module,exports) {
"use strict";var e=require("express"),t=u(e),s=require("cors"),a=u(s),r=require("body-parser"),o=u(r),n=require("http"),c=require("./api"),i=require("./utils");function u(e){return e&&e.__esModule?e:{default:e}}const l=process.env.PORT||3e3,d=(0,t.default)(),p=(0,n.Server)(d);d.use((0,a.default)()),d.use(o.default.json()),d.use(o.default.urlencoded({extended:!0})),d.use(t.default.static("dist/client")),d.post("/api/match",async(e,t)=>{console.info("POST /api/match");const{text:s}=e.body;if(!s)return t.sendStatus(400);const a=s.split(" ").filter(e=>Boolean(e.trim())).map(e=>e.toLowerCase().trim().replace(/[^a-z]/gi,""));if(2!==a.length)return t.sendStatus(400);const r=a[0],o=a[1];try{await(0,c.postMatch)(r,o),t.status(200).json({text:`Got it, ${r} won ${o} 🏆 \n _ps. notify luffis if you made a mistake_`})}catch(e){console.error("[ERROR]",e),t.sendStatus(500)}}),d.get("/api/matches",async(e,t)=>{console.info("GET /api/matches");try{const e=await(0,c.getMatches)();t.status(200).json(e)}catch(e){console.error("[ERROR]",e),t.sendStatus(500)}}),d.post("/api/ladder",async(e,t)=>{let s;console.info("POST /api/ladder");try{s=await(0,c.getMatches)()}catch(e){return console.error("[ERROR]",e),t.sendStatus(500)}const a=(0,i.resolveLadderFromMatches)(s);t.status(200).json({text:">>> \n"+a.map((e,t)=>`${t+1}. ${e}${0===t?" 👑":""}`).join("\n")})}),d.get("/api/ladder",async(e,t)=>{let s;console.info("GET /api/ladder");try{s=await(0,c.getMatches)()}catch(e){return console.error("[ERROR]",e),t.sendStatus(500)}const a=(0,i.resolveLadderFromMatches)(s);t.status(200).json(a)}),p.listen(l,()=>{console.log(`Server listening port -> ${l}`)});
},{"./api":"VO5s","./utils":"jWsf"}],"Focm":[function(require,module,exports) {
require("babel-register")({}),require("./App");
},{"./App":"lY9v"}]},{},["Focm"], null)