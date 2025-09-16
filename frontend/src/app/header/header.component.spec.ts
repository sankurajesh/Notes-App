import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {of} from 'rxjs'

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
       providers: [
              provideHttpClient(), 
              {
                      provide: ActivatedRoute,
                      useValue: {
                        params: of({ id: '123' }),  // mock route params
                        queryParams: of({}),
                        snapshot: { paramMap: new Map() }
                      }
                    }             // ✅ add this
            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
