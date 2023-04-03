import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = "title";
  isLogged : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  login():void{
    this.isLogged = !this.isLogged;
  }
}
