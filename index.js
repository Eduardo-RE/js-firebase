import {push, ref, database} from './firebase'

let listaEmpleados = [];

const objEmpleado = {
  id: "",
  nombre: "",
  puesto: "",
  sueldo: "",
  numControl: "",
};

let editando = false;

const formulario = document.querySelector("#formulario");
const nombreInput = document.querySelector("#nombre");
const puestoInput = document.querySelector("#puesto");
const sueldoInput = document.querySelector("#sueldo");
const numControlInput = document.querySelector("#numControl");
const btnAgregarInput = document.querySelector("#btnAgregar");

formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();

  if (
    nombreInput.value === "" ||
    puestoInput.value === "" ||
    sueldoInput.value === "" ||
    numControlInput.value === "" 
  ) {
    alert("Todos los campos se deben llenar");
    return;
  }

  if (editando) {
    editarEmpleado();
    editando = false;
  } else {
    objEmpleado.id = Date.now();
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;
    objEmpleado.sueldo = sueldoInput.value;
    objEmpleado.numControl = numControlInput.value;

    push(ref(database, '/empleados'),{
        id: objEmpleado.id,
        nombre: objEmpleado.nombre,
        puesto: objEmpleado.puesto,
        sueldo: objEmpleado.sueldo,
        numControl: objEmpleado.numControl
    })


    agregarEmpleado();
  }
}

function agregarEmpleado() {
  listaEmpleados.push({ ...objEmpleado });

  mostrarEmpleados();

  formulario.reset();
  limpiarObjeto();
}

function limpiarObjeto() {
  objEmpleado.id = "";
  objEmpleado.nombre = "";
  objEmpleado.puesto = "";
  objEmpleado.sueldo = "";
  objEmpleado.numControl = "";
}

function mostrarEmpleados() {
  limpiarHTML();

  const divEmpleados = document.querySelector(".div-empleados");

  listaEmpleados.forEach((empleado) => {
    const { id, nombre, puesto, sueldo, numControl } = empleado;

    const parrafo = document.createElement("p");
    parrafo.textContent = `${id} - ${nombre} - ${puesto} - ${sueldo} - ${numControl} -`;
    parrafo.dataset.id = id;

    const editarBoton = document.createElement("button");
    editarBoton.onclick = () => cargarEmpleado(empleado);
    editarBoton.textContent = "Editar";
    editarBoton.classList.add("btn", "btn-editar");
    parrafo.append(editarBoton);

    const eliminarBoton = document.createElement("button");
    eliminarBoton.onclick = () => eliminarEmpleado(id);
    eliminarBoton.textContent = "Eliminar";
    eliminarBoton.classList.add("btn", "btn-eliminar");
    parrafo.append(eliminarBoton);

    const hr = document.createElement("hr");

    divEmpleados.appendChild(parrafo);
    divEmpleados.appendChild(hr);
  });
}

function cargarEmpleado(empleado) {
  const { id, nombre, puesto, sueldo, numControl } = empleado;

  nombreInput.value = nombre;
  puestoInput.value = puesto;
  sueldoInput.value = sueldo;
  numControlInput.value = numControl;

  objEmpleado.id = id;

  formulario.querySelector('button[type="submit"]').textContent = "Actualizar";

  editando = true;
}

function editarEmpleado() {
  objEmpleado.nombre = nombreInput.value;
  objEmpleado.puesto = puestoInput.value;
  objEmpleado.sueldo = sueldoInput.value;
  objEmpleado.numControl = numControlInput.value;

  listaEmpleados.map((empleado) => {
    if (empleado.id === objEmpleado.id) {
      empleado.id = objEmpleado.id;
      empleado.nombre = objEmpleado.nombre;
      empleado.puesto = objEmpleado.puesto;
      empleado.sueldo = objEmpleado.sueldo;
      empleado.numControl = objEmpleado.numControl;
    }
  });

  limpiarHTML();
  mostrarEmpleados();
  formulario.reset();

  formulario.querySelector('button[type="submit"]').textContent = "Agregar";

  editando = false;
}

function eliminarEmpleado(id) {
  listaEmpleados = listaEmpleados.filter((empleado) => empleado.id !== id);

  limpiarHTML();
  mostrarEmpleados();
}

function limpiarHTML() {
  const divEmpleados = document.querySelector(".div-empleados");
  while (divEmpleados.firstChild) {
    divEmpleados.removeChild(divEmpleados.firstChild);
  }
}
