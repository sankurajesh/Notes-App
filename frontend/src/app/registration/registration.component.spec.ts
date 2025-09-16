import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {of} from 'rxjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),  
        {
                provide: ActivatedRoute,
                useValue: {
                  params: of({ id: '123' }),  // mock route params
                  queryParams: of({}),
                  snapshot: { paramMap: new Map() }
                }
              }            // ✅ add this
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
