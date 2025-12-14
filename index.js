let accounts = [
    { accountNumber: "1001", name: "Sonder Oswald", balance: 1500.00 },
    { accountNumber: "1002", name: "Oswald Faiyaz", balance: 5000.50 }
];

let currentMode = 'deposit';

function showSection(id) {
    document.querySelectorAll('.section').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.section').forEach(el => el.classList.remove('block'));

    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add('block');

    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active-nav');
        btn.classList.add('text-slate-600', 'hover:bg-slate-50');
    });

    const activeBtn = Array.from(document.querySelectorAll('.menu-btn')).find(b => b.getAttribute('onclick').includes(id));
    if(activeBtn) {
        activeBtn.classList.add('active-nav');
        activeBtn.classList.remove('text-slate-600', 'hover:bg-slate-50');
    }

    if(id === 'list') renderTable();
}

function createAccount() {
    const num = document.getElementById('new-acc-num').value.trim();
    const name = document.getElementById('new-acc-name').value.trim();
    const bal = parseFloat(document.getElementById('new-acc-bal').value);

    if(!num || !name || isNaN(bal) || bal < 0) {
        alert("Please fill all fields correctly.");
        return;
    }

    if(accounts.some(a => a.accountNumber === num)) {
        alert("Account Number already exists!");
        return;
    }

    accounts.push({ accountNumber: num, name, balance: bal });
    alert("Account created successfully!");

    document.getElementById('new-acc-num').value = '';
    document.getElementById('new-acc-name').value = '';
    document.getElementById('new-acc-bal').value = '';
}

function setTransMode(mode) {
    currentMode = mode;
    const btn = document.getElementById('trans-btn');
    const tabDep = document.getElementById('tab-deposit');
    const tabWit = document.getElementById('tab-withdraw');

    if(mode === 'deposit') {
        btn.textContent = "Deposit Funds";
        btn.className = "w-full bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors";

        tabDep.className = "text-sm font-medium px-3 py-1.5 rounded-md bg-white shadow-sm transition-all text-slate-900";
        tabWit.className = "text-sm font-medium px-3 py-1.5 rounded-md text-slate-500 transition-all hover:text-slate-900";
    } else {
        btn.textContent = "Withdraw Funds";
        btn.className = "w-full bg-orange-600 text-white hover:bg-orange-700 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors";

        tabWit.className = "text-sm font-medium px-3 py-1.5 rounded-md bg-white shadow-sm transition-all text-slate-900";
        tabDep.className = "text-sm font-medium px-3 py-1.5 rounded-md text-slate-500 transition-all hover:text-slate-900";
    }
}

function handleTransaction() {
    const num = document.getElementById('trans-acc-num').value.trim();
    const amount = parseFloat(document.getElementById('trans-amount').value);

    const acc = accounts.find(a => a.accountNumber === num);
    if(!acc) { alert("Account not found!"); return; }
    if(isNaN(amount) || amount <= 0) { alert("Invalid amount!"); return; }

    if(currentMode === 'withdraw') {
        if(acc.balance < amount) { alert("Insufficient funds!"); return; }
        acc.balance -= amount;
    } else {
        acc.balance += amount;
    }

    alert(`Success! New Balance: ₱${acc.balance.toFixed(2)}`);
    document.getElementById('trans-amount').value = '';
}

function checkBalance() {
    const num = document.getElementById('check-acc-num').value.trim();
    const acc = accounts.find(a => a.accountNumber === num);
    const display = document.getElementById('balance-display');

    if(!acc) {
        alert("Account not found");
        display.classList.add('hidden');
        return;
    }

    document.getElementById('bal-name').textContent = acc.name;
    document.getElementById('bal-amount').textContent = `₱${acc.balance.toFixed(2)}`;
    display.classList.remove('hidden');
}

function renderTable() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const tbody = document.getElementById('accounts-body');
    tbody.innerHTML = '';

    const filtered = accounts.filter(a =>
        a.name.toLowerCase().includes(query) ||
        a.accountNumber.includes(query)
    );

    if(filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="px-6 py-8 text-center text-slate-500">No accounts found.</td></tr>`;
        return;
    }

    filtered.forEach(acc => {
        const row = `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 font-mono text-slate-600">${acc.accountNumber}</td>
            <td class="px-6 py-4 font-medium text-slate-900">${acc.name}</td>
            <td class="px-6 py-4 text-right font-bold ${acc.balance < 0 ? 'text-red-600' : 'text-green-600'}">
                ₱${acc.balance.toFixed(2)}
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function exitSystem() {
    document.getElementById('exit-screen').classList.remove('hidden');
    setTimeout(() => {
        location.reload();
    }, 2000);
}

lucide.createIcons();