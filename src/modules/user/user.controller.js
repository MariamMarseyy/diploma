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
exports.UserController = void 0;
var _currentUser_1 = require("@currentUser");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var message_code_error_1 = require("@common/errors/message-code-error");
/**
 *
 */
var UserController = /** @class */ (function () {
    function UserController(_userService, _userManagementService) {
        this._userService = _userService;
        this._userManagementService = _userManagementService;
    }
    /**
     * export users data
     */
    UserController.prototype.exportUsersData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._userManagementService.exportUsersData()];
            });
        });
    };
    /**
     * create new user
     * @param currentUser
     * @param createUserDto
     */
    UserController.prototype.create = function (currentUser, createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._userManagementService.create(currentUser, createUserDto)];
            });
        });
    };
    /**
     * Get user Information
     */
    UserController.prototype.getUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._userService.getUserById(user.id)];
            });
        });
    };
    /**
     * get all users
     */
    UserController.prototype.findAll = function (paginate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._userManagementService.findAll(paginate)];
            });
        });
    };
    /**
     * get user by index
     * @param id
     */
    UserController.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._userManagementService.findOne(id)];
            });
        });
    };
    /**
     * @description Change current user password
     *
     * @param user
     * @param changePasswordRequest
     */
    UserController.prototype.changePassword = function (user, changePasswordRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user) {
                            throw new message_code_error_1.MessageCodeError('auth:logout:notLoggedIn');
                        }
                        return [4 /*yield*/, this._userService.getUserByEmail(user.email, true)];
                    case 1:
                        currentUser = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this._userService.changePassword(currentUser, changePasswordRequest.oldPassword, changePasswordRequest.password)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * update user by index
     * @param user
     * @param updateUserDto
     */
    UserController.prototype.updateCurrent = function (user, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = user.id;
                return [2 /*return*/, this._userManagementService.update(id, updateUserDto)];
            });
        });
    };
    /**
     * @description Set phone number
     *
     * @param user
     * @param phoneDto
     */
    UserController.prototype.SetPhoneNumber = function (user, phoneDto) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = user.id;
                        return [4 /*yield*/, this._userManagementService.SetPhoneNumber(id, phoneDto.phone)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Enable/Disable exported user data
     *
     * @param user
     * @param exportedDataStatusDto
     */
    UserController.prototype.changeExportedUserDataStatus = function (user, exportedDataStatusDto) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = user.id;
                        return [4 /*yield*/, this._userManagementService.changeExportedUserDataStatus(id, exportedDataStatusDto.exportData)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * update user by index
     * @param id
     * @param updateUserDto
     */
    UserController.prototype.update = function (id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._userManagementService.update(id, updateUserDto)];
            });
        });
    };
    /**
     * delete user by index
     * @param id
     */
    UserController.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._userManagementService.remove(id)];
            });
        });
    };
    __decorate([
        (0, common_1.Get)('export-all-data'),
        (0, swagger_1.ApiOperation)({ summary: 'Export users data' })
    ], UserController.prototype, "exportUsersData");
    __decorate([
        (0, common_1.Post)(),
        (0, swagger_1.ApiOperation)({ summary: 'Create new user' }),
        __param(0, (0, _currentUser_1.CurrentUser)()),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "create");
    __decorate([
        (0, common_1.Get)('profile'),
        (0, swagger_1.ApiOperation)({ summary: 'Get user Profile' }),
        __param(0, (0, _currentUser_1.CurrentUser)())
    ], UserController.prototype, "getUser");
    __decorate([
        (0, common_1.Get)(),
        (0, swagger_1.ApiOperation)({ summary: 'Get a list of user' }),
        __param(0, (0, common_1.Query)())
    ], UserController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        (0, swagger_1.ApiOperation)({ summary: 'Get user' }),
        __param(0, (0, common_1.Param)('id'))
    ], UserController.prototype, "findOne");
    __decorate([
        (0, common_1.Put)('change-password'),
        (0, swagger_1.ApiOperation)({ summary: 'Change current user password' }),
        __param(0, (0, _currentUser_1.CurrentUser)()),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "changePassword");
    __decorate([
        (0, common_1.Put)('current'),
        (0, swagger_1.ApiOperation)({ summary: 'Update current user' }),
        __param(0, (0, _currentUser_1.CurrentUser)()),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "updateCurrent");
    __decorate([
        (0, common_1.Put)('set-phone'),
        (0, swagger_1.ApiOperation)({ summary: 'Set phone number' }),
        __param(0, (0, _currentUser_1.CurrentUser)()),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "SetPhoneNumber");
    __decorate([
        (0, common_1.Put)('exported-data-status'),
        (0, swagger_1.ApiOperation)({ summary: 'Enable/Disable exported user data' }),
        __param(0, (0, _currentUser_1.CurrentUser)()),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "changeExportedUserDataStatus");
    __decorate([
        (0, common_1.Put)(':id'),
        (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, swagger_1.ApiOperation)({ summary: 'Remove user' }),
        __param(0, (0, common_1.Param)('id'))
    ], UserController.prototype, "remove");
    UserController = __decorate([
        (0, swagger_1.ApiTags)('User'),
        (0, swagger_1.ApiBearerAuth)(),
        (0, common_1.Controller)('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
