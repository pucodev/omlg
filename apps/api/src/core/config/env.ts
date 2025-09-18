export const IS_DEBUG = process.env.DEBUG === 'true'
export const PORT: number = Number(process.env.PORT) || 3000
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info'
