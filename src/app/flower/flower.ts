import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-flower',
  imports: [],
  templateUrl: './flower.html',
  styleUrl: './flower.css',
})
export class Flower {
  petals = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    color: `hsl(${(i * 40) % 360}, 70%, 60%)`,
    strokeColor: `hsl(${(i * 40) % 360}, 70%, 40%)`,
  }));
  petalSegment = 360 / this.petals.length;
  isRotating = signal(false);
  highlightedPetals = signal<Set<number>>(new Set());

  showHeart = signal(false);
  pulseHeart = signal(false);

  rotate() {
    this.isRotating.update((rotating) => !rotating);
  }

  petalClicked(i: number) {
    this.highlightedPetals.update((highlighted) => {
      const newSet = new Set(highlighted);
      this.flipPetal(i - 1, newSet);
      this.flipPetal(i, newSet);
      this.flipPetal(i + 1, newSet);
      return newSet;
    });
  }

  flipPetal(i: number, highlighted: Set<number>): Set<number> {
    i = i % this.petals.length;
    if (highlighted.has(i)) {
      highlighted.delete(i);
    } else {
      highlighted.add(i);
    }
    return highlighted;
  }

  isHighlighted(i: number): boolean {
    return this.highlightedPetals().has(i);
  }

  toggleHeart() {
    this.showHeart.update((show) => !show);
  }

  togglePulse() {
    this.pulseHeart.update((pulse) => !pulse);
  }
}
