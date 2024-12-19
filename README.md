# Sistema de Gestión de Proyectos y Empleados

## Descripción
Este proyecto es una aplicación web interactiva que permite la gestión de proyectos y empleados, implementando operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cada entidad. La aplicación permite asignar empleados a múltiples proyectos y mantener un registro de estas asignaciones con roles específicos.

## Equipo de Desarrollo
- Mateo David Viracucha Armijos
- Cesar Augusto Tamayo Ñaupa
- Harvey Joel Fonseca Escobar
- Kevin Israel Yugla Suntaxi

## Características Principales
- Gestión completa de empleados (CRUD)
- Gestión completa de proyectos (CRUD)
- Asignación de empleados a proyectos con roles específicos
- Interfaz dinámica generada con JavaScript
- Validación de datos en tiempo real
- Navegación intuitiva entre módulos

## Estructura del Proyecto

├── src/
│   ├── empleados.js
│   ├── proyectos.js
│   └── asignaciones.js
├── styles/
│   └── main.css
└── index.html


## Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No se requiere instalación de dependencias adicionales

## Instalación
1. Clonar el repositorio:
   bash
   git clone [URL del repositorio]
   
2. Navegar al directorio del proyecto
3. Abrir el archivo index.html en un navegador web

## Uso
La aplicación cuenta con un menú de navegación que permite acceder a las siguientes funcionalidades:

### Gestión de Empleados
- Crear nuevo empleado
- Ver lista de empleados
- Actualizar información de empleados
- Eliminar empleados

### Gestión de Proyectos
- Crear nuevo proyecto
- Ver lista de proyectos
- Actualizar información de proyectos
- Eliminar proyectos

### Asignación de Proyectos
- Asignar empleados a proyectos
- Definir roles en los proyectos
- Ver asignaciones actuales
- Modificar o eliminar asignaciones

## Funcionalidades Técnicas
- Manipulación dinámica del DOM usando JavaScript
- Implementación de Arrow Functions
- Almacenamiento de datos en arrays
- Validación de formularios
- Gestión de eventos para interactividad

## Estructura de Datos
### Empleados
- id_empleado
- nombre
- puesto
- salario

### Proyectos
- id_proyecto
- nombre_proyecto
- fecha_inicio
- fecha_fin

### Participaciones
- id_empleado
- id_proyecto
- rol

## Notas Adicionales
- La aplicación utiliza almacenamiento local mediante arrays en JavaScript
- Los datos se mantienen solo durante la sesión actual del navegador
- Se recomienda no cerrar el navegador durante el uso para evitar pérdida de datos
