import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
