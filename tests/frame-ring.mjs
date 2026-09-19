import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync('dist/app.js', 'utf8');
const ringSource = source.slice(source.indexOf('const createBitmapRing ='), source.indexOf('/* Capability tier'));
let requests = [], closed = 0, concurrent = 0, peak = 0;
const scope = vm.createContext({
  Uint8Array, clamp: (v,a,b) => Math.min(b,Math.max(a,v)), HAS_CIB: true,
  fetch: async (url) => { requests.push(Number(url)); peak = Math.max(peak, ++concurrent); return {ok:true, blob:async()=>url}; },
  createImageBitmap: async () => { concurrent--; return {width:100,height:100,close(){closed++;}}; },
});
vm.runInContext(ringSource+';globalThis.makeRing = createBitmapRing;',scope);
const ring = scope.makeRing({count:181,url:String,keyPrefix:'test-',ahead:8,behind:3,limit:2});
const settle = () => new Promise(resolve=>setImmediate(resolve));
ring.start(); await settle();
assert.equal(requests.length,9,'initial streaming must remain bounded');
assert.ok(peak<=2,'decode concurrency exceeds budget');
assert.ok(ring.ready(0));
const version = ring.revision();
ring.setCenter(80); await settle();
assert.ok(ring.ready(80)); assert.ok(closed>0,'old bitmaps must be released');
assert.equal(ring.ready(0),null);
assert.ok(ring.revision()>version,'late frames must invalidate the drawn frame');
requests=[]; ring.setCenter(40); await settle();
assert.deepEqual(requests.slice(0,4),[40,39,38,37],'reverse scrolling must load in reverse order');
ring.setRetained(false); requests=[]; ring.setCenter(120); await settle();
assert.equal(requests.length,0,'offscreen films must stop streaming');
ring.setRetained(true); await settle(); assert.ok(ring.ready(120));
console.log('PASS: bounded loading, concurrency, eviction, reverse priority, redraw invalidation, and offscreen pause/resume');
