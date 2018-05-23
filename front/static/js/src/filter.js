kwaderno

//==============================================================================
// String Filter to truncate long string base on defined length
// - wordwise (boolean) - if true, cut only by words bounds,
// - max (integer) - max length of the text, cut to this number of chars,
// - tail (string, default: ' …') - add this string to the input string if the
//   string was cut.
//==============================================================================
    .filter('truncate', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                //Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace - 1) == '.' || value.charAt(lastspace - 1) == ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
})

//==============================================================================
// Sanitize text html to html elements
//==============================================================================
.filter('textToHtml', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])

//==============================================================================
// Format number with comma if applicable
//==============================================================================
.filter('numberFormat', function() {
    return function(number) {
        var decimals = 2;
        var number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + (Math.round(n * k) / k)
                    .toFixed(prec);
            };

        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '')
            .length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1)
                .join('0');
        }
        return s.join(dec);
    };
})

//==============================================================================
// Format number 2 decimal places with comma if applicable
//==============================================================================.
.filter('decimalFormat', function() {
    return function(number) {
        var decimals = 2;
        var number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + (Math.round(n * k) / k)
                    .toFixed(prec);
            };

        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '')
            .length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1)
                .join('0');
        }
        return s.join(dec);
    };
})

.filter('showParent', function() {
    return function(value) {
        if (value == "") return "";

        split = value.split(".");
        return split[0];
    };
})

//==============================================================================
// String filter for status
//==============================================================================

.filter('status', function() {
    return function(value) {
        if (value == "1" || value == "A") {
            return "Active";
        } else if (value == "0" || value == "I") {
            return "Inactive";
        } else {
            return "";
        }
    };
})

.filter('companyStatus', function() {
    return function(value) {

        if (value == "P") {
            return "Pending";
        } else if (value == "A") {
            return "Approved";
        } else if (value == "D") {
            return "Disapproved";
        } else if (value == "B") {
            return "Blacklisted";
        } else if (value == "O") {
            return "On-hold";
        } else {
            return "";
        }
    };
})

.filter('agentStatus', function() {
    return function(value) {

        if (value == "A") {
            return "Active";
        } else if (value == "I") {
            return "Inactive";
        } else if (value == "H") {
            return "Hold";
        } else if (value == "B") {
            return "Blacklisted";
        } else if (value == "T") {
            return "Terminated";
        } else {
            return "";
        }
    };
})

.filter('agentReferralType', function() {
    return function(value) {

        if (value == "F") {
            return "Freelance";
        } else if (value == "O") {
            return "Company";
        } else if (value == "B") {
            return "Borrower";
        } else if (value == "C") {
            return "Co-Borrower";
        } else {
            return "";
        }
    };
})

.filter('clientStatus', function() {
    return function(value) {

        if (value == "A") {
            return "Active";
        } else if (value == "I") {
            return "Inactive";
        } else if (value == "W") {
            return "Write-off";
        } else if (value == "B") {
            return "Blacklisted";
        } else if (value == "T") {
            return "Transfer";
        } else if (value == "D") {
            return "Deceased";
        } else {
            return "";
        }
    };
})

.filter('gender', function(){
    return function (value) {

        if(value == "M"){
            return "Male";
        }
        else if(value == "F"){
            return "Female";
        }
        else{
            return "";
        }
    };
})

.filter('civilStatus', function(){
    return function (value) {

        if(value == "S"){
            return "Single";
        }
        else if(value == "M"){
            return "Married";
        }
        else if(value == "A"){
            return "Annulled";
        }
        else if(value == "W"){
            return "Widow";
        }
        else if(value == "LS"){
            return "Legally Separated";
        }
        else{
            return "";
        }
    };
})

.filter('productType', function(){
    return function (value) {

        if(value == 1){
            return "ATL";
        }
        else if(value == 2){
            return "ATM";
        }
        else if(value == 4){
            return "GSI";
        }
        else if(value == 5){
            return "GSL";
        }
        else if(value == 6){
            return "IBL";
        }
        else if(value == 7){
            return "SFL";
        }
        else if(value == 8){
            return "SSS";
        }
        else{
            return "";
        }
    };
})

.filter('loanStatus', function(){
    return function (value) {

        if(value == "A"){
            return "Advised";
        }
        else if(value == "L"){
            return "Released";
        }
        else if(value == "R"){
            return "Process";
        }
        else if(value == "F"){
            return "Follow-up";
        }
        else if(value == "C"){
            return "Cancelled";
        }
        else if(value == "D"){
            return "Disapproved";
        }
        else if(value == "P"){
            return "Pending";
        }
        else if(value == "I"){
            return "Inquiry";
        }
        else if(value == "N"){
            return "Not Recommended / Allowed";
        }
        else{
            return "";
        }
    };
})

.filter('actionTaken', function(){
    return function (value) {

        if(value == "F"){
            return "For Follow-up";
        }
        else if(value == "V"){
            return "For Visit";
        }
        else if(value == "A"){
            return "For Approval";
        }
        else if(value == "P"){
            return "For Process";
        }
        else if(value == "R"){
            return "For Release";
        }
        else if(value == "N"){
            return "N/A";
        }
        else{
            return "";
        }
    };
})

.filter('ageFilter', function () {

    function calculateAge (birthday) { // birthday is a date
        // if (birthday.length !== 10) {
        //   return false;
        // }
        var today = new Date();
        var birthday = new Date(birthday);
        var age = today.getFullYear() - birthday.getFullYear();
        var m = today.getMonth() - birthday.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age;
    }

    return function (birthdate) {
        if (birthdate == null || birthdate == ''){
        return '';
        } else {
            var a = calculateAge(birthdate);
            if(!isNaN(a) && a){
              if(a < 0){
                return 0;
              }
              return a;
            }
            return null;
        }
    };
})

.filter('nullFilter', function(){
    return function (value) {

        if(value == "null"){
            return "";
        }  else {
            return value;
        }
    };
})

.filter('mobileAndBankFilter', function(){
    return function (value) {

        if(value == "A"){
            return "Active";
        }
        else if(value == "I"){
            return "Inactive";
        }
        else{
            return "Not Set";
        }
    };
})

.filter('loanAppStatus', function(){
    return function (value) {

        if(value == "A"){
            return "Approved";
        }
        else if(value == "R"){
            return "For Approval";
        }
        else if(value == "X"){
            return "Cancelled";
        }
        else if(value == "P"){
            return "Pending";
        }
    };
})

.filter('loanAcctStatus', function(){
    return function (value) {

        if(value == "A"){
            return "Active";
        }
        else if(value == "V"){
            return "Provision";
        }
        else if(value == "F"){
            return "Fully Paid";
        }
        else if(value == "W"){
            return "Write-Off";
        }
        else if(value == "O"){
            return "Overdue";
        }
        else if(value == "P"){
            return "Pretermination";
        }
        else if(value == "R"){
            return "Roll-Over";
        }
    };
})

.filter('loanType', function(){
    return function (value) {
        if(value == "1"){
            return "13 Month";
        }
        else if(value == "A"){
            return "Additional";
        }
        else if(value == "B"){
            return "Buy-Out";
        }
        else if(value == "C"){
            return "Roll-Over";
        }
        else if(value == "E"){
            return "Extension";
        }
        else if(value == "N"){
            return "New";
        }
        else if(value == "R"){
            return "Reloan";
        }
        else if(value == "S"){
            return "Soon To Pension";
        }
        else if(value == "T"){
            return "Addl-Extension";
        }
        else if(value == "W"){
            return "RollOver-New";
        }
        else if(value == "X"){
            return "RollOver-SssGsi";
        }
        else if(value == "Y"){
            return "Reloan-SssGsi";
        }
        else if(value == "Z"){
            return "Reloan-New";
        }
    };
})

.filter('checkPrepStatus', function(){
    return function (value) {
        if(value == "R"){
            return "RELEASED";
        }
        else if(value == "C"){
            return "CANCELLED";
        }
        else{
            return "PENDING";
        }

    };
})

.filter('checkMoment', function(){
    return function (value) {
        return moment(value).fromNow();
    };
})

.filter('checkBranch', function(){
    return function (value) {
        if(value == "001"){
            return "Head Office";
        }
        else if(value == "002"){
            return "Kalaw";
        }
        else if(value == "003"){
            return "Koronadal";
        }
        else if(value == "004"){
            return "Tacurong";
        }
        else if(value == "005"){
            return "Gensan";
        }
        else if(value == "006"){
            return "Bagtican";
        }
        else if(value == "007"){
            return "Polomolok";
        }
        else if(value == "008"){
            return "Iligan";
        }
        else if(value == "009"){
            return "Cagayan";
        }
        else if(value == "010"){
            return "Butuan";
        }
        else if(value == "011"){
            return "Fortich";
        }
        else if(value == "012"){
            return "Digos";
        }
        else if(value == "014"){
            return "Davao";
        }
        // else{
        //     return "All Branch";
        // }

    };
})

.filter('checkIfNA', function(){
    return function (value) {
          if(value == null || typeof(value) == "undefined" ){
            return "N/A";
          }
          else{
            return value;
          }
    };
})

.filter('transType', function() {
    return function(value) {

        if (value == "l") {
            return "LOAN";
        } else if (value == "c") {
            return "COMISSION";
        } else if (value == "r") {
            return "REFUND";
        }
    };
})
.filter('toPercent', function(){
    return function (value) {
          if(value == null || typeof(value) == "undefined" ){
            return "0.00%";
          }
          else{
            var percent = parseFloat(value) * 100;
            return percent + "%";
          }
    };
})
.filter('calculateAge', function () {
    return function (birthday) { // birthday is a date
        // if (birthday.length !== 10) {
        //   return false;
        // }
        var today = new Date();
        var birthday = new Date(birthday);
        var age = today.getFullYear() - birthday.getFullYear();
        var m = today.getMonth() - birthday.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age;
    };
})

.filter('statusSubmission', function() {
    return function(value) {
        if (value == "1" || value == "a") {
            return "Approved";
        } else if (value == "0" || value == "r") {
            return "Reject";
        } else {
            return "Pending";
        }
    };
})

.filter('dateFilter', function() {
    return function(value) {
        var date = value.split(",");
        if(value == ""){
            return "";
        }
        return "From "+date[0]+" to "+date[1];
    };
})

.filter('timeFilter', function() {
    return function(value) {
        var time = value.split(",");
        if(value == ""){
            return "";
        }
        return "From "+time[0]+" to "+time[1];
    };
})

.filter('procurementType', function(){
    return function (value) {
        if(value == "L"){
            return "Limited Source Bidding";
        }
        else if(value == "D"){
            return "Direct Contracting";
        }
        else if(value == "R"){
            return "Repeat Order";
        }
        else if(value == "S"){
            return "Shopping";
        }
        else if(value == "N"){
            return "Negotiated Procurement";
        }
        else{
            return "Competitive Bidding";
        }

    };
})

.filter('dateFormat', function() {
    return function(value) {
        var time = moment(value).format('LLL');
        return time;
    };
})

.filter('deadline', function() {
    return function(value) {
        var time = moment(value).fromNow();
        return time;
     };
})
.filter('linkFilter', function() {
    return function(value) {
        
        if(value.indexOf("messenger") != -1){
            return "Messenger";
        }
        else if(value.indexOf("meet.jit") != -1){
            return "Meet.Jit";
        }
        else if(value.indexOf("hangouts.google") != -1){
            return "Hangouts";
        }
        else if(value.indexOf("web.skype") != -1){
            return "Skype";
        }
        return "Unknown medium of Conference";
        
    };
})