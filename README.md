## API Backend

## Login Admin

### POST http://localhost:5000/login

Login admin dengan method POST, dengan note: ketika server dijalankan, harus di reload kembali untuk generate email dan password admin secara otomatis

## Users

### GET http://localhost:5000/users

Mendapatkan semua data users dengan method GET

### POST http://localhost:5000/register

Registrasi user dengan menggunakan method POST

Content-Type: application/json

        {
            "name": "Nanda",
            "email": "nanda@gmail.com",
            "password": "12345678",
            "confPassword": "12345678"
        }

### POST http://localhost:5000/login

User login menggunakan method login

Content-Type: application/json

        {
            "email": "nanda@gmail.com",
            "password": "12345678"
        }

### GET http://localhost:5000/users/:id

Mendapatkan user detail berdasarkan id menggunakan method GET

### DELETE http://localhost:5000/users/:id

Menghapus user berdasarkan id menggunakan method DELETE

## Animal

### GET http://localhost:5000/animal

mendapatkan semua data animal dengan method get

### GET http://localhost:5000/animal/proses

mendapatkan data animal yang berstatus proses

### GET http://localhost:5000/animal/approve

mendapatkan data yang berstatus approve

### POST http://localhost:5000/animal

Menambah data animal dengan method post

### PATCH http://localhost:5000/animal/publish/:id

mengupdate status menjadi publish sesuai id dengan method PATCH

### PATCH http://localhost:5000/animal/proses/:id

mengupdate status menjadi proses sesuai id dengan method PATCH

### PATCH http://localhost:5000/animal/approve/:id

mengupdate status menjadi approve sesuai id dengan method PATCH

### GET http://localhost:5000/animal/:id

mencari detail dari animal sesuai id yang dipilih

### PATCH http://localhost:5000/animal/1

update animal sesuai id dengan PATCH

### DELETE http://localhost:5000/animal/1

delete animal sesuai id dengan method DELETE
