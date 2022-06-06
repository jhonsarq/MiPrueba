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
            $db->update('priorities', array('name' => $name), array('id' => $id));
            
            $message = 'Prioridad actualizado con éxito';
        } else {
            $db->insert('priorities', array('name' => $name));
            
            $message = 'Prioridad creado con éxito';
        }
        
        $sql = 'SELECT id,
                       name
                FROM   priorities
               ';
               
        $rst = $db->get_results($sql);
        
        foreach($rst as $rst) {
            $priorities[$rst->id] = $rst->name;
        }
               
        $data['priorities']  = $priorities;
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