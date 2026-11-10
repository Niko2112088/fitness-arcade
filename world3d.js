/* Original procedural environment; Three.js r160.1. No reference footage/assets shipped. */
window.createTempleWorld=function(canvas){
 const T=window.THREE;if(!T)return null;let renderer;
 try{renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});}catch{return null;}
 renderer.setSize(1280,720,false);renderer.setPixelRatio(1);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(78,16/9,.1,200);camera.rotation.order='YXZ';
 scene.background=new T.Color(0x75c8df);scene.fog=new T.FogExp2(0x75c8df,.012);
 const sky=new T.HemisphereLight(0xdffbff,0x597a50,3);scene.add(sky);const sun=new T.DirectionalLight(0xffdfb0,4);sun.position.set(-18,24,-14);scene.add(sun);
 const cameraLight=new T.PointLight(0xffc66b,20,24,2);scene.add(cameraLight);
 let seed=712;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const box=new T.BoxGeometry(1,1,1),rockGeo=new T.IcosahedronGeometry(1,1),trunkGeo=new T.CylinderGeometry(.2,.4,1,7);
 function texture(){
  const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');x.fillStyle='#3f5142';x.fillRect(0,0,512,512);
  for(let row=0;row<4;row++)for(let col=-1;col<3;col++){
   const px=col*256+(row%2?128:0),py=row*128,n=random()*22;
   const gradient=x.createLinearGradient(px,py,px+180,py+125);gradient.addColorStop(0,`rgb(${155+n},${153+n},${122+n})`);gradient.addColorStop(1,`rgb(${119+n},${126+n},${100+n})`);x.fillStyle=gradient;
   x.beginPath();x.moveTo(px+6,py+3);x.lineTo(px+248,py+6);x.lineTo(px+253,py+119);x.lineTo(px+10,py+125);x.closePath();x.fill();x.strokeStyle='#b5b496';x.lineWidth=2;x.stroke();
   x.strokeStyle='rgba(40,57,38,.24)';x.lineWidth=1;for(let j=0;j<4;j++){const cx=px+random()*240;x.beginPath();x.moveTo(cx,py+3);x.lineTo(cx+8,py+12);x.lineTo(cx-4,py+22);x.stroke();}
  }
  for(let i=0;i<16000;i++){const n=50+random()*140;x.fillStyle=`rgba(${n},${n+6},${n-15},.09)`;x.fillRect(random()*512,random()*512,1+random()*3,1+random()*2);}
  for(let i=0;i<200;i++){const px=random()*512,py=random()*512;x.fillStyle='rgba(61,85,38,.15)';x.beginPath();x.ellipse(px,py,random()*9,random()*5,random()*3,0,Math.PI*2);x.fill();}
  const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return tex;
 }
 const map=texture();const mat=(color,opts={})=>new T.MeshStandardMaterial({color,roughness:.8,...opts});
 const stone=mat(0xe0d6b4,{map,bumpMap:map,bumpScale:.035}),edge=mat(0x4c6a66,{map}),gold=mat(0xd9a858,{metalness:.5,roughness:.4}),wood=mat(0x79503b),leaf=[mat(0x24794c),mat(0x47966b),mat(0x65b34f)],crystal=mat(0x19e8b1,{emissive:0x0c804d,emissiveIntensity:1.3,metalness:.25,roughness:.28});
 const flame=new T.MeshBasicMaterial({color:0xffbb36}),hot=new T.MeshBasicMaterial({color:0xff5c1a});
 function mesh(g,m,x,y,z,sx=1,sy=1,sz=1,parent=scene){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);parent.add(o);return o;}
 const cube=(m,x,y,z,w,h,d,p=scene)=>mesh(box,m,x,y,z,w,h,d,p);
 const center=s=>Math.sin(s*.009)*7+Math.sin(s*.021)*2;
 const yaw=s=>-Math.atan2(center(s+.2)-center(s-.2),.4);
 function station(s){const g=new T.Group();g.position.set(center(s),0,-s);g.rotation.y=yaw(s);scene.add(g);return g;}
 const crystalGeo=new T.ConeGeometry(.8,4,5),flameGeo=new T.ConeGeometry(.35,1,6);
 // One-batch tiled track, with visible narrow bridge portions over water.
 const tile=new T.InstancedMesh(box,stone,3200),dummy=new T.Object3D();let count=0;
 for(let row=0;row<800;row++){const s=row*2.5,bridge=(s>60&&s<125)||(s>175&&s<215);for(let col=-1;col<=1;col++){if(bridge&&col!==0)continue;dummy.position.set(center(s)+col*2.25,-.13,-s);dummy.rotation.set(0,yaw(s),0);dummy.scale.set(bridge?3.5:2.2,.25,2.45);dummy.updateMatrix();tile.setMatrixAt(count++,dummy.matrix)}}tile.count=count;scene.add(tile);
 cube(mat(0x137c91,{metalness:.3,roughness:.3}),0,-14,-920,250,1,2100);
 // Architectural ribs, sculpted gate faces, braziers and open-sided terraces.
 for(let s=0;s<1850;s+=12){const g=station(s),cave=(s>128&&s<275)||(s>400&&s<720);
  for(const side of [-1,1]){cube(edge,side*3.7,.22,0,.45,.65,11.7,g);cube(stone,side*4.4,2.6,0,1.2,5.2,1.4,g);cube(gold,side*4.4,5.35,0,1.6,.25,1.8,g);
   if(cave){mesh(rockGeo,edge,side*7,3.4,0,4,6,6,g);mesh(crystalGeo,crystal,side*4.7,2.1,3,1,1,1,g).rotation.z=side*.25;}
   else if(s>275&&s<400){mesh(trunkGeo,wood,side*(7+random()*6),4.5,2,1,9,1,g);for(let j=0;j<3;j++)mesh(rockGeo,leaf[j],side*9,6+j*1.8,0,5-j,1.8,4,g);}
   if(s%24===0){cube(edge,side*3.8,1.5,0,.6,2,.65,g);mesh(flameGeo,flame,side*3.8,2.8,0,1,1,1,g);}
  }
  if(cave){const roof=mesh(rockGeo,wood,0,8,0,10,2.8,8,g);roof.rotation.z=.2;cube(gold,0,6.5,0,9,.22,.3,g);}
 }
 for(const s of [0,58,126,276,420,760,1100,1450]){const g=station(s);for(const side of [-1,1]){cube(stone,side*4.2,4,0,2,8,3,g);cube(edge,side*4.2,.6,0,2.8,1.2,4,g);}cube(stone,0,7.3,0,10.6,2,3,g);cube(gold,0,8.4,0,11.5,.25,3.5,g);cube(edge,0,7.4,1.65,2.8,1.6,.4,g);for(const side of [-1,1])cube(flame,side*.65,7.55,1.9,.65,.2,.1,g);cube(gold,0,6.85,1.8,.3,.65,.3,g);}
 // Distant cliffs give the bridge depth without full-screen particles or postprocessing.
 for(let i=0;i<100;i++){const s=random()*800,g=station(s);for(const side of [-1,1])mesh(rockGeo,edge,side*(12+random()*25),-6+random()*3,0,6+random()*6,10+random()*15,8,g);}
 window.decorateTempleOpening?.({T,scene,station,mesh,cube,stone,edge,gold,wood,random});
 scene.updateMatrixWorld(true);const batches=new Map(),originals=[];
 scene.traverse(o=>{if(!o.isMesh||o.isInstancedMesh)return;const key=o.geometry.uuid+o.material.uuid+Math.floor(-o.matrixWorld.elements[14]/96);if(!batches.has(key))batches.set(key,[]);batches.get(key).push({g:o.geometry,m:o.material,x:o.matrixWorld.clone()});originals.push(o)});originals.forEach(o=>o.removeFromParent());
 for(const list of batches.values()){const m=new T.InstancedMesh(list[0].g,list[0].m,list.length);list.forEach((o,i)=>m.setMatrixAt(i,o.x));scene.add(m);}
 // Reusable near-field hazards. Each choreography event selects geometry as well as input.
 const hazards={};for(const kind of ['fire-floor','log','stone-bar','spikes','roots','gap','roller','pillar']){
  const g=new T.Group();g.name='hazard-'+kind;scene.add(g);hazards[kind]=g;
  if(kind==='fire-floor'){
   const fireMat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{time:{value:0}},vertexShader:'varying vec2 uvFire;void main(){uvFire=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`precision mediump float;varying vec2 uvFire;uniform float time;
   float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
   float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
   void main(){vec2 p=uvFire;float n=noise(vec2(p.x*24.,p.y*4.-time*5.))*.6+noise(vec2(p.x*48.,p.y*8.-time*9.))*.3;
   float edge=.55+n*.5;float density=(1.-smoothstep(edge-.28,edge,p.y));float core=pow(max(0.,1.-p.y),2.);vec3 color=mix(vec3(1.,.12,.005),vec3(1.,.82,.15),core);color=mix(color,vec3(1.,1.,.65),pow(core,4.)*.25);float alpha=density*smoothstep(0.,.08,p.x)*(1.-smoothstep(.92,1.,p.x));gl_FragColor=vec4(color,alpha);}`});
   // Both flame sheets start at y=.02, directly above the track surface.
   const flameSheet=new T.PlaneGeometry(6,.9);
   mesh(flameSheet,fireMat,0,.47,.2,1,1,1,g);
   mesh(flameSheet,fireMat,0,.38,-.25,.96,.8,1,g);
   cube(mat(0x241c17),0,.02,0,6,.04,.85,g);
   const ember=new T.MeshBasicMaterial({color:0xe95612});
   for(let i=0;i<12;i++)cube(ember,(i-5.5)*.48,.045,Math.sin(i*3)*.22,.3,.015,.12,g);
  }
  else if(kind==='log'){const o=mesh(new T.CylinderGeometry(.42,.42,8,10),wood,0,2.15,0,1,1,1,g);o.rotation.z=Math.PI/2;for(const x of [-3,0,3]){const band=mesh(new T.TorusGeometry(.44,.065,5,12),gold,x,2.15,0,1,1,1,g);band.rotation.y=Math.PI/2;}}
  else if(kind==='stone-bar'){cube(stone,0,2.05,0,8,.7,.8,g);for(let i=-3;i<=3;i++)cube(gold,i,2.05,.45,.35,.35,.12,g);}
  else if(kind==='roller'||kind==='spikes'){const radius=kind==='roller'?1.35:.5,body=mesh(new T.CylinderGeometry(radius,radius,kind==='roller'?2.5:7,12),edge,0,radius,0,1,1,1,g);body.rotation.z=Math.PI/2;for(let i=0;i<12;i++){const a=i/12*Math.PI*2;for(let x=-1;x<=1;x++){const spike=mesh(new T.ConeGeometry(.14,.5,4),gold,x*.8,radius+Math.cos(a)*radius,Math.sin(a)*radius,1,1,1,g);spike.rotation.x=a;}}}
  else if(kind==='pillar'){cube(stone,0,2,0,2.6,4,2,g);for(const y of [.4,1.6,2.8,4])cube(gold,0,y,0,3,.2,2.5,g);}
  else if(kind==='roots'){for(let i=0;i<3;i++){const o=mesh(new T.TorusGeometry(1+i*.25,.15,6,16,Math.PI),wood,(i-1)*1.5,.1,0,1,1,1,g);o.rotation.y=.4*i;}}
  else{cube(new T.MeshBasicMaterial({color:0x031c27}),0,.025,0,7,.025,2.8,g);for(const x of [-2.5,2.5])cube(gold,x,.1,1.5,1,.1,.25,g);}
 }
 const landing=new T.Group();landing.name='landing';scene.add(landing);const mint=new T.MeshBasicMaterial({color:0x73ffe0,transparent:true,opacity:.65});cube(mint,0,.08,0,2.8,.06,2,landing);const ring=mesh(new T.TorusGeometry(.7,.04,6,24),mint,0,1.1,0,1,1,1,landing);
 const relic=mesh(new T.OctahedronGeometry(.25),gold,0,1.2,0);relic.name='relic';
 const watcher=new T.Group();watcher.name='watcher';scene.add(watcher);cube(edge,0,1.8,0,2.2,3.6,1.4,watcher);cube(gold,0,3.8,0,2.6,.3,1.8,watcher);for(const x of [-.55,.55])cube(hot,x,2.8,.75,.5,.15,.1,watcher);
 // Retain a named disabled placeholder for compatibility; approved guardian still awaits a real asset.
 const sentinel=new T.Group();sentinel.name='sentinel';scene.add(sentinel);
 const reusable=new T.Vector3();let lastState=null;
 function render(state){lastState=state;const {time,travel,pace,action,age,event,reduced,menu,freeze=false}=state,s=menu?8:travel*10;
  const p=window.TempleRoute?.chapter(time)||{palette:'sun'},theme=time<31?p.palette:s%600>200?'crystal':'jungle';
  const color=theme==='ember'?0x53404e:theme==='crystal'?0x346986:0xa9d8d0;scene.background.set(color);scene.fog.color.set(color);scene.fog.density=theme==='crystal'?.016:.009;
  sky.intensity=theme==='ember'?1.8:theme==='crystal'?2.3:2.1;cameraLight.color.set(theme==='ember'?0xff9b42:theme==='crystal'?0x4bffca:0xffdc9e);cameraLight.position.set(center(s),3,-s-3);
  const envelope=age>=0&&age<.7?Math.sin(age/.7*Math.PI):0,motion=reduced?0:envelope;
  const shift=action==='LEFT'?-1.5*motion:action==='RIGHT'?1.5*motion:0;
  camera.position.set(center(s)+shift,2.05+(action==='DUCK'?-1.1*motion:action==='JUMP'?.95*motion:action==='STEP'?.15*motion:0)+(reduced?0:Math.sin(travel*17)*.035*pace),-s);
  reusable.set(center(s+12),2.05,-s-12);camera.lookAt(reusable);camera.rotation.z=reduced?0:-shift*.055;camera.fov=76+(reduced?0:pace*6);camera.updateProjectionMatrix();
  Object.values(hazards).forEach(g=>g.visible=false);landing.visible=false;relic.visible=false;sentinel.visible=false;
  if(event&&event.type!=='STILL'&&event.phase!=='boss'){
   const kind=event.visual||({DUCK:'log',JUMP:'spikes',STEP:'roots',LEFT:'roller',RIGHT:'pillar'}[event.type]||'pillar'),g=hazards[kind],d=Math.max(-3,(event.at-time)*10+2);
   if(g){g.visible=true;g.position.set(center(s+d)+(event.type==='LEFT'?1.5:event.type==='RIGHT'?-1.5:0),0,-s-d);g.rotation.set(0,yaw(s+d),0);if(kind==='roller')g.rotation.x=time*3;
    if(kind.startsWith('fire'))g.children[0].material.uniforms.time.value=time;}
   if(['JUMP','STEP','LEFT','RIGHT'].includes(event.type)){relic.visible=true;relic.position.set(center(s+d)+(event.type==='LEFT'?-1.5:event.type==='RIGHT'?1.5:0),1.3,-s-d);relic.rotation.y=time*3;}
   if(['JUMP','STEP'].includes(event.type)){landing.visible=true;landing.position.set(center(s+d+3),0,-s-d-3);landing.rotation.y=yaw(s+d+3);}
  }
  watcher.visible=time>=52&&time<58&&!menu;watcher.position.set(center(s+8),0,-s-8);watcher.rotation.y=yaw(s+8);renderer.render(scene,camera);
 }
 return {renderer,camera,scene,render,dispose(){renderer.dispose()},get lastState(){return lastState}};
};
