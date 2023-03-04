const firebaseConfig = {
  apiKey: "AIzaSyBvWlhQSxX0akCfR_8wA-NO8WTZ2qrVYdE",
  authDomain: "programacion-web-88779.firebaseapp.com",
  databaseURL: "https://programacion-web-88779-default-rtdb.firebaseio.com/",
  projectId: "programacion-web-88779",
  storageBucket: "programacion-web-88779.appspot.com",
  messagingSenderId: "862776094383",
  appId: "1:862776094383:web:dcf14f8deb5789b8392e5a",
  measurementId: "G-MNDZRH9FTY",
};
firebase.initializeApp(firebaseConfig);

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

    firebase
      .database()
      .ref("empleados/" + objEmpleado.id)
      .set(
        {
          id: objEmpleado.id,
          nombre: objEmpleado.nombre,
          puesto: objEmpleado.puesto,
          sueldo: objEmpleado.sueldo,
          numControl: objEmpleado.numControl,
        },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("data saved");
          }
        }
      );

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

mostrarEmpleados();

function mostrarEmpleados() {
  limpiarHTML();

  var starCountRef = firebase.database().ref("empleados");

  starCountRef.on("value", (snapshot) => {
    const data = Object.keys(snapshot.val()).map((key) => snapshot.val()[key]);
    const divEmpleados = document.querySelector(".div-empleados");

    data.forEach((empleado) => {
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

  firebase
    .database()
    .ref("empleados/" + objEmpleado.id)
    .set(
      {
        id: objEmpleado.id,
        nombre: objEmpleado.nombre,
        puesto: objEmpleado.puesto,
        sueldo: objEmpleado.sueldo,
        numControl: objEmpleado.numControl,
      },
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("data saved");
        }
      }
    );

  limpiarHTML();
  mostrarEmpleados();
  formulario.reset();

  formulario.querySelector('button[type="submit"]').textContent = "Agregar";

  editando = false;
}

function eliminarEmpleado(id) {
  firebase
    .database()
    .ref("empleados/" + id)
    .set(
      {
       
      },
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("data saved");
        }
      }
    );

  limpiarHTML();
  mostrarEmpleados();
}

function limpiarHTML() {
  const divEmpleados = document.querySelector(".div-empleados");
  while (divEmpleados.firstChild) {
    divEmpleados.removeChild(divEmpleados.firstChild);
  }
}

const picame = () => {
  console.log("picado");
};
