import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Table',
    component: () => import('../components/Table.vue'),
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('../components/Chart.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
