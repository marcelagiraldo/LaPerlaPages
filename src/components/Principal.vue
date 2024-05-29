<script>
import { ref } from 'vue';
import Navbar from './Navbar.vue'
import axios from 'axios';
export default {
    components: {
        Navbar
    },
    data() {
        const d = new Date();
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const diaSemana = diasSemana[d.getDay()];
        const dia = d.getDate();
        const mes = meses[d.getMonth()];
        const año = d.getFullYear();
        d.getHours()
        d.getMinutes()
        const fechaFormateada = `${diaSemana} ${dia} de ${mes} de ${año}`;
        return {
            incomes: [],
            expenses: [],
            balance:0,
            fechaFormateada,d
        };
    },
    mounted() {
        this.getBalance()
    },
    methods: {
        async getIncomes() {
            try {
                const response = await axios.get('http://localhost:8001/income/incomes');
                this.incomes = response.data
                console.log("Incomes: ",this.incomes);
            } catch (error) {
                console.error('Error al obtener Ingresos:', error);
            }
        },
        async getExpense() {
            try {
                const response = await axios.get('http://localhost:8001/expense/expenses');
                this.expenses = response.data
                console.log("Expenses: ",this.expenses);
            } catch (error) {
                console.error('Error al obtener Ingresos:', error);
            }
        },
        async getBalance(){
            try {
                await this.getIncomes();
                await this.getExpense();

                let sumIncomes = 0;
                let sumExpenses = 0;

                console.log("Longitud array: ", this.expenses.length);

                this.expenses.forEach(expense => {
                    console.log("Estoy en for1:");
                    console.log("Precio expense: ", expense.price);
                    let priceE = parseInt(expense.price)
                    sumExpenses += priceE;
                });

                this.incomes.forEach(income => {
                    console.log("Precio income: ", income.price);
                    let priceI = parseInt(income.price)
                    sumIncomes += priceI;
                });

                this.balance = (sumIncomes - sumExpenses).toLocaleString('es-ES');
                console.log("Este es el balance: ", this.balance);
                console.log("Suma Ingresos: ", sumIncomes);
                console.log("Suma Egresos: ", sumExpenses);
            } catch (error) {
                console.error('Error al obtener balance:', error);
            }
        }
    }
}
</script>

<template>
    <Navbar/>
    <div class="content">
        <label for="">FECHA: {{ fechaFormateada }}</label>
        <h1>Balance actual:</h1>
        <label for="">${{ balance }}</label>
        <div id="carouselExampleFade" class="carousel slide carousel-fade">
            <div class="carousel-inner">
                <div class="carousel-item ">
                <img src="https://www.semana.com/resizer/jimRCfZU3kcVz7eYsHdN6vpLEkE=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/MGSRCROCY5GETHHQC2XBMM2CEQ.jpg" class="d-block w-200" alt="...">
                </div>
                <div class="carousel-item active">
                <img src="https://mundocafeto.com/wp-content/uploads/2020/02/planta-de-cafe-caracteristicas-750x440.jpg" class="d-block w-200" alt="...">
                </div>
                <div class="carousel-item">
                <img src="https://i0.wp.com/farallonesdelcitara.bioexploradores.com/wp-content/uploads/2022/10/IMG_3619-2.jpg?resize=790%2C415&ssl=1" class="d-block w-200" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>

</template>

<style>
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
.carousel-inner {
    width: 900px; /* Establecer el ancho deseado */
    overflow: hidden; /* Evitar desbordamiento de imágenes más grandes */
}

.carousel-item img {
    max-width: 900px;
    height: auto;
    overflow: hidden;
}
</style>

