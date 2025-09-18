import type { FastifyInstance } from 'fastify'

import { generateSvg } from '#scripts/omlg'
import { ApiError } from '#utils/errors'
import { applog } from '#utils/logger'
import { replyError } from '#utils/util'

export interface OmlgParams {
  filled?: boolean
  gradien_direction?: 'vertical' | 'horizontal' | 'diagonal'
  block_font?: string
  letter_spacing?: number
  reverse_gradient?: boolean
  text: string
  palette: string
}

/**
 * V1 Api routes
 *
 * @param fastify - fastify instance
 */
export default async function v1Routes(fastify: FastifyInstance) {
  fastify.post<{ Body: OmlgParams }>('/omlg', async (request, reply) => {
    try {
      const body = request.body

      if (!body.text || !body.palette) {
        replyError(reply, new ApiError('OMLG_FIELDS_REQUIRED'))
        return
      }

      const response = await generateSvg(body.text, body.palette, {
        filled: body.filled,
        gradienDirection: body.gradien_direction,
        blockFont: body.block_font,
        letterSpacing: body.letter_spacing,
        reverseGradient: body.reverse_gradient,
      })

      applog.debug('-----------------------')
      applog.debug(response)
      applog.debug('-----------------------')
      reply.send({ success: true, data: response })
    } catch (error) {
      replyError(reply, error)
    }
  })
}
