import { Component, input } from '@angular/core';

export type Particle = {
  angle: number;
  distance: number;
  color: string;
};

@Component({
  selector: 'app-firework',
  imports: [],
  templateUrl: './firework.html',
  styleUrl: './firework.css',
})
export class Firework {
  firework = input.required<Particle[]>();

  getParticleStyle(particle: Particle) {
    return `--angle: ${particle.angle}deg; --distance: ${particle.distance}px; --color: ${particle.color};`;
  }
}
