<?php
session_start();
include('../connect.php');
$a = $_POST['invoice'];
$b = $_POST['product'];
$c = $_POST['qty'];
$result = $db->prepare("SELECT * FROM products WHERE product_code= :userid");
$result->bindParam(':userid', $b);
$result->execute();
for($i=0; $row = $result->fetch(); $i++){
$asasa=$row['price'];
}

//edit qty
$sql = "UPDATE products 
        SET qty=qty+?
		WHERE product_code=?";
$q = $db->prepare($sql);
$q->execute(array($c,$b));

$d=$asasa*$c;
// query
$sql = "INSERT INTO purchases_item (name,qty,cost,invoice) VALUES (:a,:b,:c,:d)";
$q = $db->prepare($sql);
$q->execute(array(':a'=>$b,':b'=>$c,':c'=>$d,':d'=>$a));
header("location:  purchasesportal.php?iv=$a");


?>