<template>
    <!-- Aplica clases flex para asegurar que ocupe toda la pantalla -->
    <div class="d-flex flex-column min-vh-100" id="formulario">
        <div class="bg-dark text-white text-center">
            <div class="m-4">
                <p>Header</p>
            </div>
        </div>
        <!-- Contenido principal -->
        <div class="bg-secondary d-flex flex-grow-1 align-items-center justify-content-center">
            <form @submit.prevent="loguearse" class="bg-primary m-4 flex-grow-1 p-3" style="max-width: 1000px; width: 100%; border-radius: 8px;">
                <h2>Login</h2>

                <!-- División del formulario en dos columnas -->
                <div class="row">
                    <!-- Primera columna -->
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Nombre de usuario</label>
                            <input class="form-control" v-model="usuario.nombreUsuario">
                        </div>
                    </div>

                    <!-- Segunda columna -->
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Contraseña</label>
                            <input class="form-control" type="password" v-model="usuario.contrasenia">
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-success mt-2">Entrar</button>
            </form>
        </div>

        <!-- Footer que estará siempre al final -->
        <div class="bg-dark text-white text-center">
            <div class="m-4">
                <p>Si tiene dudas o problemas contáctenos: nombre@unicauca.edu.co</p>
            </div>
        </div>
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
        overflow-x: hidden;  /* Evitar cualquier ajuste automático */
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
