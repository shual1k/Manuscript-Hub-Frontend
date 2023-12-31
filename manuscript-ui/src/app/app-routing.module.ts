import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/pages/dashboard/dashboard.component";
import {RouterEnum} from "./enums/RouterEnum";
import {DocumentDetailsComponent} from "./components/pages/document-details/document-details.component";
import {LoginComponent} from "./components/pages/account/login/login.component";
import {MainComponent} from "./components/main/main.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {RegisterComponent} from "./components/pages/account/register/register.component";
import {InvitationsComponent} from "./components/invitations/invitations.component";

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard],

    children: [
      {path: RouterEnum.Dashboard, component: DashboardComponent},
      {path: 'InvitationRequests', component: InvitationsComponent},

      {path: RouterEnum.DocumentDetail + '/:' + RouterEnum.DocumentId,
        component: DocumentDetailsComponent,}
    ]
  },

  {path: 'login', component: LoginComponent},

  {path: 'register', component: RegisterComponent},

  {path: RouterEnum.Home, component: MainComponent},

  {path: '**', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
