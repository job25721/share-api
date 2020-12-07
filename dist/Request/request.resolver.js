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
exports.RequestResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const item_model_1 = require("../Item/dto/item.model");
const item_service_1 = require("../Item/item.service");
const user_model_1 = require("../User/dto/user.model");
const user_service_1 = require("../User/user.service");
const request_input_1 = require("./dto/request.input");
const request_model_1 = require("./dto/request.model");
const request_service_1 = require("./request.service");
let RequestResolver = class RequestResolver {
    constructor(requestService, userService, itemService) {
        this.requestService = requestService;
        this.userService = userService;
        this.itemService = itemService;
    }
    async createRequest({ itemId, requestPersonId, reason, wantedRate }) {
        return await this.requestService.addRequest({
            itemId,
            requestPersonId,
            reason,
            wantedRate,
        });
    }
    async acceptRequest(data) {
        return await this.requestService.acceptRequest(data);
    }
    async rejectRequest(data) {
        return await this.requestService.rejectRequest(data);
    }
    getReqById(reqId) {
        return this.requestService.findById(reqId);
    }
    getMyRequests(id) {
        return this.requestService.findMyRequests(id);
    }
    getMySendRequests(id) {
        return this.requestService.findMySendRequests(id);
    }
    item({ itemId }) {
        return this.itemService.findById(itemId);
    }
    requestPerson({ requestPersonId }) {
        return this.userService.findById(requestPersonId);
    }
    requestToPerson({ requestToPersonId }) {
        return this.userService.findById(requestToPersonId);
    }
};
__decorate([
    graphql_1.Mutation(() => request_model_1.Request),
    __param(0, graphql_1.Args('reqData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_input_1.RequestInput]),
    __metadata("design:returntype", Promise)
], RequestResolver.prototype, "createRequest", null);
__decorate([
    graphql_1.Mutation(() => item_model_1.Item),
    __param(0, graphql_1.Args('reqData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_input_1.RequestActivityDto]),
    __metadata("design:returntype", Promise)
], RequestResolver.prototype, "acceptRequest", null);
__decorate([
    graphql_1.Mutation(() => item_model_1.Item),
    __param(0, graphql_1.Args('reqData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_input_1.RequestActivityDto]),
    __metadata("design:returntype", Promise)
], RequestResolver.prototype, "rejectRequest", null);
__decorate([
    graphql_1.Query(() => request_model_1.Request),
    __param(0, graphql_1.Args('reqId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RequestResolver.prototype, "getReqById", null);
__decorate([
    graphql_1.Query(() => [request_model_1.Request]),
    __param(0, graphql_1.Args('myId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RequestResolver.prototype, "getMyRequests", null);
__decorate([
    graphql_1.Query(() => [request_model_1.Request]),
    __param(0, graphql_1.Args('myId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RequestResolver.prototype, "getMySendRequests", null);
__decorate([
    graphql_1.ResolveField(() => item_model_1.Item),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_model_1.Request]),
    __metadata("design:returntype", Promise)
], RequestResolver.prototype, "item", null);
__decorate([
    graphql_1.ResolveField(() => user_model_1.User),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_model_1.Request]),
    __metadata("design:returntype", Promise)
], RequestResolver.prototype, "requestPerson", null);
__decorate([
    graphql_1.ResolveField(() => user_model_1.User),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_model_1.Request]),
    __metadata("design:returntype", Promise)
], RequestResolver.prototype, "requestToPerson", null);
RequestResolver = __decorate([
    graphql_1.Resolver(() => request_model_1.Request),
    __metadata("design:paramtypes", [request_service_1.RequestService,
        user_service_1.UserService,
        item_service_1.ItemService])
], RequestResolver);
exports.RequestResolver = RequestResolver;
//# sourceMappingURL=request.resolver.js.map