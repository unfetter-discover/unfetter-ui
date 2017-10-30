
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'unf-collapsible-tree',
    templateUrl: './collapsible-tree.component.html',
    styleUrls: ['./collapsible-tree.component.scss']
})
export class CollapsibleTreeComponent implements OnInit, OnDestroy, OnChanges {
    // private static readonly teal500 = '#009688';
    // private static readonly teal200 = '#80CBC4';
    // private static readonly DEFAULT_LEAF = CollapsibleTreeComponent.teal500;
    // private static readonly DEFAULT_PARENT = CollapsibleTreeComponent.teal200;
    
    @Input() public data: any;
    @Output() public treeComplete: EventEmitter<any> = new EventEmitter();
    private svg: any;    
    private readonly graphId = '#graph';
    private readonly circleRadius = 10;

    // tslint:disable-next-line:no-empty
    constructor(protected renderer: Renderer2) { }

    /**
     * @description initialize this component
     */
    public ngOnInit(): void { 
        console.log('on init');
    }

    /**
     * @description clean up this component
     */
    public ngOnDestroy(): void {
        d3.select('body').selectAll('.tooltip').remove();
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
     * @memberof CollapsibleTreeComponent
     */
    public ngOnChanges(changes: any): void {
        d3.select(this.graphId).selectAll('*').remove();
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
        const margin = { top: 20, right: 120, bottom: 20, left: 0 };
        const width = 960 - margin.right - margin.left;
        const height = 960 - margin.top - margin.bottom;
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

        const svgSelect = d3.select('#' + chartElementId);
        const svgEl = svgSelect.node();
        const svg = svgSelect.append('svg')
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
                .data(nodes, (d: any) => d.id || (d.id = ++i));

            // Enter any new nodes at the parent's previous position.
            const nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr('transform', (d: any) => 'translate(' + source.y0 + ',' + source.x0 + ')')
                .on('click', click);

            // Define the div for the tooltip
            const tooltipDiv = d3.select(_self.graphId).append('div')
                .attr('class', 'tooltip mat-elevation-z3')
                .style('opacity', 0);

            const iconWidth = '32';
            const iconHeight = '32';
            nodeEnter.append('circle')
                .attr('class', 'node')
                .attr('r', 1e-6)
            // nodeEnter.append('use')
                // .attr('xlink:href', _self.generateIconPath.bind(_self))
                // .attr('width', iconWidth)
                // .attr('height', iconHeight)
                // .style('transform', 'scale(1)')
                // .style('fill', (d: any) => {
                //     if (d.data.type === 'root') {
                //         return 'transparent';
                //     }
                //     console.log(d);
                //     return d._children ? CollapsibleTreeComponent.DEFAULT_PARENT : CollapsibleTreeComponent.DEFAULT_LEAF;
                // })
                // .style('stroke', (d: any) => {
                //     if (d.data.type === 'root') {
                //         return 'transparent';
                //     }
                // })
                .attr('class', (d: any) => {
                    if (d.data.type === 'root') {
                        return 'root-node';
                    }
                    return d._children ? 'full-node' : 'empty-node';
                })
                .on('mouseover', (d: any) => {
                    const mouseCoords = d3.mouse(svgEl as any);
                    const D3event = d3.event as any;
                    // const eventX = D3event.x || D3event.pageX;
                    // const eventY = D3event.y || D3event.pageY;
                    const eventX = mouseCoords[0];
                    const eventY = mouseCoords[1];
                    if (d.data.description) {
                        tooltipDiv.transition()
                            .duration(200)
                            .style('opacity', .9);
                        tooltipDiv.html(d.data.description)
                            .style('left', (eventX + 10) + 'px')
                            .style('top', (eventY - 10) + 'px');
                    }
                    // const el = D3event.target;
                    // const nativeEl = el.nativeElement;
                    // if (nativeEl) {
                    //     _self.renderer.addClass(nativeEl, 'node-hover');
                    // }
                })
                .on('mouseout', (d: any) => {
                    const D3event = d3.event as any;
                    if (d.data.description) {
                        tooltipDiv.transition()
                            .duration(500)
                            .style('opacity', 0);
                    }
                    // const el = D3event.target;
                    // const nativeEl = el.nativeElement;
                    // if (nativeEl) {
                    //     _self.renderer.addClass(nativeEl, 'node-hover');
                    // }
                });

            nodeEnter.append('text')
                .attr('x', (d: any) => d.children || d._children || d.data.type === 'intrusion-set' ? -10 : 10)
                .attr('dy', '.35em')
                .attr('text-anchor', (d: any) => d.children || d._children || d.data.type === 'intrusion-set' ? 'end' : 'start')
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
                .attr('transform', (d: any) => 'translate(' + d.y + ',' + d.x + ')');

            nodeUpdate.select('circle')
                .attr('r', _self.circleRadius)
            // nodeUpdate.select('use')
                // .attr('xlink:href', _self.generateIconPath.bind(_self))
                // .attr('width', iconWidth)
                // .attr('height', iconHeight)
                // .style('transform', 'scale(1)')
                // .style('fill', (d: any) => {
                //     if (d.data.type === 'root') {
                //         return 'transparent';
                //     } else {
                //         console.log(d);
                //         return d._children ? CollapsibleTreeComponent.DEFAULT_PARENT : CollapsibleTreeComponent.DEFAULT_LEAF;
                //     }
                // })
                // .style('stroke', (d: any) => {
                //     if (d.data.type === 'root') {
                //         return 'transparent';
                //     }
                // })
                .attr('class', (d: any) => {
                    if (d.data.type === 'root') {
                        return 'root-node';
                    }
                    return d._children ? 'full-node' : 'empty-node';
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
                .attr('transform', (d) => 'translate(' + source.y + ',' + source.x + ')')
                .remove();

            nodeExit.select('circle')
                .attr('r', 1e-6);
            // nodeExit.select('use')
            //     .attr('xlink:href', _self.generateIconPath.bind(_self));

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
                });
                // .attr('d', <any> d3.linkHorizontal()
                //     .x((d: any) => {
                //         return source.x0;
                //     })
                //     .y((d: any) => source.y0))
                // .style('stroke', (d: any) => {
                //     if (d.data.type === 'root') {
                //         return 'transparent';
                //     }

                //     return d.data.color || CollapsibleTreeComponent.DEFAULT_PARENT;
                // });

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
            // if (previousNode && previousNode.id !== d.id && d.data.type === 'intrusion-set') {
            //     click(previousNode);
            // }
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
            // if ((!previousNode || previousNode.id !== d.id) && d.data.type === 'intrusion-set') {
            //     previousNode = d;
            // }

        }

        this.treeComplete.emit();
    }

    /**
     * @description determine what icon to use
     */
    private generateIconPath(d: any): string {
        const svgDefs = 'assets/icon/stix-icons/svg/all-defs.svg';
        const apIcon = `${svgDefs}#attack-pattern`;
        const taIcon = `${svgDefs}#threat-actor`;
        const coaIcon = `${svgDefs}#course-of-action`;
        const circleIcon = `${svgDefs}#circle`;
        const type = (d.data as any).type || '';
        let icon = '';
        switch (type) {
            case 'intrusion-set': {
                icon = taIcon;
                break;
            }
            case 'attack-pattern': {
                icon = apIcon;
                break;
            }
            case 'kill_chain_phase': {
                icon = apIcon;
                break;
            }
            case 'course-of-action': {
                icon = coaIcon;
                break;
            }
            case 'root': {
                icon = circleIcon;
                break;
            }
            default: {
                console.log('missing icon for ', type);
                icon = circleIcon;
                break;
            }
        }
        return icon;
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
