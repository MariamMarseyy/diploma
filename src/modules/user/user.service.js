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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt_1 = require("bcrypt");
var sequelize_1 = require("@nestjs/sequelize");
var user_model_1 = require("./models/user.model");
var role_model_1 = require("./role/models/role.model");
var user_settings_model_1 = require("@modules/user/user-settings/models/user-settings.model");
var user_details_model_1 = require("@modules/user/models/user-details.model");
var UserService = /** @class */ (function () {
    function UserService(_sequelize, _user, _userDetails, _roleService) {
        this._sequelize = _sequelize;
        this._user = _user;
        this._userDetails = _userDetails;
        this._roleService = _roleService;
    }
    /**
     * @description Update User Password
     */
    UserService.prototype.changePassword = function (user, oldPassword, password, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (oldPassword && !user.verifyPassword(oldPassword)) {
                            throw new common_1.NotFoundException('Wrong password');
                        }
                        return [4 /*yield*/, user.update({
                                password: password
                            }, { transaction: transaction })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                message: 'password is changed'
                            }];
                }
            });
        });
    };
    /**
     * @description Get User Data By His Email Address
     * @param email
     * @param password
     */
    UserService.prototype.getUserByEmail = function (email, password) {
        if (password === void 0) { password = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._user.findOne({
                            where: {
                                email: email
                            },
                            attributes: __spreadArray(__spreadArray([
                                'id',
                                'email'
                            ], (password ? ['password'] : []), true), [
                                'createdAt',
                            ], false),
                            include: [
                                {
                                    model: role_model_1.Role,
                                    attributes: ['name']
                                },
                                // {
                                //   model: UserSettings,
                                //   attributes: ['value'],
                                // },
                                // {
                                //   model: UserDetails,
                                //   attributes: {
                                //     exclude: ['userId', 'createdAt', 'updatedAt', 'deletedAt'],
                                //   },
                                // },
                            ],
                            rejectOnEmpty: false
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description Get User Data By His Email Address
     * @param $id
     * @param password
     */
    UserService.prototype.getUserById = function ($id, password) {
        if (password === void 0) { password = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.User.findByPk($id, {
                            attributes: ['id', 'email', 'phone'],
                            include: [
                                {
                                    model: user_details_model_1.UserDetails,
                                    attributes: {
                                        exclude: ['userId', 'createdAt', 'updatedAt', 'deletedAt']
                                    }
                                },
                            ],
                            rejectOnEmpty: new common_1.BadRequestException('User not found')
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description Check User Data By His JWT Decoded Data
     * @param $id
     */
    UserService.prototype.validateUser = function ($id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.User.findByPk($id, {
                            include: [
                                role_model_1.Role,
                                {
                                    model: user_settings_model_1.UserSettings
                                },
                            ],
                            rejectOnEmpty: false
                        })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, user];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param id
     * @param password
     */
    UserService.prototype.changeUserPassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salt = (0, bcrypt_1.genSaltSync)(12);
                        hashedPassword = (0, bcrypt_1.hashSync)(password, salt);
                        return [4 /*yield*/, this._user.update({
                                password: hashedPassword
                            }, {
                                where: {
                                    id: id
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description Get User Data By His Phone
     * @param phone
     */
    UserService.prototype.getUserByPhone = function (phone) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._user.findOne({
                            where: {
                                phone: phone
                            },
                            attributes: ['id', 'email', 'phone', 'isEmailVerified', 'password'],
                            include: [
                                {
                                    model: user_details_model_1.UserDetails,
                                    attributes: {
                                        exclude: ['userId', 'createdAt', 'updatedAt', 'deletedAt']
                                    }
                                },
                                // {
                                //   model: Role,
                                //   attributes: ['name'],
                                // },
                                // {
                                //   model: UserSettings,
                                // },
                            ],
                            rejectOnEmpty: false
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description Check email or affiliate id is exist or not
     * @param email
     * @param affiliateId
     */
    UserService.prototype.checkUserByEmail = function (email, affiliateId) {
        return __awaiter(this, void 0, void 0, function () {
            var userByEmail, affiliate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._user.findOne({
                            where: {
                                email: email
                            }
                        })];
                    case 1:
                        userByEmail = _a.sent();
                        if (userByEmail)
                            throw new common_1.NotFoundException('Email is already registered');
                        if (!affiliateId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._user.findOne({
                                where: {
                                    id: affiliateId
                                }
                            })];
                    case 2:
                        affiliate = _a.sent();
                        if (!affiliate)
                            throw new common_1.NotFoundException("Affiliate id doesn't exist");
                        _a.label = 3;
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
        __param(2, (0, sequelize_1.InjectModel)(user_details_model_1.UserDetails))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
