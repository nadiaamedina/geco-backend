/* UTILIDAD DE PRISMA — reconoce el error de clave unica duplicada (codigo P2002) */
export function isPrismaUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'P2002'
  );
}