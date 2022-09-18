!function(e){"use strict";function s(t){Object.assign(t,{properties:{masterVol:{type:Number,value:.5,observer:"setMasterVol"},reverbLev:{type:Number,value:.3,observer:"setReverbLev"},quality:{type:Number,value:1,observer:"setQuality"},debug:{type:Number,value:0},src:{type:String,value:null,observer:"loadMIDIfromSrc"},loop:{type:Number,value:0},internalcontext:{type:Number,value:1},tsmode:{type:Number,value:0},voices:{type:Number,value:64},useReverb:{type:Number,value:1}},program:[{},{},{},{},{},{},{},{}],program1:[[{w:"sine",v:.4,d:.7,r:.1},{w:"triangle",v:3,d:.7,s:.1,g:1,a:.01,k:-1.2}],[{w:"triangle",v:.4,d:.7,r:.1},{w:"triangle",v:4,t:3,d:.4,s:.1,g:1,k:-1,a:.01}],[{w:"sine",d:.7,r:.1},{w:"triangle",v:4,f:2,d:.5,s:.5,g:1,k:-1}],[{w:"sine",d:.7,v:.2},{w:"triangle",v:4,t:3,f:2,d:.3,g:1,k:-1,a:.01,s:.5}],[{w:"sine",v:.35,d:.7},{w:"sine",v:3,t:7,f:1,d:1,s:1,g:1,k:-.7}],[{w:"sine",v:.35,d:.7},{w:"sine",v:8,t:7,f:1,d:.5,s:1,g:1,k:-.7}],[{w:"sawtooth",v:.34,d:2},{w:"sine",v:8,f:.1,d:2,s:1,r:2,g:1}],[{w:"triangle",v:.34,d:1.5},{w:"square",v:6,f:.1,d:1.5,s:.5,r:2,g:1}]],program0:[[{w:"triangle",v:.5,d:.7}],[{w:"triangle",v:.5,d:.7}],[{w:"triangle",v:.5,d:.7}],[{w:"triangle",v:.5,d:.7}],[{w:"triangle",v:.5,d:.7}],[{w:"triangle",v:.5,d:.7}],[{w:"sawtooth",v:.3,d:.7}],[{w:"sawtooth",v:.3,d:.7}]],ready:()=>new Promise(t=>{const e=setInterval(()=>{this.isReady&&(clearInterval(e),t())},100)}),init:()=>{this.pg=[],this.vol=[],this.ex=[],this.bend=[],this.rpnidx=[],this.brange=[],this.sustain=[],this.notetab=[],this.rhythm=[],this.masterTuningC=0,this.masterTuningF=0,this.tuningC=[],this.tuningF=[],this.scaleTuning=[],this.maxTick=0,this.playTick=0,this.playing=0,this.releaseRatio=3.5;for(let t=0;t<16;++t)this.pg[t]=0,this.vol[t]=3e4/16129,this.bend[t]=0,this.brange[t]=256,this.tuningC[t]=0,this.tuningF[t]=0,this.scaleTuning[t]=[0,0,0,0,0,0,0,0,0,0,0,0],this.rhythm[t]=0;this.rhythm[9]=1,this.preroll=.2,this.relcnt=0,setInterval(function(){if(3<=++this.relcnt){this.relcnt=0;for(let t=this.notetab.length-1;0<=t;--t){var e=this.notetab[t];this.actx.currentTime>e.e&&(this._pruneNote(e),this.notetab.splice(t,1))}}if(this.playing&&0<this.song.ev.length){let t=this.song.ev[this.playIndex];for(;this.actx.currentTime+this.preroll>this.playTime;)if(65361==t.m[0]?(this.song.tempo=t.m[1],this.tick2Time=240/this.song.tempo/this.song.timebase):this.send(t.m,this.playTime),++this.playIndex,this.playIndex>=this.song.ev.length){if(!this.loop){this.playTick=this.maxTick,this.playing=0;break}t=this.song.ev[this.playIndex=0],this.playTick=t.t}else t=this.song.ev[this.playIndex],this.playTime+=(t.t-this.playTick)*this.tick2Time,this.playTick=t.t}}.bind(this),60),this.internalcontext&&(e.AudioContext=e.AudioContext||e.webkitAudioContext,this.setAudioContext(new AudioContext)),this.isReady=1},setMasterVol:t=>{null!=t&&(this.masterVol=t),this.out&&(this.out.gain.value=this.masterVol)},setReverbLev:t=>{null!=t&&(this.reverbLev=t);t=parseFloat(this.reverbLev);this.rev&&!isNaN(t)&&(this.rev.gain.value=8*t)},setLoop:t=>{this.loop=t},setVoices:t=>{this.voices=t},getPlayStatus:()=>({play:this.playing,maxTick:this.maxTick,curTick:this.playTick}),locateMIDI:t=>{let e,s=this.playing;for(this.stopMIDI(),e=0;e<this.song.ev.length&&t>this.song.ev[e].t;++e){var i=this.song.ev[e],a=15&i.m[0];switch(240&i.m[0]){case 176:switch(i.m[1]){case 1:this.setModulation(a,i.m[2]);break;case 7:this.setChVol(a,i.m[2]);break;case 10:this.setPan(a,i.m[2]);break;case 11:this.setExpression(a,i.m[2]);break;case 64:this.setSustain(a,i.m[2])}break;case 192:this.pg[15&i.m[0]]=i.m[1]}65361==i.m[0]&&(this.song.tempo=i.m[1])}this.song.ev[e]?(this.playIndex=e,this.playTick=this.song.ev[e].t):(this.playIndex=0,this.playTick=this.maxTick),s&&this.playMIDI()},loadMIDIfromSrc:()=>{this.loadMIDIUrl(this.src)},loadMIDIUrl:t=>{var e;t&&((e=new XMLHttpRequest).open("GET",t,!0),e.responseType="arraybuffer",e.loadMIDI=this.loadMIDI.bind(this),e.onload=function(t){200==this.status&&this.loadMIDI(this.response)},e.send())},reset:()=>{for(let t=0;t<16;++t)this.setProgram(t,0),this.setBendRange(t,256),this.setModulation(t,0),this.setChVol(t,100),this.setPan(t,64),this.resetAllControllers(t),this.allSoundOff(t),this.rhythm[t]=0,this.tuningC[t]=0,this.tuningF[t]=0;this.masterTuningC=0,this.masterTuningF=0,this.rhythm[9]=1},stopMIDI:()=>{for(var t=this.playing=0;t<16;++t)this.allSoundOff(t)},playMIDI:()=>{if(this.song){const t=this.actx.createOscillator();t.connect(this.actx.destination),t.frequency.value=0,t.start(0),t.stop(this.actx.currentTime+.001),this.playTick>=this.maxTick&&(this.playTick=0,this.playIndex=0),this.playTime=this.actx.currentTime+.1,this.tick2Time=240/this.song.tempo/this.song.timebase,this.playing=1}},loadMIDI:r=>{function t(t,e){return(t[e]<<8)+t[e+1]}function u(t,e){return(t[e]<<24)+(t[e+1]<<16)+(t[e+2]<<8)+t[e+3]}function g(t,e,s){return String.fromCharCode.apply(null,t.slice(e,e+s))}function o(t,e){var s,i=0;for(c=1;128&(s=t[e]);)i=(i<<7)+(127&s),++c,++e;return(i<<7)+s}this.stopMIDI();var e=new Uint8Array(r),c=0,l=0,v=144,s=0,i=e.slice(0,4);if("77,84,104,100"==i.toString()){var a=u(e,4),p=(t(e,8),t(e,10)),r=(this.maxTick=0,4*t(e,12)),s=a+8;this.song={copyright:"",text:"",tempo:120,timebase:r,ev:[]};for(let t=0;t<p;++t){if(i=e.slice(s,s+4),a=u(e,s+4),"77,84,114,107"==i.toString()){var h=0,n=0;for(this.notetab.length=0;;){h+=o(e,s+8+n),n+=c;var d=function(t,e,s,i){var a=s[i];switch(c=1,0==(128&a)&&(a=v,c=0),240&(v=a)){case 192:case 208:t.ev.push({t:e,m:[a,s[i+c]]}),c+=1;break;case 240:switch(a){case 240:case 247:var h=o(s,i+1),n=(l=1+c,Array.from(s.slice(i+l,i+l+h)));n.unshift(240),t.ev.push({t:e,m:n}),c+=h+1;break;case 255:h=o(s,i+2);switch(l=2+c,c=h+c+2,s[i+1]){case 2:t.copyright+=g(s,i+l,c-3);break;case 1:case 3:case 4:case 9:t.text=g(s,i+l,c-l);break;case 47:return 1;case 81:var r=Math.floor(6e7/((s[r=i+3]<<16)+(s[r+1]<<8)+s[r+2]));t.ev.push({t:e,m:[65361,r]})}}break;default:t.ev.push({t:e,m:[a,s[i+c],s[i+c+1]]}),c+=2}return 0}(this.song,h,e,s+8+n);if(n+=c,d)break}h>this.maxTick&&(this.maxTick=h)}s+=a+8}this.song.ev.sort(function(t,e){return t.t-e.t}),this.reset(),this.locateMIDI(0)}},setQuality:t=>{null!=t&&(this.quality=t);for(let t=0;t<8;++t)this.setTimbre(0,t,this.program0[t]);if(this.quality)for(let t=0;t<this.program1.length;++t)this.setTimbre(0,t,this.program1[t])},setTimbre:(t,s,e)=>{const i={g:0,w:"sine",t:1,f:0,v:.5,a:0,h:.01,d:.01,s:0,r:.05,p:1,q:1,k:0};0==t&&0<=s&&s<=127&&(this.program[s].p=function(t){for(s=0;s<t.length;++s)for(var e in i)t[s].hasOwnProperty(e)&&void 0!==t[s][e]||(t[s][e]=i[e]);return t}(e))},_pruneNote:e=>{for(let t=e.o.length-1;0<=t;--t){if((e.o[t].frequency||e.o[t].playbackRate).cancelScheduledValues(0),e.g[t].gain.cancelScheduledValues(0),e.o[t].stop(),e.o[t].detune)try{this.chmod[e.ch].disconnect(e.o[t].detune)}catch(t){}e.g[t].gain.value=0}},_limitVoices:(t,e)=>{this.notetab.sort(function(t,e){return t.f!=e.f?t.f-e.f:t.e!=e.e?e.e-t.e:e.t-t.t});for(let t=this.notetab.length-1;0<=t;--t){var s=this.notetab[t];(this.actx.currentTime>s.e||t>=this.voices-1)&&(this._pruneNote(s),this.notetab.splice(t,1))}},_note:(e,s,i,u,g)=>{let a,h,n;const r=[],o=[],c=[],l=[],v=[];var p=440*Math.pow(2,(i-69+this.masterTuningC+this.tuningC[s]+(this.masterTuningF+this.tuningF[s]+this.scaleTuning[s][i%12]))/12);this._limitVoices(s,i);for(let t=0;t<g.length;++t){var d=e+(n=g[t]).a+n.h;0==n.g?(a=this.chvol[s],h=u*u/16384,l[t]=p*n.t+n.f):10<n.g?(a=o[n.g-11].gain,h=1,l[t]=l[n.g-11]*n.t+n.f):(h=r[n.g-1].frequency?(a=r[n.g-1].frequency,l[n.g-1]):(a=r[n.g-1].playbackRate,l[n.g-1]/440),l[t]=l[n.g-1]*n.t+n.f),"n"===n.w[0]?(r[t]=this.actx.createBufferSource(),r[t].buffer=this.noiseBuf[n.w],r[t].loop=!0,r[t].playbackRate.value=l[t]/440,1!=n.p&&this._setParamTarget(r[t].playbackRate,l[t]/440*n.p,e,n.q)):(r[t]=this.actx.createOscillator(),r[t].frequency.value=l[t],1!=n.p&&this._setParamTarget(r[t].frequency,l[t]*n.p,e,n.q),"w"==n.w[0]?r[t].setPeriodicWave(this.wave[n.w]):r[t].type=n.w),r[t].detune&&(this.chmod[s].connect(r[t].detune),r[t].detune.value=this.bend[s]),o[t]=this.actx.createGain(),v[t]=n.r,r[t].connect(o[t]),o[t].connect(a),c[t]=h*n.v,n.k&&(c[t]*=Math.pow(2,(i-60)/12*n.k)),n.a?(o[t].gain.value=0,o[t].gain.setValueAtTime(0,e),o[t].gain.linearRampToValueAtTime(c[t],e+n.a)):o[t].gain.setValueAtTime(c[t],e),this._setParamTarget(o[t].gain,n.s*c[t],d,n.d),r[t].start(e),this.rhythm[s]&&(r[t].onended=()=>{try{r[t].detune&&this.chmod[s].disconnect(r[t].detune)}catch(t){}},r[t].stop(e+g[0].d*this.releaseRatio))}this.rhythm[s]||this.notetab.push({t:e,e:99999,ch:s,n:i,o:r,g:o,t2:e+n.a,v:c,r:v,f:0})},_setParamTarget:(t,e,s,i)=>{0!=i?t.setTargetAtTime(e,s,i):t.setValueAtTime(e,s)},_releaseNote:(e,s)=>{if(9!=e.ch)for(let t=e.g.length-1;0<=t;--t)e.g[t].gain.cancelScheduledValues(s),s==e.t2?e.g[t].gain.setValueAtTime(e.v[t],s):s<e.t2&&e.g[t].gain.setValueAtTime(e.v[t]*(s-e.t)/(e.t2-e.t),s),this._setParamTarget(e.g[t].gain,0,s,e.r[t]);e.e=s+e.r[0]*this.releaseRatio,e.f=1},setModulation:(t,e,s)=>{this.chmod[t].gain.setValueAtTime(100*e/127,this._tsConv(s))},setChVol:(t,e,s)=>{this.vol[t]=3*e*e/16129,this.chvol[t].gain.setValueAtTime(this.vol[t]*this.ex[t],this._tsConv(s))},setPan:(t,e,s)=>{this.chpan[t]&&this.chpan[t].pan.setValueAtTime((e-64)/64,this._tsConv(s))},setExpression:(t,e,s)=>{this.ex[t]=e*e/16129,this.chvol[t].gain.setValueAtTime(this.vol[t]*this.ex[t],this._tsConv(s))},setSustain:(e,t,s)=>{if(this.sustain[e]=t,s=this._tsConv(s),t<64)for(let t=this.notetab.length-1;0<=t;--t){var i=this.notetab[t];s>=i.t&&i.ch==e&&1==i.f&&this._releaseNote(i,s)}},allSoundOff:e=>{for(let t=this.notetab.length-1;0<=t;--t){var s=this.notetab[t];s.ch==e&&(this._pruneNote(s),this.notetab.splice(t,1))}},resetAllControllers:t=>{this.bend[t]=0,this.ex[t]=1,this.rpnidx[t]=16383,this.sustain[t]=0,this.chvol[t]&&(this.chvol[t].gain.value=this.vol[t]*this.ex[t],this.chmod[t].gain.value=0)},setBendRange:(t,e)=>{this.brange[t]=e},setProgram:(t,e)=>{this.pg[t]=e},_tsConv:t=>(null==t||t<=0?(t=0,this.actx&&(t=this.actx.currentTime)):this.tsmode&&(t=.001*t-this.tsdiff),t),setBend:(e,t,s)=>{s=this._tsConv(s);var i=100*this.brange[e]/127;this.bend[e]=(t-8192)*i/8192;for(let t=this.notetab.length-1;0<=t;--t){const a=this.notetab[t];if(a.ch==e)for(let t=a.o.length-1;0<=t;--t)a.o[t].frequency&&a.o[t].detune&&a.o[t].detune.setValueAtTime(this.bend[e],s)}},noteOff:(e,s,i)=>{if(!this.rhythm[e]){i=this._tsConv(i);for(let t=this.notetab.length-1;0<=t;--t){const a=this.notetab[t];i>=a.t&&a.ch==e&&a.n==s&&0==a.f&&(a.f=1,this.sustain[e]<64&&this._releaseNote(a,i))}}},noteOn:(t,e,s,i)=>{0!=s?(i=this._tsConv(i),this.rhythm[t]||this._note(i,t,e,s,this.program[this.pg[t]].p)):this.noteOff(t,e,i)},setTsMode:t=>{this.tsmode=t},send:(e,t)=>{var s,i=15&e[0],a=-16&e[0];if(!(a<128||256<=a))switch("suspended"==this.audioContext.state&&this.audioContext.resume(),a){case 176:switch(e[1]){case 1:this.setModulation(i,e[2],t);break;case 7:this.setChVol(i,e[2],t);break;case 10:this.setPan(i,e[2],t);break;case 11:this.setExpression(i,e[2],t);break;case 64:this.setSustain(i,e[2],t);break;case 98:case 99:this.rpnidx[i]=16383;break;case 100:this.rpnidx[i]=16256&this.rpnidx[i]|e[2];break;case 101:this.rpnidx[i]=127&this.rpnidx[i]|e[2]<<7;break;case 6:switch(this.rpnidx[i]){case 0:this.brange[i]=(e[2]<<7)+(127&this.brange[i]);break;case 1:this.tuningF[i]=(e[2]<<7)+(this.tuningF[i]+8192&127)-8192;break;case 2:this.tuningC[i]=e[2]-64}break;case 38:switch(this.rpnidx[i]){case 0:this.brange[i]=16256&this.brange[i]|e[2];break;case 1:this.tuningF[i]=this.tuningF[i]+8192&16256|e[2]-8192}break;case 120:case 123:case 124:case 125:case 126:case 127:this.allSoundOff(i);break;case 121:this.resetAllControllers(i)}break;case 192:this.setProgram(i,e[1]);break;case 224:this.setBend(i,e[1]+(e[2]<<7),t);break;case 144:this.noteOn(i,e[1],e[2],t);break;case 128:this.noteOff(i,e[1],t);break;case 240:if(255==e[0]){this.reset();break}if(254!=e[0]&&this.debug){var h=[];for(let t=0;t<e.length;++t)h.push(e[t].toString(16))}240==e[0]&&(127==e[1]&&4==e[3]&&(3==e[4]&&8<=e.length&&(this.masterTuningF=(128*e[6]+e[5]-8192)/8192),4==e[4]&&8<=e.length&&(this.masterTuningC=e[6]-64)),65==e[1]&&66==e[3]&&18==e[4]&&64==e[5]&&(16==(240&e[6])&&11==e.length?(s=[9,0,1,2,3,4,5,6,7,8,10,11,12,13,14,15][15&e[6]],21==e[7]?this.rhythm[s]=e[8]:64<=e[7]&&e[7]<=75&&(this.scaleTuning[s][e[7]-64]=(e[8]-64)/100)):0==e[6]&&(0==e[7]&&14==e.length?this.masterTuningF=(4096*e[8]+256*e[9]+16*e[10]+e[11]-1024)/1e3:5==e[7]&&11==e.length&&(this.masterTuningC=e[8]-64))))}},_createWave:e=>{const s=new Float32Array(e.length);var t=new Float32Array(e.length);for(let t=1;t<e.length;++t)s[t]=e[t];return this.actx.createPeriodicWave(t,s)},getAudioContext:()=>this.actx,setAudioContext:(t,e)=>{this.audioContext=this.actx=t,(this.dest=e)||(this.dest=t.destination),this.tsdiff=.001*performance.now()-this.actx.currentTime,this.out=this.actx.createGain(),this.comp=this.actx.createDynamicsCompressor();var s=.5*this.actx.sampleRate|0,i=(this.convBuf=this.actx.createBuffer(2,s,this.actx.sampleRate),this.noiseBuf={},this.noiseBuf.n0=this.actx.createBuffer(1,s,this.actx.sampleRate),this.noiseBuf.n1=this.actx.createBuffer(1,s,this.actx.sampleRate),this.convBuf.getChannelData(0)),a=this.convBuf.getChannelData(1),h=this.noiseBuf.n0.getChannelData(0),n=this.noiseBuf.n1.getChannelData(0);for(let t=0;t<s;++t)t/s<Math.random()&&(i[t]=Math.exp(-3*t/s)*(Math.random()-.5)*.5,a[t]=Math.exp(-3*t/s)*(Math.random()-.5)*.5),h[t]=2*Math.random()-1;for(let t=0;t<64;++t){var r=10*Math.random()+1,o=10*Math.random()+1;for(let t=0;t<s;++t){var c=Math.sin(t/s*2*Math.PI*440*r)*Math.sin(t/s*2*Math.PI*440*o);n[t]+=c/8}}this.useReverb&&(this.conv=this.actx.createConvolver(),this.conv.buffer=this.convBuf,this.rev=this.actx.createGain(),this.rev.gain.value=this.reverbLev,this.out.connect(this.conv),this.conv.connect(this.rev),this.rev.connect(this.comp)),this.setMasterVol(),this.out.connect(this.comp),this.comp.connect(this.dest),this.chvol=[],this.chmod=[],this.chpan=[],this.wave={w9999:this._createWave("w9999")},this.lfo=this.actx.createOscillator(),this.lfo.frequency.value=5,this.lfo.start(0);for(let t=0;t<16;++t)this.chvol[t]=this.actx.createGain(),this.actx.createStereoPanner?(this.chpan[t]=this.actx.createStereoPanner(),this.chvol[t].connect(this.chpan[t]),this.chpan[t].connect(this.out)):(this.chpan[t]=null,this.chvol[t].connect(this.out)),this.chmod[t]=this.actx.createGain(),this.lfo.connect(this.chmod[t]),this.pg[t]=0,this.resetAllControllers(t);this.setReverbLev(),this.reset(),this.send([144,60,1]),this.send([144,60,0])}})}class t{constructor(t){for(var e in s.bind(this)(this),this.properties)this[e]=this.properties[e].value;this.setQuality(1),t&&(null!=t.useReverb&&(this.useReverb=t.useReverb),null!=t.quality&&this.setQuality(t.quality),null!=t.voices&&this.setVoices(t.voices)),this.init()}}"object"==typeof exports&&"undefined"!=typeof module?module.exports=t:"function"==typeof define&&define.amd?define(function(){return t}):e.WebAudioTinySynth=t}(this);