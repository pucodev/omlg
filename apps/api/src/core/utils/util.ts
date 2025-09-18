import type { FastifyReply } from 'fastify'

import { ApiError } from './errors.ts'
import { applog } from './logger.ts'

/**
 * Sends an error response using FastifyReply.
 *
 * @param reply The FastifyReply object to send the response.
 * @param error The error object to be sent in the response. If it's an ApiError, the statusCode and payload are used. Otherwise, a generic 500 error is sent.
 */
export function replyError(reply: FastifyReply, error: unknown) {
  applog.errorApi(error)
  if (error instanceof ApiError) {
    reply
      .status(error.statusCode)
      .send({ success: false, error: error.getPayload() })
  } else {
    reply.status(500).send({ success: false, error: getErrorMessage(error) })
  }
}

/**
 * Gets the error message from an unknown error.
 *
 * @param err - The error to get the message from.
 * @returns The error message as a string.
 */
export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return JSON.stringify(err)
}
