<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
    include("config.php");
    $data = json_decode(file_get_contents("php://input"), true);
    $fname = $data["fname"];
    $lname = $data["lname"];
    $age = $data['age'];
    $query = "INSERT INTO test_3 (first_name,last_name,age)
                VALUES ('{$fname}', '{$lname}', {$age})";
    if (mysqli_query($conn, $query)) {
        echo json_encode(array('massage' => 'record inserted succesfully', 'status' => TRUE));
    }
    else {
        echo json_encode(array('massage' => 'no record inserted', 'status' => FALSE));
    }
?>