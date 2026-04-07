const mongoose = require('mongoose');

const learnIndiaFormSchema = new mongoose.Schema({
  officeUse: {
    chfn: { type: String, default: 'Auto-generated' },
    sefn: { type: String, default: 'Auto-generated' },
    olfn: { type: String, default: 'Auto-generated' },
    dateTimeOfFilling: { type: Date, required: true },
    receiptNo: { type: String, required: true },
    enrollmentType: {
      type: String,
      enum: ['Self', 'By Employee', 'Vendor', 'Referral', 'Other'],
      required: true
    },
    enrollmentCodeDetails: { type: String }
  },

  primaryApplicant: {
    fullName: { type: String, required: true },
    parentOrSpouseName: { type: String, required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    maritalStatus: { type: String, enum: ['Single', 'Married'], required: true }
  },

  contactDetails: {
    mobileNo: { type: String, required: true },
    alternateNo: { type: String },
    whatsappNo: { type: String },
    emailId: { type: String, required: true }
  },

  addressDetails: {
    fullAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true }
  },

  educationProfession: {
    highestQualification: { type: String, required: true },
    occupation: { type: String, required: true },
    organizationName: { type: String },
    monthlyIncome: { type: String }
  },

  familyMembers: [{
    memberName: { type: String, required: true },
    dob: { type: Date },
    age: { type: Number },
    gender: { type: String },
    contactNo: { type: String },
    relation: { type: String }
  }],

  studentDetails: [{
    studentFullName: { type: String, required: true },
    currentClass: { type: String },
    lastYearMarks: { type: String },
    nextYearClass: { type: String },
    upcomingExam: { type: String },
    schoolName: { type: String },
    collegeName: { type: String },
    universityName: { type: String },
    instituteName: { type: String }
  }],

  membershipDetails: {
    planName: { type: String, required: true },
    cardType: { type: String, enum: ['Individual', 'Family', 'Premium'], required: true },
    amountPaid: { type: Number, required: true },
    paymentMode: {
      type: String,
      enum: ['Cash', 'UPI', 'Bank Transfer', 'Card'],
      required: true
    },
    transactionId: { type: String },
    joiningDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true }
  },

  purposeOfRegistration: {
    purposes: { type: [String] },
    otherPurpose: { type: String }
  },

  sourceOfRegistration: {
    referredBy: { type: String },
    employeeVendorCode: { type: String },
    campaignSource: { type: String, enum: ['Social Media', 'Camp', 'Referral', 'Office'] }
  },

  kycDetails: {
    idProofType: { type: String, enum: ['Aadhaar', 'PAN Card', 'Other'], required: true },
    idNumber: { type: String, required: true },
    documentAttached: { type: String, enum: ['Yes', 'No'] }
  },

  followUpTracking: {
    firstFollowUpDate: { type: Date },
    secondFollowUpDate: { type: Date },
    status: { type: String, enum: ['Interested', 'Not Interested', 'Converted'] }
  },

  consentAndAwareness: {
    agreeToUpdates: {
      type: String,
      enum: ['Yes, I agree', 'No, I do not agree'],
      required: true
    },
    understandBenefits: {
      type: String,
      enum: ['Yes, I understand', 'No, I need clarification'],
      required: true
    }
  },

  documentChecklist: {
    idProof: { type: Boolean, default: false },
    paymentProof: { type: Boolean, default: false },
    photo: { type: Boolean, default: false },
    formComplete: { type: Boolean, default: false }
  },

  memberIdentification: {
    memberId: { type: String, default: 'Auto-generated' },
    qrCodeReference: { type: String, default: 'Auto-generated' }
  },

  marketingSource: {
    platform: { type: [String] },
    otherSource: { type: String }
  },

  declaration: {
    customerSignature: { type: String, required: true },
    dateOfDeclaration: { type: Date, required: true }
  },

  officeAgentDetails: {
    employeeName: { type: String },
    employeeCode: { type: String },
    agentSignature: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('LearnIndiaMember', learnIndiaFormSchema);
