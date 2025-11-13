// UPDATED Google Apps Script - Add this to your existing script

// Handle POST requests (webhook from Paystack)
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.event === 'charge.success') {
      var paymentData = data.data;
      var metadata = paymentData.metadata || {};
      var contestant = metadata.contestant_name || 'Unknown';
      var category = metadata.category || 'Unknown';
      var email = paymentData.customer.email || '';
      var phone = paymentData.customer.phone || '';
      var amount = paymentData.amount / 100;
      var votes = amount / 100;
      var reference = paymentData.reference || '';
      var timestamp = new Date();

      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

      sheet.appendRow([
        timestamp,
        category,
        contestant,
        amount,
        votes,
        email,
        phone,
        reference
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Vote recorded'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'ignored',
      'message': 'Not a successful charge event'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// NEW: Handle GET requests (fetch voting data)
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();

    // Skip header row
    var headers = data[0];
    var rows = data.slice(1);

    // Aggregate votes by category and contestant
    var votingData = {};

    rows.forEach(function (row) {
      if (row[1] && row[2]) { // Check if category and contestant exist
        var category = row[1].toString().trim();
        var contestant = row[2].toString().trim();
        var amount = parseFloat(row[3]) || 0;
        var votes = parseFloat(row[4]) || 0;

        if (!votingData[category]) {
          votingData[category] = {};
        }

        if (!votingData[category][contestant]) {
          votingData[category][contestant] = {
            votes: 0,
            amount: 0
          };
        }

        votingData[category][contestant].votes += votes;
        votingData[category][contestant].amount += amount;
      }
    });

    // Return as JSON
    return ContentService
      .createTextOutput(JSON.stringify(votingData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
