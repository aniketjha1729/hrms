import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
