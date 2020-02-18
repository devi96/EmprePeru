
 $(document).ready(function() { 
            $("#historia_id").click(function(event) {
              event.preventDefault();
              
              var form = $("#myForm")[0];

              var data = new FormData(form);
               
                // disabled the submit button
        $("#historia_id").prop("disabled", true);
 
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/historia",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 800000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                $("#historia_id").prop("disabled", false);
 
            },
            error: function (e) {
                console.log("ERROR : ", e);
                $("#historia_id").prop("disabled", false);
 
            }
        });    
    });
  });