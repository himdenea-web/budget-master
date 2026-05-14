
window.onload = () => {
    const saved = JSON.parse(localStorage.getItem('budgetData'));
    if (saved) {
        document.getElementById('income').value = saved.income;
        document.getElementById('rent').value = saved.rent;
        document.getElementById('food').value = saved.food;
        document.getElementById('fun').value = saved.fun;
        updateBudget();
    }
};

function updateBudget() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const fun = parseFloat(document.getElementById('fun').value) || 0;

    const balance = income - (rent + food + fun);
    
    
    localStorage.setItem('budgetData', JSON.stringify({income, rent, food, fun}));

    const display = document.getElementById('balance');
    display.innerText = balance.toFixed(2) + " €";
    display.style.color = balance < 0 ? "#d93025" : "#188038";
}

async function genererPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const balance = document.getElementById('balance').innerText;

    doc.setFontSize(20);
    doc.text("Mon Bilan BudgetMaster", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Revenus : ${document.getElementById('income').value || 0} €`, 20, 50);
    doc.text(`Dépenses : ${parseFloat(document.getElementById('rent').value || 0) + parseFloat(document.getElementById('food').value || 0) + parseFloat(document.getElementById('fun').value || 0)} €`, 20, 60);
    doc.text(`RESTE À VIVRE : ${balance}`, 20, 80);

    doc.save("Budget_Etudiant.pdf");
}
