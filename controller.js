const fastcsv = require('fast-csv');
const csv = require('csv-parser');
const fs = require('fs')

/* Get server time */
exports.getTime = () => {
    return new Date();
}

/* sum return sum of a,b,c */
exports.sum = (a = 0, b = 0, c = 0) => {
    let aInt = parseInt(a)
    let bInt = parseInt(b)
    let cInt = parseInt(c)
    return aInt + bInt + cInt;
}

/* write to csv file */
exports.writeLog = async (data) => {

    // Use csv-writer
    // Ref: https://www.npmjs.com/package/csv-writer
    // const createCsvWriter = require('csv-writer').createObjectCsvWriter; // (1)
    const createCsvWriter = require('csv-writer').createArrayCsvWriter; // (2) Write array
    const csvWriter = createCsvWriter({     // สร้างตัวที่จะมาเขียนไฟล์ของเรา
        path: 'out.csv',
        header: [
            { id: 'a', title: 'A' },
            { id: 'b', title: 'B' },
            { id: 'sum', title: 'Sum' },
            { id: 'name', title: 'Name' },
        ],
        append: true,
    });

    // ข้อมูลที่ต้องการเขียนลงไฟล์
    // const dataWrite = [
    //     {
    //         result: 1,
    //     }
    // ];
    const dataWrite = [
        {
            a: 1,
            b: 2,
            sum: 3,
            name: "tom"
        }
    ];

    console.log('type of (2):', dataWrite);

    // ทำการเขียนลงไฟล์ (promise)
    // csvWriter
    //     // .writeRecords(dataWrite) //(1)
    //     .writeRecords([data]) //(2) write array
    //     .then(() => console.log('The CSV file was written successfully'));

    // ทำการเขียนลงไฟล์ (async/await)
    await csvWriter.writeRecords([data]);
    console.log('The CSV file was written successfully');
}

exports.readCSV = (res) => {
    let out = [];
    let total = 0;
    fs.createReadStream('out.csv')
        .pipe(csv()) // เรียกใช้ csv parser ทำให้มันสามารถอ่าน .csv ได้
        .on('data', (row) => {
            // การประกาศและกำหนดค่าให้ object (1)
            let line = {
                a: row.a,
                b: row.b,
                sum: row.sum,
                name: row.name,
            }

            // การประกาศและกำหนดค่าให้ object (2)
            let ob = {};
            ob.a = row.a;
            ob.b = row.b;
            ob.sum = row.sum;
            ob.name = row.name;

            // เพิ่ม object เข้าไปใน array
            out.push(line);

            // total sum
            total += parseFloat(row.a) + parseFloat(row.b) + parseFloat(row.sum);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');

            out.push({ total: total }); // add data to array
            res.send(out); // เมื่ออ่านไฟล์เสร็จแล้ว ทำการส่ง response กลับไป
            // return out;
        });

} 