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
exports.Item = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("mongoose");
let Item = class Item {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Item.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Item.prototype, "category", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Item.prototype, "tag", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Object)
], Item.prototype, "ownerId", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Item.prototype, "status", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Item.prototype, "createdDate", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Object)
], Item.prototype, "logId", void 0);
Item = __decorate([
    graphql_1.ObjectType()
], Item);
exports.Item = Item;
//# sourceMappingURL=item.model.js.map