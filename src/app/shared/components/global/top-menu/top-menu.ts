import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Component({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  selector: 'app-top-menu',
  styleUrl: './top-menu.css',
  templateUrl: './top-menu.html',
})
export class TopMenu implements OnInit, OnDestroy {
  appLogo = '/img/logo.png'

  rotaAtual: String = '';
  inscricaoRota!: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.rotaAtual = this.router.url;

    this.inscricaoRota = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((evento: any) => {
        this.rotaAtual = evento.url;
      });
  }

  ngOnDestroy(): void {
    this.inscricaoRota.unsubscribe();
  }

  estaNaRotaRegister(): boolean {
    return this.rotaAtual === '/register'
  }

}
