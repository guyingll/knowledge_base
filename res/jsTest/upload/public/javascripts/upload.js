$(function () {
    $('#file_upload').click(function () {
        var form = document.getElementById("form1");
        var data = new FormData(form);
        $("#file_upload").attr("disabled","disabled");
        $.ajax({
            cache: false,
            type: 'post',
            dataType: 'json',
            url: '/upload',
            data: data,
            contentType: false,
            processData: false,
            success: function () {
                $("#file_upload").removeAttr("disabled");
            }
        });
    });
})
