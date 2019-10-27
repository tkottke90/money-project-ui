export class User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;

  fullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}
