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
exports.ItemLog = exports.Log = void 0;
const graphql_1 = require("@nestjs/graphql");
let Log = class Log {
};
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Log.prototype, "timestamp", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Object)
], Log.prototype, "actor", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Log.prototype, "action", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Log.prototype, "hash", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Log.prototype, "prevHash", void 0);
Log = __decorate([
    graphql_1.ObjectType()
], Log);
exports.Log = Log;
let ItemLog = class ItemLog {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], ItemLog.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Object)
], ItemLog.prototype, "itemId", void 0);
__decorate([
    graphql_1.Field(() => [Log]),
    __metadata("design:type", Array)
], ItemLog.prototype, "logs", void 0);
ItemLog = __decorate([
    graphql_1.ObjectType()
], ItemLog);
exports.ItemLog = ItemLog;
//# sourceMappingURL=itemLog.model.js.map