import { Component } from '@angular/core';
import { MATERIAL_MODULES } from '../shared/material';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

}
