import './menuRegistry'
import './dashboardRegistry'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import adminRoutes from '@admin/router/index'
import userRoutes from '@user/router/index'
import { authGuard } from '@user/router/guards'

const routes = [
    { path: '/', redirect: '/admin' },
    ...adminRoutes,
    ...userRoutes,
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(authGuard)

const app = createApp(App)
app.use(router)
app.mount('#app')
