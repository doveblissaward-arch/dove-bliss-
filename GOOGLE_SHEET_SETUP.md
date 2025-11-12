# Google Sheet Setup Instructions

## Step-by-Step Guide to Get Your Sheet ID

### Method 1: From the URL (Easiest)

1. Open your Google Sheet
2. Look at the URL in your browser's address bar
3. It will look like this:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123XYZ456DEF789/edit#gid=0
   ```
4. The Sheet ID is the long string between `/d/` and `/edit`
5. In the example above, the Sheet ID is: `1ABC123XYZ456DEF789`

### Method 2: From Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Add this test function:
   ```javascript
   function getSheetId() {
     var sheet = SpreadsheetApp.getActiveSpreadsheet();
     Logger.log('Sheet ID: ' + sheet.getId());
   }
   ```
3. Click **Run** (play button)
4. Click **View** → **Logs**
5. Copy the Sheet ID from the log

## Publishing Your Sheet for Public Reading

### Option 1: Publish to Web (Recommended for this project)

1. In your Google Sheet, click **File** → **Share** → **Publish to web**
2. Under "Link", select:
   - **Entire Document** (or select specific sheet)
   - **Comma-separated values (.csv)**
3. Click **Publish**
4. Click **OK** on the confirmation dialog
5. Your sheet is now publicly readable (but not editable)

**Important:** This makes the sheet READ-ONLY to the public. Only you can edit it.

### Option 2: Share with Specific Access

If you don't want to publish publicly:

1. Click the **Share** button (top right)
2. Under "General access", select **Anyone with the link**
3. Set permission to **Viewer**
4. Click **Done**

## Setting Up the Sheet Structure

Your sheet should have these columns in Row 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Category | Contestant | Amount | Votes | Email | Phone | Transaction Reference |

### Example Data:

| Timestamp | Category | Contestant | Amount | Votes | Email | Phone | Transaction Reference |
|-----------|----------|------------|--------|-------|-------|-------|----------------------|
| 2025-11-12 10:30:00 | Technology | Kelechi Obi | 500 | 5 | voter@email.com | 08012345678 | DOBA_123456789 |
| 2025-11-12 10:35:00 | Business | Chioma Adeleke | 1000 | 10 | another@email.com | 08098765432 | DOBA_987654321 |

## Testing the Webhook

### Send a Test Payment:

1. Go to your Paystack dashboard
2. Navigate to **Settings** → **Webhooks**
3. Click **Test webhook** (if available)
4. Or make a real test payment through your voting page

### Verify Data in Sheet:

After a payment:
1. Check your Google Sheet
2. You should see a new row with:
   - Current timestamp
   - Category name
   - Contestant name
   - Amount paid (in Naira)
   - Number of votes (Amount ÷ 100)
   - Voter's email
   - Voter's phone
   - Transaction reference

## Common Issues

### Issue: No data appearing in sheet after payment

**Solutions:**
1. Check Paystack webhook URL is correct
2. Verify Apps Script is deployed with "Anyone" access
3. Check Apps Script execution log:
   - Go to Apps Script editor
   - Click **Executions** (clock icon on left)
   - Look for errors

### Issue: "Permission denied" error

**Solutions:**
1. Re-deploy the Apps Script
2. Make sure you authorized the script
3. Check the script is set to execute as "Me"

### Issue: Data appears but voting page doesn't update

**Solutions:**
1. Verify Sheet ID in voting.html is correct
2. Make sure sheet is published to web
3. Check browser console (F12) for errors
4. Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

## Security Notes

✅ **Safe:**
- Publishing sheet as CSV (read-only)
- Using Paystack public key in frontend
- Webhook URL is secure (Google Apps Script)

⚠️ **Never expose:**
- Paystack secret key
- Google Apps Script code with sensitive data
- Personal information in public sheets

## Next Steps

Once your sheet is set up:

1. ✅ Copy your Sheet ID
2. ✅ Paste it in `voting.html` (line ~240)
3. ✅ Publish your sheet to web
4. ✅ Test with a payment
5. ✅ Deploy your website

---

**Need Help?**
- Check the VOTING_SETUP_GUIDE.md for complete setup
- Test the webhook in Paystack dashboard
- Monitor Apps Script execution log for errors
