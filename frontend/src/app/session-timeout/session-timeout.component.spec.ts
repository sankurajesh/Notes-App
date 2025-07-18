import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimeoutComponent } from './session-timeout.component';

describe('SessionTimeoutComponent', () => {
  let component: SessionTimeoutComponent;
  let fixture: ComponentFixture<SessionTimeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTimeoutComponent]
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
