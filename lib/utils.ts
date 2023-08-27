export interface form {
  id: number;
  userId: number;
  residency_type: string | null;
  residency_date: Date;
  residency_address: string | null;
  status: string;
}

export const formStatus = {
  in_progress: "In Progress",
  submitted: "Submitted",
};

export const formQuestions = {
  residencyType: {
    question: "What type of residency are you applying for?",
    summary: "Residency Type:",
    options: {
      "e-Residency": "e-Residency",
      permanent_honduran: "Physical Residence for Honduran Citizen",
      permanent_non_honduran: "Physical Residence for non-Honduran Citizen",
    },
  },
  residencyDate: {
    question: "What is the starting date for your residency?",
    summary: "Starting Date:",
  },
  residencyAddress: {
    question: "What is your residency address?",
    summary: "Address:",
  },
};
