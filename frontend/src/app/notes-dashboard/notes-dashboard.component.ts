import { Component, inject } from '@angular/core';
import { MATERIAL_MODULES } from '../shared/material';
import { CommonModule } from '@angular/common';
import { SessionTimeoutService } from '../session/session-timeout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../add-note/add-note.component';
import { NotesService } from '../services/notes.service';
import { Note } from '../model/interface';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [MATERIAL_MODULES, CommonModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrl: './notes-dashboard.component.scss'
})
export class NotesDashboardComponent {
  noteForm!: FormGroup;
 notes: Note []= [];
  constructor(private sessionTimeoutService: SessionTimeoutService, private fb: FormBuilder, private noteService: NotesService){}
readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.noteService.getAllNotes().subscribe();
    this.sessionTimeoutService.startTracking();
    this.noteService.allNotes$.subscribe(res =>{
      this.notes = res;
    });
  }
  addNote(){
    const dialogRef = this.dialog.open(AddNoteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
