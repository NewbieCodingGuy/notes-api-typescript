// All your shared types live here

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface Note {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface JwtPayload {
  userId: number;
  email: string;
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number){
    super(message)
    this.statusCode = statusCode
  }
}
