const fs = require('fs');
const path = require('path');
const Datastore = require('nedb-promises');

const db = Datastore.create({ filename: path.join(__dirname, '../data/queries.db'), autoload: true });
const calendarPath = path.join(__dirname, '../data/academic_calendar_2025_26.json');

const addHolidaySummary = async () => {
    try {
        const rawData = fs.readFileSync(calendarPath);
        const events = JSON.parse(rawData);

        // Filter for holidays
        const holidays = events.filter(e =>
            e.description.toLowerCase().includes('holiday') ||
            e.event.toLowerCase().includes('jayanthi') ||
            e.event.toLowerCase().includes('christmas') ||
            e.event.toLowerCase().includes('diwali') ||
            e.event.toLowerCase().includes('sankranthi')
        );

        const holidayList = holidays.map(h => `- ${h.event}: ${h.date}`).join('\n');

        const summaryEntry = {
            question: "What are the holidays this year? List of public holidays.",
            answer: `The major holidays for the 2025-26 academic year are:\n\n${holidayList}\n\nPlease check the official academic calendar for the most up-to-date information.`,
            category: "Academic Calendar",
            keywords: ["holidays", "vacation", "off", "leave", "list", "festivals"]
        };

        // Check if exists and update, or insert
        const existing = await db.findOne({ question: { $regex: /What are the holidays/i } });
        if (existing) {
            await db.update({ _id: existing._id }, { $set: summaryEntry });
            console.log("Updated existing Holiday List entry.");
        } else {
            await db.insert(summaryEntry);
            console.log("Inserted new Holiday List entry.");
        }

    } catch (err) {
        console.error("Error adding holiday summary:", err);
    }
};

addHolidaySummary();
