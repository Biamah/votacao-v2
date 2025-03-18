import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PautaService } from '../services/pauta.service';
import { Pauta } from '../entities/pauta.entity';

@Controller('pautas')
export class PautaController {
  constructor(private readonly pautaService: PautaService) {}

  @Post()
  create(@Body() pauta: Partial<Pauta>): Promise<Pauta> {
    return this.pautaService.create(pauta);
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
  update(@Param('id') id: string, @Body() pauta: Partial<Pauta>): Promise<Pauta> {
    return this.pautaService.update(+id, pauta);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.pautaService.remove(+id);
  }
}