<?php
  class Booked{
    //db vars
    private $conn;
    private $table = 'booked_trips';

    //constructor with db
    public function __construct($db){
        $this->conn = $db;
    }

    //get all booked trips
    function getBookedTrips(){
      $q = "SELECT * FROM $this->table";
      $stmt = $this->conn->prepare($q);
      $stmt->execute();
      $data=[];
      if($stmt->rowCount()){
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          $data=[...$data , $row];
        }
      }
      return $data;
    }

    //get specific user booked trips
    function getUserBookedTrips($userId){
      $q = "SELECT * FROM $this->table WHERE user_id = $userId";
      $stmt = $this->conn->prepare($q);
      $stmt->execute();
      $data['booking']=[];
      $data['booked_trips']=[];
      if($stmt->rowCount()){
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          $data['booking']=[...$data['booking'] , $row];
          $tripId = $row['trip_id'];
          $tq = "SELECT * FROM trips WHERE rowId = $tripId";
          $tqStmt = $this->conn->prepare($tq);
          $tqStmt->execute();
          while ($row = $tqStmt->fetch(PDO::FETCH_ASSOC)){
            $data['booked_trips']=[...$data['booked_trips'] , $row];
          }
        }
      }
      return $data;
    }

    //insert new booked trip
    function insertBooking($userId , $email , $tripId , $name , $img , $adate , $ddate , $seat , $price){
      $q = "INSERT INTO $this->table SET
      user_id = :userId , email = :email , trip_id = :tripId , trip_title = :name , img = :img , adate = :adate , ddate = :ddate , ship_place = :seat , price = :price";
      $stmt = $this->conn->prepare($q);
      $stmt->bindParam(':userId',$userId);
      $stmt->bindParam(':email',$email);
      $stmt->bindParam(':tripId',$tripId);
      $stmt->bindParam(':name',$name);
      $stmt->bindParam(':img',$img);
      $stmt->bindParam(':adate',$adate);
      $stmt->bindParam(':ddate',$ddate);
      $stmt->bindParam(':price',$price);
      $stmt->bindParam(':seat',$seat);
      $res = $stmt->execute();
      if($res) return true;
      else return false;
    }

    //insert new booked trip
    function deleteBooking($id){
      $q = "DELETE FROM $this->table WHERE id = $id";
      $stmt = $this->conn->prepare($q);
      $res = $stmt->execute();
      if($res) return true;
      else return false;
    }

  }
?>
