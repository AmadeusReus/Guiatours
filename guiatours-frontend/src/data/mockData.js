// mockData.js
export const mockDestinos = {
  cartagena: {
    nombre: "Cartagena",
    imagenPrincipal: "/images/cartagena.jpg",
    descripcion: "Cartagena es una ciudad portuaria en la costa del Caribe, famosa por su arquitectura colonial, vibrante vida nocturna, y sus playas hermosas. Es un lugar lleno de historia y cultura.",
    atracciones: [
      { nombre: "Ciudad Amurallada", imagen: "/images/cartagena_attraction1.jpg", descripcion: "Explora la increíble Ciudad Amurallada, patrimonio histórico con calles empedradas y hermosos balcones coloniales." },
      { nombre: "Castillo San Felipe", imagen: "/images/cartagena_attraction2.jpg", descripcion: "Visita el imponente Castillo San Felipe, una fortaleza construida por los españoles para proteger la ciudad." }
    ],
    guias: [
      {
        id: 1,
        nombre: "Carlos Gómez",
        foto: "/images/guia_carlos.jpg",
        experiencia: "5 años de experiencia",
        idiomas: "Español, Inglés",
        especialidad: "Historia y Arquitectura Colonial",
        sobreMi: "Soy apasionado por mostrar la riqueza cultural de nuestra tierra. Mis tours se centran en historia y experiencias auténticas.",
        tarifa: "$20 por hora",
        tour: "Recorrido histórico por el Centro Amurallado y el Castillo de San Felipe.",
        calificacion: 4.7,
        resenas: [
          { usuario: "Ana Pérez", texto: "Carlos fue increíble, aprendimos muchísimo. ¡Recomendado!", calificacion: 5, fecha: "2023-11-01" },
          { usuario: "Luis Torres", texto: "Muy atento y profesional.", calificacion: 4, fecha: "2023-10-15" }
        ],
        contacto: {
          email: "carlos.gomez@example.com",
          whatsapp: "+57 300 123 4567"
        }
      }
    ]
  },
  medellin: {
    nombre: "Medellín",
    imagenPrincipal: "/images/medellin.jpg",
    descripcion: "Medellín, la ciudad de la eterna primavera, es conocida por su clima cálido, gente amigable, y transformación urbana ejemplar.",
    atracciones: [
      { nombre: "Parque Arví", imagen: "/images/medellin_attraction1.jpg", descripcion: "Disfruta del contacto con la naturaleza en el Parque Arví, un parque ecológico ideal para caminatas y picnic." },
      { nombre: "Comuna 13", imagen: "/images/medellin_attraction2.jpg", descripcion: "Descubre la historia de la transformación social en la Comuna 13, llena de arte urbano y grafitis." }
    ],
    guias: [
      {
        id: 1,
        nombre: "Juan Pérez",
        foto: "/images/guia_juan.jpg",
        experiencia: "4 años de experiencia",
        idiomas: "Español, Inglés",
        especialidad: "Tours ecológicos y urbanos",
        sobreMi: "Disfruto llevando a los turistas a una conexión con la naturaleza y la historia urbana de Medellín.",
        tarifa: "$22 por hora",
        tour: "Excursión al Parque Arví y caminata histórica en la Comuna 13.",
        calificacion: 4.8,
        resenas: [
          { usuario: "Santiago Morales", texto: "Juan hizo de este tour una experiencia inolvidable.", calificacion: 5, fecha: "2023-09-15" }
        ],
        contacto: {
          email: "juan.perez@example.com",
          whatsapp: "+57 310 987 6543"
        }
      }
    ]
  },
  bogota: {
    nombre: "Bogotá",
    imagenPrincipal: "/images/bogota.jpg",
    descripcion: "Bogotá, la capital de Colombia, es una metrópolis vibrante llena de cultura, arte y gastronomía. Ofrece una experiencia única con museos, parques y una rica historia colonial.",
    atracciones: [
      { nombre: "Museo del Oro", imagen: "/images/bogota_attraction1.jpg", descripcion: "El Museo del Oro alberga la mayor colección de oro prehispánico del mundo." },
      { nombre: "Monserrate", imagen: "/images/bogota_attraction2.jpg", descripcion: "Visita el cerro de Monserrate y disfruta de una vista panorámica espectacular de toda la ciudad." }
    ],
    guias: [
      {
        id: 1,
        nombre: "María Rodríguez",
        foto: "/images/guia_maria.jpg",
        experiencia: "7 años de experiencia",
        idiomas: "Español, Inglés",
        especialidad: "Historia y Museos",
        sobreMi: "Guía certificada en turismo cultural. Disfruto compartir la historia de nuestra capital.",
        tarifa: "$30 por hora",
        tour: "Visita guiada al Museo del Oro y Monserrate.",
        calificacion: 5.0,
        resenas: [
          { usuario: "Fernando Díaz", texto: "María es fantástica. Muy profesional y conocedora.", calificacion: 5, fecha: "2023-11-10" }
        ],
        contacto: {
          email: "maria.rodriguez@example.com",
          whatsapp: "+57 320 654 1234"
        }
      }
    ]
  },
  cali: {
    nombre: "Cali",
    imagenPrincipal: "/images/cali.jpg",
    descripcion: "Cali es la capital mundial de la salsa, famosa por su música, baile y su cultura viva. También es conocida por su clima cálido y hospitalidad.",
    atracciones: [
      { nombre: "Cristo Rey", imagen: "/images/cali_attraction1.jpg", descripcion: "El Cristo Rey es una de las atracciones más icónicas de Cali, ofreciendo una vista magnífica de la ciudad." },
      { nombre: "Zoológico de Cali", imagen: "/images/cali_attraction2.jpg", descripcion: "Visita el Zoológico de Cali, uno de los más importantes de América Latina." }
    ],
    guias: [
      {
        id: 1,
        nombre: "Sofía Martínez",
        foto: "/images/guia_sofia.jpg",
        experiencia: "6 años de experiencia",
        idiomas: "Español, Portugués",
        especialidad: "Cultura Afrocolombiana y Naturaleza",
        sobreMi: "Me apasiona conectar a los turistas con la rica herencia cultural y la belleza natural de Cali.",
        tarifa: "$20 por hora",
        tour: "Recorrido cultural y ecológico por Cali.",
        calificacion: 4.7,
        resenas: [
          { usuario: "Alejandra Ruiz", texto: "¡Sofía fue increíble! Nos llevó a lugares únicos.", calificacion: 5, fecha: "2023-09-22" }
        ],
        contacto: {
          email: "sofia.martinez@example.com",
          whatsapp: "+57 315 777 8888"
        }
      }
    ]
  },
  "santa-marta": {
    nombre: "Santa Marta",
    imagenPrincipal: "/images/santamarta.jpg",
    descripcion: "Santa Marta, ubicada en la costa del Caribe, es un destino turístico popular gracias a sus hermosas playas y el Parque Nacional Natural Tayrona.",
    atracciones: [
      { nombre: "Parque Tayrona", imagen: "/images/santamarta_attraction1.jpg", descripcion: "El Parque Tayrona ofrece playas paradisíacas y senderos naturales que permiten observar la flora y fauna del Caribe." },
      { nombre: "Quinta de San Pedro Alejandrino", imagen: "/images/santamarta_attraction2.jpg", descripcion: "Visita la histórica Quinta de San Pedro Alejandrino, donde murió Simón Bolívar." }
    ],
    guias: [
      {
        id: 1,
        nombre: "Manuel Gutiérrez",
        foto: "/images/guia_manuel.jpg",
        experiencia: "8 años de experiencia",
        idiomas: "Español, Inglés",
        especialidad: "Playas y Naturaleza",
        sobreMi: "Amo mostrar la belleza natural y las playas paradisíacas de Santa Marta.",
        tarifa: "$25 por hora",
        tour: "Exploración en el Parque Tayrona y playas locales.",
        calificacion: 4.9,
        resenas: [
          { usuario: "Daniela Gómez", texto: "Manuel nos llevó a lugares mágicos. ¡Muy recomendado!", calificacion: 5, fecha: "2023-10-10" }
        ],
        contacto: {
          email: "manuel.gutierrez@example.com",
          whatsapp: "+57 300 555 9999"
        }
      }
    ]
  },
  "san-andres": {
    nombre: "San Andrés",
    imagenPrincipal: "/images/sanandres.jpg",
    descripcion: "San Andrés es una hermosa isla del Caribe conocida por su mar de siete colores, playas paradisíacas y cultura raizal única.",
    atracciones: [
      { nombre: "Hoyo Soplador", imagen: "/images/sanandres_attraction1.jpg", descripcion: "El Hoyo Soplador es un fenómeno natural donde el agua y el viento crean un espectáculo impresionante." },
      { nombre: "Johnny Cay", imagen: "/images/sanandres_attraction2.jpg", descripcion: "Johnny Cay es una pequeña isla cercana a San Andrés, famosa por sus playas y ambiente relajado." }
    ],
    guias: [
      {
        id: 1,
        nombre: "Ricardo Moreno",
        foto: "/images/guia_ricardo.jpg",
        experiencia: "7 años de experiencia",
        idiomas: "Español, Inglés",
        especialidad: "Tours marítimos y culturales",
        sobreMi: "Soy un guía local que disfruta mostrando los colores del mar y la rica cultura raizal.",
        tarifa: "$28 por hora",
        tour: "Tour marítimo a Johnny Cay y Hoyo Soplador.",
        calificacion: 4.8,
        resenas: [
          { usuario: "Isabela Fuentes", texto: "Ricardo fue muy profesional. Lo pasamos genial.", calificacion: 5, fecha: "2023-11-15" }
        ],
        contacto: {
          email: "ricardo.moreno@example.com",
          whatsapp: "+57 317 654 2222"
        }
      }
    ]
  }
};

export default mockDestinos;
