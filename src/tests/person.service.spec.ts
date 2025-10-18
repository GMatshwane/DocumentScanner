import { PersonService } from '../app/people/person.service';

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(() => {
    service = new PersonService();
  });

  test('items signal initializes with list of people', () => {
    const people = service.items();
    expect(people.length).toBeGreaterThanOrEqual(15);
    expect(people.map(p => p.id)).toContain(1);
  });

  test('getPerson returns correct person for a valid id', () => {
    const grace = service.getPerson(2);
    expect(grace).toBeDefined();
    expect(grace.name).toBe('Grace Hopper');
    expect(grace.notableAchievements.length).toBeGreaterThan(1);
  });

  test('getPerson returns undefined for non-existent id', () => {
    const result = service.getPerson(999);
    expect(result).toBeUndefined();
  });
});
