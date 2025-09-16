import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDashboardComponent } from './notes-dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import {of} from 'rxjs'

describe('NotesDashboardComponent', () => {
  let component: NotesDashboardComponent;
  let fixture: ComponentFixture<NotesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesDashboardComponent, BrowserAnimationsModule   ],
       providers: [
              provideHttpClient(),     
               {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: '123' }),   // mock route params
          queryParams: of({}),
          snapshot: { paramMap: new Map() }
        }
      }         // ✅ add this
            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
