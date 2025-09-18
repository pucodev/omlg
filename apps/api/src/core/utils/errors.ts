export const API_ERROR_CODES = {
  OMLG_FIELDS_REQUIRED: {
    message: 'All fields are required for oh-my-logo',
    statusCode: 422,
  },
} as const

export type ApiErrorCode = keyof typeof API_ERROR_CODES

export class ApiError extends Error {
  statusCode: number
  code: ApiErrorCode | 'UNKNOWN_ERROR'

  constructor(code: ApiErrorCode, statusCode?: number) {
    const error = API_ERROR_CODES[code]
    const message = error ? error.message : 'Unknown error'
    super(message)

    this.code = code || 'UNKNOWN_ERROR'
    this.statusCode = statusCode || error.statusCode || 400

    Object.setPrototypeOf(this, ApiError.prototype)
  }

  getPayload() {
    return {
      code: this.code,
      message: this.message,
    }
  }
}
