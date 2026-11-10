/* Choreography transcribed from the uploaded 29.99s TV recording at 10 fps.
   All times are seconds, relative to the start of the run, not the countdown. */
(function(root){
 const beats=[
  {cue:.8,at:1.35,end:1.55,type:'DUCK',visual:'fire-bar'},
  {cue:2.4,at:2.75,end:3.1,type:'JUMP',visual:'fire-floor'},
  {cue:3.9,at:4.1,end:4.4,type:'DUCK',visual:'log'},
  {cue:5.2,at:5.85,end:6.4,type:'JUMP',visual:'spikes'},
  {cue:7.9,at:8.35,end:8.65,type:'DUCK',visual:'log'},
  {cue:9.7,at:10,end:10.25,type:'DUCK',visual:'stone-bar'},
  {cue:10.7,at:11.2,end:11.6,type:'LEFT',visual:'roller'},
  {cue:12.3,at:13.25,end:13.55,type:'RIGHT',visual:'pillar'},
  {cue:14.1,at:14.5,end:14.8,type:'DUCK',visual:'stone-bar'},
  {cue:15.9,at:16.7,end:17.1,type:'JUMP',visual:'spikes'},
  {cue:17.7,at:18.4,end:18.8,type:'JUMP',visual:'gap'},
  {cue:20.7,at:21.25,end:21.55,type:'RIGHT',visual:'pillar'},
  {cue:23.6,at:24.5,end:24.9,type:'JUMP',visual:'roots'},
  {cue:25.8,at:26.6,end:26.9,type:'DUCK',visual:'fire-bar'},
  {cue:28.1,at:28.7,end:29.15,type:'JUMP',visual:'roots'},
  // Only the start of this final cue is visible; completion is an original continuation.
  {cue:29.3,at:30.05,end:30.4,type:'LEFT',visual:'roller',continuation:true}
 ];
 const chapters=[{at:0,name:'СОЛНЕЧНЫЕ РУИНЫ',palette:'sun'},{at:5.9,name:'ПОДВЕСНАЯ ТРОПА',palette:'jungle'},{at:12.9,name:'НЕФРИТОВЫЙ ГРОТ',palette:'crystal'},{at:14.6,name:'ОГНЕННЫЙ ПРОХОД',palette:'ember'},{at:17.4,name:'КРИСТАЛЬНЫЙ ТОННЕЛЬ',palette:'crystal'},{at:27.4,name:'ВЫХОД К СОЛНЦУ',palette:'sun'}];
 root.TempleRoute={beats,chapters,chapter(t){return chapters.filter(c=>t>=c.at).at(-1)||chapters[0]},active(t){return beats.find(e=>t>=e.cue&&t<=e.end)||null},actionPulse(t){const e=beats.find(e=>t>=e.at&&t<=e.at+.65);return e?{type:e.type,age:t-e.at}:{type:'',age:10}}};
})(globalThis);
