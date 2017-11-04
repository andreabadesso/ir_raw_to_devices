let CODES_FOLDER = __dirname + '/../irdb/codes'
let fs = require('fs')
let parse = require('csv-parse/lib/sync')


let folders = fs.readdirSync(CODES_FOLDER)
    
folders.forEach(folder => {
    let deviceName = folder
    let subFolders = fs.readdirSync(`${CODES_FOLDER}/${deviceName}`)

    subFolders.forEach(subFolder => {
        let files = fs.readdirSync(`${CODES_FOLDER}/${deviceName}/${subFolder}`)
        files.forEach(file => {
            let data = fs.readFileSync(`${CODES_FOLDER}/${deviceName}/${subFolder}/${file}`, 'utf-8')
            let commands = parse(data, {
                columns: true,
                relax_column_count: true,
                relax: true
            })

            commands.forEach((command) => {
                console.log(`INSERT INTO ir_data (functionname, protocol, device, subdevice, fn, device_name, subdevice_name) VALUES ('${command.functionname}', '${command.protocol}', '${command.device}', '${command.subdevice}', '${command.function}', '${deviceName}', '${subFolder}');`)
            })
        })
    })
})
