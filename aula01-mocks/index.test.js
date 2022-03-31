const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
    ;
(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        Date.prototype.getFullYear = () => 2020
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "id": 212,
                "name": "Filipe Nadai",
                "profession": "Js Developer",
                "birthDay": 1999
            },
            {
                "id": 32,
                "name": "Joao",
                "profession": "Js Expert",
                "birthDay": 1998
            },
            {
                "id": 332,
                "name": "Maria jose",
                "profession": "Java Dev",
                "birthDay": 1998
            }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))

    }
})()