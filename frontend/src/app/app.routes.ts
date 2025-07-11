import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch:'full'},
    {path:'registration', component:RegistrationComponent},
    {path:'notes', component: NotesComponent},
    {path:'**', component:LoginComponent}
];
