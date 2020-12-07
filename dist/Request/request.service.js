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
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const item_service_1 = require("../Item/item.service");
const item_status_1 = require("../Item/item.status");
const itemLog_service_1 = require("../ItemLog/itemLog.service");
const user_service_1 = require("../User/user.service");
let RequestService = class RequestService {
    constructor(requestModel, itemLogService, itemService, userService) {
        this.requestModel = requestModel;
        this.itemLogService = itemLogService;
        this.itemService = itemService;
        this.userService = userService;
    }
    async addRequest(data) {
        const { requestPersonId, itemId, reason, wantedRate } = data;
        try {
            const existRequest = await this.requestModel.findOne({
                itemId: mongoose_2.Types.ObjectId(itemId),
                requestPersonId: mongoose_2.Types.ObjectId(requestPersonId),
            });
            if (existRequest === null) {
                const item = await this.itemService.findById(itemId);
                if (item.ownerId == requestPersonId) {
                    throw new Error("can't request your own item");
                }
                if (item.status !== item_status_1.itemStatus.active) {
                    throw new Error("item is not available can't request !!");
                }
                const receiver = await this.userService.findById(requestPersonId);
                await this.itemLogService.addLog({
                    itemId,
                    actorId: requestPersonId,
                    action: `${receiver.info.firstName} ทำการรีเควสของชิ้นนี้`,
                });
                const reqDto = {
                    itemId: mongoose_2.Types.ObjectId(itemId),
                    requestPersonId: mongoose_2.Types.ObjectId(requestPersonId),
                    requestToPersonId: item.ownerId,
                    timestamp: new Date(Date.now()),
                    reason,
                    wantedRate,
                };
                const newRequest = new this.requestModel(reqDto);
                return await newRequest.save();
            }
            else {
                throw new Error(`you has exist request an item ${itemId}`);
            }
        }
        catch (err) {
            return err;
        }
    }
    async findById(reqId) {
        try {
            const res = await this.requestModel.findById(reqId);
            if (res === null)
                throw new Error('No request');
            return res;
        }
        catch (err) {
            return err;
        }
    }
    async findMyRequests(myId) {
        return this.requestModel.find({ requestToPersonId: mongoose_2.Types.ObjectId(myId) });
    }
    async findMySendRequests(requestPersonId) {
        return this.requestModel.find({
            requestPersonId: mongoose_2.Types.ObjectId(requestPersonId),
        });
    }
    async acceptRequest(data) {
        const { reqId, actionPersonId } = data;
        try {
            const req = await this.findById(reqId);
            const { ownerId, status } = await this.itemService.findById(req.itemId);
            if (ownerId === undefined)
                throw new Error('no this request id');
            if (ownerId != actionPersonId) {
                throw new Error('accept person is not item owner');
            }
            if (status !== item_status_1.itemStatus.active) {
                throw new Error("can't accept this request because request is already accepted or item is not available");
            }
            const { itemId, requestPersonId } = req;
            const giver = await this.userService.findById(actionPersonId);
            const receiver = await this.userService.findById(requestPersonId);
            await this.itemLogService.addLog({
                itemId: itemId.toString(),
                actorId: actionPersonId,
                action: `${giver.info.firstName} ได้ยินยอมส่งต่อของให้ ${receiver.info.firstName}`,
            });
            return await this.itemService.changeItemStatus({
                itemId,
                status: item_status_1.itemStatus.pending,
            });
        }
        catch (error) {
            return error;
        }
    }
    async rejectRequest(data) {
        const { reqId, actionPersonId } = data;
        try {
            const request = await this.requestModel.findById(reqId);
            const { itemId, requestPersonId } = request;
            const item = await this.itemService.findById(itemId);
            const { ownerId } = item;
            if (ownerId === undefined)
                throw new Error('no this request id');
            if (ownerId != actionPersonId) {
                throw new Error('actor person is not item owner');
            }
            const giver = await this.userService.findById(actionPersonId);
            const receiver = await this.userService.findById(requestPersonId);
            await this.itemLogService.addLog({
                itemId: itemId.toString(),
                actorId: actionPersonId,
                action: `${giver.info.firstName} ได้ปฏิเสธที่จะส่งต่อของให้ ${receiver.info.firstName}`,
            });
            await request.remove();
            return item;
        }
        catch (error) {
            return error;
        }
    }
};
RequestService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Request')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        itemLog_service_1.ItemLogService,
        item_service_1.ItemService,
        user_service_1.UserService])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map