import { Component, ElementRef, HostListener, ViewChild } from '@angular/core'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @ViewChild('navToggle', { static: true }) public navToggle!: ElementRef

  public istoggle = false

  constructor() {}

  @HostListener('document:click', ['$event'])
  public handleNavbarToggle(event: Event): void {
    this.istoggle =
      event.target === this.navToggle.nativeElement ? !this.istoggle : false
  }
}
