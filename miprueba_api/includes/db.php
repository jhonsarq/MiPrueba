<?php

class db {
    private $db_host;
    private $db_user;
    private $db_password;
    private $db_name;
    private $db_connect;
    private $sql;
    private $table;
    private $params;
    private $conds;
    private $is_query;
    public  $num_rows = 0;
    
    public function __construct($db_host,$db_user,$db_password,$db_name) {
        $this->db_host     = $db_host;
        $this->db_user     = $db_user;
        $this->db_password = $db_password;
        $this->db_name     = $db_name;
        $this->db_connect  = mysqli_connect($this->db_host,$this->db_user,$this->db_password,$this->db_name);
        $this->db_connect->set_charset('utf8');
    }
    
    public function execute_action($sql,$params = array()) {
        $this->sql    = $sql;
        $this->params = $params;
        
        $this->execute_query($this->sql,$this->params);
    }
    
    public function get_results($sql,$params = array()) {
        $this->sql    = $sql;
        $this->params = $params;
        $result       = $this->execute_query($this->sql,$this->params,true);
        $object       = array();
        
        while($row = $result->fetch_object()) {
            array_push($object,$row);
        }
        
        return $object;
    }
    
    public function insert($table,$params) {
        $this->table  = $table;
        $this->params = $params;
        $fields       = implode(',',array_keys($this->params));
        $values       = array();
        $references   = '';
        $i            = 0;
        
        foreach($this->params as $key => $value) {
            $references .= ($i == 0) ? '?' : ',?';
            array_push($values,$value);
            $i++;
        }
        
        $sql = 'INSERT INTO ' . $this->table . ' (' . $fields . ') VALUES (' . $references . ')';
        
        $this->execute_query($sql,$values);
        
        return $this->db_connect->insert_id;
    }
    
    public function update($table,$params,$conds) {
        $this->table       = $table;
        $this->params      = $params;
        $this->conds       = $conds;
        $params_references = '';
        $conds_references  = '';
        $values            = array();
        $i                 = 0;
        
        foreach($this->params as $key => $value) {
            $params_references .= ($i == 0) ? $key . ' = ?' : ',' . $key . ' = ?';
            array_push($values,$value);
            $i++;
        }
        
        $i = 0;
        
        foreach($this->conds as $key => $value) {
            $conds_references .= ($i == 0) ? $key . ' = ?' : ' AND ' . $key . ' = ?';
            array_push($values,$value);
            $i++;
        }
        
        $sql = 'UPDATE ' . $this->table . ' SET ' . $params_references . ' WHERE ' . $conds_references;
        
        $this->execute_query($sql,$values);
    }
    
    public function delete($table,$conds) {
        $this->table      = $table;
        $this->conds      = $conds;
        $conds_references = '';
        $values           = array();
        $i                = 0;
        
        foreach($this->conds as $key => $value) {
            $conds_references .= ($i == 0) ? $key . ' = ?' : ' AND ' . $key . ' = ?';
            array_push($values,$value);
            $i++;
        }
        
        $sql = 'DELETE FROM ' . $table . ' WHERE ' . $conds_references;
        
        $this->execute_query($sql,$values);
    }
    
    private function execute_query($sql,$params,$is_query = false) {
        $this->sql      = $sql;
        $this->params   = $params;
        $this->is_query = $is_query;
        
        if(!empty($this->params)) {
            $types          = '';
            
            for($i = 0;$i < count($this->params);$i++) {
                $type = gettype($this->params[$i]);

                switch($type) {
                    case 'integer':
                        $types .= 'i';
                    break;
                    case 'double':
                        $types .= 'd';
                    break;
                    default:
                        $types .= 's';
                }

                $bind_name    = 'bind' . $i;
                $$bind_name   = $this->params[$i];
                $bind_names[] = &$$bind_name;
            }
            
            array_unshift($bind_names,$types);
        }
        
        $stmt = $this->db_connect->stmt_init();
        $stmt->prepare($this->sql);
        
        if(!empty($this->params)) {
            call_user_func_array(array($stmt,'bind_param'), $bind_names);
        }
        
        $stmt->execute();
        
        if($this->is_query) {
            $result         = $stmt->get_result();
            $this->num_rows = $result->num_rows;
        }
        
        $stmt->close();
        
        if($this->is_query) {
            return $result;
        }
    }
    
    public function __destruct() {
        $this->db_connect->close();
    }
}

?>