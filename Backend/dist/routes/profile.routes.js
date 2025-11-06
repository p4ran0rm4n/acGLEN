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
// Todas as rotas requerem autenticação
router.use(auth_middleware_1.authenticate);
/**
 * GET /api/profile
 * Obter perfil completo do usuário
 */
router.get('/', async (req, res) => {
    try {
        const { data, error } = await index_1.supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', req.user?.id)
            .single();
        if (error) {
            return res.status(404).json({ error: 'Perfil não encontrado' });
        }
        res.json({ profile: data });
    }
    catch (error) {
        console.error('Erro ao obter perfil:', error);
        res.status(500).json({ error: 'Erro ao obter perfil' });
    }
});
/**
 * PUT /api/profile
 * Atualizar perfil do usuário
 */
router.put('/', async (req, res) => {
    try {
        const { name, cpf, phone, address, city, state, zip_code } = req.body;
        // Validar CPF se fornecido
        if (cpf && !(0, validators_1.isValidCPF)(cpf)) {
            return res.status(400).json({ error: 'CPF inválido' });
        }
        // Verificar se CPF já existe (se foi alterado)
        if (cpf) {
            const cleanCPF = cpf.replace(/[^\d]/g, '');
            const { data: existingProfile } = await index_1.supabase
                .from('user_profiles')
                .select('cpf, user_id')
                .eq('cpf', cleanCPF)
                .single();
            if (existingProfile && existingProfile.user_id !== req.user?.id) {
                return res.status(400).json({ error: 'Este CPF já está cadastrado' });
            }
        }
        // Validar telefone se fornecido
        if (phone && !(0, validators_1.isValidPhone)(phone)) {
            return res.status(400).json({ error: 'Telefone inválido' });
        }
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (cpf !== undefined)
            updateData.cpf = cpf.replace(/[^\d]/g, '');
        if (phone !== undefined)
            updateData.phone = phone.replace(/[^\d]/g, '');
        if (address !== undefined)
            updateData.address = address;
        if (city !== undefined)
            updateData.city = city;
        if (state !== undefined)
            updateData.state = state;
        if (zip_code !== undefined)
            updateData.zip_code = zip_code;
        const { data, error } = await index_1.supabase
            .from('user_profiles')
            .update(updateData)
            .eq('user_id', req.user?.id)
            .select()
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json({
            message: 'Perfil atualizado com sucesso',
            profile: data,
        });
    }
    catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
});
exports.default = router;
//# sourceMappingURL=profile.routes.js.map