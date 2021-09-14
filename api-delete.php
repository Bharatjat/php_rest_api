<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
    include("config.php");
    $flag = 0;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"];
    $query = "DELETE FROM test_3 WHERE id = {$id}";
    if (mysqli_query($conn, $query)) {
        echo json_encode(array('massage' => 'Record Deleted Succesfully', 'status' => TRUE));
    }
    else {
        echo json_encode(array('massage' => 'No Record Deleted ', 'status' => FALSE));
    }
?>