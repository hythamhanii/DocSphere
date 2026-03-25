# DocSphere Backend - Postman Testing Guide

This guide matches the current backend behavior and the collection in
`postman/DocSphere.postman_collection.json`.

Verified locally on March 25, 2026.

## What Changed

- `/api/specializations` is mounted and available.
- Protected requests now work with `Authorization: Bearer {{token}}`.
- The Postman `doctorId` variable stores the doctor user `_id` from login/register.
- The backend now resolves that doctor user id to the correct doctor profile automatically.
- Creating a service as a logged-in doctor no longer requires sending a doctor profile id in the request body.
- Doctor register/login now ensures a doctor profile exists.
- Patient dashboard stats now return:
  - `totalAppointments`
  - `completedAppointments`
  - `upcomingAppointments`
  - `myPayments`
- Appointment status updates and cancellation now only work on appointments owned by the logged-in user/doctor.

## Quick Start

### 1. Start the backend

```bash
npm run dev
```

Expected server log:

```text
Server running on port 5000
```

### 2. Seed the database

```bash
node seed.js
```

Important:

- Seeding clears old users, services, appointments, payments, and reviews first.
- It recreates 5 doctors, 5 patients, 5 admins, 5 specializations, 5 services, 5 appointments, 5 payments, and 10 reviews.

Expected seed output includes:

```text
MongoDB connected for seeding
Old data cleared
5 specializations created
15 users created (5 doctors, 5 patients, 5 admins)
5 doctor profiles created
5 services created
5 appointments created
5 payments created
10 reviews created
=== Seed completed successfully ===
```

### 3. Import the collection

Import:

- `postman/DocSphere.postman_collection.json`

### 4. Confirm `baseUrl`

Use:

```text
http://localhost:5000
```

### 5. Run the collection

Recommended order:

1. Run the login requests in `Authentication`.
2. Run the folders manually, or use `Complete Test Flow`.

## Seeded Test Accounts

Password for every seeded account:

```text
123456
```

### Admins

- `admin1@docsphere.com`
- `admin2@docsphere.com`
- `admin3@docsphere.com`
- `admin4@docsphere.com`
- `admin5@docsphere.com`

### Doctors

- `doctor1@docsphere.com`
- `doctor2@docsphere.com`
- `doctor3@docsphere.com`
- `doctor4@docsphere.com`
- `doctor5@docsphere.com`

### Patients

- `patient1@docsphere.com`
- `patient2@docsphere.com`
- `patient3@docsphere.com`
- `patient4@docsphere.com`
- `patient5@docsphere.com`

## Automatic Variables

The collection saves these automatically after successful requests:

### Tokens

- `adminToken`
- `doctorToken`
- `patientToken`

### IDs

- `doctorId`
- `appointmentId`
- `serviceId`
- `paymentId`
- `specializationId`
- `reviewId`

Important note about `doctorId`:

- `doctorId` is the doctor user id returned by login/register.
- You do not need to manually look up the `DoctorProfile` id.
- The backend resolves the correct doctor profile internally for appointments and reviews.

## Recommended Manual Test Order

### 1. Authentication

Run these first:

- `Login as Admin 1`
- `Login as Doctor 1`
- `Login as Patient 1`

This fills:

- `adminToken`
- `doctorToken`
- `patientToken`
- `doctorId`

### 2. Core API folders

Run in this order:

1. `Specializations`
2. `Services`
3. `Appointments`
4. `Payments`
5. `Reviews`

### 3. Role-based dashboards

Then run:

- `Admin Dashboard`
- `Doctor Dashboard`
- `Patient Dashboard`

### 4. End-to-end flow

Run:

- `Complete Test Flow`

## Collection Structure

```text
Quick Start Guide
|- Step 1 - Seed Database
|- Step 2 - Login All Users
`- Step 3 - Run Test Collections

Authentication
|- Register Admin
|- Register Doctor
|- Register Patient
|- Login as Admin 1
|- Login as Doctor 1
`- Login as Patient 1

Specializations
|- Get All Specializations
`- Create Specialization

Services
|- Get All Services
|- Create Service
`- Delete Service

Appointments
|- Create Appointment
|- Get My Appointments (Patient)
`- Update Appointment Status

Payments
|- Create Payment
`- Get All Payments

Reviews
|- Create Review
`- Get Doctor Reviews

Admin Dashboard
|- Get Admin Stats
|- Get Recent Appointments
`- Get Recent Payments

Doctor Dashboard
|- Get Doctor Stats
|- Get Doctor Appointments
`- Update Appointment Status (Doctor)

Patient Dashboard
|- Get Patient Stats
|- Get Patient Appointments
`- Cancel Appointment (Patient)

Complete Test Flow
|- 1. Get Specializations
|- 2. Get Services
|- 3. Login as Patient
|- 4. Create Appointment
|- 5. Create Payment
|- 6. Create Review
|- 7. Login as Doctor
|- 8. Get Doctor Appointments
|- 9. Login as Admin
`- 10. Get Admin Dashboard Stats
```

## Example Flow

### Login as patient

Request:

- `Authentication -> Login as Patient 1`

Result:

- `patientToken` is saved automatically.

### Create appointment

Request:

- `Appointments -> Create Appointment`

Uses:

- `Authorization: Bearer {{patientToken}}`
- `{{doctorId}}` from `Login as Doctor 1`

Result:

- `appointmentId` is saved automatically.

### Create payment

Request:

- `Payments -> Create Payment`

Uses:

- `Authorization: Bearer {{patientToken}}`
- `{{appointmentId}}`

Result:

- `paymentId` is saved automatically.

### Create review

Request:

- `Reviews -> Create Review`

Uses:

- `Authorization: Bearer {{patientToken}}`
- `{{doctorId}}`

Result:

- `reviewId` is saved automatically.

## Expected Dashboard Behavior

### Admin Dashboard

`Get Admin Stats` returns totals such as:

- `totalDoctors`
- `totalPatients`
- `totalAppointments`
- `totalServices`
- `totalPayments`

### Doctor Dashboard

Doctor requests use the logged-in doctor token and return that doctor's data only.

### Patient Dashboard

`Get Patient Stats` returns:

- `totalAppointments`
- `completedAppointments`
- `upcomingAppointments`
- `myPayments`

## Verification Checklist

- [ ] Auth logins return `200`
- [ ] Specializations return `200`
- [ ] Service creation returns `201`
- [ ] Appointment creation returns `201`
- [ ] Payment creation returns `201`
- [ ] Review creation returns `201`
- [ ] Doctor dashboard requests return `200`
- [ ] Admin dashboard requests return `200`
- [ ] Patient dashboard requests return `200`
- [ ] Collection variables populate automatically

## Troubleshooting

### Invalid credentials

Run:

```bash
node seed.js
```

Then retry the login requests.

### Token failed or unauthorized

Check:

- You logged in successfully first.
- The request is sending `Authorization: Bearer {{token}}`.
- The collection variables contain a real token value.

### Doctor not found

Check:

- `doctorId` was refreshed by `Login as Doctor 1`.
- You are using the latest collection.

Remember:

- `doctorId` should be the doctor user id from login, not a doctor profile id.

### Specializations endpoint returns 404

Check:

- The server is running from this updated project.
- `baseUrl` is `http://localhost:5000`.

The backend now mounts:

```text
/api/specializations
```

### Appointment update or cancel returns not found

Check:

- The appointment belongs to the logged-in patient for patient actions.
- The appointment belongs to the logged-in doctor for doctor actions.

## Helpful Endpoints

- Swagger docs: `http://localhost:5000/api/docs`
- Base API URL: `http://localhost:5000`

## Notes

- `Create Service` works with the logged-in doctor token and does not need a `doctor` field in the body.
- `Create Appointment` and `Create Review` can use the doctor user id saved in `doctorId`.
- Rerunning `seed.js` resets the test data, so previously created Postman ids may become stale.
