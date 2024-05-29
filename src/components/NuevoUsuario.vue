<script>
import Navbar from './Navbar.vue'
import axios from 'axios';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            users: [],
            showModal:false
        };
    },
    mounted() {
        this.getUsers();
    },
    methods:{
        async getUsers() {
            try {
                const response = await axios.get('http://localhost:8001/user/users');
                this.users = response.data
                console.log(this.users);
                console.log("Id",this.users.length + 1);
            } catch (error) {
                console.error('Error al obtener Egreso:', error);
            }
        },
        async create_user() {
            try {
                if (!this.user || !this.password || !this.name || !this.email || !this.rol) {
                    this.errorMessage = 'Por favor complete todos los campos requeridos.';
                    this.showModal = true;
                    setTimeout(() => {
                        this.showModal = false;
                    }, 1500);
                    return; // Detener la función si algún campo requerido está vacío
                }else{
                    const newUser = {
                        'id': this.users.length + 1,
                        'name':this.name,
                        'user':this.user,
                        'password':this.password,
                        'email':this.email,
                        'rol':this.rol
                    }
                    const response = await axios.post(`http://localhost:8001/user/users/`,newUser);
                    this.users.push(response.data);
                    this.getUsers()
                    this.$router.push({ name: 'usuarios' });
                    return;
                }
            } catch (error) {
                console.error('Error al crear Nomina:', error);
            }
        }
    }
}
</script>

<template>
    <Navbar/>
    <div class="content">
        <h1>Agregar.</h1>
        <form id="container" class="form-group">
            <div class="content-left">
                <div class="fecha">
                    <label for="formGroupExampleInput" class="form-label">Usuario *</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Usuario" v-model="user" required>
                </div>
                <div class="fecha">
                    <label for="formGroupExampleInput" class="form-label">Password *</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Password" v-model="password" required>
                </div>
                <div class="fecha">
                    <label for="formGroupExampleInput" class="form-label">Nombre *</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Name" v-model="name" required>
                </div>
            </div>
            <div class="content-left">
                <div class="fecha">
                    <label for="formGroupExampleInput" class="form-label">Correo *</label>
                    <input type="email" class="form-control" id="formGroupExampleInput" placeholder="Email" v-model="email" required>
                </div>
                <div class="fecha">
                    <label for="formGroupExampleInput" class="form-label">Rol *</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Teléfono" v-model="rol" required>
                </div>
            </div>
            <div class="modal" v-if="showModal">
                <div class="modal-content">
                    <p class="correcta">Debes ingresar todos los campos requeridos</p>
                </div>
            </div>
        </form>
        <button id="entrar" type="submit" class="submit-btn" @click.prevent="create_user"><svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
        </svg></button>
    </div>

</template>

<style>
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#container{
    display: flex;
    justify-content: center;
}
#container .content-left{
    width: 80%;
    margin-right: 300px;
}
.content-right{
    width: 80%;
    margin-left: 20px;
}
.valor{
    display: flex;
}
#entrar.submit-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: black;
    width: 50%;
    height: 60px;
    font-size: 30px;
    margin: 90px;
    background-color: #CF9339;
    border-style: none;
    text-decoration: none;
}
.fecha .form-control {
    font-size: 30px;
}
.valor .form-control{
    font-size: 30px;
}
.categoria .form-select{
    font-size: 30px;
}
.content .modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.content .modal .modal-content {
  background-color: rgba(190, 165, 81, 0.973);
  padding: 20px;
  width: 40%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.correcta{
    font-size: 30px;
}
</style>
