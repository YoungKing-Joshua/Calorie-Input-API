# Calorie Tracker REST API
This is a RESTful API built in JavaScript that allows users to track their calorie intake. 
_Inspired by https://github.com/DiveHQ/backend-internship-task repository_ 

### Task Instructions
- Users can create an account and log in to the API.
- All API calls require authentication.
- The API implements three roles with different permission levels: regular users can create, read, update, and delete their own records; user managers can create, read, update, and delete users; admins can create, read, update, and delete all records and users.
- Each calorie entry consists of a date, time, text description, and number of calories.
- If the number of calories is not provided, the API connects to a Calories API provider (such as [nutritionix.com](https://www.nutritionix.com)) to retrieve the calorie count for the entered meal.
- Users can set their expected number of calories per day.
- Each calorie entry has an additional boolean field indicating whether the total calories for that day is less than the expected number of calories per day (true) or not (false).
- The API returns data in JSON format.
- The API provides filtering capabilities for all endpoints that return a list of elements, and supports pagination.
- Unit tests have been written to cover the core calorie logic.
- The API is built using any JavaScript web framework.
- PostgreSQL is used as the database.

### Task Expectations
- API Design Best Practices
- Documentation of any assumptions or choices made and why
- Links as citation to any article / code referred to or used
- Unit tests covering the core calories logic
- Appropriate exception handling and error messages
- Code Quality - remove any unnecessary code, avoid large functions
- Good commit history - we won’t accept a repo with a single giant commit 🙅‍♀️