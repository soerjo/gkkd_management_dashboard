export interface ICreateUser {
  regions_ids: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  jemaat_id?: string;
}
