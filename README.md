# multimedia-gallery

## Cloning and preparing

1) Clone the repository
2) Open the root folder on a CMD and type "git update-index --skip-worktree multimediaGallery/settings.py"

## Connecting to the database in development mode

1) Open the Heroku dashboard, select "multimedia-gallery" and go to "Resources".

1.1) Click the "Heroku Postgres" under the "Add-ons" tab.
1.2) On the new page select "Settings" and then "View credentials". 

2) Open the root folder of the project, then open "multimediaGallery" and open the "settings.py" file

3) Replace "DATABASES = { ... }" with:

```python
DATABASES = {
    "default": {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': ''
    }
}
```

4) Change NAME, USER, PASSWORD, HOST and PORT with the data displayed on point 1.2 

## Running the app for the first time

On the root folder use a CMD to execute:

   Windows: "virtualenv env && env\Scripts\activate.bat && pip install -r requirements.txt"
   
After that, run "python manage.py runserver" to run the app
   
## Running the app after other changes

1) Run on a cmd the command "pip install -r requirements.txt"
2) Run the app using "env\Scripts\activate.bat && python manage.py runserver"

## Before uploading - If you add new modules or libraries

1. In a CMD with the virtual enviroment running. Type "pip freeze"
2. Copy the displayed text and paste it on "requirements.txt"

## Current functionalities

List multimedia: http://127.0.0.1:8000
Admin: http://127.0.0.1:8000/admin
