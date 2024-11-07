function fetchPreviousReadings(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_readings.php', true);
    xhr.onload = function () {
        if (this.status === 200) {
            const readings = JSON.parse(this.responseText);
            callback(readings.total_reading, readings.family1_reading);
        }
    };
    xhr.send();
}

function calculateBill() {
    const currentTotalReading = parseFloat(document.getElementById('totalReading').value);
    const currentFamily1Reading = parseFloat(document.getElementById('family1Reading').value);
    const billAmount = parseFloat(document.getElementById('billAmount').value);

    fetchPreviousReadings((previousTotalReading, previousFamily1Reading) => {
        // Calculate units
        const totalUnits = currentTotalReading - previousTotalReading;
        const family1Units = currentFamily1Reading - previousFamily1Reading;

        // Calculate amount per unit
        const amtPerUnit = billAmount / totalUnits;

        // Calculate bills for Family 1 and Family 2
        const family1Bill = (family1Units * amtPerUnit).toFixed(2);
        const family2Bill = (billAmount - family1Bill).toFixed(2);

        // Display the results
        document.getElementById('result').innerHTML = `
            <p>Total Units: ${totalUnits} kWh</p>
            <p>Family 1 Units: ${family1Units} kWh</p>
            <p>Amount Per Unit: $${amtPerUnit.toFixed(2)}</p>
            <p><strong>Family 1's Bill: $${family1Bill}</strong></p>
            <p><strong>Family 2's Bill: $${family2Bill}</strong></p>
        `;

        // Store the new readings
        storeNewReadings(currentTotalReading, currentFamily1Reading);
    });
}

function storeNewReadings(totalReading, family1Reading) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'insert_readings.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(this.responseText);
        }
    };
    xhr.send(`totalReading=${totalReading}&family1Reading=${family1Reading}`);
}
