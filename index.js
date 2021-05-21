const parser = require('vmfparser');
const fs = require('fs');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

fs.readFile('./kvildal_001.vmf_autosave', (err, data) => {
    if(err) {
        return console.error(err);
    }

    const str = data.toString();
    const parsed = parser(str).entity;
    const entities = parser(str).entity;
    const prop_statics = entities.filter(entity => entity.classname === 'prop_static').map(entity => {
        const origin = entity.origin;
        const [x, y, z] = origin.split(' ');
        entity.x = x;
        entity.y = y;
        entity.z = z;
        return entity;
    });
    const first_prop_static = prop_statics[0]
    const headers = []
    for (const [key, value] of Object.entries(first_prop_static)) {
        headers.push({
            id: key, title: key,
        })
    }

    console.log(entities);
    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: headers
    });
    csvWriter
        .writeRecords(entities.filter(entity => entity.classname === 'prop_static'))
        .then(()=> console.log('The CSV file was written successfully'));
});
