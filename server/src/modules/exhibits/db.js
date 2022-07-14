import { prisma } from '../../services/Prisma.js'

const { exhibit, image } = prisma

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

      // OR: [
      //   {
      //     material: {
      //       materialName: {
      //         contains: ''
      //       }
      //     }
      //   },
      //   {
      //     material: {
      //       materialName: {
      //         equals: material
      //       }
      //     }
      //   }
      // ],

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
        updater: true
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
  const { materialName, categoryName = "cat", statusName = "stat", userId, newContributors, existingContributorsIds,  ...exhibitInfo } = sentData
  console.log('-------------------------------');

  console.log("contributors", conValues);

  console.log('------------------------------------');



  try {
    const getnewImages = await image.findMany({
      where: {
        itemId: null,
      },
    })
    const imgIds = getnewImages.map((img) => ({ id: img.id }))
    console.log('------------------------')
    console.log(imgIds)
    console.log('------------------------')

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
          create: {
            contributor: {
              connect: existingContributorsIds.map(id => ({id})),
              create: newContributors
            }
          }
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

        creator: {
          connect: {
            id: userId,
          },
          
        },

        images: {
          connect: imgIds,
        },
        // contributors: {
        //   create: {
        //     contributor: {
        //       create: {
        //         contributorName: 'hagop',
        //         contributorSurname: 'berberian',
        //         contributorPhoneNumber: '094113934',
        //       },
        //     },
        //   },
        // },
        ...exhibitInfo,
      },
    })





    conIds.map(async (conId) => {

      if (foundContributor) {
        const coe = await prisma.contributorsOfExhibits.create({
          data: {
            contributorId: foundContributor.id,
            exhibitId: newExhibit.id
          }
        })
        console.log('middleTable', coe);
      }

      else {
        const newContributor = await prisma.contributor.create({
          data: {
            contributorName,
            contributorSurname,
            contributorPhoneNumber
          }
        })
        console.log("newContributor", newContributor);
        const coe = await prisma.contributorsOfExhibits.create({
          data: {
            contributorId: newContributor.id,
            exhibitId: newExhibit.id
          }
        })
        console.log('middletable', coe);
      }
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
  console.log(id)
  try {
    const getnewImages = await image.findMany({
      where: {
        itemId: null,
      },
    })
    const imgIds = getnewImages.map((img) => ({ id: img.id }))
    const { materialName, contributors, checkedContributors, ...exhibitInfo } = data

    const updatedExhibit = await exhibit.update({
      where: {
        id,
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
      },
    })

    return {
      data: updatedExhibit,
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
