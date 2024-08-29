import { createWebHashHistory, createRouter } from 'vue-router'
import vvv from './vvv'
import index from "../views/index.vue";
import login from "../views/login.vue"

let routes = [
	{ path: "/", component: index },
	{ path: "/login", component: login }

];

routes = routes.concat(vvv)


export default createRouter({
  history: createWebHashHistory(),
  routes,
});
