import mongoose from 'mongoose'

const connectionToDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MongoStringConnection as string,
      {
        maxPoolSize: 10,
        minPoolSize: 2,
        serverSelectionTimeoutMS: 15000,
      }
    )
    if (connection.readyState === 1) {
      return Promise.resolve(true)
    }
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export const connectionClose = async () => {
  await mongoose.connection.close()
}

export default connectionToDatabase
