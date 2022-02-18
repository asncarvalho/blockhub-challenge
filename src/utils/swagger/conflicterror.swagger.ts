import { ApiProperty } from '@nestjs/swagger';

export class ConflictErrorSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
