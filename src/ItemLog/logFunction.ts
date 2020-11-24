import { Types } from 'mongoose';
import { Log } from './dto/ItemLog.model';

export function calculateHash(data): string {
  return 'sha256 hash';
}

export function createItemLog(
  actorId: Types.ObjectId | string,
  action: string,
): Log {
  const preHashData = {
    timestamp: new Date(Date.now()),
    actor: actorId,
    action,
  };
  const itemLogDetail: Log = {
    ...preHashData,
    hash: calculateHash(preHashData),
    prevHash: null,
  };
  return itemLogDetail;
}
