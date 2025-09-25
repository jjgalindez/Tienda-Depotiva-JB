
document.getElementById("formCarta").addEventListener("submit", function(e) {
  e.preventDefault();

  // Datos del formulario
  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  //const telefono = document.getElementById("telefono").value;

  const carta = `
  Fecha de invitación: ${fecha}

  Hola, soy ${nombre}, quiero invitarte a Tienda Deportiva JB donde venden guayos de 
  excelente calidad. 
  Ofrecen los ultimos modelos disponibles en el mercado y ademas promociones especiales. 
  Escríbeles  para más detalles. WhatsApp 3137096423`;


  
  const url = `https://wa.me/?text=${encodeURIComponent(carta)}`;

  window.open(url, "_blank");

  const { jsPDF } = window.jspdf; // si usas el script desde CDN
  const doc = new jsPDF();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(carta, 10, 20); // (texto, x, y)

  doc.save("carta-invitacion.pdf"); // descarga automática
});
