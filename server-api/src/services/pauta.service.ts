import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pauta } from '../entities/pauta.entity';
import { validate } from 'class-validator';
import { CreatePautaDto } from '../dto/create-pauta.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PautaService {
  constructor(
    @InjectRepository(Pauta)
    private pautaRepository: Repository<Pauta>,
  ) {}

  async create(pauta: CreatePautaDto): Promise<Pauta> {
    const dto = Object.assign(new CreatePautaDto(), pauta);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors.map(err => Object.values(err.constraints ?? {}).join(', ')).join('; ');
      throw new Error(`Erro de validação: ${messages}`);
    }

    const newPauta = this.pautaRepository.create(pauta);
    return this.pautaRepository.save(newPauta);
  }

  async findAll(): Promise<Pauta[]> {
    return this.pautaRepository.find();
  }

  async findOne(id: number): Promise<Pauta> {
    const updatedPauta = await this.pautaRepository.findOne({ where: { id } });
    if (!updatedPauta) {
      throw new Error(`Pauta with ID ${id} not found`);
    }
    return updatedPauta;
  }

  async update(id: number, pautaData: Partial<CreatePautaDto>): Promise<Pauta> {
    const existingPauta = await this.pautaRepository.findOne({ where: { id } });
    if (!existingPauta) {
      throw new Error(`Pauta with ID ${id} not found`);
    }

    const dto = plainToInstance(CreatePautaDto, pautaData);
    const errors = await validate(dto, { skipMissingProperties: true });

    if (errors.length > 0) {
      const messages = errors.map(err => Object.values(err.constraints ?? {}).join(', ')).join('; ');
      throw new Error(`Erro de validação: ${messages}`);
    }

    await this.pautaRepository.update(id, pautaData);
    const updatedPauta = await this.pautaRepository.findOne({ where: { id } });

    if (!updatedPauta) {
      throw new Error(`Pauta with ID ${id} not found after update`);
    }

    return updatedPauta;
  }

  async remove(id: number): Promise<void> {
    await this.pautaRepository.delete(id);
  }
}