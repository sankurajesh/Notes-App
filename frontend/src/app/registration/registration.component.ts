import { Component } from '@angular/core';
import { MATERIAL_MODULES } from '../shared/material';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthorizationService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  regForm!:FormGroup
constructor(private fb: FormBuilder, private service: AuthorizationService){

}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.regForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })
  
}
onSubmit(){
if(this.regForm.valid)
this.service.createNewAccount(this.regForm.value).subscribe(res =>{
  console.log('registration', res)
})
}
}
