import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserContactListComponent } from './user-contact-list/user-contact-list.component';
//import { UserContactComponent } from './user-contact/user-contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/contactList', pathMatch: 'full' },
  { path: 'contactList', component: UserContactListComponent },
  //{path:'contact',component:UserContactComponent},
  { path: '**', component: UserContactListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
