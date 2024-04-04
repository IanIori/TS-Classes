import { Router } from 'express'
import AddressController from '../../controllers/address/address.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const addressRoutes = Router()

addressRoutes.get('/', authMiddleware, AddressController.show)
addressRoutes.post('/', authMiddleware, AddressController.store)
addressRoutes.put('/', authMiddleware, AddressController.store)

export default addressRoutes

