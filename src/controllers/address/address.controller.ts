import { Request, Response } from 'express'
import Address from "../../models/address.entity"
import User from '../../models/user.entity'

export default class AddressController {
    static async store(req: Request, res: Response) {
        const {street, num, neighbourhood, city, state, zipcode} = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'User not authenticated' })

        if(!street) return res.status(400).json({error: 'Street is mandatory'})
        if(!num) return res.status(400).json({error: 'House number is mandatory'})
        if(!neighbourhood) return res.status(400).json({error: 'Neighbourhood is mandatory'})
        if(!city) return res.status(400).json({error: 'city is mandatory'})
        if(!state) return res.status(400).json({error: 'state is mandatory'})
        if(!zipcode) return res.status(400).json({error: 'zipcode is mandatory'})

        const address = new Address()
        address.street = street
        address.num = num
        address.neighbourhood = neighbourhood
        address.city = city
        address.state = state
        address.zipcode = zipcode
        await address.save()

        return res.status(201).json(address)
    }

    static async show (req: Request, res: Response) {
        const { userId } = req.headers
    
        if (!userId) return res.status(401).json({ error: 'User not authenticated' })
  
        const user = await User.findOneBy({id: Number(userId)})
        if(!user?.address) return res.status(401).json({ error: 'User has no registered address' })

        const address = user.address

        return res.json(address)
    }

    static async update (req: Request, res: Response) {
        const {street, num, neighbourhood, city, state, zipcode} = req.body
        const { userId } = req.headers
  
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
    
        const user = await User.findOneBy({id: Number(userId)})
        if(!user?.address) return res.status(401).json({ error: 'User has no registered address' })
    
        const address = user.address

        address.street = street || address.street
        address.city = city || address.city
        address.num = num || address.num
        address.neighbourhood = neighbourhood || address.neighbourhood
        address.state = state || address.state
        address.zipcode = zipcode || address.zipcode

        await address.save()
    
        return res.json(address) // Vamos retornar a task atualizada
      }
}
