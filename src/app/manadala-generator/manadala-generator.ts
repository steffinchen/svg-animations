import { Component } from '@angular/core';

@Component({
  selector: 'app-manadala-generator',
  imports: [],
  templateUrl: './manadala-generator.html',
  styleUrl: './manadala-generator.css',
})
export class ManadalaGenerator {
  noOfSegments = Array.from({ length: 8 }).map((_, i) => i);
  segmentAngle = 360 / this.noOfSegments.length;

  mandala = [{ type: 'ellipse', distance: 30, rx: 10, ry: 20 }];
}
