// validacion rut
let $rut = $("#rut");
let $nom = $("#nom");
let $email = $("#email");
let $fono = $("#fon");
let $btn_toggle_pass0 = $("#toggle_password_vis0");
let $btn_toggle_pass1 = $("#toggle_password_vis1");
let $pass = $("#psw0");
let $confirmar_pass = $("#psw1");

$rut.keyup(checkRut);
$nom.keyup(checkNombre);
$email.keyup(checkCorreo);
$fono.keyup(checkFono);

$btn_toggle_pass0.click(togglePassVisibility);
$btn_toggle_pass1.click(togglePassVisibility);

$pass.focus(function(){
  $(".formulario__mensajes-error-pass").slideDown(200);
});

$pass.keyup(function(){
  validarPass();
  compararPass();
});

$confirmar_pass.keyup(compararPass);


function checkRut() {

  // Quitar puntos y guiones insertados por el usuario
  let valor = $rut.val().replace(".", "");
  let $msgs_error = $("div[data-amv-error='rut'] p");

  valor = valor.replace("-", "");

  // Separa el cuerpo del rut del digito verificador
  let cuerpo = valor.slice(0, -1);
  let dv = valor.slice(-1);

  // Asigna al input el texto procesado
  $rut.val(cuerpo + "-" + dv);

  // calculo del digito verificador
  let = suma = 0;
  let = multiplo = 2;

  for (i = 1; i <= cuerpo.length; i++) {
    index = multiplo * valor.charAt(cuerpo.length - i);
    suma = suma + index;
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }

  let = dvEsperado = 11 - (suma % 11);
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;

  // se checan las condiciones

  $msgs_error[0].classList.remove("d-block");
  $msgs_error[1].classList.remove("d-block");

  $rut.parents()[1].classList.remove("formulario__valido");

  if (cuerpo.length < 7) {
    $rut[0].setCustomValidity("RUT Incompleto");
    $rut.parents()[1].classList.add("formulario__invalido");
    $msgs_error[0].classList.add("d-block");

  }
  else if (dvEsperado != dv) {
    $msgs_error[0].classList.remove("d-block");

    $rut[0].setCustomValidity("RUT Inválido");
    $rut.parents()[1].classList.add("formulario__invalido");
    $msgs_error[1].classList.add("d-block");
  }
  else {
    $rut[0].setCustomValidity("");
    $rut.parents()[1].classList.add("formulario__valido");
  }
}

function checkNombre() {
  let $msgs_error = $("div[data-amv-error='nom'] p");
  const regexNombre = new RegExp(/^[a-zA-ZÀ-ÿ\s]{2,50}$/, 'i');

  $msgs_error[0].classList.remove("d-block");
  $nom.parents()[1].classList.remove("formulario__valido");

  if (regexNombre.test($nom.val())) {
    $nom.parents()[1].classList.add("formulario__valido");
    $nom[0].setCustomValidity("");
  }
  else {
    $nom[0].setCustomValidity("Nombre Invalido");
    $nom.parents()[1].classList.add("formulario__invalido");
    $msgs_error[0].classList.add("d-block");
  }
}

function checkCorreo() {
  let $msgs_error = $("div[data-amv-error='email'] p");

  // Comprobacion basica de formato de correo
  const regexCorreo = RegExp(/^[^@]+@[^@]+\.[^@]+$/, 'i');

  $msgs_error[0].classList.remove("d-block");
  $email.parents()[1].classList.remove("formulario__valido");

  if (regexCorreo.test($email.val())) {
    $email.parents()[1].classList.add("formulario__valido");
    $email[0].setCustomValidity("");
  }
  else {
    $email[0].setCustomValidity("Correo Invalido");
    $email.parents()[1].classList.add("formulario__invalido");
    $msgs_error[0].classList.add("d-block");
  }
}

function checkFono() {
  const $msgs_error = $("div[data-amv-error='fono'] p");
  const regexFono = new RegExp(/^\d{9}$/, 'i');

  $fono.parents()[1].classList.remove("formulario__valido");
  $msgs_error[0].classList.remove("d-block");

  if (regexFono.test($fono.val())) {
    $fono.parents()[1].classList.add("formulario__valido");
    $fono[0].setCustomValidity("");
  }
  else {
    $fono[0].setCustomValidity("Telefono Invalido");
    $fono.parents()[1].classList.add("formulario__invalido");
    $msgs_error[0].classList.add("d-block");
  }
}

function togglePassVisibility() {
  if ($pass.attr("type") === "password") {
    $pass.attr("type", "text");
    $confirmar_pass.attr("type", "text");
    $btn_toggle_pass0.html('<i class="bi bi-eye-slash-fill"></i>');
    $btn_toggle_pass1.html('<i class="bi bi-eye-slash-fill"></i>');
  }
  else {
    $pass.attr("type", "password");
    $confirmar_pass.attr("type", "password");
    $btn_toggle_pass0.html('<i class="bi bi-eye-fill"></i>');
    $btn_toggle_pass1.html('<i class="bi bi-eye-fill"></i>');
  }

}

function compararPass() {
  const $msgs_error = $("div[data-amv-error='confirmar_pass'] p");
  let inputLength = $pass.val().length + $confirmar_pass.val().length;

  $confirmar_pass.parents()[1].classList.remove("formulario__valido");
  $msgs_error[0].classList.remove("d-block");

  if ($pass.val() === $confirmar_pass.val() && inputLength != 0) {
    $confirmar_pass[0].setCustomValidity("");
    $confirmar_pass.parents()[1].classList.add("formulario__valido");
  } else {
    $confirmar_pass.parents()[1].classList.add("formulario__invalido");
    $confirmar_pass[0].setCustomValidity("Las contraseñas no coinciden");
    $msgs_error[0].classList.add("d-block");
  }
}

function validarPass(){
  const $msgs_error = Array.from($("div[data-amv-error='pass'] p"));

  const minusculas = /[a-z]/g;
  const mayusculas = /[A-Z]/g;
  const numeros = /[0-9]/g;
  const min_letras = 8;
  let errores = 4;

  $msgs_error.forEach(mensaje => {
    mensaje.classList.remove("formulario__mensaje-valido");
    mensaje.classList.add("formulario__mensaje-invalido");
  });

  if ($pass.val().length >= min_letras) {
    $msgs_error[0].classList.add("formulario__mensaje-valido");
    errores -= 1;
  }
  
  if ($pass.val().match(minusculas)) {
    $msgs_error[1].classList.add("formulario__mensaje-valido");
    errores -= 1;
  } 

  if ($pass.val().match(mayusculas)) {
    $msgs_error[2].classList.add("formulario__mensaje-valido");
    errores -= 1;
  } 

  if ($pass.val().match(numeros)) {
    $msgs_error[3].classList.add("formulario__mensaje-valido");
    errores -= 1;
  }

  if (errores > 0) {
    $pass[0].setCustomValidity("Contraseña Invalida");
  } 
  else {$pass[0].setCustomValidity("");}

}

// USO DE LA API DE GOOGLE PLACES PARA RELLENAR DIRECCION

let autocomplete;
let address1Field;
let address2Field;
let postalField;

function initAutocomplete() {
  address1Field = document.querySelector("#ship-address");
  address2Field = document.querySelector("#address2");
  postalField = document.querySelector("#postcode");

  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["cl"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";

  for (const component of place.address_components) {
    const componentType = component.types[0];

    switch (componentType) {
      case "locality":
        $("#locality").val(component.long_name);
        break;
      case "administrative_area_level_1": {
        $("#state").val(component.short_name);
        break;
      }
      case "street_number":
        $("#street_number").val(component.long_name);
        break;

      case "route":
        $("#route").val(component.long_name);
        break;
    }
  }

  address1Field.value = address1;
  postalField.value = postcode;
  address2Field.focus();
}