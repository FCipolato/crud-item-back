import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'Item name',
    example: 'Fork',
  })
  name: string;

  @ApiProperty({
    description: 'Item description',
    example: 'Silver fork',
  })
  description: string;
}
