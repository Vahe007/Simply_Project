import { prisma } from '../../services/Prisma.js'

const { exhibit, image, contributorsOfExhibits } = prisma

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
    ID: {
      id: 'desc',
    },
    'Name(A-Z)': {
      exhibitName: 'asc',
    },
    'Name(Z-A)': {
      exhibitName: 'desc',
    },
    'FundNumber(A-Z)': {
      fundNumber: 'asc',
    },
    'FundNumber(Z-A)': {
      fundNumber: 'desc',
    },
    'acquisitionPeriod(new to old)': {
      acquisitionPeriod: 'asc',
    },
    'acquisitionPeriod(old to new)': {
      acquisitionPeriod: 'desc',
    },
  }
  const { page = 1, limit = 10, sortBy, contains = '', material = '', category = '' } = query

  const count = await exhibit.count()

  const filteredExhibits = {
    where: {
      material: {
        materialName: {
          contains: material,
        },
      },

      category: {
        categoryName: {
          contains: category,
        },
      },
      OR: ['exhibitName', 'description'].map((field) => {
        return {
          [field]: {
            contains,
          },
        }
      }),
    },
  }
  const filteredCount = await exhibit.count(filteredExhibits)

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
        category: true,
        creator: true,
        updater: true,
      },
    })
    return {
      data: {
        count,
        filteredCount,
        exhibitsPerPage,
      },
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const createExhibitDB = async (sentData) => {
  const {
    materialName,
    categoryName = 'cat',
    statusName = 'stat',
    userId,
    newContributors,
    existingContributorsIds,
    imageIds,
    ...exhibitInfo
  } = sentData

  try {
    const imgIds = imageIds.map((id) => ({ id }))

    const contributorsIds = existingContributorsIds.map((id) => ({ id }))

    const newExhibit = await exhibit.create({
      data: {
        material: {
          connectOrCreate: {
            where: {
              materialName,
            },
            create: {
              materialName,
            },
          },
        },

        status: {
          connectOrCreate: {
            where: {
              statusName,
            },
            create: {
              statusName,
            },
          },
        },

        category: {
          connectOrCreate: {
            where: {
              categoryName,
            },
            create: {
              categoryName,
            },
          },
        },

        contributors: {
          create: newContributors.map((newContributor) => ({
            contributor: {
              create: newContributor,
            },
          })),
        },
        creator: {
          connect: {
            id: userId,
          },
        },
        images: {
          connect: imgIds,
        },
        ...exhibitInfo,
      },
    })
    console.log(newExhibit.id)
    if (existingContributorsIds.length) {
      const z = await contributorsOfExhibits.createMany({
        data: existingContributorsIds.map((id) => ({
          contributorId: id,
          exhibitId: newExhibit.id,
        })),
      })
    }

    return {
      data: newExhibit,
      error: null,
    }
  } catch (error) {
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

export const updateExhibitDB = async (data, exhibitId) => {
  const {
    materialName,
    contributors,
    newContributors,
    imageIds,
    existingContributorsIds, //[2,3,4]
    ...exhibitInfo
  } = data

  const imgIds = imageIds.map((id) => ({ id }))
  const contributorsOfspecificExhibit = await contributorsOfExhibits.findMany({
    where: {
      exhibitId,
    },
  })

  console.log('----------------------------------------')
  console.log(existingContributorsIds)
  console.log('-----------------------------------------------')

  const arrayOfObjectWIthIdContId = contributorsOfspecificExhibit.map(({ id, contributorId }) => ({
    id,
    contributorId,
  })) //[2,3,4,5]
  const deletedRowOfRelationTable = arrayOfObjectWIthIdContId.filter(
    (idOfContributors) => !existingContributorsIds.includes(idOfContributors.contributorId)
  )

  const idsToDelete = deletedRowOfRelationTable.map((obj) => obj.id)
  console.log(idsToDelete)
  try {
    if (idsToDelete.length) {
      await contributorsOfExhibits.deleteMany({
        where: {
          id: {
            in: idsToDelete,
          },
        },
      })
    }
    console.log('hi')
  } catch (error) {
    console.log(error)
    return {
      data: null,
      error,
    }
  }

  try {
    const updatedExhibit = await exhibit.update({
      where: {
        id: exhibitId,
      },
      data: {
        material: {
          connectOrCreate: {
            where: {
              materialName,
            },
            create: {
              materialName,
            },
          },
        },
        ...exhibitInfo,
        images: {
          connect: imgIds,
        },
        contributors: {
          create: newContributors.map((newContributor) => ({
            contributor: {
              create: newContributor,
            },
          })),
        },
      },
    })
    // if (existingContributorsIds.length) {
    //   const z = await contributorsOfExhibits.createMany({
    //     data: existingContributorsIds.map((id) => ({
    //       contributorId: id,
    //       exhibitId,
    //     })),
    //   })
    // }
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
