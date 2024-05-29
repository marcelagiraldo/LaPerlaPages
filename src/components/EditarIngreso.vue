<script>
import { ref } from 'vue';
import Navbar from './Navbar.vue'
import axios from 'axios';
export default {
    components: {
        Navbar
    },
    data() {
        let dateIncome = ref('')
        let categorySelect = ref('')
        let priceIncome = ref('')
        let descriptionIncome = ref('')
        let observationIncome = ref('')
        return {
            incomes: [],
            categories: [],
            selectedIncomes: {},
            showModal:false,
            identifier:0,
            dateIncome,categorySelect,priceIncome,descriptionIncome,observationIncome
        };
    },
    mounted() {
        this.getIncomes();
        this.getCategories()
    },
    methods: {
        async getIncomes() {
            try {
                const response = await axios.get('http://localhost:8001/income/incomes');
                this.incomes = response.data
                console.log(this.incomes);
            } catch (error) {
                console.error('Error al obtener Ingresos:', error);
            }
        },
        async getCategories() {
            try {
                const response = await axios.get('http://localhost:8001/category/categories');
                this.categories = response.data
            } catch (error) {
                console.error('Error al obtener Categorias:', error);
            }
        },
        async updateIncome() {
            try {
                const updatedIncome={
                    'id': this.identifier,
                    'date_':this.dateIncome,
                    'category':this.categorySelect,
                    'price':this.priceIncome,
                    'description':this.descriptionIncome,
                    'observation':this.observationIncome
                }
                const response = await axios.put(`http://localhost:8001/income/incomes/${this.identifier}`,updatedIncome);
                console.log('Ingreso actualizado:', response.data);
                this.getIncomes()
                this.$router.push('/editar-ingreso');
                this.showModal=false
            } catch (error) {
                console.error('Error al Editar Ingreso:', error);
            }
        },
        activeShowModal(ID){
            this.showModal = true;
            this.identifier = ID;
            for (let i = 0; i < this.incomes.length; i++) {
                if (this.incomes[i].id === this.identifier) {
                    this.dateIncome = this.incomes[i].date_
                    this.categorySelect = this.incomes[i].category
                    this.priceIncome = this.incomes[i].price
                    this.descriptionIncome = this.incomes[i].description
                    this.observationIncome = this.incomes[i].observation
                    break; // Salir del bucle una vez que se encuentre el ingreso
                }
            }
        }
    }
}
</script>

<template>
    <Navbar/>
    <div class="content">
        <h1>Editar</h1>
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Categoría</th>
                    <th>Valor</th>
                    <th>Descripción</th>
                    <th>Observación</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="income in incomes" :key="income.id">
                    <td>{{ income.date_ }}</td>
                    <td>{{ income.category }}</td>
                    <td>{{ income.price }}</td>
                    <td>{{ income.description }}</td>
                    <td>{{ income.observation }}</td>
                    <td><a class="editar" href="" @click.prevent="activeShowModal(income.id)"><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                    </svg></a></td>
                </tr>
            </tbody>
        </table>
        <RouterLink class="entrar" :to="{ name: 'ingresos' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
            </svg>
        </RouterLink>
        <div class="modal" v-if="showModal">
            <div class="modal-content">
                <form id="container" class="form-group">
                    <div class="content-left">
                        <div class="fecha">
                            <label for="formGroupExampleInput" class="form-label">Fecha *</label>
                            <input type="date" class="form-control" id="formGroupExampleInput" placeholder="Usuario" v-model="dateIncome" required>
                        </div>
                        <div class="categoria">
                            <label for="formGroupExampleInput" class="form-label">Categoría *</label>
                            <select class="form-select" id="inputGroupSelect01" v-model="categorySelect" required>
                                <option disabled value="">Seleccione una categoría</option>
                                <option v-for="category in categories" :key="category.id" :value="category.name">{{category.name}}</option>
                            </select>
                        </div>
                        <label for="formGroupExampleInput" class="form-label">Valor *</label>
                        <div class="valor">
                            <span class="input-group-text">$</span>
                            <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" v-model.number="priceIncome" required>
                            <span class="input-group-text">.00</span>
                        </div>
                    </div>
                    <div class="content-right">
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" cols="90" v-model="descriptionIncome" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Observación</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" cols="90" v-model="observationIncome"></textarea>
                        </div>
                    </div>
                </form>
                <button id="entrar" type="submit" class="submit-btn" @click.prevent="updateIncome"><svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg></button>
            </div>
        </div>
    </div>

</template>

<style>
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.content .modal .modal-content #conatiner{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
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
.editar{
    color: black;
}

.modal .modal-content #container{
    display: flex;
    justify-content: center;
}
.modal .modal-content #container .content-left{
    width: 50%;
    margin-right: 100px;
}
.content-right{
    width: 80%;
    margin-left: 20px;
}
.valor{
    display: flex;
}
.modal .modal-content #entrar.submit-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: black;
    width: 30%;
    height: 60px;
    font-size: 30px;
    margin: 20px;
    background-color: #cf9339c8;
    border-style: none;
    text-decoration: none;
}
.modal .modal-content .fecha .form-control {
    font-size: 30px;
}
.modal .modal-content .valor .form-control{
    font-size: 30px;
}
.modal .modal-content .categoria .form-select{
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
  width: 60%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.correcta{
    font-size: 30px;
}
</style>
