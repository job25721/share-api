import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TagDocument } from './tag.schema';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor(@InjectModel('Tag') private tagModel: Model<TagDocument>) {}
}
