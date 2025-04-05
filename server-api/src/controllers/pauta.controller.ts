import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PautaService } from '../services/pauta.service';
import { Pauta } from '../entities/pauta.entity';
import { CreatePautaDto } from '../dto/create-pauta.dto';

@Controller('pautas')
export class PautaController {
  constructor(private readonly pautaService: PautaService) {}

  @Post()
  async create(@Body() createPautaDto: CreatePautaDto) {
    return this.pautaService.create(createPautaDto);
  }

  @Get()
  findAll(): Promise<Pauta[]> {
    return this.pautaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pauta> {
    return this.pautaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pauta: Partial<CreatePautaDto>): Promise<Pauta> {
    return this.pautaService.update(+id, pauta);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.pautaService.remove(+id);
  }
}