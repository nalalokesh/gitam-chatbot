const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const Unanswered = require('../models/Unanswered');
const User = require('../models/User');


// Get All Users
router.get('/users', async (req, res) => {
    try {
        // Exclude password field and faculty (admin role)
        const allUsers = await User.find({ role: 'student' });
        const safeUsers = allUsers.map(u => ({
            _id: u._id || u.id,
            username: u.username,
            email: u.email,
            role: u.role,
            registration_no: u.registration_no,
            branch: u.branch,
            campus: u.campus,
            phone: u.phone
        }));
        res.json(safeUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all Knowledge Base entries
router.get('/queries', async (req, res) => {
    try {
        const queries = await Query.find({});
        res.json(queries);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a new Query
router.post('/queries', async (req, res) => {
    const { question, answer, keywords, category } = req.body;
    try {
        const newQuery = await Query.insert({ question, answer, keywords, category, created_at: new Date() });
        res.json(newQuery);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update a Query
router.put('/queries/:id', async (req, res) => {
    const { question, answer, keywords, category } = req.body;
    try {
        let query = await Query.findOne({ _id: req.params.id });
        if (!query) return res.status(404).json({ msg: 'Query not found' });

        await Query.update(
            { _id: req.params.id },
            { $set: { question, answer, keywords, category } }
        );

        query = await Query.findOne({ _id: req.params.id });
        res.json(query);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete a Query
router.delete('/queries/:id', async (req, res) => {
    try {
        const result = await Query.remove({ _id: req.params.id }, {});
        if (result === 0) return res.status(404).json({ msg: 'Query not found' });
        res.json({ msg: 'Query removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get Unanswered Queries
router.get('/unanswered', async (req, res) => {
    try {
        const unanswered = await Unanswered.find({ status: 'pending' });
        res.json(unanswered);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Resolve Unanswered Query (Add to KB and mark as resolved)
router.post('/resolve/:id', async (req, res) => {
    const { answer, category, keywords } = req.body;
    try {
        let unanswered = await Unanswered.findOne({ _id: req.params.id });
        if (!unanswered) return res.status(404).json({ msg: 'Entry not found' });

        // Add to Knowledge Base
        await Query.insert({
            question: unanswered.question,
            answer,
            keywords,
            category,
            created_at: new Date()
        });

        // Mark as resolved
        await Unanswered.update({ _id: req.params.id }, { $set: { status: 'resolved' } });

        res.json({ msg: 'Resolved and added to Knowledge Base' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const FACULTY_FILE = path.join(__dirname, '../data/faculty_data.txt');

// Helper to parse faculty text file into objects
const parseFacultyText = () => {
    try {
        const content = fs.readFileSync(FACULTY_FILE, 'utf8');
        const sections = content.split('\n\n'); // Some entries are separated by double newline
        
        let rawEntries = [];
        if (sections.length > 50) { 
            rawEntries = sections; 
        } else {
            // Alternative parsing: split by lines looking like "1.Name:"
            const lines = content.split('\n');
            let currentEntry = [];
            for (let line of lines) {
                if (/^\d+\.Name:/.test(line) && currentEntry.length > 0) {
                    rawEntries.push(currentEntry.join('\n'));
                    currentEntry = [];
                }
                currentEntry.push(line);
            }
            if (currentEntry.length > 0) rawEntries.push(currentEntry.join('\n'));
        }

        return rawEntries
            .map(block => block.trim())
            .filter(block => block.length > 0)
            .map(block => {
                const lines = block.split('\n').map(l => l.trim());
                
                // Extract using regex or string splits
                const nameMatch = block.match(/\d+\.Name:\s*(.+)/);
                const idMatch = block.match(/Faculty Id[\s:]+(.+)/);
                const desigMatch = block.match(/Designation[\s:]+(.+)/);
                const phoneMatch = block.match(/Phone[\s:]+(.+)/);
                const emailMatch = block.match(/Email[\s:]+(.+)/);
                const roomMatch = block.match(/Room No[\s:]+(.+)/);

                if (!nameMatch) return null;

                return {
                    id: idMatch ? idMatch[1].trim() : uuidv4(), // Fallback ID if missing
                    name: nameMatch[1].trim(),
                    designation: desigMatch ? desigMatch[1].trim() : '',
                    phone: phoneMatch ? phoneMatch[1].trim() : '',
                    email: emailMatch ? emailMatch[1].trim() : '',
                    room_no: roomMatch ? roomMatch[1].trim() : '',
                    _raw: block
                };
            }).filter(Boolean);
    } catch (e) {
        console.error("Error parsing faculty data:", e);
        return [];
    }
};

// Helper to write objects back to text file
const writeFacultyText = (facultyList) => {
    let textOut = '';
    facultyList.forEach((fac, index) => {
        textOut += `${index + 1}.Name: ${fac.name}\n`;
        textOut += `Faculty Id : ${fac.id}\n`;
        textOut += `Designation: ${fac.designation}\n`;
        textOut += `Phone: ${fac.phone}\n`;
        textOut += `Email: ${fac.email}\n`;
        textOut += `Room No: ${fac.room_no}\n`;
        // if not the last item, add an empty line? No, original seems to be contiguous lines mostly, but let's maintain consistent output
    });
    fs.writeFileSync(FACULTY_FILE, textOut, 'utf8');
};

// Get All Faculty
router.get('/faculty', (req, res) => {
    try {
        const facultyList = parseFacultyText();
        res.json(facultyList);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a new Faculty
router.post('/faculty', (req, res) => {
    const { name, id, designation, phone, email, room_no } = req.body;
    try {
        const facultyList = parseFacultyText();
        
        // Use provided id or generate one
        const newFaculty = {
            id: id || uuidv4().substring(0,8),
            name,
            designation,
            phone,
            email,
            room_no
        };

        facultyList.push(newFaculty);
        writeFacultyText(facultyList);
        
        res.json(newFaculty);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update a Faculty
router.put('/faculty/:id', (req, res) => {
    const { name, designation, phone, email, room_no } = req.body;
    try {
        let facultyList = parseFacultyText();
        const index = facultyList.findIndex(fac => fac.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ msg: 'Faculty not found' });
        }

        // Update the faculty details
        facultyList[index] = {
            ...facultyList[index],
            name: name !== undefined ? name : facultyList[index].name,
            designation: designation !== undefined ? designation : facultyList[index].designation,
            phone: phone !== undefined ? phone : facultyList[index].phone,
            email: email !== undefined ? email : facultyList[index].email,
            room_no: room_no !== undefined ? room_no : facultyList[index].room_no
        };

        writeFacultyText(facultyList);
        res.json(facultyList[index]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete a Faculty
router.delete('/faculty/:id', (req, res) => {
    try {
        let facultyList = parseFacultyText();
        const initialLen = facultyList.length;
        
        facultyList = facultyList.filter(fac => fac.id !== req.params.id);
        
        if (facultyList.length === initialLen) {
            return res.status(404).json({ msg: 'Faculty not found' });
        }

        writeFacultyText(facultyList);
        res.json({ msg: 'Faculty removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
