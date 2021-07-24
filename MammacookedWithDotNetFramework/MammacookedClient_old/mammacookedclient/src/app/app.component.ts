import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MammaService } from "./mamma.service";
import { from } from 'rxjs';
import { LoginComponent } from "./login/login.component"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MammaService]
})
export class AppComponent implements OnInit {
  title = 'mammacookedclient';
  token: any;
  constructor(private _mammaService: MammaService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this._mammaService.firstget().subscribe((data) => {

      console.log(data);
    });
  }
}
