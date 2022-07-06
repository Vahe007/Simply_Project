import {prisma} from '../../services/Prisma.js'

const {exhibit} = prisma
  
export const getAllExhibitsDB = async (query) => {
    const handleSortBy = {
        "name [A-Z]": {
          "firstName": "asc"
        },
    
        "name [Z-A]":{
          "firstName": "desc"
        },
    
        "created date (new to old)":{
          "createdAt": "desc"
        },
    
        "created date (old to new)": {
          "createdAt": "asc"
    
        },
    
        "updated date (new to old)": {
          "updatedAt": "desc"
    
        },
    
        "updated date (new to old)": {
          "updatedAt": "asc"
    
        },
      }
    const {page = 1, limit = 10, sortBy, contains="" } = query;

    const count = await exhibit.count();

    console.log(exhibit);

    try {
        const allExhibits = await exhibit.findMany({
            where: {
              exhibitName: {
                contains
              },
            },

            include: {
                contributors: true,
                images: true,
                recoveries: true,
                exhibitions: true,
                category: true
            },
      
            skip: (+page - 1) * +limit || undefined,
            take: +limit || undefined,
            orderBy: handleSortBy[sortBy] || undefined,
      
          })
        return {
            data: allExhibits,
            count,
            error: null,
        }
    } catch (error) {
        console.log(error);
        return {
            data: null,
            error,
        }
    }
}

export const createExhibitDB = async (sentData) => {
    const {id: userId, ...exhibitData} = sentData;

    sentData.creatorId = userId
    try {
        const newExhibit = await exhibit.create({
            data: exhibitData,
        })
        return {
            data: newExhibit,
            error: null,
        }
    } catch (error) {
        console.log(error);
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
        console.log(error);
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
       const data = await exhibit.findUnique()
       
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

