🌴✨ Design System: "Tropical Luxe" (v1.0)
Proyecto: La Bianca Tropical
Estética: Mediterranean Boho × Neon Nights × Colonial Chic
Filosofía: "Del horno de leña a la pista de salsa — Bitcoin friendly, alma italiana, corazón tropical"

🎨 1. Paleta de Colores

Colores Base (Día — Mediterráneo)
- Fondo Principal: #FAF7F2 (Crema/Off-white cálido)
- Texto General: #2C2419 (Marrón café profundo)

Paleta de Marca (HSL)

1. Terracota (El Horno de Leña)
   - Función: Color primario, CTAs principales, calidez mediterránea
   - Nombre CSS: var(--terracota)
   - Hex: #E07A5F
   - Uso:
     - Botones principales (.bg-terracota)
     - Precios, ofertas del día
     - Hover states primarios

2. Verde Selva (Tropical Boho)
   - Función: Naturaleza, frescura, vegetación
   - Nombre CSS: var(--verde-selva)
   - Hex: #3D5A51
   - Uso:
     - Elementos decorativos (hojas, bordes)
     - Badges "Bitcoin Accepted"
     - Iconos de menú vegetariano/vegano

3. Dorado Colonial (Luxury)
   - Función: Elegancia, detalles premium, acentos
   - Nombre CSS: var(--dorado)
   - Hex: #D4AF37
   - Uso:
     - Bordes decorativos
     - Iconos de estrellas (reseñas)
     - Títulos especiales ("Chef's Special")

Paleta Nocturna (Neon Nights — Coco Bongo Style)
Modo Noche se activa automáticamente después de las 6 PM o toggle manual

- Fondo Nocturno: #0F0F1E (Azul noche profundo)
- Texto Nocturno: #FFFFFF

4. Neón Fucsia (Cócteles Psicodélicos)
   - Función: Energía nocturna, fiestas, eventos en vivo
   - Nombre CSS: var(--neon-fucsia)
   - Hex: #FF2E93
   - Uso:
     - Glow effects en modo noche
     - Badges "En Vivo" / "Salsa Night"
     - CTAs secundarios nocturnos

5. Neón Cian (Luces de la Pista)
   - Función: Tecnología, modernidad, Bitcoin
   - Nombre CSS: var(--neon-cian)
   - Hex: #00F5D4
   - Uso:
     - Pagos Lightning
     - QR codes
     - Efectos de brillo en modo noche

6. Púrpura Profundo (Misterio Tropical)
   - Función: Profundidad, sofisticación nocturna
   - Nombre CSS: var(--purpura)
   - Hex: #9B5DE5
   - Uso:
     - Gradientes nocturnos
     - Fondos de sección
     - Hover states modo noche

⌨️ 2. Tipografía

Playfair Display (Elegancia Mediterránea)
- Función: Títulos principales, nombres de platos, autoridad
- Clase: font-serif
- Uso: H1, H2, nombres de secciones del menú
- Estilo:
  - Día: text-terracota o text-cafe
  - Noche: text-dorado con drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]

Cormorant Garamond (Script Italiano)
- Función: Acentos decorativos, frases en italiano, subtítulos elegantes
- Clase: font-cormorant
- Uso:
  - "Buon Appetito", "Fatto in Casa"
  - Descripciones románticas de platillos
  - Firmas del chef

Montserrat (Moderna & Funcional)
- Función: UI, descripciones, precios, navegación
- Clase: font-sans
- Uso:
  - Textos de párrafo
  - Botones secundarios
  - Información de contacto
  - Precios en modo claro

Space Grotesk (Tecnología Bitcoin)
- Función: Datos técnicos, montos BTC, invoices Lightning
- Clase: font-mono
- Uso:
  - Montos en satoshis
  - Direcciones Lightning
  - QR codes labels
  - "Pagado con ⚡"

🖼️ 3. Efectos Visuales y UI

Glassmorphism "Tropical Luxe"

Modo Día:
```css
bg-white/90 backdrop-blur-md border-terracota/30
```

Modo Noche:
```css
bg-[#0F0F1E]/95 backdrop-blur-xl border-neon-cian/40
```

Bordes y Luces

Bordes Decorativos Día:
- border-terracota/30 para tarjetas de menú
- border-dorado (1px) para elementos premium

Bordes Nocturnos:
- border-neon-fucsia/40 con shadow-[0_0_15px_rgba(255,46,147,0.3)]
- border-neon-cian/40 para elementos Bitcoin

Efecto Glow (Animado)

Neon Pulse (Noche):
```css
animation: pulse 2s infinite;
text-shadow: 0 0 10px var(--neon-fucsia);
```

Bitcoin Lightning Glow:
```css
animation: lightning 3s infinite;
box-shadow: 0 0 20px var(--neon-cian);
```

Fondos y Texturas

Patrón de Hojas (Día):
```css
background-image: url('/textures/palm-pattern.svg');
opacity: 0.05;
```

Gradiente Nocturno:
```css
background: linear-gradient(135deg, #0F0F1E 0%, #1A1A2E 100%);
```

Textura de Ladrillo Colonial (Overlay sutil):
```css
background-image: url('/textures/brick-colonial.svg');
opacity: 0.1;
```

🎭 4. Componentes Clave

Navbar "Casona Colonial"

Día:
- Logo: Tipografía serif con hoja de monstera integrada
- Fondo: bg-crema/90 backdrop-blur-md
- Links: font-montserrat text-cafe hover:text-terracota transition-colors
- Border inferior: border-b-2 border-terracota/20

Noche:
- Logo: Glow neón fucsia
- Fondo: bg-[#0F0F1E]/95 backdrop-blur-xl
- Links: text-white hover:text-neon-cian transition-all duration-300
- Efecto: text-shadow: 0 0 10px var(--neon-cian)

Hero "Horno de Leña"

Día:
- Título: Playfair Display 6xl, text-cafe
- Subtítulo: Cormorant Garamond italic, text-terracota
- Background: Imagen del horno de leña con overlay crema
- CTA Principal: ArcadeButton terracota con hover dorado

Noche:
- Título: Con animación neon-pulse en text-neon-fucsia
- Background: Video loop de la pista de baile con luces
- CTA: Botón con borde neón cian y glow animado

Menú Digital "Carta Italiana"

Tarjeta de Plato:
```tsx
<div className="bg-white/90 dark:bg-[#0F0F1E]/95 backdrop-blur-md 
                border border-terracota/30 dark:border-neon-cian/40 
                rounded-xl p-6 shadow-lg dark:shadow-neon-cian/20">
```

Precio:
- Día: font-playfair text-2xl text-terracota font-bold
- Noche: font-playfair text-2xl text-neon-cian drop-shadow-[0_0_8px_rgba(0,245,212,0.6)]

Badge "Bitcoin Accepted":
```tsx
<span className="bg-verde-selva text-white px-2 py-1 rounded-full 
                 text-xs font-montserrat dark:bg-neon-cian dark:text-[#0F0F1E]">
  ⚡ Bitcoin Accepted
</span>
```

TipJar Component "Propina con Lightning"

Contenedor:
```tsx
<div className="fixed bottom-6 right-6 bg-white/90 dark:bg-[#0F0F1E]/95 
                backdrop-blur-xl border-2 border-dorado dark:border-neon-cian 
                rounded-2xl p-4 shadow-2xl dark:shadow-neon-cian/30">
```

QR Code:
- Borde: border-4 border-dorado rounded-lg
- Fondo: Blanco con patrón de hojas sutiles
- Label: font-space-grotesk text-cafe text-xs

Animación al Pagar:
```css
@keyframes lightning-strike {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); filter: brightness(2); }
  100% { transform: scale(1); opacity: 1; }
}
```

Event Card "Noche de Salsa"
```tsx
<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br 
                from-[#0F0F1E] to-[#1A1A2E] border border-neon-fucsia/40">
  <div className="absolute inset-0 bg-[url('/textures/dance-floor.svg')] opacity-10" />
  <div className="relative p-6">
    <h3 className="font-playfair text-2xl text-neon-fucsia mb-2">
      Salsa Night
    </h3>
    <p className="font-montserrat text-white/80">
      Every Friday 9PM • Live Band
    </p>
  </div>
</div>
```

ArcadeButton "Botón Tron Tropical"
```tsx
<button className="relative px-8 py-4 bg-terracota hover:bg-dorado 
                   dark:bg-neon-fucsia dark:hover:bg-neon-cian 
                   text-white font-bold rounded-lg transition-all duration-300 
                   shadow-lg dark:shadow-neon-fucsia/50 dark:hover:shadow-neon-cian/50">
  <span className="relative z-10">ORDER NOW</span>
  <div className="absolute inset-0 rounded-lg bg-gradient-to-r 
                  from-transparent via-white/20 to-transparent opacity-0 
                  hover:opacity-100 transition-opacity" />
</button>
```

🎬 5. Animaciones

Transición Día/Noche
```css
transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
```

Palm Sway (Hojas que se Mecen)
```css
@keyframes palm-sway {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}
```

Steam Rising (Vapor del Horno)
```css
@keyframes steam-rise {
  0% { transform: translateY(0) scale(1); opacity: 0.8; }
  100% { transform: translateY(-20px) scale(1.5); opacity: 0; }
}
```

Cocktail Shake (Agitar Cóctel)
```css
@keyframes cocktail-shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}
```

Bitcoin Lightning Strike
```css
@keyframes lightning {
  0%, 95% { opacity: 0.5; }
  5%, 10% { opacity: 1; filter: brightness(2); }
}
```

🧩 6. Componentes Bitcoin-Friendly

Lightning Invoice Card
```tsx
<div className="bg-white dark:bg-[#0F0F1E] border-2 border-dorado 
                dark:border-neon-cian rounded-xl p-4">
  <div className="font-space-grotesk text-xs text-gray-600 dark:text-gray-400 mb-1">
    Invoice {invoiceId}
  </div>
  <div className="font-space-grotesk text-lg text-terracota 
                  dark:text-neon-cian">
    {amount} sats
  </div>
  <div className="mt-2 h-48 bg-white rounded-lg p-2">
    <QRCode value={invoice} size={180} />
  </div>
</div>
```

Payment Success Animation
```tsx
<div className="text-center py-8">
  <div className="inline-block animate-bounce">
    <svg className="w-16 h-16 text-neon-cian" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  </div>
  <p className="mt-4 font-playfair text-2xl text-dorado">
    ¡Pago Exitoso!
  </p>
</div>
```

📱 7. Responsive & Mobile

Breakpoints
- sm: 640px (Móvil horizontal)
- md: 768px (Tablet)
- lg: 1024px (Desktop pequeño)
- xl: 1280px (Desktop)
- 2xl: 1536px (Desktop grande)

Mobile-First Adjustments

Menú Hamburguesa Nocturno:
```tsx
<nav className="lg:hidden">
  <button className="p-2 text-white dark:text-neon-cian">
    <svg className="w-6 h-6" />
  </button>
</nav>
```

TipJar Mobile:
- Sticky bottom bar en móvil
- QR siempre visible en esquina inferior derecha
- Notificaciones push con sonido de campana italiana

🎨 8. Imágenes y Fotografía

Filtros para Fotos

Día (Mediterráneo):
```css
filter: sepia(0.2) saturate(1.2) contrast(1.1);
```

Noche (Neon):
```css
filter: contrast(1.3) saturate(1.4) hue-rotate(15deg);
```

Overlays

Gradiente Protector de Texto:
```css
background: linear-gradient(transparent 0%, rgba(0,0,0,0.7) 100%);
```

Patrón de Hojas (Overlay sutil):
```css
background-image: url('/textures/palm-overlay.svg');
opacity: 0.05-0.1;
```

🚀 9. Reglas de Implementación para IA

Colores
- Día: Usa terracota como primario, verde-selva como secundario, dorado como acento
- Noche: Usa neon-fucsia para energía, neon-cian para tecnología/Bitcoin
- Nunca uses blanco puro (#FFFFFF) como fondo principal — siempre crema o off-white
- Nunca uses negro puro (#000000) — usa #0F0F1E o #1A1A2E

Tipografía
- Títulos de platos: Siempre Playfair Display
- Frases en italiano: Siempre Cormorant Garamond italic
- UI y navegación: Montserrat
- Datos Bitcoin: Space Grotesk (mono)

Imágenes
- Fotos de comida: Cálidas, saturación alta, énfasis en rojos/naranjas
- Fotos de ambiente nocturno: Contraste alto, neón visible, tonos fríos
- Siempre añade overlay de hojas tropicales en opacity 5-10%

Componentes Bitcoin
- Siempre muestra el badge "⚡ Bitcoin Accepted" en verde selva o neón cian
- QR codes: Borde dorado (día) o neón cian (noche)
- Montos en BTC: Space Grotesk con glow effect

Accesibilidad
- Contraste mínimo 4.5:1 para texto normal
- Contraste mínimo 3:1 para texto grande
- Siempre añade aria-label a iconos
- Focus visible: outline-2 outline-neon-cian offset-2

📦 10. Dependencias Clave

Tailwind CSS
```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracota: '#E07A5F',
        'verde-selva': '#3D5A51',
        dorado: '#D4AF37',
        'neon-fucsia': '#FF2E93',
        'neon-cian': '#00F5D4',
        purpura: '#9B5DE5',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

Librerías Recomendadas
- framer-motion: Para animaciones complejas
- qrcode.react: Para QR codes dinámicos
- @blink/bitcoin: Integración Lightning
- next-themes: Toggle día/noche
- canvas-confetti: Para celebraciones de pago

🌙 11. Modo Noche Automático

Detección de Hora
```tsx
const useAutoTheme = () => {
  const [isNight, setIsNight] = useState(false);
  
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsNight(hour >= 18 || hour < 6);
    };
    
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  return isNight;
};
```

Transición Suave
```tsx
<div className="transition-all duration-500 ease-in-out">
  {children}
</div>
```

✨ 12. Ejemplos de Uso

Hero Section
```tsx
<section className="relative min-h-screen flex items-center justify-center">
  <div className="absolute inset-0 bg-[url('/images/wood-oven.jpg')] bg-cover bg-center" />
  <div className="absolute inset-0 bg-crema/60 dark:bg-[#0F0F1E]/80" />
  
  <div className="relative z-10 text-center px-4">
    <h1 className="font-playfair text-6xl text-cafe dark:text-dorado mb-4">
      La Bianca Tropical
    </h1>
    <p className="font-cormorant text-xl text-terracota italic mb-8">
      Del horno de leña a la pista de salsa
    </p>
    <ArcadeButton href="/menu">VER MENÚ</ArcadeButton>
  </div>
</section>
```

Menú Item Card
```tsx
<article className="group relative bg-white/90 dark:bg-[#0F0F1E]/95 
                      backdrop-blur-md border border-terracota/30 
                      dark:border-neon-cian/40 rounded-xl p-6 
                      transition-all duration-300 hover:shadow-xl 
                      dark:hover:shadow-neon-cian/20">
  <div className="flex justify-between items-start mb-2">
    <h3 className="font-playfair text-xl text-cafe dark:text-white">
      {dish.name}
    </h3>
    <span className="font-playfair text-xl text-terracota 
                   dark:text-neon-cian font-bold">
      ${dish.price}
    </span>
  </div>
  
  <p className="font-montserrat text-sm text-gray-600 dark:text-gray-300 mb-3">
    {dish.description}
  </p>
  
  <div className="flex items-center justify-between">
    <span className="text-xs bg-verde-selva text-white 
                     dark:bg-neon-cian dark:text-[#0F0F1E] 
                     px-2 py-1 rounded-full">
      ⚡ Bitcoin Accepted
    </span>
    <button className="font-montserrat text-terracota 
                       dark:text-neon-cian hover:underline text-sm">
      Agregar
    </button>
  </div>
</article>
```

Última actualización: 2026-05-14
Creado para: La Bianca Tropical × Acepta Bitcoin México (SaaS)
Versión: 1.0 — "Tropical Luxe"