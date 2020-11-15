<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);


$response_array;

if(!isset($_POST['recipient']) || !isset($_POST['content'])  || empty($_POST['recipient']) || empty($_POST['content']) ){
    $response_array['success'] = 'false';  
    echo json_encode($response_array);
    die();
}


$recipient = $_POST['recipient'];

$content = $_POST['content'];

if($content==''){
    $response_array['success'] = 'false';  
    echo json_encode($response_array);
    die();}

$file_tmp  = $_FILES['attachment']['tmp_name'];
$file_name = $_FILES['attachment']['name'];


try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP(); // Send using SMTP
    $mail->Host = 'smtp.sendgrid.net'; // Set the SMTP server to send through
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = 'apikey'; // SMTP username
    $mail->Password = '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'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port = 587; // TCP port to connect to

    //Recipients
    $mail->setFrom('scaper65@hotmail.com', 'WAD2 Administrator');
    //for debugging

   
    $mail->addAddress($recipient);

    $mail->addAddress('runescaper65@gmail.com');

    // Add a recipient
    $mail->addReplyTo('scaper65@hotmail.com', 'WAD2 Administrator');
    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'FBS Booking Form Confirmation';
    $mail->Body = "
    <!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>FBS Booking Form Confirmation</title>
</head>
<body>
 {$content}

</body>
</html>
";

    $mail->AltBody = "
    FBS Booking Form Confirmation
  
";

    if($_FILES['attachment']['tmp_name']){
        $mail->AddAttachment($file_tmp, $file_name);
    }
    
  

    $mail->send();

    $response_array['success'] = 'true';  
    
    echo json_encode($response_array);
  
die();
    // echo "<script>alert('Thanks for dropping us a message! We will get back to you as soon as possible!');
  
    // </script>";
} catch (Exception $e) {
    $response_array['success'] = 'false';  
    $response_array['data'] = $mail->ErrorInfo; 
    
}

// }
// else{
//   echo "
//   <h1>Hello!</h1>
//   <p>It seems you have an issue with the form submission! Please try again by clicking <a href='contact.html'>here</a>!</p>
//   ";
//     die();

// }

// }
