"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemLog = exports.calculateHash = void 0;
const crypto_js_1 = require("crypto-js");
function calculateHash(data) {
    return crypto_js_1.SHA256(JSON.stringify(data)).toString();
}
exports.calculateHash = calculateHash;
function createItemLog(actorId, action) {
    const preHashData = {
        timestamp: new Date(Date.now()),
        actor: actorId,
        action,
    };
    const itemLogDetail = Object.assign(Object.assign({}, preHashData), { hash: calculateHash(preHashData), prevHash: null });
    return itemLogDetail;
}
exports.createItemLog = createItemLog;
//# sourceMappingURL=logFunction.js.map