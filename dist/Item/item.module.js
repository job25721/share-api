"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const itemLog_module_1 = require("../ItemLog/itemLog.module");
const user_module_1 = require("..//User/user.module");
const item_resolver_1 = require("./item.resolver");
const item_schema_1 = require("./item.schema");
const item_service_1 = require("./item.service");
let ItemModule = class ItemModule {
};
ItemModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Item', schema: item_schema_1.ItemSchema }]),
            itemLog_module_1.ItemLogModule,
            user_module_1.UserModule,
        ],
        providers: [item_resolver_1.ItemResolver, item_service_1.ItemService],
        exports: [item_service_1.ItemService],
    })
], ItemModule);
exports.ItemModule = ItemModule;
//# sourceMappingURL=item.module.js.map