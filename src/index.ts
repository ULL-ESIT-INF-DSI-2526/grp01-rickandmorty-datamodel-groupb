import prompts from 'prompts';
import { GestorMultiverso } from './GestorMultiverso';

import { AtributosComunes } from './AtributosComunes';
import { Dimensiones, EstadoDimensiones } from './Dimensiones';
import { Especies, TipoEspecie } from './Especies';
import { Personajes, Estados, Afiliaciones } from './Personajes';
import { PlanetasLocalizaciones, TiposPlanetas } from './PlanetasLocalizaciones';
import { InventosArtefactos, TipoArtefacto } from './InventosArtefactos';

async function main() {
  const gestor = await GestorMultiverso.getInstance();
  let salir = false;

  // Controlar el estado global del multiverso al iniciar
  const alertas = await gestor.controlarEstadoGlobal();
  if (alertas.length > 0) {
    console.log("Alertas de estado global:");
    alertas.forEach(a => console.log(`  - ${a}`));
    console.log("\n");
  }

  while (!salir) {
    const { opcion } = await prompts({
      type: 'select',
      name: 'opcion',
      message: 'Menú Principal. Selecciona una acción:',
      choices: [
        { title: '1. Gestionar Datos (Añadir, Modificar, Eliminar)', value: 'gestion' },
        { title: '2. Consultar Personajes', value: 'consultar_personajes' },
        { title: '3. Consultar Localizaciones', value: 'consultar_localizaciones' },
        { title: '4. Consultar Inventos', value: 'consultar_inventos' },
        { title: '5. Localizar Versiones Alternativas', value: 'alternativas' },
        { title: '6. Registrar Eventos Interdimensionales', value: 'eventos' },
        { title: '7. Generar Informes del Multiverso', value: 'informes' },
        { title: '8. Salir', value: 'salir' }
      ]
    });

    switch (opcion) {
      case 'gestion': await menuGestion(gestor); break;
      case 'consultar_personajes': await menuConsultarPersonajes(gestor); break;
      case 'consultar_localizaciones': await menuConsultarLocalizaciones(gestor); break;
      case 'consultar_inventos': await menuConsultarInventos(gestor); break;
      case 'alternativas': await localizarAlternativas(gestor); break;
      case 'eventos': await menuEventos(gestor); break;
      case 'informes': await menuInformes(gestor); break;
      case 'salir': salir = true; console.log("Saliendo..."); break;
      default: salir = true; break;
    }
  }
}

async function menuGestion(gestor: GestorMultiverso) {
  const { entidad, accion } = await prompts([
    {
      type: 'select', name: 'entidad', message: '¿Qué entidad quieres gestionar?',
      choices: [
        { title: 'Dimensiones', value: 'dimensiones' },
        { title: 'Personajes', value: 'personajes' },
        { title: 'Especies', value: 'especies' },
        { title: 'Localizaciones', value: 'localizaciones' },
        { title: 'Inventos y Artefactos', value: 'inventos' }
      ]
    },
    {
      type: 'select', name: 'accion', message: '¿Qué deseas hacer?',
      choices: [
        { title: 'Añadir Nuevo', value: 'add' },
        { title: 'Modificar Existente', value: 'edit' },
        { title: 'Eliminar', value: 'delete' },
        { title: 'Volver', value: 'volver' }
      ]
    }
  ]);

  if (accion === 'volver' || !accion) return;

  // Eliminar
  if (accion === 'delete') {
    const { id } = await prompts({ type: 'text', name: 'id', message: 'Introduce el ID exacto a eliminar:' });
    if (entidad === 'dimensiones') await gestor.deleteDimension(id);
    if (entidad === 'personajes') await gestor.deletePersonaje(id);
    if (entidad === 'especies') await gestor.deleteEspecie(id);
    if (entidad === 'localizaciones') await gestor.deleteLocalizacion(id);
    if (entidad === 'inventos') await gestor.deleteInvento(id);
    console.log("Entidad eliminada con éxito.");
    return;
  }

  // Modificar
  if (accion === 'edit') {
    const { id, nuevoNombre, nuevaDesc } = await prompts([
      { type: 'text', name: 'id', message: 'ID de la entidad a modificar:' },
      { type: 'text', name: 'nuevoNombre', message: 'Nuevo Nombre (deja en blanco para no cambiar):' },
      { type: 'text', name: 'nuevaDesc', message: 'Nueva Descripción (deja en blanco para no cambiar):' }
    ]);
    
    let obj: AtributosComunes | undefined = undefined;
    if (entidad === 'dimensiones') obj = gestor.getDimensiones().find(e => e.getId() === id);
    if (entidad === 'personajes') obj = gestor.getPersonajes().find(e => e.getId() === id);
    if (entidad === 'especies') obj = gestor.getEspecies().find(e => e.getId() === id);
    if (entidad === 'localizaciones') obj = gestor.getPlanetasLocalizaciones().find(e => e.getId() === id);
    if (entidad === 'inventos') obj = gestor.getInventosArtefactos().find(e => e.getId() === id);

    if (obj) {
      if (nuevoNombre) obj.setNombre(nuevoNombre);
      if (nuevaDesc) obj.setDesc(nuevaDesc);
      await gestor.guardarCambios();
      console.log("Entidad modificada correctamente.");
    } else {
      console.log("Entidad no encontrada.");
    }
    return;
  }

  // Añadir
  if (accion === 'add') {
    if (entidad === 'dimensiones') {
      const d = await prompts([
        { type: 'text', name: 'id', message: 'ID (Ej: D99):' },
        { type: 'text', name: 'nombre', message: 'Nombre:' },
        { type: 'select', name: 'estado', message: 'Estado:', choices: Object.values(EstadoDimensiones).map(e => ({ title: e, value: e })) },
        { type: 'number', name: 'nivelTec', message: 'Nivel Tecnológico (1-10):', min: 1, max: 10 },
        { type: 'text', name: 'descripcion', message: 'Descripción:' }
      ]);

      if (gestor.getDimensiones().some(dim => dim.getId() === d.id)) {
        console.log("Error: Ya existe una dimensión con el ID " + d.id);
        return;
      }

      await gestor.pushDimension(new Dimensiones(d.id, d.nombre, d.estado as EstadoDimensiones, d.nivelTec, d.descripcion));
      console.log("Dimensión añadida.");
    }

    if (entidad === 'especies') {
      const e = await prompts([
        { type: 'text', name: 'id', message: 'ID (Ej: S99):' },
        { type: 'text', name: 'nombre', message: 'Nombre:' },
        { type: 'text', name: 'origen', message: 'Origen (Planeta/Dimensión):' },
        { type: 'select', name: 'tipo', message: 'Tipo:', choices: Object.values(TipoEspecie).map(t => ({ title: t, value: t })) },
        { type: 'number', name: 'esperanzaVida', message: 'Esperanza de Vida (años):', min: 0 },
        { type: 'text', name: 'descripcion', message: 'Descripción:' }
      ]);

      if (gestor.getEspecies().some(esp => esp.getId() === e.id)) {
        console.log("Error: Ya existe una especie con el ID " + e.id);
        return;
      }

      await gestor.pushEspecie(new Especies(e.id, e.nombre, e.origen, e.tipo as TipoEspecie, e.esperanzaVida, e.descripcion));
      console.log("Especie añadida.");
    }

    if (entidad === 'personajes') {
      const p = await prompts([
        { type: 'text', name: 'id', message: 'ID (Ej: C99):' },
        { type: 'text', name: 'nombre', message: 'Nombre:' },
        { type: 'text', name: 'especieId', message: 'ID de la Especie (Ej: S1):' },
        { type: 'text', name: 'dimId', message: 'ID de la Dimensión origen (Ej: D1):' },
        { type: 'select', name: 'estado', message: 'Estado:', choices: Object.values(Estados).map(e => ({ title: e, value: e })) },
        { type: 'select', name: 'afiliacion', message: 'Afiliación:', choices: Object.values(Afiliaciones).map(a => ({ title: a, value: a })) },
        { type: 'number', name: 'inteligencia', message: 'Inteligencia (1-10):', min: 1, max: 10 },
        { type: 'text', name: 'descripcion', message: 'Descripción:' }
      ]);

      if (gestor.getPersonajes().some(per => per.getId() === p.id)) {
        console.log("Error: Ya existe un personaje con el ID " + p.id);
        return;
      }
      
      const especie = gestor.getEspecies().find(e => e.getId() === p.especieId);
      const dimension = gestor.getDimensiones().find(d => d.getId() === p.dimId);
      if (!especie || !dimension) { console.log("Error: Especie o Dimensión no encontrada."); return; }
      
      await gestor.pushPersonaje(new Personajes(p.id, p.nombre, especie, dimension, p.estado as Estados, p.afiliacion as Afiliaciones, p.inteligencia, p.descripcion));
      console.log("Personaje añadido.");
    }

    if (entidad === 'localizaciones') {
      const l = await prompts([
        { type: 'text', name: 'id', message: 'ID (Ej: L99):' },
        { type: 'text', name: 'nombre', message: 'Nombre:' },
        { type: 'select', name: 'tipo', message: 'Tipo de Planeta:', choices: Object.values(TiposPlanetas).map(t => ({ title: t, value: t })) },
        { type: 'text', name: 'dimId', message: 'ID de la Dimensión en la que se encuentra:' },
        { type: 'number', name: 'poblacion', message: 'Población aproximada:', min: 0 },
        { type: 'text', name: 'descripcion', message: 'Descripción:' }
      ]);

      if (gestor.getPlanetasLocalizaciones().some(loc => loc.getId() === l.id)) {
        console.log("Error: Ya existe una localización con el ID " + l.id);
        return;
      }
      
      const dimension = gestor.getDimensiones().find(d => d.getId() === l.dimId);
      if (!dimension) { console.log("Error: Dimensión no encontrada."); return; }

      await gestor.pushPlanetaLocalizacion(new PlanetasLocalizaciones(l.id, l.nombre, l.tipo as TiposPlanetas, dimension, l.poblacion, l.descripcion));
      console.log("Localización añadida.");
    }

    if (entidad === 'inventos') {
      const i = await prompts([
        { type: 'text', name: 'id', message: 'ID (Ej: I99):' },
        { type: 'text', name: 'nombre', message: 'Nombre del Invento:' },
        { type: 'text', name: 'inventorId', message: 'ID del Personaje Inventor:' },
        { type: 'select', name: 'tipo', message: 'Tipo de Artefacto:', choices: Object.values(TipoArtefacto).map(t => ({ title: t, value: t })) },
        { type: 'number', name: 'peligrosidad', message: 'Nivel de Peligrosidad (1-10):', min: 1, max: 10 },
        { type: 'text', name: 'descripcion', message: 'Descripción:' }
      ]);

      if (gestor.getInventosArtefactos().some(inv => inv.getId() === i.id)) {
        console.log("Error: Ya existe un invento con el ID " + i.id);
        return;
      }
      
      const inventor = gestor.getPersonajes().find(p => p.getId() === i.inventorId);
      if (!inventor) { console.log("Error: Personaje inventor no encontrado."); return; }

      await gestor.pushInventosArtefactos(new InventosArtefactos(i.id, i.nombre, i.descripcion, inventor, i.tipo as TipoArtefacto, i.peligrosidad));
      console.log("Invento añadido.");
    }
  }
}

async function menuConsultarPersonajes(gestor: GestorMultiverso) {
  const p = await prompts([
    { type: 'text', name: 'nombre', message: 'Filtro por nombre (intro para omitir):' },
    { type: 'text', name: 'especieId', message: 'Filtro por ID Especie (intro para omitir):' },
    { type: 'text', name: 'afiliacion', message: 'Filtro por Afiliación (intro para omitir):' },
    { type: 'text', name: 'estado', message: 'Filtro por Estado (intro para omitir):' },
    { type: 'text', name: 'dimensionId', message: 'Filtro por ID Dimensión origen (intro para omitir):' },
    {
      type: 'select', name: 'orden', message: 'Ordenar resultados:', choices: [
        { title: 'Nombre Ascendente', value: 'nombre_asc' },
        { title: 'Nombre Descendente', value: 'nombre_desc' },
        { title: 'Inteligencia Ascendente', value: 'int_asc' },
        { title: 'Inteligencia Descendente', value: 'int_desc' }
      ]
    }
  ]);

  let resultados = gestor.filtrarPersonajes({
    nombre: p.nombre || undefined, especieId: p.especieId || undefined,
    afiliacion: p.afiliacion || undefined, estado: p.estado || undefined, dimensionId: p.dimensionId || undefined
  });

  if (p.orden === 'nombre_asc') resultados.sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
  if (p.orden === 'nombre_desc') resultados.sort((a, b) => b.getNombre().localeCompare(a.getNombre()));
  if (p.orden === 'int_asc') resultados.sort((a, b) => a.getNivelInteligencia() - b.getNivelInteligencia());
  if (p.orden === 'int_desc') resultados.sort((a, b) => b.getNivelInteligencia() - a.getNivelInteligencia());

  console.log(`\nResultados (${resultados.length})`);
  console.table(resultados.map(r => ({ ID: r.getId(), Nombre: r.getNombre(), Especie: r.getEspecie().getNombre(), Inteligencia: r.getNivelInteligencia(), Estado: r.getEstado() })));
}

async function menuConsultarLocalizaciones(gestor: GestorMultiverso) {
  const p = await prompts([
    { type: 'text', name: 'nombre', message: 'Filtro por nombre (intro para omitir):' },
    { type: 'text', name: 'tipo', message: 'Filtro por tipo (intro para omitir):' },
    { type: 'text', name: 'dimensionId', message: 'Filtro por ID de Dimensión (intro para omitir):' }
  ]);

  let resultados = gestor.filtrarLocalizaciones({ nombre: p.nombre || undefined, tipo: p.tipo || undefined, dimensionId: p.dimensionId || undefined });
  console.log(`\nResultados (${resultados.length})`);
  console.table(resultados.map(r => ({ ID: r.getId(), Nombre: r.getNombre(), Tipo: r.getTipoPlaneta(), Dimensión: r.getDimension().getNombre() })));
}

async function menuConsultarInventos(gestor: GestorMultiverso) {
  const p = await prompts([
    { type: 'text', name: 'nombre', message: 'Filtro por nombre (intro para omitir):' },
    { type: 'text', name: 'tipo', message: 'Filtro por tipo (intro para omitir):' },
    { type: 'text', name: 'inventorId', message: 'Filtro por ID Inventor (intro para omitir):' },
    { type: 'number', name: 'peligrosidad', message: 'Peligrosidad exacta (0 para omitir):', initial: 0 }
  ]);

  let resultados = gestor.filtrarInventos({ 
    nombre: p.nombre || undefined, tipo: p.tipo || undefined, 
    inventorId: p.inventorId || undefined, peligrosidad: p.peligrosidad > 0 ? p.peligrosidad : undefined 
  });
  console.log(`\nResultados (${resultados.length})`);
  console.table(resultados.map(r => ({ ID: r.getId(), Nombre: r.getNombre(), Tipo: r.getTipo(), Peligro: r.getNivelPeligrosidad(), Inventor: r.getInventor().getNombre() })));
}

async function localizarAlternativas(gestor: GestorMultiverso) {
  const { nombre } = await prompts({ type: 'text', name: 'nombre', message: 'Introduce el nombre exacto del personaje:' });
  const versiones = gestor.getVersionesAlternativas(nombre);
  console.log(`\nVersiones de ${nombre.toUpperCase()} (${versiones.length})`);
  console.table(versiones.map(v => ({ ID: v.getId(), Dimensión: v.getDimensionOrigen().getNombre(), Afiliación: v.getAfiliacion(), Estado: v.getEstado() })));
}

async function menuEventos(gestor: GestorMultiverso) {
  const { tipo } = await prompts({
    type: 'select', name: 'tipo', message: '¿Qué evento deseas registrar?',
    choices: [
      { title: 'Viaje Interdimensional', value: 'viaje' },
      { title: 'Crear una Dimensión (Experimento/Paradoja)', value: 'crear' },
      { title: 'Destruir una Dimensión', value: 'destruir' },
      { title: 'Desplegar un Artefacto', value: 'desplegar' },
      { title: 'Neutralizar un Artefacto', value: 'neutralizar' },
      { title: 'Volver', value: 'volver' }
    ]
  });

  if (tipo === 'viaje') {
    const p = await prompts([
      { type: 'text', name: 'pId', message: 'ID del Personaje que viaja:' },
      { type: 'text', name: 'dId', message: 'ID de la Dimensión destino:' },
      { type: 'text', name: 'motivo', message: 'Motivo del viaje:' }
    ]);
    const personaje = gestor.getPersonajes().find(x => x.getId() === p.pId);
    const dimension = gestor.getDimensiones().find(x => x.getId() === p.dId);
    if (personaje && dimension) {
      await gestor.registrarViajeInterdimensional({ personaje, dimensionDestino: dimension, fechaViaje: new Date(), motivo: p.motivo });
      console.log("Viaje registrado en el historial global.");
    } else console.log("Error: Personaje o Dimensión no encontrados.");
  }
  else if (tipo === 'crear') {
    const { id, nombre, motivo } = await prompts([
      { type: 'text', name: 'id', message: 'ID de la nueva dimensión:' },
      { type: 'text', name: 'nombre', message: 'Nombre de la nueva dimensión:' },
      { type: 'text', name: 'motivo', message: 'Motivo de la creación (ej. Paradoja de Rick):' }
    ]);
    const nuevaDim = new Dimensiones(id, nombre, EstadoDimensiones.ACTIVA, 5, "Creada por evento: " + motivo);
    await gestor.pushDimension(nuevaDim);
    await gestor.registrarEventoGlobal(`CREACIÓN: Dimensión ${nombre} creada. Motivo: ${motivo}`);
    console.log("Dimensión creada y evento registrado.");
  }
  else if (tipo === 'destruir') {
    const { id, motivo } = await prompts([
      { type: 'text', name: 'id', message: 'ID de la Dimensión a destruir:' },
      { type: 'text', name: 'motivo', message: 'Motivo de la destrucción:' }
    ]);
    await gestor.destruirDimension(id, motivo);
    console.log("Dimensión destruida. El estado global ha sido actualizado.");
  }
  else if (tipo === 'desplegar') {
    const { invId, locId } = await prompts([
      { type: 'text', name: 'invId', message: 'ID del Invento:' },
      { type: 'text', name: 'locId', message: 'ID de la Localización donde se despliega:' }
    ]);
    await gestor.desplegarInvento(invId, locId);
    console.log("Artefacto desplegado.");
  }
  else if (tipo === 'neutralizar') {
    const { invId } = await prompts([{ type: 'text', name: 'invId', message: 'ID del Invento a neutralizar:' }]);
    await gestor.neutralizarInvento(invId);
    console.log("Artefacto neutralizado/retirado.");
  }
}

async function menuInformes(gestor: GestorMultiverso) {
  console.log("\nInformes del multiverso");
  
  const infoDim = gestor.getInformeDimensionesActivas();
  console.log(`\n[1] Dimensiones Activas: ${infoDim.activas.length} | Nivel Tecnológico Medio: ${infoDim.nivelMedio}`);
  
  const masVersiones = gestor.getPersonajesConMasVersionesAlternativas();
  const nombresUnicos = [...new Set(masVersiones.map(p => p.getNombre()))];
  console.log(`\n[2] Personajes con más versiones alternativas registradas:`);
  nombresUnicos.forEach(n => console.log(`    - ${n}`));

  const peligrosos = gestor.getInventosPeligrososDesplegados();
  console.log(`\n[3] Inventos Altamente Peligrosos Desplegados (Nivel >= 8):`);
  if (peligrosos.length === 0) console.log("    - Ninguno actualmente.");
  peligrosos.forEach(i => console.log(`    - [Lv ${i.getNivelPeligrosidad()}] ${i.getNombre()} -> Ubicación: ${i.getLocalizacionDespliegue()?.getNombre()}`));

  const { pId } = await prompts({ type: 'text', name: 'pId', message: '\n[4] Introduce ID de personaje para ver su historial de viajes (intro para omitir):' });
  if (pId) {
    const viajes = gestor.getViajesInterdimensionales(pId);
    console.log(`\nHistorial de viajes (${viajes.length}):`);
    if (viajes.length === 0) console.log("    - Sin registros.");
    viajes.forEach(v => console.log(`    - Destino: ${v.dimensionDestino.getNombre()} | Fecha: ${v.fechaViaje.toLocaleDateString()} | Motivo: ${v.motivo}`));
  }
}

main().catch(console.error);