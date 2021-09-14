<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: 
    Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Access-Control-Allow-Origin, Authorization, X-Requested-With');
    include("config.php");
    $flag = 0;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"];
    $query = "SELECT * FROM test_3 WHERE id = {$id}";
    $res = mysqli_query($conn, $query) or die("query not run");
    if (mysqli_num_rows($res) > 0) {
        $flag = 1;
    }
    $query = "DELETE FROM test_3 WHERE id = {$id}";
    if (mysqli_query($conn, $query) && $flag==1) {
        echo json_encode(array('massage' => 'Record Deleted Succesfully', 'status' => TRUE));
    }
    else {
        echo json_encode(array('massage' => 'No Record Deleted ', 'status' => FALSE));
    }
?>