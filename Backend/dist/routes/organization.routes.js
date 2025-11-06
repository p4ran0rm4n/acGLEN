"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Todas as rotas requerem autenticação
router.use(auth_middleware_1.authenticate);
/**
 * GET /api/organizations
 * Listar organizações do usuário
 */
router.get('/', async (req, res) => {
    try {
        const { data, error } = await index_1.supabase
            .from('organizations')
            .select('*')
            .eq('owner_id', req.user?.id);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json({ organizations: data || [] });
    }
    catch (error) {
        console.error('Erro ao listar organizações:', error);
        res.status(500).json({ error: 'Erro ao listar organizações' });
    }
});
/**
 * POST /api/organizations
 * Criar nova organização
 */
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Nome da organização é obrigatório' });
        }
        const { data, error } = await index_1.supabase
            .from('organizations')
            .insert({
            name,
            description: description || '',
            owner_id: req.user?.id,
        })
            .select()
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(201).json({
            message: 'Organização criada com sucesso',
            organization: data,
        });
    }
    catch (error) {
        console.error('Erro ao criar organização:', error);
        res.status(500).json({ error: 'Erro ao criar organização' });
    }
});
/**
 * GET /api/organizations/:id
 * Obter organização por ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await index_1.supabase
            .from('organizations')
            .select('*')
            .eq('id', id)
            .single();
        if (error || !data) {
            return res.status(404).json({ error: 'Organização não encontrada' });
        }
        // Verificar se o usuário tem acesso
        if (data.owner_id !== req.user?.id && req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        res.json({ organization: data });
    }
    catch (error) {
        console.error('Erro ao obter organização:', error);
        res.status(500).json({ error: 'Erro ao obter organização' });
    }
});
/**
 * PUT /api/organizations/:id
 * Atualizar organização
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        // Verificar se o usuário é o dono
        const { data: org, error: fetchError } = await index_1.supabase
            .from('organizations')
            .select('owner_id')
            .eq('id', id)
            .single();
        if (fetchError || !org) {
            return res.status(404).json({ error: 'Organização não encontrada' });
        }
        if (org.owner_id !== req.user?.id && req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (description !== undefined)
            updateData.description = description;
        const { data, error } = await index_1.supabase
            .from('organizations')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json({
            message: 'Organização atualizada com sucesso',
            organization: data,
        });
    }
    catch (error) {
        console.error('Erro ao atualizar organização:', error);
        res.status(500).json({ error: 'Erro ao atualizar organização' });
    }
});
/**
 * DELETE /api/organizations/:id
 * Deletar organização
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Verificar se o usuário é o dono
        const { data: org, error: fetchError } = await index_1.supabase
            .from('organizations')
            .select('owner_id')
            .eq('id', id)
            .single();
        if (fetchError || !org) {
            return res.status(404).json({ error: 'Organização não encontrada' });
        }
        if (org.owner_id !== req.user?.id && req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const { error } = await index_1.supabase
            .from('organizations')
            .delete()
            .eq('id', id);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json({ message: 'Organização deletada com sucesso' });
    }
    catch (error) {
        console.error('Erro ao deletar organização:', error);
        res.status(500).json({ error: 'Erro ao deletar organização' });
    }
});
exports.default = router;
//# sourceMappingURL=organization.routes.js.map