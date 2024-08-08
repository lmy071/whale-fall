import { createMemoryHistory, createRouter } from 'vue-router'
import vvv from './vvv'
import index from "../views/index.vue";

let routes = [
	{ path: "/", component: index }
];

routes = routes.concat(vvv)


export default createRouter({
  history: createMemoryHistory(),
  routes,
});
