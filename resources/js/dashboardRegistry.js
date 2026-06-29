import { dashboardRegistry } from '@admin/lib/DashboardRegistry'
import { userDashboardBuilder } from '@user/config/dashboardBuilder'

dashboardRegistry.register(userDashboardBuilder)
