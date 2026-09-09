import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const VolunteerSchema = new Schema(
  {
    membershipId: { type: String, required: true, unique: true, index: true },

    // Section A - registration information
    institutionName: { type: String, required: true, trim: true },
    campusFaculty: { type: String, trim: true },
    departmentProgram: { type: String, trim: true },
    levelYear: { type: String, trim: true },
    chapterLocation: { type: String, trim: true },
    registrationDate: { type: String, trim: true },

    // Section B - personal information
    fullName: { type: String, required: true, trim: true },
    gender: { type: String, trim: true },
    dateOfBirth: { type: String, trim: true },
    nationality: { type: String, trim: true },
    studentIdNumber: { type: String, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    altPhoneNumber: { type: String, trim: true },
    emailAddress: { type: String, required: true, trim: true, lowercase: true, index: true },
    residentialAddress: { type: String, trim: true },
    emergencyContactName: { type: String, trim: true },
    emergencyContactNumber: { type: String, trim: true },
    relationship: { type: String, trim: true },

    // Academic information
    institution: { type: String, trim: true },
    facultySchool: { type: String, trim: true },
    department: { type: String, trim: true },
    programCourse: { type: String, trim: true },
    currentLevelYear: { type: String, trim: true },
    expectedGraduationYear: { type: String, trim: true },

    // Motivation, interests and skills
    reasonJoin: { type: String, required: true, trim: true },
    interests: { type: [String], default: [] },
    otherInterest: { type: String, trim: true },
    skills: { type: [String], default: [] },
    otherSkill: { type: String, trim: true },
    leadershipPosition: { type: String, trim: true },
    leadershipDetails: { type: String, trim: true },

    // Availability and communication
    volunteerAvailability: { type: String, trim: true },
    preferredRoles: { type: [String], default: [] },
    communicationChannels: { type: [String], default: [] },
    whatsappNumber: { type: String, trim: true },
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true },
    linkedIn: { type: String, trim: true },
    x: { type: String, trim: true },

    // Chapter development
    willingLeadership: { type: String, trim: true },
    chapterBuildAreas: { type: [String], default: [] },
    futureChapterInterest: { type: String, trim: true },

    // Declaration
    codeOfConduct: { type: Boolean, required: true },
    signature: { type: String, trim: true },
    signedDate: { type: String, trim: true },

    // Official use
    applicationReceivedBy: { type: String, trim: true },
    dateReceived: { type: String, trim: true },
    membershipStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    chapterAssigned: { type: String, trim: true },
    remarks: { type: String, trim: true },
  },
  { timestamps: true }
);

export type Volunteer = InferSchemaType<typeof VolunteerSchema>;

export const VolunteerModel: Model<Volunteer> =
  (mongoose.models.Volunteer as Model<Volunteer>) ||
  mongoose.model<Volunteer>('Volunteer', VolunteerSchema);
