import { Request, Response } from 'express'
import { Controller } from '../protocols'

export function AdaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const ctrlResponse = await controller.handle({
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
    })

    return res.status(ctrlResponse.statusCode).json(ctrlResponse.body)
  }
}
