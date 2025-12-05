import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: 'Accesorio', slug: 'accesorio' },
  { name: 'BathCloth', slug: 'bathcloth' },
  { name: 'Courtain', slug: 'courtain' },
  { name: 'Living', slug: 'living' },
  { name: 'Lounge', slug: 'lounge' },
  { name: 'TableCloth', slug: 'tablecloth' },
]

async function main() {
  console.log('Seeding categories...')

  for (const category of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { slug: category.slug }
    })

    if (!existingCategory) {
      await prisma.category.create({
        data: category
      })
      console.log(`Created category: ${category.name}`)
    } else {
      console.log(`Category already exists: ${category.name}`)
    }
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
