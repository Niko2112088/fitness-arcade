const assert=require('node:assert/strict');require('../route.js');const r=globalThis.TempleRoute;
assert.equal(r.beats.length,16);
for(let i=0;i<r.beats.length;i++){const e=r.beats[i];assert.ok(e.cue<=e.at&&e.at<=e.end);if(i)assert.ok(e.cue>r.beats[i-1].end);assert.equal(r.active(e.at),e);}
assert.deepEqual(r.beats.slice(0,4).map(e=>e.visual),['fire-bar','fire-floor','log','spikes']);assert.equal(r.chapter(13.1).palette,'crystal');assert.equal(r.chapter(15).palette,'ember');assert.equal(r.actionPulse(1.55).type,'DUCK');assert.equal(r.actionPulse(4.8).type,'');
console.log('PASS: 16 ordered route beats, disjoint windows, source sequence, chapter palette and action envelope.');
