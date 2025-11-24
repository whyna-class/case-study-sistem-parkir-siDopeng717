import { PartialType } from '@nestjs/mapped-types';
import { CreateParkerDto } from './create-parkiran.dto';

export class UpdateParkiranDto extends PartialType(CreateParkerDto) {}
