import { prisma } from '../../services/Prisma.js'

const { contributor } = prisma

const searchHandler = (contains) => {
  return contains
    ?.split(' ')
    .map((search) => {
      return ['contributorName', 'contributorSurname'].map((el) => {
        return {
          [el]: {
            contains: search,
          },
        }
      })
    })
    .flat()
}

export const getAllContributorsDB = async ({ page, limit, contains = '' }) => {
  try {
    const contributors = await contributor.findMany({
      where: {
        OR: searchHandler(contains),
      },
      include: {
        exhibits: true,
      },
      skip: (+page - 1) * +limit || undefined,
      take: +limit || undefined,
    })
    return {
      data: contributors,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const getContributorByIdDB = async (id) => {
  try {
    const foundContributor = await contributor.findUnique({
      where: {
        id,
      },
      include: {
        exhibits: true,
      },
    })
    return {
      data: foundContributor,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const createContributorsDB = async (sentData) => {
  try {
    const contributors = await contributor.createMany({
      data: sentData,
    })
    return {
      data: contributors,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const updateContributorDB = async (id, newData) => {
  try {
    const updatedContributor = await contributor.update({
      where: {
        id,
      },
      data: newData,
    })
    return {
      data: updatedContributor,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const deleteContributorDB = async (id) => {
  try {
    const deletedContributors = await contributor.delete({
      where: {
        id,
      },
    })
    return {
      data: deletedContributors,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
