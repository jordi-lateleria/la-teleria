export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  category: string
  categorySlug: string
  images: string[]
  variants?: {
    name: string
    options: string[]
  }[]
}

export interface Category {
  name: string
  slug: string
  description: string
}

export const categories: Category[] = [
  {
    name: 'Accesorio',
    slug: 'accesorio',
    description: 'Accesorios textiles para el hogar'
  },
  {
    name: 'BathCloth',
    slug: 'bathcloth',
    description: 'Textiles para el baño'
  },
  {
    name: 'Courtain',
    slug: 'courtain',
    description: 'Cortinas y visillos'
  },
  {
    name: 'Living',
    slug: 'living',
    description: 'Textiles para el salón'
  },
  {
    name: 'Lounge',
    slug: 'lounge',
    description: 'Textiles para descanso'
  },
  {
    name: 'TableCloth',
    slug: 'tablecloth',
    description: 'Mantelerías y textiles de mesa'
  }
]

export const products: Product[] = [
  // Accesorio
  {
    id: 'acc-001',
    slug: 'cojin-lino-natural',
    name: 'Cojín de Lino Natural',
    description: 'Elegante cojín fabricado con lino 100% natural. Perfecto para añadir un toque de sofisticación a cualquier espacio. Relleno de fibra hipoalergénica incluido.',
    price: 45.00,
    category: 'Accesorio',
    categorySlug: 'accesorio',
    images: [],
    variants: [
      { name: 'Color', options: ['Natural', 'Blanco', 'Gris'] },
      { name: 'Tamaño', options: ['40x40 cm', '50x50 cm', '60x60 cm'] }
    ]
  },
  {
    id: 'acc-002',
    slug: 'funda-nordica-algodon',
    name: 'Funda Nórdica de Algodón',
    description: 'Funda nórdica de algodón orgánico certificado GOTS. Suave al tacto y respetuosa con el medio ambiente.',
    price: 89.00,
    category: 'Accesorio',
    categorySlug: 'accesorio',
    images: [],
    variants: [
      { name: 'Color', options: ['Blanco', 'Crema', 'Gris Perla'] },
      { name: 'Tamaño', options: ['Individual', 'Doble', 'King'] }
    ]
  },
  {
    id: 'acc-003',
    slug: 'set-servilletas-lino',
    name: 'Set de Servilletas de Lino',
    description: 'Set de 6 servilletas de lino lavado. Elegantes y duraderas, perfectas para ocasiones especiales.',
    price: 35.00,
    category: 'Accesorio',
    categorySlug: 'accesorio',
    images: []
  },

  // BathCloth
  {
    id: 'bath-001',
    slug: 'toalla-algodon-premium',
    name: 'Toalla de Algodón Premium',
    description: 'Toalla de algodón egipcio 600gsm. Extremadamente absorbente y suave. Lavable a alta temperatura.',
    price: 32.00,
    category: 'BathCloth',
    categorySlug: 'bathcloth',
    images: [],
    variants: [
      { name: 'Color', options: ['Blanco', 'Arena', 'Gris'] },
      { name: 'Tamaño', options: ['Tocador', 'Lavabo', 'Ducha', 'Baño'] }
    ]
  },
  {
    id: 'bath-002',
    slug: 'albornoz-waffle',
    name: 'Albornoz Tejido Waffle',
    description: 'Albornoz ligero con tejido tipo waffle. Secado rápido y muy cómodo. Ideal para climas cálidos.',
    price: 75.00,
    category: 'BathCloth',
    categorySlug: 'bathcloth',
    images: [],
    variants: [
      { name: 'Color', options: ['Blanco', 'Natural'] },
      { name: 'Talla', options: ['S', 'M', 'L', 'XL'] }
    ]
  },
  {
    id: 'bath-003',
    slug: 'alfombra-bano-organica',
    name: 'Alfombra de Baño Orgánica',
    description: 'Alfombra de baño fabricada con algodón orgánico. Base antideslizante y lavable a máquina.',
    price: 28.00,
    category: 'BathCloth',
    categorySlug: 'bathcloth',
    images: [],
    variants: [
      { name: 'Color', options: ['Blanco', 'Crema', 'Gris'] }
    ]
  },

  // Courtain
  {
    id: 'court-001',
    slug: 'cortina-lino-lavado',
    name: 'Cortina de Lino Lavado',
    description: 'Cortina confeccionada con lino lavado de aspecto natural. Filtrado de luz suave, perfecta para crear ambientes acogedores.',
    price: 89.00,
    category: 'Courtain',
    categorySlug: 'courtain',
    images: [],
    variants: [
      { name: 'Color', options: ['Natural', 'Blanco Roto', 'Gris Piedra'] },
      { name: 'Ancho', options: ['140 cm', '280 cm'] },
      { name: 'Alto', options: ['240 cm', '260 cm', '280 cm'] }
    ]
  },
  {
    id: 'court-002',
    slug: 'visillo-bordado',
    name: 'Visillo Bordado Artesanal',
    description: 'Visillo con delicado bordado artesanal. Permite el paso de la luz creando patrones únicos en el interior.',
    price: 65.00,
    category: 'Courtain',
    categorySlug: 'courtain',
    images: [],
    variants: [
      { name: 'Color', options: ['Blanco', 'Marfil'] },
      { name: 'Ancho', options: ['140 cm', '280 cm'] }
    ]
  },
  {
    id: 'court-003',
    slug: 'cortina-opaca-terciopelo',
    name: 'Cortina Opaca de Terciopelo',
    description: 'Cortina de terciopelo con forro opaco. Bloqueo total de luz, ideal para dormitorios y salas de cine.',
    price: 120.00,
    category: 'Courtain',
    categorySlug: 'courtain',
    images: [],
    variants: [
      { name: 'Color', options: ['Gris Oscuro', 'Azul Marino', 'Verde Bosque'] },
      { name: 'Alto', options: ['240 cm', '260 cm', '280 cm'] }
    ]
  },

  // Living
  {
    id: 'liv-001',
    slug: 'manta-lana-merino',
    name: 'Manta de Lana Merino',
    description: 'Manta tejida con lana merino de primera calidad. Cálida, ligera y perfecta para el sofá.',
    price: 145.00,
    category: 'Living',
    categorySlug: 'living',
    images: [],
    variants: [
      { name: 'Color', options: ['Natural', 'Gris', 'Mostaza', 'Terracota'] }
    ]
  },
  {
    id: 'liv-002',
    slug: 'plaid-algodon-waffle',
    name: 'Plaid de Algodón Waffle',
    description: 'Plaid ligero con tejido waffle. Versátil para todas las estaciones, ideal como complemento decorativo.',
    price: 68.00,
    category: 'Living',
    categorySlug: 'living',
    images: [],
    variants: [
      { name: 'Color', options: ['Blanco', 'Arena', 'Salvia'] }
    ]
  },
  {
    id: 'liv-003',
    slug: 'funda-sofa-lino',
    name: 'Funda de Sofá de Lino',
    description: 'Funda de sofá confeccionada en lino lavado. Protege y renueva tu sofá con un toque natural.',
    price: 195.00,
    category: 'Living',
    categorySlug: 'living',
    images: [],
    variants: [
      { name: 'Color', options: ['Natural', 'Blanco Roto', 'Gris Claro'] },
      { name: 'Tamaño', options: ['2 plazas', '3 plazas', 'Chaise Longue'] }
    ]
  },

  // Lounge
  {
    id: 'lng-001',
    slug: 'sabana-percal-400',
    name: 'Sábana de Percal 400 Hilos',
    description: 'Juego de sábanas de percal de 400 hilos. Algodón de fibra larga para máxima suavidad y durabilidad.',
    price: 125.00,
    category: 'Lounge',
    categorySlug: 'lounge',
    images: [],
    variants: [
      { name: 'Color', options: ['Blanco', 'Gris Perla', 'Rosa Palo'] },
      { name: 'Tamaño', options: ['90 cm', '135 cm', '150 cm', '180 cm'] }
    ]
  },
  {
    id: 'lng-002',
    slug: 'edredon-plumas',
    name: 'Edredón de Plumas',
    description: 'Edredón relleno de plumas de oca. Ligero, cálido y con excelente regulación térmica.',
    price: 245.00,
    category: 'Lounge',
    categorySlug: 'lounge',
    images: [],
    variants: [
      { name: 'Calidez', options: ['Ligero', 'Medio', 'Cálido'] },
      { name: 'Tamaño', options: ['Individual', 'Doble', 'King'] }
    ]
  },
  {
    id: 'lng-003',
    slug: 'almohada-latex-natural',
    name: 'Almohada de Látex Natural',
    description: 'Almohada ergonómica de látex 100% natural. Transpirable y con soporte cervical óptimo.',
    price: 85.00,
    category: 'Lounge',
    categorySlug: 'lounge',
    images: [],
    variants: [
      { name: 'Firmeza', options: ['Suave', 'Media', 'Firme'] }
    ]
  },

  // TableCloth
  {
    id: 'tbl-001',
    slug: 'mantel-lino-bordado',
    name: 'Mantel de Lino Bordado',
    description: 'Elegante mantel de lino con bordado artesanal. Perfecto para ocasiones especiales y cenas elegantes.',
    price: 95.00,
    category: 'TableCloth',
    categorySlug: 'tablecloth',
    images: [],
    variants: [
      { name: 'Color', options: ['Blanco', 'Natural', 'Gris'] },
      { name: 'Tamaño', options: ['150x150 cm', '150x200 cm', '150x250 cm'] }
    ]
  },
  {
    id: 'tbl-002',
    slug: 'camino-mesa-yute',
    name: 'Camino de Mesa de Yute',
    description: 'Camino de mesa rústico elaborado con yute natural. Añade textura y calidez a cualquier mesa.',
    price: 38.00,
    category: 'TableCloth',
    categorySlug: 'tablecloth',
    images: [],
    variants: [
      { name: 'Tamaño', options: ['35x120 cm', '35x180 cm', '35x240 cm'] }
    ]
  },
  {
    id: 'tbl-003',
    slug: 'set-individuales-algodon',
    name: 'Set de Individuales de Algodón',
    description: 'Set de 4 individuales tejidos en algodón orgánico. Lavables y resistentes para uso diario.',
    price: 42.00,
    category: 'TableCloth',
    categorySlug: 'tablecloth',
    images: [],
    variants: [
      { name: 'Color', options: ['Natural', 'Blanco', 'Gris', 'Terracota'] }
    ]
  }
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
