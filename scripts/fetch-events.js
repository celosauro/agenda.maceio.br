/**
 * Script para buscar eventos de uma planilha Google Sheets privada
 * 
 * Estrutura esperada da planilha (colunas):
 * A: id
 * B: title
 * C: category (SHOW, TEATRO, FESTIVAL, STANDUP, EXPOSICAO, CINEMA, DANCA, BARZINHO)
 * D: thumbnail (URL da imagem)
 * E: date (formato: YYYY-MM-DD)
 * F: time (formato: HH:MM) - opcional
 * G: description
 * H: location (nome do local)
 * I: address (endereço completo)
 * J: price (número ou vazio para gratuito)
 * K: ticketUrl (URL para compra de ingressos) - opcional
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Eventos';
const CREDENTIALS = process.env.GOOGLE_CREDENTIALS;

if (!SPREADSHEET_ID) {
  console.error('❌ GOOGLE_SPREADSHEET_ID não definido');
  process.exit(1);
}

if (!CREDENTIALS) {
  console.error('❌ GOOGLE_CREDENTIALS não definido');
  process.exit(1);
}

async function fetchEventsFromSheet() {
  try {
    console.log('🔄 Iniciando busca de eventos...');

    // Parse das credenciais
    const credentials = JSON.parse(CREDENTIALS);

    // Autenticação com conta de serviço
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Buscar dados da planilha
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:K`, // Começa da linha 2 (pula cabeçalho)
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log('⚠️ Nenhum evento encontrado na planilha');
      return [];
    }

    console.log(`📋 ${rows.length} eventos encontrados`);

    // Mapear dados para o formato esperado
    const events = rows
      .filter(row => row[0] && row[1] && row[4]) // id, title e date são obrigatórios
      .map((row, index) => {
        const price = row[9] ? parseFloat(row[9]) : null;
        
        return {
          id: row[0] || `event-${index + 1}`,
          title: row[1] || '',
          category: (row[2] || 'SHOW').toUpperCase(),
          thumbnail: row[3] || '',
          date: row[4] || '',
          time: row[5] || null,
          description: row[6] || '',
          location: row[7] || '',
          address: row[8] || '',
          price: price,
          ticketUrl: row[10] || null,
        };
      })
      // Ordenar por data
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return events;
  } catch (error) {
    console.error('❌ Erro ao buscar eventos:', error.message);
    throw error;
  }
}

async function main() {
  try {
    const events = await fetchEventsFromSheet();

    // Caminho do arquivo de saída
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'events.json');

    // Garantir que o diretório existe
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Salvar arquivo JSON
    fs.writeFileSync(outputPath, JSON.stringify(events, null, 2), 'utf-8');

    console.log(`✅ ${events.length} eventos salvos em ${outputPath}`);
  } catch (error) {
    console.error('❌ Falha ao processar eventos:', error);
    process.exit(1);
  }
}

main();
