import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteComponent } from './add-note.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNoteComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideNativeDateAdapter(),             
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
