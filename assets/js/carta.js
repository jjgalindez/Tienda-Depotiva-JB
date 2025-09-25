
document.getElementById("formCarta").addEventListener("submit", function(e) {
  e.preventDefault();

  // Datos del formulario
  const nombre = document.getElementById("nombre").value;
  //const telefono = document.getElementById("telefono").value;

  const carta = `Hola, soy ${nombre}, quiero invitarte a Tienda Deportiva JB, venden guayos de 
  excelente calidad. 
  Ofrecen varios modelos disponibles y promociones especiales. 
  Escríbeles  para más detalles. WhatsApp 3137096423`;

  
  const url = `https://wa.me/?text=${encodeURIComponent(carta)}`;

  window.open(url, "_blank");
});
