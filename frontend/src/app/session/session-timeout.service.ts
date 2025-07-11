import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { SessionTimeoutComponent } from "../session-timeout/session-timeout.component";
import { AuthorizationService } from "../services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class SessionTimeoutService {
  private idleTimer!: ReturnType<typeof setTimeout>;
  private warningTimer!: ReturnType<typeof setTimeout>;

  idleThreshold = 1 * 60 * 1000; // 2 mins
  sessionTimeout = 5 * 60 * 1000; // 5 mins
  private boundResetTimers = this.resetTimers.bind(this);
  constructor(private dialog: MatDialog, private auth: AuthorizationService, @Inject(PLATFORM_ID) private platformId: Object,) {}

  startTracking() {
    if (isPlatformBrowser(this.platformId)) {
      this.resetTimers();
      window.addEventListener('mousemove', this.boundResetTimers);
      window.addEventListener('keydown', this.boundResetTimers);
    }
  }

  private resetTimers() {
    clearTimeout(this.idleTimer);
    clearTimeout(this.warningTimer);

    // After 2 mins of no interaction, show popup
    this.idleTimer = setTimeout(() => this.showWarning(), this.idleThreshold);
  }

  private showWarning() {
    const dialogRef = this.dialog.open(SessionTimeoutComponent, {
      width: '400px',
      disableClose: true,
    });

    let counter = 120; // 2 min countdown
    const interval = setInterval(() => {
      dialogRef.componentInstance.counter = counter--;
    }, 1000);

    this.warningTimer = setTimeout(() => {
      clearInterval(interval);
      dialogRef.close();
      this.auth.logout();
    }, 1 * 60 * 1000);

    dialogRef.afterClosed().subscribe(result => {
      clearInterval(interval);
      clearTimeout(this.warningTimer);

      if (result === 'continue') {
        this.auth.refreshToken().subscribe(); // refresh session on backend
        this.resetTimers(); // continue session
      } else {
        this.auth.logout(); // auto logout
      }
    });
  }

  stopTracking(){
    clearTimeout(this.idleTimer);
    clearTimeout(this.warningTimer);
    window.removeEventListener('mousemove', this.boundResetTimers); // Works correctly now
    window.removeEventListener('keydown', this.boundResetTimers);
  }
}
