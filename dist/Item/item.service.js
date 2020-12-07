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
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const itemLog_service_1 = require("../ItemLog/itemLog.service");
const item_status_1 = require("./item.status");
let ItemService = class ItemService {
    constructor(itemModel, itemLogService) {
        this.itemModel = itemModel;
        this.itemLogService = itemLogService;
    }
    async findAll() {
        return await this.itemModel.find();
    }
    async findById(id) {
        try {
            const res = await this.itemModel.findById(id);
            if (res === null)
                throw new Error("item you're looking not found");
            return res;
        }
        catch (err) {
            return err;
        }
    }
    async findMyAllItem(ownerId) {
        return await this.itemModel.find({ ownerId: mongoose_2.Types.ObjectId(ownerId) });
    }
    async findMyItem(data) {
        const { ownerId, itemId } = data;
        return await this.itemModel.findOne({
            ownerId: mongoose_2.Types.ObjectId(ownerId),
            _id: mongoose_2.Types.ObjectId(itemId),
        });
    }
    async create(createItemDto) {
        const now = new Date(Date.now());
        const userId = '5fce7401f9a69cb3f7db04ad';
        const newItem = new this.itemModel(createItemDto);
        newItem.createdDate = now;
        newItem.status = item_status_1.itemStatus.active;
        newItem.ownerId = mongoose_2.Types.ObjectId(userId);
        const itemLog = await this.itemLogService.InitLog({
            itemId: newItem.id,
            actorId: userId,
        });
        newItem.logId = new mongoose_2.Types.ObjectId(itemLog.id);
        return await newItem.save();
    }
    async changeItemStatus(data) {
        const { itemId, status } = data;
        try {
            const res = await this.itemModel.findById(itemId);
            res.status = status;
            return res.save();
        }
        catch (error) {
            return error;
        }
    }
};
ItemService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Item')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        itemLog_service_1.ItemLogService])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map