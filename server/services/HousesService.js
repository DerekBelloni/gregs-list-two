import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class HouseService {

  async getAll() {
    const houses = await dbContext.Houses.find()
    return houses
  }
  async getById(id) {
    const houses = await dbContext.Houses.findById(id)
    if (!houses) {
      throw new BadRequest('invalid house id')
    }
    return houses
  }

  async create(body) {
    const newHouse = await dbContext.Houses.create(body)
    return newHouse
  }
  async edit(update) {
    const originalHouse = await this.getById(update.id)
    if (originalHouse.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('You are not allowed to do that you monster!')
    }
    originalHouse.year = update.year ? update.year : originalHouse.year
    originalHouse.bedrooms = update.bedrooms ? update.bedrooms : originalHouse.bedrooms
    originalHouse.bathrooms = update.bathrooms ? update.bathrooms : originalHouse.bathrooms
    originalHouse.levels = update.levels ? update.levels : originalHouse.levels
    originalHouse.description = update.description ? update.description : originalHouse.description

    await originalHouse.save({ runValidators: true })
    return originalHouse
  }

  async remove(houseId, userId) {
    const house = await this.getById(houseId)
    if (house.creatorId.toString() !== userId) {
      throw new Forbidden('Get off my plane!')
    }
    await dbContext.Houses.findByIdAndDelete(houseId)
  }

}

export const houseService = new HouseService()