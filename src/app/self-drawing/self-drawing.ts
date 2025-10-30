import { Component, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-self-drawing',
  imports: [],
  templateUrl: './self-drawing.html',
  styleUrl: './self-drawing.css',
})
export class SelfDrawing {
  isVisible = signal(false);

  draw(): void {
    this.isVisible.update((visible) => !visible);
  }
}
