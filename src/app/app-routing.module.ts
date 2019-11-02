import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard';


const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
    },
    {
      path: '',
      loadChildren: () => import('./user/user.module').then(mod => mod.UserModule),
      canLoad: [IsLoggedInGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
