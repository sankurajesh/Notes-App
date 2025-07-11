import { Component } from '@angular/core';
import { MATERIAL_MODULES } from '../shared/material';
import { NotesDashboardComponent } from '../notes-dashboard/notes-dashboard.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [MATERIAL_MODULES, NotesDashboardComponent, SideNavComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

}
