export class Especies {
  private idEspecie: string;
  private nombre: string;
  private origen: string;
  private tipo: string;
  private esperanzaVida: number;
  private descripcion: string;

  // Getters
  getID(): string { return this.idEspecie; }
  getNombre(): string { return this.nombre; }
  getOrigen(): string { return this.origen; }
  getTipo(): string { return this.tipo; }
  getEsperanzaVida(): number { return this.esperanzaVida; }
  getDescripcion(): string { return this.descripcion; }

  // Setters
  setID(idEspecie: string) { this.idEspecie = this.comprobarID(idEspecie); }
  setNombre(nombre: string) { this.nombre = this.comprobarNombre(nombre); }
  setOrigen(origen: string) { this.origen = this.comprobarOrigen(origen); }
  setTipo(tipo: string) { this.tipo = this.comprobarTipo(tipo); }
  setEsperanzaVida(esperanzaVida: number) { this.esperanzaVida = this.comprobarEsperanzaVida(esperanzaVida); }
  setDescripcion(descripcion: string) { this.descripcion = this.comprobarDescripcion(descripcion); }

  // Comprobaciones
  comprobarID(idEspecie: string): string {
    if (idEspecie === '') {
      throw new Error("El id no puede estar vacío");
    } else {
      return idEspecie;
    }
  }

  comprobarNombre(nombre: string): string {
    if (nombre === '') {
      throw new Error("El nombre no puede estar vacío");
    } else {
      return nombre;
    }
  }

  comprobarOrigen(origen: string): string {
    if (origen === '') {
      throw new Error("El origen no puede estar vacío");
    } else {
      return origen;
    }
  }

  comprobarTipo(tipo: string): string {
    if (tipo === '') {
      throw new Error("El tipo no puede estar vacío");
    } else {
      return tipo;
    }
  }

  comprobarEsperanzaVida(esperanzaVida: number): number {
    if (esperanzaVida < 0) {
      throw new Error("La esperanza de vida no puede ser menor a 0");
    } else {
      return esperanzaVida; 
    }
  }

  comprobarDescripcion(descripcion: string): string {
    if (descripcion === '') {
      throw new Error("La descripción no peude estar vacía")
    } else {
      return descripcion;
    }
  }

  // Constructor
  constructor(idEspecie: string, nombre: string, origen: string, tipo: string, esperanzaVida: number, descripcion: string) {
    this.idEspecie = this.comprobarID(idEspecie);
    this.nombre = this.comprobarNombre(nombre);
    this.origen = this.comprobarOrigen(origen);
    this.tipo = this.comprobarTipo(tipo);
    this.esperanzaVida = this.comprobarEsperanzaVida(esperanzaVida);
    this.descripcion = this.comprobarDescripcion(descripcion);
  }
}