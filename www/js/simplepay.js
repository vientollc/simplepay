$(function() {
        
        //Insert code here
        
        });
        
        $('#loginBtn').on('click', function(e) {
            var u = $('#uname').val(); 
            var p = $('#pword').val(); 
            
            var data = {
                username: u,
                password: p,
                task: 'login'
            };
            $('#res').text('contacting server ...');
            
            /*
            $.ajax({
                url: 'https://simplepay4u.com/mobileapi/index.php',
                complete: function(xhr, textStatus) {
                    alert('request completed with status: ' + textStatus);
                },
                crossDomain: true,
                data: data,
                dataType: jsonp,
                error: function(xhr, textStatus, errorThrown) {
                    alert('error thrown: ' + textStatus + ' : ' + errorThrown);
                },
                success: function(data, textStatus, xhr) {
                    alert(data);
                },
                type: 'POST'
            });
            e.preventDefault();
            */
            
            $.get('https://simplepay4u.com/mobileapi/index.php', data, function(res, textStatus, xHR) {
                $('#res').text(res);
            });
        });