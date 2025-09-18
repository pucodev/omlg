import Api from '#api/index.ts'
import { urls } from '#api/urls.ts'

import MainService, { type BaseResponse } from './main.service.ts'

export interface OmlgParams {
  filled?: boolean
  gradien_direction?: 'vertical' | 'horizontal' | 'diagonal'
  block_font?: string
  letter_spacing?: number
  reverse_gradient?: boolean
  text: string
  palette: string
}

export default class OmlgService extends MainService {
  public static async getSvg(data: OmlgParams) {
    const response = await Api.request<BaseResponse<string>>(
      'post',
      urls.OMLG.ROOT,
      data,
    )
    return response.data
  }
}
