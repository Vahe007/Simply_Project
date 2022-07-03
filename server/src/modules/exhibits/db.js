import { prisma } from '../../services/Prisma.js'

const { exhibit } = prisma

const exhibitObj = {
  select: {
    id: true,
    fundNumber: true,
    exhibitName: true,
    placeOfOrigin: true,
    creationPeriod: true,
    acquisitionPeriod: true,
    width: true,
    height: true,
    length: true,
    diameter: true,
    weight: true,
    description: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    material: true,
    status: true,
    creator: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        isActive: true,
      },
    },
    updater: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        isActive: true,
      },
    },
    category: true,
  },
}
export const getAllExhibitsDB = async (query) => {
  const sortHandler = {
    "ID": {
      id: 'desc',
    },
    'Name(A-Z)': {
        exhibitName: 'asc'
    },
    'Name(Z-A)': {
        exhibitName: 'desc'
    },
    'FundNumber(A-Z)': {
      fundNumber: 'asc',
    },
    'FundNumber(Z-A)': {
        fundNumber: 'desc',
    },
    'acquisitionPeriod(new to old)': {
        acquisitionPeriod: 'asc'
    },
    'acquisitionPeriod(old to new)': {
        acquisitionPeriod: 'desc'
    }
  }
  const { page = 1, limit = 10, sortBy, contains = '', material = '', category = '' } = query
  const count = await exhibit.count({
    where: {
      isActive: true,
    },
  })

  const filteredExhibits = {
    where: {
      isActive: true,
      material: {
        materialName: {
          contains: material
        }
      },
      category: {
        categoryName: {
          contains: category
        }
      },
      OR: ['exhibitName', "description"].map((field) => {
        return {
          [field]: {
            contains
          }
        }
      })
    }
  }
  const filteredCount = await exhibit.count(filteredExhibits);

  try {
    const exhibitsPerPage = await exhibit.findMany({
      ...filteredExhibits,
      orderBy: sortHandler[sortBy] || undefined,
      skip: (+page - 1) * +limit || undefined,
      take: +limit || undefined,
      include: {
        contributors: true,
        material: true,
        images: true,
        category: true
      }
    })
    return {
      data: {
        count,
        filteredCount,
        exhibitsPerPage
      },
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      error,
    }
  }
}

export const createExhibitDB = async (userId, sentData) => {
  sentData.creatorId = userId
  try {
    const newExhibit = await exhibit.create({
      data: sentData,
    })
    return {
      data: newExhibit,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      error,
    }
  }
}

export const deleteExhibitDB = async (id) => {
  try {
    const deletedExhibit = await exhibit.delete({
      where: {
        id: +id,
      },
    })
    return {
      data: deletedExhibit,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const updateExhibitDB = async (data, id) => {
  try {
    const updatedExhibit = await exhibit.update({
      where: {
        id: +id,
      },
      data,
    })

    return {
      data: updatedExhibit,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const getExhibitByIdDB = async (id) => {
  try {
    const exhibitByIdObj = { ...exhibitObj, where: { id: +id } }
    const data = await exhibit.findUnique(exhibitByIdObj)

    return {
      data,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
