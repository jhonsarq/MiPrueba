<?php

require_once('config.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('content-type: application/json; charset=utf-8');

if(isset($_POST['user_id'])) {
    $user_id = $_POST['user_id'];
    
    $sql = 'SELECT id,
                   name
            FROM   status
           ';
           
    $rst = $db->get_results($sql);
            
    foreach($rst as $rst) {
        $status[$rst->id] = $rst->name;
    }
    
    $sql = 'SELECT id,
                   name
            FROM   priorities
           ';
           
    $rst = $db->get_results($sql);
            
    foreach($rst as $rst) {
        $priorities[$rst->id] = $rst->name;
    }
    
    $sql = 'SELECT id,
                   name
            FROM   users
           ';
           
    $rst = $db->get_results($sql);
            
    foreach($rst as $rst) {
        $users[$rst->id] = $rst->name;
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
                'startDate'   => $rst->start_date,
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
    
    $data['success']    = true;
    $data['tasks']      = $tasks;
    $data['status']     = $status;
    $data['priorities'] = $priorities;
    $data['users']      = $users;
} else {
    $data['success'] = false;
    $data['message'] = 'Acceso denegado';
}

echo json_encode($data);

?>