"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticate = void 0;
const index_1 = require("../index");
/**
 * Middleware para autenticar requisições usando Supabase
 */
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Token de autenticação não fornecido' });
            return;
        }
        const token = authHeader.substring(7); // Remove "Bearer "
        // Verificar token com Supabase
        const { data: { user }, error } = await index_1.supabase.auth.getUser(token);
        if (error || !user) {
            res.status(401).json({ error: 'Token inválido ou expirado' });
            return;
        }
        // Adicionar usuário à requisição
        req.user = {
            id: user.id,
            email: user.email || '',
            role: user.user_metadata?.role,
        };
        next();
    }
    catch (error) {
        console.error('Erro na autenticação:', error);
        res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }
};
exports.authenticate = authenticate;
/**
 * Middleware para verificar roles específicas
 */
const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ error: 'Usuário não autenticado' });
            return;
        }
        if (!req.user.role || !roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.middleware.js.map