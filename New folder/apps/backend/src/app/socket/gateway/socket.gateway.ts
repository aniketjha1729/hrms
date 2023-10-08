import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
// import { AuthService } from "../../auth/auth.service";

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}
  @WebSocketServer()
  private server;

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any) {
    this.server.emit("message", "test");
  }

  async handleConnection(socket: Socket) {
    // const decodedToken = await this._authService.verifyJwt(
    //   socket.handshake.headers.authorization
    // );

    console.log("Connected");
    this.server.emit("message", "I am Connected");
  }

  handleDisconnect() {
    console.log("Disconnected");
    this.server.emit("message", "Disconnected");
  }
}
