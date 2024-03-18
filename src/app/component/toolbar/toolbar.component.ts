import { SharedVariables } from './../../shared/shared.variables';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  isDarkMode: boolean = true;
  constructor(public sharedVariables: SharedVariables, private renderer: Renderer2, private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    
  }

  onClick() {
    this.sharedVariables.setTripContaiVisible(true);
    this.sharedVariables.setCitiesContVisi(false);
  }

  changeMode(event: any) {
    let backCardColor = '';
    if (this.isDarkMode) {
      document.body.style.background = '#333';
      event.currentTarget.parentElement.style.background = '#006581'
      backCardColor = '#4d4d4d';
    } else {
      document.body.style.background = '';
      event.currentTarget.parentElement.style.background = '#01BAEF'
    }
    this.renderer.setStyle(this.elementRef.nativeElement, '--button-color', backCardColor);
    this.isDarkMode = !this.isDarkMode;
  }
}
