const path = require('path')
const fs = require('fs')
const csvFilePath = path.join(__dirname, 'customer-data.csv')
const jsonFilePath = path.join(__dirname, 'customer-data.json')

const readFile = (path) => {
    let buff = ''
    var firstLine = ''
    const readable = fs.createReadStream(csvFilePath, 'utf-8')
    readable.on('data', (chunk) => {
        buff += chunk 
    })
    readable.on('end', () => {
        const array = buff.split('\r\n')
        colHeaders = array[0].split(',')
        array.splice(0,1)
        createJSON(colHeaders, array)
    })
    readable.on('error', (error) => {
        console.log(`The file reading failed because: ${error.message}`)
    })
}

const createJSON = (colHeaders, array) => {
    var res = []
    array.forEach((val) => {
        var model = {}
        val.split(",").forEach((val, index) => {
            model[colHeaders[index]] = val
        })
        res.push(model)
    })
    fs.writeFileSync(jsonFilePath, JSON.stringify(res, null, '\t'))
}

readFile(csvFilePath)