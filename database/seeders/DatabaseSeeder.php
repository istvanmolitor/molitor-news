<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Molitor\Cms\Database\Seeders\CmsSeeder;
use Molitor\Keyword\Database\Seeders\KeywordSeeder;
use Molitor\Language\Database\Seeders\LanguageSeeder;
use Molitor\Media\Database\Seeders\MediaSeeder;
use Molitor\Setting\database\seeders\SettingSeeder;
use Molitor\Theme\database\seeders\ThemeSeeder;
use Molitor\User\Database\Seeders\UserSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            MediaSeeder::class,
            LanguageSeeder::class,
            ThemeSeeder::class,
            SettingSeeder::class,
            KeywordSeeder::class,
            CmsSeeder::class,
        ]);
    }
}
