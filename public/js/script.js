// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const deleteExpensesBtn = document.getElementById('delete-expenses');
  
    // Function to add an expense
    const addExpense = async (event) => {
      event.preventDefault();
  
      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const date = document.getElementById('date').value;
  
      if (!description || isNaN(amount) || !date) {
        alert('Please fill in all fields correctly.');
        return;
      }
  
      try {
        const response = await fetch('/api/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description, amount, date }),
        });
  
        if (response.status === 201) {
          const data = await response.json();
          displayExpense(data);
          expenseForm.reset();
        } else {
          alert('Failed to add expense.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the expense.');
      }
    };
  
    // Function to display an expense in the table
    const displayExpense = (expense) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${expense.description}</td>
        <td>${expense.amount.toFixed(2)}</td>
        <td>${new Date(expense.date).toLocaleDateString()}</td>
        <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
      `;
      expenseList.appendChild(row);
  
      // Attach a click event to the delete button
      const deleteBtn = row.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', deleteExpense);
    };
  
    // Function to delete an expense
    const deleteExpense = async (event) => {
      const id = event.target.getAttribute('data-id');
  
      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'DELETE',
        });
  
        if (response.status === 204) {
          event.target.closest('tr').remove();
        } else {
          alert('Failed to delete expense.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the expense.');
      }
    };
  
    // Function to delete all expenses
    const deleteAllExpenses = async () => {
      try {
        const response = await fetch('/api/expenses', {
          method: 'DELETE',
        });
  
        if (response.status === 204) {
          expenseList.innerHTML = '';
        } else {
          alert('Failed to delete expenses.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting expenses.');
      }
    };
  
    expenseForm.addEventListener('submit', addExpense);
    deleteExpensesBtn.addEventListener('click', deleteAllExpenses);
  
    // Load existing expenses on page load
    const loadExpenses = async () => {
      try {
        const response = await fetch('/api/expenses');
        if (response.status === 200) {
          const data = await response.json();
          data.forEach((expense) => {
            displayExpense(expense);
          });
        } else {
          alert('Failed to load expenses.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading expenses.');
      }
    };
  
    loadExpenses();
  });
  