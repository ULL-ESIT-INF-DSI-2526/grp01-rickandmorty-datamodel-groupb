export class AtributosComunes {
  protected readonly id: string;
  protected nombre: string;
  protected descripcion: string;

  constructor(id: string, nombre: string, descripcion: string) {
    this.id = this.comprobarVacio(id);
    this.nombre = this.comprobarVacio(nombre);
    this.descripcion = this.comprobarVacio(descripcion);
  }

  // Getters
  getId(): string { return this.id; }
  getNombre(): string { return this.nombre; }
  getDesc(): string { return this.descripcion; }

  // Setters
  setNombre(nuevoNombre: string) { this.nombre = nuevoNombre; }
  setDesc(nuevaDesc: string) { this.descripcion = nuevaDesc; }

  // Comprobaciones
  comprobarVacio(str: string): string {
    if (str === '') {
      throw new Error("Ninguna entrada puede estar vacía");
    } else {
      return str;
    }
  }
}