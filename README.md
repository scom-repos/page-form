## Step 1: Install packages
```sh
docker-compose up install
```
## Step 2: Build and bundle library
```sh
docker-compose up build
```
## Step 3: get reCaptcha key
Go to https://www.google.com/recaptcha/admin/create and create a new reCaptcha
1. Enter Label
2. Choose "Challenge (v2)" option on "reCAPTCHA type"
3. Enter Domains
4. Click "Submit"
5. Copy site key

## Step 4: Run test
```sh
docker-compose up -d test
```
Access the dev server via http://127.0.0.1:8015/
