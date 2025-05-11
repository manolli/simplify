import Client from '../models/Client';
import { AuthRequest } from '../middleware/authJWT';
import { Request,Response } from 'express';

export const createClient = async (req: AuthRequest, res: Response) => {
  try {
    const { tenantId } = req.user!
    const client = await Client.create(req.body,{tenantId})
    res.status(201).json(client)
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar cliente', details: err })
  }
}

export const getAllClients = async (_: Request, res: Response) => {
  try {
    const clients = await Client.find()
    res.json(clients)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar clientes' })
  }
}

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id)
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' })
    res.json(client)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar cliente' })
  }
}

export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' })
    res.json(client)
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar cliente' })
  }
}

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id)
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir cliente' })
  }
}
