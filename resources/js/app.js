import './menuRegistry'
import './dashboardRegistry'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import adminRoutes from '@admin/router/index'
import userRoutes from '@user/router/index'
import mediaRoutes from '@media/router/index'
import languageRoutes from '@language/router/index'
import themeRoutes from '@theme/router/index'
import settingRoutes from '@setting/router/index'
import cmsRoutes from '@cms/router/index'
import keywordRoutes from '@keyword/router/index'
import { authGuard } from '@user/router/guards'

const routes = [
    { path: '/', redirect: '/admin' },
    ...adminRoutes,
    ...userRoutes,
    ...mediaRoutes,
    ...languageRoutes,
    ...themeRoutes,
    ...settingRoutes,
    ...cmsRoutes,
    ...keywordRoutes,
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(authGuard)

const app = createApp(App)
app.use(router)
app.mount('#app')
