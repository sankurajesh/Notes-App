import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesComponent, BrowserAnimationsModule],
      providers: [
            provideHttpClient(),  
            
          ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
