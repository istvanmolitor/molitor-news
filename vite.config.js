import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';

const projectRoot = path.resolve(__dirname);
const nodeModules = path.resolve(__dirname, 'node_modules');

function resolveExternalDeps() {
    const aliases = {
        '@admin': path.resolve(__dirname, 'resources/js/packages/vue-admin'),
        '@user': path.resolve(__dirname, 'resources/js/packages/vue-user'),
        '@menu': path.resolve(__dirname, 'resources/js/packages/ts-menu'),
        '@media': path.resolve(__dirname, 'resources/js/packages/vue-media'),
        '@language': path.resolve(__dirname, 'resources/js/packages/vue-language'),
        '@theme': path.resolve(__dirname, 'resources/js/packages/vue-theme'),
        '@setting': path.resolve(__dirname, 'resources/js/packages/vue-setting'),
        '@cms': path.resolve(__dirname, 'resources/js/packages/vue-cms'),
        '@keyword': path.resolve(__dirname, 'resources/js/packages/vue-keyword'),
    };

    return {
        name: 'resolve-external-deps',
        enforce: 'pre',
        resolveId(id, importer) {
            if (!importer) return null;
            if (id.startsWith('.') || id.startsWith('/')) return null;
            if (id.startsWith('\0')) return null;

            const isAlias = Object.keys(aliases).some(a => id.startsWith(a));
            if (isAlias) return null;

            const realImporter = fs.existsSync(importer) ? fs.realpathSync(importer) : importer;
            if (realImporter.startsWith(projectRoot)) return null;

            // Bare import from outside project root: resolve from project node_modules
            const pkgDir = path.join(nodeModules, id);
            const pkgJson = path.join(pkgDir, 'package.json');
            if (fs.existsSync(pkgJson)) {
                const pkg = JSON.parse(fs.readFileSync(pkgJson, 'utf-8'));
                const entry = pkg.module ?? pkg.exports?.['.']?.import ?? pkg.main ?? 'index.js';
                return { id: path.join(pkgDir, entry) };
            }

            const direct = path.join(nodeModules, id);
            if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return { id: direct };

            return null;
        },
    };
}

export default defineConfig({
    plugins: [
        resolveExternalDeps(),
        vue(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@admin': path.resolve(__dirname, 'resources/js/packages/vue-admin'),
            '@user': path.resolve(__dirname, 'resources/js/packages/vue-user'),
            '@menu': path.resolve(__dirname, 'resources/js/packages/ts-menu'),
            '@media': path.resolve(__dirname, 'resources/js/packages/vue-media'),
            '@language': path.resolve(__dirname, 'resources/js/packages/vue-language'),
            '@theme': path.resolve(__dirname, 'resources/js/packages/vue-theme'),
            '@setting': path.resolve(__dirname, 'resources/js/packages/vue-setting'),
            '@cms': path.resolve(__dirname, 'resources/js/packages/vue-cms'),
            '@keyword': path.resolve(__dirname, 'resources/js/packages/vue-keyword'),
        },
    },
    build: {
        chunkSizeWarningLimit: 700,
        rolldownOptions: {
            onLog(level, log, handler) {
                if (log.code === 'INVALID_ANNOTATION') return;
                if (log.code === 'INEFFECTIVE_DYNAMIC_IMPORT') return;
                handler(level, log);
            },
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/vue/') || id.includes('node_modules/vue-router/')) {
                        return 'vue-vendor';
                    }
                    if (id.includes('node_modules/reka-ui/')) {
                        return 'reka-ui';
                    }
                    if (id.includes('node_modules/@vueuse/')) {
                        return 'vueuse';
                    }
                    if (id.includes('node_modules/lucide-vue-next/')) {
                        return 'icons';
                    }
                    if (id.includes('node_modules/axios/') || id.includes('node_modules/clsx/') || id.includes('node_modules/class-variance-authority/') || id.includes('node_modules/tailwind-merge/')) {
                        return 'util-vendor';
                    }
                },
            },
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
