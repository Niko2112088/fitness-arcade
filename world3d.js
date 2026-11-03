/* Original procedural art. Three.js r160.1 is vendored; no remote art assets. */
window.createTempleWorld=function(canvas){
 const T=window.THREE;if(!T)return null;
 let renderer;try{renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});}catch(e){return null;}
 renderer.setSize(1280,720,false);renderer.setPixelRatio(1);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 const scene=new T.Scene();scene.background=new T.Color('#729993');scene.fog=new T.FogExp2('#729993',.018);
 const camera=new T.PerspectiveCamera(74,16/9,.12,160);camera.rotation.order='YXZ';
 scene.add(new T.HemisphereLight(0xcde9dc,0x40513c,3.2));const sun=new T.DirectionalLight(0xffe6b9,4.2);sun.position.set(-18,32,8);scene.add(sun);
 const box=new T.BoxGeometry(1,1,1),leafGeo=new T.SphereGeometry(1,6,4),trunkGeo=new T.CylinderGeometry(.18,.4,1,6);
 let seed=48;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
 function stoneTexture(){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.fillStyle='#686d54';x.fillRect(0,0,256,256);for(let i=0;i<3500;i++){let v=50+rnd()*100;x.fillStyle=`rgba(${v},${v+8},${v-9},.18)`;x.fillRect(rnd()*256,rnd()*256,1+rnd()*5,1+rnd()*3)}for(let row=0;row<4;row++)for(let col=0;col<3;col++){let a=col*110+(row%2)*50;x.strokeStyle='#313e32';x.lineWidth=3;x.strokeRect(a,row*64,108,62);x.strokeStyle='#9b9970';x.lineWidth=1;x.strokeRect(a+3,row*64+3,103,57)}const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;return tx;}
 const texture=stoneTexture();const stone=new T.MeshStandardMaterial({color:0xc4c6a2,map:texture,roughness:1});const dark=new T.MeshStandardMaterial({color:0x384e3e,map:texture,roughness:1});const gold=new T.MeshStandardMaterial({color:0xc99948,metalness:.45,roughness:.5});const bark=new T.MeshStandardMaterial({color:0x574936,roughness:1});const leaves=[0x315c38,0x467441,0x233f30,0x73904a].map(color=>new T.MeshStandardMaterial({color,roughness:1}));const glow=new T.MeshBasicMaterial({color:0xffb342});
 function mesh(geo,mat,x,y,z,sx=1,sy=1,sz=1,parent=scene){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);parent.add(m);return m;}
 function cube(mat,x,y,z,w,h,d,parent=scene){return mesh(box,mat,x,y,z,w,h,d,parent);}
 // The path bends through the temple. Geometry and camera share the same centreline.
 function path(s){return s<90?0:s<130?12*(1-Math.cos((s-90)/40*Math.PI))/2:12;}
 function yaw(s){return -Math.atan2(path(s+.3)-path(s-.3),.6);}
 function at(s){const g=new T.Group();g.position.set(path(s),0,-s);g.rotation.y=yaw(s);scene.add(g);return g;}
 const ground=new T.MeshStandardMaterial({color:0x263e2c,roughness:1});cube(ground,6,-.7,-74,220,1,148);cube(ground,6,-.7,-555,220,1,690);cube(new T.MeshStandardMaterial({color:0x0b2931,roughness:.4}),6,-24,-182,220,1,75);
 // Dense paving in one instanced draw call: no per-frame geometry allocations.
 const paving=new T.InstancedMesh(box,stone,1500),dummy=new T.Object3D();let tile=0;
 for(let row=0;row<300;row++){const s=row*3;for(let col=-2;col<=2;col++){dummy.position.set(path(s)+col*1.45,-.12-rnd()*.035,-s);dummy.rotation.set(0,yaw(s),0);dummy.scale.set(s>=150&&s<=210?(col===0?1.4:0):1.4,.25,2.88);dummy.updateMatrix();paving.setMatrixAt(tile++,dummy.matrix)}}scene.add(paving);
 for(let s=2;s<900;s+=6){const g=at(s),inside=s>78;if(s>=150&&s<=210){cube(bark,0,-.25,0,2.1,.3,5.9,g);for(const side of [-1,1]){cube(bark,side*1.05,.65,0,.12,1.8,.12,g);cube(gold,side*1.05,1.1,0,.06,.06,6,g);}continue;}
  for(const side of [-1,1]){
   cube(dark,side*4,-.03,0,.55,.65,5.8,g);
   if(inside){cube(stone,side*5.3,2.7,0,1.8,5.8,5.8,g);cube(dark,side*4.18,2.8,0,.6,5.7,.75,g);cube(gold,side*3.85,3.9,0,.12,.28,.9,g);if(s%12===2){cube(bark,side*3.8,2.1,0,.14,.8,.14,g);mesh(new T.ConeGeometry(.19,.65,5),glow,side*3.8,2.7,0,1,1,1,g);}}
   else{cube(stone,side*4.7,.7,0,1.8,1.4,2.3,g);cube(dark,side*4.7,1.5,0,2,.2,2.5,g);}
  }
  if(inside&&s%18===2){cube(dark,0,5.5,0,10,1,.9,g);cube(gold,0,4.95,0,8,.15,.95,g);}
 }
 // Gate silhouette: stepped lintels, carved face, projecting teeth and gold inlay.
 for(const s of [65,80,145,230]){const g=at(s);for(const side of [-1,1]){cube(stone,side*4.8,4,0,2.2,8,3,g);cube(dark,side*4.8,1.1,0,2.7,.5,3.5,g);cube(gold,side*4.8,5.3,1.55,1.5,.24,.12,g);}cube(stone,0,7,0,11.8,2.1,3.5,g);cube(dark,0,8.25,0,13.3,.5,4,g);cube(stone,0,8.8,0,9.8,.7,3,g);cube(dark,0,6.9,1.9,2.7,2.1,.5,g);for(const side of [-1,1]){cube(gold,side*.65,7.2,2.2,.7,.23,.14,g);cube(stone,side*.8,6.15,2.1,.35,.7,.5,g);}cube(gold,0,6.65,2.2,.25,.6,.2,g);}
 // Jungle canopy and near-field ferns. Reused geometry/materials, deterministic layout.
 for(let i=0;i<125;i++){const s=rnd()*85,side=i%2?1:-1,g=at(s),x=side*(6+rnd()*25),height=6+rnd()*11;mesh(trunkGeo,bark,x,height/2,0,2,height,2,g);for(let j=0;j<3;j++)mesh(leafGeo,leaves[i%4],x+(rnd()-.5)*5,height-j,0,4+rnd()*3,2.3,4+rnd()*3,g);}
 const fernGeo=new T.ConeGeometry(1,1,5);for(let i=0;i<150;i++){const s=rnd()*170,g=at(s),side=i%2?1:-1,x=side*(4.8+rnd()*3);for(let j=0;j<3;j++){const m=mesh(fernGeo,leaves[i%4],x,.4+j*.14,0,.8-j*.15,.6,.5,g);m.rotation.z=side*(.5+j*.25);}}
 // Hanging vines at the entrance and corridors.
 for(let s=61;s<180;s+=9){const g=at(s);for(let j=0;j<4;j++){let x=(j-1.5)*2.3,len=1+rnd()*2;cube(leaves[2],x,5.7-len/2,0,.07,len,.07,g);for(let k=0;k<3;k++)mesh(leafGeo,leaves[1],x,5.3-k*len/3,0,.2,.12,.08,g);}}
 // Ravine sides sit below the bridge so depth reads from its unprotected edges.
 for(let s=148;s<215;s+=9){const g=at(s);for(const side of [-1,1]){mesh(leafGeo,dark,side*9,-8,0,5,12,6,g);mesh(leafGeo,leaves[2],side*10,-1.5,0,5,.8,5,g);}}
 // Batch static scenery by shared geometry/material: a handful of draws instead of thousands.
 scene.updateMatrixWorld(true);const batches=new Map(),originals=[];
 scene.traverse(o=>{if(!o.isMesh||o.isInstancedMesh)return;const key=o.geometry.uuid+o.material.uuid;if(!batches.has(key))batches.set(key,[]);batches.get(key).push({geometry:o.geometry,material:o.material,matrix:o.matrixWorld.clone()});originals.push(o);});
 for(const o of originals)o.removeFromParent();for(const list of batches.values()){const batch=new T.InstancedMesh(list[0].geometry,list[0].material,list.length);list.forEach((o,i)=>batch.setMatrixAt(i,o.matrix));scene.add(batch);}
 // Three reusable obstacle groups; timeline drives approach rather than scenery speed.
 const hazards={};for(const type of ['DUCK','JUMP','LEFT','RIGHT','PUNCH','BLOCK','STEP','JACK','JACK_LOW','FLAP']){const g=new T.Group();scene.add(g);hazards[type]=g;
  if(type==='DUCK'){cube(dark,0,1.85,0,8.5,.65,.8,g);for(let i=-4;i<=4;i++)cube(gold,i,.0+1.85,.43,.3,.4,.08,g);}
  else if(type==='LEFT'||type==='RIGHT'){const side=type==='LEFT'?1:-1;cube(stone,side*2,1.5,0,3,3,1.3,g);for(let i=0;i<3;i++)mesh(new T.ConeGeometry(.18,.85,4),gold,side*.6,.8+i*.7,.8,1,1,1,g).rotation.x=Math.PI/2;}
  else if(type==='PUNCH'||type==='BLOCK'){cube(dark,0,1.55,0,1.7,2.1,.7,g);cube(gold,0,1.55,.4,1.4,1.75,.1,g);cube(dark,0,1.55,.48,.95,1.25,.12,g);}
  else{cube(stone,0,.35,0,7,.7,.7,g);cube(gold,0,.73,0,7.1,.08,.8,g);}
 }
 // Animated sentinel: readable silhouette, shield, blade and a short hit recoil.
 const guard=new T.Group();guard.name='sentinel';scene.add(guard);
 const armor=new T.MeshStandardMaterial({color:0x536e68,metalness:.65,roughness:.38});
 const cloth=new T.MeshStandardMaterial({color:0x9e3c25,roughness:.9});
 const eyes=new T.MeshBasicMaterial({color:0x8bffdc});
 cube(cloth,0,1.7,-.18,1.05,1.4,.2,guard);
 mesh(new T.CylinderGeometry(.5,.35,1.1,8),armor,0,1.7,0,1,1,.8,guard);cube(gold,0,1.8,.34,.14,.7,.08,guard);
 mesh(new T.SphereGeometry(.42,8,6),armor,0,2.55,0,1,1.05,1,guard);cube(dark,0,2.55,.32,.55,.16,.04,guard);
 for(const side of [-1,1]){cube(eyes,side*.15,2.55,.36,.15,.07,.04,guard);cube(armor,side*.33,.65,0,.35,1.1,.38,guard);cube(dark,side*.33,.15,.15,.42,.24,.6,guard);cube(gold,side*.67,2.1,0,.5,.4,.65,guard);}
 const shield=cube(armor,-.82,1.55,.5,.85,1.25,.18,guard);cube(gold,-.82,1.55,.61,.12,1,.05,guard);
 cube(gold,.85,1.0,.45,.6,.1,.18,guard);const sword=cube(new T.MeshStandardMaterial({color:0xc8ded9,metalness:.8,roughness:.2}),.85,1.8,.45,.18,1.5,.09,guard);sword.rotation.z=-.28;
 const banner=new T.Group();scene.add(banner);for(const side of [-1,1]){cube(bark,side*3,2,0,.14,4,.14,banner);cube(cloth,side*2.5,3.2,0,.9,1.4,.08,banner);}
 // Landing marker and collectible share the active movement cue; reward is scored by gameplay.
 const landing=new T.Group();landing.name='landing';scene.add(landing);
 const jadeLight=new T.MeshBasicMaterial({color:0x6fffd0,transparent:true,opacity:.7});
 cube(jadeLight,0,.035,0,2.3,.035,2.2,landing);
 const landingRing=mesh(new T.TorusGeometry(.85,.035,6,32),gold,0,.08,0,1,1,1,landing);landingRing.rotation.x=Math.PI/2;
 const relic=mesh(new T.OctahedronGeometry(.3),gold,0,1.3,0);relic.name='relic';
 const idol=new T.Group();idol.name='watcher';scene.add(idol);
 cube(dark,0,.3,0,3.4,.6,2.2,idol);cube(stone,0,2.5,0,2.4,3.8,1.7,idol);cube(gold,0,4.6,0,3,.3,2,idol);
 cube(dark,0,3.2,.9,1.9,.55,.1,idol);const eyeMat=new T.MeshBasicMaterial({color:0xff6439});
 for(const side of [-1,1])cube(eyeMat,side*.5,3.2,1,.45,.12,.08,idol);
 cube(gold,0,2.5,1,.32,.65,.3,idol);cube(dark,0,1.8,.9,1.2,.12,.1,idol);
 let lastHitAt=-100,previousHits=0;
 const warm=new T.PointLight(0xff9b42,12,16,2);scene.add(warm);
 let last=-1;
 return {renderer,camera,scene,render(state){
  const {time,travel,pace,action,age,event,reduced,menu,hits=0,freeze=false}=state,s=menu?12+Math.sin(time*.06)*2:travel*4.1;
  const impulse=Math.max(0,1-age/ .65),motion=reduced?0:Math.sin(impulse*Math.PI);
  let shift=action==='LEFT'?-motion*.95:action==='RIGHT'?motion*.95:0;
  camera.position.set(path(s)+shift,2.15+(action==='DUCK'?-motion*1.1:action==='JUMP'?motion*.9:0)+(reduced?0:Math.sin(travel*14)*.035*pace),-s);
  camera.rotation.set(0,yaw(s),reduced?0:-shift*.035);
  camera.fov=74+(reduced?0:pace*5);camera.updateProjectionMatrix();
  const bridge=s>=150&&s<=210,inside=s>78&&!bridge;scene.background.set(bridge?0x80b7ba:inside?0x20382e:0x729993);scene.fog.color.copy(scene.background);scene.fog.density=bridge?.012:inside?.034:.018;
  warm.position.set(path(s),3,-s-5);
  if(hits!==previousHits){if(hits>previousHits)lastHitAt=time;else lastHitAt=-100;previousHits=hits;}
  const watching=time>=52&&time<58&&!menu;idol.visible=watching;idol.position.set(path(s+8),0,-s-8);idol.rotation.y=yaw(s+8);eyeMat.color.set(freeze?0xff6439:0xc1ae56);
  const fighting=time>=18&&time<29&&!menu,approaching=time>=15&&time<18&&!menu;
  guard.visible=fighting||approaching;
  const recoil=Math.min(1,Math.max(0,1-(time-lastHitAt)/.55)),distance=approaching?6+(18-time)*4:5;
  guard.position.set(path(s+distance)+Math.sin(time*2)*.12,Math.sin(time*3)*.025,-s-distance-recoil*.7);
  guard.rotation.set(-recoil*.22,yaw(s),recoil*.16);
  sword.rotation.x=fighting?Math.sin(time*3)*.22:0;shield.rotation.z=Math.sin(time*2)*.06;
  banner.visible=fighting||approaching;banner.position.set(path(s+12),0,-s-12);banner.rotation.y=yaw(s+12);

  for(const g of Object.values(hazards))g.visible=false;landing.visible=false;relic.visible=false;
  if(event&&['LEFT','RIGHT','JUMP','STEP'].includes(event.type)&&!watching){const d=Math.max(.7,(event.at-time)*8+2),offset=event.type==='LEFT'?-1.4:event.type==='RIGHT'?1.4:0;relic.visible=true;relic.position.set(path(s+d)+offset,1.3,-s-d);relic.rotation.y=time*2;landing.visible=['JUMP','STEP'].includes(event.type);landing.position.set(path(s+d+2),0,-s-d-2);landing.rotation.y=yaw(s+d+2);}
  if(event&&event.phase!=='boss'&&!(fighting&&['PUNCH','BLOCK','LEFT','RIGHT'].includes(event.type))){const g=hazards[event.type];if(g){const distance=Math.max(.5,(event.at-time)*8+2);g.visible=true;g.position.set(path(s+distance),0,-s-distance);g.rotation.y=yaw(s+distance);}}
  if(last!==s){last=s;}renderer.render(scene,camera);
 },dispose(){renderer.dispose();}};
};
