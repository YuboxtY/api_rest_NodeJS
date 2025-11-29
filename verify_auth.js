const API_URL = 'http://localhost:3000/api';

async function testAuth() {
    try {
        // 1. Register
        const uniqueEmail = `test${Date.now()}@example.com`;
        console.log(`\n1. Registering user: ${uniqueEmail}`);

        let res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: 'Test User',
                correo: uniqueEmail,
                password: 'password123'
            })
        });

        if (res.ok) {
            console.log('✅ Registration successful');
        } else {
            const data = await res.json();
            console.error('❌ Registration failed:', data);
            return;
        }

        // 2. Login
        console.log('\n2. Logging in');
        let token;
        res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                correo: uniqueEmail,
                password: 'password123'
            })
        });

        if (res.ok) {
            const data = await res.json();
            token = data.token;
            console.log('✅ Login successful. Token received.');
        } else {
            const data = await res.json();
            console.error('❌ Login failed:', data);
            return;
        }

        // 3. Access Protected Route (No Token)
        console.log('\n3. Accessing protected route (No Token)');
        res = await fetch(`${API_URL}/productos`);

        if (res.status === 401 || res.status === 403) {
            console.log(`✅ Access denied as expected (${res.status})`);
        } else {
            console.error(`❌ Access should have failed but returned ${res.status}`);
        }

        // 4. Access Protected Route (With Token)
        console.log('\n4. Accessing protected route (With Token)');
        res = await fetch(`${API_URL}/productos`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
            console.log('✅ Access granted');
        } else {
            const data = await res.json();
            console.error('❌ Access failed:', data);
        }

    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

testAuth();
