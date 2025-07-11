import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MATERIAL_MODULES } from '../shared/material';

@Component({
  selector: 'app-session-timeout',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './session-timeout.component.html',
  styleUrl: './session-timeout.component.scss'
})
export class SessionTimeoutComponent {
public counter: number = 120; // ✅ declare as public

  constructor(private dialogRef: MatDialogRef<SessionTimeoutComponent>) {}

  continue() {
    this.dialogRef.close('continue');
  }
}
