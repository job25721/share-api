import { Resolver } from '@nestjs/graphql';
import { Tag } from './dto/tag.model';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}
}
