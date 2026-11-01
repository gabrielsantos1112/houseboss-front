import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  selector: 'app-top-menu',
  styleUrl: './top-menu.css',
  templateUrl: './top-menu.html',
})
export class TopMenu { 
  appLogo = '/img/logo.png'
}
