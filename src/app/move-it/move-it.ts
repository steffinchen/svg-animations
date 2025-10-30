import { Component, signal } from '@angular/core';
import { random } from '../utils';

@Component({
  selector: 'app-move-it',
  imports: [],
  templateUrl: './move-it.html',
  styleUrl: './move-it.css',
})
export class MoveIt {
  height = 360;
  width = 600;
  step = 15;

  r = signal(10);
  cx = signal(this.width / 2);
  cy = signal(this.height / 2);
  color1 = signal(`hsl(${random(0, 360)}, 100%, 50%)`);
  color2 = signal(`hsl(${random(0, 360)}, 100%, 50%)`);

  initialParticles = Array.from({ length: 20 }, (_, i) => ({
    i: i,
    x: random(0, this.width),
    y: random(0, this.height),
    color: `hsl(${random(0, 360)}, 100%, 50%)`,
  }));
  particles = signal(this.initialParticles);

  keydown($event: KeyboardEvent) {
    switch ($event.key) {
      case 'ArrowUp':
        this.cy.update((y) => Math.max(this.r(), y - this.step));
        break;
      case 'ArrowDown':
        this.cy.update((y) => Math.min(this.height - this.r(), y + this.step));
        break;
      case 'ArrowLeft':
        this.cx.update((x) => Math.max(this.r(), x - this.step));
        break;
      case 'ArrowRight':
        this.cx.update((x) => Math.min(this.width - this.r(), x + this.step));
        break;
    }
    this.checkParticleCollision();
  }

  checkParticleCollision() {
    const filtered = this.particles().filter((p) => {
      const dx = p.x - this.cx();
      const dy = p.y - this.cy();
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.r()) {
        this.r.update((r) => r + 1);
        this.color1.set(this.color2());
        this.color2.set(p.color);
        return false;
      }
      return true;
    });
    this.particles.set(filtered);
  }
}
