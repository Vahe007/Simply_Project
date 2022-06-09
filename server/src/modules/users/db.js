import { prisma } from '../../services/Prisma.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const { user } = prisma

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

export const getAllUsersDB = async () => {
  try {
    const users = await user.findMany();
    return {
      data: users,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}



export const getUserByIdDB = async (id) => {
  try {
    const user = await user.findUnique({
      where: {
        id,
      },
    })
    return {
      data: user,
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
  try {
    const newUser = await user.create({
      data: sendedData,
    })
    return {
      data: newUser,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const updateUserDB = async(data, id) => {
  try {
    const newData = await user.update({
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

export const deleteUserDB = async(id) => {
  try {
    await user.delete({
      where: {
        id
      }
    });
    return {
      data: "user successfully deleted",
      error: null
    }  
  } catch(error) {
    return {
      data: null,
      error
    }
  }
}

export const registrationDB = async (username, password) =>{
  try {
    const candidate = await user.findUnique({
      where: {
        username,
      },
    })
    if (candidate) {
      return {
        data: null,
        error: { message: 'User with such username is already registered' },
      }
    }
    const hashedPassword = bcrypt.hashSync(password, 7)
    const userRole = await role.findUnique({
      where: {
        name: 'USER',
      },
    })
    const createdUser = await user.create({
      data: {
        username,
        roleId: [userRole.id],
        password: hashedPassword
      },
    })
    const {password: createdUserPass, role, ...userInfo} = createdUser
    const token = generateAccessToken(userInfo.id, role)
    return {
      data: { ...userInfo, token },
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const login = async (username, password) =>{
  try{
    const user = await User.findOne(username)
    if (!user) {
      return res.status(400).json({message: `User ${username} not found`})
    }
    const valaidPassword = bcrypt.compareSync(password, user.password)
    if (!valaidPassword) {
      return res.status(400).json({message: 'Password incorrect'})
    }
    const {password: createdUserPass, roles, ...userInfo} = user._doc
    const token = generateAccessToken(userInfo._id, roles)
    return {
      data: { ...userInfo, token },
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
