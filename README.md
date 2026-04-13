## 📡 API Reference

# API LINK - https://notes-api-typescript-production.up.railway.app

### Health Check

Check if the server is running.

```
GET /health
```

**Response — 200 OK**

```json
{
  "status": "ok"
}
```

---

### Auth Endpoints

#### Register

Create a new user account.

```
POST /api/auth/register
```

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response — 201 Created**

```json
{
  "message": "Account created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response — 409 Conflict** _(email already registered)_

```json
{
  "error": "Email already in use"
}
```

**Response — 422 Unprocessable Entity** _(validation failed)_

```json
{
  "errors": [
    { "field": "email", "message": "Must be a valid email address" },
    { "field": "password", "message": "Password must be at least 6 characters" }
  ]
}
```

---

#### Login

Log in and receive a JWT access token.

```
POST /api/auth/login
```

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response — 200 OK**

```json
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Response — 401 Unauthorized** _(wrong credentials)_

```json
{
  "error": "Invalid email or password"
}
```

---

### Notes Endpoints

> All notes endpoints require the `Authorization: Bearer <token>` header.

---

#### Get All Notes

Retrieve all notes belonging to the authenticated user.

```
GET /api/notes
```

**Response — 200 OK**

```json
{
  "message": "All Notes Fetched Successfully",
  "notes": [
    {
      "id": 1,
      "user_id": 1,
      "title": "My First Note",
      "content": "This is the content of my first note.",
      "created_at": "2026-03-18T06:49:56.000Z",
      "updated_at": "2026-03-18T06:49:56.000Z"
    }
  ]
}
```

> Returns an empty array `[]` if the user has no notes. This is not an error.

---

#### Get Note by ID

Retrieve a single note by its ID. Only returns the note if it belongs to the authenticated user.

```
GET /api/notes/:id
```

**Response — 200 OK**

```json
{
  "message": "Note fetched successfully",
  "note": {
    "id": 1,
    "user_id": 1,
    "title": "My First Note",
    "content": "This is the content of my first note.",
    "created_at": "2026-03-18T06:49:56.000Z",
    "updated_at": "2026-03-18T06:49:56.000Z"
  }
}
```

**Response — 404 Not Found** _(note doesn't exist or belongs to another user)_

```json
{
  "error": "No note exist with this id!"
}
```

---

#### Create Note

Create a new note for the authenticated user.

```
POST /api/notes
```

**Request Body**

```json
{
  "title": "My First Note",
  "content": "This is the content of my first note."
}
```

**Response — 201 Created**

```json
{
  "message": "Note created successfully",
  "note": {
    "id": 1,
    "userId": 1,
    "title": "My First Note",
    "content": "This is the content of my first note."
  }
}
```

---

#### Update Note

Update the title and content of an existing note. Only works if the note belongs to the authenticated user.

```
PUT /api/notes/:id
```

**Request Body**

```json
{
  "title": "Updated Title",
  "content": "Updated content for this note."
}
```

**Response — 200 OK**

```json
{
  "message": "Note successfully updated!"
}
```

**Response — 404 Not Found**

```json
{
  "error": "Note not found"
}
```

---

#### Delete Note

Delete a note by its ID. Only works if the note belongs to the authenticated user.

```
DELETE /api/notes/:id
```

**Response — 200 OK**

```json
{
  "message": "Note deleted successfully"
}
```

**Response — 404 Not Found**

```json
{
  "error": "Note not found"
}
```

---

## ⚠️ Error Handling

All endpoints return consistent error responses in this format:

```json
{ "error": "Description of what went wrong" }
```

| Status Code | Meaning                                                         |
| ----------- | --------------------------------------------------------------- |
| 200         | Success — resource fetched or action completed                  |
| 201         | Success — resource created                                      |
| 401         | Unauthorized — missing, invalid, or expired token               |
| 404         | Not Found — resource does not exist or belongs to another user  |
| 409         | Conflict — resource already exists (e.g. duplicate email)       |
| 422         | Unprocessable Entity — request understood but validation failed |
| 500         | Internal Server Error — something went wrong on the server      |

---
