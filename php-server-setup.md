# PHP Server Setup for Development

To properly test the contact form in development mode, you need to set up a PHP server on your local machine. Here's how to do it:

## Option 1: Using the Start Script (Recommended)

The easiest way to start both the React app and PHP server:

1. Simply run the `start-dev.bat` script (Windows) or `start-dev.sh` script (Mac/Linux)
2. This will start both servers for you automatically

## Option 2: Using PHP's Built-in Server Manually

If you have PHP installed on your machine, you can use its built-in web server:

1. Open a terminal in the root of your project
2. Run the following command:

```
php -S localhost:8000
```

3. Open a second terminal and run `npm start`

## Option 3: Using XAMPP/WAMP/MAMP

For a full PHP development environment:

1. Install XAMPP, WAMP (Windows), or MAMP (Mac)
2. Start the Apache server (make sure it's running on port 80)
3. Copy your PHP files to the appropriate directory:
   - XAMPP: `C:\xampp\htdocs\worldspace-consulting\`
   - WAMP: `C:\wamp\www\worldspace-consulting\`
   - MAMP: `/Applications/MAMP/htdocs/worldspace-consulting/`

## Testing the PHP Server

To verify your PHP server is working correctly:

1. Start your PHP server using one of the methods above
2. Open your browser and navigate to: http://localhost:8000/test.php
3. You should see a JSON response confirming the server is working

## Fallback Mode for Development

The contact form is designed with a fallback mechanism for development:

1. If the PHP server is not running, the form will automatically switch to "Development Fallback Mode"
2. This will simulate a successful form submission for testing UI interactions
3. You'll see a message indicating you're in fallback mode

## Email Functionality in Development

When running the contact form in a local development environment:

1. The form will successfully submit to the PHP backend
2. The PHP script will detect it's running in a development environment (localhost)
3. Instead of trying to send a real email (which would fail without a configured mail server), it will:
   - Log the email details to the PHP error log
   - Return a success response with a "Development Mode" indicator
   - Allow you to test the form's UI/UX completely

This behavior allows you to fully test the contact form functionality without needing to set up a mail server on your local machine.

## For Production Deployment

When deploying to production:

1. Build your React app with `npm run build`
2. Deploy the build folder and PHP files to your web server
3. The contact form will automatically use the production URL in non-localhost environments
4. Make sure to update the allowed origins in `contact.php` with your production domain

## Troubleshooting

If you're having issues with the contact form:

1. **404 Error**: This means the PHP server is not running or not accessible
   - Check that your PHP server is running on port 8000
   - Try accessing http://localhost:8000/test.php directly
   
2. **CORS Error**: This means the PHP server is running but not configured correctly
   - Check that the correct CORS headers are set in contact.php
   - Verify that your origin (http://localhost:3000) is in the allowed origins list
   
3. **PHP Mail Function**: The mail() function is now handled intelligently in development
   - In development mode: The system will simulate sending email and return success
   - You'll see the email details in your PHP server's console/logs
   - No configuration needed for local testing

4. **Permission Issues**: On some systems, you may need to run the PHP server as administrator
   - Windows: Right-click on Command Prompt and select "Run as administrator"
   - Mac/Linux: Use `sudo php -S localhost:80`
