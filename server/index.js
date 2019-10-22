"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var http = require("http");
var Excel = require("exceljs");
var titleNames = [
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
var readAndParseEcxel = function (fileName) { return __awaiter(_this, void 0, void 0, function () {
    var workbook, data, workSheet, rowLength, response, name, subName, index, rawInfo, subIndex, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                workbook = new Excel.Workbook();
                return [4 /*yield*/, workbook.xlsx.readFile(fileName)];
            case 1:
                data = _a.sent();
                workSheet = data.getWorksheet('ИСХОДНЫЕ И РАССЧИТАННЫЕ ДАННЫЕ');
                rowLength = workSheet.rowCount;
                response = {};
                name = 'undefined';
                subName = 'undefined';
                for (index = 1; index <= rowLength; index++) {
                    if (workSheet.getRow(index).cellCount === 1) {
                        if (workSheet.getRow(index + 1).cellCount === 1) {
                            name = workSheet
                                .getRow(index)
                                .getCell(1)
                                .value.toString();
                            response[name] = {};
                            subName = workSheet
                                .getRow(index + 1)
                                .getCell(1)
                                .value.toString();
                            response[name][subName] = [];
                            index += 2;
                            continue;
                        }
                        subName = workSheet
                            .getRow(index++)
                            .getCell(1)
                            .value.toString();
                        response[name][subName] = [];
                    }
                    if (workSheet.getRow(index).cellCount >= 17) {
                        rawInfo = {};
                        for (subIndex = 1; subIndex <= 17; subIndex++) {
                            value = workSheet.getRow(index).getCell(subIndex).value;
                            rawInfo[titleNames[subIndex]] = value ? value.toString() : null;
                        }
                        response[name][subName].push(rawInfo);
                    }
                }
                return [2 /*return*/, response];
        }
    });
}); };
http.createServer(function (request, response) {
    var headers = request.headers, method = request.method, url = request.url;
    var body = [];
    request.on('error', function (err) {
        console.error(err);
    }).on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        response.on('error', function (err) {
            console.error(err);
        });
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        console.log(readAndParseEcxel('../upload/test.xlsx'));
        var responseBody = { message: 'hello' };
        response.write(JSON.stringify(responseBody));
        response.end();
    });
}).listen(8081);
