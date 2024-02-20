import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavFreshComponent } from '../components/nav-fresh/nav-fresh.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-fresh-layout',
  standalone: true,
  imports: [CommonModule,NavFreshComponent,RouterOutlet,FooterComponent],
  templateUrl: './fresh-layout.component.html',
  styleUrls: ['./fresh-layout.component.scss']
})
export class FreshLayoutComponent {

}
