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
exports.RequestActivityDto = exports.RequestInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let RequestInput = class RequestInput {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], RequestInput.prototype, "itemId", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], RequestInput.prototype, "requestPersonId", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], RequestInput.prototype, "reason", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], RequestInput.prototype, "wantedRate", void 0);
RequestInput = __decorate([
    graphql_1.InputType()
], RequestInput);
exports.RequestInput = RequestInput;
let RequestActivityDto = class RequestActivityDto {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], RequestActivityDto.prototype, "reqId", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], RequestActivityDto.prototype, "actionPersonId", void 0);
RequestActivityDto = __decorate([
    graphql_1.InputType()
], RequestActivityDto);
exports.RequestActivityDto = RequestActivityDto;
//# sourceMappingURL=request.input.js.map