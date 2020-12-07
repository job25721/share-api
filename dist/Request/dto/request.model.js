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
exports.Request = void 0;
const graphql_1 = require("@nestjs/graphql");
let Request = class Request {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], Request.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Object)
], Request.prototype, "itemId", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Object)
], Request.prototype, "requestPersonId", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Object)
], Request.prototype, "requestToPersonId", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Request.prototype, "timestamp", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Request.prototype, "reason", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Request.prototype, "wantedRate", void 0);
Request = __decorate([
    graphql_1.ObjectType()
], Request);
exports.Request = Request;
//# sourceMappingURL=request.model.js.map