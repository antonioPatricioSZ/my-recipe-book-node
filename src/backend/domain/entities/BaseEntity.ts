import { randomUUID } from "node:crypto";

export class BaseEntity {
  id: string;
  createdAt: Date;
  constructor(id?: string, createdAt?: Date) {
    this.id = id ?? randomUUID();
    this.createdAt = createdAt ?? new Date();
  }
}
