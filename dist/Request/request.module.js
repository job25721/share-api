"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const item_module_1 = require("../Item/item.module");
const itemLog_module_1 = require("../ItemLog/itemLog.module");
const user_module_1 = require("../User/user.module");
const request_resolver_1 = require("./request.resolver");
const request_schema_1 = require("./request.schema");
const request_service_1 = require("./request.service");
let RequestModule = class RequestModule {
};
RequestModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Request', schema: request_schema_1.RequestSchema }]),
            itemLog_module_1.ItemLogModule,
            user_module_1.UserModule,
            item_module_1.ItemModule,
        ],
        providers: [request_service_1.RequestService, request_resolver_1.RequestResolver],
    })
], RequestModule);
exports.RequestModule = RequestModule;
//# sourceMappingURL=request.module.js.map