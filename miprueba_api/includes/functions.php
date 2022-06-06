<?php

function upload_file($file) {
    $file_error = $file['error'];
    
    if($file_error == 0) {
        $ext           = substr(strrchr($file['name'], '.'), 1);
        $file_name     = uniqid('',true) . '.' . $ext;
        $file_tmp_name = $file['tmp_name'];
        $i             = 1;
                
        while(file_exists(HOME_ROOT . 'uploads/' . $file_name)) {
            $file_name = $i . '_' . $file_name;
                    
            $i++;
        }
                
        if(move_uploaded_file($file_tmp_name,HOME_ROOT . 'uploads/' . $file_name)) {
            global $db;
                    
            $file_id = $db->insert('files',array('name' => $file_name));
        } else {
            $file_id = 'Error: Hubo un error al subir el archivo, intenta de nuevo.';
        }
            
    } else {
        $errors = array(
            1 => 'Error: El archivo excede el tamaño máximo de carga.',
            2 => 'Error: El archivo excede el tamaño máximo asignado.',
            3 => 'Error: El archivo se cargo parcialmente.',
            4 => 'Error: Ningún archivo fue cargado.',
            6 => 'Error: No existe la carpeta temporal para el archivo.',
            7 => 'Error: No se puede escribir el archivo en el disco.',
            8 => 'Error: Una extensión de PHP detuvo la carga del archivo.'
        );
        
        $file_id = $errors[$file_error];
    }
    
    return $file_id;
}

?>