import Client from '../models/Client';
import { AuthRequest } from '../middleware/authJWT';
import { Response } from 'express';

// Criar novo cliente
export const createClient = async (req: AuthRequest, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const clientData = {
      ...req.body,
      tenantId, // injeta tenantId a partir do token
    };

    const client = await Client.create(clientData);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar cliente', details: err });
  }
};

// Buscar todos os clientes do tenant
export const getAllClients = async (req: AuthRequest, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const clients = await Client.find({ tenantId }); // filtra pelo tenant
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

// Buscar cliente por ID
export const getClientById = async (req: AuthRequest, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const client = await Client.findOne({ _id: req.params.id, tenantId });
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

// Atualizar cliente
export const updateClient = async (req: AuthRequest, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, tenantId },
      req.body,
      { new: true }
    );
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar cliente' });
  }
};

// Excluir cliente
export const deleteClient = async (req: AuthRequest, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const client = await Client.findOneAndDelete({ _id: req.params.id, tenantId });
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
};
