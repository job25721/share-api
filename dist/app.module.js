"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const app_comtroller_1 = require("./app.comtroller");
const item_module_1 = require("./Item/item.module");
const itemLog_module_1 = require("./ItemLog/itemLog.module");
const request_module_1 = require("./Request/request.module");
const user_module_1 = require("./User/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                installSubscriptionHandlers: true,
                autoSchemaFile: 'schema.gql',
                debug: false,
                playground: true,
                context: ({ req }) => ({ headers: req.headers }),
            }),
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.h3ocx.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`),
            item_module_1.ItemModule,
            itemLog_module_1.ItemLogModule,
            user_module_1.UserModule,
            request_module_1.RequestModule,
        ],
        controllers: [app_comtroller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map