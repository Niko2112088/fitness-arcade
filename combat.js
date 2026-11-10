/* Original temple targets: independent of the unfinished guardian character. */
(function(root){
 const beats=[
  {cue:32,at:33.6,end:34.1,type:'PUNCH',visual:'mask',combat:true,target:0},
  {cue:34.2,at:35.8,end:36.3,type:'PUNCH',visual:'mask',combat:true,target:1},
  {cue:36.4,at:38,end:38.5,type:'PUNCH',visual:'mask',combat:true,target:2}
 ];
 root.TempleCombat={start:32,end:40,beats};
 root.createTempleCombat=function({T,scene,center,yaw}){
  const stone=new T.MeshStandardMaterial({color:0x567b70,roughness:.7,metalness:.15});
  const trim=new T.MeshStandardMaterial({color:0xd6ab56,roughness:.4,metalness:.65});
  const dark=new T.MeshStandardMaterial({color:0x102d2c,roughness:.85});
  const jade=new T.MeshStandardMaterial({color:0x8effcb,emissive:0x2de9a1,emissiveIntensity:1.3,roughness:.25});
  const face=new T.SphereGeometry(1,24,16),box=new T.BoxGeometry(1,1,1),ring=new T.TorusGeometry(1,.075,8,36),gem=new T.OctahedronGeometry(1),chip=new T.TetrahedronGeometry(.16);
  function part(parent,geo,mat,x,y,z,sx=1,sy=1,sz=1){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);parent.add(m);return m;}
  const targets=beats.map((e,i)=>{
   const g=new T.Group();g.name='combat-target-'+i;scene.add(g);
   const body=new T.Group();g.add(body);
   part(body,face,stone,0,0,0,.91,1.05,.28);part(body,ring,trim,0,0,.04,1,1.15,1);
   for(const side of [-1,1]){
    const eye=part(body,box,dark,side*.34,.2,.26,.47,.25,.08);eye.rotation.z=side*.2;
    const light=part(body,box,jade,side*.34,.2,.315,.28,.065,.04);light.rotation.z=side*.2;
    const brow=part(body,box,trim,side*.34,.42,.24,.62,.12,.1);brow.rotation.z=side*.2;
    part(body,gem,stone,side*.7,-.28,.2,.22,.36,.12);
    for(let j=0;j<3;j++){const ray=part(body,gem,trim,side*(.8+j*.16),.65+j*.12,0,.13,.4-j*.07,.12);ray.rotation.z=-side*(.5+j*.2);}
   }
   part(body,gem,trim,0,.05,.33,.14,.3,.18);part(body,box,dark,0,-.43,.26,.5,.16,.07);
   for(let j=-1;j<=1;j++)part(body,box,trim,j*.13,-.43,.31,.06,.13,.04);
   part(body,gem,jade,0,.77,.22,.16,.24,.12);
   // Batch repeated facial details; animate the parent rather than individual draw calls.
   body.updateMatrixWorld(true);const batches=new Map();
   for(const m of body.children){const key=m.geometry.uuid+m.material.uuid;if(!batches.has(key))batches.set(key,[]);batches.get(key).push({geometry:m.geometry,material:m.material,matrix:m.matrix.clone()});}
   body.clear();for(const list of batches.values()){const m=new T.InstancedMesh(list[0].geometry,list[0].material,list.length);list.forEach((p,j)=>m.setMatrixAt(j,p.matrix));body.add(m);}
   const halo=part(g,ring,jade,0,0,-.1,1.25,1.25,1);
   const shards=Array.from({length:7},(_,j)=>{const m=part(g,chip,j%2?trim:stone,0,0,0);m.visible=false;return m});
   return {g,body,halo,shards};
  });
  function render({time,travel,reduced,events=[],menu=false}){
   for(let i=0;i<targets.length;i++){
    const {g,body,halo,shards}=targets[i],e=events.find(e=>e.combat&&e.target===i);g.visible=false;
    if(menu||!e||time<e.cue)continue;
    const hit=e.done&&Number.isFinite(e.hitAt),age=hit?time-e.hitAt:0;
    if(hit&&(age<0||age>.75)||!hit&&(e.missed||time>e.end+.25))continue;
    g.visible=true;const s=travel*10,side=i===0?-1:i===1?1:0,flight=hit&&!reduced?age:0;
    const d=hit?3+flight*15:Math.max(-1,(e.at-time)*13+3),x=side*.65+(hit?((i%2?1:-1)*flight*8):0);
    g.position.set(center(s+d)+x,2.05+flight*5+(reduced?0:Math.sin(time*4+i)*.06),-s-d);g.rotation.set(0,yaw(s+d),0);
    body.rotation.set(flight*3,flight*5,flight*(i%2?6:-6));body.scale.setScalar(hit?Math.max(.25,1-age*.8):1);
    halo.visible=!hit;halo.scale.setScalar(1.2+(reduced?0:Math.sin(time*6)*.035));
    shards.forEach((m,j)=>{m.visible=hit&&!reduced;const a=j/7*Math.PI*2;m.position.set(Math.cos(a)*age*6,Math.sin(a)*age*5,age*3);m.rotation.set(age*(j+1),age*8,age*3);});
    if(reduced&&hit)g.visible=false;
   }
  }
  return {render};
 };
})(globalThis);
