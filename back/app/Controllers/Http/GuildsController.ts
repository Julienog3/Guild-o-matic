import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Guild from 'App/Models/Guild'

export default class GuildsController {
  public async index(ctx: HttpContextContract) {
    const guilds = await Guild.all()
    return guilds
  }

  
  public async store({ request }: HttpContextContract) {
    const newPostSchema = schema.create({
      name: schema.string()
    })

    const payload = await request.validate({ schema: newPostSchema })
    Guild.create(payload)
  }

  public async show({ request }: HttpContextContract) {
    return Guild.find(request.param('id'))
  }

  public async destroy(ctx: HttpContextContract) {}
}
