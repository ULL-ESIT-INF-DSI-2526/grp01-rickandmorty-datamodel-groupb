# Rick and Morty Data Model

Proyecto en TypeScript para gestionar entidades del multiverso de Rick and Morty (personajes, dimensiones, especies, localizaciones e inventos) desde una aplicacion de consola.

## Instalacion

```bash
npm install
```

## Comandos

# Ejecutar tests
npm test

# Cobertura de tests
npm run coverage

# Generar documentacion
npm run doc
```

## Estructura del proyecto

```text
.
|-- eslint.config.mjs
|-- package.json
|-- README.md
|-- tsconfig.json
|-- typedoc.json
|-- db/
|   `-- db.json
|-- src/
|   |-- AtributosComunes.ts
|   |-- Dimensiones.ts
|   |-- Especies.ts
|   |-- GestorDB.ts
|   |-- GestorMultiverso.ts
|   |-- index.ts
|   |-- InventosArtefactos.ts
|   |-- Personajes.ts
|   |-- PlanetasLocalizaciones.ts
|   `-- ViajeInterdimensional.ts
`-- tests/
	|-- AtributosComunes.spec.ts
	|-- Dimensiones.spec.ts
	|-- Especies.spec.ts
	|-- GestorMultiverso.spec.ts
	|-- InventosArtefactos.spec.ts
	|-- Personajes.spec.ts
	`-- PlanetasLocalizaciones.spec.ts
```

Contenido de las carpetas:

- `src/`: modelos y logica principal del multiverso.
- `tests/`: pruebas unitarias con Vitest para las entidades y el gestor.
- `db/db.json`: base de datos local en JSON (lowdb) para persistir informacion.
- Archivos de raiz (`package.json`, `tsconfig.json`, `eslint.config.mjs`, `typedoc.json`): configuracion de scripts, TypeScript, linting y documentacion.

## Tecnologias

- TypeScript
- Vitest
- lowdb
- Prompts
- TypeDoc
