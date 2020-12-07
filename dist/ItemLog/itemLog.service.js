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
exports.ItemLogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../User/user.service");
const logFunction_1 = require("./logFunction");
let ItemLogService = class ItemLogService {
    constructor(itemLogModel, userService) {
        this.itemLogModel = itemLogModel;
        this.userService = userService;
    }
    async InitLog(data) {
        const { itemId, actorId } = data;
        const actor = await this.userService.findById(actorId);
        const newItemLogDto = {
            itemId: mongoose_2.Types.ObjectId(itemId),
            logs: [
                logFunction_1.createItemLog(mongoose_2.Types.ObjectId(actorId), `${actor.info.firstName} ได้เพิ่มของไปที่ SHARE`),
            ],
        };
        const itemLog = new this.itemLogModel(newItemLogDto);
        return await itemLog.save();
    }
    async addLog(data) {
        const { itemId, actorId, action } = data;
        try {
            const existLog = await this.itemLogModel.findOne({
                itemId: mongoose_2.Types.ObjectId(itemId),
            });
            if (existLog === null) {
                throw new Error('no such item');
            }
            const newLog = logFunction_1.createItemLog(mongoose_2.Types.ObjectId(actorId), action);
            newLog.prevHash = existLog.logs[existLog.logs.length - 1].hash;
            existLog.logs.push(newLog);
            return await existLog.save();
        }
        catch (err) {
            throw err;
        }
    }
    async findById(logId) {
        return await this.itemLogModel.findById(logId);
    }
    async findByItemId(itemId) {
        return await this.itemLogModel.findOne({ itemId });
    }
};
ItemLogService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('ItemLog')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], ItemLogService);
exports.ItemLogService = ItemLogService;
//# sourceMappingURL=itemLog.service.js.map