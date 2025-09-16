import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';
import { SessionTimeoutService } from './session/session-timeout.service';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from './shared/material';
import { filter } from 'rxjs/operators';
import { AuthorizationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule, MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isCentered = false;
  title = "frontend-app"
  isLoggedIn: (boolean | null) = null;
  constructor(private router: Router, private sessionTimeout: SessionTimeoutService, private authService: AuthorizationService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).
  subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.isCentered = url === '/login' || url === '/registration' || url === '/';
      
    });
  }

ngOnInit() {
 
}
}
