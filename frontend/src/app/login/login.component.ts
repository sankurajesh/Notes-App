import { Component } from '@angular/core';
import { MATERIAL_MODULES } from '../shared/material';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthorizationService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MATERIAL_MODULES, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!:FormGroup;
constructor(private fb: FormBuilder, private service: AuthorizationService, private router: Router){

}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })
  
}
onSubmit(){
if(this.loginForm.valid){
  this.service.userLogin(this.loginForm.value).subscribe((res:any) =>{
    if(res.success){
      this.service.login(res.token);
      this.router.navigate(['/notes']);
    }
  })
}
}
}
