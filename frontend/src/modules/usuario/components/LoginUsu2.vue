<template>
    <div class="min-vh-100 d-flex flex-column" id="formulario">
        <main class="bg-secondary d-flex flex-grow-1 align-items-center justify-content-center">
            <div class="p-3 mx-auto my-auto bg-primary " style="max-width: 1000px; width: 100%; border-radius: 8px;">
                <h2>Login</h2>
                <form @submit.prevent="loguearse">
                    <div class="mb-3">
                        <label class="form-label">Nombre de usuario</label>
                        <input class="form-control" v-model="usuario.nombreUsuario">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        <input class="form-control" v-model="usuario.contrasenia">
                    </div>
                    <button type="submit" class="btn btn-success">Entrar</button>
                </form>
            </div>
        </main>
        <footer class="bg-dark text-white text-center d-flex align-items-center justify-content-center" style="height: 50px;">
            <p>Si tiene dudas o problemas contactenos: nombre@unicauca.edu.co</p>
        </footer>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            usuario: {
                nombreUsuario: '',
                contrasenia: ''
            }
        };
    },
    methods: {
        async loguearse() {
            try {
                console.log('Objeto usuario:', this.usuario);
                const response = await axios.post('http://localhost:3000/api/autenticacion/login', this.usuario);
                console.log('Lo hizo senior:', response);
                console.log('Token:', response.data.token);
                alert('Usuario mandado');
                localStorage.setItem('token', response.data.token);
            } catch (error) {
                console.error('Error al hacer el login', error);
            }
        }
    }
};
</script>

<style scoped>
    /**NO OLVIDAR: EN INPUT DE CONTRAEÑA COLOCAR: type="password" */

    /* Estilos para asegurarse que el diseño no cambie en tamaños pequeños */
    :global(html, body) {
        overflow: hidden;  /* Evitar cualquier ajuste automático */
    }

    

    /* Cuando el tamaño de la pantalla sea menor a 768px */
    @media (max-width: 490px) {
        :global(body) {
            overflow: scroll; /* Desplazamiento activado */
        }

        #formulario {
            max-width: 490px;
            width: 1000px;/* Permite desplazamiento en ambas direcciones */
        }
    }
</style>