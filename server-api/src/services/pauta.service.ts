import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pauta } from '../entities/pauta.entity';

@Injectable()
export class PautaService {
  constructor(
    @InjectRepository(Pauta)
    private pautaRepository: Repository<Pauta>,
  ) {}

  async create(pauta: Partial<Pauta>): Promise<Pauta> {
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

  async update(id: number, pautaData: Partial<Pauta>): Promise<Pauta> {
    await this.pautaRepository.update(id, pautaData);
    const pauta = await this.pautaRepository.findOne({ where: { id } });
    if (!pauta) {
      throw new Error(`Pauta with ID ${id} not found`);
    }
    return pauta;
  }

  async remove(id: number): Promise<void> {
    await this.pautaRepository.delete(id);
  }
}