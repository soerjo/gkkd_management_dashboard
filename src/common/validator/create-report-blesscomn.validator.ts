import * as yup from "yup";

const createReportBlesscomn = yup.object({
  blesscomn_id: yup.string().required(),
  date: yup.date().required(),
  total_male: yup.number().min(0).required(),
  total_female: yup.number().min(0).required(),
  new: yup.number().optional(),
});

export default createReportBlesscomn;
