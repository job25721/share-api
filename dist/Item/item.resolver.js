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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const itemLog_model_1 = require("../ItemLog/dto/itemLog.model");
const itemLog_service_1 = require("../ItemLog/itemLog.service");
const user_model_1 = require("../User/dto/user.model");
const user_service_1 = require("../User/user.service");
const item_input_1 = require("./dto/item.input");
const item_model_1 = require("./dto/item.model");
const item_service_1 = require("./item.service");
let ItemResolver = class ItemResolver {
    constructor(itemService, userService, itemLogService) {
        this.itemService = itemService;
        this.userService = userService;
        this.itemLogService = itemLogService;
    }
    async getAllItem() {
        return await this.itemService.findAll();
    }
    async getItemById(id) {
        return await this.itemService.findById(id);
    }
    async getMyItem(id) {
        return await this.itemService.findMyAllItem(id);
    }
    async updateItemStatus(data) {
        return await this.itemService.changeItemStatus(data);
    }
    async addNewItem(newItem) {
        return await this.itemService.create(newItem);
    }
    async owner({ ownerId }) {
        return await this.userService.findById(ownerId);
    }
    async log({ logId }) {
        return await this.itemLogService.findById(logId);
    }
};
__decorate([
    graphql_1.Query(() => [item_model_1.Item]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "getAllItem", null);
__decorate([
    graphql_1.Query(() => item_model_1.Item),
    __param(0, graphql_1.Args('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "getItemById", null);
__decorate([
    graphql_1.Query(() => [item_model_1.Item]),
    __param(0, graphql_1.Args('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "getMyItem", null);
__decorate([
    graphql_1.Mutation(() => item_model_1.Item),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_input_1.changeStatus]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "updateItemStatus", null);
__decorate([
    graphql_1.Mutation(() => item_model_1.Item),
    __param(0, graphql_1.Args('item')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_input_1.ItemInput]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "addNewItem", null);
__decorate([
    graphql_1.ResolveField(() => user_model_1.User),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_model_1.Item]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "owner", null);
__decorate([
    graphql_1.ResolveField(() => itemLog_model_1.ItemLog),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_model_1.Item]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "log", null);
ItemResolver = __decorate([
    graphql_1.Resolver(() => item_model_1.Item),
    __metadata("design:paramtypes", [item_service_1.ItemService,
        user_service_1.UserService,
        itemLog_service_1.ItemLogService])
], ItemResolver);
exports.ItemResolver = ItemResolver;
//# sourceMappingURL=item.resolver.js.map