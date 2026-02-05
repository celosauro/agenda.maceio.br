# 📊 Configuração do Google Sheets como Fonte de Eventos

Este guia explica como configurar uma planilha Google Sheets privada como fonte de dados para os eventos.

## 🔐 Passo 1: Criar uma Conta de Serviço no Google Cloud

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs & Services** > **Enable APIs and Services**
4. Busque e ative a **Google Sheets API**
5. Vá em **APIs & Services** > **Credentials**
6. Clique em **Create Credentials** > **Service Account**
7. Preencha os dados e clique em **Create**
8. Pule as permissões opcionais e clique em **Done**
9. Clique na conta de serviço criada
10. Vá na aba **Keys** > **Add Key** > **Create new key**
11. Selecione **JSON** e clique em **Create**
12. Um arquivo JSON será baixado - **guarde-o com segurança!**

## 📋 Passo 2: Criar a Planilha

1. Crie uma nova planilha no [Google Sheets](https://sheets.google.com/)
2. Renomeie a primeira aba para **Eventos** (ou outro nome de sua escolha)
3. Configure o cabeçalho na **linha 1** com as seguintes colunas:

| Coluna | Nome | Descrição | Obrigatório |
|--------|------|-----------|-------------|
| A | id | Identificador único do evento | ✅ |
| B | title | Título do evento | ✅ |
| C | category | Categoria (ver lista abaixo) | ✅ |
| D | thumbnail | URL da imagem | ❌ |
| E | date | Data (YYYY-MM-DD) | ✅ |
| F | time | Horário (HH:MM) | ❌ |
| G | description | Descrição do evento | ❌ |
| H | location | Nome do local | ✅ |
| I | address | Endereço completo | ❌ |
| J | price | Preço (número) ou vazio se gratuito | ❌ |
| K | ticketUrl | Link para compra de ingressos | ❌ |

### Categorias válidas:
- `SHOW`
- `TEATRO`
- `FESTIVAL`
- `STANDUP`
- `EXPOSICAO`
- `CINEMA`
- `DANCA`
- `BARZINHO`

### Exemplo de dados:

| id | title | category | thumbnail | date | time | description | location | address | price | ticketUrl |
|----|-------|----------|-----------|------|------|-------------|----------|---------|-------|-----------|
| 1 | Show do Alceu | SHOW | https://... | 2026-02-15 | 20:00 | Grande show... | Teatro Deodoro | Praça Marechal Deodoro | 80 | https://... |
| 2 | Peça Teatral | TEATRO | https://... | 2026-02-20 | 19:30 | Comédia... | Teatro Gustavo Leite | Rua do Livramento | | |

## 🔗 Passo 3: Compartilhar a Planilha com a Conta de Serviço

1. Abra o arquivo JSON baixado no Passo 1
2. Copie o valor do campo `client_email` (algo como `nome@projeto.iam.gserviceaccount.com`)
3. Na sua planilha, clique em **Compartilhar**
4. Cole o email da conta de serviço
5. Dê permissão de **Leitor** (Viewer)
6. Desmarque "Notificar pessoas" e clique em **Compartilhar**

⚠️ **Importante**: A planilha permanece privada! Só a conta de serviço terá acesso.

## ⚙️ Passo 4: Configurar os Secrets no GitHub

1. Vá no seu repositório no GitHub
2. Acesse **Settings** > **Secrets and variables** > **Actions**
3. Adicione os seguintes secrets:

### `GOOGLE_SPREADSHEET_ID`
- O ID da planilha está na URL:
- `https://docs.google.com/spreadsheets/d/`**`SEU_ID_AQUI`**`/edit`

### `GOOGLE_SHEET_NAME` (opcional)
- Nome da aba da planilha (padrão: `Eventos`)

### `GOOGLE_CREDENTIALS`
- Abra o arquivo JSON baixado no Passo 1
- Copie **todo o conteúdo** do arquivo
- Cole como valor do secret

## 🚀 Passo 5: Testar a Sincronização

1. Vá em **Actions** no seu repositório
2. Selecione o workflow **Sync Events from Google Sheets**
3. Clique em **Run workflow** > **Run workflow**
4. Aguarde a execução e verifique se foi bem-sucedida

## ⏰ Sincronização Automática

O workflow está configurado para executar automaticamente:
- A cada 6 horas
- Manualmente via GitHub Actions

Para alterar a frequência, edite o arquivo `.github/workflows/sync-events.yml`:

```yaml
schedule:
  - cron: '0 */6 * * *'  # A cada 6 horas
  # - cron: '0 */2 * * *'  # A cada 2 horas
  # - cron: '0 8,20 * * *'  # Às 8h e 20h
```

## 🔧 Executar Localmente (Desenvolvimento)

Para testar localmente:

1. Crie um arquivo `.env` na raiz do projeto:
```env
GOOGLE_SPREADSHEET_ID=seu_id_da_planilha
GOOGLE_SHEET_NAME=Eventos
GOOGLE_CREDENTIALS={"type":"service_account",...}
```

2. Instale as dependências:
```bash
npm install googleapis
```

3. Execute o script:
```bash
node scripts/fetch-events.js
```

## ❓ Solução de Problemas

### Erro: "The caller does not have permission"
- Verifique se compartilhou a planilha com o email da conta de serviço

### Erro: "Unable to parse range"
- Verifique se o nome da aba está correto no secret `GOOGLE_SHEET_NAME`

### Erro: "API has not been used in project"
- Ative a Google Sheets API no Google Cloud Console

### Eventos não aparecem
- Verifique se as colunas obrigatórias (id, title, date) estão preenchidas
- Verifique se a data está no formato correto (YYYY-MM-DD)
