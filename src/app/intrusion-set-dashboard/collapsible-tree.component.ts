
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'collapsible-tree',
  template: `<div id='graph' class='conceptmap' ></div><div id='graph-info'></div>`
})

export class CollapsibleTreeComponent implements OnInit, OnChanges {
    @Input() public data: any;
    private svg: any;

    constructor() {
        console.log('Initial App State ConceptMapComponent');
    }

    public ngOnInit() {
        //
        // this.buildGraph('graph', 'graph-info', this.data)
    }
     public ngOnChanges(changes: any): void {
      d3.select('#graph').selectAll('*').remove();
      this.data = changes.data.currentValue;
      this.buildGraph('graph', 'graph-info', this.data);
    }

    public buildGraph(chartElementId, infoElementId, dataJson): void {
        let previousNode = null;
        let margin = {top: 20, right: 120, bottom: 20, left: 0};
        let width = 960 - margin.right - margin.left;
        let height = 800 - margin.top - margin.bottom;
        let i = 0;
        let duration = 750;
        let root;
        let tree = d3.layout.tree()
            .size([height, width]);

        let diagonal = d3.svg.diagonal()
            .projection((d) => { return [d.y, d.x]; });

        let svg = d3.select('#' + chartElementId).append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        root = this.data;
        root.x0 = height / 2;
        root.y0 = 0;

        function collapse(d) {
                if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        root.children.forEach(collapse);
        update(root);
        for (let j = 0; j < root.children.length; j++) {
            if (root.children[j]._children) {
                 click(root.children[j]);
                 break;
            }
        }
        d3.select(self.frameElement).style('height', '800px');

        function update(source) {

            // Compute the new tree layout.
            let nodes = tree.nodes(root).reverse();
            let links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach((d) => { d.y = d.depth * 180; });

            // Update the nodes…
            let node = svg.selectAll('g.node')
                .data(nodes, (d: any) => { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            let nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr('transform', (d: any) => { return 'translate(' + source.y0 + ',' + source.x0 + ')'; })
                .on('click', click);

                // Define the div for the tooltip
            let div = d3.select('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0);

            nodeEnter.append('circle')
                .attr('r', 1e-6)
                .style('fill', (d: any) => {
                    if (d.type === 'root') {
                        return 'transparent';
                    } else {
                        return d._children ? 'lightsteelblue' : '#fff';
                    }
                })
                .style('stroke', (d: any) => {
                    if (d.type === 'root') {
                        return 'transparent';
                    }
                })
                .on('mouseover', (d) => {
                    let D3event = d3.event as any;
                    if (d.description) {
                        div.transition()
                            .duration(200)
                            .style('opacity', .9);
                        div	.html(d.description)
                            .style('left', (D3event.pageX) + 'px')
                            .style('top', (D3event.pageY - 28) + 'px');
                    }
                })
                .on('mouseout', (d) => {
                    if (d.description) {
                        div.transition()
                            .duration(500)
                            .style('opacity', 0);
                    }
                });

            nodeEnter.append('text')
                .attr('x', (d: any) => { return d.children || d._children || d.type === 'intrusion-set' ? -10 : 10; })
                .attr('dy', '.35em')
                .attr('text-anchor', (d) => { return d.children || d._children  || d.type === 'intrusion-set'  ? 'end' : 'start'; })
                .text((d: any) => { return d.name; })
                .style('fill-opacity', 1e-6)
                 .style('fill', (d: any) => {
                    if (d.type === 'intrusion-set') {
                         return d.color;
                    }
                });

            // Transition nodes to their new position.
            let nodeUpdate = node.transition()
                .duration(duration)
                .attr('transform', (d: any) => { return 'translate(' + d.y + ',' + d.x + ')'; });

            nodeUpdate.select('circle')
                .attr('r', 4.5)
                .style('fill', (d: any) => {
                    if (d.type === 'root') {
                        return 'transparent';
                    } else {
                        return d._children ? 'lightsteelblue' : '#fff';
                    }
                })
                .style('stroke', (d: any) => {
                    if (d.type === 'root') {
                        return 'transparent';
                    }
                });

            nodeUpdate.select('text')
                .style('fill-opacity', 1)
                .style('fill', (d: any) => {
                    if (d.type === 'intrusion-set') {
                         return d.color;
                    }
                })
                .style('stroke', (d: any) => {
                    if (d.type === 'intrusion-set') {
                         return d.color;
                    }
                });

            // Transition exiting nodes to the parent's new position.
            let nodeExit = node.exit().transition()
                .duration(duration)
                .attr('transform', (d) => { return 'translate(' + source.y + ',' + source.x + ')'; })
                .remove();

            nodeExit.select('circle')
                .attr('r', 1e-6);

            nodeExit.select('text')
                .style('fill-opacity', 1e-6);

            // Update the links…
            let link = svg.selectAll('path.link')
                .data(links, (d: any) => { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert('path', 'g')
                .attr('class', 'link')
                .attr('d', (d: any) => {
                    let o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .style('stroke', (d: any) => {
                    if (d.source.color) {
                         return d.source.color;
                    } else if (d.source.type === 'root') {
                        return 'transparent';
                    }
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr('d', diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr('d', (d: any) => {
                    let o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
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
            if ( previousNode && previousNode.id !== d.id && d.type === 'intrusion-set') {
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
            if ((!previousNode || previousNode.id !== d.id) && d.type === 'intrusion-set') {
              previousNode = d;
            }

        }
    }
}
