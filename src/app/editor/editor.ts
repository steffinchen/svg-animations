import { Component, effect, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { predefinedAnimations } from './animations';

type PredefinedAnimation = {
  name: string;
  css: string;
  keyframes: string;
};

@Component({
  selector: 'app-editor',
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor {
  svgHeight = 320;
  svgWidth = 280;

  predefinedAnimations = predefinedAnimations;

  cssInput = model(this.predefinedAnimations.wiggle.css);
  keyframes = model(this.predefinedAnimations.wiggle.keyframes);
  stack = model(false);

  constructor() {
    effect(() => {
      this.addStyleToHead(this.keyframes());
    });
  }

  applyPredefinedAnimation(animation: PredefinedAnimation) {
    if (this.stack()) {
      this.cssInput.update((currentCss) => currentCss + ', \n' + animation.css);
      this.keyframes.update((currentKeyframes) => currentKeyframes + '\n' + animation.keyframes);
    } else {
      this.cssInput.set(animation.css);
      this.keyframes.set(animation.keyframes);
    }
  }

  addStyleToHead(style: string): void {
    const styleElement = document.createElement('style');
    styleElement.textContent = style;
    styleElement.id = 'dynamic-styles';
    const existingStyleElement = document.getElementById('dynamic-styles');
    if (existingStyleElement) {
      document.head.removeChild(existingStyleElement);
    }
    document.head.appendChild(styleElement);
  }

  getHeartPath(): string {
    const width = this.svgWidth - 20;
    const height = this.svgHeight - 40;
    const startX = this.svgWidth / 2;
    const startY = this.svgHeight / 5;
    const curveDepth = 40;

    // M 0,0
    // C 5, -15
    // 25, -15
    // 30,0
    // C 35,15
    // 15,25
    // 0,40
    // C -15,25
    // -35,15
    // -30,0
    // C -25,-15
    // -5,-15
    // 0,0
    return `
        M ${startX},${startY}
        C ${startX + 10}, ${startY - curveDepth}
        ${startX + width / 2 - 10}, ${startY - curveDepth}
        ${startX + width / 2}, ${startY}
        C ${startX + width / 2 + 10},  ${startY + curveDepth / 2}
        ${startY + curveDepth / 2}, ${startY + curveDepth}
        ${startX}, ${startY + height}
        `;
  }
}
