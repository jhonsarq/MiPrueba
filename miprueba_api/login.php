<?php

require_once('config.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('content-type: application/json; charset=utf-8');

if(isset($_POST['email']) && isset($_POST['password'])) {
    $email    = $_POST['email'];
    $password = $_POST['password'];

    if($email != '' && $password != '') {
        $password = md5($password);
        
        $sql = 'SELECT id,
                       name
                FROM   users
                WHERE  email = ?
                AND    password = ?
               ';
               
        $rst = $db->get_results($sql, array($email, $password));
        
        if($db->num_rows) {
            $data['userId']   = $rst[0]->id;
            $data['userName'] = $rst[0]->name;
            $data['success']  = true;
        } else {
            $data['success'] = false;
            $data['message'] = 'Datos de acceso incorrectos';
        }
    } else {
        $data['success'] = false;
        $data['message'] = 'Todos los campos son requeridos';
    }
} else {
    $data['success'] = false;
    $data['message'] = 'Acceso denegado';
}

echo json_encode($data);

?>