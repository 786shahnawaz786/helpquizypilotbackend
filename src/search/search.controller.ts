import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SearchService } from './search.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Full-text search across articles' })
  @ApiQuery({ name: 'q', description: 'Search query' })
  @ApiQuery({ name: 'limit', required: false })
  search(@Query('q') q: string, @Query('limit') limit?: number) {
    return this.searchService.search(q, limit || 10);
  }

  @Get('suggest')
  @ApiOperation({ summary: 'Autocomplete suggestions' })
  @ApiQuery({ name: 'q', description: 'Partial query' })
  suggest(@Query('q') q: string) {
    return this.searchService.suggest(q);
  }
}
