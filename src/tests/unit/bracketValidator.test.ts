import { BracketData } from '../../bracketData';
import validateBracketJson from '../../utils/bracketValidator';

describe('Bracket Validator', () => {
  test('Valid bracket', () => {
    const bracket = {
      bracketId: 1,
      bracketName: 'test',
      matchups: [
        {
          id: 1,
          round: 1,
          team_a: 'Lakers',
          team_b: 'Suns',
          advances_to: 5,
        },
        {
          id: 2,
          round: 1,
          team_a: 'Mavericks',
          team_b: 'Timberwolves',
          advances_to: 5,
        },
        {
          id: 3,
          round: 1,
          team_a: 'Pelicans',
          team_b: 'Kings',
          advances_to: 6,
        },
        {
          id: 4,
          round: 1,
          team_a: 'Nuggets',
          team_b: 'Thunder',
          advances_to: 6,
        },
        {
          id: 5,
          round: 2,
          advances_to: 7,
        },
        {
          id: 6,
          round: 2,
          advances_to: 7,
        },
        {
          id: 7,
          round: 3,
        },
      ],
    };

    const [result] = validateBracketJson(bracket as BracketData);
    expect(result).toBe(true);
  });

  test('Duplicate ids', () => {
    const bracket = {
      bracketId: 1,
      bracketName: 'test',
      matchups: [
        {
          id: 2,
          round: 1,
          team_a: 'Lakers',
          team_b: 'Suns',
          advances_to: 5,
        },
        {
          id: 2,
          round: 1,
          team_a: 'Mavericks',
          team_b: 'Timberwolves',
          advances_to: 5,
        },
        {
          id: 3,
          round: 1,
          team_a: 'Pelicans',
          team_b: 'Kings',
          advances_to: 6,
        },
        {
          id: 4,
          round: 1,
          team_a: 'Nuggets',
          team_b: 'Thunder',
          advances_to: 6,
        },
        {
          id: 5,
          round: 2,
          advances_to: 7,
        },
        {
          id: 6,
          round: 2,
          advances_to: 7,
        },
        {
          id: 7,
          round: 3,
        },
      ],
    };

    const [result] = validateBracketJson(bracket as BracketData);
    expect(result).toBe(false);
  });

  test('Duplicate teams in round', () => {
    const bracket = {
      bracketId: 1,
      bracketName: 'test',
      matchups: [
        {
          id: 1,
          round: 1,
          team_a: 'Lakers',
          team_b: 'Suns',
          advances_to: 5,
        },
        {
          id: 2,
          round: 1,
          team_a: 'Lakers',
          team_b: 'Timberwolves',
          advances_to: 5,
        },
        {
          id: 3,
          round: 1,
          team_a: 'Pelicans',
          team_b: 'Kings',
          advances_to: 6,
        },
        {
          id: 4,
          round: 1,
          team_a: 'Nuggets',
          team_b: 'Thunder',
          advances_to: 6,
        },
        {
          id: 5,
          round: 2,
          advances_to: 7,
        },
        {
          id: 6,
          round: 2,
          advances_to: 7,
        },
        {
          id: 7,
          round: 3,
        },
      ],
    };

    const [result] = validateBracketJson(bracket as BracketData);
    expect(result).toBe(false);
  });

  test('Incorrect numbers of rounds', () => {
    const bracket = {
      bracketId: 1,
      bracketName: 'test',
      matchups: [
        {
          id: 3,
          round: 1,
          team_a: 'Pelicans',
          team_b: 'Kings',
          advances_to: 6,
        },
        {
          id: 4,
          round: 1,
          team_a: 'Nuggets',
          team_b: 'Thunder',
          advances_to: 6,
        },
        {
          id: 5,
          round: 2,
          advances_to: 7,
        },
        {
          id: 6,
          round: 2,
          advances_to: 7,
        },
        {
          id: 7,
          round: 3,
        },
      ],
    };

    const [result] = validateBracketJson(bracket as BracketData);
    expect(result).toBe(false);
  });

  test('Inconsistent number of advance_tos', () => {
    const bracket = {
      bracketId: 1,
      bracketName: 'test',
      matchups: [
        {
          id: 1,
          round: 1,
          team_a: 'Lakers',
          team_b: 'Suns',
          advances_to: 5,
        },
        {
          id: 2,
          round: 1,
          team_a: 'Mavericks',
          team_b: 'Timberwolves',
          advances_to: 6,
        },
        {
          id: 3,
          round: 1,
          team_a: 'Pelicans',
          team_b: 'Kings',
          advances_to: 6,
        },
        {
          id: 4,
          round: 1,
          team_a: 'Nuggets',
          team_b: 'Thunder',
          advances_to: 6,
        },
        {
          id: 5,
          round: 2,
          advances_to: 7,
        },
        {
          id: 6,
          round: 2,
          advances_to: 7,
        },
        {
          id: 7,
          round: 3,
        },
      ],
    };

    const [result] = validateBracketJson(bracket as BracketData);
    expect(result).toBe(false);
  });

  test('Valid bracket', () => {
    const bracket = {
      bracketId: 1,
      bracketName: 'test',
      matchups: [
        {
          id: 1,
          round: 1,
          team_a: 'Lakers',
          team_b: 'Suns',
          advances_to: 5,
        },
        {
          id: 2,
          round: 1,
          team_a: 'Mavericks',
          team_b: 'Timberwolves',
          advances_to: 5,
        },
        {
          id: 3,
          round: 1,
          team_a: 'Pelicans',
          team_b: 'Kings',
          advances_to: 6,
        },
        {
          id: 4,
          round: 1,
          team_a: 'Nuggets',
          team_b: 'Thunder',
          advances_to: 6,
        },
        {
          id: 5,
          round: 2,
          advances_to: 7,
        },
        {
          id: 6,
          round: 2,
          advances_to: 7,
        },
        {
          id: 7,
          round: 3,
        },
      ],
    };

    const [result] = validateBracketJson(bracket as BracketData);
    expect(result).toBe(true);
  });

  test('advance_to points to no existing matchup', () => {
    const bracket = {
      bracketId: 1,
      bracketName: 'test',
      matchups: [
        {
          id: 1,
          round: 1,
          team_a: 'Lakers',
          team_b: 'Suns',
          advances_to: 5,
        },
        {
          id: 2,
          round: 1,
          team_a: 'Mavericks',
          team_b: 'Timberwolves',
          advances_to: 5,
        },
        {
          id: 3,
          round: 1,
          team_a: 'Pelicans',
          team_b: 'Kings',
          advances_to: 6,
        },
        {
          id: 4,
          round: 1,
          team_a: 'Nuggets',
          team_b: 'Thunder',
          advances_to: 6,
        },
        {
          id: 5,
          round: 2,
          advances_to: 8,
        },
        {
          id: 6,
          round: 2,
          advances_to: 8,
        },
        {
          id: 7,
          round: 3,
        },
      ],
    };

    const [result] = validateBracketJson(bracket as BracketData);
    expect(result).toBe(false);
  });

  test('advance_to points to matchup in further round', () => {
    const bracket = {
      bracketId: 1,
      bracketName: 'test',
      matchups: [
        {
          id: 1,
          round: 1,
          team_a: 'Lakers',
          team_b: 'Suns',
          advances_to: 5,
        },
        {
          id: 2,
          round: 1,
          team_a: 'Mavericks',
          team_b: 'Timberwolves',
          advances_to: 5,
        },
        {
          id: 3,
          round: 1,
          team_a: 'Pelicans',
          team_b: 'Kings',
          advances_to: 7,
        },
        {
          id: 4,
          round: 1,
          team_a: 'Nuggets',
          team_b: 'Thunder',
          advances_to: 7,
        },
        {
          id: 5,
          round: 2,
          advances_to: 7,
        },
        {
          id: 6,
          round: 2,
          advances_to: 7,
        },
        {
          id: 7,
          round: 3,
        },
      ],
    };

    const [result] = validateBracketJson(bracket as BracketData);
    expect(result).toBe(false);
  });
});
