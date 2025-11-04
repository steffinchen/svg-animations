import { Component, signal } from '@angular/core';
import { random } from '../utils';
import { Firework, Particle } from './firework/firework';

@Component({
  selector: 'app-fireworks',
  imports: [Firework],
  templateUrl: './fireworks.html',
  styleUrl: './fireworks.css',
})
export class Fireworks {
  colors = ['#2E9598', '#F7DB69', '#F26A44', '#EC1B4B', '#A8216B'];

  firework = signal([] as Particle[]);

  colorful = Array.from({ length: 100 }).map(() => ({
    angle: random(0, 360),
    distance: random(20, 300),
    color: this.colors[random(0, this.colors.length)],
  }));

  smallRed = Array.from({ length: 200 }).map(() => ({
    angle: random(0, 360),
    distance: random(10, 150),
    color: '#EC1B4B',
  }));

  directionalGreen = Array.from({ length: 150 }).map(() => ({
    angle: random(-40, 0),
    distance: random(50, 250),
    color: '#2E9598',
  }));

  launchFirework() {
    this.firework.set(this.colorful);
    setTimeout(() => {
      this.firework.set(this.smallRed);
      setTimeout(() => {
        this.firework.set(this.directionalGreen);
      }, 800);
    }, 800);
  }
}
