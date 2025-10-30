import { Component, signal, ViewChild } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-self-drawing',
    imports: [
        NgClass
    ],
  templateUrl: './self-drawing.html',
  styleUrl: './self-drawing.css',
})
export class SelfDrawing {
  isVisible = signal(true);
  doCasinoLights = signal(false);

  draw(): void {
    this.isVisible.update((visible) => !visible);
  }

  toggleCasinoLights(): void {
    this.doCasinoLights.update((cl) => !cl);
  }
}
