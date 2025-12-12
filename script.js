let input = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];

//----- Calculating total units of water & water stored at each column -----//

function waterTank(height = []) {
    let left = 0;
    let right = height.length - 1;

    let leftMax = 0;
    let rightMax = 0;

    // to store the total units of water
    let unitsOfWater = 0;

    // to save how much water is stored in each column
    let waterAt = Array(height.length).fill(0);

    while (left < right) {

        // check the lowest height. because it's the limit to stored water

        // if lowest height is left side
        if (height[left] < height[right]) {

            // update the current leftMax
            if (height[left] >= leftMax) {
                leftMax = height[left];
            }

            // save total stored water & each column stored water
            else {
                let savedWater = leftMax - height[left];
                unitsOfWater = unitsOfWater + savedWater;
                waterAt[left] = savedWater;
            }
            left++;
        }

        // if lowest height is right side
        else {

            // update the current rightMax
            if (height[right] >= rightMax) {
                rightMax = height[right];
            }

            // save total stored water & each column stored water
            else {
                let savedWater = rightMax - height[right];
                unitsOfWater = unitsOfWater + savedWater;
                waterAt[right] = savedWater;
            }
            right--;
        }
    }
    return { unitsOfWater, waterAt };
}

// save the total water & each column stored water in variables
let { unitsOfWater, waterAt } = waterTank(input);


// select & changes the content in the HTML where id = "inputArray"
document.getElementById("inputArray").innerHTML = `Input : [${input}]`;

// select & changes the content in the HTML where id = "totalUnits"
document.getElementById("totalUnits").innerHTML = `Output : ${unitsOfWater} Units`;

// define the vertical height in the table
let rows = Math.max(...input) + 2;

// define the horizontal width in the table
let columns = input.length;

//---------------- Creating table to display input values -----------------//

// create a table element & store it in a variable. Later can add rows/ columns / CSS styles
let table = document.createElement("table");

// creating rows for the table
for (let i = 1; i <= rows; i++) {

    // create a table row element & store in a variable. Later can add columns.
    let tr = document.createElement("tr");

    // creating columns for the table
    for (let j = 0; j < columns; j++) {

        // column & stored water height
        let columnHeight = input[j];
        let waterHeight = waterAt[j];

        // calculate in which row to start the column & stored water in the table
        let columnStart = rows - columnHeight + 1;
        let waterStart = rows - columnHeight - waterHeight + 1;

        // create a table cell/column & store in a variable. Later can add text / CSS styles.
        let td = document.createElement("td");

        // checking the cell is filled with column / water / empty
        if (i >= columnStart) {
            td.classList.add("filled");  // filled CSS applied (column)
        } else if (i >= waterStart && i < columnStart) {
            td.classList.add("water");  // water CSS applied (water)
        }

        // add table cell to the current row (left to right)
        tr.appendChild(td);

    }

    // add the current row to the table (top to bottom)
    table.appendChild(tr);
}

// select & changes the content in the HTML where id = "inputTable"
document.getElementById("inputTable").appendChild(table);


//--------------- Creating table to display output values -----------------//

// create a table to display the output
let waterTable = document.createElement("table");

// creating rows for the table
for (let i = 1; i <= rows; i++) {

    // create a table row element & store in a variable. Later can add columns.
    let tr = document.createElement("tr");

    // creating columns for the table
    for (let j = 0; j < columns; j++) {

        // column & stored water height
        let columnHeight = input[j];
        let waterHeight = waterAt[j];

        // calculate in which row to start the stored water in the table
        let columnStart = rows - columnHeight + 1;
        let waterStart = rows - columnHeight - waterHeight + 1;

        // create a table cell/column & store in a variable. Later can add text / CSS styles.
        let td = document.createElement("td");

        // checking the cell is filled with column / water / empty
        if (i >= waterStart && i < columnStart) {
            td.classList.add("water");  // water CSS applied (water)
        }

        // add table cell to the current row (left to right)
        tr.appendChild(td);

    }

    // add the current row to the table (top to bottom)
    waterTable.appendChild(tr);
}

// select & changes the content in the HTML where id = "waterTable"
document.getElementById("waterTable").appendChild(waterTable);
