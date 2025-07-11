import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { Note } from "../model/interface";

@Injectable({
    providedIn:'root'
})
export class NotesService {
    constructor(private http: HttpClient){}

    private saveNotesData = new BehaviorSubject<Note[]>([])
    allNotes$ = this.saveNotesData.asObservable();


    createNote(noteData: any){
        return this.http.post('http://localhost:3000/api/notes', noteData).pipe(tap((notes: any) => this.saveNotesData.next(notes?.notes)));
    }

    getAllNotes(){
        return this.http.get('http://localhost:3000/api/allNotes').pipe(tap((notes: any) => this.saveNotesData.next(notes?.notes)));
    }
}