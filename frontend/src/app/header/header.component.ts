import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizationService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { catchError, debounceTime, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
   authService = inject(AuthorizationService);
  constructor() {
  }
ngOnInit(): void {

}

logout(){
  this.authService.logout();
}
}
