const mongoose = require('mongoose');

const isBlank = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '');

const randomChunk = (length = 6) =>
  Math.random().toString(36).slice(2, 2 + length).toUpperCase();

const dateChunk = (date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
};

const generateOfficeCode = (prefix) => `${prefix}-${dateChunk()}-${randomChunk(6)}`;
const generateReceiptNo = () => `RCP-${dateChunk()}-${randomChunk(5)}`;
const generateMemberId = () => `LIL${dateChunk()}${randomChunk(6)}`;
const normalizeDateOrNow = (value) => {
  if (isBlank(value)) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};
const normalizeStringOr = (value, fallbackFn) => (isBlank(value) ? fallbackFn() : value);
const normalizeEnumOr = (value, fallbackValue) => (isBlank(value) ? fallbackValue : value);

const learnIndiaFormSchema = new mongoose.Schema({
  officeUse: {
    chfn: { type: String, default: () => generateOfficeCode('CHFN'), set: (v) => normalizeStringOr(v, () => generateOfficeCode('CHFN')) },
    sefn: { type: String, default: () => generateOfficeCode('SEFN'), set: (v) => normalizeStringOr(v, () => generateOfficeCode('SEFN')) },
    olfn: { type: String, default: () => generateOfficeCode('OLFN'), set: (v) => normalizeStringOr(v, () => generateOfficeCode('OLFN')) },
    dateTimeOfFilling: { type: Date, required: true, default: () => new Date(), set: normalizeDateOrNow },
    receiptNo: { type: String, required: true, default: generateReceiptNo, set: (v) => normalizeStringOr(v, generateReceiptNo) },
    enrollmentType: {
      type: String,
      enum: ['Self', 'By Employee', 'Vendor', 'Referral', 'Other'],
      required: true,
      default: 'Self',
      set: (v) => normalizeEnumOr(v, 'Self')
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
    memberId: { type: String, default: generateMemberId, set: (v) => normalizeStringOr(v, generateMemberId) },
    qrCodeReference: { type: String, default: () => `QR-${randomChunk(8)}`, set: (v) => normalizeStringOr(v, () => `QR-${randomChunk(8)}`) }
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

learnIndiaFormSchema.pre('validate', function onPreValidate(next) {
  if (!this.officeUse) this.officeUse = {};
  if (!this.memberIdentification) this.memberIdentification = {};

  if (isBlank(this.officeUse.chfn) || this.officeUse.chfn === 'Auto-generated') {
    this.officeUse.chfn = generateOfficeCode('CHFN');
  }
  if (isBlank(this.officeUse.sefn) || this.officeUse.sefn === 'Auto-generated') {
    this.officeUse.sefn = generateOfficeCode('SEFN');
  }
  if (isBlank(this.officeUse.olfn) || this.officeUse.olfn === 'Auto-generated') {
    this.officeUse.olfn = generateOfficeCode('OLFN');
  }
  if (!this.officeUse.dateTimeOfFilling || Number.isNaN(new Date(this.officeUse.dateTimeOfFilling).getTime())) {
    this.officeUse.dateTimeOfFilling = new Date();
  }
  if (isBlank(this.officeUse.receiptNo)) {
    this.officeUse.receiptNo = generateReceiptNo();
  }
  if (isBlank(this.officeUse.enrollmentType)) {
    this.officeUse.enrollmentType = 'Self';
  }

  if (
    isBlank(this.memberIdentification.memberId) ||
    this.memberIdentification.memberId === 'Auto-generated'
  ) {
    this.memberIdentification.memberId = generateMemberId();
  }
  if (
    isBlank(this.memberIdentification.qrCodeReference) ||
    this.memberIdentification.qrCodeReference === 'Auto-generated'
  ) {
    this.memberIdentification.qrCodeReference = `QR-${randomChunk(8)}`;
  }

  next();
});

module.exports = mongoose.model('LearnIndiaMember', learnIndiaFormSchema);
