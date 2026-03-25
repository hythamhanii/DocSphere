require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./src/models/user.model");
const DoctorProfile = require("./src/models/doctorProfile.model");
const Specialization = require("./src/models/specialization.model");
const Service = require("./src/models/service.model");
const Appointment = require("./src/models/appointment.model");
const Payment = require("./src/models/payment.model");
const Review = require("./src/models/review.model");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected for seeding");
};

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await connectDB();

    await Review.deleteMany({});
    await Payment.deleteMany({});
    await Appointment.deleteMany({});
    await Service.deleteMany({});
    await DoctorProfile.deleteMany({});
    await Specialization.deleteMany({});
    await User.deleteMany({});

    console.log("Old data cleared");

    const specializations = await Specialization.insertMany([
      {
        name: "Cardiology",
        description: "Heart and blood vessel care"
      },
      {
        name: "Dentistry",
        description: "Teeth and oral health care"
      },
      {
        name: "Dermatology",
        description: "Skin, hair, and nail care"
      },
      {
        name: "Orthopedics",
        description: "Bones, joints, and muscles care"
      },
      {
        name: "Pediatrics",
        description: "Medical care for children"
      }
    ]);

    console.log("5 specializations created");

    const doctorUsers = await User.create([
      {
        firstName: "Sara",
        lastName: "Mahmoud",
        email: "doctor1@docsphere.com",
        password: "123456",
        role: "doctor"
      },
      {
        firstName: "Omar",
        lastName: "Khaled",
        email: "doctor2@docsphere.com",
        password: "123456",
        role: "doctor"
      },
      {
        firstName: "Nour",
        lastName: "Samir",
        email: "doctor3@docsphere.com",
        password: "123456",
        role: "doctor"
      },
      {
        firstName: "Mona",
        lastName: "Tarek",
        email: "doctor4@docsphere.com",
        password: "123456",
        role: "doctor"
      },
      {
        firstName: "Youssef",
        lastName: "Adel",
        email: "doctor5@docsphere.com",
        password: "123456",
        role: "doctor"
      }
    ]);

    const patientUsers = await User.create([
      {
        firstName: "Ali",
        lastName: "Hassan",
        email: "patient1@docsphere.com",
        password: "123456",
        role: "patient"
      },
      {
        firstName: "Mariam",
        lastName: "Ahmed",
        email: "patient2@docsphere.com",
        password: "123456",
        role: "patient"
      },
      {
        firstName: "Karim",
        lastName: "Sayed",
        email: "patient3@docsphere.com",
        password: "123456",
        role: "patient"
      },
      {
        firstName: "Laila",
        lastName: "Mostafa",
        email: "patient4@docsphere.com",
        password: "123456",
        role: "patient"
      },
      {
        firstName: "Hana",
        lastName: "Magdy",
        email: "patient5@docsphere.com",
        password: "123456",
        role: "patient"
      }
    ]);

    const adminUsers = await User.create([
      {
        firstName: "Admin",
        lastName: "One",
        email: "admin1@docsphere.com",
        password: "123456",
        role: "admin"
      },
      {
        firstName: "Admin",
        lastName: "Two",
        email: "admin2@docsphere.com",
        password: "123456",
        role: "admin"
      },
      {
        firstName: "Admin",
        lastName: "Three",
        email: "admin3@docsphere.com",
        password: "123456",
        role: "admin"
      },
      {
        firstName: "Admin",
        lastName: "Four",
        email: "admin4@docsphere.com",
        password: "123456",
        role: "admin"
      },
      {
        firstName: "Admin",
        lastName: "Five",
        email: "admin5@docsphere.com",
        password: "123456",
        role: "admin"
      }
    ]);

    console.log("15 users created (5 doctors, 5 patients, 5 admins)");

    const doctorProfiles = await DoctorProfile.insertMany([
      {
        user: doctorUsers[0]._id,
        bio: "Cardiologist with 10 years of experience",
        clinicAddress: "Cairo, Nasr City",
        consultationFee: 500,
        specialization: specializations[0]._id,
        experienceYears: 10
      },
      {
        user: doctorUsers[1]._id,
        bio: "Dentist specialized in cosmetic dentistry",
        clinicAddress: "Giza, Dokki",
        consultationFee: 350,
        specialization: specializations[1]._id,
        experienceYears: 7
      },
      {
        user: doctorUsers[2]._id,
        bio: "Dermatologist focused on skin treatments",
        clinicAddress: "Alexandria, Smouha",
        consultationFee: 400,
        specialization: specializations[2]._id,
        experienceYears: 8
      },
      {
        user: doctorUsers[3]._id,
        bio: "Orthopedic doctor for bone and joint issues",
        clinicAddress: "Mansoura, University District",
        consultationFee: 450,
        specialization: specializations[3]._id,
        experienceYears: 12
      },
      {
        user: doctorUsers[4]._id,
        bio: "Pediatrician caring for infants and children",
        clinicAddress: "Tanta, City Center",
        consultationFee: 300,
        specialization: specializations[4]._id,
        experienceYears: 6
      }
    ]);

    console.log("5 doctor profiles created");

    const services = await Service.insertMany([
      {
        doctor: doctorProfiles[0]._id,
        name: "Heart Checkup",
        description: "ECG and heart health consultation",
        price: 500,
        duration: 30
      },
      {
        doctor: doctorProfiles[1]._id,
        name: "Dental Cleaning",
        description: "Professional teeth cleaning service",
        price: 300,
        duration: 30
      },
      {
        doctor: doctorProfiles[2]._id,
        name: "Skin Consultation",
        description: "Diagnosis for acne and skin problems",
        price: 400,
        duration: 25
      },
      {
        doctor: doctorProfiles[3]._id,
        name: "Bone Examination",
        description: "Checkup for bone and joint pain",
        price: 450,
        duration: 35
      },
      {
        doctor: doctorProfiles[4]._id,
        name: "Child Health Visit",
        description: "General pediatric consultation",
        price: 300,
        duration: 20
      }
    ]);

    console.log("5 services created");

    const appointments = await Appointment.insertMany([
      {
        patient: patientUsers[0]._id,
        doctor: doctorProfiles[0]._id,
        service: services[0]._id,
        appointmentDate: new Date("2026-03-30T10:00:00.000Z"),
        status: "confirmed",
        notes: "Chest pain follow-up"
      },
      {
        patient: patientUsers[1]._id,
        doctor: doctorProfiles[1]._id,
        service: services[1]._id,
        appointmentDate: new Date("2026-04-01T11:30:00.000Z"),
        status: "pending",
        notes: "Routine cleaning"
      },
      {
        patient: patientUsers[2]._id,
        doctor: doctorProfiles[2]._id,
        service: services[2]._id,
        appointmentDate: new Date("2026-04-02T09:00:00.000Z"),
        status: "completed",
        notes: "Skin rash consultation"
      },
      {
        patient: patientUsers[3]._id,
        doctor: doctorProfiles[3]._id,
        service: services[3]._id,
        appointmentDate: new Date("2026-04-03T01:00:00.000Z"),
        status: "cancelled",
        notes: "Knee pain consultation"
      },
      {
        patient: patientUsers[4]._id,
        doctor: doctorProfiles[4]._id,
        service: services[4]._id,
        appointmentDate: new Date("2026-04-04T12:15:00.000Z"),
        status: "confirmed",
        notes: "Child fever and cough"
      }
    ]);

    console.log("5 appointments created");

    const payments = await Payment.insertMany([
      {
        appointment: appointments[0]._id,
        amount: services[0].price,
        method: "cash",
        status: "paid",
        transactionId: "SEED-TXN-1001"
      },
      {
        appointment: appointments[1]._id,
        amount: services[1].price,
        method: "card",
        status: "pending",
        transactionId: "SEED-TXN-1002"
      },
      {
        appointment: appointments[2]._id,
        amount: services[2].price,
        method: "online",
        status: "paid",
        transactionId: "SEED-TXN-1003"
      },
      {
        appointment: appointments[3]._id,
        amount: services[3].price,
        method: "cash",
        status: "failed",
        transactionId: "SEED-TXN-1004"
      },
      {
        appointment: appointments[4]._id,
        amount: services[4].price,
        method: "card",
        status: "paid",
        transactionId: "SEED-TXN-1005"
      }
    ]);

    console.log("5 payments created");

    const reviews = await Review.insertMany([
      {
        patient: patientUsers[0]._id,
        doctor: doctorProfiles[0]._id,
        rating: 5,
        comment: "Excellent cardiologist! Very thorough and professional. Highly recommended!"
      },
      {
        patient: patientUsers[1]._id,
        doctor: doctorProfiles[1]._id,
        rating: 4,
        comment: "Great dental service. The staff was friendly and professional."
      },
      {
        patient: patientUsers[2]._id,
        doctor: doctorProfiles[2]._id,
        rating: 5,
        comment: "Amazing dermatologist! Fixed my skin issues. Very knowledgeable."
      },
      {
        patient: patientUsers[3]._id,
        doctor: doctorProfiles[3]._id,
        rating: 4,
        comment: "Good orthopedic specialist. Gave me helpful exercises for my knee pain."
      },
      {
        patient: patientUsers[4]._id,
        doctor: doctorProfiles[4]._id,
        rating: 5,
        comment: "Wonderful pediatrician! Very caring with children. Highly recommended for parents."
      },
      {
        patient: patientUsers[0]._id,
        doctor: doctorProfiles[1]._id,
        rating: 4,
        comment: "Good experience at the dental clinic."
      },
      {
        patient: patientUsers[1]._id,
        doctor: doctorProfiles[2]._id,
        rating: 5,
        comment: "Perfect service! Very satisfied."
      },
      {
        patient: patientUsers[2]._id,
        doctor: doctorProfiles[3]._id,
        rating: 3,
        comment: "Average experience. Could have been better."
      },
      {
        patient: patientUsers[3]._id,
        doctor: doctorProfiles[4]._id,
        rating: 5,
        comment: "Excellent care for my child!"
      },
      {
        patient: patientUsers[4]._id,
        doctor: doctorProfiles[0]._id,
        rating: 4,
        comment: "Very professional and helpful doctor."
      }
    ]);

    console.log("10 reviews created");

    console.log("\n=== Seed completed successfully ===");
    console.log("Created:");
    console.log("- users: 15");
    console.log("- doctorprofiles: 5");
    console.log("- specializations: 5");
    console.log("- services: 5");
    console.log("- appointments: 5");
    console.log("- payments: 5");
    console.log("- reviews: 10");

    console.log("\nDoctor accounts:");
    doctorUsers.forEach((user, index) => {
      console.log(
        `${index + 1}. ${user.email} | password: 123456`
      );
    });

    console.log("\nPatient accounts:");
    patientUsers.forEach((user, index) => {
      console.log(
        `${index + 1}. ${user.email} | password: 123456`
      );
    });

    console.log("\nAdmin accounts:");
    adminUsers.forEach((user, index) => {
      console.log(
        `${index + 1}. ${user.email} | password: 123456`
      );
    });

    console.log("\nUseful IDs:");
    specializations.forEach((item, index) => {
      console.log(
        `Specialization ${index + 1} (${item.name}): ${item._id.toString()}`
      );
    });

    services.forEach((item, index) => {
      console.log(
        `Service ${index + 1} (${item.name}): ${item._id.toString()}`
      );
    });

    doctorProfiles.forEach((item, index) => {
      console.log(
        `DoctorProfile ${index + 1}: ${item._id.toString()}`
      );
    });

    appointments.forEach((item, index) => {
      console.log(
        `Appointment ${index + 1}: ${item._id.toString()}`
      );
    });

    payments.forEach((item, index) => {
      console.log(
        `Payment ${index + 1}: ${item._id.toString()}`
      );
    });

    reviews.forEach((item, index) => {
      console.log(
        `Review ${index + 1}: ${item._id.toString()}`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
