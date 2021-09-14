<?php
    header('Content-Type: application/json;');
    header('Access-Control-Allow-Origin: *');
    include("config.php");
    $id = json_decode(file_get_contents("php://input"), true);
    $query = "SELECT * FROM test_3 WHERE id = {$id['id']}";
    $res = mysqli_query($conn, $query) or die("query not run");
    if (mysqli_num_rows($res) > 0) {
        $result = mysqli_fetch_all($res, MYSQLI_ASSOC);
        echo json_encode($result);
    }
    else {
        echo json_encode(array('massage' => 'no record found', 'status' => FALSE));
    }
?>