import { describe, it, expect } from 'vitest';
import { AtributosComunes } from '../src/AtributosComunes';

describe('Clase AtributosComunes', () => {
  it('Debe crearse correctamente con datos válidos', () => {
    const attrs = new AtributosComunes('ID1', 'Nombre', 'Descripción');

    expect(attrs.getId()).toBe('ID1');
    expect(attrs.getNombre()).toBe('Nombre');
    expect(attrs.getDesc()).toBe('Descripción');
  });

  it('Debe lanzar error si id, nombre o descripción están vacíos', () => {
    expect(() => new AtributosComunes('', 'Nombre', 'Descripción')).toThrowError('Ninguna entrada puede estar vacía');
    expect(() => new AtributosComunes('ID1', '', 'Descripción')).toThrowError('Ninguna entrada puede estar vacía');
    expect(() => new AtributosComunes('ID1', 'Nombre', '')).toThrowError('Ninguna entrada puede estar vacía');
  });

  it('Debe actualizar nombre y descripción con setters', () => {
    const attrs = new AtributosComunes('ID1', 'Nombre', 'Descripción');

    attrs.setNombre('Nuevo nombre');
    attrs.setDesc('Nueva descripción');

    expect(attrs.getNombre()).toBe('Nuevo nombre');
    expect(attrs.getDesc()).toBe('Nueva descripción');
  });

  it('comprobarVacio debe devolver el texto si no está vacío', () => {
    const attrs = new AtributosComunes('ID1', 'Nombre', 'Descripción');

    expect(attrs.comprobarVacio('texto')).toBe('texto');
  });

  it('comprobarVacio debe lanzar error si recibe string vacío', () => {
    const attrs = new AtributosComunes('ID1', 'Nombre', 'Descripción');

    expect(() => attrs.comprobarVacio('')).toThrowError('Ninguna entrada puede estar vacía');
  });
});
