import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ControlValueAccessor } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-main-login',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})


export class MainContainerComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef})
  container!: ViewContainerRef;
  isContainer : boolean = false;
  constructor(  ) { }

  ngOnInit(): void {
  }
  changeComponent(componentName : string ): void{
    this.container.clear()
    let component : any;
    switch (componentName) {
      case "register":
        component = this.container.createComponent(RegisterComponent)
        break;
      case "login":
        component = this.container.createComponent(LoginComponent)
        break;
      default:
        break;
    }
    component.instance.changeComponent.subscribe((componentName: string)  => this.changeComponent(componentName))
    this.isContainer = true;
  }
  ngAfterViewInit(): void{
    // this.createComponent()
  }
  test(data : any){
    console.log("aa");
  }
}
