import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schema/items.model';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemModel.create(createItemDto);
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item | null> {
    return this.itemModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const updateItem = await this.itemModel.findByIdAndUpdate(
      { _id: id },
      updateItemDto,
      { new: true },
    );
    if (!updateItem) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return updateItem;
  }

  async remove(id: string) {
    const deletedItem = await this.itemModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedItem;
  }
}
