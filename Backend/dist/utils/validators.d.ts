/**
 * Utilitários de validação para o sistema de hotel
 */
/**
 * Valida formato de email
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Valida se o email é real (formato básico + domínio válido)
 */
export declare function isRealEmail(email: string): boolean;
/**
 * Valida CPF brasileiro
 */
export declare function isValidCPF(cpf: string): boolean;
/**
 * Valida senha forte
 * Requisitos:
 * - Mínimo 8 caracteres
 * - Pelo menos 1 letra maiúscula
 * - Pelo menos 1 letra minúscula
 * - Pelo menos 1 número
 * - Pelo menos 1 caractere especial
 */
export declare function isStrongPassword(password: string): {
    valid: boolean;
    message?: string;
};
/**
 * Valida telefone brasileiro
 * Aceita formatos: (11) 98765-4321, 11987654321, etc.
 */
export declare function isValidPhone(phone: string): boolean;
/**
 * Formata CPF para exibição (000.000.000-00)
 */
export declare function formatCPF(cpf: string): string;
/**
 * Formata telefone para exibição ((00) 00000-0000)
 */
export declare function formatPhone(phone: string): string;
//# sourceMappingURL=validators.d.ts.map