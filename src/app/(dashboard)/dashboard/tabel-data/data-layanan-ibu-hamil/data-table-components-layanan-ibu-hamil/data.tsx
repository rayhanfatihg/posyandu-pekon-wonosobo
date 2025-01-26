import { ArrowDown01Icon, ArrowUp01Icon } from "lucide-react";

// Categories based on LayananIbuAnak's fields (adjust to fit your schema)
export const categories = [
  {
    value: "health",
    label: "Health",
  },
  {
    value: "nutrition",
    label: "Nutrition",
  },
  {
    value: "childCare",
    label: "Child Care",
  },
  {
    value: "motherCare",
    label: "Mother Care",
  },
  {
    value: "familyPlanning",
    label: "Family Planning",
  },
  {
    value: "prenatalCare",
    label: "Prenatal Care",
  },
  {
    value: "postnatalCare",
    label: "Postnatal Care",
  },
  {
    value: "immunization",
    label: "Immunization",
  },
  {
    value: "checkups",
    label: "Regular Checkups",
  },
  {
    value: "consultation",
    label: "Consultation",
  },
];

// Income and Expense type (adjust if needed for your context)
export const incomeType = [
  {
    label: "Service Provided",
    value: "service",
    icon: ArrowUp01Icon, // You can choose an icon depending on context
  },
  {
    label: "Service Expense",
    value: "expense",
    icon: ArrowDown01Icon, // You can choose an icon depending on context
  },
];
