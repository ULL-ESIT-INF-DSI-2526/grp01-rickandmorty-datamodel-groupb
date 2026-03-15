enum EstadoDimensiones {
  ACTIVA = "activa",
  DESTRUIDA = "destruida",
  CUARENTENA = "cuarentena"
}

export class Dimensiones {
  // hay que hacer un regex para la id para llamarla en el constructor
  private readonly ID_Dimension: String; // Ej: C-137, J19ζ7, C-500A
  private nombre: string;
  private estado: EstadoDimensiones;
  private lvl_tecnologico: number;
  private descripcion: string;

  //getters
  getID(): String {return this.ID_Dimension;}
  getNombre(): string {return this.nombre;}
  getEstado(): EstadoDimensiones {return this.estado;}
  getLvlTecnologico(): number {return this.lvl_tecnologico;}
  getDescripcion(): string {return this.descripcion;}

  //validadores
  validarID(ID_Dimension: string): string {
    // Implement regex validation for ID_Dimension
    return ID_Dimension;
  }

  validaNombre(nombre: string): string {
    if (nombre === '') {
      throw new Error("El nombre no puede estar vacio");
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
      throw new Error("El nivel tecnologico tiene que estar entre 1 y 10");
    }
    return lvl;
  }

  validarDescripcion(descripcion: string): string {
    if (descripcion.trim() === '') {
      throw new Error("La descripcion no puede estar vacia");
    }
    return descripcion;
  }

  //setters
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

  //constructor
  constructor(ID_Dimension: String, nombre: string, estado: EstadoDimensiones, lvl_tecnologico: number, descripcion: string) {
    this.ID_Dimension = this.validarID(ID_Dimension);
    this.nombre = this.validaNombre(nombre);
    this.estado = this.validarEstado(estado);
    this.lvl_tecnologico = this.validarLvl(lvl_tecnologico);
    this.descripcion = this.validarDescripcion(descripcion);
  }
}