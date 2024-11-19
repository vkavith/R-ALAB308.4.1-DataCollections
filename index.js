console.log(" Part 2: Expanding Functionality\n");

const csvData =
  "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";

let cell = "";
let row = [];
let result = [];

//Get number of columns from first row

let columnCnt = 0;
let firstRowDone = false;

for (let i = 0; i < csvData.length; i++) {
  let char = csvData[i];

  if (!firstRowDone && char === ",") {
    columnCnt++;
  }

  if (char === "\n") {
    if (!firstRowDone) {
      columnCnt++; //count until last column
      firstRowDone = true;
    }
    row.push(cell); // add last cell to row
    result.push(row); //add row to result
    row = [];
    cell = []; //reset cell
  } else if (char === ",") {
    row.push(cell); //add cell to row
    cell = ""; //reset cell
  } else {
    cell += char;
  }
}

//Handle Last row

if (cell) {
  row.push(cell);
  result.push(row);
}

console.log("Number of columns \n", columnCnt);
console.log("Two dimensional array \n", result);

console.log("\n Part 3: Transforming Data\n");
// Get headers from first row
const headers = result[0].map((header) => header.toLowerCase());

//Transform remaining rows into Objects
let objArray = result.slice(1).map((row) => {
  let obj = {};
  row.forEach((value, index) => {
    obj[headers[index]] = value;
  });
  return obj;
});

console.log(objArray);

console.log("\n Part 4: Sorting and Manipulating Data\n");

//Remove last element

objArray.pop();

//Insert object at index
objArray.splice(1, 0, {
  id: "48",
  name: "Barry",
  occupation: "Runner",
  age: "25",
});

//Add object to end
objArray.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });

console.log(" \n Updated Array\n", objArray);

//Calculate average age within Array

let totAge = 0;
for (let i = 0; i < objArray.length; i++) {
  totAge += parseInt(objArray[i].age);
}

let avgAge = totAge / objArray.length;

console.log("Average age \n", avgAge);

console.log("\n\n 5. Transform final set back to CSV Data  \n");

//Convert to CSV

function arrayToCSV(array) {
  //Get headers from first row object keys
  const headers = Object.keys(array[0]);

  //Create header row
  let csv = headers.join(",") + "\n";

  //Add data rows
  array.forEach((obj) => {
    const row = headers.map((header) => obj[header]);
    csv += row.join(",") + "\n";
  });

  return csv;
}

let csvOutput = arrayToCSV(objArray);
console.log(csvOutput);
