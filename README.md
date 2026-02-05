# 🎭 Agenda Maceió

**Descubra os melhores eventos de entretenimento e cultura da capital alagoana.**

[![Deploy to GitHub Pages](https://github.com/marceloalcantara/agenda.maceio.br/actions/workflows/deploy.yml/badge.svg)](https://github.com/marceloalcantara/agenda.maceio.br/actions/workflows/deploy.yml)

🌐 **Site:** [https://agenda.maceio.br](https://agenda.maceio.br)

---

## 📋 Sobre o Projeto

Agenda Maceió é uma plataforma web para descobrir eventos culturais e de entretenimento em Maceió, Alagoas. O site permite filtrar eventos por categoria, data e busca textual.

### ✨ Funcionalidades

- 🎪 **Carrossel de Destaques** - Eventos em destaque com navegação interativa
- 🏷️ **Filtros por Categoria** - Shows, Teatro, Festival, Stand-up, Exposição, Cinema, Dança, Barzinho
- 📅 **Filtros por Data** - Hoje, Amanhã, Esta semana, Fim de semana, Próxima semana, Qualquer data
- 🔍 **Busca** - Pesquisa por título, local ou descrição
- 📱 **Responsivo** - Design adaptável para mobile e desktop
- ♿ **Acessível** - Navegação por teclado e suporte a leitores de tela

---

## 🛠️ Tecnologias

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS 4** - Estilização utilitária
- **React Router** - Roteamento SPA
- **Lucide React** - Ícones

---

## 🚀 Desenvolvimento Local

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/marceloalcantara/agenda.maceio.br.git
cd agenda.maceio.br

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

> ⚠️ **Importante:** Antes de executar qualquer comando, certifique-se de estar no diretório correto da aplicação:
> ```bash
> cd /caminho/para/agenda.maceio.br
> ```

O site estará disponível em `http://localhost:5173`

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa o ESLint |

---

## 📦 Deploy

O deploy é automatizado via **GitHub Actions** para o **GitHub Pages**.

### Deploy Automático

Cada push na branch `main` dispara automaticamente:
1. Build do projeto com Vite
2. Deploy para GitHub Pages
3. Publicação no domínio personalizado

### Configuração do Domínio

O site utiliza o domínio personalizado `agenda.maceio.br`. Para configurar:

1. **Registros DNS** (no provedor do domínio):
   ```
   Tipo A:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. **GitHub Settings** (Settings > Pages):
   - Source: GitHub Actions
   - Custom domain: `agenda.maceio.br`
   - Enforce HTTPS: ✅

---

## 📁 Estrutura do Projeto

```
agenda.maceio.br/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── public/
│   ├── CNAME              # Domínio personalizado
│   ├── 404.html           # Redirect para SPA
│   └── logo.svg           # Logo do site
├── src/
│   ├── components/        # Componentes React
│   ├── data/              # Dados dos eventos (JSON)
│   ├── hooks/             # Hooks customizados
│   ├── pages/             # Páginas da aplicação
│   ├── types/             # Tipos TypeScript
│   └── utils/             # Funções utilitárias
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📧 Contato

Feito com ♥ para a comunidade maceioense.

**Agenda Maceió** - Conectando você aos melhores eventos da cidade.
