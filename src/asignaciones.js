const asignaciones = JSON.parse(localStorage.getItem('asignaciones')) || [];
let asignacionEditando = null; // Variable para almacenar la asignación que se está editando

document.getElementById('nav-asignaciones').addEventListener('click', () => {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Asignación de Proyectos a Empleados</h2>
        <form id="form-asignacion">
            <select id="id_empleado" required>
                <option value="" disabled selected>Seleccione un Empleado</option>
                ${empleados.map(emp => `<option value="${emp.id}">${emp.nombre}</option>`).join('')}
            </select>
            <select id="id_proyecto" required>
                <option value="" disabled selected>Seleccione un Proyecto</option>
                ${proyectos.map(proyecto => `<option value="${proyecto.id}">${proyecto.nombre_proyecto}</option>`).join('')}
            </select>
            <input type="text" id="rol" placeholder="Rol en el Proyecto" required>
            <button type="submit" class="add">Asignar</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>ID Empleado</th>
                    <th>Nombre Empleado</th>
                    <th>ID Proyecto</th>
                    <th>Nombre Proyecto</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="asignaciones-list"></tbody>
        </table>
    `;

    const form = document.getElementById('form-asignacion');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id_empleado = parseInt(document.getElementById('id_empleado').value);
        const id_proyecto = parseInt(document.getElementById('id_proyecto').value);
        const rol = document.getElementById('rol').value;

        const empleado = empleados.find(emp => emp.id === id_empleado);
        const proyecto = proyectos.find(proy => proy.id === id_proyecto);

        if (empleado && proyecto) {
            if (asignacionEditando) {
                // Actualizar asignación existente
                asignacionEditando.id_empleado = id_empleado;
                asignacionEditando.nombre_empleado = empleado.nombre;
                asignacionEditando.id_proyecto = id_proyecto;
                asignacionEditando.nombre_proyecto = proyecto.nombre_proyecto;
                asignacionEditando.rol = rol;
                asignacionEditando = null; // Resetear la variable de edición
            } else {
                // Agregar nueva asignación
                const nuevaAsignacion = {
                    id_empleado,
                    nombre_empleado: empleado.nombre,
                    id_proyecto,
                    nombre_proyecto: proyecto.nombre_proyecto,
                    rol
                };
                asignaciones.push(nuevaAsignacion);
            }

            localStorage.setItem('asignaciones', JSON.stringify(asignaciones)); // Guardar en localStorage
            renderAsignaciones();
            form.reset();
            form.querySelector('button').textContent = 'Asignar'; // Resetear el texto del botón
        }
    });

    const renderAsignaciones = () => {
        const asignacionesList = document.getElementById('asignaciones-list');
        asignacionesList.innerHTML = '';
        asignaciones.forEach(asignacion => {
            asignacionesList.innerHTML += `
                <tr>
                    <td>${asignacion.id_empleado}</td>
                    <td>${asignacion.nombre_empleado}</td>
                    <td>${asignacion.id_proyecto}</td>
                    <td>${asignacion.nombre_proyecto}</td>
                    <td>${asignacion.rol}</td>
                    <td>
                        <button class="edit" onclick="editarAsignacion(${asignacion.id_empleado}, ${asignacion.id_proyecto})">Editar</button>
                        <button class="delete" onclick="eliminarAsignacion(${asignacion.id_empleado}, ${asignacion.id_proyecto})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    };

    renderAsignaciones();
});

function editarAsignacion(id_empleado, id_proyecto) {
    asignacionEditando = asignaciones.find(asignacion => asignacion.id_empleado === id_empleado && asignacion.id_proyecto === id_proyecto); // Encontrar la asignación a editar
    if (asignacionEditando) {
        document.getElementById('id_empleado').value = asignacionEditando.id_empleado;
        document.getElementById('id_proyecto').value = asignacionEditando.id_proyecto;
        document.getElementById('rol').value = asignacionEditando.rol;
        document.querySelector('button.add').textContent = 'Actualizar'; // Cambiar el texto del botón
    }
}

function eliminarAsignacion(id_empleado, id_proyecto) {
    const index = asignaciones.findIndex(asignacion => asignacion.id_empleado === id_empleado && asignacion.id_proyecto === id_proyecto);
    if (index > -1) {
        asignaciones.splice(index, 1);
        localStorage.setItem('asignaciones', JSON.stringify(asignaciones)); // Actualizar localStorage
        document.getElementById('nav-asignaciones').click(); // Refrescar lista
    }
}