# StudentDesk

**StudentDesk** – A simple full-stack CRUD application to manage student enrollment information.  
Built with **React** (frontend), **Django REST Framework** (backend), and **PostgreSQL** (database).

---

## Features

- Add new students with Name, Email, and Role Number
- Edit existing student records
- Delete students
- Search and sort student information
- Pagination for easy browsing

---

## Tech Stack

- **Frontend:** React, react-table, axios
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL
- **Styling:** CSS

---

## Installation

### Prerequisites

- Python 3.x
- Node.js & npm
- PostgreSQL

### Backend Setup

1. Navigate to backend folder (Django project):

```bash
cd student_service
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:

Windows:
```bash
venv\Scripts\activate
```

Mac/Linux:
```bash
source venv/bin/activate
```

4. Run Django migrations:
```bash
python manage.py migrate
```

5. Start development server:
```bash
python manage.py runserver
```
---

### Frontend Setup

1. Navigate to the frontend folder (React project):
```bash
cd student_web
```

2. Install Node dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

---

### App Preview
<img width="1882" height="927" alt="StudentDesk_Image" src="https://github.com/user-attachments/assets/f96fec32-57b0-4de0-bebe-a39e721f7f67" />
