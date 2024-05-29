<script>
import { ref } from 'vue';
import Navbar from './Navbar.vue'
import axios from 'axios';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            categories: [],
        };
    },
    mounted() {
        this.getCategories()
    },
    methods: {
        async getCategories() {
            try {
                const response = await axios.get('http://localhost:8001/category/categories');
                this.categories = response.data
                console.log("categories: ",this.categories);
            } catch (error) {
                console.error('Error al obtener Ingresos:', error);
            }
        }
    }
}
</script>

<template>
    <Navbar/>
    <div class="content">
        <div class="contenedor" v-for="category in categories" :key="category.id">
            <div class="categorias">{{ category.name}}</div>
        </div>
    </div>

</template>

<style>
.content{
    display: flex;
}
.contenedor{
    display: flex;
    background-color: red;
}
.categorias{
    display: flex;
    background-color: blue
}
</style>

