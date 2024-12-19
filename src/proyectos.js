const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
let proyectoEditando = null;

document.getElementById('nav-proyectos').addEventListener('click', () => {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Gestión de Proyectos</h2>
        <form id="form-proyecto">
            <input type="text" id="nombre_proyecto" placeholder="Nombre del Proyecto" required>
            <input type="date" id="fecha_inicio" required>
            <input type="date" id="fecha_fin" required>
            <button type="submit" class="add">Agregar Proyecto</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre del Proyecto</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="proyectos-list"></tbody>
        </table>
    `;

    const form = document.getElementById('form-proyecto');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre_proyecto = document.getElementById('nombre_proyecto').value;
        const fecha_inicio = document.getElementById('fecha_inicio').value;
        const fecha_fin = document.getElementById('fecha_fin').value;

        if (proyectoEditando) {
            proyectoEditando.nombre_proyecto = nombre_proyecto;
            proyectoEditando.fecha_inicio = fecha_inicio;
            proyectoEditando.fecha_fin = fecha_fin;
            proyectoEditando = null;
        } else {
            const nuevoProyecto = {
                id: proyectos.length + 1,
                nombre_proyecto,
                fecha_inicio,
                fecha_fin
            };
            proyectos.push(nuevoProyecto);
        }

        localStorage.setItem('proyectos', JSON.stringify(proyectos));
        renderProyectos();
        form.reset();
        form.querySelector('button').textContent = 'Agregar Proyecto';
    });

    const renderProyectos = () => {
        const proyectosList = document.getElementById('proyectos-list');
        proyectosList.innerHTML = '';
        proyectos.forEach(proyecto => {
            proyectosList.innerHTML += `
                <tr>
                    <td>${proyecto.id}</td>
                    <td>${proyecto.nombre_proyecto}</td>
                    <td>${proyecto.fecha_inicio}</td>
                    <td>${proyecto.fecha_fin}</td>
                    <td>
                        <button class="edit" onclick="editarProyecto(${proyecto.id})">Editar</button>
                        <button class="delete" onclick="eliminarProyecto(${proyecto.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    };

    renderProyectos();
});

function editarProyecto(id) {
    proyectoEditando = proyectos.find(proyecto => proyecto.id === id);
    if (proyectoEditando) {
        document.getElementById('nombre_proyecto').value = proyectoEditando.nombre_proyecto;
        document.getElementById('fecha_inicio').value = proyectoEditando.fecha_inicio;
        document.getElementById('fecha_fin').value = proyectoEditando.fecha_fin;
        document.querySelector('button.add').textContent = 'Actualizar Proyecto';
    }
}

function eliminarProyecto(id) {
    const index = proyectos.findIndex(proyecto => proyecto.id === id);
    if (index > -1) {
        proyectos.splice(index, 1);
        localStorage.setItem('proyectos', JSON.stringify(proyectos));
        document.getElementById('nav-proyectos').click();
    }
}