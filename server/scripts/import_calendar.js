const fs = require('fs');
const path = require('path');
const Datastore = require('nedb-promises');

const db = Datastore.create({ filename: path.join(__dirname, '../data/queries.db'), autoload: true });
const calendarPath = path.join(__dirname, '../data/academic_calendar_2025_26.json');

const importCalendar = async () => {
    try {
        const rawData = fs.readFileSync(calendarPath);
        const events = JSON.parse(rawData);

        console.log(`Found ${events.length} calendar events.`);

        // Clean up old calendar entries if needed (optional, skipping for now to strict append)

        const queriesToAdd = [];

        events.forEach(evt => {
            // Generate Q&A pair
            queriesToAdd.push({
                question: `When is ${evt.event}?`,
                answer: `${evt.event} is scheduled on ${evt.date}. ${evt.description}`,
                category: "Academic Calendar",
                keywords: [evt.event.split(' ')[0], "calendar", "date", "2025", "2026"]
            });

            // If it's an exam, add a specific query
            if (evt.event.toLowerCase().includes('exam')) {
                queriesToAdd.push({
                    question: `Exam dates for ${evt.event}`,
                    answer: `${evt.event} are scheduled from ${evt.date}.`,
                    category: "Exams",
                    keywords: ["exam", "sessional", "schedule"]
                });
            }
        });

        // Insert
        await db.insert(queriesToAdd);
        console.log(`Successfully added ${queriesToAdd.length} calendar Q&A pairs to the Knowledge Base.`);

    } catch (err) {
        console.error("Error importing calendar:", err);
    }
};

importCalendar();
