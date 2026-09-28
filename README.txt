Robust Error Handling and Logging

This project uses a custom AppError class and centralized error handling to provide consistent JSON error responses.

Winston records errors in `error.log` and all logs in `combined.log`, including HTTP requests from Morgan through Winston integration.

The project demonstrates operational errors, server errors, 404 handling, and logging of method, URL, message, and stack information.