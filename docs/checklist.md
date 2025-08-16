# Checklist de Hitos — ralphstudio (portfolio + microapps)

> Marca casillas y cierra hitos. Cada hito incluye **tareas**, **criterios de aceptación** y **qué validar**.

## Hito 0 — Preparación

- [ ] Repo creado en GitHub (org recomendado: `ralphstudio` · repo: `portfolio`)
- [ ] Node 20 + pnpm 9 instalados (`corepack enable` + `corepack prepare pnpm@9 --activate`)
- [ ] Estructura inicial de carpetas decidida (apps/_, packages/_, public/\_mf, content/)
- [ ] `.editorconfig`, `.gitignore`, `README.md` inicial

**Criterios de aceptación**

- [ ] `pnpm -v` y `node -v` OK
- [ ] Primer commit y push

## Hito 1 — Monorepo base (pnpm workspaces)

- [ ] `pnpm-workspace.yaml` con `apps/*` y `packages/*`
- [ ] `tsconfig.base.json` con `paths` a `@ralphstudio/*`
- [ ] Scripts DX en `package.json` raíz (`dev`, `prebuild`, `test:unit`, `test:e2e`, `build`)
- [ ] ESLint + Prettier configurados

**Criterios de aceptación**

- [ ] `pnpm install` sin errores
- [ ] `pnpm dev` arranca (aunque no renderice nada aún)
- [ ] `pnpm run prebuild` pasa (lint, format:check, typecheck, unit)

## Hito 2 — Host/Portfolio (orquestador)

- [ ] Vite + TS en `apps/host`
- [ ] Rutas: `/` y `/apps/:slug(/.*)?`
- [ ] **Loader ESM** que lee `/_mf/manifest.json` y hace `import()` con estados `loading/error/timeout` + reintento
- [ ] `content/projects.json` (tarjetas de BB, Bar, Delivery)
- [ ] Rewrites (Vercel): `/apps/(.*) -> /index.html`

**Criterios de aceptación**

- [ ] `/` renderiza un esqueleto
- [ ] Acceso directo a `/apps/buybuddies` muestra loader (aunque no haya remoto)

## Hito 3 — i18n (ES/EN) global

- [ ] `packages/i18n` con API: `configure`, `getLocale`, `setLocale`, `ensure`, `t`
- [ ] `packages/mf-contracts`: `Locale`, evento `bb.locale.changed.v1`, `env.locale` + `env.i18n.t`
- [ ] Selector ES/EN en header del host (accesible)
- [ ] Locales: `apps/host/locales/{es,en}/host.json` y `packages/ui/locales/{es,en}/ui.json`

**Criterios de aceptación**

- [ ] Cambiar a EN actualiza textos y `lang` en `<html>`
- [ ] Idioma persiste al recargar y al entrar en `/apps/:slug`

## Hito 4 — UI compartida (SCSS + BEM + tokens)

- [ ] `packages/ui` con **tokens** (CSS vars) y **Button/Card/Input** (BEM + Shadow DOM)
- [ ] Documentado cómo importar SCSS (`?inline` + `unsafeCSS`)
- [ ] Temas por app (BuyBuddies/Bar/Delivery) vía CSS vars

**Criterios de aceptación**

- [ ] Host y BB usan Button/Card de `@ralphstudio/ui`
- [ ] Los temas cambian color primario por app

## Hito 5 — Encapsular BuyBuddies como remoto `1.0.0`

- [ ] `apps/buybuddies` con `<bb-shell>` (props `basepath/route/env` + evento `mf:navigate`)
- [ ] `buybuddies/locales/{es,en}/buybuddies.json`
- [ ] Build remoto ESM en `/public/remotes/buybuddies/1.0.0/remote.js`
- [ ] `manifest`: canal `stable` → `1.0.0`

**Criterios de aceptación**

- [ ] `/apps/buybuddies` renderiza título/textos en idioma actual
- [ ] Botón de navegación interna emite `mf:navigate` (host actualiza URL)

## Hito 6 — Bar Manager (MVP esqueleto) `0.1.0`

- [ ] `<bar-shell>` + tema verde + `await i18n.ensure('bar')`
- [ ] Dominio mínimo: `Table`, `CatalogItem`, `Order` (interfaces)
- [ ] **Mock repos** + estados `loading/error/empty`
- [ ] Remoto `/public/remotes/bar-manager/0.1.0/remote.js` + `manifest`

**Criterios de aceptación**

- [ ] `/apps/bar-manager` se ve (hola mundo + i18n)

## Hito 7 — Delivery Manager (MVP esqueleto) `0.1.0`

- [ ] `<dlv-shell>` + tema naranja + `await i18n.ensure('delivery')`
- [ ] Dominio: `Order`, `Courier`, `Assignment` + FSM de estados básica
- [ ] **Mock repos** + listado simple
- [ ] Remoto `/public/remotes/delivery-manager/0.1.0/remote.js` + `manifest`

**Criterios de aceptación**

- [ ] `/apps/delivery-manager` se ve (hola mundo + i18n)

## Hito 8 — Comunicación entre apps (mínima)

- [ ] Event bus en host (`env.bus`) inyectado en shells
- [ ] Evento **Bar → Delivery**: `order.created` + deep-link a `/apps/delivery-manager/orders/:id`
- [ ] Evento **Delivery → Bar**: `delivery.completed` + toast + link de vuelta
- [ ] (Opcional) `BroadcastChannel` multi-pestaña

**Criterios de aceptación**

- [ ] Desde Bar se abre una orden concreta en Delivery
- [ ] Desde Delivery se notifica y enlaza de vuelta a Bar

## Hito 9 — Datos con Sheets (o BFF opcional)

- [ ] Reglas: acceso a datos **solo** en repos/servicios; mocks por defecto si no hay creds
- [ ] Definidos **schemas** por app con `schemaVersion`, `createdAt`, `updatedAt`
- [ ] Hoja `events` (outbox) creada
- [ ] (Opcional) BFF único namespaced `/api/<slug>/v1/**` para proteger secretos

**Criterios de aceptación**

- [ ] Front funciona con mocks; si hay creds, con Sheets sin tocar UI

## Hito 10 — CI/CD y Vercel

- [ ] Workflow GitHub (`pnpm install --frozen-lockfile` + `prebuild` + `test:e2e` + `build`)
- [ ] Vercel: install/build configurados + rewrite deep-links
- [ ] Validación de manifest en CI (todas las `entry` existen)

**Criterios de aceptación**

- [ ] CI verde en PRs
- [ ] Deploy en Vercel abre `/` y deep-links funcionan

## Hito 11 — Tests mínimos

- [ ] Vitest: loader del host (ok/error/timeout), i18n (setLocale/ensure/t), repos (mocks/errores)
- [ ] Playwright: portfolio navega a cada app; i18n persiste; deep-link directo

**Criterios de aceptación**

- [ ] `pnpm run test:unit` y `pnpm run test:e2e` en verde

## Hito 12 — Releases por manifest (canales)

- [ ] Script de release por app (`build:remote` + copia a `/public/remotes/<slug>/<semver>/remote.js`)
- [ ] `manifest` con `stable/beta/canary` y soporte `?channel` / `?v=1.2.3`
- [ ] Procedimiento de **rollback** documentado

**Criterios de aceptación**

- [ ] Probar `beta` y promocionar a `stable` sin tocar otras apps
- [ ] Rollback funcional cambiando el manifest

## Hito 13 — Accesibilidad y rendimiento

- [ ] Roles/labels correctos; foco visible; toasts con `aria-live`
- [ ] Layouts toleran textos EN (más largos)
- [ ] Split por microapp/idioma; assets optimizados

**Criterios de aceptación**

- [ ] Revisión manual con teclado y lectura de pantalla básica
- [ ] LCP razonable en `/` (host ligero)

## Hito 14 — Documentación

- [ ] `PROMPT_MAESTRO.md` (v2 sin Codex)
- [ ] `CONTRIBUTING.md` (scripts, releases, i18n, canales)
- [ ] `docs/i18n.md` (claves, namespaces, placeholders, plural)
- [ ] `docs/events-v1.md` (lista de eventos y payloads)
- [ ] `docs/schemas-sheets.md` (columnas por app)
- [ ] `CHANGELOG.md` por app (si usas Changesets, anótalo)

**Criterios de aceptación**

- [ ] Onboarding: alguien con Node/pnpm puede levantar el repo en 10 min

## Hito 15 — Mantenimiento

- [ ] Política de retención de remotos (N estables, M betas)
- [ ] Job de limpieza de versiones no referenciadas por `manifest`
- [ ] Revisión trimestral de deps, tokens y cobertura de i18n

**Criterios de aceptación**

- [ ] `manifest` no referencia artefactos inexistentes
- [ ] No hay claves i18n “huérfanas” en vistas críticas

### Notas rápidas

- **No mezclas UI con datos**: acceso a Sheets/BFF solo en repos/servicios.
- **Cada app es independiente**: builda su `remote.js`; el host decide **qué** cargar.
- **Idioma global**: el host manda (`bb.locale.changed.v1`); microapps se actualizan.
- **Rollback exprés**: cambia `stable` en el `manifest`.
