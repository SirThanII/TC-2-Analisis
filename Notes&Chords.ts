export class note{
    noteValue:number;
    noteDuration:number;
    noteBegining:number;
    chordValue:number;

    constructor(noteValue:number,noteDuration:number,noteBegining:number){
        this.noteValue=noteValue;
        this.noteDuration=noteDuration;
        this.noteBegining=noteBegining;
        this.chordValue=0;
    }
}

export class Chord{
    Notas:note[]=new Array();
    chordValue:number;
    currentNotes:number;

    constructor(){
        this.chordValue=0;
        this.currentNotes=0;
    }

    addNote(nota:note,wasAble: boolean):void{//attempt 2 add a note 2 the chord
        if(this.currentNotes==3){
            wasAble= false;// a chord cant have more than 3 notes
        }
        else{
            if(this.currentNotes!=0){
                if(this.Notas[this.currentNotes-1].noteBegining+400<nota.noteBegining){
                    wasAble= true;
                }
            }
            this.Notas[this.currentNotes]=nota;
            this.currentNotes++;
            wasAble= true;//adds the chord and tells that it could be added
        }
    }
}




