import { DebugElement } from '@angular/core';
import { tick, ComponentFixture } from '@angular/core/testing';

///// Short utilities /////

export function click(e: DebugElement ) {
    // query for the save element selector
    e.triggerEventHandler('click', null);
}

export function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }
