import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Principal from '../components/Principal.vue'
import Ingresos from '../components/Ingresos.vue'
import Egresos from '../components/Egresos.vue'
import AgregarIngreso from '../components/AgregarIngreso.vue'
import AgregarEgreso from '../components/AgregarEgreso.vue'
import EliminarIngreso from '../components/EliminarIngreso.vue'
import EliminarEgreso from '../components/EliminarEgreso.vue'
import EditarIngreso from '../components/EditarIngreso.vue'
import EditarEgreso from '../components/EditarEgreso.vue'
import Nomina from '../components/Nomina.vue'
import EditarNomina from '../components/EditarNomina.vue'
import AgregarNomina from '../components/AgregarNomina.vue'
import EliminarNomina from '../components/EliminarNomina.vue'
import Facturas from '../components/Facturas.vue'
import NuevoUsuario from '../components/NuevoUsuario.vue'
import Usuarios from '@/components/Usuarios.vue'
import UsuarioEliminado from '@/components/UsuarioEliminado.vue'
import UsuarioEditado from '@/components/UsuarioEditado.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/principal',
      name: 'principal',
      component: Principal
    },
    {
      path: '/ingresos',
      name: 'ingresos',
      component: Ingresos
    },
    {
      path: '/egresos',
      name: 'egresos',
      component: Egresos
    },
    {
      path: '/nomina',
      name: 'nomina',
      component: Nomina
    },
    {
      path: '/agregar-ingreso',
      name: 'agregar_ingreso',
      component: AgregarIngreso
    },
    {
      path: '/agregar-nomina',
      name: 'agregar_nomina',
      component: AgregarNomina
    },
    {
      path: '/agregar-egreso',
      name: 'agregar_egreso',
      component: AgregarEgreso
    },
    {
      path: '/eliminar-ingreso',
      name: 'eliminar_ingreso',
      component: EliminarIngreso
    },
    {
      path: '/eliminar-egreso',
      name: 'eliminar_egreso',
      component: EliminarEgreso
    },
    {
      path: '/eliminar-nomina',
      name: 'eliminar_nomina',
      component: EliminarNomina
    },
    {
      path: '/editar-ingreso',
      name: 'editar_ingreso',
      component: EditarIngreso
    },
    {
      path: '/editar-egreso',
      name: 'editar_egreso',
      component: EditarEgreso
    },
    {
      path: '/editar-nomina',
      name: 'editar_nomina',
      component: EditarNomina
    },
    {
      path: '/facturas',
      name: 'facturas',
      component: Facturas
    },
    {
      path: '/usuarios-nuevos',
      name: 'usuarios-nuevos',
      component: NuevoUsuario
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: Usuarios
    },
    {
      path: '/usuarios-eliminado',
      name: 'usuarios_eliminado',
      component: UsuarioEliminado
    },
    {
      path: '/usuarios-editado',
      name: 'usuario-editado',
      component: UsuarioEditado
    }/* ,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ]
})

export default router
