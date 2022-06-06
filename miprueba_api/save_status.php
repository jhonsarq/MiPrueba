<?php

require_once('config.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('content-type: application/json; charset=utf-8');

if(isset($_POST['name'])) {
    $name = $_POST['name'];

    if($name != '') {
        $message = '';
        
        if(isset($_POST['id'])) {
            $id = $_POST['id'];
        }
        
        if(isset($id)) {
            $db->update('status', array('name' => $name), array('id' => $id));
            
            $message = 'Estatus actualizado con éxito';
        } else {
            $db->insert('status', array('name' => $name));
            
            $message = 'Estatus creado con éxito';
        }
        
        $sql = 'SELECT id,
                       name
                FROM   status
               ';
               
        $rst = $db->get_results($sql);
        
        foreach($rst as $rst) {
            $status[$rst->id] = $rst->name;
        }
               
        $data['status']  = $status;
        $data['success'] = true;
        $data['message'] = $message;
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