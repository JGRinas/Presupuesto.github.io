const ingresos = [
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta coche", 1000.0),
];

const egresos = [new Egreso("Renta", 900), new Egreso("Ropa", 400)];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngresos = 0;
  for (let ingreso of ingresos) {
    totalIngresos += ingreso.valor;
  }

  return totalIngresos;
};

let totalEgresos = () => {
  let totalEgresos = 0;
  for (let egreso of egresos) {
    totalEgresos += egreso.valor;
  }

  return totalEgresos;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name='close-outline' onclick='eliminarIngreso(${
                      ingreso.id
                    })'></ion-icon>
                </button>
              </div>
            </div>
          </div>
    `;

  return ingresoHTML;
};

const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarApp();
};

const cargarEgresos = () => {
  let egresoHTML = "";
  for (let egreso of egresos) {
    egresoHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egreso").innerHTML = egresoHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_eliminar">
        <a class="elemento_eliminar--btn">
            <ion-icon name='close-outline' onclick='eliminarEgreso(${
              egreso.id
            })'></ion-icon>
        </a>
      </div>
    </div>
  </div>
      `;

  return egresoHTML;
};

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarApp();
};

const agregarDato = () => {
  let form = document.forms["form"];
  let tipo = form["tipo"];
  let descripcion = form["descripcion"];
  let valor = form["valor"];
  if (descripcion.value !== "" && valor.value !== "") {
    if (tipo.value == "ingreso") {
      //el + convierte el valor en número
      ingresos.push(new Ingreso(descripcion.value, +valor.value));  
      cargarApp();
    } else {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarApp();
    }
  
  }
};
