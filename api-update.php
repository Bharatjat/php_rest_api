<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: 
    Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Access-Control-Allow-Origin, Authorization, X-Requested-With');
    include("config.php");
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"];
    $fname = $data["fname"];
    $lname = $data["lname"];
    $age = $data["age"];
    $query = "UPDATE test_3
                SET name = '{$fname}',
                password = '{$lname}',
                address = '{$age}'
                WHERE id = {$id}";
    if (mysqli_query($conn, $query)) {
        echo json_encode(array('massage' => 'Record Updated Succesfully', 'status' => TRUE));
    }
    else {
        echo json_encode(array('massage' => 'No Record Updated Succesfully', 'status' => FALSE));
    }
?>