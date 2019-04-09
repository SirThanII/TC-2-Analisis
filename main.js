"use strict";
exports.__esModule = true;
var midi_player_1 = require("./midi-player");
var Notes_Chords_1 = require("./Notes&Chords");
var SONG_DURATION = 2 * 60 * 1000; // 2 minutes song milisegundos
var minNoteDuration = 200;
var noteDuration = 1200; // 1.2 seconds note
var song = []; // [[midiNote, duration, timeline]]
var minNote = 20;
var maxNote = 120;
var NOTES_PER_SECOND = 5;
var AMOUNT_OF_NOTES = SONG_DURATION / 1000 * NOTES_PER_SECOND;
for (var i = 0; i < AMOUNT_OF_NOTES; i++) { // intentando que el random me lleve a 3 notas overlap en los mismos 2 segundos
    song.push([
        Math.floor(Math.random() * (maxNote - minNote) + minNote),
        Math.floor(Math.random() * (noteDuration - minNoteDuration) + minNoteDuration),
        Math.random() * SONG_DURATION
    ]); // timeline
}
var SortedSong = new midi_player_1.MidiPlayer(song);
var Acordes = new Array();
var nota;
var insertada = true;
Acordes[0] = new Notes_Chords_1.Chord();
for (var i = 0, x = 0; i < SortedSong.song.length;) {
    nota = new Notes_Chords_1.note(SortedSong.song[i][0], SortedSong.song[i][1], SortedSong.song[i][2]);
    if (Acordes[x].addNote(nota)) {
        i++;
        //console.log(Acordes[x]);
    }
    else {
        if (Acordes[x].currentNotes == 3) {
            //console.log("Cambio de acorde");
            //console.log(Acordes[x]);
            x++;
        }
        Acordes[x] = new Notes_Chords_1.Chord;
    }
}
if (Acordes[Acordes.length - 1].currentNotes != 3)
    Acordes.pop();
//console.log(Acordes[x]);
var maxChordValue = 0;
var chosenPos = new Array();
var tempPos = new Array();
//var sumadoSoFar:pasingNumber= new pasingNumber();
//sumadoSoFar.numero=0;
for (var i = 0; i < Acordes.length; i++) {
    if (Acordes[i].chordValue == 0) {
        tempPos = new Array();
        Notes_Chords_1.getLongerTrail(Acordes, i, tempPos);
    }
    if (Acordes[i].chordValue > maxChordValue) {
        maxChordValue = Acordes[i].chordValue;
        chosenPos = tempPos;
    }
    //sumadoSoFar.numero=0;
}
console.log("Camino mas largo:");
console.log(chosenPos.length);
chosenPos.sort();
var cantAcordes = 0;
for (var k = 0; k < chosenPos.length; k++) {
    if (!Acordes[chosenPos[k]].marcado) {
        console.log(Acordes[chosenPos[k]]);
        Acordes[chosenPos[k]].marcado = true;
        cantAcordes++;
    }
}
console.log("Con una longitud de:", maxChordValue);
console.log("con ", cantAcordes, " cantidad de acordes");
//console.log(Acordes);
