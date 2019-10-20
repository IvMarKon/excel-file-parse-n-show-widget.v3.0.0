<script lang = "ts" >
import Vue from "vue";
import Component from "vue-class-component";
import Excel, {Workbook} from 'exceljs';

@Component({})
export default class ExcelParser extends Vue {
    titleNames = ['', 'Дата', 'Количиество комнат', 'Быт. район', 'Улица', 'Этаж', 'Этажность', 'Х-ка здания', 'S общая', 'S жилая', 'S кухни', 'Состояние', 'Цена общая', 'Цена за 1м', 'Объявление', 'Источник', 'Срочно/торг', 'Мебель'];
    static workbook = new Excel.Workbook();

    async readAndParseEcxel(fileName: string) {
        const data = await ExcelParser.workbook.xlsx.readFile('./test.xlsx');
        const workSheet = data.getWorksheet('ИСХОДНЫЕ И РАССЧИТАННЫЕ ДАННЫЕ');
        const rowLength = workSheet.rowCount;
        const response: { [name: string]: any } = {};
        let name = "undefined";
        let subName = "undefined";
        for (let index = 1; index <= rowLength; index++) {
            if (workSheet.getRow(index).cellCount === 1) {
                if (workSheet.getRow(index + 1).cellCount === 1) {
                    name = workSheet.getRow(index).getCell(1).value!.toString();
                    response[name] = {};
                    subName = workSheet.getRow(index + 1).getCell(1).value!.toString();
                    response[name][subName] = [];
                    index += 2;
                    continue;
                }
                subName = workSheet.getRow(index++).getCell(1).value!.toString();
                response[name][subName] = [];
            }
            if (workSheet.getRow(index).cellCount >= 17) {
                const rawInfo: { [name: string]: string | null } = {};
                for (let subIndex = 1; subIndex <= 17; subIndex++) {
                    const value = workSheet.getRow(index).getCell(subIndex).value;
                    rawInfo[this.titleNames[subIndex]] = value ? value.toString() : null;
                }
                response[name][subName].push(rawInfo);
            }
        }
        return response;
    }
}
</script>
