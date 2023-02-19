import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LandingPageComponent } from './landing-page/landing-page.component'
import { LandingPageRoutingModule } from './landing-page-routing.module'
import { MainPageComponent } from './main-page/main-page.component'

@NgModule({
  declarations: [LandingPageComponent, MainPageComponent],
  imports: [CommonModule, LandingPageRoutingModule],
})
export class LandingPageModule {}
