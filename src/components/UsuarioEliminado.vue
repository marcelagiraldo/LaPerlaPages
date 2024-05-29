<script>
import Navbar from './Navbar.vue'
import axios from 'axios';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            users: []
        };
    },
    mounted() {
        this.getusers();
    },
    methods: {
        async getusers() {
            try {
                const response = await axios.get('http://localhost:8001/user/users');
                this.users = response.data
                console.log(this.users);
            } catch (error) {
                console.error('Error al obtener Ingresos:', error);
            }
        },
        async deleteuser(ID) {
            try {
                const response = await axios.delete(`http://localhost:8001/user/users/${ID}`);
                // Eliminar el producto del estado local
                this.users = this.users.filter(user => user.id === ID);
                console.log('Ingreso eliminado:', response.data);
            } catch (error) {
                console.error('Error al eliminar Ingreso:', error);
            }
        },
    }
}
</script>

<template>
    <Navbar/>
    <div class="content">
        <h1>Eliminar</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Contraseña</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.user }}</td>
                    <td>{{ user.password }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.rol }}</td>
                    <td><a href="" @click="deleteuser(user.id)"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg></a></td>
                </tr>
            </tbody>
        </table>
        <RouterLink class="entrar" :to="{ name: 'usuarios' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
            </svg>
        </RouterLink>
    </div>

</template>

<style>
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container{
    display: flex;
    justify-content: center;
}
.content-left{
    width: 80%;
    margin: 20px;
}
.content-right{
    width: 80%;
    margin: 20px;
}
.valor{
    display: flex;
}
.entrar{
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    width: 10%;
    height: 40px;
    font-size: 30px;
    margin: 90px;
    background-color: #CF9339;
    border-style: none;
    text-decoration: none;
}
table{
    margin: 90px;
    border-collapse: collapse;
    border: 2px solid rgb(182, 178, 178); /* Borde de la tabla */
    width: 60%;
    tr:nth-child(even) {background-color: #D9D9D9;}
}
th {
  background-color: #CF9339;
  color: white;
}
</style>
