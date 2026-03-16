enum EstadoDimensiones {
  ACTIVA = "activa",
  DESTRUIDA = "destruida",
  CUARENTENA = "cuarentena"
}

export class Dimensiones {
  // hay que hacer un regex para la id para llamarla en el constructor
  private readonly ID_Dimension: string; // Ej: C-137, J19ζ7, C-500A
  private nombre: string;
  private estado: EstadoDimensiones;
  private lvl_tecnologico: number;
  private descripcion: string;

  // Getters
  getID(): string { return this.ID_Dimension; }
  getNombre(): string { return this.nombre; }
  getEstado(): EstadoDimensiones { return this.estado; }
  getLvlTecnologico(): number { return this.lvl_tecnologico; }
  getDescripcion(): string { return this.descripcion; }

  // Validadores
  validarID(ID_Dimension: string): string {
    // Implement regex validation for ID_Dimension
    return ID_Dimension;
  }

  validaNombre(nombre: string): string {
    if (nombre === '') {
      throw new Error("El nombre no puede estar vacío");
    }
    return nombre;
  }

  validarEstado(estado: string): EstadoDimensiones {
    if (estado === "activa" || estado === "destruida" || estado === "cuarentena") {
      return estado as EstadoDimensiones;
    } else {
      throw new Error("El estado solo puede ser activa/destruida/cuarentena");
    }
  }

  validarLvl(lvl: number): number {
    if (lvl < 1 || lvl > 10) {
      throw new Error("El nivel tecnológico tiene que estar entre 1 y 10");
    }
    return lvl;
  }

  validarDescripcion(descripcion: string): string {
    if (descripcion.trim() === '') {
      throw new Error("La descripción no puede estar vacia");
    }
    return descripcion;
  }

  // Setters
  setNombre(nombre: string): void {
    this.nombre = this.validaNombre(nombre);
  }

  setEstado(estado: EstadoDimensiones): void {
    this.estado = estado;
  }

  setLvlTecnologico(lvl_tecnologico: number): void {
    this.lvl_tecnologico = this.validarLvl(lvl_tecnologico);
  }

  setDescripcion(descripcion: string): void {
    this.descripcion = this.validarDescripcion(descripcion);
  }

  // Constructor
  constructor(ID_Dimension: string, nombre: string, estado: EstadoDimensiones, lvl_tecnologico: number, descripcion: string) {
    this.ID_Dimension = this.validarID(ID_Dimension);
    this.nombre = this.validaNombre(nombre);
    this.estado = this.validarEstado(estado);
    this.lvl_tecnologico = this.validarLvl(lvl_tecnologico);
    this.descripcion = this.validarDescripcion(descripcion);
  }
}