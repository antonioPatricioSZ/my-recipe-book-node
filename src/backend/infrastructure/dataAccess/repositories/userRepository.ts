import { User } from "@/backend/domain/entities/User";
import { IUserRepository } from "@/backend/domain/repositories/userRepository";
import { prisma } from "../prisma";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async existUserWithEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return !!user;
  }
  async add(user: User): Promise<void> {
    await prisma.user.create({
      data: user,
    });
  }
}
