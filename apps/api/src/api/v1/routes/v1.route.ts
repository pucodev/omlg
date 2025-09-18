import type { FastifyInstance } from 'fastify'

import logger from '#utils/logger'

/**
 * V1 Api routes
 *
 * @param fastify - fastify instance
 */
export default async function v1Routes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: Record<string, string> }>(
    '/omlg',
    async (request, reply) => {
      logger.debug('HELLO WORLD')
      return { hello: 'world' }
      // const query = request.query
      // try {
      //   const userService = new UserService(fastify.pg)
      //   const response = await userService.query(query)
      //   reply.send(response)
      // } catch (error) {
      //   reply.send(error)
      // }
    },
  )
}
