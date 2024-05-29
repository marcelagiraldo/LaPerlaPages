<script>
import Navbar from './Navbar.vue'
import axios from 'axios';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            payrolls: [],
        };
    },
    mounted() {
        this.getPayrolls();
    },
    methods: {
        async getPayrolls() {
            try {
                const response = await axios.get('http://localhost:8001/payroll/payrolls');
                this.payrolls = response.data
                console.log(this.payrolls);
            } catch (error) {
                console.error('Error al obtener Nomina:', error);
            }
        }
    }
}
</script>

<template>
    <Navbar/>
    <div class="content">
        <div class="title">
            <h1>Nómina</h1>
            <RouterLink class="" :to="{ name: 'agregar_nomina' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                </svg>
            </RouterLink>
            <RouterLink class="" :to="{ name: 'eliminar_nomina' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
            </RouterLink>
            <RouterLink class="" :to="{ name: 'editar_nomina' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
            </RouterLink>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Actividad</th>
                    <th>Categoría</th>
                    <th>Responsable</th>
                    <th>Observación</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="payroll in payrolls" :key="payroll.id">
                    <td>{{ payroll.date_ }}</td>
                    <td>{{ payroll.activity }}</td>
                    <td>{{ payroll.category }}</td>
                    <td>{{ payroll.responsible }}</td>
                    <td>{{ payroll.observation }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<style>
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
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
.title{
    display: flex;
    align-items: center;
}
.title a{
    margin-left: 50px;
    color: black;
}
</style>
