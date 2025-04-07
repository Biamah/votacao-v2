import { describe, beforeEach, it, expect, vi } from 'vitest';
import { PautaService } from '../../src/services/pauta.service';
import { CreatePautaDto } from '../../src/dto/create-pauta.dto';

const mockPautaRepository = {
  create: vi.fn((dto: CreatePautaDto) => ({
    id: 1,
    ...dto,
    createdAt: new Date(),
  })),
  save: vi.fn((pauta) => Promise.resolve(pauta)),
};

describe('PautaService', () => {
  let service: PautaService;

  beforeEach(() => {
    service = new PautaService(mockPautaRepository as any);
    vi.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar uma pauta com dados válidos', async () => {
      const validDto: CreatePautaDto = {
        title: 'Reunião válida',
        description: 'Descrição válida'
      };
      
      const result = await service.create(validDto);
      
      expect(result).toEqual({
        id: 1,
        title: 'Reunião válida',
        description: 'Descrição válida',
        createdAt: expect.any(Date)
      });
    });

    it('deve falhar se faltar campos obrigatórios', async () => {
      const invalidDto = { title: 'Título incompleto' } as CreatePautaDto;
      
      await expect(service.create(invalidDto))
        .rejects
        .toThrow('A descrição é obrigatória.');
    });

    it('deve falhar se o repositório lançar um erro', async () => {
      // Primeiro criamos um DTO válido
      const validDto: CreatePautaDto = {
        title: 'Reunião com erro',
        description: 'Descrição válida'
      };
      
      // Configuramos o mock para falhar apenas no save
      mockPautaRepository.save.mockRejectedValueOnce(new Error('Erro no banco'));
      
      await expect(service.create(validDto))
        .rejects
        .toThrow('Erro no banco');
    });
  });
});