/* Original environment details for the opening 120m. All materials/geometry are local. */
window.decorateTempleOpening=function({T,scene,station,mesh,cube,stone,edge,gold,wood,random}){
 const material=(color,opts={})=>new T.MeshStandardMaterial({color,roughness:.87,...opts});
 const moss=material(0x456c34),bark=material(0x5a4933),sand=material(0x7d7554),dark=material(0x243f34);
 const foliage=[material(0x316342,{side:T.DoubleSide}),material(0x578846,{side:T.DoubleSide}),material(0x83a854,{side:T.DoubleSide})];
 // A folded, tapering curved leaf, with many small silhouette notches instead of polygonal crowns.
 const vertices=[],indices=[],uv=[];
 for(let i=0;i<=18;i++){const t=i/18,w=Math.sin(Math.PI*t)*.36*(i%2?.78:1),y=Math.sin(t*Math.PI)*.3-t*t*.85;
  for(const side of [-1,0,1]){vertices.push(side*w,y-Math.abs(side)*.11,t*3.5);uv.push((side+1)/2,t);}
  if(i<18){const n=i*3;indices.push(n,n+3,n+1,n+1,n+3,n+4,n+1,n+4,n+2,n+2,n+4,n+5);}}
 const frond=new T.BufferGeometry();frond.setAttribute('position',new T.Float32BufferAttribute(vertices,3));frond.setAttribute('uv',new T.Float32BufferAttribute(uv,2));frond.setIndex(indices);frond.computeVertexNormals();
 const trunk=new T.CylinderGeometry(.16,.3,1,12,5),rib=new T.TorusGeometry(.29,.025,4,12),rock=new T.IcosahedronGeometry(1,1);
 const curve=new T.CatmullRomCurve3([new T.Vector3(0,0,-6),new T.Vector3(0,-.4,-3),new T.Vector3(0,-.5,0),new T.Vector3(0,-.4,3),new T.Vector3(0,0,6)]);
 const rope=new T.TubeGeometry(curve,16,.045,5,false);
 const stem=new T.CylinderGeometry(.055,.075,1,6);
 // Bevels catch sunlight at the edges of masonry and break the original box silhouette.
 const shape=new T.Shape();shape.moveTo(-.44,-.44);shape.lineTo(.44,-.44);shape.lineTo(.44,.44);shape.lineTo(-.44,.44);shape.closePath();
 const bevel=new T.ExtrudeGeometry(shape,{depth:.88,bevelEnabled:true,bevelThickness:.06,bevelSize:.06,bevelSegments:2,steps:1});bevel.translate(0,0,-.44);
 const disc=new T.CylinderGeometry(1,1,.18,32),band=new T.TorusGeometry(1,.065,6,32),inlay=material(0x57aa91,{metalness:.35,roughness:.45});
 function fern(g,x,y,z,size){const root=new T.Group();root.position.set(x,y,z);root.scale.setScalar(size);g.add(root);for(let i=0;i<9;i++){const f=mesh(frond,foliage[i%3],0,0,0,.55,.65,.55,root);f.rotation.set(-.38+(i%3)*.12,i*Math.PI*2/9,0);}return root;}
 const stations=[...Array.from({length:21},(_,i)=>i*6),...Array.from({length:21},(_,i)=>300+i*6)];
 for(const s of stations){const g=station(s),bridge=s>=60&&s<=120;
  for(const side of [-1,1]){
   // Leave the central obstacle lane open; the close leaves are entirely outside |x|=3.6.
   fern(g,side*(4.5+random()*1.2),.8,random()*3, .6+random()*.45);
   if(s%12===0){const palm=new T.Group();palm.position.set(side*(7+random()*3),0,random()*4);palm.rotation.z=-side*(.08+random()*.12);g.add(palm);const h=7+random()*3;
    mesh(trunk,bark,0,h/2,0,1,h,1,palm);for(let j=0;j<8;j++){const r=mesh(rib,wood,0,.8+j*h/9,0,1,1,1,palm);r.rotation.x=Math.PI/2;}
    for(let j=0;j<11;j++){const f=mesh(frond,foliage[j%3],0,h,0,1.1,1,1.2,palm);f.rotation.y=j*Math.PI*2/11;f.rotation.x=-.18+(j%3)*.18;}
   }
   // Broken masonry, moss caps and carved trim along the lower parapet.
   const x=side*3.8;
   if(!bridge){mesh(bevel,stone,x,.55,0,.65,1.1,5.5,g);mesh(bevel,moss,x,1.12,0,.7,.11,4.5,g);
    for(let i=0;i<3;i++){const b=mesh(bevel,i%2?edge:stone,side*(5.6+random()*2),.3,random()*5,1.1,.6,.9,g);b.rotation.y=random()*2;}}
   else{for(const z of [-3,3]){mesh(bevel,wood,side*2,1,z,.18,2,.2,g);const cap=mesh(bevel,gold,side*2,2,z,.25,.1,.3,g);}
    mesh(rope,wood,side*2,1.9,0,1,1,.5,g);mesh(rope,wood,side*2,1.15,0,1,1,.5,g);}
   if(s%12===0){mesh(bevel,edge,side*4.4,.5,0,1.6,1,2,g);mesh(bevel,stone,side*4.4,4.8,0,1.4,.45,1.8,g);
    for(let j=0;j<4;j++){const a=mesh(bevel,gold,side*4.4,1.4+j*.7,.77,.38,.38,.08,g);a.rotation.z=Math.PI/4;}
    // Hanging curved vines and individually spaced leaves.
    mesh(rope,moss,side*4.05,3.9,0,1,1,.3,g).rotation.z=side*.2;
    for(let j=0;j<5;j++){const f=mesh(frond,foliage[j%3],side*4.1,4-j*.35,.75,.22,.22,.24,g);f.rotation.set(1.1,side*.5,j*.2);}
   }
   for(let j=0;j<2;j++){const r=mesh(rock,j?moss:edge,side*(8+random()*10),-1,random()*6,2+random()*4,2+random()*4,3,g);r.rotation.y=random()*3;}
  }
 }
 // Recognizable sun medallions and tiered stonework on the two opening gateways.
 for(const s of [0,58,420]){const g=station(s);for(const side of [-1,1]){for(let j=0;j<5;j++)mesh(bevel,j%2?edge:stone,side*4.2,1.4+j*1.15,0,2.15,1.08,3.1,g);mesh(bevel,moss,side*4.2,6.3,0,2.5,.2,3.4,g);}
  mesh(bevel,stone,0,7.25,1.7,10.6,1.65,.5,g);const med=mesh(disc,edge,0,7.3,2.08,1.05,1,1.05,g);med.rotation.x=Math.PI/2;
  mesh(band,gold,0,7.3,2.21,1.05,1.05,1,g);mesh(band,inlay,0,7.3,2.23,.72,.72,1,g);
  for(let j=0;j<12;j++){const a=j*Math.PI/6,b=mesh(bevel,gold,Math.sin(a)*.52,7.3+Math.cos(a)*.52,2.22,.12,.26,.08,g);b.rotation.z=-a;}
  mesh(bevel,gold,0,7.3,2.26,.3,.3,.1,g).rotation.z=Math.PI/4;
 }
 // Soft canopy shadows baked into a small alpha mask; no additional shadow-map pass on phone.
 const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');
 for(let j=0;j<110;j++){ctx.save();ctx.translate(random()*256,random()*256);ctx.rotate(random()*Math.PI);ctx.scale(1,3);const grad=ctx.createRadialGradient(0,0,0,0,0,8);grad.addColorStop(0,'rgba(6,25,18,.28)');grad.addColorStop(1,'rgba(6,25,18,0)');ctx.fillStyle=grad;ctx.fillRect(-8,-8,16,16);ctx.restore();}
 const shadowMap=new T.CanvasTexture(c),shadowMaterial=new T.MeshBasicMaterial({map:shadowMap,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});const plane=new T.PlaneGeometry(1,1);
 for(const s of stations.filter(s=>s%12===0)){const g=station(s);const o=mesh(plane,shadowMaterial,0,.006,0,s>=60&&s<=120?3.3:6.5,12,1,g);o.rotation.x=-Math.PI/2;}
 // A pale horizon and silhouettes provide atmospheric depth without full-screen blur.
 const mountain=material(0x518c85);for(let j=0;j<16;j++){mesh(rock,mountain,(j-8)*14,-2,-145,12,14+random()*22,10);}
};
