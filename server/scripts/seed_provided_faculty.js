const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');
const Datastore = require('nedb-promises');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../data/users.db');
const db = Datastore.create({ filename: dbPath, autoload: true });

const seedFaculty = async () => {
    console.log('Reading faculty data...');
    const rawData = fs.readFileSync(path.join(__dirname, '../data/faculty_data.txt'), 'utf-8');

    // Split by newlines
    const lines = rawData.split(/\r?\n/);

    const users = [];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    console.log(`Processing ${lines.length} lines...`);

    let currentUser = null;
    let count = 0;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Check if start of new entry (e.g. "1. Dr. Faculty Member")
        const startMatch = trimmed.match(/^(\d+)\.\s+(.*)/);

        if (startMatch) {
            // Push previous user if complete
            if (currentUser && currentUser.email) {
                users.push(currentUser);
            }

            // Start new user
            const fullName = startMatch[2].trim();
            count = parseInt(startMatch[1]); // Use list number as ID reference

            currentUser = {
                username: fullName,
                role: 'admin',
                password: hashedPassword,
                campus: 'Visakhapatnam',
                created_at: new Date(),
                registration_no: `EMP${String(1000 + count).padStart(5, '0')}` // EMP01001, EMP01002
            };
        } else if (currentUser) {
            if (trimmed.includes('Department')) {
                const parts = trimmed.split(':');
                if (parts[1]) currentUser.branch = parts[1].trim();
            }
            if (trimmed.includes('Designation')) {
                const parts = trimmed.split(':');
                if (parts[1]) currentUser.designation = parts[1].trim();
            }
            if (trimmed.includes('Email')) {
                const parts = trimmed.split(':');
                if (parts[1]) currentUser.email = parts[1].trim().toLowerCase();
            }
            if (trimmed.includes('Contact')) {
                const parts = trimmed.split(':');
                if (parts[1]) currentUser.phone = parts[1].trim();
            }
        }
    }
    // Push last user
    if (currentUser && currentUser.email) {
        users.push(currentUser);
    }

    console.log(`Generated ${users.length} user objects.`);

    // 1. Insert into DB (Remove old ones? Or just add? I'll remove old test data first if it matches these emails, but safer to just insert)
    // To avoid duplicates, I'll remove existing with same email
    for (const u of users) {
        const existing = await db.findOne({ email: u.email });
        if (existing) {
            await db.update({ email: u.email }, { $set: u });
        } else {
            await db.insert(u);
        }
    }
    console.log('Database updated.');

    // 2. Create Excel
    try {
        const workbook = xlsx.utils.book_new();
        const excelData = users.map(u => ({
            'S.No': Number(u.registration_no.replace('EMP', '')) - 1000,
            Name: u.username,
            Department: u.branch,
            Designation: u.designation,
            Email: u.email,
            Contact: u.phone,
            Campus: u.campus,
            'Registration No': u.registration_no
        }));

        const worksheet = xlsx.utils.json_to_sheet(excelData);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Faculty Details');

        const filePath = path.join(__dirname, '../data/GITAM_Faculty_List.xlsx');
        xlsx.writeFile(workbook, filePath);
        console.log(`Excel file created at: ${filePath}`);
    } catch (e) {
        console.error('Error creating Excel:', e);
    }
};

seedFaculty();
