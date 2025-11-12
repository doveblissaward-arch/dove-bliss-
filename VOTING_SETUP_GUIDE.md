# DOBA 2025 Voting System Setup Guide

## ✅ What You've Done So Far

1. ✅ Created Google Apps Script
2. ✅ Deployed the script as a Web App
3. ✅ Got the webhook URL
4. ⏳ Adding webhook to Paystack (in progress)

## 📋 Next Steps

### Step 1: Complete Paystack Webhook Setup

You're currently on this screen. Complete these actions:

1. Paste your Google Apps Script URL in the **"Live Webhook URL"** field
2. Scroll down and click **Save**
3. Paystack will now send payment notifications to your Google Sheet

### Step 2: Prepare Your Google Sheet

1. Open your Google Sheet (the one linked to the Apps Script)
2. In Row 1, add these column headers:
   - **A1:** Timestamp
   - **B1:** Category
   - **C1:** Contestant
   - **D1:** Amount
   - **E1:** Votes
   - **F1:** Email
   - **G1:** Phone
   - **H1:** Transaction Reference

### Step 3: Publish Your Google Sheet (for reading data)

1. In your Google Sheet, click **File** → **Share** → **Publish to web**
2. In the dropdown, select **Entire Document**
3. Choose **Comma-separated values (.csv)**
4. Click **Publish**
5. Copy the URL that appears
6. Extract the **Sheet ID** from the URL (the long string between `/d/` and `/edit`)

Example URL: `https://docs.google.com/spreadsheets/d/1ABC123XYZ456/edit`
Sheet ID: `1ABC123XYZ456`

### Step 4: Update voting.html Configuration

1. Open `voting.html` in your code editor
2. Find this line (around line 240):
   ```javascript
   const GOOGLE_SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
   ```
3. Replace `YOUR_GOOGLE_SHEET_ID` with your actual Sheet ID
4. Save the file

### Step 5: Test the System

1. Open `voting.html` in your browser
2. Click "Vote Now" on any contestant
3. Complete the payment process
4. Check your Google Sheet - you should see a new row with the vote data
5. Refresh the voting page - the percentages should update

## 🎯 How It Works

### Payment Flow:
```
User votes → Paystack payment → Webhook triggers → 
Google Apps Script → Data saved to Sheet → 
Voting page reads Sheet → Displays percentages
```

### Data Flow:
1. **User votes** via Paystack payment form
2. **Paystack webhook** sends payment data to Google Apps Script
3. **Apps Script** writes data to Google Sheet:
   - Contestant name
   - Category
   - Amount paid
   - Number of votes (amount ÷ 100)
   - Voter details
4. **Voting page** reads from Google Sheet every 30 seconds
5. **JavaScript calculates** percentages per category
6. **UI updates** to show current standings

## 📊 Voting Rules

- Each vote costs **₦100**
- Users can buy multiple votes at once (e.g., ₦1000 = 10 votes)
- Percentages are calculated **per category**
- Data updates automatically every 30 seconds
- Manual refresh button available

## 🔧 Customization Options

### Change Contestants:
Edit the `contestantsData` object in `voting.html` (around line 250)

### Change Vote Price:
Update the calculation in `initiateVote()` function:
```javascript
const amount = votes * 100 * 100; // Change 100 to your price
```

### Change Refresh Interval:
Update the interval in `voting.html` (around line 450):
```javascript
setInterval(loadVotingData, 30000); // 30000 = 30 seconds
```

## 🚨 Troubleshooting

### Votes not appearing in Google Sheet:
1. Check Paystack webhook is saved correctly
2. Verify Apps Script is deployed as "Anyone" can access
3. Check Apps Script execution log for errors

### Percentages not updating:
1. Verify Google Sheet is published to web
2. Check Sheet ID is correct in voting.html
3. Open browser console (F12) to see any errors

### Payment not processing:
1. Verify Paystack public key is correct
2. Check you're using the LIVE key (starts with `pk_live_`)
3. Ensure Paystack account is activated

## 📞 Support

For issues:
- Check browser console (F12) for JavaScript errors
- Check Google Apps Script execution log
- Verify Paystack webhook delivery in dashboard

## 🎉 You're Almost Done!

Just complete Steps 1-4 above and your voting system will be live!

---

**Created for DOBA 2025 by myBizPushSolutions**
