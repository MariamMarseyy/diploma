"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignUpDto = exports.RegisterUserDto = exports.ResetPasswordDto = exports.EmailDto = exports.AuthRequestDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var match_decorator_1 = require("@common/decorators/match.decorator");
var AuthRequestDto = /** @class */ (function () {
    function AuthRequestDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'email is required' }),
        (0, swagger_1.ApiProperty)({
            description: 'Insert account email.'
        }),
        (0, class_validator_1.IsEmail)()
    ], AuthRequestDto.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Insert account password.'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(6),
        (0, class_validator_1.MaxLength)(20),
        (0, class_validator_1.Matches)(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'password too weak'
        })
    ], AuthRequestDto.prototype, "password");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)({
            description: 'Check is robot or not'
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], AuthRequestDto.prototype, "human");
    return AuthRequestDto;
}());
exports.AuthRequestDto = AuthRequestDto;
var EmailDto = /** @class */ (function () {
    function EmailDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Insert account email.'
        }),
        (0, class_validator_1.IsEmail)()
    ], EmailDto.prototype, "email");
    return EmailDto;
}());
exports.EmailDto = EmailDto;
var ResetPasswordDto = /** @class */ (function () {
    function ResetPasswordDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Insert token.'
        }),
        (0, class_validator_1.IsUUID)('4')
    ], ResetPasswordDto.prototype, "token");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Insert new password.'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(6),
        (0, class_validator_1.MaxLength)(20),
        (0, class_validator_1.Matches)(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'password too weak'
        })
    ], ResetPasswordDto.prototype, "password");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Confirm password.'
        }),
        (0, class_validator_1.IsString)(),
        (0, match_decorator_1.Match)('password', { message: 'must match the password' })
    ], ResetPasswordDto.prototype, "passwordConfirm");
    return ResetPasswordDto;
}());
exports.ResetPasswordDto = ResetPasswordDto;
var RegisterUserDto = /** @class */ (function () {
    function RegisterUserDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Insert name.'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)({ message: 'name is required' })
    ], RegisterUserDto.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Insert surname.'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)({ message: 'Surname is required' })
    ], RegisterUserDto.prototype, "surname");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Insert email. Ex: peterwillson@gmail.com.'
        }),
        (0, class_validator_1.IsEmail)()
    ], RegisterUserDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
        (0, swagger_1.ApiPropertyOptional)({
            description: 'Insert password.'
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(6),
        (0, class_validator_1.MaxLength)(20),
        (0, class_validator_1.Matches)(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'password too weak'
        })
    ], RegisterUserDto.prototype, "password");
    return RegisterUserDto;
}());
exports.RegisterUserDto = RegisterUserDto;
var SignUpDto = /** @class */ (function () {
    function SignUpDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Insert email. Ex: peterwillson@gmail.com.'
        }),
        (0, class_validator_1.IsEmail)()
    ], SignUpDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
        (0, swagger_1.ApiPropertyOptional)({
            description: 'Insert password.'
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(6),
        (0, class_validator_1.MaxLength)(20),
        (0, class_validator_1.Matches)(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'password too weak'
        })
    ], SignUpDto.prototype, "password");
    return SignUpDto;
}());
exports.SignUpDto = SignUpDto;
