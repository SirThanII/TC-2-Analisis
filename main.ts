import {MidiPlayer} from './midi-player';
import {Chord, note} from "./Notes&Chords";


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

console.log(SortedSong);

let Acordes:Array<Chord>=new Array();
let nota:note;
let insertada:boolean=true;
for(let i=0,x=0;i<SortedSong.song.length;){
  nota=new note(SortedSong.song[i][0],SortedSong.song[i][1],SortedSong.song[i][2])
  Acordes[x].addNote(nota,insertada);
  if(insertada)
    i++;
  else
    x++;
}

console.log(Acordes);

