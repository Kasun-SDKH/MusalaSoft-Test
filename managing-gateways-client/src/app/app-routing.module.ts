import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(
        (landingPage) => landingPage.LandingPageModule,
      ),
  },
  {
    path: 'manage-gateway',
    loadChildren: () =>
      import('./managing-gateways/managing-gateways.module').then(
        (landingPage) => landingPage.ManagingGatewaysModule,
      ),
  },
  {
    path: 'user-guide',
    loadChildren: () =>
      import('./user-guide/user-guide.module').then(
        (landingPage) => landingPage.UserGuideModule,
      ),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
