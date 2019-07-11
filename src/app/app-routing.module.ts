import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactListComponent} from './components/contact-list/contact-list.component';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import {ContactEditComponent} from './components/contact-edit/contact-edit.component';


const routes: Routes = [
  { path: '', component: ContactListComponent},
  { path: 'addContact', component: ContactFormComponent },
  { path: 'contacts',
    component: ContactListComponent,
    runGuardsAndResolvers: 'always'},
  { path: 'contacts/:id', component: ContactEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
