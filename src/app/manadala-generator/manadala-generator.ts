import { Component, effect, ElementRef, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manadala-generator',
  imports: [],
  templateUrl: './manadala-generator.html',
  styleUrl: './manadala-generator.css',
})
export class ManadalaGenerator {
  protected readonly Math = Math;

  @ViewChild('svg', { static: true }) svgElement!: ElementRef<SVGSVGElement>;

  noOfSegments = 8;
  segmentAngle = 360 / this.noOfSegments;
  segmentsArray = Array.from({ length: this.noOfSegments }, (_, i) => i);

  isDrawing = signal(false);
  points = signal<Array<{ x: number; y: number }>>([]);

  currentPath?: SVGPathElement = undefined;

  limitDrawingArea = signal(true);

  constructor() {
    effect(() => {
      if (!this.isDrawing() || !this.currentPath) return;

      const pathData = this.pointsToPath(this.points());
      this.currentPath.setAttribute('d', pathData);
    });
  }

  mouseDown($event: MouseEvent) {
    console.log('Mouse down at', this.getCoordinates($event));
    this.isDrawing.set(true);
    this.points.set([this.getCoordinates($event)]);

    this.currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.svgElement.nativeElement.appendChild(this.currentPath);
  }

  mouseMove($event: MouseEvent) {
    if (!this.isDrawing()) return;
    console.log('Mouse move at');
    const coords = this.getCoordinates($event);

    if (this.limitDrawingArea() && !this.isPointInFirstSlice(coords.x, coords.y)) {
      return;
    }

    this.points.update((pts) => [...pts, coords]);
  }

  mouseUp($event: MouseEvent) {
    console.log('Mouse up at', this.getCoordinates($event));
    this.isDrawing.set(false);
    this.createMandalaSymmetry(this.currentPath);
  }

  pointsToPath(points: Array<{ x: number; y: number }>): string {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }

  getCoordinates($event: MouseEvent): { x: number; y: number } {
    const rect = this.svgElement.nativeElement.getBoundingClientRect();
    const x = $event.clientX - rect.left;
    const y = $event.clientY - rect.top;
    return { x, y };
  }

  isPointInFirstSlice(x: number, y: number): boolean {
    const svg = this.svgElement.nativeElement;
    const centerX = svg.viewBox.baseVal.width / 2;
    const centerY = svg.viewBox.baseVal.height / 2;

    // Calculate angle from center to point (in degrees)
    // atan2 returns angle in radians from -PI to PI
    const dx = x - centerX;
    const dy = y - centerY;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = angleRad * (180 / Math.PI);

    // Normalize to 0-360 range
    const normalizedAngle = (angleDeg + 360) % 360;

    // Calculate the slice range
    const sliceAngle = this.segmentAngle / 2;

    // Check if point is in first slice (0 to sliceAngle)
    // Assuming 0° is pointing right (positive X axis)
    return normalizedAngle >= 0 && normalizedAngle <= sliceAngle;
  }

  createMandalaSymmetry(path: SVGPathElement | undefined, segments = 8) {
    if (!path) return;
    const svg = this.svgElement.nativeElement;
    const centerX = svg.viewBox.baseVal.width / 2;
    const centerY = svg.viewBox.baseVal.height / 2;
    const angleStep = 360 / segments;

    // Create a group to hold all symmetrical copies
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep;

      // Create rotated copy
      const rotated = path.cloneNode(true) as SVGPathElement;
      rotated.setAttribute('transform', `rotate(${angle} ${centerX} ${centerY})`);
      group.appendChild(rotated);

      // Create mirrored + rotated copy
      const mirrored = path.cloneNode(true) as SVGPathElement;
      mirrored.setAttribute(
        'transform',
        `rotate(${angle} ${centerX} ${centerY}) scale(-1, 1) translate(${-2 * centerX}, 0)`,
      );
      group.appendChild(mirrored);
    }

    path.remove();
    svg.appendChild(group);
  }
}
