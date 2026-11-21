// Configuración del anticipo.
// Si dejas una cuenta con XXXX, esa cuenta no se muestra. Si ninguna tiene datos y no hay link, no sale la sección de pago.
window.PAGOS_CFG = {
  anticipoPct: 30, // porcentaje del total que se pide de anticipo
  cuentas: [
    { banco: "LAFISE", titular: "Amelia Loaisiga", cuenta: "140031576", tipo: "Cuenta en córdobas" },
    { banco: "BAC",    titular: "NOMBRE DEL TITULAR", cuenta: "140031576", tipo: "Cuenta en córdobas" }
  ],
  linkTarjeta: "" // link de pago con tarjeta (por ejemplo Compra Click de BAC), cuando lo tengas
};
