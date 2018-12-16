//variable globaL

var productosGlobal = [];
var resultado = 0;  
//probando function on click con botones
function verDeuda() {
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
  var productos = $(".my-todo-list").val();
  var precios = $(".precios").val();
  var miLista = $(".laLista");
    if (productos != 0 && precios != 0) {
      //creo mi "item list", cada vez que itero
    var misProductos = $("<li> " + productos + " " +"$" + precios + "</li>");
    var miBotonDeBorrar = $("<button class='remove-btn'>X</button>");
    misProductos.append(miBotonDeBorrar);
    miLista.append(misProductos);

    var misProductosAAgregar = {
      nombre: productos,
      precio: precios
    }
    let n = productosGlobal.length;
   productosGlobal.push(misProductosAAgregar);

    miBotonDeBorrar.on("click", function() {
      $(this).parent().remove(); //borro el item de la lista
      productosGlobal.splice(n, 1);
      subtotal();
    });
    $(".my-todo-list").val("");
    $(".precios").val("");
  }
  else {
    console.log("agregue señora, agregue")
  }
}

//mi función para sumar 
function subtotal() {
  resultado = 0
  for (let i = 0; i < productosGlobal.length; i++) {
    var productosANumero = parseInt(productosGlobal[i].precio);
    resultado+=productosANumero
  }
  //si lo agregaba adentro del for, al momento que yo quiero borrar todos mis elementos del arreglo
  //el for no se ejecutaba porque solo se ejecuta si tiene algo
  //console.log(resultado)
  $(".subtotal").text("$" + resultado + " | Total de items ingresados: " + productosGlobal.length);
  return resultado;
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
      creandoLosBotones();
      //vuelvo a la compra
      $(".botonVolver").on("click", function(){
        $(".modal-continuar").removeClass("visible");
      })
    }
  
}

function creandoLosBotones() {
  var cantidadDeBotones = $(".modal-button-container").children().length;
  //les pongo estos parámetros pa que el botón, una vez que agregue los 4 botones, no agregue más
  if (productosGlobal.length >= 1 && cantidadDeBotones === 0) {
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
  }


//el botón de añadir productos
$(".addProd").on("click", function() {
  llamandoALaLista();
  subtotal();
  $(".continuar").addClass("visible");
});


//La financiacion. 
//voy por los cálculos
/*
switch(monto) {
  case efectivo:
  monto = monto
  break;
  case debito: 
  monto * 1,5 = monto
  break;
  case credito: 


}
*/
verDeuda();
//creandoLosBotones();



/*
hacer un switch();
//podría poner dos parámetros, el parámetro 1 que sea el medio de pago, y el parámetro 2 el monto
function garpandoEnEefectivo(efectivo) { //al pe2 pero bue
  return efectivo
}

function garpandoEnLaAmex(monto) {
  //con crédito hay un recargo del 10%
  var porcentajeAdicional = 1.1;
  var resultaTRE = monto * porcentajeAdicional;
  return resultaTRE;
}
 
function garpandoConDebito(monto) {
  var porcentajeAdicional = 1.15;
  var resultaDO = monto * porcentajeAdicional;
  return resultaDO;
}

function pagandoConChequeGor(monto) {
  var porcentajeAdicional = 1.2;
  var resultaCUA = monto * porcentajeAdicional;
  return resultaCUA;
}


var  mediosDePago = [
  {
    medio: "credito",
    recargo: 1.1
  },
  {
    medio: "efectivo",
    recargo: 1
  },
  {
    medio: "debito",
    recargo: 1.05
  },
  {
    medio: "cheque",
    recargo: 1.20
  }
]

/*function verRecargo(monto) {

}

/*function garpandoConLaAmex(pasta) {

}

*/