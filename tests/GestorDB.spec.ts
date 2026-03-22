import { describe, it, expect } from 'vitest';
import { GestorMultiverso } from '../src/GestorMultiverso';

describe('Tests de la Base de Datos (Gestor)', () => {
  it('Debe inicializar el gestor de la base de datos sin fallar', async () => {
    const gestor = await GestorMultiverso.getInstance();
    
    expect(gestor).toBeDefined();
  });
});