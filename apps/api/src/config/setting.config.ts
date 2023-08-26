export const settingConfiguration = () => ({
  database: {
    fauna: {
      secret: process.env.FAUNA_DB_SECRET,
    },
    redis: {
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN,
    },
  },
  email: {
    resend: {
      apiKey: process.env.RESEND_API_KEY!,
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
