
import { Component,  OnChanges,
  AfterViewInit,
  Input, Output,
  ElementRef,
  EventEmitter,
  ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import * as D3 from 'd3';

@Component({
  selector: 'link-node-graph',
  templateUrl: './link-node-graph.component.html',
  styleUrls: ['./link-node-graph.component.css']
})
export class LinkNodeGraphComponent implements OnChanges, AfterViewInit  {
    @Output() private nodeMouseover = new EventEmitter();
    @Output() private nodeMouseout = new EventEmitter();
    @Input() private config: any;
    @Input() private forcesEnabled: any;
    @ViewChild('svgWrapper') private element: ElementRef;
    private host;
    private svg;
    private margin;
    private htmlElement: HTMLElement;
    private width;
    private height;
    private min_zoom = 0.1;
    private max_zoom = 7;
    private linkDistance = 70;
    private chargeStrength = -30;
    private collideRadius = 10;
    private group: any;
    private shapesGroup: any;
    private simulation: any;

    public ngAfterViewInit() {
      this.htmlElement = this.element.nativeElement;
      this.host        = D3.select(this.htmlElement);
      this.setup();
    }

    public ngOnChanges(changes: any): void {
      console.dir(changes);
      if (this.group) {
        this.group.remove();
      }
      if (changes.forcesEnabled) {
        this.forcesEnabled = changes.forcesEnabled.currentValue;
      }
      this.setup();
    }

    private setup(): void {
        if (!this.htmlElement) {
            return;
        }
        this.margin = { top: 40, right: 0, bottom: 40, left: 20 };
        this.width = this.htmlElement.offsetWidth - this.margin.left - this.margin.right;
        this.height = this.width  - this.margin.top - this.margin.bottom;

        this.svg = D3.select('svg');
        this.svg.attr('width', this.width);
        this.svg.attr('height', this.height);

        this.group = this.createGroup();
        let zoom = this.setZoomBehavior();
        this.group.call(zoom);
        this.createZoomOverlay();
        this.simulation = this.createSimulation();
        this.setupElements();
    }

    private createGroup(): any {
      return this.svg.append('g');
    }

    private createShapesGroup(): any {
        return this.group.append('g');
    }

    private setupElements(): void {
        this.shapesGroup = this.createShapesGroup();
        let link = this.getLinkElements();
        let node = this.getNodeElements();
        node.append('title').text( (d) => { return d.id; });
        this.simulation.on('tick', tickHandler);
        this.setDragBehavior(node, link);
        this.setHoverEventBehavior(node, link);

        function tickHandler(): void  {
            link.attr('x1', ( d ) => { return d.source.x; } )
                .attr('y1', ( d ) => { return d.source.y; } )
                .attr('x2', ( d ) => { return d.target.x; } )
                .attr('y2', ( d ) => { return d.target.y; } );

            node.attr('cx', ( d ) => { return d.x; } )
                .attr('cy', ( d ) => { return d.y; } );
        }
    }

    private getLinkElements(): any  {
      let link = this.shapesGroup
        .attr('class', 'links')
        .selectAll('line')
        .data(this.config.links)
        .enter().append('line')
        .attr('class', 'link')
        .attr('id', (d) => {
          let id = Math.random().toString();
          if (d.id) {
            id = d.id;
          }
          return id;
        });
      return link;
    }

    private getNodeElements(): any {
      let node = this.shapesGroup.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(this.config.nodes)
        .enter().append('circle')
        .attr('r', (d) => { return d.radius; } )
        .attr('class', (d) => {
          return d.classNames ? 'node ' +  d.classNames : 'node';
        })
        .attr('id', (d) => {
          let id = Math.random().toString();
          if (d.id) {
            id = d.id;
          }
          return id;
        });
      return node;
    }

    private setHoverEventBehavior(node: any, link: any): void {
        let linkedNodesHash = this.getLinkedNodesHash();
        let nodeLinksHash = this.getNodeLinksHash();
        let self = this;
        node.on('mouseover', (d) => {
          this.nodeMouseover.emit(d);
          node.style('fill', 'lightgray');
          let nodeId = '#' + d.id;
          let nodeEl = this.shapesGroup.select(nodeId);
          nodeEl.style('fill', undefined);
          nodeEl.style('stroke', 'black');

          const currentLinkedNodes = linkedNodesHash[d.id];
          if (currentLinkedNodes) {
            currentLinkedNodes.forEach((linkedNodeId) => {
              let id = '#' + linkedNodeId;
              let linkedNodeEl = this.shapesGroup.select(id);
              linkedNodeEl.style('fill', undefined);
            });
          }

          link.style('stroke-opacity', 0.25);
          let currentNodeLinks = nodeLinksHash[d.id];
          if (currentNodeLinks) {
            currentNodeLinks.forEach((linkId) => {
              let id = '#' + linkId;
              let linkEl = this.shapesGroup.select(id);
              linkEl.style('stroke', 'black');
              linkEl.style('stroke-opacity', undefined);
            });
          }
        });

        node.on('mouseout', (d) => {
          this.nodeMouseout.emit(d);
          node.style('fill', undefined);
          node.style('stroke', undefined);
          link.style('stroke', undefined);
          link.style('stroke-opacity', undefined);
        });
    }

    private setDragBehavior(node: any, link: any) {
      let _self = this;
      node.call(D3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      function dragstarted(d) {
        if (!D3.event.active) {
          _self.simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = D3.event.x;
        d.fy = D3.event.y;
      }

      function dragended(d) {
        if (!D3.event.active) {
          _self.simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }
    }

    private setZoomBehavior(): any {
        let _self = this;
        let zoom = D3.zoom().scaleExtent([this.min_zoom, this.max_zoom]);
        zoom.on('zoom', (event) => {
          _self.shapesGroup.attr('transform', 'translate(' + D3.event.translate + ')scale(' + D3.event.scale + ')');
        });
        return zoom;
    }

    private createSimulation(): any {
      let simulation = D3.forceSimulation();
      simulation.nodes(this.config.nodes);
      if (this.forcesEnabled.charge) {
        console.log(this.forcesEnabled.charge);
        this.setForceCharge(simulation);
      }
      if (this.forcesEnabled.center) {
         this.setForceCenter(simulation);
      }
      if (this.forcesEnabled.link) {
        this.setForceLink(simulation);
      }
      if (this.forcesEnabled.collide) {
         this.setForceCollide(simulation);
      }
      if (this.forcesEnabled.column) {
         this.setColumnForcePosition(simulation);
      }
      return simulation;
  }

  private setForceCollide(simulation): void {
      // let radius = this.getNodeCollideRadius();
      let _self = this;
      let forceCollide = D3.forceCollide();
      forceCollide.radius(this.collideRadius);
      simulation.force('collide', forceCollide);
  }

  private setForceCharge(simulation): void {
    let chargeStrength = this.chargeStrength;
    let manyBody = D3.forceManyBody();
    manyBody.strength(chargeStrength);
    simulation.force('charge', manyBody);
  }

  private setForceLink(simulation): void {
    let forceLink = D3.forceLink();
    forceLink.id( (d) => { return d.id; } );
    forceLink.links(this.config.links);
    forceLink.distance(this.linkDistance);
    simulation.force('link', forceLink);
  }

  private setForceCenter(simulation): void {
    let centerCoordinates = this.getCenterCoordinates();
    let forceCenter = D3.forceCenter(centerCoordinates.x, centerCoordinates.y);
    simulation.force('center', forceCenter);
  }

  private getNodeCollideRadius(node): any {
    let collideRadius = this.collideRadius;
    if (node.collideRadius) {
      collideRadius = node.collideRadius;
    }
    return collideRadius;
  }

  private getCenterCoordinates(): any {
    const bounding = this.htmlElement.getBoundingClientRect();
    const width = bounding.width;
    const height = bounding.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const coordinates = {
      x: centerX,
      y: centerY
    };
    return coordinates;
  }

  private getLinkId(link): any {
    return link.id;
  }

  private getLinkedNodesHash(): {} {
    let linkedNodesHash = {};
    this.config.links.forEach((link) => {
      const source = link.source.id;
      const target = link.target.id;

      if (linkedNodesHash[source]) {
        linkedNodesHash[source].push(target);
      } else {
        linkedNodesHash[source] = [target];
      }

      if (linkedNodesHash[target]) {
        linkedNodesHash[target].push(source);
      } else {
        linkedNodesHash[target] = [source];
      }
    });

    return linkedNodesHash;
  }

  private getNodeLinksHash(): {} {
    const hash = {};
    this.config.links.forEach((link) => {
      const source = link.source.id;
      const target = link.target.id;

      if (hash[source]) {
        hash[source].push(link.id);
      } else {
        hash[source] = [link.id];
      }

      if (hash[target]) {
        hash[target].push(link.id);
      } else {
        hash[target] = [link.id];
      }
    });

    return hash;
  }
  private createZoomOverlay(): void {
      const bounding = this.htmlElement.getBoundingClientRect();
      let width = bounding.width;
      let height = bounding.height;
      let zoomOverlay = this.group.append('rect');
      zoomOverlay.attr('width', width);
      zoomOverlay.attr('height', height);
      zoomOverlay.style('fill', 'none');
      zoomOverlay.style('pointer-events', 'all');
      return zoomOverlay;
  }

  private setColumnForcePosition(simulation): void {
    const nodeClasses = {};

    this.config.nodes.forEach((node) => {
      const nodeClass = node.classNames;
      if (nodeClasses[nodeClass]) {
        nodeClasses[nodeClass].push(node);
      } else {
        nodeClasses[nodeClass] = [node];
      }
    });

    const nodeClassColumns = {};
    let totalColumns = 0;
    Object.keys(nodeClasses).forEach(
      (nodeClass) => {
        totalColumns += 1;
        nodeClassColumns[nodeClass] = 0;
    });
    const totalColumnSections = totalColumns + 2;
    const bounding = this.htmlElement.getBoundingClientRect();
    const width = bounding.width;
    const columnSectionWidth = width / totalColumnSections;
    let currentColumnPosition = columnSectionWidth;

    const nodePositionX = {};
    const nodePositionY = {};
    Object.keys(nodeClassColumns).forEach(
      (nodeClass) => {
        nodeClassColumns[nodeClass] = currentColumnPosition;
        const currentNodes = nodeClasses[nodeClass];
        this.setNodePositions(nodePositionX, nodePositionY, currentColumnPosition, currentNodes);
        currentColumnPosition += columnSectionWidth;
      }
    );
    const forcePositionX = D3.forceX();
    forcePositionX.strength(3);
    forcePositionX.x((node) => {
      return nodePositionX[node.id];
    });

    const forcePositionY = D3.forceY();
    forcePositionY.strength(3);
    forcePositionY.y((node) => {
      return nodePositionY[node.id];
    });

    simulation.force('columnForcePositionX', forcePositionX);
    simulation.force('columnForcePositionY', forcePositionY);
  }

  private setNodePositions(nodePositionX, nodePositionY, currentColumnPosition, currentNodes): void {
    let currentNodePositionY = 1;
    currentNodes.forEach((node) => {
      nodePositionX[node.id] = currentColumnPosition;
      nodePositionY[node.id] = currentNodePositionY += (node.radius * 2);
    });
  }
}
