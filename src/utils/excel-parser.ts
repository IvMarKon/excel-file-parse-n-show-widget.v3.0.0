import Excel, { Workbook } from 'exceljs';

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
  const data = await workbook.xlsx.readFile('./test.xlsx');
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

export default readAndParseEcxel;
