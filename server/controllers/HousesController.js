
import { Auth0Provider } from "@bcwdev/auth0provider/lib/AuthorizationService"
import { houseService } from "../services/HousesService"
import BaseController from "../utils/BaseController"

export class HousesController extends BaseController {

  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:houseId', this.remove)
      .put('/:houseId', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const houses = await houseService.getAll()
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const houses = await houseService.getById(req.params.id)
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newHouse = await houseService.create(req.body)
      return res.send(newHouse)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.houseId
      const update = await houseService.edit(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }


  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const houseId = req.params.houseId
      await houseService.remove(houseId, userId)
      return res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }

}