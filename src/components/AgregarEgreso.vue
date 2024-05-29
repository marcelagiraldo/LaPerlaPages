<script>
import Navbar from './Navbar.vue'
import axios from 'axios';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            expenses: [],
            categories:[],
            showModal:false
        };
    },
    mounted() {
        this.getExpenses();
        this.getCategories()
    },
    methods:{
        async getExpenses() {
            try {
                const response = await axios.get('http://localhost:8001/expense/expenses');
                this.expenses = response.data
                console.log(this.expenses);
                console.log("Id",this.expenses.length + 1);
            } catch (error) {
                console.error('Error al obtener Egreso:', error);
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
        async create_expense() {
            try {
                if (!this.dateExpense || !this.categorySelect || !this.priceExpense || !this.descriptionExpense) {
                    this.errorMessage = 'Por favor complete todos los campos requeridos.';
                    this.showModal = true;
                    setTimeout(() => {
                        this.showModal = false;
                    }, 1500);
                    return; // Detener la función si algún campo requerido está vacío
                }else{
                    const newExpense = {
                        'id': this.expenses.length + 1,
                        'date_':this.dateExpense,
                        'category':this.categorySelect,
                        'price':this.priceExpense,
                        'desciption':this.descriptionExpense,
                        'observation':this.observationExpense
                    }
                    console.log("Fecha: ",this.dateIncome);
                    console.log("Categoria: ",this.categorySelect);
                    console.log("Precio: ",this.priceIncome);
                    console.log("Descripcion: ",this.descriptionIncome);
                    console.log("Observación: ",this.observationIncome);
                    const response = await axios.post(`http://localhost:8001/expense/expenses/`,newExpense);
                    this.expenses.push(response.data);
                    this.getExpenses()
                    this.$router.push({ name: 'egresos' });
                }
            } catch (error) {
                console.error('Error al crear Egresos:', error);
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
                    <label for="formGroupExampleInput" class="form-label">Fecha *</label>
                    <input type="date" class="form-control" id="formGroupExampleInput" placeholder="Usuario" v-model="dateExpense" required>
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
                    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" v-model.number="priceExpense" required>
                    <span class="input-group-text">.00</span>
                </div>
            </div>
            <div class="content-right">
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" cols="90"v-model="descriptionExpense" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Observación</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" cols="90" v-model="observationExpense"></textarea>
                </div>
            </div>
            <div class="modal" v-if="showModal">
                <div class="modal-content">
                    <p class="correcta">Debes ingresar todos los campos requeridos</p>
                </div>
            </div>
        </form>
        <button id="entrar" type="submit" class="submit-btn" @click.prevent="create_expense"><svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
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
