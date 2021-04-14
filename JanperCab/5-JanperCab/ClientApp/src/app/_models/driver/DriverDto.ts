export class DriverDto {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isDisabled: boolean;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
