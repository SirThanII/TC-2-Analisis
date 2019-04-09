import {MidiPlayer} from './midi-player';
import {Chord, note,getLongerTrail,pasingNumber} from "./Notes&Chords";


const SONG_DURATION = 2 *  60 * 1000; // 2 minutes song milisegundos
const minNoteDuration = 200;
const noteDuration = 1200; // 1.2 seconds note
const song : number[][] = []; // [[midiNote, duration, timeline]]
const minNote = 20;
const maxNote = 120;
const NOTES_PER_SECOND = 5;
const AMOUNT_OF_NOTES = SONG_DURATION / 1000 * NOTES_PER_SECOND;

for (let i = 0; i < AMOUNT_OF_NOTES; i++) { // intentando que el random me lleve a 3 notas overlap en los mismos 2 segundos
  song.push([
    Math.floor(Math.random() * (maxNote - minNote) + minNote), // note
    Math.floor(Math.random() * (noteDuration - minNoteDuration) + minNoteDuration), // note duration
    Math.random() * SONG_DURATION]); // timeline
}

const SortedSong= new MidiPlayer(song);
let Acordes:Array<Chord>=new Array();
let nota:note;var insertada:boolean=true;
Acordes[0]=new Chord();
for(let i=0,x=0;i<SortedSong.song.length;){
  nota=new note(SortedSong.song[i][0],SortedSong.song[i][1],SortedSong.song[i][2])
  if(Acordes[x].addNote(nota)){
    i++;
    //console.log(Acordes[x]);
  }
  else{
    if(Acordes[x].currentNotes==3){
      //console.log("Cambio de acorde");
      //console.log(Acordes[x]);
      x++;
    }
    Acordes[x]=new Chord;   
  }
  
}
if(Acordes[Acordes.length-1].currentNotes!=3)
  Acordes.pop();
  //console.log(Acordes[x]);

var maxChordValue:number=0;
var chosenPos:Array<number>=new Array();
var tempPos:Array<number>=new Array();
//var sumadoSoFar:pasingNumber= new pasingNumber();
//sumadoSoFar.numero=0;
for(let i=0;i<Acordes.length;i++){  
  if(Acordes[i].chordValue==0){
    tempPos=new Array();
    getLongerTrail(Acordes,i,tempPos);    
  }
  if(Acordes[i].chordValue>maxChordValue){
    maxChordValue=Acordes[i].chordValue;
    chosenPos=tempPos;
  }
  //sumadoSoFar.numero=0;
  
}

console.log("Camino mas largo:");
console.log(chosenPos.length);
chosenPos.sort();let cantAcordes=0;
for(let k=0;k<chosenPos.length;k++){
  if(!Acordes[chosenPos[k]].marcado){
    console.log(Acordes[chosenPos[k]]);
    Acordes[chosenPos[k]].marcado=true;
    cantAcordes++;
  }
}
console.log("Con una longitud de:",maxChordValue);
console.log("con ",cantAcordes," cantidad de acordes");

//console.log(Acordes);

