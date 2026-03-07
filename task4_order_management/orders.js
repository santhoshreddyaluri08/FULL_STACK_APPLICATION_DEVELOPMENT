const tbody = document.querySelector("#orderTable tbody");
const summaryDiv = document.getElementById("summary");

// Fetch orders
fetch("http://localhost:3000/orders")
.then(res=>res.json())
.then(data=>{
    tbody.innerHTML = data.map(o => `
        <tr>
            <td>${o.customer}</td>
            <td>${o.product}</td>
            <td>${o.qty}</td>
            <td>${o.total}</td>
        </tr>
    `).join("");
});

// Fetch highest order and most active customer
Promise.all([
    fetch("http://localhost:3000/highest-order").then(res=>res.json()),
    fetch("http://localhost:3000/most-active").then(res=>res.json())
]).then(([highest, active])=>{
    summaryDiv.innerHTML = `
        <p>Highest Value Order: ${highest.customer} - ${highest.product} (${highest.total})</p>
        <p>Most Active Customer: ${active.name} (${active.orders_count} orders)</p>
    `;
});