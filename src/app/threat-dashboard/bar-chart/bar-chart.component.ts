import {
        Component,
        OnInit,
        ChangeDetectionStrategy,
        Renderer2,
        EventEmitter,
        Output,
        Input,
        OnDestroy,
        OnChanges,
    } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import * as d3 from 'd3';
import { BarChartItem } from './bar-chart-item';

@Component({
    selector: 'unf-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    public data: BarChartItem[];
    public loading = true;
    @Output()
    public renderComplete: EventEmitter<any> = new EventEmitter();

    private readonly subscriptions: Subscription[] = [];
    private readonly graphId = '#barChart';

    constructor(
        protected renderer: Renderer2,
    ) { }

    /**
     * @description initialize this component
     */
    public ngOnInit(): void {
        console.log('on init');
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
     * @memberof BarChartComponent
     */
    public ngOnChanges(changes: any): void {
        d3.select(this.graphId).selectAll('*').remove();
        this.data = changes.data.currentValue;
        this.buildGraph();
    }

    /**
     * @description build and render the graph DOM, can be used as a refresh or render
     * @return {void}
     */
    public buildGraph(): void {
        this.draw(this.graphId, this.data);
    }

    /**
     * @description
     * @param id
     * @param d
     * @param options
     */
    public draw(id: string, data: BarChartItem[]): void {
        data = data || [];
        const graphElement = d3.select(id);
        if (graphElement.empty()) {
            return;
        }
        graphElement.select('svg').remove();

        const margin = { top: 8, right: 20, bottom: 30, left: 40 };
        let width = 1024;
        let height = 200;
        graphElement.append('svg')
            .attr('width', width)
            .attr('height', height);

        const svg = graphElement.select('svg');
        width = +svg.attr('width') - margin.left - margin.right;
        height = +svg.attr('height') - margin.top - margin.bottom;
        const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
        const y = d3.scaleLinear().rangeRound([height, 0]);
        const bottom = graphElement.property('offsetHeight') + margin.bottom;

        const g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        let normalized = [];
        let tooltipDiv = graphElement.append('div').attr('class', 'bar-chart-tooltip')
            .style('max-height', height + 'px');

        data.forEach((el) => {
            // normalize frequency ratio to float
            normalized.push({'name': el.name, 'frequency': +el.frequency / 100, 'patterns': el.patterns});
        });

        x.domain(normalized.map((d) => d.name));
        y.domain([0, d3.max(normalized, (d) => d.frequency)]);

        g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x));

        g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(y).ticks(10, '%'))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Phase');

        g.selectAll('.bar')
            .data(normalized)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => x(d.name))
            .attr('y', (d) => y(d.frequency))
            .attr('width', x.bandwidth())
            .attr('height', (d) => {
                // position bottom of bar to base line height bars grow top down
                const yVal = y(d.frequency);
                return height - yVal;
            })
            .on('mouseover', function(d) {
                tooltipDiv.html('<ul style="max-height: ' + (height - 10) + 'px;">'
                        + d.patterns.map(pattern => '<li>' + pattern.name + '</li>').join('') + '</ul>');
                const ht: number = parseInt(tooltipDiv.style('height'), 10);
                const widthOffset = 2 * x.bandwidth() - 15;
                const scrollOffset = graphElement.property('scrollLeft');
                tooltipDiv.transition().duration(200).style('opacity', .9)
                    .style('left', (x(d.name) + widthOffset - scrollOffset) + 'px')
                    .style('top', (bottom - ht) + 'px');
            })
            .on('mouseout', function(d) {
                tooltipDiv.transition().duration(500).style('opacity', 0);
            });

    }
}
