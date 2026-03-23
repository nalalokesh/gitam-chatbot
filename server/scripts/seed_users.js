const { faker } = require('@faker-js/faker');
const xlsx = require('xlsx');
const path = require('path');
const Datastore = require('nedb-promises');
const bcrypt = require('bcryptjs');

// Connect to the same NeDB as the app
const dbPath = path.join(__dirname, '../data/users.db');
const db = Datastore.create({ filename: dbPath, autoload: true });

const generateData = async () => {
    console.log('Generating 200 dummy users with Indian names...');

    const users = [];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const branches = ['CSE', 'ECE', 'EEE', 'Mech', 'Civil', 'BBA', 'MBA'];
    const campuses = ['Visakhapatnam', 'Hyderabad', 'Bengaluru'];

    // Indian names datasets
    const firstNames = [
        "Aarav", "Vihaan", "Vivaan", "Ananya", "Diya", "Advik", "Kabir", "Rohan", "Aarya", "Saanvi",
        "Ishaan", "Arjun", "Zara", "Kyra", "Reyansh", "Aryan", "Dhruv", "Anika", "Pari", "Mira",
        "Karthik", "Rahul", "Priya", "Sneha", "Amit", "Suresh", "Ramesh", "Pooja", "Neha", "Vikram",
        "Siddharth", "Akash", "Manish", "Kavya", "Divya", "Swati", "Nikhil", "Pranav", "Aditya", "Riya",
        "Tanvi", "Meera", "Varun", "Karan", "Simran", "Sonia", "Deepak", "Rakesh", "Sunil", "Anita",
        "Sai", "Krishna", "Ram", "Sita", "Gita", "Lakshmi", "Venkatesh", "Srinivas", "Ravi", "Kiran"
    ];
    const lastNames = [
        "Sharma", "Verma", "Gupta", "Malhotra", "Reddy", "Rao", "Nair", "Patel", "Singh", "Kumar",
        "Mehta", "Shah", "Agarwal", "Joshi", "Iyer", "Mishra", "Chopra", "Desai", "Jain", "Saxena",
        "Bhat", "Chowdhury", "Das", "Mukherjee", "Banerjee", "Chatterjee", "Bose", "Ghosh", "Datta", "Sengupta",
        "Pillai", "Menon", "Krishnan", "Subramaniam", "Raman", "Yadav", "Tiwari", "Dubey", "Pandey", "Shukla",
        "Naidu", "Raju", "Reddy", "Chowdary", "Goud", "Murali", "Kulkarni", "Deshpande", "Patil", "Pawar"
    ];

    for (let i = 0; i < 200; i++) {
        const isStudent = i < 180; // 90% students

        // Pick random names
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${firstName} ${lastName}`;

        // Ensure somewhat unique email
        const randomSuffix = Math.floor(Math.random() * 10000);

        let email;
        if (isStudent) {
            email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomSuffix}@gitam.in`;
        } else {
            email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomSuffix}@gitam.edu`;
        }

        const user = {
            username: fullName,
            email: email,
            password: hashedPassword,
            role: isStudent ? 'student' : 'admin',
            registration_no: isStudent ? `22${faker.string.numeric(8)}` : `EMP${faker.string.numeric(5)}`,
            branch: faker.helpers.arrayElement(branches),
            campus: faker.helpers.arrayElement(campuses),
            phone: `9${faker.string.numeric(9)}`, // Indian style 9xxxxxxxxx
            created_at: faker.date.past()
        };

        users.push(user);
    }

    // 1. Insert into DB
    try {
        console.log('Inserting into database...');
        // Note: We are appending. If you want to clear old, you'd use db.remove({}, { multi: true })
        // But we have faculty data there too now. 
        // I'll leave the old ones or just add these.
        await db.insert(users);
        console.log('Successfully inserted 200 Indian dummy users into DB.');
    } catch (e) {
        console.error('Error inserting into DB:', e);
    }

    // 2. Create Excel
    try {
        console.log('Creating Excel file...');
        const workbook = xlsx.utils.book_new();

        const excelData = users.map(u => ({
            Name: u.username,
            Email: u.email,
            Role: u.role,
            'Registration No': u.registration_no,
            Branch: u.branch,
            Campus: u.campus,
            Phone: u.phone
        }));

        const worksheet = xlsx.utils.json_to_sheet(excelData);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Members');

        const filePath = path.join(__dirname, '../data/GITAM_Members_List_Indian.xlsx');
        xlsx.writeFile(workbook, filePath);
        console.log(`Excel file created at: ${filePath}`);
    } catch (e) {
        console.error('Error creating Excel:', e);
    }
};

generateData();
