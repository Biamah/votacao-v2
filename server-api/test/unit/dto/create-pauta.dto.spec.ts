import { describe, it, expect } from 'vitest';
import { validate } from 'class-validator';
import { CreatePautaDto } from '../../../src/dto/create-pauta.dto';

describe('CreatePautaDto', () => {
  it('deve ser válido quando todos os campos estão corretos', async () => {
    const dto = new CreatePautaDto();
    dto.title = 'Reunião Mensal';
    dto.description = 'Discussão de metas para o mês';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('validação do campo title', () => {
    it('deve falhar quando title está vazio', async () => {
      const dto = new CreatePautaDto();
      dto.title = '';
      dto.description = 'Descrição válida';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('deve falhar quando title não é string', async () => {
      const dto = new CreatePautaDto();
      dto.title = 123 as any; // Forçando tipo incorreto
      dto.description = 'Descrição válida';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isString');
    });
  });

  describe('validação do campo description', () => {
    it('deve falhar quando description está vazio', async () => {
      const dto = new CreatePautaDto();
      dto.title = 'Título válido';
      dto.description = '';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('deve falhar quando description não é string', async () => {
      const dto = new CreatePautaDto();
      dto.title = 'Título válido';
      dto.description = 123 as any; // Forçando tipo incorreto

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isString');
    });
  });

  it('deve falhar quando todos os campos estão faltando', async () => {
    const dto = new CreatePautaDto();
    
    const errors = await validate(dto);
    expect(errors.length).toBe(2); // 2 campos obrigatórios faltando
    expect(errors.map(e => e.property)).toEqual(['title', 'description']);
  });
});