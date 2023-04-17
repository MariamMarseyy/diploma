"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var sequelize_1 = require("@nestjs/sequelize");
var user_model_1 = require("../user/models/user.model");
var AuthService = /** @class */ (function () {
    function AuthService(_user, _usersService, _jwtService) {
        this._user = _user;
        this._usersService = _usersService;
        this._jwtService = _jwtService;
    }
    /**
     * @description User Sign Up
     * @param signUpDto
     */
    AuthService.prototype.signUp = function (signUpDto) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = signUpDto.email, password = signUpDto.password;
                        return [4 /*yield*/, this._user.create({
                                email: email,
                                password: password || null
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * @description Main Auth Service & Return access_token
     * @param loginInfo
     */
    AuthService.prototype.auth = function (loginInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._usersService.getUserByEmail(loginInfo.email, true)];
                    case 1:
                        user = _a.sent();
                        if (!(user === null || user === void 0 ? void 0 : user.verifyPassword(loginInfo.password))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.login(user)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: throw new common_1.BadRequestException('Incorrect Credentials');
                }
            });
        });
    };
    AuthService.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, jwtPayload, accessToken, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user)
                            throw new common_1.NotFoundException('User not Found');
                        if (!user.isEmailVerified)
                            throw new common_1.ForbiddenException('Your account is suspended');
                        return [4 /*yield*/, this._usersService.getUserByEmail(user.email)];
                    case 1:
                        userInfo = _a.sent();
                        jwtPayload = {
                            id: user.id,
                            email: user.email
                        };
                        accessToken = this._jwtService.sign(jwtPayload, {
                            expiresIn: '1h'
                        });
                        if (!accessToken)
                            throw new common_1.BadRequestException('Incorrect Credentials');
                        refreshToken = this._jwtService.sign(jwtPayload, {
                            expiresIn: '30d'
                        });
                        user = user.toJSON();
                        if (!userInfo.amount) {
                            userInfo.amount = 0;
                        }
                        return [2 /*return*/, {
                                authorized: true,
                                access_token: accessToken,
                                refresh_token: refreshToken,
                                userInfo: userInfo
                            }];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, sequelize_1.InjectModel)(user_model_1.User))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
