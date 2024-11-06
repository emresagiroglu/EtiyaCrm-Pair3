
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { CustomerSearchComponent } from './shared/components/customer-search/customer-search.component';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { CustomerCreateComponent } from './shared/components/customer-create/customer-create.component';
import { AddressInfoComponent } from './shared/components/address-info/address-info.component';
import { CustomerAccountComponent } from './shared/components/customer-account/customer-account.component';
import { SaleSelectionComponent } from './shared/components/sale-selection/sale-selection.component';
import { CustomerUpdateComponent } from './shared/components/customer-update/customer-update.component';
import { CustomerInfoComponent } from './shared/components/customer-info/customer-info.component';
import {CustomerCreatePageComponent} from './shared/pages/customer-create-page/customer-create-page.component'
import { tokenGuard } from './shared/guards/token.guard';
import { ContactMediumComponent } from './shared/components/contact-medium/contact-medium.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'customer-search', canActivate: [tokenGuard], component: CustomerSearchComponent },
  { path: 'customer-create', canActivate: [tokenGuard], component: CustomerCreateComponent },
  { path: 'customer-account', canActivate: [tokenGuard], component: CustomerAccountComponent },
  { path: 'address-info', canActivate: [tokenGuard], component: AddressInfoComponent },
  { path: 'sale-selection', canActivate: [tokenGuard], component: SaleSelectionComponent },
  { path: 'customer-update', canActivate: [tokenGuard], component: CustomerUpdateComponent },
  {path: 'customer-info/:id', canActivate: [tokenGuard], component : CustomerInfoComponent},
  {path: 'contact-medium', canActivate: [tokenGuard], component: ContactMediumComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
