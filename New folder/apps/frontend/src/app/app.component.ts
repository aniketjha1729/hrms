import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { Subscription } from 'rxjs';
import { SocketService } from './services/socket.service';
@Component({
  selector: 'social-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _subs = new Subscription();
  response: any;
  constructor(
    private appService: AppService,
    private _socketService: SocketService
  ) {}
  title = 'frontend';
  socketData: any;
  ngOnInit() {
    this._subs.add(
      this.appService.testRoute().subscribe((data) => {
        console.log(data);

        this.response = data;
      })
    );
    this.socketData = this._socketService.getMessage();
  }
}
