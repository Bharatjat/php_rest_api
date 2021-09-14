$(function () {
  // view all
  $("#viewallbtn").on("click", function () {
    $.ajax({
      method: "GET",
      url: "http://localhost/phplearn/api/api-featch-all.php",
      async: false,
      success: function (response) {
        if (response.status == false) {
          $("#popup").attr("class", " container alert alert-danger");
          $("#popup").text("Sorry something went wrong!");
          $("#popup").hide(5000);
        } else {
          showall(response);
        }
      },
      error: function () {
        $("#popup").attr("class", " container alert alert-danger");
        $("#popup").text("Sorry something went wrong!");
        $("#popup").hide(5000);
      },
    });
  });

  // search
  $("#searchbtn").click(function () {
    var searchvalue = $("#searchvalue").val();
    if (searchvalue.length > 0) {
      var data = { fname: searchvalue };
      var jsondata = JSON.stringify(data);
      $.ajax({
        method: "POST",
        url: "http://localhost/phplearn/api/api-search.php",
        data: jsondata,
        success: function(response) {
          console.log(1);
          if (response.status == false) {
            $("#popup").attr("class", " container alert alert-danger");
            $("#popup").text(response.massage);
            $("#popup").hide(5000);
          }
          showall(response);
        }
      });
    } else {
      alert("search bar is empty!");
    }
  });

  // insert
  $("#savebtn").click(function () {
    var firstname = $("#fname").val();
    var lastname = $("#lname").val();
    var inputage = $("#age").val();
    var data = {
      fname: firstname,
      lname: lastname,
      age: inputage,
    };
    var jsondata = JSON.stringify(data);
    $.ajax({
      type: "POST",
      url: "http://localhost/phplearn/api/api-insert.php",
      data: jsondata,
      success: function (response) {
        if (response.status == false) {
          $("#popup").attr("class", " container alert alert-danger");
          $("#popup").text(response.massage);
          $("#popup").hide(5000);
        } else if(response.status == true) {
          $("#popup").attr("class", " container alert alert-success");
          $("#popup").text("Record inserted succesfully");
          $("#popup").hide(5000);
          $("#viewallbtn").trigger("click");
        }
      },
      
    });
  });

  // edit
  $(document).on("click", ".edit", function () {
    var userId = $(this).data("id");
    $(".modal").show();
    $(".close").click(function () {
      $(".modal").hide();
    });
    $("#SaveEditBtn").click(function () {
      var EditFname = $("#EditFname").val();
      var EditLname = $("#EditLname").val();
      var EditAge = $("#EditAge").val();
      var obj = {
        id: userId,
        fname: EditFname,
        lname: EditLname,
        age: EditAge,
      };
      var jsondata = JSON.stringify(obj);
      $.ajax({
        method: "POST",
        url: "http://localhost/phplearn/api/api-update.php",
        data: jsondata,
        async: false,
        dataType: "json",
        success: function (response) {
          if (response.status == false) {
            $("#popup").attr("class", " container alert alert-danger");
            $("#popup").text(response.massage);
            $("#popup").hide(5000);
          } else {
            $("#popup").attr("class", " container alert alert-success");
            $("#popup").text("Record updated succesfully");
            $("#popup").hide(5000);
            $(".modal").hide();
          }
        },
        error: function () {
          $("#popup").attr("class", " container alert alert-danger");
          $("#popup").text("Sorry something went wrong!");
          $("#popup").hide(5000);
        },
      });
    });
  });

  // delete
  $(document).on("click", ".delete", function () {
    var userId = $(this).data("id");
    var obj = { id: userId };
    var jsondata = JSON.stringify(obj);
    $.ajax({
      method: "POST",
      url: "http://localhost/phplearn/api/api-delete.php",
      data: jsondata,
      async: false,
      dataType: "json",
      success: function (response) {
        if (response.status == false) {
          $("#popup").attr("class", " container alert alert-danger");
          $("#popup").text(response.massage);
          $("#popup").hide(5000);
        } else {
          $("#popup").attr("class", " container alert alert-success");
          $("#popup").text("Record Deleted succesfully");
          $("#popup").hide(5000);
          $("#viewallbtn").trigger("click");
        }
      },
      error: function () {
        $("#popup").attr("class", " container alert alert-danger");
        $("#popup").text("Sorry something went wrong!");
        $("#popup").hide(5000);
      },
    });
  });

  // data laoding on html
  function showall(data) {
    $("#showdata").html("");
    var html = "";
    var i;
    for (i = 0; i < data.length; i++) {
      html +=
        "<tr>" +
        "<td>" +
        data[i].id +
        "</td>" +
        "<td>" +
        data[i].first_name +
        "</td>" +
        "<td>" +
        data[i].last_name +
        "</td>" +
        "<td>" +
        data[i].age +
        "</td>" +
        "<td>" +
        '<button class="btn btn-info edit" data-id="' +
        data[i].id +
        '">Edit</button>' +
        '<button class="btn btn-danger delete" data-id="' +
        data[i].id +
        '">Delete</button>' +
        "</td>" +
        "</tr>";
    }
    $("#showdata").html(html);
  }
});
