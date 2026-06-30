import { menuRegistry } from '@menu/index'
import { AdminMenuBuilder } from '@admin/lib/AdminMenuBuilder'
import { UserMenuBuilder } from '@user/config/menuBuilder'
import { MediaMenuBuilder } from '@media/config/menuBuilder'
import { LanguageMenuBuilder } from '@language/config/menuBuilder'

menuRegistry.register(new AdminMenuBuilder())
menuRegistry.register(new UserMenuBuilder())
menuRegistry.register(new MediaMenuBuilder())
menuRegistry.register(new LanguageMenuBuilder())
