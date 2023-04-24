import Factory from "@ioc:Adonis/Lucid/Factory";
import Guild from "App/Models/Guild";

export const GuildFactory = Factory
  .define(Guild, ({ faker }) => ({
    name: faker.internet.userName(),
    description: faker.lorem.paragraph()
  }))