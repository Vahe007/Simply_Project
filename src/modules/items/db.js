import { prisma } from '../../services/Prisma.js'

const { item } = prisma

// export const getAllCompaniesDB = async () => {
//   try {
//     const companies = await company.findMany()
//     return {
//       data: companies,
//       error: null,
//     }
//   } catch (error) {
//     return {
//       data: null,
//       error: error,
//     }
//   }
// }

// export const getCompanyById = async () => {
//   // res.send('comp')
// }

export const getAllItemsDB = async () => {
  try {
    const allItems = await item.findMany();
    return {
      data: allItems,
      error: null
    }
  }
  catch(error) {
    return {
      data: null,
      error
    }
  }
}



