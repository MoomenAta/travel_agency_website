<?php
  class users{
    //db vars
    private $conn;
    private $table;

    //constructor with db
    public function __construct($db){
        $this->conn = $db;
        $this->table = 'users';
    }

    //read user
    public function readUser(){
      $q = "SELECT * FROM $this->table WHERE email = '$this->email' AND password = '$this->password'";
      $stmt = $this->conn->prepare($q);
      $stmt->execute();
      $user = $stmt->fetch(PDO::FETCH_ASSOC);
      if($user)
      return $user;
    }
    //function to insert user
    public function createUser(){
      $q = "INSERT INTO $this->table SET
      firstName = :firstName,
      lastName = :lastName,
      email = :email,
      password = :password,
      isAdmin = :isAdmin ";

      $stmt = $this->conn->prepare($q);
      $stmt->bindParam(':firstName' , $this->firstName);
      $stmt->bindParam(':lastName' , $this->lastName);
      $stmt->bindParam(':email' , $this->email);
      $stmt->bindParam(':password' , $this->password);
      $stmt->bindParam(':isAdmin' , $this->isAdmin);


      try
      {
        if($stmt->execute()){
          return $this->readUser();
        }
      }
      catch(PDOException $e)
      {
          echo $e->getMessage();
      }
    }

    //edit user info
    public function editUser(){
      $list = '';
      $sep = '';

      foreach($this->data as $k => $v){
        $list .= "$sep $k = '$v' " ;
        $sep = ',';
      }

      $q = "UPDATE $this->table SET $list where userId = $this->userId ";
      $stmt = $this->conn->prepare($q);
      $stmt->execute();
      if($stmt->execute()){
          return true;
      }else{
          return false;
      }
    }

    public function deleteUser(){
      $q = "DELETE FROM $this->table WHERE userId = $this->userId ";

      $stmt = $this->conn->prepare($q);
      if($stmt->execute()) return true;
      else return false;
    }


  }

  ?>
