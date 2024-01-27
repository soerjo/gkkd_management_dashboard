import * as yup from "yup";

const createUser = yup.object({
  regions_ids: yup.string().required(),
  name: yup.string().required().matches(/^\S*$/, "name must not contain spaces"),
  email: yup.string().email().required(),
  role: yup.string().required(),
  password: yup.string().optional(),
  jemaat_id: yup.string().optional(),
});

export default createUser;
