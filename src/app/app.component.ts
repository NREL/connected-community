import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { Container, Label, RoundedRectangle } from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Papa } from 'ngx-papaparse';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { GraphicRecord } from './interfaces/graphic-record';
import { Record } from './interfaces/record';
import { ChartRecord } from './interfaces/chart-record';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  duration = 60;
  interval?: number;
  playing = false;
  timeIndex = {
    current: 0,
    min: 0,
    max: 1440
  };
  dataDR: Record[] = [];
  data: Record[] = [];
  dataEV!: any[];
  dataAC!: any[];
  chartData: ChartRecord[] = [];
  baseData!: GraphicRecord;
  dfData!: GraphicRecord;
  baselinePeak = '';
  dfPeak = '';
  infoEV = {
    baseline: 0,
    dr: 0
  };
  infoAC = {
    baseline: 0,
    dr: 0
  };

  private dataReady = new BehaviorSubject(false);
  private readonly $dataReady = this.dataReady.asObservable().pipe(distinctUntilChanged());

  private breakpointChanged = new Subject();
  private readonly $breakpointChanged = this.breakpointChanged.asObservable();

  private bars: am4charts.DateAxisDataItem[] = [];
  private ranges: am4charts.DateAxisDataItem[] = [];
  private largeScreen = true;
  private mediumScreen = true;

  private dfTitle?: Label;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private papa: Papa
  ) {
  }

  @HostListener('document:keydown.Space')
  handleSpaceKey(): void {
    this.togglePlaying();
  }

  @HostListener('document:keydown.ArrowDown')
  @HostListener('document:keydown.ArrowLeft')
  handleArrowLeftKey(): void {
    if (this.timeIndex.current <= this.timeIndex.min) {
      this.timeIndex.current = this.timeIndex.max;
    } else {
      --this.timeIndex.current;
    }
    this.update(this.timeIndex.current);
  }

  @HostListener('document:keydown.ArrowUp')
  @HostListener('document:keydown.ArrowRight')
  handleArrowRightKey(): void {
    if (this.timeIndex.current >= this.timeIndex.max) {
      this.timeIndex.current = this.timeIndex.min;
    } else {
      ++this.timeIndex.current;
    }
    this.update(this.timeIndex.current);
  }

  @HostListener('document:keydown.Home')
  handleHomeKey(): void {
    this.timeIndex.current = this.timeIndex.min;
    this.update(this.timeIndex.current);
  }

  @HostListener('document:keydown.End')
  handleEndKey(): void {
    this.timeIndex.current = this.timeIndex.max;
    this.update(this.timeIndex.current);
  }

  ngOnInit(): void {
    // large
    this.breakpointObserver.observe(['(min-width: 1834px)']).subscribe((state: BreakpointState) => {
      this.largeScreen = state.matches;
      this.breakpointChanged.next();
    });

    // medium
    this.breakpointObserver.observe(['(min-width: 1378px)']).subscribe((state: BreakpointState) => {
      this.mediumScreen = state.matches;
      this.breakpointChanged.next();
    });

    this.$breakpointChanged.subscribe(() => {
      this.updateResponsiveSizes();
    });

    // parse EV data
    this.papa.parse('assets/testData-EV.csv', {
      download: true,
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
      complete: result => {
        this.dataEV = result.data;
      }
    });
    // parse AC data
    this.papa.parse('assets/testData-AC.csv', {
      download: true,
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
      complete: result => {
        this.dataAC = result.data;
      }
    });
    // parse 2 separate CSVs (this.data & this.dataDR)
    this.papa.parse('assets/testData-DR.csv', {
      download: true,
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
      complete: result => {
        this.dataDR = result.data.map((record: Record, index:string) => {
          record.Time = new Date(record.Time);
          record.Bldgs = {};
          for (let key in result.data[index]){
            if (!isNaN(parseInt(key))) {
              record.Bldgs[key] = result.data[index][key];
            }
          }

          return record;
        });
      }
    });
    this.papa.parse('assets/testData-Base.csv', {
      download: true,
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
      complete: result => {
        this.data = result.data.map((record: Record, index:string) => {
          record.Time = new Date(record.Time);
          record.Bldgs = {};
          for (let key in result.data[index]){
            if (!isNaN(parseInt(key))) {
              record.Bldgs[key] = result.data[index][key];
            }
          }
          return record;
        });
        this.getChartData();
        this.updateGraphicRecords();
        this.dataReady.next(true);
        this.dataReady.complete();
      }
    });
  }

  ngAfterViewInit(): void {
    this.$dataReady.subscribe(ready => {
      if (ready) {
        this.createPowerChart();
        this.updateResponsiveSizes();
      }
    });
  }

  onSliderChange($event: MatSliderChange): void {
    if (typeof $event.value === 'number') {
      this.update($event.value);
    }
  }

  togglePlaying(): void {
    this.playing = !this.playing;
    if (this.playing) {
      this.interval = window.setInterval(() => {
        this.incrementTimeStep();
      }, this.duration / (this.timeIndex.max - this.timeIndex.min) * 1000);
      // Immediately step forward
      this.incrementTimeStep();
    } else {
      clearInterval(this.interval);
    }
  }

  private incrementTimeStep(): void {
    if (this.timeIndex.current === this.timeIndex.max) {
      this.timeIndex.current = this.timeIndex.min;
    } else {
      ++this.timeIndex.current;
    }
    this.update(this.timeIndex.current);
  }

  private update(currentTimeIndex: number): void {
    this.timeIndex.current = currentTimeIndex;
    this.updateRanges();
    this.updateBars();
    this.updateGraphicRecords();
  }

  private updateRanges(): void {
    const start = this.data[this.timeIndex.current].Time;
    this.ranges.forEach(range => {
      range.date = start;
    });
  }

  private updateBars(): void {
    this.bars.forEach(bar => {
      bar.date = this.data[this.timeIndex.current].Time;
    });
  }

  private updateGraphicRecords(): void {
    const recordB = this.data[this.timeIndex.current];
    const recordDR = this.dataDR[this.timeIndex.current];

    // Hardcode DR window for now (9-11)
    var drOn = 0;
    const hour = recordDR.Time.getHours();
    if (hour > 9 && hour < 11) {
      drOn = 1;
    }

    this.baseData = {
      Time: recordB.Time,
      Bldgs: recordB.Bldgs,
      drOn: 0, // always off for baseline
      Total: recordB.Total
    };
    this.dfData = {
      Time: recordDR.Time,
      Bldgs: recordDR.Bldgs,
      drOn: drOn,
      Total: recordDR.Total
    };
    this.infoEV = { 
      baseline: this.dataEV[this.timeIndex.current].Baseline,
      dr: this.dataEV[this.timeIndex.current].DR
    };
    this.infoAC = {
      baseline: this.dataAC[this.timeIndex.current].Baseline,
      dr: this.dataAC[this.timeIndex.current].DR
    };
  }

  private getChartData(): void {

    for (const [k, v] of Object.entries(this.data)) {
      this.chartData[<any>k] = {
        Time: v.Time,
        Base: v.Total,
        DR: this.dataDR[<any>k].Total
      }
    }
    console.log("chart record: ", this.chartData);
  }

  private createPowerChart(): void {
    const chart = am4core.create('chart-power', am4charts.XYChart);
    chart.data = this.chartData;

    chart.colors.list = [
      am4core.color('#5b83cb'),
      am4core.color('#64C204')
    ];

    const topContainer = chart.chartContainer.createChild(am4core.Container);
    topContainer.fill = am4core.color('#666');
    topContainer.fontSize = 16;
    topContainer.isMeasured = false;
    topContainer.layout = 'absolute';
    topContainer.padding(0, 62, 0, 91);
    topContainer.toBack();
    topContainer.userClassName = 'semi-condensed-light';
    topContainer.width = am4core.percent(100);

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormats.setKey('hour', 'ha');
    dateAxis.renderer.labels.template.dy = -8;
    dateAxis.renderer.labels.template.fill = am4core.color('#666');
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.tooltipDateFormat = 'M/d ha';
    dateAxis.userClassName = 'condensed';

    const kwAxis = chart.yAxes.push(new am4charts.ValueAxis());
    kwAxis.cursorTooltipEnabled = false;
    kwAxis.max = 100000;
    kwAxis.min = 0;
    kwAxis.renderer.grid.template.disabled = true;
    kwAxis.renderer.labels.template.fill = am4core.color('#666');
    kwAxis.renderer.minGridDistance = 20;
    kwAxis.renderer.ticks.template.disabled = false;
    kwAxis.renderer.ticks.template.dx = 4;
    kwAxis.renderer.ticks.template.length = 8;
    kwAxis.renderer.ticks.template.stroke = am4core.color('#d9d9d9');
    kwAxis.renderer.ticks.template.strokeOpacity = 1;
    kwAxis.renderer.ticks.template.strokeWidth = 2;
    kwAxis.strictMinMax = true;
    kwAxis.title.fill = am4core.color('#666');
    kwAxis.title.fontSize = 20;
    kwAxis.title.text = 'kWh'; // 'kW'
    kwAxis.title.userClassName = 'condensed';
    kwAxis.userClassName = 'condensed';

    const basePowerSeries = chart.series.push(new am4charts.LineSeries());
    basePowerSeries.dataFields.dateX = 'Time';
    basePowerSeries.dataFields.valueY = 'Base';
    basePowerSeries.dataItems.template.locations.dateX = 0;
    basePowerSeries.name = 'Baseline';
    basePowerSeries.strokeWidth = 3;
    //basePowerSeries.tooltipText = 'Baseline: {valueY.formatNumber(\'#,###.\')} kW';
    basePowerSeries.tooltipText = 'Baseline: {valueY.formatNumber(\'#,###.\')} kWh';

    const dfPowerSeries = chart.series.push(new am4charts.LineSeries());
    dfPowerSeries.dataFields.dateX = 'Time';
    dfPowerSeries.dataFields.valueY = 'DR';
    dfPowerSeries.dataItems.template.locations.dateX = 0;
    dfPowerSeries.name = 'DR';
    dfPowerSeries.strokeWidth = 3;
    // dfPowerSeries.tooltipText = 'DR: {valueY.formatNumber(\'#,###.\')} kW';
    dfPowerSeries.tooltipText = 'DR: {valueY.formatNumber(\'#,###.\')} kWh';


    let rangeDR = dateAxis.axisRanges.create();
    rangeDR.date = new Date("06/25/19 09:00:00");
    rangeDR.endDate = new Date("06/25/19 10:59:00");
    rangeDR.axisFill.fill = am4core.color("#64C204");
    rangeDR.axisFill.fillOpacity = 0.1;
    rangeDR.grid.strokeOpacity = 0;

    const basePowerRange = dateAxis.createSeriesRange(basePowerSeries);
    basePowerRange.date = this.data[0].Time;
    basePowerRange.endDate = new Date(this.data[this.data.length - 1].Time.getTime() + 3600000);
    // basePowerRange.contents.stroke = am4core.color('#000');
    basePowerRange.contents.strokeOpacity = 0.12;
    this.ranges.push(basePowerRange);

    const dfPowerRange = dateAxis.createSeriesRange(dfPowerSeries);
    dfPowerRange.date = this.data[0].Time;
    dfPowerRange.endDate = new Date(this.data[this.data.length - 1].Time.getTime() + 3600000);
    // dfPowerRange.contents.stroke = am4core.color('#000');
    dfPowerRange.contents.strokeOpacity = 0.12;
    this.ranges.push(dfPowerRange);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'none';
    chart.cursor.lineY.disabled = true;

    chart.legend = new am4charts.Legend();
    chart.legend.contentAlign = 'center';
    chart.legend.fontSize = 15;
    chart.legend.itemContainers.template.clickable = false;
    chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
    chart.legend.itemContainers.template.focusable = false;
    chart.legend.labels.template.fill = am4core.color('#666');
    chart.legend.marginBottom = -15;
    chart.legend.marginTop = -25;
    chart.legend.userClassName = 'condensed';

    let title = chart.titles.create();
    // title.text = "Community Aggregate Demand (kW)";
    title.text = "Community Aggregate Electricity (kWh)";
    title.fontSize = 22;
    title.marginBottom = 30;
  }

  private gridLine(axis: am4charts.ValueAxis, value: number, addLabel = true) {
    const range = axis.axisRanges.create();
    range.value = value;
    if (addLabel) {
      range.label.text = '{value}';
    }
  }

  private updateResponsiveSizes() {
    if (this.dfTitle) {
      if (this.largeScreen) {
        this.dfTitle.dy = 8;
        this.dfTitle.fontSize = 25;

      } else {
        this.dfTitle.dy = 6;
        this.dfTitle.fontSize = 17;
      }
    }
  }
}
