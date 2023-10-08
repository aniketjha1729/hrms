/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(6);
const app_controller_1 = __webpack_require__(7);
const app_service_1 = __webpack_require__(8);
const auth_module_1 = __webpack_require__(9);
const auth_middleware_1 = __webpack_require__(13);
const socket_module_1 = __webpack_require__(14);
const user_module_1 = __webpack_require__(17);
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude("/user/signUp", "/user/signIn")
            .forRoutes("/api/user");
    }
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot("mongodb://localhost/social"),
            jwt_1.JwtModule.register({
                global: true,
                secret: "apple1234",
                signOptions: { expiresIn: "24h" },
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            socket_module_1.SocketModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(8);
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)('hello'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AppService = exports.AppService = class AppService {
    getData() {
        return { message: 'Hello world ok by wht' };
    }
};
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(10);
const mongoose_1 = __webpack_require__(6);
const user_model_1 = __webpack_require__(12);
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_model_1.User.name, schema: user_model_1.UserSchema }]),
        ],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(5);
const bcrypt = tslib_1.__importStar(__webpack_require__(11));
let AuthService = exports.AuthService = class AuthService {
    constructor(_jwtService) {
        this._jwtService = _jwtService;
    }
    async generateJwt(userId) {
        return this._jwtService.signAsync({ id: userId });
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 12);
    }
    async comparePasswords(password, storedPasswordHash) {
        return bcrypt.compare(password, storedPasswordHash);
    }
    verifyJwt(jwt) {
        return this._jwtService.verifyAsync(jwt);
    }
};
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
let User = exports.User = class User {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    (0, common_1.Optional)(),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "admin", void 0);
exports.User = User = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        collection: 'user_details',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMiddleware = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(5);
let AuthMiddleware = exports.AuthMiddleware = class AuthMiddleware {
    constructor(_jwtService) {
        this._jwtService = _jwtService;
    }
    async use(req, res, next) {
        try {
            const [type, token] = req.headers['authorization'].split(' ');
            if (type === 'Bearer') {
                const payload = await this._jwtService.verifyAsync(token, {
                    secret: 'apple1234',
                });
                req['user'] = payload;
            }
            next();
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException('Unauthenticated', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.AuthMiddleware = AuthMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthMiddleware);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const socket_gateway_1 = __webpack_require__(15);
let SocketModule = exports.SocketModule = class SocketModule {
};
exports.SocketModule = SocketModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [socket_gateway_1.SocketGateway],
    })
], SocketModule);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketGateway = void 0;
const tslib_1 = __webpack_require__(4);
const websockets_1 = __webpack_require__(16);
// import { AuthService } from "../../auth/auth.service";
let SocketGateway = exports.SocketGateway = class SocketGateway {
    constructor() { }
    handleMessage(client, payload) {
        this.server.emit("message", "test");
    }
    async handleConnection(socket) {
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
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", Object)
], SocketGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)("message"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleMessage", null);
exports.SocketGateway = SocketGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    tslib_1.__metadata("design:paramtypes", [])
], SocketGateway);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
const auth_module_1 = __webpack_require__(9);
const user_controller_1 = __webpack_require__(18);
const user_model_1 = __webpack_require__(12);
const user_service_1 = __webpack_require__(19);
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_model_1.User.name, schema: user_model_1.UserSchema }]),
            auth_module_1.AuthModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
    })
], UserModule);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const user_service_1 = __webpack_require__(19);
const user_dto_1 = __webpack_require__(21);
const role_guard_1 = __webpack_require__(23);
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserRequest) {
        try {
            const createdUser = await this.userService.createUser(createUserRequest);
            return new user_dto_1.UserResponseDto(createdUser);
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException('Unable to save user', common_1.HttpStatus.INTERNAL_SERVER_ERROR, { cause: new Error(err) });
        }
    }
    async signIn(loginUserRequest) {
        const jwt = await this.userService.signInUser(loginUserRequest);
        return {
            access_token: jwt,
            token_type: 'JWT',
            expires_in: 10000,
        };
    }
    async getProfile(req) {
        return req.user.id;
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('signUp'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserRequest !== "undefined" && user_dto_1.CreateUserRequest) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, common_1.Post)('signIn'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.LoginUserRequest !== "undefined" && user_dto_1.LoginUserRequest) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "signIn", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Get)('profile'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "getProfile", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(6);
const user_model_1 = __webpack_require__(12);
const mongoose_2 = __webpack_require__(20);
const auth_service_1 = __webpack_require__(10);
let UserService = exports.UserService = class UserService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
    }
    async createUser(createUserRequest) {
        const user = await this.userModel.findOne({
            email: createUserRequest.email,
        });
        if (user) {
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT);
        }
        const passwordHash = await this.hashPassword(createUserRequest.password);
        const userData = {
            email: createUserRequest.email,
            name: createUserRequest.name,
            admin: createUserRequest?.admin,
            password: passwordHash,
        };
        const newUser = new this.userModel(userData);
        const newUserData = await newUser.save();
        return newUserData;
    }
    async signInUser(user) {
        try {
            const foundUser = await this.userModel.findOne({ email: user.email });
            if (foundUser) {
                const matches = await this.validatePassword(user.password, foundUser.password);
                if (matches) {
                    return this.authService.generateJwt(foundUser._id);
                }
                else {
                    throw new common_1.HttpException('Login was not successfull, wrong credentials', common_1.HttpStatus.UNAUTHORIZED);
                }
            }
            else {
                throw new common_1.HttpException('Login was not successfull, wrong credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async hashPassword(password) {
        return this.authService.hashPassword(password);
    }
    async validatePassword(password, storedPasswordHash) {
        return this.authService.comparePasswords(password, storedPasswordHash);
    }
};
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], UserService);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResponseDto = exports.LoginUserRequest = exports.CreateUserRequest = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(22);
class CreateUserRequest {
}
exports.CreateUserRequest = CreateUserRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserRequest.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserRequest.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserRequest.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateUserRequest.prototype, "admin", void 0);
class LoginUserRequest {
}
exports.LoginUserRequest = LoginUserRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], LoginUserRequest.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginUserRequest.prototype, "password", void 0);
class UserResponseDto {
    constructor(user) {
        this.email = user.email;
    }
}
exports.UserResponseDto = UserResponseDto;


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const user_model_1 = __webpack_require__(12);
const mongoose_1 = __webpack_require__(20);
const mongoose_2 = __webpack_require__(6);
let RolesGuard = exports.RolesGuard = class RolesGuard {
    constructor(_userModel) {
        this._userModel = _userModel;
    }
    async canActivate(context) {
        try {
            const { user } = context.switchToHttp().getRequest();
            const userDetails = await this._userModel.findById(user.id);
            if (userDetails && userDetails.admin === true) {
                return true;
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.RolesGuard = RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(user_model_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], RolesGuard);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map