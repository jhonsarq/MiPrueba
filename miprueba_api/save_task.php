<?php

require_once('config.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('content-type: application/json; charset=utf-8');


if(isset($_POST['title']) && isset($_POST['description']) && isset($_POST['start_date']) && isset($_POST['end_date']) && isset($_POST['status_id']) && isset($_POST['priority_id']) && isset($_POST['user_id']) && isset($_POST['created_by'])) {
    $title       = $_POST['title'];
    $description = $_POST['description'];
    $start_date  = $_POST['start_date'];
    $end_date    = $_POST['end_date'];
    $status_id   = $_POST['status_id'];
    $priority_id = $_POST['priority_id'];
    $user_id     = $_POST['user_id'];
    $created_by  = $_POST['created_by'];
    
    if($title != '' && $description != '' && $start_date != '' && $end_date != '' && $status_id != '' && $priority_id != '' && $user_id != '' && $created_by != '') {
        if(isset($_FILES['file'])) {
            $file_id = upload_file($_FILES['file']);
            
            if(gettype($file_id) != 'integer') {
                $data['success'] = false;
                $data['message'] = $file_id;
            }
        }
        
        if(!isset($data['success'])) {
            $message = '';
            $params = array('title' => $title,'description' => $description,'start_date' => $start_date,'end_date' => $end_date,'status_id' => $status_id,'priority_id' => $priority_id,'user_id' => $user_id,'created_by' => $created_by);
            
            if(isset($file_id)) {
                $params['file_id'] = $file_id;
            }
            
            if(isset($_POST['id'])) {
                $message = 'Tarea actualizada con éxito';
                $id = $_POST['id'];
                
                $db->update('tasks', $params, array('id' => $id));
            } else {
                $message = 'Tarea creada con éxito';
                $db->insert('tasks', $params);
            }
            
            $sql = 'SELECT     a.id,
                               a.title,
                               a.description,
                               a.start_date,
                               a.end_date,
                               b.name AS file,
                               a.status_id,
                               c.name AS status,
                               a.priority_id,
                               d.name AS priority,
                               e.id AS responsible_id,
                               e.name AS responsible,
                               f.name AS creator,
                               a.created_date
                    FROM       tasks a
                    LEFT  JOIN files      b ON b.id = a.file_id
                    INNER JOIN status     c ON c.id = a.status_id
                    INNER JOIN priorities d ON d.id = a.priority_id
                    INNER JOIN users      e ON e.id = a.user_id
                    INNER JOIN users      f ON f.id = a.created_by
                    WHERE      (a.user_id = ? OR a.created_by = ?)
                   ';
                   
            $rst = $db->get_results($sql, array($user_id, $user_id));
            
            $tasks = array();
            
            if($db->num_rows) {
                foreach($rst as $rst) {
                    $file = '';
                    
                    if($rst->file != '' && $rst->file != null) {
                        $file = HOME_URL . 'uploads/' . $rst->file;
                    }
                    
                    $tasks[$rst->id] = array(
                        'title'       => $rst->title,
                        'description' => $rst->description,
                        'startDate'    => $rst->start_date,
                        'endDate'     => $rst->end_date,
                        'file'        => $file,
                        'statusId'    => $rst->status_id,
                        'status'      => $rst->status,
                        'priorityId'  => $rst->priority_id,
                        'priority'    => $rst->priority,
                        'responsibleId' => $rst->responsible_id,
                        'responsible' => $rst->responsible,
                        'creator'     => $rst->creator,
                        'createdDate' => $rst->created_date
                    );
                }
            }
            
            $data['success'] = true;
            $data['message'] = $message;
            $data['tasks']   = $tasks;
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