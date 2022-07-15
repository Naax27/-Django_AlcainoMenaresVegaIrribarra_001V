
let $nom = $("#nom");
let $ape = $("#ape");
let $email = $("#email");
let $fono = $("#fon");
let $ciudad = $("#ciudad");
let $comuna = $("#comuna");
let $consulta = $("#consulta");


$nom.keyup(() => checkLongMinima($nom, 'nom') );
$ape.keyup(() => checkLongMinima($ape, 'ape') );
$ciudad.keyup(() => checkLongMinima($ciudad, 'ciudad') );
$comuna.keyup(() => checkLongMinima($comuna, 'comuna') );
$consulta.keyup(() => {

  $consulta.parents()[0].classList.remove("formulario__valido");
  $consulta.parents()[0].classList.remove("formulario__invalido");
  

  if($consulta.val().length < 10) {

    $consulta.parents()[0].classList.add("formulario__invalido");
    $consulta[0].setCustomValidity("Consulta demasiado corta");
    
  } 
  else {

    $consulta.parents()[0].classList.add("formulario__valido");
    $consulta[0].setCustomValidity("");

  }


} );

$email.keyup(checkCorreo);
$fono.keyup(checkFono);

function checkLongMinima($input, data_amv) {
  let $msgs_error = $("div[data-amv-error='" + data_amv + "'] p");
  const regexNombre = new RegExp(/^[a-zA-ZÀ-ÿ\s]{2,50}$/, 'i');
  console.log($input.parents());
  $msgs_error[0].classList.remove("d-block");
  $input.parents()[1].classList.remove("formulario__valido");

  if (regexNombre.test($input.val())) {
    $input.parents()[1].classList.add("formulario__valido");
    $input[0].setCustomValidity("");
  }
  else {
    $input[0].setCustomValidity("Nombre Invalido");
    $input.parents()[1].classList.add("formulario__invalido");
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