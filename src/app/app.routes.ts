import { Routes } from '@angular/router';
import { BasicAnimations } from './basic-animations/basic-animations.component';
import { Fireworks } from './fireworks/fireworks';
import { MoveIt } from './move-it/move-it';
import { Flower } from './flower/flower';

export const routes: Routes = [
  { path: 'fireworks', component: Fireworks },
  { path: 'move-it', loadComponent: () => import('./move-it/move-it').then((m) => m.MoveIt) },
  { path: 'flower', loadComponent: () => import('./flower/flower').then((m) => m.Flower) },
  {
    path: 'mandala-generator',
    loadComponent: () =>
      import('./manadala-generator/manadala-generator').then((m) => m.ManadalaGenerator),
  },
  { path: 'editor', loadComponent: () => import('./editor/editor').then((m) => m.Editor) },
  { path: 'logo', loadComponent: () => import('./logo/logo.component').then((m) => m.Logo) },
  { path: '', component: BasicAnimations },
];
