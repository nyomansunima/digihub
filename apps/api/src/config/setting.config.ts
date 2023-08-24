export const settingConfiguration = () => ({
  database: {
    fauna: {
      secret: process.env.FAUNA_DB_SECRET,
    },
  },
  auth: {
    jwt: {
      secret: process.env.AUTH_JWT_SECERT,
      refreshExp: process.env.AUTH_JWT_REFRESH_EXP,
      accessExp: process.env.AUTH_JWT_ACCESS_EXP,
    },
  },
})
