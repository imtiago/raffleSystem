import { BaseModel, SnakeCaseNamingStrategy } from "@ioc:Adonis/Lucid/Orm";
import { string } from "@ioc:Adonis/Core/Helpers";

export default class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
  public serializedName(_model: typeof BaseModel, attributeName: string): string {
    return string.camelCase(attributeName)
  }
  // public serializedName(_model: typeOf BaseModel, attributeName: string): string {
  //   return string.camelCase(attributeName)
  // }
}
