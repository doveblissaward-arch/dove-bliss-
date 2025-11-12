// Google Sheets Data Fetcher for DOBA Voting
// This script fetches voting data from Google Sheets and calculates percentages

// IMPORTANT: Replace this with your actual Google Sheet ID
// You can find it in your Google Sheet URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
const GOOGLE_SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

// Function to fetch data from Google Sheets (published as CSV)
async function fetchVotingDataFromSheet() {
    try {
        // Google Sheets CSV export URL
        const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`;
        
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        // Parse CSV data
        const rows = csvText.split('\n').slice(1); // Skip header row
        const votingData = {};
        
        rows.forEach(row => {
            if (!row.trim()) return;
            
            const columns = row.split(',');
            // Expected columns: Timestamp, Category, Contestant, Amount, Votes, Email, Phone, Reference
            
            const category = columns[1]?.trim();
            const contestant = columns[2]?.trim();
            const amount = parseFloat(columns[3]) || 0;
            const votes = parseFloat(columns[4]) || 0;
            
            if (!category || !contestant) return;
            
            // Initialize category if not exists
            if (!votingData[category]) {
                votingData[category] = {};
            }
            
            // Initialize contestant if not exists
            if (!votingData[category][contestant]) {
                votingData[category][contestant] = {
                    votes: 0,
                    amount: 0,
                    percentage: 0
                };
            }
            
            // Accumulate votes and amount
            votingData[category][contestant].votes += votes;
            votingData[category][contestant].amount += amount;
        });
        
        // Calculate percentages for each category
        Object.keys(votingData).forEach(category => {
            const contestants = votingData[category];
            const totalVotes = Object.values(contestants).reduce((sum, c) => sum + c.votes, 0);
            
            Object.keys(contestants).forEach(contestantName => {
                if (totalVotes > 0) {
                    contestants[contestantName].percentage = 
                        ((contestants[contestantName].votes / totalVotes) * 100).toFixed(2);
                } else {
                    contestants[contestantName].percentage = 0;
                }
            });
        });
        
        return votingData;
        
    } catch (error) {
        console.error('Error fetching voting data:', error);
        throw error;
    }
}

// Export for use in voting.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchVotingDataFromSheet };
}
