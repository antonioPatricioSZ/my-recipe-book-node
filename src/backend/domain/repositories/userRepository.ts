import { User } from "../entities/User";

export interface IUserRepository {
  existUserWithEmail(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  add(user: User): Promise<void>;
}
