import { menuRegistry } from '@menu/index'
import { AdminMenuBuilder } from '@admin/lib/AdminMenuBuilder'
import { UserMenuBuilder } from '@user/config/menuBuilder'
import { MediaMenuBuilder } from '@media/config/menuBuilder'
import { LanguageMenuBuilder } from '@language/config/menuBuilder'
import { ThemeMenuBuilder } from '@theme/config/menuBuilder'
import { SettingMenuBuilder } from '@setting/config/menuBuilder'
import { CmsMenuBuilder } from '@cms/config/menuBuilder'
import { KeywordMenuBuilder } from '@keyword/config/menuBuilder'
import { RssWatcherMenuBuilder } from 'vue-rss-watcher'

menuRegistry.register(new AdminMenuBuilder())
menuRegistry.register(new UserMenuBuilder())
menuRegistry.register(new MediaMenuBuilder())
menuRegistry.register(new LanguageMenuBuilder())
menuRegistry.register(new ThemeMenuBuilder())
menuRegistry.register(new SettingMenuBuilder())
menuRegistry.register(new CmsMenuBuilder())
menuRegistry.register(new KeywordMenuBuilder())
menuRegistry.register(new RssWatcherMenuBuilder())
