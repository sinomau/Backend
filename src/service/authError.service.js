export const userAuthError = (user) => {
  return `
    ¡Hola ${user.first_name}!
    ¡No tienes permisos para crear un articulo!
    Por favor, inicia sesión con un usuario de tipo admin.
    `;
};
