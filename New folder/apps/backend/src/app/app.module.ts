import { MiddlewareConsumer, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthMiddleware } from "./auth/middleware/auth.middleware";
import { SocketModule } from "./socket/socket.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/social"),
    JwtModule.register({
      global: true,
      secret: "apple1234",
      signOptions: { expiresIn: "24h" },
    }),
    UserModule,
    AuthModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude("/user/signUp", "/user/signIn")
      .forRoutes("/api/user");
  }
}
