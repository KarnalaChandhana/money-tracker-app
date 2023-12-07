// public/app.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const typeInput = document.getElementById('type');
    const transactionsList = document.getElementById('transactions-list');
  
    // Function to fetch and display transactions
    const fetchTransactions = async () => {
      const response = await fetch('/transactions');
      const transactions = await response.json();
  
      transactionsList.innerHTML = '';
  
      transactions.forEach((transaction) => {
        const div = document.createElement('div');
        div.innerHTML = `
          <p>${transaction.description}: ${transaction.amount} (${transaction.type})</p>
          <button onclick="deleteTransaction('${transaction._id}')">Delete</button>
        `;
        transactionsList.appendChild(div);
      });
    };
  
    // Function to add a new transaction
    const addTransaction = async () => {
      const description = descriptionInput.value;
      const amount = parseFloat(amountInput.value);
      const type = typeInput.value;
  
      if (description && !isNaN(amount)) {
        const response = await fetch('/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description, amount, type }),
        });
  
        if (response.ok) {
          descriptionInput.value = '';
          amountInput.value = '';
          typeInput.value = 'income';
  
          fetchTransactions();
        }
      }
    };
  
    // Function to delete a transaction
    window.deleteTransaction = async (id) => {
      const response = await fetch(`/transactions/${id}`, { method: 'DELETE' });
  
      if (response.ok) {
        fetchTransactions();
      }
    };
  
    // Event listener for form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addTransaction();
    });
  
    // Initial fetch and display transactions
    fetchTransactions();
  });
  