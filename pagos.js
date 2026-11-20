// Configuración del anticipo. Llena tus cuentas y sube este archivo a GitHub.
// Las cuentas con XXXX no se muestran. Si no hay cuentas ni link, la app no muestra la sección de pago.
window.PAGOS_CFG = {
  anticipoPct: 30, // porcentaje del total que se pide de anticipo
  cuentas: [
    { banco: "LAFISE", titular: "Amelia Castro Loaisiga", cuenta: "140031576", tipo: "Cuenta en córdobas" },
    { banco: "LAFISE", titular: "Amelia Castro Loaisiga", cuenta: "130286615",, tipo: "Cuenta en dolarers" },
    { banco: "BAC",    titular: "Amelia Castro Loaisiga", cuenta: "373277086", tipo: "Cuenta en córdobas" }
  ],
  linkTarjeta: "" // link de pago con tarjeta (por ejemplo Compra Click de BAC), cuando lo tengas
};
