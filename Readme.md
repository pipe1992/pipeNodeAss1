# Node - Assigment 1
## Felipe Estrada

### 1. Require Dependencies

First I used path in orden to guarantee the correct paths in either Mac/Linux or Windows, then i used fs to read the input csv file and write the output JSON file.

```
const path = require('path')
const fs = require('fs')
const csvFilePath = path.join(__dirname, 'customer-data.csv')
const jsonFilePath = path.join(__dirname, 'customer-data.json')
```

### 2. Read File

Second I created a method readFile with the path of the CSV file as its parameter, reading the file creating a readble = fs.createReadStream(filePath), and reading the file using emmiters.

> First Challenge
Spliting the file into its corresponding lines, since the chunk's were much bigger than just one line, but a simple buffer and a buff.split('\r\n').

Then I just took the first line as the headers for any csv that may be passed, then send the headers and the array to createJSON file.

```
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
```

### 3. Create JSON 

I iterate though the file, then split it and created each record with its headers, creating a single array with the 1000 records

```
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
```

### 4. Testing

I checked there were 1000 new records in the JSON file, with the spected structure and analyzing there were no repeated records