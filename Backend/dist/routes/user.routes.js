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
 * GET /api/users
 * Listar usuários (apenas admin)
 */
router.get('/', async (req, res) => {
    try {
        // Verificar se é admin
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const { data, error } = await index_1.supabase.auth.admin.listUsers();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        const users = data.users.map((user) => ({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name,
            role: user.user_metadata?.role,
            created_at: user.created_at,
        }));
        res.json({ users });
    }
    catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
});
/**
 * GET /api/users/:id
 * Obter usuário por ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Usuários só podem ver seu próprio perfil, exceto admins
        if (req.user?.id !== id && req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const { data: { user }, error } = await index_1.supabase.auth.admin.getUserById(id);
        if (error || !user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name,
                role: user.user_metadata?.role,
                created_at: user.created_at,
            },
        });
    }
    catch (error) {
        console.error('Erro ao obter usuário:', error);
        res.status(500).json({ error: 'Erro ao obter usuário' });
    }
});
/**
 * PUT /api/users/:id
 * Atualizar usuário
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role } = req.body;
        // Usuários só podem atualizar seu próprio perfil, exceto admins
        if (req.user?.id !== id && req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        // Apenas admins podem alterar roles
        const updateData = {};
        if (name !== undefined) {
            updateData.name = name;
        }
        if (role !== undefined && req.user?.role === 'admin') {
            updateData.role = role;
        }
        const { data, error } = await index_1.supabase.auth.admin.updateUserById(id, {
            user_metadata: updateData,
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json({
            message: 'Usuário atualizado com sucesso',
            user: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata?.name,
                role: data.user.user_metadata?.role,
            },
        });
    }
    catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});
/**
 * DELETE /api/users/:id
 * Deletar usuário (apenas admin)
 */
router.delete('/:id', async (req, res) => {
    try {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const { id } = req.params;
        const { error } = await index_1.supabase.auth.admin.deleteUser(id);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map