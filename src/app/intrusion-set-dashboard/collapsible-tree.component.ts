
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'collapsible-tree',
  template: `<div id='graph' class='conceptmap' ></div><div id='graph-info'></div>`
})
export class CollapsibleTreeComponent implements OnInit, OnChanges {
    private static readonly DEFAULT_COLOR = 'lightsteelblue';

    @Input() public data: any;
    @Output() public treeComplete: EventEmitter<any> = new EventEmitter();
    private svg: any;

    // tslint:disable-next-line:no-empty
    constructor() {}

    // tslint:disable-next-line:no-empty
    public ngOnInit() {}

    /**
     * TODO: verify this is not called too often,
     *  as ngOnChanges can be called often and computation should not be expensive
     * @description
     *  updates this components graph on change
     *
     * @param changes
     * @return {void}
     *
     * @memberof CollapsibleTreeComponent
     */
    public ngOnChanges(changes: any): void {
      d3.select('#graph').selectAll('*').remove();
      this.data = changes.data.currentValue;
      this.buildGraph('graph', 'graph-info');
    }

    /**
     * @description
     *  Builds horizontal tree graph
     *
     * @param chartElementId
     * @param infoElementId
     * @return {void}
     *
     * @memberof CollapsibleTreeComponent
     */
    public buildGraph(chartElementId, infoElementId): void {
        const _self = this;
        let previousNode = null;
        const margin = {top: 20, right: 120, bottom: 20, left: 0};
        const width = 960 - margin.right - margin.left;
        const height = 800 - margin.top - margin.bottom;
        let i = 0;
        const duration = 750;
        let root;

        // declares a tree layout and assigns the size
        const tree = d3.tree()
            .size([height, width]);
        // Assigns parent, children, height, depth
        root = d3.hierarchy(this.data, (d) => d.children);
        root.x0 = height / 2;
        root.y0 = 0;

        const svg = d3.select('#' + chartElementId).append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        function collapse(d) {
                if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        update(root);

        root.children.forEach(collapse);
        const BreakException = {};
        try {
            root.children.forEach(
                (child: any) => {
                    if (child._children) {
                        click(child);
                        throw BreakException;
                    }
                }
            );
        } catch (e) { console.log(''); }

        d3.select(self.frameElement).style('height', '800px');

        function update(source) {
            // Create a hierarchy from the root
            // Compute the new tree layout.
            // Assigns the x and y position for the nodes
            const treeData = tree(root);
            // compute new layout
            const nodes = treeData.descendants();
            const links = treeData.descendants().slice(1);

            // Normalize for fixed-depth.
            nodes.forEach((d: any) => {
                d.y = d.depth * 180;
            });

            // Update the nodes…
            const node = svg.selectAll('g.node')
                .data(nodes, (d: any) => { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            const nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr('transform', (d: any) => { return 'translate(' + source.y0 + ',' + source.x0 + ')'; })
                .on('click', click);

                // Define the div for the tooltip
            const div = d3.select('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0);

            nodeEnter.append('circle')
                .attr('r', 1e-6)
                .style('fill', (d: any) => {
                    if (d.data.type === 'root') {
                        return 'transparent';
                    }

                    return d._children ? CollapsibleTreeComponent.DEFAULT_COLOR : '#fafafa';
                })
                .style('stroke', (d: any) => {
                    if (d.data.type === 'root') {
                        return 'transparent';
                    }
                })
                .on('mouseover', (d: any) => {
                    const D3event = d3.event as any;
                    if (d.data.description) {
                        div.transition()
                            .duration(200)
                            .style('opacity', .9);
                        div	.html(d.data.description)
                            .style('left', (D3event.pageX) + 'px')
                            .style('top', (D3event.pageY - 28) + 'px');
                    }
                })
                .on('mouseout', (d: any) => {
                    if (d.data.description) {
                        div.transition()
                            .duration(500)
                            .style('opacity', 0);
                    }
                });

            nodeEnter.append('text')
                .attr('x', (d: any) => { return d.children || d._children || d.data.type === 'intrusion-set' ? -10 : 10; })
                .attr('dy', '.35em')
                .attr('text-anchor', (d: any) => { return d.children || d._children  || d.data.type === 'intrusion-set'  ? 'end' : 'start'; })
                .text((d: any) => d.data.name)
                .style('fill-opacity', 1e-6)
                 .style('fill', (d: any) => {
                    if (d.data.type === 'intrusion-set') {
                         return d.data.color;
                    }
                });

            const nodeUpdate = nodeEnter.merge(node);

            // Transition nodes to their new position.
            nodeUpdate.transition()
                .duration(duration)
                .attr('transform', (d: any) => { return 'translate(' + d.y + ',' + d.x + ')'; });

            nodeUpdate.select('circle')
                .attr('r', 4.5)
                .style('fill', (d: any) => {
                    if (d.data.type === 'root') {
                        return 'transparent';
                    } else {
                        return d._children ? CollapsibleTreeComponent.DEFAULT_COLOR : '#fafafa';
                    }
                })
                .style('stroke', (d: any) => {
                    if (d.data.type === 'root') {
                        return 'transparent';
                    }
                });

            nodeUpdate.select('text')
                .style('fill-opacity', 1)
                .style('fill', (d: any) => {
                    if (d.data.type === 'intrusion-set') {
                         return d.data.color;
                    }
                })
                .style('stroke', (d: any) => {
                    if (d.data.type === 'intrusion-set') {
                         return d.data.color;
                    }
                });

            // Transition exiting nodes to the parent's new position.
            const nodeExit = node.exit().transition()
                .duration(duration)
                .attr('transform', (d) => { return 'translate(' + source.y + ',' + source.x + ')'; })
                .remove();

            nodeExit.select('circle')
                .attr('r', 1e-6);

            nodeExit.select('text')
                .style('fill-opacity', 1e-6);

            // Update the links…
            const link = svg.selectAll('path.link')
                .data(links, (d: any) => d.id);

            // Enter any new links at the parent's previous position.
            const linkEnter = link.enter().insert('path', 'g')
                .attr('class', 'link')
                .attr('d', (d) => {
                    const o = { x: source.x0, y: source.y0 };
                    return _self.diagonal(o, o);
                })
                // .attr('d', <any> d3.linkHorizontal()
                //     .x((d: any) => {
                //         return source.x0;
                //     })
                //     .y((d: any) => source.y0))
                .style('stroke', (d: any) => {
                    if (d.data.type === 'root') {
                        return 'transparent';
                    }

                    return d.data.color || CollapsibleTreeComponent.DEFAULT_COLOR;
                });

            const linkUpdate = linkEnter.merge(link);

            // Transition links to their new position.
            linkUpdate.transition()
                .duration(duration)
                // .attr('d', <any> d3.linkHorizontal()
                //     .x((d: any) => {
                //         return d.x;
                //     })
                //     .y((d: any) => d.y));
                .attr('d', (d: any) => {
                    return _self.diagonal(d, d.parent);
                });

            // Transition exiting nodes to the parent's new position.
            const linkExit = link.exit().transition()
                .duration(duration)
                // .attr('d', <any> d3.linkHorizontal()
                //     .x((d: any) => {
                //         return source.x;
                //     })
                //     .y((d: any) => source.y))
                .attr('d', (d) => {
                    const o = { x: source.x, y: source.y };
                    return _self.diagonal(o, o);
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach((d: any) => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children on click.
        function click(d) {
            if ( previousNode && previousNode.id !== d.id && d.data.type === 'intrusion-set') {
                click(previousNode);
            }
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
            if ((!previousNode || previousNode.id !== d.id) && d.data.type === 'intrusion-set') {
              previousNode = d;
            }

        }
        
        this.treeComplete.emit();        
    }

    /**
     * @description
     *  computes d3 link path
     *
     * @param s {Coordinate}
     * @param d {Coordinate}
     *
     * @return {string} in the form of a svg path, ie M x y C y x, y x yx
     */
    private diagonal(s: Coordinate, d: Coordinate): string {
        const path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;

        return path;
    }
}

/**
 * simple interface to define an x and y path
 */
interface Coordinate {
    x: number;
    y: number;
}
