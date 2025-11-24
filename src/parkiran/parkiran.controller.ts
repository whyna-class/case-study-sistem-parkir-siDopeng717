import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ParkerService } from './parkiran.service';
import { CreateParkerDto } from './dto/create-parkiran.dto';
import { UpdateParkiranDto } from './dto/update-parkiran.dto';
import { FindParkerdto } from './dto/find-parker.dto';

@Controller('parkir')
export class ParkerController {
  constructor(private readonly parkirService: ParkerService) { }

  @Post()
  create(@Body() createParkirDto: CreateParkerDto) {
    return this.parkirService.create(createParkirDto);
  }
  
  @Get('pendapatan')
  totalPendapatan() {
    return this.parkirService.totalUang();
  }
  
  @Get()
  findAll(@Query() query: FindParkerdto) {
    return this.parkirService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkirService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateParkiranDto) {
    return this.parkirService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkirService.remove(+id);
  }
}