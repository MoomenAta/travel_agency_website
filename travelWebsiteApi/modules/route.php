<?php
    class Route {
        //db vars
        private $conn;
        private $table;

        //constructor with db
        public function __construct($db , $tbName){
            $this->conn = $db;
            $this->table = $tbName;
        }

        //get route
        public function getRoute(){

            $q = 'SELECT * FROM '. $this->table;
            //prepare stmt
            $stmt = $this->conn->prepare($q);

            $stmt->execute();
            return $stmt;
        }

        //get results
        public function getResults($query){
            $q = "SELECT * FROM $this->table WHERE $query";
            //prepare stmt
            $stmt = $this->conn->prepare($q);
            //execute stmt
            $stmt->execute();
            $data = [];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $data = [...$data,$row];
            }
            return $data;
        }

        //get single route
        /*public function getSingleRoute($rowId){
            $q = 'SELECT * FROM '. $this->table . ' WHERE rowId = :rowId';
            //prepare stmt
            $stmt = $this->conn->prepare($q);
            //bindParam
            $stmt->bindParam(':rowId' , $rowId);
            //execute stmt
            $stmt->execute();
            $data = [];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $data = [...$route,$row];
            }
            return $data;
        }*/

        //create new route
        public function createRoute(){
            $q =  "INSERT INTO " . $this->table . " SET
            tableId = :tableId,
            tripType = :tripType,
            img = :img,
            secondaryImg = :secondaryImg,
            name = :name,
            description = :description,
            star = :star,
            price = :price,
            adate = :adate,
            ddate = :ddate,
            atime = :atime,
            dtime = :dtime,
            ticketsAvailable = :ticketsAvailable,
            airLine= :airLine,
            dfrom= :dfrom";

            $stmt = $this->conn->prepare($q);
            $stmt->bindParam(':tableId',$this->tableId);
            $stmt->bindParam(':tripType',$this->tripType);
            $stmt->bindParam(':img', $this->img);
            $stmt->bindParam(':secondaryImg' , $this->secondaryImg);
            $stmt->bindParam(':name' , $this->name);
            $stmt->bindParam(':description' , $this->description);
            $stmt->bindParam(':star' , $this->star);
            $stmt->bindParam(':price' , $this->price);
            $stmt->bindParam(':adate' , $this->adate);
            $stmt->bindParam(':ddate' , $this->ddate);
            $stmt->bindParam(':atime' , $this->atime);
            $stmt->bindParam(':dtime' , $this->dtime);
            $stmt->bindParam(':ticketsAvailable' , $this->ticketsAvailable);
            $stmt->bindParam(':airLine' , $this->airLine);
            $stmt->bindParam(':dfrom' , $this->dfrom);

            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        //update route
        public function updateRoute(){

            $list='';
            $sep = '';
            foreach($this->data as $k => $v){
                if($v == null){
                    continue;
                }else{
                    $list .= "$sep $k = '$v'" ;
                    $sep = ',';
                }

            }
            $q = 'UPDATE ' . $this->table . ' SET ' . $list . ' WHERE rowId = ' .$this->rowId;
            echo $q;
            $stmt = $this->conn->prepare($q);
            $stmt->execute();
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        //delete route
        public function deleteRoute(){
            $q = "DELETE FROM '$this->table' WHERE 'rowId = ' '$this->rowId'";

            $stmt = $this->conn->prepare($q);
            if($stmt->execute()) return true;
            else return false;
        }
    }
?>
