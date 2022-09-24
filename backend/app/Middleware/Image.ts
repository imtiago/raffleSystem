import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuid } from 'uuid'
import Application from '@ioc:Adonis/Core/Application'

export default class Image {
  public async handle({request}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    // console.log("eu estou aqui")
    const photo = request.file('images')
    if(photo){
      const imageName = `${uuid()}.${photo?.extname}`

      await photo?.move(Application.tmpPath('uploads'), {
        name: imageName,
        overwrite: true, // overwrite in case of conflict
      })
      // request.body.images = imageName
    }
    await next()
  }
}