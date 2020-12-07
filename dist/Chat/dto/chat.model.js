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
exports.Chat = exports.ChatMessage = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("mongoose");
let ChatMessage = class ChatMessage {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ChatMessage.prototype, "message", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], ChatMessage.prototype, "timestamp", void 0);
ChatMessage = __decorate([
    graphql_1.ObjectType()
], ChatMessage);
exports.ChatMessage = ChatMessage;
let Chat = class Chat {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Chat.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Chat.prototype, "from", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Chat.prototype, "to", void 0);
__decorate([
    graphql_1.Field(() => [ChatMessage]),
    __metadata("design:type", Array)
], Chat.prototype, "data", void 0);
Chat = __decorate([
    graphql_1.ObjectType()
], Chat);
exports.Chat = Chat;
//# sourceMappingURL=chat.model.js.map