
import { Request, Response } from 'express'
import User from '../../models/user.entity'
import bcrypt from 'bcrypt'
import Token from '../../models/token.entity'

export default class AuthController {
    static async store (req: Request, res: Response) {
      const { name, email, password } = req.body
  
      if (!name) return res.status(400).json({ error: 'O nome é obrigatório' })
      if (!email) return res.status(400).json({ error: 'O email é obrigatório' })
      if (!password) return res.status(400).json({ error: 'A senha é obrigatória' })

      const user = new User()
      user.name = name
      user.email = email
      user.password = bcrypt.hashSync(password, 10)
      await user.save()

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email
      })
    }

    static async login (req: Request, res: Response) {
      const { email, password } = req.body
  
      if (!email) return res.status(400).json({ error: 'O email é obrigatório' })
      if (!password) return res.status(400).json({ error: 'A senha é obrigatória' })
  
      const user = await User.findOneBy({ email })
      if (!user) return res.status(401).json({ error: 'Usuário não encontrado' })

      const passwordMatch = bcrypt.compareSync(password, user.password)
      if (!passwordMatch) return res.status(401).json({ error: 'Senha inválida' })
  
      await Token.delete({ user: {id: user.id}})

      const token = new Token()
      const stringRand = user.id + new Date().toString()
      // Gera um token aleatório
      token.token = bcrypt.hashSync(stringRand, 1).slice(-20)
      // Define a data de expiração do token para 1 hora
      token.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
      // Gera um refresh token aleatório
      token.refreshToken = bcrypt.hashSync(stringRand+2, 1)

      token.user = user
      await token.save()

      return res.status(201).json({
        token: token.token,
        expiresAt: token.expiresAt,
        refreshToken: token.refreshToken
      })
    }

}