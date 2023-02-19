import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserGuideRoutingModule } from './user-guide-routing.module';
import { UserGuideComponent } from './user-guide/user-guide.component';


@NgModule({
  declarations: [
    UserGuideComponent
  ],
  imports: [
    CommonModule,
    UserGuideRoutingModule
  ]
})
export class UserGuideModule { }
