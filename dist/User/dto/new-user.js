"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewUser = void 0;
const graphql_1 = require("@nestjs/graphql");
let newUserInfo = class newUserInfo {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], newUserInfo.prototype, "firstName", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], newUserInfo.prototype, "lastName", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], newUserInfo.prototype, "birthDate", void 0);
__decorate([
    graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], newUserInfo.prototype, "age", void 0);
newUserInfo = __decorate([
    graphql_1.InputType()
], newUserInfo);
let NewUser = class NewUser {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], NewUser.prototype, "username", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], NewUser.prototype, "password", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], NewUser.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], NewUser.prototype, "avatar", void 0);
__decorate([
    graphql_1.Field(() => newUserInfo, { nullable: true }),
    __metadata("design:type", newUserInfo)
], NewUser.prototype, "info", void 0);
NewUser = __decorate([
    graphql_1.InputType()
], NewUser);
exports.NewUser = NewUser;
//# sourceMappingURL=new-user.js.map