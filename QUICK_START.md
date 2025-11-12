# 🚀 DOBA Voting System - Quick Start

## ✅ What's Been Created

1. **voting.html** - Your voting page with live percentages
2. **Google Apps Script** - Receives Paystack webhooks
3. **Setup guides** - Complete documentation

## 🎯 3-Minute Setup Checklist

### ☐ 1. Finish Paystack Webhook (You're here!)
- [ ] Paste your Apps Script URL in Paystack webhook field
- [ ] Click Save

### ☐ 2. Set Up Google Sheet Headers
- [ ] Open your Google Sheet
- [ ] Add these headers in Row 1:
  ```
  Timestamp | Category | Contestant | Amount | Votes | Email | Phone | Transaction Reference
  ```

### ☐ 3. Publish Your Sheet
- [ ] File → Share → Publish to web
- [ ] Select: Entire Document + CSV format
- [ ] Click Publish
- [ ] Copy your Sheet ID from the URL

### ☐ 4. Update voting.html
- [ ] Open `voting.html`
- [ ] Find line ~240: `const GOOGLE_SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';`
- [ ] Replace with your actual Sheet ID
- [ ] Save the file

### ☐ 5. Deploy & Test
- [ ] Upload `voting.html` to your website
- [ ] Visit the page
- [ ] Click "Vote Now" and make a test payment
- [ ] Check Google Sheet for new data
- [ ] Refresh voting page to see updated percentages

## 📍 Where to Find Things

### Your Paystack Public Key:
Already in the screenshot: `pk_live_7cd172d17e2d682e55c575703`

### Your Apps Script Webhook URL:
```
https://script.google.com/macros/s/AKfycbxH0VJCqJy24rsgYor2vRWkav0brFk33kP_liuS7VVISoKfzq6bpYi8B-0lCcRo7U.../exec
```

### Your Google Sheet ID:
Look at your sheet URL:
```
https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit
```

## 🎨 Customizing Contestants

Edit `voting.html` around line 250:

```javascript
const contestantsData = {
    'Leadership and Governance': [
        { name: 'Your Contestant 1', id: 'lg_1' },
        { name: 'Your Contestant 2', id: 'lg_2' },
        // Add more...
    ],
    'Business': [
        { name: 'Your Contestant 1', id: 'bus_1' },
        // Add more...
    ],
    // Add other categories...
};
```

## 💰 How Voting Works

1. User clicks "Vote Now"
2. Enters number of votes (each = ₦100)
3. Enters email, phone, name
4. Pays via Paystack
5. Webhook sends data to Google Sheet
6. Page auto-refreshes every 30 seconds
7. Percentages update in real-time

## 🔍 Testing Checklist

- [ ] Vote button opens Paystack payment
- [ ] Payment completes successfully
- [ ] Data appears in Google Sheet
- [ ] Voting page shows updated percentages
- [ ] Mobile view works correctly
- [ ] Refresh button works

## 🚨 If Something Goes Wrong

### Payment works but no data in sheet:
→ Check Paystack webhook URL is saved
→ Check Apps Script execution log for errors

### Data in sheet but page doesn't update:
→ Verify Sheet ID in voting.html
→ Make sure sheet is published to web
→ Check browser console (F12) for errors

### Percentages look wrong:
→ Percentages are calculated PER CATEGORY
→ Each category is independent
→ Check the math in Google Sheet

## 📱 Adding Voting Link to Your Site

Add this to your navigation menu:

```html
<li><a href="voting.html">Vote Now</a></li>
```

Or create a prominent button:

```html
<a href="voting.html" class="vote-btn" style="background: #FFD700; color: #000; padding: 15px 30px; border-radius: 25px; font-weight: bold;">
    🗳️ Vote for Your Favourite
</a>
```

## 🎉 You're Ready!

Once you complete the 5 steps above, your voting system is LIVE!

---

**Questions?** Check the detailed guides:
- `VOTING_SETUP_GUIDE.md` - Complete setup instructions
- `GOOGLE_SHEET_SETUP.md` - Sheet configuration help

**Made for DOBA 2025** 🏆
