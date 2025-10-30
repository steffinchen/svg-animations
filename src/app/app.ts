import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BasicAnimations } from './basic-animations/basic-animations.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BasicAnimations, BasicAnimations, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
