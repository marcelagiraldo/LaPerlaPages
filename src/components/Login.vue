<script>
    import axios from 'axios';
    import { ref } from 'vue';
    import { mapMutations } from 'vuex';
    export default {
        components:{
        },
        data() {
            const userValue = ref('')
            const passwordValue = ref('')
            const checkin = false
            return {
                users: [],
                userValue,passwordValue,checkin,
                showModal:false
            };
        },
        mounted() {
            this.getProducts();
        },
        methods: {
            ...mapMutations(['setMyVariable']),
            async getProducts() {
                try {
                    const response = await axios.get('http://localhost:8001/user/users');
                    this.users = response.data
                    console.log(this.users);
                } catch (error) {
                    console.error('Error al obtener productos:', error);
                }
            },
            checkUser(){
                console.log("Valor del user: ",this.userValue);
                console.log("Valor del password: ",this.passwordValue);
                for (let user of this.users) {
                    console.log("Valor del user user: ", user.user);
                    console.log("Valor del password password: ", user.password);

                    if (this.userValue === user.user && this.passwordValue === user.password) {
                        console.log("Mutate",this.setMyVariable(user.id));
                        console.log("Usuario válido encontrado");
                        this.checkin = true;
                        this.$router.push('/principal');
                        return; // Salir del bucle si se encuentra un usuario válido
                    }
                }
                this.showModal = true
                setTimeout(() => {
                    this.showModal = false;
                }, 1500);
            }
        }
    }
</script>

<template>
    <div class="content">
        <img alt="Vue logo" class="logo" src="../assets/logo.png" width="125" height="125" />
        <h1>INICIO DE SESIÓN</h1>
        <div class="usuario">
            <label for="formGroupExampleInput" class="form-label">Usuario</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Usuario" v-model="userValue">
        </div>
        <div class="contrasena">
            <label for="formGroupExampleInput2" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="" placeholder="Contraseña" v-model="passwordValue">
        </div>
        <!-- <a href="" class="entrar">Entrar</a> -->
        <button class="entrar" @click="checkUser">Entrar</button>
        <div class="modal" v-if="showModal">
        <div class="modal-content">
            <p class="correcta">El usuario es incorrecto</p>
        </div>
    </div>
    </div>
</template>

<style>
body{
    width: 100%;
    height: 100%;
}
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.usuario{
    display: flex;
    flex-direction: column;
    margin: 30px;
}
.usuario input{
    width: 700px;
    height: 40px;
    font-size: 30px;
    background-color: #D9D9D9;
    border-style: none;
}
.contrasena{
    display: flex;
    flex-direction: column;
    margin: 30px;
}
.contrasena input{
    width: 700px;
    height: 40px;
    font-size: 30px;
    background-color: #D9D9D9;
    border-style: none;
}
.entrar{
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    width: 15%;
    height: 40px;
    font-size: 30px;
    margin: 90px;
    background-color: #CF9339;
    border-style: none;
    border-radius: 20px;
    text-decoration: none;
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

.content .modal-content {
  background-color: rgba(190, 165, 81, 0.973);
  padding: 20px;
  width: 40%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
