
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as d3 from 'd3';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RadarChartDataPoint } from './radar-chart-datapoint';

@Component({
    selector: 'unf-radar-chart',
    templateUrl: 'radar-chart.component.html',
    styleUrls: ['./radar-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadarChartComponent implements OnInit, OnDestroy {
    @Input()
    public data: RadarChartDataPoint[][];
    public loading = true;
    @Output()
    public renderComplete: EventEmitter<any> = new EventEmitter();

    private readonly subscriptions: Subscription[] = [];
    private svg: any;
    private readonly graphId = '#radarChart';

    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
    ) { }

    /**
     * @description initialize this component
     */
    public ngOnInit(): void {
        // window may be a better alternative than ngOnChanges
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(500)
            )
            .subscribe((event) => {
                d3.select(this.graphId).selectAll('*').remove();
                this.buildGraph();
            });
        this.buildGraph();
    }

    /**
     * @description clean up this component
     */
    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((sub) => sub.unsubscribe());
        }
    }

    /**
     * TODO: verify this is not called too often,
     *  as ngOnChanges can be called often and computation should not be expensive
     * @description
     *  updates this components graph on change
     *
     * @param changes
     * @return {void}
     *
     * @memberof RadarChartComponent
     */
    // public ngOnChanges(changes: any): void {
    //     d3.select(this.graphId).selectAll('*').remove();
    //     this.data = changes.data.currentValue;
    //     this.buildGraph();
    // }

    /**
     * @description
     */
    public buildGraph(): void {
        const width = 500;
        const height = 550;
        // assuming data in log base 2 calculated from the percentage
        const maxValue = 70;
        const levels = 7;

        // Config for the Radar chart
        const config = {
            w: width,
            h: height,
            maxValue,
            levels,
            ExtraWidthX: 50,
            ExtraWidthY: 50,
        };

        this.draw(this.graphId, this.data, config);
    }

    /**
     * @description
     * @param id
     * @param d
     * @param options
     */
    public draw(id: string, data: RadarChartDataPoint[][], options): void {
        // base config, can be overridden by options passed into this methods
        const cfg = {
            radius: 5,
            w: 800,
            h: 600,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 0,
            ExtraWidthY: 0,
            color: d3.scaleOrdinal().range(['#42A5F5', '#1E88E5'])
        };

        if ('undefined' !== typeof options) {
            for (const i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }

        data = this.normalizeOutOfBoundsData(data, cfg.maxValue);
        const allAxis = (data[0].map((i, j) => i.area));
        const total = allAxis.length;
        const radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);

        const Format = d3.format('%');
        d3.select(id).select('svg').remove();

        const g = d3.select(id)
            .append('svg')
            // .attr('width', cfg.w + cfg.ExtraWidthX)
            .attr('width', '100%')
            .attr('height', cfg.h + cfg.ExtraWidthY)
            .append('g')
            .attr('transform', 'translate(' + cfg.TranslateX + ',' + cfg.TranslateY + ')');

        let tooltip;

        // Circular segments
        for (let j = 0; j < cfg.levels; j++) {
            const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
            g.selectAll('.levels')
                .data(allAxis)
                .enter()
                .append('svg:line')
                .attr('x1', (d, i) => levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)))
                .attr('y1', (d, i) => levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)))
                .attr('x2', (d, i) => levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)))
                .attr('y2', (d, i) => levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)))
                .attr('class', 'line')
                .style('stroke', 'grey')
                .style('stroke-opacity', '0.75')
                .style('stroke-width', '0.3px')
                .attr('transform', 'translate(' + (cfg.w / 2 - levelFactor) + ', ' + (cfg.h / 2 - levelFactor) + ')');
        }

        // Text indicating at what % each level is
        // for (let j = 0; j < cfg.levels; j++) {
        //     const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
        //     g.selectAll('.levels')
        //         .data([1]) // dummy data
        //         .enter()
        //         .append('svg:text')
        //         .attr('x', (d) => levelFactor * (1 - cfg.factor * Math.sin(0)))
        //         .attr('y', (d) => levelFactor * (1 - cfg.factor * Math.cos(0)))
        //         .attr('class', 'legend')
        //         // .style('font-family', 'sans-serif')
        //         // .style('font-size', '10px')
        //         .attr('transform', 'translate(' + (cfg.w / 2 - levelFactor + cfg.ToRight) + ', ' + (cfg.h / 2 - levelFactor) + ')')
        //         .attr('fill', '#737373')
        //         .text((j + 1) * 100 / cfg.levels);
        // }

        let series = 0;

        const axis = g.selectAll('.axis')
            .data(allAxis)
            .enter()
            .append('g')
            .attr('class', 'axis');

        axis.append('line')
            .attr('x1', cfg.w / 2)
            .attr('y1', cfg.h / 2)
            .attr('x2', (d, i) => cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)))
            .attr('y2', (d, i) => cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)))
            .attr('class', 'line')
            .style('stroke', 'grey')
            .style('stroke-width', '1px');

        axis.append('text')
            .attr('class', 'legend')
            .text((d: string | boolean) => d)
            // .style('font-family', 'sans-serif')
            // .style('font-size', '11px')
            .attr('text-anchor', 'middle')
            .attr('dy', '1.5em')
            .attr('transform', (d, i) => 'translate(0, -18)')
            .attr('x', (d, i) => cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total))
            .attr('y', (d, i) => cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total));

        data.forEach((y, x) => {
            const dataValues = [];
            g.selectAll('.nodes')
                .data(y, (j: any, i) => {
                    dataValues.push([
                        cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                        cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                    ]);
                    return '';
                });
            dataValues.push(dataValues[0]);
            g.selectAll('.area')
                .data([dataValues])
                .enter()
                .append('polygon')
                .attr('class', 'radar-chart-serie' + series)
                .attr('points', (d) => {
                    let str = '';
                    for (const pti of d) {
                        str = str + pti[0] + ',' + pti[1] + ' ';
                    }
                    return str;
                })
                .style('stroke-width', '2px')
                .style('stroke', cfg.color(series.toString()) as string)
                .style('fill', (j, i) => cfg.color(series.toString()) as string)
                .style('fill-opacity', cfg.opacityArea)
            // .on('mouseover', (d) => {
            //     let z = 'polygon.' + d3.select(this.svg).attr('class');
            //     g.selectAll('polygon')
            //         .transition()
            //         .duration(200)
            //         .style('fill-opacity', 0.1);
            //     g.selectAll(z)
            //         .transition()
            //         .duration(200)
            //         .style('fill-opacity', .7);
            // })
            // .on('mouseout', () => {
            //     g.selectAll('polygon')
            //         .transition()
            //         .duration(200)
            //         .style('fill-opacity', cfg.opacityArea);
            // });
            series++;
        });
        series = 0;

        this.changeDetectorRef.markForCheck();
        this.renderComplete.emit();
    }

    public normalizeOutOfBoundsData(data: RadarChartDataPoint[][], max = 100): RadarChartDataPoint[][] {
        // normalize out of bounds data
        data.forEach((arr) => {
            arr.forEach((el) => {
                el.value = el.value < 0 ? 0 : el.value;
                el.value = el.value <= max ? el.value : max;
            })
        });
        return data;
    }

}

//   var tooltip = d3.select("body").append("div").attr("class", "toolTip");
//       d.forEach(function(y, x){
//         g.selectAll(".nodes")
//         .data(y).enter()
//         .append("svg:circle")
//         .attr("class", "radar-chart-serie"+series)
//         .attr('r', cfg.radius)
//         .attr("alt", function(j){return Math.max(j.value, 0)})
//         .attr("cx", function(j, i){
//           dataValues.push([
//           cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
//           cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
//         ]);
//         return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
//         })
//         .attr("cy", function(j, i){
//           return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
//         })
//         .attr("data-id", function(j){return j.area})
//         .style("fill", "#fff")
//         .style("stroke-width", "2px")
//         .style("stroke", cfg.color(series)).style("fill-opacity", .9)
//         .on('mouseover', function (d){
//           console.log(d.area)
//               tooltip
//                 .style("left", d3.event.pageX - 40 + "px")
//                 .style("top", d3.event.pageY - 80 + "px")
//                 .style("display", "inline-block")
//                         .html((d.area) + "<br><span>" + (d.value) + "</span>");
//               })
//               .on("mouseout", function(d){ tooltip.style("display", "none");});

//         series++;
//       });
//       }
//   };
