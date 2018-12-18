//variable globaL

const productosGlobal = [];
//subtotal de la compra

let metodoDePago = null;

let resultado = 0;  

let recargoDebito = 1.05;

let recargoCredito = 1.1;

let recargoCheque = 1.20;

let resultadoCredito = 0;






//probando function on click con botones
function comrparProductos() {
  $(".btn-two").on("click", function() {
    $(".waitingText").addClass("visible");
    setTimeout(function(){
      $(".prod-cont").addClass("visible");
      $(".waitingText").removeClass("visible");
    }, 1000);
    
  });
}

//mi to-do list
function llamandoALaLista() {
  //let nombreDeUsuario = ("nombreDeUsuario").val();
  var productos = $(".my-todo-list").val();
  var precios = $(".precios").val();
  var miLista = $(".laLista");
    if (productos != 0 && precios != 0) {
      //appendeo los items de los inputs a mi div.
    var misProductos = $("<li> " + productos + " " +"$" + precios + "</li>");
    var miBotonDeBorrar = $("<button class='remove-btn'>X</button>");
    misProductos.append(miBotonDeBorrar);
    miLista.append(misProductos);

    var misProductosAAgregar = {
     // userName: nombreDeUsuario,
      nombre: productos,
      precio: precios
    }
    let n = productosGlobal.length;
   productosGlobal.push(misProductosAAgregar);

    miBotonDeBorrar.on("click", function() {
      $(this).parent().remove(); //borro el item de la lista
      productosGlobal.splice(n, 1);//lo borro de mi array también
      subtotal();
    });
    $(".my-todo-list").val("");
    $(".precios").val("");
  }
  else {
    console.log("el dinero no importa, pero cómo ashuda")
  }
}



//mi función para sumar 
function subtotal() {
  resultado = 0
  for (let i = 0; i < productosGlobal.length; i++) {
    var productosANumero = parseInt(productosGlobal[i].precio);
    resultado+=productosANumero
  }
  $(".subtotal").text("$" + resultado + " | Total de items ingresados: " + productosGlobal.length);
  return resultado;
}

//el botón de añadir productos
$(".addProd").on("click", function() {
  llamandoALaLista();
  subtotal();
  $(".continuar").addClass("visible");
});



function creandoLosBotones() {
    var botonEfectivo = $("<button data-mp='ef' class='modal-btn'>Pagar en Efectivo</button>")
    var botonDebito = $("<button data-mp='deb' class='modal-btn'>Pagar con Debito</button>")
    var botonCredito = $("<button data-mp='cr' class='modal-btn'>Pagar con Credito</button>")
    var botonCheque = $("<button data-mp='ch' class='modal-btn'>Pagar con Cheque</button>")
    var botonVolver = $("<button class='botonVolver'>Volver</button>")
    $(".modal-button-container").append(botonEfectivo)
    $(".modal-button-container").append(botonDebito)
    $(".modal-button-container").append(botonCredito)
    $(".modal-button-container").append(botonCheque)
    $(".modal-button-container").append(botonVolver)
  }


function botonContinuar() {
  //con esto pregunto si hay items en mi lista
      if (productosGlobal.length === 0) {
        $(".error-text").addClass("visible")
        setTimeout(function() {
        $(".error-text").removeClass("visible")
        }, 1500);
      }
    else {
      $(".modal-continuar").addClass("visible");
      $(".precio-final").text("$" + resultado);
      //vuelvo a la compra
      $(".botonVolver").on("click", function(){
        $(".modal-continuar").removeClass("visible");
      })
    }
  
}


//ordeno los items que compró al final.
function productosFinales() {
  for (let i = 0; i < productosGlobal.length; i++){
   let mostrarCadaProducto = $("<li>" + productosGlobal[i].nombre + "$" + productosGlobal[i].precio + "</li>") 
   $(".productosFinales").append(mostrarCadaProducto)
  }
}

//guardar en LS
function guardarEnLS() {
  misProductosAJson = JSON.stringify(productosGlobal);
  localStorage.setItem("informacionGuardada", misProductosAJson)
}

//recargar página
function volverALaPaginaPrincipal() {
  let botonPaginaPrincipal = $("<button class='recargarPagina'>Pagina Principal</button>");
  $(".paginaPrincipal").append(botonPaginaPrincipal);
  $(".recargarPagina").on("click", function() {
    location.reload();
  });
}

function seleccionandoLaCuota() {
    $(".cuotas").on("click", function(){
     let lasCuotas =  $(this).val();
     switch(lasCuotas) {
       case "1C":
       $(".description-text").html("En una cuota no hay recargo de interés.")
       break;
       case "12C":
       let recargoCuota12 = resultadoCredito * 1.2;
       $(".precio-final").html("$" + recargoCuota12);
       $(".description-text").html("Con 12 cuotas tenés un recargo del 20%");
       case "24C":
       let recargoCuota24 = resultadoCredito * 1.45;
       $(".precio-final").html("$" + recargoCuota24);
       $(".description-text").html("Con 24 cuotas tenés un recargo del 45%");
       case "36C":
       let recargoCuota36 = resultadoCredito * 1.7;
       $(".precio-final").html("$" + recargoCuota36);
       $(".description-text").html("Con 36 cuotas tenés un recargo del 70%");
     }
    })
}

function creandoElSelect() {
  let miSelect = $("<select class='cuotas'></select>");
  let opcionDefault = $("<option>Elegí la/s cuota/s para continuar</option>")
  let opcionCuota1 = $("<option value='1C'>1 Cuota</option>")
  let opcionCuotas12 = $("<option value='12C'>12 Cuotas</option>")
  let opcionCuotas24 = $("<option value='24C'>24 Cuotas</option>")
  let opcionCuotas36 = $("<option value='36C'>36 Cuotas</option>")

  miSelect.append(opcionDefault)
  miSelect.append(opcionCuota1)
  miSelect.append(opcionCuotas12)
  miSelect.append(opcionCuotas24)
  miSelect.append(opcionCuotas36)

  $(".seleccionarCuotas").append(miSelect)
  
}





function verQueMetodoDePago() {
  $(".modal-btn").on("click", function() {
    resultadoDebito =  resultado * recargoDebito;
    resultadoDebito = resultadoDebito.toFixed(2);
    resultadoCredito = resultado * recargoCredito;
    resultadoCredito = resultadoCredito.toFixed(2);
    resultadoCheque = resultado * recargoCheque;
    resultadoCheque = resultadoCheque.toFixed(2);
    let misDatas = $(this).data().mp
    switch (misDatas) {
      case "ef":
      metodoDePago = "efectivo"
      $(".modal-button-container").addClass("invisible");
      $(".pregunta-mp").html("Método de pago elegido: " + metodoDePago)
      productosFinales();
      volverALaPaginaPrincipal();
      break;
      case "deb":
      metodoDePago = "debito"
      $(".modal-button-container").addClass("invisible");
      $(".precio-final").html("$" + resultadoDebito)
      $(".pregunta-mp").html("Método de pago elegido: " + metodoDePago)
      productosFinales();
      volverALaPaginaPrincipal();
      break;
      case "ch": 
      metodoDePago = "cheque"
      $(".modal-button-container").addClass("invisible");
      $(".precio-final").html("$" + resultadoCheque)
      $(".pregunta-mp").html("Método de pago elegido: " + metodoDePago);
      productosFinales();
      volverALaPaginaPrincipal();
      break;
      case "cr":
      metodoDePago = "credito"
      $(".modal-button-container").addClass("invisible");
      $(".precio-final").html("$" + resultadoCredito)
      $(".pregunta-mp").html("Método de pago elegido:" + metodoDePago )
      resultado = resultadoCredito
      creandoElSelect();
      seleccionandoLaCuota();
    }
  });
}


comrparProductos();
creandoLosBotones();
verQueMetodoDePago();