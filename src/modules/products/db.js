import { prisma } from '../../services/Prisma';

const { product } = prisma;

export const getProducts = async () => {
    await product.findMany({})
}