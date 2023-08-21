export const settingConfiguration = () => ({
  database: {
    fauna: {
      secret: process.env.FAUNA_DB_SECRET,
    },
  },
})
