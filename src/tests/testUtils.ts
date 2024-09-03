import {
  encryptPassword,
  getJwtTokenForUser,
} from '../controllers/authController';
import prismaClient from '../prismaClient';
import { Role, Tournament, User } from '@prisma/client';
import crypto from 'crypto';

export async function createTestUser(
  nickname: string,
  email: string,
  password: string,
  role: Role = 'User'
): Promise<[User, string]> {
  const hashedPassword = await encryptPassword(password);
  const user: User = await prismaClient.user.create({
    data: {
      email: email,
      nickname: nickname,
      role: role,
      password: hashedPassword,
    },
  });
  const token = getJwtTokenForUser(user);
  return [user, token];
}

export async function createTournamentForUser(
  user: User,
  bracket_id?: number
): Promise<Tournament> {
  const updatedUser = await prismaClient.user.update({
    where: { id: user.id },
    data: { tournaments: { create: { bracket_id: bracket_id ?? 0 } } },
    include: { tournaments: true },
  });

  const tournament = updatedUser.tournaments.find(
    (tournament) => tournament.bracket_id === bracket_id
  );
  return tournament;
}

export async function getInviteCode(
  user: User,
  tournament: Tournament,
  timeToLive: number
): Promise<string> {
  const expiry = new Date(Date.now() + timeToLive);
  const string = `${tournament.id}${user.id}${expiry}`;
  const code = crypto.createHash('sha256').update(string).digest('hex');

  await prismaClient.inviteToken.create({
    data: {
      tournament_id: tournament.id,
      sender_id: user.id,
      expiry: expiry,
      code: code,
    },
  });

  return code;
}
