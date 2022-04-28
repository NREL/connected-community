import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as chroma from 'chroma-js';
import { GraphicRecord } from '../interfaces/graphic-record';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.svg',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit, OnChanges {
  @Input() type!: 'baseline' | 'demand flexibility';
  @Input() data!: GraphicRecord;
  drColor!: string;

  ngOnInit(): void {
    if (!this.type) {
      throw new Error('GraphicComponent attribute "type" is required');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      this.updateTesColor(changes.data.currentValue['SOC%']);
    }
  }

  private updateTesColor(percent: number): void {
    this.drColor = chroma.scale(['#f00', '#eec720', '#079247']).mode('lab')(percent / 100).hex();
  }

}
