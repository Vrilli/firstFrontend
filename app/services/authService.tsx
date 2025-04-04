import { tokenCookie } from "../utils/cookies";

/**
* Realiza la solicitud de inicio de sesión a la API.
* @param {string} email - Correo del usuario.
* @param {string} password - Contraseña del usuario.
* @returns {Promise<Object>} - Datos del usuario autenticado.
*/
export async function login(email: string, password: string) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Credenciales incorrectas');
        }

    } catch (error) {
        console.error(error);
    }
}
/**
* Realiza la solicitud de registro a la API.
* @param {string} firstName - nombre del usuario.
* @param {string} lastName - apellido del usuario.
* @param {string} birthDate - fecha de nacimiento del usuario.
* @param {string} email - Correo del usuario.
* @param {string} password - Contraseña del usuario.
* @returns {Promise<Object>} - Datos del usuario registrado.
*/
export async function register(
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    password: string
) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, birthDate, email, password})
        });

        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al registrar');
        }

    } catch (error) {
        console.error(error);
    }
}
/**
 * Verifica si hay un token válido en las cookies.
 * @param {Request} request - Petición HTTP.
 * @returns {Promise<boolean>} - `true` si el usuario está autenticado, `false` si no.
 */
export async function checkAuth(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const token = await tokenCookie.parse(cookieHeader);
    return !!token; // Retorna true si hay token, false si no
  }
  
  /**
   * Cierra la sesión eliminando la cookie del token.
   * @returns {Promise<Object>} - Encabezados para eliminar la cookie.
   */
  export async function logout() {
    return {
      headers: {
        "Set-Cookie": await tokenCookie.serialize("", { maxAge: 0 }), // Borra la cookie
      },
    };
  }