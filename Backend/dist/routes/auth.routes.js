"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validators_1 = require("../utils/validators");
const router = express_1.default.Router();
/**
 * POST /api/auth/register
 * Registrar novo usuário (sistema de hotel)
 */
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, cpf, phone, address, city, state, zip_code } = req.body;
        // Validações obrigatórias
        if (!email || !password || !name || !cpf || !phone || !address) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios: email, senha, nome, CPF, telefone e endereço',
            });
        }
        // Validar email real
        if (!(0, validators_1.isRealEmail)(email)) {
            return res.status(400).json({ error: 'Email inválido ou formato incorreto' });
        }
        // Verificar se email já existe
        const { data: existingUsers } = await index_1.supabase.auth.admin.listUsers();
        const emailExists = existingUsers.users.some((user) => user.email === email);
        if (emailExists) {
            return res.status(400).json({ error: 'Este email já está cadastrado' });
        }
        // Validar senha forte
        const passwordValidation = (0, validators_1.isStrongPassword)(password);
        if (!passwordValidation.valid) {
            return res.status(400).json({ error: passwordValidation.message });
        }
        // Validar CPF
        if (!(0, validators_1.isValidCPF)(cpf)) {
            return res.status(400).json({ error: 'CPF inválido' });
        }
        // Verificar se CPF já existe
        const { data: existingProfiles } = await index_1.supabase
            .from('user_profiles')
            .select('cpf')
            .eq('cpf', cpf.replace(/[^\d]/g, ''));
        if (existingProfiles && existingProfiles.length > 0) {
            return res.status(400).json({ error: 'Este CPF já está cadastrado' });
        }
        // Validar telefone
        if (!(0, validators_1.isValidPhone)(phone)) {
            return res.status(400).json({ error: 'Telefone inválido' });
        }
        // Criar usuário no Supabase Auth
        const { data, error } = await index_1.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    role: 'guest', // Hóspede
                },
            },
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (!data.user) {
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
        // Criar perfil do usuário
        const { error: profileError } = await index_1.supabase.from('user_profiles').insert({
            user_id: data.user.id,
            name,
            cpf: cpf.replace(/[^\d]/g, ''), // Remove formatação
            phone: phone.replace(/[^\d]/g, ''), // Remove formatação
            address,
            city: city || null,
            state: state || null,
            zip_code: zip_code || null,
        });
        if (profileError) {
            // Se falhar ao criar perfil, deletar o usuário criado
            await index_1.supabase.auth.admin.deleteUser(data.user.id);
            return res.status(400).json({ error: 'Erro ao criar perfil: ' + profileError.message });
        }
        res.status(201).json({
            message: 'Usuário criado com sucesso. Verifique seu email para confirmar a conta.',
            user: {
                id: data.user.id,
                email: data.user.email,
                name,
            },
        });
    }
    catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});
/**
 * POST /api/auth/login
 * Login do usuário
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }
        const { data, error } = await index_1.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        // Buscar perfil completo
        const { data: profile } = await index_1.supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', data.user.id)
            .single();
        res.json({
            message: 'Login realizado com sucesso',
            user: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata?.name,
                role: data.user.user_metadata?.role,
            },
            profile: profile || null,
            session: {
                access_token: data.session?.access_token,
                refresh_token: data.session?.refresh_token,
                expires_at: data.session?.expires_at,
            },
        });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});
/**
 * POST /api/auth/logout
 * Logout do usuário
 */
router.post('/logout', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.substring(7);
        if (token) {
            await index_1.supabase.auth.signOut();
        }
        res.json({ message: 'Logout realizado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao fazer logout:', error);
        res.status(500).json({ error: 'Erro ao fazer logout' });
    }
});
/**
 * POST /api/auth/refresh
 * Atualizar token de acesso
 */
router.post('/refresh', async (req, res) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            return res.status(400).json({ error: 'Refresh token é obrigatório' });
        }
        const { data, error } = await index_1.supabase.auth.refreshSession({
            refresh_token,
        });
        if (error) {
            return res.status(401).json({ error: 'Refresh token inválido' });
        }
        res.json({
            session: {
                access_token: data.session?.access_token,
                refresh_token: data.session?.refresh_token,
                expires_at: data.session?.expires_at,
            },
        });
    }
    catch (error) {
        console.error('Erro ao atualizar token:', error);
        res.status(500).json({ error: 'Erro ao atualizar token' });
    }
});
/**
 * POST /api/auth/reset-password
 * Solicitar reset de senha
 */
router.post('/reset-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email é obrigatório' });
        }
        const { error } = await index_1.supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password`,
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json({ message: 'Email de recuperação de senha enviado' });
    }
    catch (error) {
        console.error('Erro ao solicitar reset de senha:', error);
        res.status(500).json({ error: 'Erro ao solicitar reset de senha' });
    }
});
/**
 * GET /api/auth/me
 * Obter informações do usuário autenticado
 */
router.get('/me', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.substring(7);
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }
        const { data: { user }, error } = await index_1.supabase.auth.getUser(token);
        if (error || !user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }
        // Buscar perfil completo do usuário
        const { data: profile } = await index_1.supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name,
                role: user.user_metadata?.role,
                created_at: user.created_at,
                profile: profile || null,
            },
        });
    }
    catch (error) {
        console.error('Erro ao obter usuário:', error);
        res.status(500).json({ error: 'Erro ao obter informações do usuário' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map