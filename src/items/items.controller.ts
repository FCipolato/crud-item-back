import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './schema/items.model';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('items')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized user.' })
@Controller('items')
@UseGuards(AuthGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({
    summary: 'Create item.',
    description: 'Creates an item based on name and description values.',
  })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
  })
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @ApiOperation({
    summary: 'List item.',
    description: 'List the items in database.',
  })
  @ApiResponse({
    status: 200,
    description: 'Item list.',
  })
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @ApiOperation({
    summary: 'Get item.',
    description: 'Get item by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Item.',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update item.',
    description:
      'Update item by id, being able to modify both name and description.',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated item.',
  })
  @ApiResponse({
    status: 204,
    description: 'Item not found.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @ApiOperation({
    summary: 'Delete item.',
    description: 'Delete item by id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Item was deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
