"use strict";
exports.__esModule = true;
var note = /** @class */ (function () {
    function note(noteValue, noteDuration, noteBegining) {
        this.noteValue = noteValue;
        this.noteDuration = noteDuration;
        this.noteBegining = noteBegining;
        this.chordValue = 0;
    }
    return note;
}());
exports.note = note;
var Chord = /** @class */ (function () {
    function Chord() {
        this.Notas = new Array();
        this.chordValue = 0;
        this.currentNotes = 0;
    }
    Chord.prototype.addNote = function (nota, wasAble) {
        if (this.currentNotes == 3) {
            wasAble = false; // a chord cant have more than 3 notes
        }
        else {
            if (this.currentNotes != 0) {
                if (this.Notas[this.currentNotes - 1].noteBegining + 400 < nota.noteBegining) {
                    wasAble = true;
                }
            }
            this.Notas[this.currentNotes] = nota;
            this.currentNotes++;
            wasAble = true; //adds the chord and tells that it could be added
        }
    };
    return Chord;
}());
exports.Chord = Chord;
