import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelfDrawing } from './self-drawing/self-drawing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SelfDrawing],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('svg-animations');
}
