### General Notes ###
Frontend and backend need to be in separate terminal windows!

Details about how to run both are below, both needs to be running if you want the app to behave as expected

### FRONTEND ###

# we are using expo (really easy file structure) #

make sure your in the get-it folder ( you'll know yoru there if you see .expo file or components file)

npm install

npx expo start

Scan the barcode with your phone (make sure you have expo app installed)

### BACKEND ####

make sure your in a virtual env , or global as long as you have the dependencies installed
i.e. django

make sure your also in the backend file, should have manage.py on the same directory

to start server,

python manage.py runserver

