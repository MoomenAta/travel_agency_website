<?php
    class Database{
//000webhostDBmoomen95@
//000webhostDBmoomen95@

    //private $dbName = 'travelWebsite';
    //private $userName = 'epiz_33273374';
    //private $pass = 'YBYawkPuIyxYA';

    //database vars
    private $host = 'localhost';
    private $dbName = 'routes';
    private $userName = 'root';
    private $pass = 'dbmoomen95@';
    private $conn;

    //function to connect to database
    public function connect(){
        $this->conn = null;
        $dbInfo = 'mysql:host='. $this->host . ';dbname=' . $this->dbName;
        try{
            $this->conn = new PDO($dbInfo,$this->userName , $this->pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch(PDOException $e){
            echo 'Conn Err ' . $e->getMessage();
        }
        return $this->conn;
    }
    }
?>
