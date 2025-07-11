import { Component } from '@angular/core';
import { MATERIAL_MODULES } from '../shared/material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [MATERIAL_MODULES, CommonModule, ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss'
})
export class AddNoteComponent {
noteForm!:FormGroup;
  constructor(private fb: FormBuilder, private noteService: NotesService){}

ngOnInit(): void {
this.noteForm = this.fb.group({
category: ['', Validators.required],
title: ['', Validators.required],
content: ['', Validators.required],
date: ['', Validators.required],
})
}
onSubmit(){
if(this.noteForm.valid){
this.noteService.createNote(this.noteForm.value).subscribe({
      next: (res) => {
        console.log('Note created and all notes updated', res);
        this.noteForm.reset(); // optional
      },
      error: (err) => {
        console.error('Error creating note', err);
      }
    });
}
}
}
