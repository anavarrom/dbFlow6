import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './shared/guards/auth.guard';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';

import { PUBLIC_ROUTES } from './public/public.routes';
import { SECURE_ROUTES } from './secure/secure.routes';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full', },
    { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
    { path: '', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
