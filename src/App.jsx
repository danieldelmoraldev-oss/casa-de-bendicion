import { ModalProvider } from "./context/ModalContext";
import Modal from "./components/ui/Modal";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import Welcome from "./components/sections/Welcome";
import Vision from "./components/sections/Vision";
import AboutVideo from "./components/sections/AboutVideo";
import Pastors from "./components/sections/Pastors";
import Gatherings from "./components/sections/Gatherings";
import Training from "./components/sections/Training";
import Ministries from "./components/sections/Ministries";
import Community from "./components/sections/Community";
import FirstTime from "./components/sections/FirstTime";
import Connect from "./components/sections/Connect";
import Donate from "./components/sections/Donate";
import FinalCta from "./components/sections/FinalCta";

/**
 * ============================================================
 * CASA DE BENDICIÓN — One-pager completo
 * ------------------------------------------------------------
 * Aunque es una sola página, cada sección es un componente
 * independiente y autónomo (sus propios datos, animaciones y
 * fondos). Mover cualquiera de ellas a su propia ruta mañana
 * es cambiar una línea aquí.
 *
 * Ritmo visual: se alternan bloques oscuros y crema para que el
 * ojo descanse, con Donar como único bloque cálido en oro.
 * ============================================================
 */
export default function App() {
  return (
    <ModalProvider>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-[12px] focus:font-semibold focus:uppercase focus:tracking-widest focus:text-ink"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main className="relative overflow-x-clip">
        <Hero />        {/* 01 · Hero + tarjeta de horarios superpuesta */}
        <Welcome />     {/* 02 · Bienvenido a casa                      */}
        <Vision />      {/* 03 · Nuestra visión                         */}
        <AboutVideo />  {/* 04 · Conoce CDB + vídeo institucional       */}
        <Pastors />     {/* 05 · Nuestros pastores                      */}
        <Gatherings />  {/* 06 · Reúnete con nosotros                   */}
        <Training />    {/* 07 · Crece y fórmate                        */}
        <Ministries />  {/* 08 · Ministerios                            */}
        <Community />   {/* 09 · Comunidad e impacto                    */}
        <FirstTime />   {/* 10 · ¿Es tu primera vez? + formulario       */}
        <Connect />     {/* 11 · Conéctate (4 modales)                  */}
        <Donate />      {/* 12 · Donar                                  */}
        <FinalCta />    {/*      Cierre                                 */}
      </main>

      <Footer />

      {/* Capa global de modales (Conéctate, Planifica tu visita, vídeo…) */}
      <Modal />
    </ModalProvider>
  );
}
