import { prisma } from "../../services/Prisma.js";

const { material } = prisma;

export const getAllMaterialsDB = async () => {
    try {
        const allMaterials = await material.findMany()
        return {
            data: allMaterials,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}

export const createMaterialDB = async (sentData) => {
    try {
      await material.create({
        data: sentData,
      })
      return {
        data: 'material created',
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
}

export const deleteMaterialDB = async (id) => {
    try {
      const deletedMaterial = await material.delete({
        where: {
          id: +id,
        },
      })
      return {
        data: deletedMaterial,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  export const updateMaterialDB = async(data, id) => {
    try {
      const newData = await material.update({
        where: {
          id
        },
        data
      });
  
      return {
        data: newData,
        error: null
      }
  
    } catch(error) {
      return {
        data: null,
        error
      }
    }
}

export const getMaterialByIdDB = async (id) => {
    try {
      const material = await material.findUnique({
        where: {
          id,
        },
      })
      return {
        data: material,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
}