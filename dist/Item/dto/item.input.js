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
exports.ItemInput = exports.changeStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
let changeStatus = class changeStatus {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Object)
], changeStatus.prototype, "itemId", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], changeStatus.prototype, "status", void 0);
changeStatus = __decorate([
    graphql_1.InputType()
], changeStatus);
exports.changeStatus = changeStatus;
let ItemInput = class ItemInput {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ItemInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ItemInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ItemInput.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ItemInput.prototype, "tag", void 0);
ItemInput = __decorate([
    graphql_1.InputType()
], ItemInput);
exports.ItemInput = ItemInput;
//# sourceMappingURL=item.input.js.map