import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})


export class MainContainerComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef})
  container!: ViewContainerRef;
  isContainer : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  createComponent(): void{
    this.container.createComponent(LoginComponent);
    this.isContainer = true;
  }
  ngAfterViewInit(): void{
    // this.createComponent()
  }
}
