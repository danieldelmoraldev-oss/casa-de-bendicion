import { contact } from "../data/site";

/**
 * ============================================================
 * ENVÍO DE FORMULARIOS — solución puente
 * ------------------------------------------------------------
 * La web es estática y no tiene servidor propio, así que los
 * ocho formularios salen por Web3Forms: recibe el POST y
 * reenvía el contenido por correo a la dirección con la que se
 * dio de alta la clave.
 *
 * Es deliberadamente temporal. Cuando llegue la integración con
 * ChMeetings, este archivo es el único que hay que tocar: los
 * componentes sólo saben que existe `enviarFormulario`.
 *
 * La clave viaja en el bundle. En Web3Forms eso es lo esperado:
 * la clave sólo autoriza a enviar correo a una dirección fija,
 * no da acceso a nada.
 * ============================================================
 */

const ENDPOINT = "https://api.web3forms.com/submit";

/* El correo llega con las etiquetas del esquema como encabezado de cada
   línea, no con los nombres internos: quien lo lee no tiene por qué
   saber que `ninos` era "¿Vienen niños?". */
function contenido(config, datos) {
  const salida = {};
  for (const campo of config.fields) {
    const valor = datos.get(campo.name);
    salida[campo.label] = valor?.toString().trim() || "—";
  }
  return salida;
}

/* Si el esquema pide un correo, se usa como remitente de respuesta: así
   el equipo contesta desde su bandeja sin copiar direcciones a mano. */
function correoRespuesta(config, datos) {
  const campo = config.fields.find((f) => f.type === "email");
  if (!campo) return undefined;
  return datos.get(campo.name)?.toString().trim() || undefined;
}

/**
 * Envía el formulario. Resuelve si el correo ha salido y lanza si no,
 * para que quien llama pueda ofrecer reintentar o escribir directamente.
 */
export async function enviarFormulario(config, formEl) {
  if (!contact.web3formsKey) {
    throw new Error("No hay servicio de envío configurado.");
  }

  const datos = new FormData(formEl);

  /* Trampa antispam de ui/Form.jsx: si viene rellena es un bot. Se
     descarta como si hubiera funcionado, para no darle pistas. */
  if (datos.get("botcheck")) return;

  const respuesta = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: contact.web3formsKey,
      subject: `[Web] ${config.eyebrow}`,
      from_name: "Casa de Bendición · Web",
      replyto: correoRespuesta(config, datos),
      ...contenido(config, datos),
    }),
  });

  const cuerpo = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok || !cuerpo.success) {
    throw new Error(cuerpo.message || "El envío no ha llegado a su destino.");
  }
}
