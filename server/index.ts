import * as http from 'http';

import * as Excel from 'exceljs';

const titleNames = [
  '',
  'Дата',
  'Количиество комнат',
  'Быт. район',
  'Улица',
  'Этаж',
  'Этажность',
  'Х-ка здания',
  'S общая',
  'S жилая',
  'S кухни',
  'Состояние',
  'Цена общая',
  'Цена за 1м',
  'Объявление',
  'Источник',
  'Срочно/торг',
  'Мебель'
];

const readAndParseEcxel = async (fileName: string) => {
  const workbook = new Excel.Workbook();
  const data = await workbook.xlsx.readFile(fileName);
  const workSheet = data.getWorksheet('ИСХОДНЫЕ И РАССЧИТАННЫЕ ДАННЫЕ');
  const rowLength = workSheet.rowCount;
  const response: { [name: string]: any } = {};
  let name = 'undefined';
  let subName = 'undefined';
  for (let index = 1; index <= rowLength; index++) {
    if (workSheet.getRow(index).cellCount === 1) {
      if (workSheet.getRow(index + 1).cellCount === 1) {
        name = workSheet
          .getRow(index)
          .getCell(1)
          .value!.toString();
        response[name] = {};
        subName = workSheet
          .getRow(index + 1)
          .getCell(1)
          .value!.toString();
        response[name][subName] = [];
        index += 2;
        continue;
      }
      subName = workSheet
        .getRow(index++)
        .getCell(1)
        .value!.toString();
      response[name][subName] = [];
    }
    if (workSheet.getRow(index).cellCount >= 17) {
      const rawInfo: { [name: string]: string | null } = {};
      for (let subIndex = 1; subIndex <= 17; subIndex++) {
        const value = workSheet.getRow(index).getCell(subIndex).value;
        rawInfo[titleNames[subIndex]] = value ? value.toString() : null;
      }
      response[name][subName].push(rawInfo);
    }
  }
  return response;
};

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

    console.log(readAndParseEcxel('../upload/test.xlsx'));

    const responseBody = { message: 'hello' };

    response.write(JSON.stringify(responseBody));
    response.end();
  });
}).listen(8081);