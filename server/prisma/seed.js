import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
        firstName: "Admin",
        lastName: "Aper",
        email: "admin@gmail.ru",
        password: "P@ssw0rd555",
        phoneNumber: "077121212",
        role: "ADMIN"
    },
  })
}


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })