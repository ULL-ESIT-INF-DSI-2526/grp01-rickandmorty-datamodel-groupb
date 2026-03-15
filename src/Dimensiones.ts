enum EstadoDimensiones {
  ACTIVA = "activa",
  DESTRUIDA = "destruida",
  CUARENTENA = "cuarentena"
}

export class Dimensiones {
  // hay que hacer un regex para la id para llamarla en el constructor 
  private readonly ID_Dimension: String ; // Ej: C-137, J19ζ7, C-500A
  private nombre: string = '';
  private estado: EstadoDimensiones = EstadoDimensiones.ACTIVA;
  private lvl_tecnologico: number = 0; // 1-10
  private descripcion: string = '';

  //getters
  getID(): String {return this.ID_Dimension;}
  getNombre(): string {return this.nombre;}
  getEstado(): EstadoDimensiones {return this.estado;}
  getLvlTecnologico(): number {return this.lvl_tecnologico;}
  getDescripcion(): string {return this.descripcion;}

  //setters
  setNombre(nombre: string): void {this.nombre = nombre;}

  setEstado(estado: EstadoDimensiones): void {
    if (estado === EstadoDimensiones.ACTIVA || estado === EstadoDimensiones.DESTRUIDA || estado === EstadoDimensiones.CUARENTENA) {
      this.estado = estado;
    } else {
      throw new Error("El estado solo puede ser activa/destruida/cuarentena");
    }
  }

  setLvlTecnologico(lvl_tecnologico: number): void {
    if (lvl_tecnologico < 1 || lvl_tecnologico > 10) {
      throw new Error("El nivel tecnologico tiene que estar entre 1 y 10");
    }
    this.lvl_tecnologico = lvl_tecnologico; 
  }

  setDescripcion(descripcion: string): void {this.descripcion = descripcion;}


  //constructor
  //sin regex para la id por ahora
  constructor(ID_Dimension: String, nombre: string, estado: EstadoDimensiones, lvl_tecnologico: number, descripcion: string) {
    this.ID_Dimension = ID_Dimension;
    this.setNombre(nombre);
    this.setEstado(estado);
    this.setLvlTecnologico(lvl_tecnologico);
    this.setDescripcion(descripcion);
  }
}