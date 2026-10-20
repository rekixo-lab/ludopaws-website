import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { Script } from "node:vm";
const pages = ["index.html","privacy-policy/index.html","terms-of-service/index.html","pricing.html","account-deletion/index.html","guest-account-data/index.html","legal/index.html"];
for (const page of pages) {
  const html = fs.readFileSync(page,"utf8");
  assert.match(html, /<html\b/i, page);
  for (const script of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) new Script(script[1], {filename:page});
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(?:https?:|mailto:|data:|#)/.test(url)) continue;
    const local = url.startsWith("/") ? url.slice(1) : path.join(path.dirname(page),url);
    const target = (local || ".").replace(/[#?].*$/,"");
    assert.ok(fs.existsSync(target), page+" has a broken local link: "+url);
  }
}
const privacy = fs.readFileSync("privacy-policy/index.html","utf8"), terms=fs.readFileSync("terms-of-service/index.html","utf8"),pricing=fs.readFileSync("pricing.html","utf8"),deletion=fs.readFileSync("account-deletion/index.html","utf8");
assert.match(privacy,/No age entry is required/);
assert.match(privacy,/child-directed/);
for(const html of [privacy,terms,pricing,deletion,fs.readFileSync("guest-account-data/index.html","utf8")])
  assert.doesNotMatch(html,/paws_plus|monthly-auto|Paws Plus|365 days|voice audio is sent|start optional voice chat/i);
for(const token of ['/api/account/google/challenge','/api/account/google/login','/api/account/delete','/api/account/guest/delete','credentials: "omit"','cache: "no-store"']) assert.ok(deletion.includes(token),"Self-service deletion is missing "+token);
assert.doesNotMatch(deletion,/localStorage|sessionStorage|console\.(log|error|info|debug)\(/);
const config=fs.readFileSync("assets/account-config.js","utf8");
assert.match(config, /[0-9]+-[A-Za-z0-9_-]+\.apps\.googleusercontent\.com/);
assert.doesNotMatch(config,/PRIVATE KEY|client_secret|access_token|refresh_token/);
const contract = fs.readFileSync(process.env.LUDOPAWS_PLAY_CONTRACT || "../Ludopaws 2/server/src/google-play-billing.js","utf8");
for(const item of contract.matchAll(/^  ([a-z][a-z0-9_]+): Object\.freeze\(\{\s*gemAmount:\s*([0-9_]+)/gm)) {
  const row=pricing.match(new RegExp("<tr><td><code>"+item[1]+"</code>([\\s\\S]*?)</tr>"))?.[1];
  assert.ok(row,"Missing Play product "+item[1]);
  const amount=Number(item[2].replaceAll("_","")).toLocaleString("en-US")+" Gems";
  assert.ok(row.includes(amount),item[1]+" must disclose "+amount);
}
assert.equal(fs.readFileSync("app-ads.txt","utf8").trim(), "google.com, pub-9987799703505828, DIRECT, f08c47fec0942fa0");
assert.ok(fs.readFileSync(".assetsignore","utf8").includes("!/app-ads.txt"),"AdMob authorization must be included in public assets");
console.log("PASS: public routes, script syntax, family disclosures, exact Play fulfillment and secure self-service deletion");
