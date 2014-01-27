var url = 'https://simplepay4u.com/mobileapi/index.php';
var u;
var p;

$(function() {

//Insert code here

});

$('#loginBtn').on('click', function(e) {
    u = $('#uname').val(); 
    p = $('#pword').val(); 
    
    var data = {
        username: u,
        password: p,
        task: 'login'
    };
    $('#res').text('contacting server ...');
    
    $.mobile.loading( "show", { text: 'Authenticating ...', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        $('#res').text(res.result);
        $.mobile.loading( "hide" );
        
        if( res.result == 'success' ) {
            $.mobile.navigate('#springboard');
        }
    });
});

/*
*   Springboard
*/

$('#springboard').on('pageshow', function(e) {
    var data = {
        username: u,
        password: p,
        task: 'getbalance'
    };
    
    $.mobile.loading( "show", { text: 'Fetching data ...', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        
        if( res.result == 'success' ) {
            $('#summaryList').empty();
            $('#summaryList').append('<li data-role="list-divider" role="heading">Account Balance</li>');
            $('#summaryList').append('<li data-theme="c">' + res.balance + '</li>');
            $('#summaryList').listview('refresh');
        }
    });
    
    var data1 = {
        username: u,
        password: p,
        task: 'getlasttransactions'
    };
    
    $.getJSON(url, data1, function(res) {
        if( res.result == 'success' ) {
            $('#lastTxnList').empty();
            $('#lastTxnList').append('<li data-role="list-divider" role="heading">Recent Transactions</li>');
            
            var txns = res.data;
            for(var key in txns) {
                var txn = txns[key];
                $('#lastTxnList').append('<li data-theme="h"> <div class="txn"> <span class="txnAmount">' + txn.amount + '</span><span class="txnType">Type: ' + txn.type + '</span><span class="txnDate">' + txn.tdate + '</span><span class="txnRef">Reference: ' + txn.reference_id + ' (' + txn.id + ')</span></div></li>');
            }
            
            $('#lastTxnList').listview('refresh');
        }
    });
});

/*
*   Transactions page
*/
$('#transactions').on('pageshow', function(e) {
    var data = {
        username: u,
        password: p,
        task: 'getlasttransactions',
        n: 30
    };
    
    $.mobile.loading( "show", { text: 'Fetching data ...', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        
        if( res.result == 'success' ) {
            $('#txnList').empty();
            $('#txnList').append('<li data-role="list-divider" role="heading">Recent Transactions</li>');
            
            var txns = res.data;
            for(var key in txns) {
                var txn = txns[key];
                $('#txnList').append('<li data-theme="h"> <div class="txn"> <span class="txnAmount">' + txn.amount + '</span><span class="txnType">Type: ' + txn.type + '</span><span class="txnDate">' + txn.tdate + '</span><span class="txnRef">Reference: ' + txn.reference_id + '</span></div></li>');
            }
            
            $('#txnList').listview('refresh');
            $.mobile.loading( "hide" );
        }
    });
});

/*
*   Phone Number Verification
*/
$('#verifyPhone').on('pageshow', function(e) {
    
});

/*
*   Send Code to Phone Number
*/
$('#sendPhoneCodeBtn').on('click', function(e) {
    var data = {
        username: u,
        password: p,
        task: 'verifyphone',
        phone: $('#verificationPhone').val()
    };
    
    $.mobile.loading( "show", { text: 'Sending verification code', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        
        if(res.result == 'success') {
            $('#verifyRes').text('Verification code sent. Check your phone.');
        } else {
            $('#verifyRes').text(res.result);
        }
    });
});

/*
*   Verif Phone Code
*/
$('#verifyPhoneCodeBtn').on('click', function(e) {
    var data = {
        username: u,
        password: p,
        task: 'verifyphonetoken',
        token: $('#phoneVerificationCode').val()
    };
    
    $.mobile.loading( "show", { text: 'Verifying Phone Number', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        if(res.result == 'success') {
            $('#verifyRes').text('Phone number verified');
        } else {
            $('#verifyRes').text(res.result);
        }
    });
});

/*
*   Verify Bank Page
*/
$('#verifyBank').on('pageshow', function(e) {
    $('#verifyBankSelect').empty();
    
    var data = {
        username: u,
        password: p,
        task: 'userbanks'
    };
    
    $.mobile.loading( "show", { text: 'Getting Banks', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        if(res.result == 'success') {
            for(key in res.data) {
                var bank = res.data[key];
                $('#verifyBankSelect').append('<option value="' + bank.id + '">' + bank.bname + '(' + bank.baccount + ')</option>');
            }
            $('#verifyBankSelect').listview('refresh');
        }
    });
});

/*
*   Verify Bank Account
*/
$('#verifyBankCodeBtn').on('click', function(e) {
    var data = {
        username: u,
        password: p,
        task: 'verifybanktoken',
        bankid: $('#verifyBankSelect').val(),
        token: $('#bankVerificationCode').val()
    };
    
    $.mobile.loading( "show", { text: 'Verifying Token', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        if(res.result == 'success') {
            $('#bankRes').text('Bank Account successfully verified');
        } else {
            $('#bankRes').text(res.result);
        }
    });
});

/*
*   Send Bank Verification
*/
$('#sendBankVerificationBtn').on('click', function(e) {
    var data = {
        username: u,
        password: p,
        task: 'verifybank',
        bankid: $('#verifyBankSelect').val()
    };
    
    $.mobile.loading( "show", { text: 'Sending Token', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        if(res.result == 'success') {
            $('#bankRes').text('Token sent. Check account for value.');
        } else {
            $('#bankRes').text(res.result);
        }
    });
});

/*
*   Withdraw to bank
*/

$('#withdrawBtn').on('click', function(e) {
    var data = {
        username: u,
        password: p,
        task: 'withdrawal',
        amount: $('#withdrawAmount').val(),
        ipin: $('#withdrawPin').val()
    };
    
    $.mobile.loading( "show", { text: 'Withdrawing', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        if(res.result == 'success') {
            $('#withdrawRes').text('Withdrawal to bank was successful.');
            $('#withdrawAmount').val('');
            $('#withdrawPin').val('');
        } else {
            $('#withdrawRes').text(res.result);
        }
    });
});

/*
*   Send Money
*/
$('#sendMoneyBtn').on('click', function(e) {
    var data = {
        username: u,
        password: p,
        task: 'sendmoney',
        amount: $('#sendAmount').val(),
        ipin: $('#sendPin').val(),
        recipient: $('#sendRecipient').val()
    };
    
    $.mobile.loading( "show", { text: 'Sending', textVisible: true } );
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        if(res.result == 'success') {
            $('#sendRes').text('Money sent sunccessfully.');
            $('#sendAmount').val('');
            $('#sendPin').val('');
            $('#sendRecipient').val('');
        } else {
            $('#withdrawRes').text(res.result);
        }
    });
});

/*
*   Customer Registration
*/
$('#cRegBtn').on('click', function(e) {
    var p1 = $('#c_pword').val();
    var p2 = $('#c_pword_2').val();
    
    if(p1 === p1) {
        var data = {
            username: $('#c_uname').val(),
            password: p1,
            task: 'customerregistration',
            email: $('#c_email').val(),
            phone: $('#c_phone').val(),
            fname: $('#c_fname').val(),
            lname: $('#c_lname').val(),
            address: $('#c_address').val()
        };
        
        $.mobile.loading( "show", { text: 'Registering', textVisible: true } );
        
        $.getJSON(url, data, function(res) {
            $.mobile.loading( "hide" );
            if(res.result == 'success') {
                $('#crRes').text('Your registration was successful');
            } else {
                $('#crRes').text(res.result);
            }
        });
    } else {
        $('#crRes').text('Password Mismatch');
    }
});

/*
*   Merchant Registration
*/
$('#mRegBtn').on('click', function(e) {
    var p1 = $('#m_pword').val();
    var p2 = $('#m_pword_2').val();
    
    if(p1 === p1) {
        var data = {
            username: $('#m_uname').val(),
            password: p1,
            task: 'merchantregistration',
            email: $('#m_email').val(),
            phone: $('#m_phone').val(),
            mname: $('#m_name').val(),
            btype: $('#m_type').val(),
            address: $('#m_address').val()
        };
        
        $.mobile.loading( "show", { text: 'Registering', textVisible: true } );
        
        $.getJSON(url, data, function(res) {
            $.mobile.loading( "hide" );
            if(res.result == 'success') {
                $('#mRegRes').text('Your registration was successful');
            } else {
                $('#mRegRes').text(res.result);
            }
        });
    } else {
        $('#mRegRes').text('Password Mismatch');
    }
});

/*
*   Buy Airtime
*/
$('#buyAirtime').on('pageshow', function(e) {
    $.mobile.loading( "show", { text: 'Getting Networks', textVisible: true } );
    
    var data = {
        username: u,
        password: p,
        task: 'MOB_RECHARGE_CAT'
    };
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        if(res.result == 'success') {
            $('#networkMenu').empty();
            for(var key=0; key<res.data.length; key++){
                var network = res.data[key];
                $('#networkMenu').append($("<option></option>").attr("value", network.mid).text(network.mname));
            }
            $('#networkMenu').selectmenu('refresh');
        } else {
            //$('#withdrawRes').text(res.result);
        }
    });
});

$('#airtimeSend').on('click', function(e){
    $.mobile.loading( "show", { text: 'Sending Airtime', textVisible: true } );
    
    var network = $('#networkMenu').val();
    var amount = $('#rechargeAmount').val();
    var rec = $('#rechargeRecipient').val();
    var ipin = $('#rechargeIpin').val();
    
    var data = {
        username: u,
        password: p,
        task: 'MOB_RECHARGE',
        mid: network,
        mobno_tocredit: rec,
        amount_tocredit: amount,
        iPIN: ipin
    };
    
    $.getJSON(url, data, function(res) {
        $.mobile.loading( "hide" );
        if(res.result == 'success') {
            $('#airtimeResp').text('Airtime Sent');
        } else {
            $('#airtimeResp').text(res.result);
        }
    });
});