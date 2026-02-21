# Validação de SEO — Agenda Maceió

Documentação para validação da otimização de SEO implementada em `agenda.maceio.br`.

---

## 1. Checklist de Implementação

### index.html — Meta Tags

| Item | Status | Detalhe |
|------|--------|---------|
| `<html lang="pt-BR">` | ✅ | Idioma definido corretamente |
| `<title>` (máx 60 chars) | ✅ | "Agenda Maceió - Eventos, Shows e Cultura" (42 chars) |
| `<meta name="description">` (máx 160 chars) | ✅ | 130 caracteres, contém palavras-chave |
| `<meta name="keywords">` | ✅ | 8 palavras-chave relevantes |
| `<meta name="author">` | ✅ | "Agenda Maceió" |
| `<meta name="robots">` | ✅ | `index, follow` |
| `<link rel="canonical">` | ✅ | `https://agenda.maceio.br/` |
| `<meta name="geo.region">` | ✅ | `BR-AL` |
| `<meta name="geo.placename">` | ✅ | `Maceió` |

### index.html — Open Graph (Facebook/LinkedIn)

| Tag | Status | Valor |
|-----|--------|-------|
| `og:type` | ✅ | `website` |
| `og:url` | ✅ | `https://agenda.maceio.br/` |
| `og:title` | ✅ | "Agenda Maceió - Eventos, Shows e Cultura" |
| `og:description` | ✅ | Descrição com palavras-chave |
| `og:image` | ✅ | `https://agenda.maceio.br/og-image.png` |
| `og:image:width` | ✅ | `1200` |
| `og:image:height` | ✅ | `630` |
| `og:locale` | ✅ | `pt_BR` |
| `og:site_name` | ✅ | `Agenda Maceió` |

### index.html — Twitter Cards

| Tag | Status | Valor |
|-----|--------|-------|
| `twitter:card` | ✅ | `summary_large_image` |
| `twitter:title` | ✅ | "Agenda Maceió - Eventos, Shows e Cultura" |
| `twitter:description` | ✅ | Descrição com palavras-chave |
| `twitter:image` | ✅ | `https://agenda.maceio.br/og-image.png` |

### index.html — Theme Color & Favicons

| Item | Status | Valor |
|------|--------|-------|
| `<meta name="theme-color">` | ✅ | `#0ea5e9` |
| `<meta name="msapplication-TileColor">` | ✅ | `#0ea5e9` |
| `favicon.svg` (SVG) | ✅ | `/favicon.svg` |
| `favicon-32x32.png` (PNG 32×32) | ✅ | `/favicon-32x32.png` |
| `apple-touch-icon.png` (PNG 180×180) | ✅ | `/apple-touch-icon.png` |

### index.html — Structured Data (JSON-LD)

| Schema | Status | Descrição |
|--------|--------|-----------|
| `WebSite` | ✅ | Nome, URL, descrição, idioma |
| `WebApplication` | ✅ | Categoria `EntertainmentApplication`, preço gratuito |

### index.html — Conteúdo Estático

| Item | Status | Descrição |
|------|--------|-----------|
| `<noscript>` fallback | ✅ | `<h1>`, descrição, lista de categorias, aviso de JS |

### Arquivos em public/

| Arquivo | Status | Tamanho | Descrição |
|---------|--------|---------|-----------|
| `robots.txt` | ✅ | ~69 B | `Allow: /` + referência ao sitemap |
| `sitemap.xml` | ✅ | ~266 B | URL principal, `changefreq: daily`, `priority: 1.0` |
| `og-image.png` | ✅ | ~90 KB | 1200×630, gradiente sky-blue com ícone de calendário |
| `og-image.svg` | ✅ | ~3 KB | Fonte SVG da imagem OG |
| `favicon.svg` | ✅ | ~1.1 KB | Ícone de calendário estilizado |
| `favicon-32x32.png` | ✅ | ~1 KB | PNG 32×32 |
| `apple-touch-icon.png` | ✅ | ~7.4 KB | PNG 180×180 |
| `404.html` | ✅ | ~2.4 KB | Página de erro com `noindex`, redirect, design branded |

### Componentes React

| Item | Status | Arquivo | Descrição |
|------|--------|---------|-----------|
| `<h1>` único com keyword | ✅ | `HomePage.tsx` | "Eventos em Maceió" |
| Texto introdutório SEO | ✅ | `HomePage.tsx` | Parágrafo com palavras-chave principais |
| Hierarquia de headings | ✅ | `EventList.tsx` | `<h2>` para "Próximos Eventos" (era `<h3>`) |
| Footer com créditos | ✅ | `HomePage.tsx` | Footer já existente com `© 2026 Agenda Maceió` |

---

## 2. Validação Local

### Build de Produção

```bash
npm run build
```

**Resultado esperado:** Build sem erros, `dist/` contém todos os arquivos.

### Verificar Arquivos no Build

```bash
ls -la dist/
```

**Arquivos obrigatórios no `dist/`:**

```
dist/
├── 404.html
├── apple-touch-icon.png
├── CNAME
├── favicon-32x32.png
├── favicon.svg
├── index.html
├── logo.svg
├── og-image.png
├── og-image.svg
├── robots.txt
├── sitemap.xml
└── assets/
    ├── index-*.css
    └── index-*.js
```

### Verificar Meta Tags no HTML

```bash
# Verificar title
grep '<title>' dist/index.html

# Verificar meta description
grep 'name="description"' dist/index.html

# Verificar Open Graph
grep 'og:' dist/index.html

# Verificar JSON-LD
grep 'application/ld+json' dist/index.html

# Verificar noscript
grep '<noscript>' dist/index.html
```

### Verificar robots.txt

```bash
cat dist/robots.txt
```

**Resultado esperado:**
```
User-agent: *
Allow: /
Sitemap: https://agenda.maceio.br/sitemap.xml
```

### Verificar sitemap.xml

```bash
cat dist/sitemap.xml
```

**Resultado esperado:** XML válido com `<loc>https://agenda.maceio.br/</loc>`.

### Testar Localmente com Preview

```bash
npm run preview
# Acessar http://localhost:4173
```

Verificar:
- `http://localhost:4173/robots.txt` — acessível
- `http://localhost:4173/sitemap.xml` — acessível
- `http://localhost:4173/og-image.png` — imagem correta (1200×630)
- `http://localhost:4173/favicon.svg` — ícone correto
- View Source (`Cmd+U`) — meta tags visíveis

---

## 3. Validação com Lighthouse (Chrome DevTools)

### Como executar

1. Abrir `https://agenda.maceio.br` no Chrome
2. Abrir DevTools (`Cmd+Option+I`)
3. Ir para aba **Lighthouse**
4. Selecionar categoria **SEO**
5. Selecionar dispositivo **Mobile**
6. Clicar em **Analyze page load**

### Score esperado: ≥ 90

### Critérios verificados pelo Lighthouse

| Critério | Esperado |
|----------|----------|
| Document has a `<title>` element | ✅ Pass |
| Document has a meta description | ✅ Pass |
| Page has successful HTTP status code | ✅ Pass |
| Document has a valid `hreflang` | ✅ N/A |
| Document has a valid `rel=canonical` | ✅ Pass |
| Document avoids plugins | ✅ Pass |
| Page is mobile friendly | ✅ Pass |
| `<html>` element has a `lang` attribute | ✅ Pass |
| `<meta name="viewport">` tag present | ✅ Pass |
| Document uses legible font sizes | ✅ Pass |
| Tap targets are sized appropriately | ✅ Pass |
| robots.txt is valid | ✅ Pass |
| Image elements have `alt` attributes | ✅ Pass |
| Links have descriptive text | ✅ Pass |

---

## 4. Validação com Ferramentas Externas

### Open Graph

| Ferramenta | URL | O que verificar |
|------------|-----|-----------------|
| **opengraph.xyz** | https://opengraph.xyz | Preview do card OG (título, descrição, imagem) |
| **Facebook Debugger** | https://developers.facebook.com/tools/debug/ | Scrape da URL e cache OG do Facebook |

**Como testar:**
1. Acessar a ferramenta
2. Inserir `https://agenda.maceio.br`
3. Verificar que título, descrição e imagem aparecem corretamente

**Resultado esperado:**
- Título: "Agenda Maceió - Eventos, Shows e Cultura"
- Descrição: "Descubra os melhores eventos de Maceió..."
- Imagem: 1200×630 com gradiente azul e ícone de calendário

### Twitter Cards

| Ferramenta | URL | O que verificar |
|------------|-----|-----------------|
| **Twitter Card Validator** | https://cards-dev.twitter.com/validator | Preview do card no Twitter/X |

**Resultado esperado:** Card `summary_large_image` com título, descrição e imagem.

### Structured Data (JSON-LD)

| Ferramenta | URL | O que verificar |
|------------|-----|-----------------|
| **Rich Results Test** | https://search.google.com/test/rich-results | Schemas `WebSite` e `WebApplication` válidos |
| **Schema Validator** | https://validator.schema.org | Validação Schema.org |

**Como testar:**
1. Acessar o Rich Results Test
2. Inserir `https://agenda.maceio.br`
3. Verificar que detecta os schemas `WebSite` e `WebApplication`

**Resultado esperado:** Sem erros, ambos os schemas reconhecidos.

### Robots e Sitemap

| Ferramenta | URL | O que verificar |
|------------|-----|-----------------|
| **Google Search Console** | https://search.google.com/search-console | Submeter sitemap, verificar cobertura |

**Verificar que:**
- `https://agenda.maceio.br/robots.txt` retorna status 200
- `https://agenda.maceio.br/sitemap.xml` retorna XML válido
- Sitemap submetido no Search Console é aceito

---

## 5. Validação de Acessibilidade SEO

### Headings

Hierarquia correta no `HomePage`:

```
<h1> Eventos em Maceió           ← único h1 da página
  <h2> Próximos Eventos          ← seção principal
    <h3> [Nome do evento]        ← cards individuais (EventCard)
  <h4> Categorias Populares      ← footer
  <h4> Sobre                     ← footer
```

### Verificar hierarquia via DevTools

```javascript
// Rodar no Console do navegador:
document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
  console.log(`${h.tagName}: ${h.textContent.trim().substring(0, 50)}`);
});
```

---

## 6. Checklist Pré-Deploy

```
✅ npm run build sem erros
✅ dist/ contém todos os arquivos SEO
✅ View Source mostra meta tags no <head>
✅ robots.txt acessível em /robots.txt
✅ sitemap.xml acessível em /sitemap.xml
✅ og-image.png acessível em /og-image.png (1200×630)
✅ favicon.svg acessível em /favicon.svg
✅ 404.html tem meta noindex e redirect
✅ Único <h1> na HomePage
✅ JSON-LD válido (WebSite + WebApplication)
✅ <noscript> com conteúdo legível por crawlers
```

---

## 7. Checklist Pós-Deploy

```
☐ Lighthouse SEO score ≥ 90
☐ opengraph.xyz mostra preview correto
☐ Facebook Debugger faz scrape sem erros
☐ Rich Results Test valida schemas JSON-LD
☐ robots.txt acessível em produção
☐ sitemap.xml acessível em produção
☐ Sitemap submetido no Google Search Console
☐ Favicon aparece corretamente na aba do navegador
☐ apple-touch-icon funciona ao adicionar à tela inicial (iOS)
```

---

## 8. Manutenção

| Ação | Frequência | Arquivo |
|------|-----------|---------|
| Atualizar `<lastmod>` no sitemap | A cada deploy | `public/sitemap.xml` |
| Revisar meta description | Mensal | `index.html` |
| Verificar Lighthouse score | Mensal | Chrome DevTools |
| Limpar cache OG do Facebook | Após atualizar imagem | Facebook Debugger |
| Verificar Search Console | Semanal | Google Search Console |

### Comando para atualizar data do sitemap

```bash
# Atualiza lastmod com a data atual
sed -i '' "s|<lastmod>.*</lastmod>|<lastmod>$(date +%Y-%m-%d)</lastmod>|" public/sitemap.xml
```

---

## 9. Referência Rápida — Arquivos SEO

```
agenda.maceio.br/
├── index.html                  ← Meta tags, JSON-LD, noscript
├── public/
│   ├── 404.html                ← Erro 404 (noindex + redirect)
│   ├── apple-touch-icon.png    ← 180×180 PNG
│   ├── favicon.svg             ← Ícone SVG
│   ├── favicon-32x32.png       ← 32×32 PNG
│   ├── og-image.svg            ← Fonte da imagem OG
│   ├── og-image.png            ← 1200×630 PNG
│   ├── robots.txt              ← Diretivas para crawlers
│   └── sitemap.xml             ← Mapa do site
└── src/
    ├── pages/
    │   └── HomePage.tsx        ← <h1> + texto introdutório SEO
    └── components/
        └── EventList.tsx       ← <h2> hierarquia correta
```
