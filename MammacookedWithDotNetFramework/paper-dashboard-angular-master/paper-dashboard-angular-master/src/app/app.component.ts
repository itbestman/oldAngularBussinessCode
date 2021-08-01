import { Component } from '@angular/core';
import { MammaService } from './mamma.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  public localAppService: {}
  constructor(private appService: MammaService) {
    this.localAppService = appService;
    
  }
}
