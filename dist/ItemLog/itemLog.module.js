"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemLogModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../User/user.module");
const ItemLog_schema_1 = require("./ItemLog.schema");
const itemLog_service_1 = require("./itemLog.service");
let ItemLogModule = class ItemLogModule {
};
ItemLogModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'ItemLog', schema: ItemLog_schema_1.ItemLogSchema }]),
            user_module_1.UserModule,
        ],
        exports: [itemLog_service_1.ItemLogService],
    })
], ItemLogModule);
exports.ItemLogModule = ItemLogModule;
//# sourceMappingURL=itemLog.module.js.map