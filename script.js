function calculateBill() {
    // Retrieve input values and convert to numbers
    const totalReading = parseFloat(document.getElementById('totalReading').value);
    const previousReading = parseFloat(document.getElementById('previousReading').value);
    const family1Reading = parseFloat(document.getElementById('family1Reading').value);
    const previousFamily1Reading = parseFloat(document.getElementById('previousFamily1Reading').value);
    const billAmount = parseFloat(document.getElementById('billAmount').value);

    // Validate inputs
    if (isNaN(totalReading) || isNaN(previousReading) || isNaN(family1Reading) || isNaN(previousFamily1Reading) || isNaN(billAmount)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    // Calculate units
    const totalUnits = totalReading - previousReading;
    const family1Units = family1Reading - previousFamily1Reading;

    // Calculate amount per unit
    const amtPerUnit = billAmount / totalUnits;

    // Calculate bills for Family 1 and Family 2
    const family1Bill = (family1Units * amtPerUnit).toFixed(2);
    const family2Bill = (billAmount - family1Bill).toFixed(2);

    // Display the results in rupees (₹)
    document.getElementById('result').innerHTML = `
        <p>Total Units Consumed: ${totalUnits} kWh</p>
        <p>Family 1 Units Consumed: ${family1Units} kWh</p>
        <p>Amount Per Unit: ₹${amtPerUnit.toFixed(2)}</p>
        <p><strong>Family 1's Bill: ₹${family1Bill}</strong></p>
        <p><strong>Family 2's Bill: ₹${family2Bill}</strong></p>
    `;
}
