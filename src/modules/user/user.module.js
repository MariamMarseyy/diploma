"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var sequelize_1 = require("@nestjs/sequelize");
var user_service_1 = require("./user.service");
var user_model_1 = require("./models/user.model");
var role_module_1 = require("./role/role.module");
var role_model_1 = require("@modules/user/role/models/role.model");
var user_management_service_1 = require("@modules/user/user-managment/user-management.service");
var user_controller_1 = require("@modules/user/user.controller");
var user_settings_model_1 = require("@modules/user/user-settings/models/user-settings.model");
var user_settings_module_1 = require("@modules/user/user-settings/user-settings.module");
var mail_module_1 = require("@modules/mail/mail.module");
var user_details_model_1 = require("@modules/user/models/user-details.model");
var auth_code_model_1 = require("@modules/auth/models/auth-code.model");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        (0, common_1.Module)({
            imports: [
                sequelize_1.SequelizeModule.forFeature([user_model_1.User, role_model_1.Role, user_settings_model_1.UserSettings, user_details_model_1.UserDetails, auth_code_model_1.AuthCode]),
                role_module_1.RoleModule,
                user_settings_module_1.UserSettingsModule,
                mail_module_1.MailModule,
            ],
            controllers: [user_controller_1.UserController],
            providers: [user_service_1.UserService, user_management_service_1.UserManagementService],
            exports: [user_service_1.UserService, role_module_1.RoleModule]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
