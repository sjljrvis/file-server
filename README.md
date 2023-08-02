## Simple Image Server API

#### Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Base URL](#base-url)
  - [Installation](#installation)
- [Endpoints](#endpoints)
  - [Upload Image](#upload-image)
  - [Get single Image](#get-single-image)
  - [Get List of all images](#get-list-of-all-images)
  - [Update a single image](#update-a-single-image)
  - [Delete a single image](#delete-a-single-image)

- [Examples](#examples)
- [Run as docker application](#run-as-docker-application)

#### Introduction

Simple api to add,get,remove and update image.

#### Getting Started



##### Base URL
The base URL for all API endpoints: http://localhost:5555/api

##### Installation
1. `npm install`
2. `npm start`

#### Run test suite
1. `npm test`

#### Endpoints

##### Upload Image

Add file as a form-data and attach desired file to upload it to server.

- **Base URL:** `http://localhost:5555/api`
- **Endpoint:** `POST /file`
- **Description:** Upload a single.
- **Parameters:** type form-data
  - `file`: <image.png/jpg>
- **Response:** 
```json
{
  "message": "File uploaded",
  "data": {
    "type": "file",
    "fileName": "file-1690969501489-643240774.jpg",
    "originalName": "wallpaperflare.com_wallpaper (1).jpg",
    "path": "uploads/file-1690969501489-643240774.jpg",
    "_id": "mwDvo0gI4eH6OQFz"
  }
}
```

#### Get single Image

This will render the image if exists else server will return 404 error

- **Base URL:** `http://localhost:5555/api`
- **Endpoint:** `get /file/<:_id>`
- **Description:** Get single image.
- **Response:** Returns image as response

#### Get List of all images

This will return list of all the images

- **Base URL:** `http://localhost:5555/api`
- **Endpoint:** `get /file/all`
- **Description:** Get list of images.
- **Response:** 
```json
{
  "message": "File List",
  "data": [
    {
      "type": "file",
      "fileName": "file-1690971598642-644464023.jpg",
      "originalName": "wp9001807-4k-f1-desktop-wallpapers.jpg",
      "path": "uploads/file-1690971598642-644464023.jpg",
      "_id": "OtWvfs2aa4YZEO3d"
    },
    {
      "type": "file",
      "fileName": "file-1690969501489-643240774.jpg",
      "originalName": "wallpaperflare.com_wallpaper (1).jpg",
      "path": "uploads/file-1690969501489-643240774.jpg",
      "_id": "mwDvo0gI4eH6OQFz"
    }
  ]
}
```

#### Update a single image

This replace existing image with a new image

- **Base URL:** `http://localhost:5555/api`
- **Endpoint:** `put /file/<:_id>`
- **Description:** Update/replace a single image.
- **Response:**
```json
{
  "message": "File Updated",
  "data": {
    "type": "file",
    "fileName": "file-1690972000894-224757683.jpg",
    "originalName": "wp9001807-4k-f1-desktop-wallpapers.jpg",
    "path": "uploads/file-1690972000894-224757683.jpg",
    "_id": "mwDvo0gI4eH6OQFz"
  }
}
```

#### Delete a single image

This will delete an image

- **Base URL:** `http://localhost:5555/api`
- **Endpoint:** `delete /file/<:_id>`
- **Description:** delete a single image.
- **Response:**
```json
{
  "message": "File removed",
}
```

#### Examples
```bash
# Curl command to upload file
curl -X POST -F "file=@/Users/sejal/Downloads/wp9001807-4k-f1-desktop-wallpapers.jpg" http://localhost:5555/api/file

```


#### Run as docker application

1. Create docker image  `docker build -t cat .`
1. Run docker image and map container ports  `docker run -p 5555:5555 --name cat-server cat`
