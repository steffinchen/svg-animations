import { Component, signal, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-basic-animations',
  imports: [NgClass],
  templateUrl: './basic-animations.component.html',
  styleUrl: './basic-animations.component.css',
})
export class BasicAnimations {
  isVisible = signal(true);
  doCasinoLights = signal(false);

  draw(): void {
    this.isVisible.update((visible) => !visible);
  }

  toggleCasinoLights(): void {
    this.doCasinoLights.update((cl) => !cl);
  }
}
