<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']); 
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $contact_reason = htmlspecialchars($_POST['contact-reason']);


   
    $to = "hello@plant-poly.org"; 
    $subject = "New Response";
    $body = "Navn: $name\nE-post: $email\nMelding:\n$message"; 
    $headers = "From: no-reply@plant-poly.org" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send e-posten
    if (mail($to, $subject, $body, $headers)) { 
        header("Location: /"); 
        exit;
    } else {
        echo "Beklager, meldingen din kunne ikke sendes. Prøv igjen senere."; 
    }
}
?>
