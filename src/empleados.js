const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
let empleadoEditando = null;

document.getElementById('nav-empleados').addEventListener('click', () => {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Gestión de Empleados</h2>
        <form id="form-empleado">
            <input type="text" id="nombre" placeholder="Nombre" required>
            <input type="text" id="puesto" placeholder="Puesto" required>
            <input type="number" id="salario" placeholder="Salario" required>
            <button type="submit" class="add">Agregar Empleado</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Puesto</th>
                    <th>Salario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="empleados-list"></tbody>
        </table>
    `;

    const form = document.getElementById('form-empleado');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const puesto = document.getElementById('puesto').value;
        const salario = document.getElementById('salario').value;

        if (empleadoEditando) {
            empleadoEditando.nombre = nombre;
            empleadoEditando.puesto = puesto;
            empleadoEditando.salario = salario;
            empleadoEditando = null;
        } else {

            const nuevoEmpleado = {
                id: empleados.length + 1,
                nombre,
                puesto,
                salario
            };
            empleados.push(nuevoEmpleado);
        }

        localStorage.setItem('empleados', JSON.stringify(empleados));
        renderEmpleados();
        form.reset();
        form.querySelector('button').textContent = 'Agregar Empleado';
    });

    const renderEmpleados = () => {
        const empleadosList = document.getElementById('empleados-list');
        empleadosList.innerHTML = '';
        empleados.forEach(emp => {
            empleadosList.innerHTML += `
                <tr>
                    <td>${emp.id}</td>
                    <td>${emp.nombre}</td>
                    <td>${emp.puesto}</td>
                    <td>${emp.salario}</td>
                    <td>
                        <button class="edit" onclick="editarEmpleado(${emp.id})">Editar</button>
                        <button class="delete" onclick="eliminarEmpleado(${emp.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    };

    renderEmpleados();
});

function editarEmpleado(id) {
    empleadoEditando = empleados.find(emp => emp.id === id);
    if (empleadoEditando) {
        document.getElementById('nombre').value = empleadoEditando.nombre;
        document.getElementById('puesto').value = empleadoEditando.puesto;
        document.getElementById('salario').value = empleadoEditando.salario;
        document.querySelector('button.add').textContent = 'Actualizar Empleado';
    }
}

function eliminarEmpleado(id) {
    const index = empleados.findIndex(emp => emp.id === id);

    if (index > -1) {
        empleados.splice(index, 1);
        localStorage.setItem('empleados', JSON.stringify(empleados));
        document.getElementById('nav-empleados').click();
    }
}