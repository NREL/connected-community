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

  getClassOf(val:number) {
    if (val <= -0.75) {
      return 'comfort1';
    } else if (val > -0.75 && val <= -0.5) {
      return 'comfort2';
    } else if (val > -0.5 && val <= -0.20) {
      return 'comfort3';
    } else if (val > -0.20 && val <= 0.20) {
      return 'comfort4';
    } else if (val > 0.20 && val <= 0.5) {
      return 'comfort5';
    } else if (val > 0.5 && val <= 0.7) {
      return 'comfort6';  
    } else if (val > 0.70 && val <= 0.9) {
      return 'comfort7';
    } else if (val > 0.9) {
      return 'comfort8';
    }
      else {
      // return gray
      return 'comfortNA' 
    }
  }

}
