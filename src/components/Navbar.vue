<script>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="nav">
        <RouterLink class="" :to="{ name: 'principal' }">
            <img alt="Vue logo" class="logo" src="../assets/logo.png" width="125" height="125" />
        </RouterLink>
        <div class="options">
            <RouterLink class="" :to="{ name: 'ingresos' }">Ingresos</RouterLink>
            <RouterLink class="" :to="{ name: 'egresos' }">Egresos</RouterLink>
            <RouterLink class="" :to="{ name: 'nomina' }">Planilla</RouterLink>
            <a class="">Facturas</a>
            <a class="">Calendario</a>
        </div>
        <div class="dropdown">
            <button id="btn-dropdown" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="currentColor" class="bi bi-justify" viewBox="0 0 16 16">
                    <path color="black" fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                </svg>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Perfil</a></li>
                <li><RouterLink class="dropdown-item" :to="{ name: 'usuarios' }">Usuarios</RouterLink></li>
                <li><RouterLink class="dropdown-item" :to="{ name: 'login' }">Cerrar sesión</RouterLink></li>
            </ul>
        </div>
</nav>
</template>

<style>
.nav{
    background-color: #D1AE53;
    width: 100%;
    display: flex;
    align-items: center;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
.options{
    margin-left: 20%;
    margin-right: 25%;
    display: flex;
    justify-content: center;
}
.options a{
    margin-left: 10%;
    color: black;
    text-decoration: none;
}
.logout svg{
    color: black;
}
#btn-dropdown{
    background-color: transparent;
    border-color: transparent;
    color: black;
}
.dropdown ul{
    background-color: #D1AE53;
    font-size: 30px;
    border-color: transparent;
}
</style>
