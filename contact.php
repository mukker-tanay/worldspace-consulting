<?php
// Get the origin header
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// List of allowed origins (add your production domain when ready)
$allowed_origins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://worldspace.net.in'
];

// Check if the origin is allowed
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Default to localhost for development
    header("Access-Control-Allow-Origin: http://localhost:3000");
}

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Origin');
header('Access-Control-Max-Age: 86400'); // 24 hours cache for preflight requests

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = ['success' => false, 'message' => ''];

// Process only POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get input as JSON or form data
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input === null && json_last_error() !== JSON_ERROR_NONE) {
        // If not valid JSON, fallback to form data
        $input = $_POST;
    }    // Get and sanitize form data
    $name = isset($input['name']) ? htmlspecialchars(strip_tags(trim($input['name']))) : '';
    $email = isset($input['email']) ? filter_var($input['email'], FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($input['phone']) ? htmlspecialchars(strip_tags(trim($input['phone']))) : '';
    $company = isset($input['company']) ? htmlspecialchars(strip_tags(trim($input['company']))) : '';
    $message = isset($input['message']) ? htmlspecialchars(strip_tags(trim($input['message']))) : '';

    // Log incoming data for debugging
    error_log("Form submission received: Name=$name, Email=$email");
    
    // Validate data
    if (empty($name) || empty($email) || empty($message)) {
        $response['message'] = "Name, email, and message are required fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = "Invalid email format.";
    } else {
        // Set email parameters
        $to = "info@worldspace.net.in";
        $subject = "New Contact Form Submission from $name";
        
        // Create detailed email body
        $body = "New contact form submission from the website:\r\n\r\n";
        $body .= "Name: $name\r\n";
        $body .= "Email: $email\r\n";
        
        if (!empty($phone)) {
            $body .= "Phone: $phone\r\n";
        }
        
        if (!empty($company)) {
            $body .= "Company: $company\r\n";
        }
        
        $body .= "\r\nMessage:\r\n$message";
        
        // Set email headers
        $headers = "From: noreply@worldspace.net.in\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Return-Path: noreply@worldspace.net.in\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Determine if we're in development mode
        $is_development = (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || 
                          strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false);

        // In development mode, skip actually sending the email
        if ($is_development) {
            // Log the email that would have been sent
            error_log("DEVELOPMENT MODE: Would have sent email to $to with subject: $subject");
            error_log("DEVELOPMENT MODE: Email body: " . str_replace("\r\n", " | ", $body));
            error_log("DEVELOPMENT MODE: Email headers: " . str_replace("\r\n", " | ", $headers));
            
            // Return success response for development testing
            $response['success'] = true;
            $response['message'] = "Message received successfully! (Development Mode - Email sending simulated)";
            
            // Log successful simulation
            error_log("Development mode - simulated successful email sending for: $email ($name)");
        } else {
            // In production, attempt to send the actual email
            if (mail($to, $subject, $body, $headers)) {
                $response['success'] = true;
                $response['message'] = "Thank you! Your message has been sent successfully. We'll get back to you soon.";
                
                // Log successful submission for tracking
                error_log("New contact form submission from $email ($name)");
            } else {
                $response['message'] = "Failed to send message. Please try again later or contact us directly at info@worldspace.net.in";
                // Log error for debugging
                error_log("Failed to send email from contact form. From: $email, Name: $name");
            }
        }
    }
} else {
    $response['message'] = "Invalid request method. Only POST requests are accepted.";
    http_response_code(405); // Method Not Allowed
}

// Return JSON response
echo json_encode($response);
