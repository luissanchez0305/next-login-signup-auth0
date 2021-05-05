export interface User {
  id: string;
  email: string;
}

export interface UserLoginResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
}
