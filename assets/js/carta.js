import { jsPDF } from "jspdf";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formCarta").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;

    const carta = `Hola, soy ${nombre}, quiero invitarte a Tienda Deportiva JB, venden calzado deportivo de 
      excelente calidad para mejorar nuestro rendimiento en las canchas como deportistas. 
      Ofrecen varios modelos disponibles y promociones especiales. 
      Escríbeles para más detalles. WhatsApp 3137096423`;

    // --- nviar a WhatsApp ---
    const url = `https://wa.me/?text=${encodeURIComponent(carta)}`;
    window.open(url, "_blank");

    // --- Generar PDF ---
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(carta, 10, 20);
    doc.save("carta-invitacion.pdf");
  });
});