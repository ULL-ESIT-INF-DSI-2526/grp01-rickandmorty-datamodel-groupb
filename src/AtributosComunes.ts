
/**
 * Bloque de atributos reutilizable en distintas entidades
 */

export class AtributosComunes {
  private readonly id: string;
  private nombre: string;
  private descripcion: string;

  /**
   * Constructor
   *
   * @param id - identificador unico
   * @param nombre - nombre principal
   * @param descripcion - descripcion breve
   * @throws errores en caso de que alguna entrada sea vacia
   */
  constructor(id: string, nombre: string, descripcion: string) {
    this.id = this.comprobarVacio(id);
    this.nombre = this.comprobarVacio(nombre);
    this.descripcion = this.comprobarVacio(descripcion);
  }

  /**
   * Obtiene el atributo id
   * @returns El valor del identificador
   */
  getId(): string { return this.id; }

  /**
   * Obtiene el nombre actual almacenado
   * @returns el nombre asignado
   */
  getNombre(): string { return this.nombre; }

  /**
   * Obtiene la descripcion actual
   * @returns descripcion asignada
   */
  getDesc(): string { return this.descripcion; }

  /**
   * Modifica el nombre de la entidad
   * @param nuevoNombre - nombre nuevo para la entidad
   */
  setNombre(nuevoNombre: string) { this.nombre = nuevoNombre; }

  /**
   * Modifica la descripcion de la entidad
   * @param nuevaDesc - Nuevo valor para la descripcion
   */
  setDesc(nuevaDesc: string) { this.descripcion = nuevaDesc; }

  /**
   * Verificacion que la cadena recibida no sea vacia
   *
   * @param str - Cadena a validar
   * @returns La misma cadena
   * @throws Error Se lanza cuando la cadena es vacia
   */
  comprobarVacio(str: string): string {
    if (str === '') {
      throw new Error("Ninguna entrada puede estar vacía");
    } else {
      return str;
    }
  }
}