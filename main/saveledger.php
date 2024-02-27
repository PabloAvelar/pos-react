<?php
session_start();
include('../connect.php');
$a = date("m/d/Y");
$b = $_POST['name'];
$c = $_POST['invoice'];
$d = $_POST['tot'];
$e = $_POST['amount'];
$f = $_POST['remarks'];


$results = $db->prepare("SELECT sum(amount) FROM collection WHERE name= :a");
$results->bindParam(':a', $b);
$results->execute();
for($i=0; $rows = $results->fetch(); $i++){
$sdsdd=$rows['sum(amount)'];
if($sdsdd==''){
$dsdsd=0;
}
if($sdsdd!=''){
$dsdsd=$rows['sum(amount)'];
}
}				
$b1=$d-$dsdsd;
$balance=$b1-$e;

$sql = "INSERT INTO collection (date,name,invoice,amount,remarks,balance) VALUES (:k,:l,:m,:n,:o,:p)";
$q = $db->prepare($sql);
$q->execute(array(':k'=>$a,':l'=>$b,':m'=>$c,':n'=>$e,':o'=>$f,':p'=>$balance));

$sqla = "UPDATE sales 
        SET balance=?, due_date=?
		WHERE invoice_number=?";
$qa = $db->prepare($sqla);
$qa->execute(array($balance,$f,$b));


header("location: customer_ledger.php.?cname=$b");

?>