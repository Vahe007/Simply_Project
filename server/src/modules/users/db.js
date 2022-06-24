import {prisma} from '../../services/Prisma.js'
import bcrypt from 'bcryptjs'
import {generateAccessToken} from "../../helpers/common.js"
import {ERROR_MESSAGES} from "../../helpers/constants.js";

const {user} = prisma


export const getAllUsersDB = async (query) => {
    const {page, limit , sortBy, contains = ""} = query;
  
    const handleSortBy = {
      "name [A-Z]": {
        "name": "asc"
      },
  
      "name [Z-A]":{
        "name": "desc"
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
  
    try {
      const numberOfActiveUsers = await user.count({
        where: {
          isActive: true,
        },
      })
  
      const usersPerPage = await user.findMany({
        where: {
          isActive: true,
          OR: 
            ['name', 'surname', 'email', 'phoneNumber'].map(el => {
              return {
                [el]: {
                  contains
                }
              }
            })
        },
  
        skip: (+page - 1) * +limit || undefined,
        take: +limit || undefined,
        orderBy: handleSortBy[sortBy] || undefined,
  
        include: {
          exhibitsCreated: true,
          exhibitsUpdated: true,
        }
      });
  
      return {
        usersPerPage,
        count: numberOfActiveUsers,
        error: null
      }
    } catch(error) {
      console.log(error);
      return {
        data: null,
        error
      }
    }
  }

export const getUserByIdDB = async (id) => {
    console.log(id)
    try {
        const requestedUser = await user.findUnique({
            where: {
                id: +id,
            },
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
                phoneNumber: true,
                isActive: true,
                lastLogin: true,
                role: true,
                _count: {
                    select: {
                        exhibitsCreated: true,
                        exhibitsUpdated: true
                    },
                },
            }
        })
        return {
            data: requestedUser,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}

export const createUserDB = async (sendedData) => {
    const {email, password, ...restData} = sendedData
    try {
        const candidate = await user.findUnique({
            where: {
                email,
            },
        })
        if (candidate) {
            return {
                data: null,
                error: {message: ERROR_MESSAGES.SUCH_USER_EXISTS},
            }
        }
        const hashedPassword = bcrypt.hashSync(password, 7)
        const newUser = await user.create({
            data: {
                email,
                password: hashedPassword,
                ...restData
            }
        })
        const {password: createdUserPass, ...userInfo} = newUser

        const token = generateAccessToken(userInfo.id, userInfo.role)

        return {
            data: {...userInfo, token},
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

export const updateUserDB = async (data, id) => {
    try {
        if (data.password) {
            data.password = bcrypt.hashSync(data.password, 7)
        }

        const newData = await user.update({
            where: {
                id: +id
            },
            data
        });
        const {password, ...userInfo} = newData
        return {
            data: userInfo,
            error: null
        }

    } catch (error) {
        return {
            data: null,
            error
        }
    }
}

export const deleteUserDB = async (id) => {
    try {
        const deletedUser = await user.delete({
            where: {
                id
            }
        });
        return {
            data: deletedUser,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error
        }
    }
}


export const registrationDB = async (userData) => {
    const {email, password, ...restData} = userData
    try {
        const candidate = await user.findUnique({
            where: {
                email,
            },
        })
        if (candidate) {
            return {
                data: null,
                error: {message: ERROR_MESSAGES.SUCH_USER_EXISTS},
            }
        }
        const hashedPassword = bcrypt.hashSync(password, 7)
        const createdUser = await user.create({
            data: {
                email,
                password: hashedPassword,
                ...restData
            }
        })
        const {password: createdUserPass, ...userInfo} = createdUser

        const token = generateAccessToken(userInfo.id, userInfo.role)
        return {
            data: {...userInfo, token},
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}


export const loginDB = async (userData) => {
    const {email, password} = userData
    try {
        const candidate = await user.findUnique({
            where: {
                email,
            },
            include: {
                exhibitsCreated: true,
                exhibitsUpdated: true
            },
        })
        if (!candidate) {
            return {
                data: null,
                error: {message: ERROR_MESSAGES.NO_USER_FOUND},
            }
        }
        const validPassword = bcrypt.compareSync(password, candidate.password)
        if (!validPassword) {
            return {
                data: null,
                error: {message: 'Password incorrect'},
            }
        }
        const {password: createdUserPass, role, ...userInfo} = candidate
        const token = generateAccessToken(userInfo.id, role)
        return {
            data: {...userInfo, token},
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
