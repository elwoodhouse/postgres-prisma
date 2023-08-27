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

export const navButtons = [
  { label: "Step 1", route: "/form1", completeLookupFields: "residency_type" },
  { label: "Step 2", route: "/form2", completeLookupFields: "residency_date" },
  { label: "Step 3", route: "/form3", completeLookupFields: "residency_address" },
  { label: "Summary", route: "", completeLookupFields: "all" },
];

export const navBarClassName = "py-2 px-4 text-black border-solid border-2 w-1/4 rounded-md ";
