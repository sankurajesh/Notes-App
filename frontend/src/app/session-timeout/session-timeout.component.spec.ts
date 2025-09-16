import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimeoutComponent } from './session-timeout.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('SessionTimeoutComponent', () => {
  let component: SessionTimeoutComponent;
  let fixture: ComponentFixture<SessionTimeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTimeoutComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },   // ✅ mock dialog ref
        { provide: MAT_DIALOG_DATA, useValue: {} } // ✅ mock dialog data
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
