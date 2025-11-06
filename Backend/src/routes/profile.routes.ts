import express from 'express';
import { supabase } from '../index';
import { authenticate } from '../middleware/auth.middleware';
import { AuthRequest } from '../middleware/auth.middleware';
import { isValidCPF, isValidPhone } from '../utils/validators';

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

/**
 * GET /api/profile
 * Obter perfil completo do usuário
 */
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', req.user?.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    res.json({ profile: data });
  } catch (error: any) {
    console.error('Erro ao obter perfil:', error);
    res.status(500).json({ error: 'Erro ao obter perfil' });
  }
});

/**
 * PUT /api/profile
 * Atualizar perfil do usuário
 */
router.put('/', async (req: AuthRequest, res) => {
  try {
    const { name, cpf, phone, address, city, state, zip_code } = req.body;

    // Validar CPF se fornecido
    if (cpf && !isValidCPF(cpf)) {
      return res.status(400).json({ error: 'CPF inválido' });
    }

    // Verificar se CPF já existe (se foi alterado)
    if (cpf) {
      const cleanCPF = cpf.replace(/[^\d]/g, '');
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('cpf, user_id')
        .eq('cpf', cleanCPF)
        .single();

      if (existingProfile && existingProfile.user_id !== req.user?.id) {
        return res.status(400).json({ error: 'Este CPF já está cadastrado' });
      }
    }

    // Validar telefone se fornecido
    if (phone && !isValidPhone(phone)) {
      return res.status(400).json({ error: 'Telefone inválido' });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (cpf !== undefined) updateData.cpf = cpf.replace(/[^\d]/g, '');
    if (phone !== undefined) updateData.phone = phone.replace(/[^\d]/g, '');
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (zip_code !== undefined) updateData.zip_code = zip_code;

    const { data, error } = await supabase
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
  } catch (error: any) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

export default router;

