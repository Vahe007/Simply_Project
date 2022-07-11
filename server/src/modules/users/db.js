import {prisma} from '../../services/Prisma.js'
import bcrypt from 'bcryptjs'
import {exclude, generateAccessToken} from "../../helpers/common.js"
import {ERROR_MESSAGES} from "../../helpers/constants.js";

const {user} = prisma


export const getAllUsersDB = async (query) => {
    const {page, limit , sortBy, contains = ""} = query;
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
  
    try {
      const countAfterSearch = await user.count({
        where: {
          OR: 
            ['firstName', 'lastName', 'email', 'phoneNumber'].map(el => {
              return {
                [el]: {
                  contains: contains
                }
              }
            })
        }
      })

      const usersCount = await user.count()
  
  
      const usersPerPage = await user.findMany({
        where: {
          OR: 
            ['firstName', 'lastName', 'email', 'phoneNumber'].map(el => {
              return {
                [el]: {
                  contains: contains
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
        data: {
          usersPerPage,
          count: usersCount,
          countAfterSearch
        },
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

  export const getActiveUsersDB = async (query) => {
    const {page, limit , sortBy, contains = ""} = query;
    console.log(query);
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
  
    try {
      const countAfterSearch = await user.count({
        where: {
          OR: 
            ['firstName', 'lastName', 'email', 'phoneNumber'].map(el => {
              return {
                [el]: {
                  contains: contains
                }
              }
            })
        }
      })

      const usersCount = await user.count({
        where: {
          isActive: true
        }
      })
  
  
      const usersPerPage = await user.findMany({
        where: {
          isActive: true,
          OR: 
            ['firstName', 'lastName', 'email', 'phoneNumber'].map(el => {
              return {
                [el]: {
                  contains: contains
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
        data: {
          usersPerPage,
          count: usersCount,
          countAfterSearch
        },
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
    try {
      const userData = await user.findUnique({
        where: {
          id,
        },
        include: {
          exhibitsCreated: true,
          exhibitsUpdated: true
        }
      })
      
      const {isActive} = userData;

      if(userData && isActive) {
        const userPassExcluded = exclude(userData, ['password']);
        const {id, role} = userPassExcluded;
        const token = generateAccessToken(id, role);
        return {
          data: {...userPassExcluded, token},
          error: null,
        }
      } else {
        return {
            data: "no such User",
            error: null,
          }
      } 
     
    } catch (error) {
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
                id
            },
            data
        });

        const {password, ...userInfo} = newData;

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

export const deleteUserDB = async(id) => {
    try {
        await user.update({
        where: {
            id
        },
        data: {
            isActive: false
        }
        });
        return {
            message: "user deleted",
            error: null
        }  
    } catch(error) {
        return {
            data: null,
            error
        }
    }
}

export const createUserDB = async (userData) => {
    const {password, ...restData} = userData
    
    try {
        const hashedPassword = bcrypt.hashSync(password, 7);

        const newUser = await user.create({
            data: {
                password: hashedPassword,
                ...restData
            },
            include: {
              exhibitsCreated: true,
              exhibitsUpdated: true
            }
        })

        const {password: newUserPass, ...userInfo} = newUser

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
            error: {message: "No user found with such email"}
          }
        }
     
        const validPassword = bcrypt.compareSync(password, candidate.password)

        if (!validPassword) {
            return {
                data: null,
                error: {message: 'Password incorrect'},
            }
        }
        const {password: createdUserPass, ...userInfo} = candidate
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
